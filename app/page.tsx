import { projects } from "./(data)/projects";
import SectionHeader from "./components/SectionHeader";
import Link from "next/link";

export default function Home(){
  const featured = projects.slice(0,6);
  return (
    <div className="space-y-28 pb-32">
      {/* Hero */}
      <section className="container-max pt-20 relative">
        <div className="mb-10 max-w-4xl">
          <h1 className="font-display tracking-wider">
            <span className="block text-cyan-300">ROGUE SALAD PRODUCTIONS</span>
            Tactical creative. Clean visuals. Zero noise.
          </h1>
          <p className="mt-6 text-slate-400 max-w-prose">I make efficient and effective web experiences using cutting-edge technology and design principles.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/work" className="btn" aria-label="View portfolio work">View Work</Link>
            <Link href="/contact" className="btn" aria-label="Go to contact form">Contact</Link>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none" aria-hidden>
          <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.15),transparent_60%)]" />
        </div>
      </section>
      {/* Featured Work */}
      <section className="container-max" aria-labelledby="featured-work-heading">
        <SectionHeader label="Module" title="Featured Work" intro="Selected missions demonstrating clarity, control, and signal discipline." />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(p => (
            <Link key={p.slug} href={`/work/${p.slug}`} className="panel brackets rounded-md p-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
              <div className="aspect-video w-full mb-3 bg-slate-800/40 rounded-sm" aria-hidden />
              <h3 className="text-base font-semibold tracking-wide group-hover:text-cyan-300 transition-colors">{p.title}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{p.summary}</p>
              <ul className="flex flex-wrap gap-2 mt-3 text-[10px] tracking-wide text-cyan-300/80">
                {p.tags.slice(0,3).map(t => <li key={t}>{t}</li>)}
              </ul>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/work" className="text-cyan-300 text-sm hover:underline">View all work →</Link>
        </div>
      </section>
      {/* Services */}
      <section className="container-max" aria-labelledby="services-heading">
        <SectionHeader label="Capabilities" title="Services" intro="Core disciplines we deploy to execute stealth-clear visuals." />
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {title:"Filmmaking", body:"End-to-end production with an emphasis on composition, cadence, and narrative minimalism."},
            {title:"Editing", body:"Precision timing and rhythm that maintains tension and eliminates visual noise."},
            {title:"Motion Graphics", body:"FUI & typographic systems that feel functional, lean, and tactically purposeful."},
          ].map(s => (
            <div key={s.title} className="panel rounded-md p-6 brackets">
              <h3 className="font-display text-lg tracking-wide mb-2 text-cyan-300">{s.title}</h3>
              <p className="text-sm text-slate-400">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
      {/* About teaser */}
      <section className="container-max" aria-labelledby="about-teaser-heading">
        <SectionHeader label="Intel" title="About" intro="Principles + process focused on clarity, pacing, and disciplined aesthetic restraint." />
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 text-sm text-slate-300 max-w-prose">
            <p>We operate with a signal vs noise mindset. Every frame must justify its presence. No ornamental overload—just purposeful design and edit decisions supporting narrative clarity.</p>
            <p><Link href="/about" className="text-cyan-300 underline">Full briefing →</Link></p>
          </div>
          <div className="aspect-[4/3] rounded-md panel" aria-label="Abstract silhouette placeholder" />
        </div>
      </section>
    </div>
  );
}
