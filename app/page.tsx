import { client } from "@/src/sanity/client";
import SectionHeader from "./components/SectionHeader";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Rogue Salad Productions — Freelance Web Development & Design",
  description:
    "Rogue Salad Productions builds fast, accessible, SEO-friendly websites and interfaces. Specialties: Next.js front-ends, WordPress implementation, performance optimization, UI/UX design, and technical consulting for startups and agencies.",
  openGraph: {
    title: "Rogue Salad Productions — Fast, Accessible Web Development",
    description:
      "WordPress (Oxygen) and Next.js websites and performance-first front-ends. Case studies, services, and consulting for product teams and founders.",
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

const FEATURED_WORK_QUERY = `*[_type == "work" && defined(slug.current)]
  | order(publishedAt desc)[0...6]{
    title,
    "slug": slug.current,
    "coverUrl": coverImage.asset->url,
    summary,
    tags
  }`;

type Featured = {
  slug: string;
  title: string;
  coverUrl?: string;
  summary?: string;
  tags?: string[];
};

export default async function Home() {
  const featured = await client.fetch<Featured[]>(FEATURED_WORK_QUERY);
  return (
    <div className="space-y-28 pb-32">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
      {/* Hero */}
      <section className="container-max pt-20 relative">
        <div className="mb-10 max-w-4xl">
          <h1 className="font-display tracking-wider">
            <span className="block text-cyan-300">ROGUE SALAD PRODUCTIONS</span>
            Freelance Web Development & Design
          </h1>
          <p className="mt-6 text-slate-400 max-w-prose">
            Performance-first, accessible, and SEO-friendly websites built on
            platforms like WordPress (Oxygen) or Next.js — or tailored to your
            preferred stack for startups, agencies, and product teams.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/work"
              className="btn"
              aria-label="Portfolio — Case studies and results">
              Portfolio — Case Studies
            </Link>
            <Link
              href="/contact"
              className="btn"
              aria-label="Hire a web developer, request a quote">
              Hire a Web Developer — Get a Quote
            </Link>
          </div>
        </div>
        <div
          className="absolute inset-0 -z-10 opacity-40 pointer-events-none"
          aria-hidden>
          <div className="h-full w-full bg-[radial-gradient(circle_at_30%_20%,rgba(34,211,238,0.15),transparent_60%)]" />
        </div>
      </section>
      {/* Featured Work */}
      <section
        className="container-max"
        aria-labelledby="featured-work-heading">
        <SectionHeader
          label="Module"
          title="Featured Work"
          intro="Selected case studies: performance-focused websites and digital products built with WordPress (Oxygen), Next.js, or other modern platforms, accessibility-first UX, and measurable results."
        />
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <Link
              key={p.slug}
              href={`/work/${p.slug}`}
              className="panel brackets rounded-md p-4 group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400">
              <div
                className="relative aspect-video w-full mb-3 bg-slate-800/40 rounded-sm overflow-hidden"
                aria-hidden>
                <Image
                  src={p.coverUrl || "/next.svg"}
                  alt={`${p.title} — screenshot of responsive homepage`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={false}
                />
              </div>
              <h3 className="text-base font-semibold tracking-wide group-hover:text-cyan-300 transition-colors">
                {p.title}
              </h3>
              <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                {p.summary}
              </p>
              <ul className="flex flex-wrap gap-2 mt-3 text-[10px] tracking-wide text-cyan-300/80">
                {(p.tags || []).slice(0, 3).map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Link>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/work" className="text-cyan-300 text-sm hover:underline">
            All Portfolio Case Studies — Web Development →
          </Link>
        </div>
      </section>
      {/* Services */}
      <section className="container-max" aria-labelledby="services-heading">
        <SectionHeader
          label="Capabilities"
          title="Services"
          intro="Core disciplines we deploy to execute stealth-clear visuals."
        />
        <div className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Web Development",
              body: "WordPress (Oxygen), Next.js & React development — responsive, SEO-minded front-ends, performance optimization, and CMS integrations. Able to build on the platform you prefer.",
            },
            {
              title: "Design",
              body: "UI/UX design and prototyping — visually clear interfaces focused on usability, conversions, and brand consistency.",
            },
            {
              title: "Consulting",
              body: "Technical & product consulting — architecture reviews, SEO & accessibility audits, and roadmaps to scale your web product.",
            },
          ].map((s) => (
            <div key={s.title} className="panel rounded-md p-6 brackets">
              <h3 className="font-display text-lg tracking-wide mb-2 text-cyan-300">
                {s.title}
              </h3>
              <p className="text-sm text-slate-400">{s.body}</p>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/services" className="text-cyan-300 text-sm hover:underline">
            All Services →
          </Link>
        </div>
      </section>
      {/* About teaser */}
      <section className="container-max" aria-labelledby="about-teaser-heading">
        <SectionHeader
          label="Intel"
          title="About"
          intro="About — Principles & process for building clear, fast, and accessible web experiences. Learn how we plan projects, prioritize performance, and measure success."
        />
        <div className="grid md:grid-cols-2 gap-10 items-start">
          <div className="space-y-4 text-sm text-slate-300 max-w-prose">
            <p>
              I’m Riley Pearce, a senior web developer with a passion for
              building clean, modern, and high-performing websites. With years
              of experience in front-end development, I specialize in Next.js,
              WordPress (including Oxygen and Elementor), GraphQL, and Tailwind
              CSS. My focus is always on creating fast, accessible, and scalable
              solutions that enhance user experience while delivering measurable
              results for businesses.
            </p>
            <p>
              Beyond coding, I bring expertise in UI/UX optimization, e-commerce
              integration, and custom plugin development, ensuring every project
              is tailored to meet unique business goals. From managing complex
              content systems to crafting intuitive interfaces, I thrive on
              solving technical challenges with creative, practical solutions.
              Whether it’s custom web applications, dynamic WordPress builds, or
              seamless API integrations, I deliver projects that combine
              technical precision with thoughtful design.
            </p>
            <p>
              <Link href="/about" className="text-cyan-300 underline">
                About — Principles & Process →
              </Link>
            </p>
          </div>
          <div
            className="relative aspect-[4/3] rounded-md panel overflow-hidden"
            aria-label="Portrait of Riley Pearce">
            <Image
              src="/riley-4-3.webp"
              alt="Riley Pearce — portrait"
              fill
              className="object-cover filter grayscale contrast-95"
              priority={false}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            {/* subtle cyan wash to match site tone; remove if you prefer pure b/w */}
            <div
              className="absolute inset-0 bg-cyan-300/6 mix-blend-screen pointer-events-none"
              aria-hidden
            />
          </div>
        </div>
      </section>
    </div>
  );
}
