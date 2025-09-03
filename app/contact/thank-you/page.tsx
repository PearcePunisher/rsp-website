import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Thank You',
  robots: { index: false },
};

function firstNameParam(name?: string | null) {
  if(!name) return 'there';
  const cleaned = name.trim();
  if(!cleaned) return 'there';
  return cleaned.split(/\s+/)[0].replace(/[^\p{L}\p{N}'-]/gu,'');
}

export default async function ThankYouPage({ searchParams }: { searchParams: Promise<{ name?: string }> }) {
  const { name } = await searchParams;
  const fname = firstNameParam(name);
  return (
    <div className="container-max py-16 space-y-10 max-w-2xl">
      <header className="space-y-3">
        <h1 className="font-display tracking-wide text-cyan-300">Transmission Received</h1>
        <p className="text-slate-300 text-sm">Thanks {fname}! Your message is logged in the queue. I typically respond within 1–2 business days.</p>
      </header>
      <section className="panel rounded-md p-6 space-y-4 text-sm">
        <h2 className="font-display tracking-wide text-cyan-300 text-base">Direct Channels</h2>
        <ul className="space-y-2">
          <li><span className="text-slate-400">Email:</span> <a href="mailto:riley@roguesalad.co" className="text-cyan-300 underline">riley@roguesalad.co</a></li>
          <li><span className="text-slate-400">Site:</span> <Link href="/work" className="text-cyan-300 underline">Case Studies</Link></li>
          <li><span className="text-slate-400">Services:</span> <Link href="/services" className="text-cyan-300 underline">What I Offer</Link></li>
        </ul>
        <p className="text-[11px] text-slate-500">If you don&apos;t see a reply, check spam or email me directly. Appreciate the reach-out.</p>
      </section>
      <div className="text-xs text-slate-500">Return to <Link href="/" className="text-cyan-300 underline">home</Link>.</div>
    </div>
  );
}
