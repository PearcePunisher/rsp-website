import { Pool } from 'pg';

// Use pooled connection string first; fall back to DATABASE_URL
const connectionString = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;

if(!connectionString) {
  console.warn('[db] No database connection string found in environment.');
}

export const pool = connectionString ? new Pool({ connectionString, max: 5 }) : undefined;

export async function insertLead(data: { name: string; email: string; phone?: string; company?: string; budget?: string; message: string; userAgent?: string; ip?: string; utm_source?: string; utm_medium?: string; utm_campaign?: string; referrer?: string; landing_path?: string; raw_query?: string }) {
  if(!pool) throw new Error('Database not configured');
  await pool.query(`CREATE TABLE IF NOT EXISTS contact_leads (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    company text,
    budget text,
    message text NOT NULL,
    user_agent text,
    ip text,
    utm_source text,
    utm_medium text,
    utm_campaign text,
    referrer text,
    landing_path text,
    raw_query text,
    created_at timestamptz NOT NULL DEFAULT now()
  );`);
  const { name, email, phone, company, budget, message, userAgent, ip, utm_source, utm_medium, utm_campaign, referrer, landing_path, raw_query } = data;
  await pool.query(
    `INSERT INTO contact_leads (name,email,phone,company,budget,message,user_agent,ip,utm_source,utm_medium,utm_campaign,referrer,landing_path,raw_query) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
    [name, email, phone || null, company || null, budget || null, message, userAgent || null, ip || null, utm_source || null, utm_medium || null, utm_campaign || null, referrer || null, landing_path || null, raw_query || null]
  );
}
