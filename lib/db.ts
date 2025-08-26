import { Pool } from 'pg';

// Use pooled connection string first; fall back to DATABASE_URL
const connectionString = process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL || process.env.POSTGRES_URL;

if(!connectionString) {
  console.warn('[db] No database connection string found in environment.');
}

export const pool = connectionString ? new Pool({ connectionString, max: 5 }) : undefined;

export async function insertLead(data: { name: string; email: string; company?: string; budget?: string; message: string; userAgent?: string; ip?: string }) {
  if(!pool) throw new Error('Database not configured');
  await pool.query(`CREATE TABLE IF NOT EXISTS contact_leads (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    email text NOT NULL,
    company text,
    budget text,
    message text NOT NULL,
    user_agent text,
    ip text,
    created_at timestamptz NOT NULL DEFAULT now()
  );`);
  const { name, email, company, budget, message, userAgent, ip } = data;
  await pool.query(
    `INSERT INTO contact_leads (name,email,company,budget,message,user_agent,ip) VALUES ($1,$2,$3,$4,$5,$6,$7)`,
    [name, email, company || null, budget || null, message, userAgent || null, ip || null]
  );
}
