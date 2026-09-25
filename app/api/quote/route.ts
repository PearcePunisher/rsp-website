import { NextRequest, NextResponse } from 'next/server';
import { computeQuote } from '@/lib/quote/pricing';
import { parseQuoteInput } from '@/lib/quote/types';

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const input = parseQuoteInput(body);
  if (!input) {
    return NextResponse.json({ error: 'Invalid quote options' }, { status: 400 });
  }

  return NextResponse.json(computeQuote(input), {
    headers: { 'Cache-Control': 'no-store' },
  });
}
