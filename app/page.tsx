import { projects } from "./(data)/projects";
import SectionHeader from "./components/SectionHeader";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Rogue Salad Productions — Freelance Web Development & Design",
  description: "Rogue Salad Productions builds fast, accessible, SEO-friendly websites and interfaces. Specialties: Next.js front-ends, WordPress implementation, performance optimization, UI/UX design, and technical consulting for startups and agencies.",
  openGraph: {
    title: "Rogue Salad Productions — Fast, Accessible Web Development",
  description: "WordPress (Oxygen) and Next.js websites and performance-first front-ends. Case studies, services, and consulting for product teams and founders.",
    images: ["/rsp-logo.png"],
  },
};


const ldJson = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Rogue Salad Productions",
  url: "https://roguesalad.co",
  logo: "/rsp-logo.png",
};

export default function Home(){
  const featured = projects.slice(0,6);
  return (
    <div className="space-y-28 pb-32">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }} />
      {/* Hero */}
      <section className="container-max pt-20 relative">
        <div className="mb-10 max-w-4xl">
          <h1 className="font-display tracking-wider">
            <span className="block text-cyan-300">ROGUE SALAD PRODUCTIONS</span>
            Freelance Web Development & Design
          </h1>
          <p className="mt-6 text-slate-400 max-w-prose">Performance-first, accessible, and SEO-friendly websites built with Next.js — for startups, agencies, and product teams.</p>
                <p className="mt-6 text-slate-400 max-w-prose">Performance-first, accessible, and SEO-friendly websites built on platforms like WordPress (Oxygen) or Next.js — or tailored to your preferred stack for startups, agencies, and product teams.</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/work" className="btn" aria-label="Portfolio — Case studies and results">Portfolio — Case Studies</Link>
            <Link href="/contact" className="btn" aria-label="Hire a web developer, request a quote">Hire a Web Developer — Get a Quote</Link>
          </div>
        </div>
        <div className="absolute inset-0 -z-10 opacity-40 pointer-events-none" aria-hidden>
          <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.15),transparent_60%)]" />
        </div>
      </section>
      {/* Featured Work */}
      <section className="container-max" aria-labelledby="featured-work-heading">
        <SectionHeader label="Module" title="Featured Work" intro="Selected case studies: performance-focused websites and digital products built with Next.js, accessibility-first UX, and measurable results." />
    <SectionHeader label="Module" title="Featured Work" intro="Selected case studies: performance-focused websites and digital products built with WordPress (Oxygen), Next.js, or other modern platforms, accessibility-first UX, and measurable results." />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map(p => (
            <Link key={p.slug} href={`/work/${p.slug}`} className="panel brackets rounded-md p-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
              <div className="relative aspect-video w-full mb-3 bg-slate-800/40 rounded-sm overflow-hidden" aria-hidden>
                <Image
                  src={p.coverImage}
                  alt={`${p.title} — screenshot of responsive homepage`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={false}
                />
              </div>
              <h3 className="text-base font-semibold tracking-wide group-hover:text-cyan-300 transition-colors">{p.title}</h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">{p.summary}</p>
              <ul className="flex flex-wrap gap-2 mt-3 text-[10px] tracking-wide text-cyan-300/80">
                {p.tags.slice(0,3).map(t => <li key={t}>{t}</li>)}
              </ul>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/work" className="text-cyan-300 text-sm hover:underline">All Portfolio Case Studies — Web Development →</Link>
        </div>
      </section>
      {/* Services */}
      <section className="container-max" aria-labelledby="services-heading">
        <SectionHeader label="Capabilities" title="Services" intro="Core disciplines we deploy to execute stealth-clear visuals." />
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {title:"Web Development", body:"Next.js & React development — responsive, SEO-minded front-ends, performance optimization, and CMS integrations."},
              {title:"Web Development", body:"WordPress (Oxygen), Next.js & React development — responsive, SEO-minded front-ends, performance optimization, and CMS integrations. Able to build on the platform you prefer."},
            {title:"Design", body:"UI/UX design and prototyping — visually clear interfaces focused on usability, conversions, and brand consistency."},
            {title:"Consulting", body:"Technical & product consulting — architecture reviews, SEO & accessibility audits, and roadmaps to scale your web product."},
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
        <SectionHeader label="Intel" title="About" intro="About — Principles & process for building clear, fast, and accessible web experiences. Learn how we plan projects, prioritize performance, and measure success." />
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 text-sm text-slate-300 max-w-prose">
            <p>We operate with a signal vs noise mindset. Every frame must justify its presence. No ornamental overload—just purposeful design and edit decisions supporting narrative clarity.</p>
            <p><Link href="/about" className="text-cyan-300 underline">About — Principles & Process →</Link></p>
          </div>
          <div className="aspect-[4/3] rounded-md panel" aria-label="Abstract silhouette placeholder" />
        </div>
      </section>
    </div>
  );
}
