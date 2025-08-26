import nodemailer from 'nodemailer';

// Expect environment variables for auth
// SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO (owner email), CONTACT_FROM (from/display email)

function getTransport() {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT,10) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if(!host || !user || !pass) {
    throw new Error('Email transport not configured (missing SMTP env vars)');
  }
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

interface LeadData {
  name: string;
  email: string;
  company?: string;
  budget?: string;
  message: string;
}

const BRAND_BG = '#05080a';
const BRAND_CYAN = '#22D3EE';
const TEXT = '#e6f2f7';
const DIM = '#90a4b0';

function baseHtml(content: string, heading: string) {
  return `<!doctype html><html lang="en"><head><meta charSet='utf-8' /><title>${heading}</title></head>
  <body style="margin:0;padding:0;background:${BRAND_BG};font-family:Inter,Segoe UI,Arial,sans-serif;color:${TEXT};">
    <table role="presentation" width="100%" cellPadding="0" cellSpacing="0" style="max-width:640px;margin:0 auto;padding:32px;">
      <tr><td style="font-family:Orbitron,Arial,sans-serif;font-size:20px;letter-spacing:1px;font-weight:600;color:${BRAND_CYAN};padding-bottom:24px;">Rogue Salad Productions</td></tr>
      <tr><td style="background:#0c1217;border:1px solid #162128;border-radius:8px;padding:28px;">
        ${content}
      </td></tr>
      <tr><td style="padding-top:32px;font-size:12px;line-height:1.4;color:${DIM};">© ${new Date().getFullYear()} Rogue Salad Productions. All rights reserved.</td></tr>
    </table>
  </body></html>`;
}

export async function sendOwnerNotification(data: LeadData) {
  const transport = getTransport();
  const to = process.env.CONTACT_TO || process.env.SMTP_USER!;
  const from = process.env.CONTACT_FROM || to;
  const subject = `New Contact Lead: ${data.name}`;
  const html = baseHtml(`
    <h1 style="margin:0 0 16px;font-size:20px;">New Lead Received</h1>
    <p style="margin:0 0 8px;color:${DIM};">You received a new message via the site contact form.</p>
    <table role="presentation" style="width:100%;font-size:14px;margin-top:16px;border-collapse:collapse;">
      <tr><td style="padding:4px 0;width:90px;color:${DIM};">Name</td><td>${escapeHtml(data.name)}</td></tr>
      <tr><td style="padding:4px 0;color:${DIM};">Email</td><td><a href="mailto:${escapeHtml(data.email)}" style="color:${BRAND_CYAN};text-decoration:none;">${escapeHtml(data.email)}</a></td></tr>
      ${data.company ? `<tr><td style='padding:4px 0;color:${DIM};'>Company</td><td>${escapeHtml(data.company)}</td></tr>` : ''}
      ${data.budget ? `<tr><td style='padding:4px 0;color:${DIM};'>Budget</td><td>${escapeHtml(data.budget)}</td></tr>` : ''}
      <tr><td style="padding:4px 0;color:${DIM};vertical-align:top;">Message</td><td style="white-space:pre-line;">${escapeHtml(data.message)}</td></tr>
    </table>
  `, 'New Lead');
  await transport.sendMail({ to, from, subject, html });
}

export async function sendCustomerReceipt(data: LeadData) {
  const transport = getTransport();
  const to = data.email;
  const from = process.env.CONTACT_FROM || process.env.CONTACT_TO || process.env.SMTP_USER!;
  const subject = 'We received your message';
  const html = baseHtml(`
    <h1 style="margin:0 0 16px;font-size:20px;">Transmission Received</h1>
    <p style="margin:0 0 12px;color:${DIM};">Hey ${escapeHtml(firstName(data.name))}, your message has been received. I typically respond within 1-2 business days.</p>
    <p style="margin:0 0 16px;color:${DIM};">Summary you sent:</p>
    <blockquote style="margin:0 0 24px;padding:12px 16px;border-left:3px solid ${BRAND_CYAN};background:#0a1014;font-size:14px;white-space:pre-line;">${escapeHtml(truncate(data.message, 800))}</blockquote>
    <p style="margin:0 0 8px;font-size:13px;color:${DIM};">If you need to add anything, just reply to this email.</p>
  `, 'Receipt');
  await transport.sendMail({ to, from, subject, html, replyTo: process.env.CONTACT_TO || from });
}

function firstName(full: string) { return full.trim().split(/\s+/)[0]; }
function truncate(str: string, max: number) { return str.length > max ? str.slice(0, max-1) + '…' : str; }
function escapeHtml(str: string) {
  return str
    .replace(/&/g,'&amp;')
    .replace(/</g,'&lt;')
    .replace(/>/g,'&gt;')
    .replace(/"/g,'&quot;')
    .replace(/'/g,'&#39;');
}
