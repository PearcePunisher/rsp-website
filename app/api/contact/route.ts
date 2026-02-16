import { NextRequest, NextResponse } from 'next/server';
import { insertLead } from '@/lib/db';
import { sendOwnerNotification, sendCustomerReceipt } from '@/lib/email';
import { checkBotId } from 'botid/server';

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MIN_SUBMIT_TIME_MS = 3 * 1000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = globalThis as typeof globalThis & {
  __contactRateLimitStore?: Map<string, RateLimitEntry>;
};

if (!rateLimitStore.__contactRateLimitStore) {
  rateLimitStore.__contactRateLimitStore = new Map<string, RateLimitEntry>();
}

function getClientIp(req: NextRequest): string {
  const cfIp = req.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();
  const realIp = req.headers.get('x-real-ip');
  if (realIp) return realIp.trim();
  const forwarded = req.headers.get('x-forwarded-for') || '';
  const ip = forwarded.split(',')[0]?.trim();
  return ip || 'unknown';
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const store = rateLimitStore.__contactRateLimitStore!;
  for (const [key, value] of store.entries()) {
    if (now >= value.resetAt) store.delete(key);
  }
  const entry = store.get(ip);
  if (!entry || now >= entry.resetAt) {
    store.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }
  if (entry.count >= RATE_LIMIT_MAX) {
    return true;
  }
  entry.count += 1;
  return false;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      email,
      company,
      budget,
      message,
      phone,
      website,
      form_started_at,
      utm_source,
      utm_medium,
      utm_campaign,
      referrer,
      landing_path,
      raw_query,
    } = body || {};

    if (website && String(website).trim()) {
      return NextResponse.json({ ok: true });
    }

    const startedAt = Number(form_started_at);
    const submitDurationMs = Date.now() - startedAt;
    if (!Number.isFinite(startedAt) || submitDurationMs < MIN_SUBMIT_TIME_MS) {
      return NextResponse.json({ error: 'Unable to process submission' }, { status: 400 });
    }

    const ip = getClientIp(req);
    if (isRateLimited(ip)) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }

    const verification = await checkBotId();
    if (verification.isBot) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    if(!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    const url = new URL(req.url);
    const lead = {
      name: String(name).slice(0,200),
      email: String(email).toLowerCase().slice(0,320),
      company: company ? String(company).slice(0,200) : undefined,
      budget: budget ? String(budget).slice(0,50) : undefined,
      phone: phone ? String(phone).slice(0,50) : undefined,
      message: String(message).slice(0,4000),
      userAgent: req.headers.get('user-agent') || undefined,
      ip: ip || undefined,
      utm_source: utm_source ? String(utm_source).slice(0,100) : undefined,
      utm_medium: utm_medium ? String(utm_medium).slice(0,100) : undefined,
      utm_campaign: utm_campaign ? String(utm_campaign).slice(0,150) : undefined,
      referrer: referrer ? String(referrer).slice(0,500) : req.headers.get('referer')?.slice(0,500) || undefined,
      landing_path: landing_path ? String(landing_path).slice(0,500) : url.pathname.slice(0,500),
      raw_query: raw_query ? String(raw_query).slice(0,1000) : undefined,
    };
    await insertLead(lead);
    let ownerOk = false; let customerOk = false;
    try {
      const ownerPayload = {
        name: lead.name,
        email: lead.email,
        company: lead.company,
        budget: lead.budget,
        phone: lead.phone,
        message: lead.message,
      };
      await sendOwnerNotification(ownerPayload);
      ownerOk = true;
    } catch(e) {
      console.error('[contact] owner email failed', e);
    }
    try {
      const customerPayload = {
        name: lead.name,
        email: lead.email,
        company: lead.company,
        budget: lead.budget,
        phone: lead.phone,
        message: lead.message,
      };
      await sendCustomerReceipt(customerPayload);
      customerOk = true;
    } catch(e) {
      console.error('[contact] customer receipt failed', e);
    }
    return NextResponse.json({ ok: true, ownerOk, customerOk });
  } catch (err) {
    console.error('[contact] error', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export const runtime = 'nodejs';
