import { NextRequest, NextResponse } from 'next/server';
import { insertLead } from '@/lib/db';
import { sendOwnerNotification, sendCustomerReceipt } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
  const body = await req.json();
  const { name, email, company, budget, message, phone } = body || {};
    if(!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    const forwarded = req.headers.get('x-forwarded-for') || '';
    const ip = forwarded.split(',')[0]?.trim();
    const url = new URL(req.url);
    const sp = url.searchParams;
    const lead = {
      name: String(name).slice(0,200),
      email: String(email).toLowerCase().slice(0,320),
      company: company ? String(company).slice(0,200) : undefined,
      budget: budget ? String(budget).slice(0,50) : undefined,
      phone: phone ? String(phone).slice(0,50) : undefined,
      message: String(message).slice(0,4000),
      userAgent: req.headers.get('user-agent') || undefined,
      ip: ip || undefined,
      utm_source: sp.get('utm_source')?.slice(0,100) || undefined,
      utm_medium: sp.get('utm_medium')?.slice(0,100) || undefined,
      utm_campaign: sp.get('utm_campaign')?.slice(0,150) || undefined,
      referrer: req.headers.get('referer')?.slice(0,500) || undefined,
      landing_path: url.pathname.slice(0,500),
      raw_query: url.search.slice(0,1000) || undefined,
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
