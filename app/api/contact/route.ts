import { NextRequest, NextResponse } from 'next/server';
import { insertLead } from '@/lib/db';
import { sendOwnerNotification, sendCustomerReceipt } from '@/lib/email';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, budget, message } = body || {};
    if(!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }
    const forwarded = req.headers.get('x-forwarded-for') || '';
    const ip = forwarded.split(',')[0]?.trim();
    const lead = {
      name: String(name).slice(0,200),
      email: String(email).toLowerCase().slice(0,320),
      company: company ? String(company).slice(0,200) : undefined,
      budget: budget ? String(budget).slice(0,50) : undefined,
      message: String(message).slice(0,4000),
      userAgent: req.headers.get('user-agent') || undefined,
      ip: ip || undefined,
    };
    await insertLead(lead);
    // Fire-and-forget email sending; don't block response if email fails
    (async()=>{
      try {
        await sendOwnerNotification(lead);
        await sendCustomerReceipt(lead);
      } catch (e) {
        console.error('[contact] email send failed', e);
      }
    })();
    return NextResponse.json({ ok: true, message: 'Submitted' });
  } catch (err) {
    console.error('[contact] error', err instanceof Error ? err.message : err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

export const runtime = 'nodejs';
