import Link from "next/link";
export const metadata = {
  title: "Services — Web Development, WordPress, Next.js, SEO",
  description:
    "Freelance web development and design: Next.js/React front‑ends, WordPress (Oxygen) builds, performance optimization, accessibility, UI/UX, and SEO consulting.",
  openGraph: {
    title: "Services — Fast, Accessible Web Development",
    description:
      "WordPress (Oxygen) and Next.js websites, Core Web Vitals optimization, accessibility, UI/UX design, and technical consulting.",
    images: ["/rsp-logo.png"],
  },
  alternates: { canonical: "/services" },
};
const services = [
  {
    title: "Web Development (Next.js / React)",
    summary:
      "Responsive front‑ends with modern tooling, API/GraphQL integration, component systems, accessibility, and testing.",
    deliverables: [
      "Responsive UI & component system",
      "API/GraphQL integration",
      "Accessibility (WCAG) standards",
      "TypeScript + testing setup",
    ],
    timeline: "2–8 weeks typical",
  },
  {
    title: "WordPress Development (Oxygen / ACF)",
    summary:
      "Lean, maintainable WordPress builds with Oxygen, ACF‑driven content models, and editor‑friendly workflows.",
    deliverables: [
      "Custom Oxygen theme",
      "ACF content models",
      "Editor experience & training",
      "Migrations & redirects",
    ],
    timeline: "2–6 weeks typical",
  },
  {
    title: "Performance Optimization & SEO",
    summary:
      "Core Web Vitals, Lighthouse, semantic markup, and structured data for better rankings and conversions.",
    deliverables: [
      "Core Web Vitals tuning",
      "Image & asset optimization",
      "Schema.org structured data",
      "On‑page SEO improvements",
    ],
    timeline: "1–3 weeks typical",
  },
  {
    title: "UI/UX Design",
    summary:
      "Pragmatic, minimal interfaces focused on clarity, conversions, and brand consistency.",
    deliverables: [
      "Wireframes & user flows",
      "Design system & tokens",
      "Interactive prototypes",
      "Interaction polish",
    ],
    timeline: "1–4 weeks typical",
  },
  {
    title: "Technical Consulting & Audits",
    summary:
      "Architecture reviews, accessibility and SEO audits, and roadmaps to scale your web platform.",
    deliverables: [
      "Architecture & code review",
      "Accessibility audit",
      "SEO/site health report",
      "Roadmap & prioritization",
    ],
    timeline: "1–2 weeks typical",
  },
  {
    title: "E‑Commerce (WooCommerce)",
    summary:
      "Conversion‑minded stores with performant templates, checkout UX improvements, and analytics tracking.",
    deliverables: [
      "WooCommerce implementation",
      "Checkout UX optimization",
      "Payment integrations",
      "Analytics & events",
    ],
    timeline: "3–8 weeks typical",
  },
];
const ldJson = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Rogue Salad Productions",
  url: "https://roguesalad.co/services",
  areaServed: "Global",
  serviceType: services.map((s) => s.title),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Web Services",
    itemListElement: services.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.title,
        description: s.summary,
      },
    })),
  },
};
export default function ServicesPage(){
  return (
    <div className="container-max py-16 space-y-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ldJson) }}
      />
      <header className="space-y-2 max-w-3xl">
        <h1 className="font-display tracking-wide">Services</h1>
        <p className="text-slate-400 text-sm">
          Web development, WordPress (Oxygen), Next.js, performance optimization, accessibility, UI/UX, and SEO consulting — focused on speed, clarity, and measurable outcomes.
        </p>
      </header>
      <div className="grid gap-10 md:grid-cols-2 xl:grid-cols-3">
        {services.map(s => (
          <div key={s.title} className="panel brackets rounded-md p-6 flex flex-col gap-4">
            <div>
              <h2 className="font-display tracking-wide text-base text-cyan-300 mb-1">{s.title}</h2>
              <p className="text-xs text-slate-400 leading-relaxed">{s.summary}</p>
            </div>
            <ul className="text-[11px] text-slate-300 grid gap-1 list-disc pl-5">
              {s.deliverables.map(d => <li key={d}>{d}</li>)}
            </ul>
            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-auto pt-2 border-t border-cyan-500/20">
              <span>{s.timeline}</span>
              <Link href="/contact" className="text-cyan-300 hover:underline" aria-label={`Discuss ${s.title}`}>Inquire →</Link>
            </div>
          </div>
        ))}
      </div>
      <section className="panel rounded-md p-10 text-center space-y-4">
        <h2 className="font-display tracking-wide text-lg">Have a mission in mind?</h2>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link href="/contact" className="btn" aria-label="Contact — Request a project quote">Let&apos;s talk</Link> 
        </div>
      </section>
    </div>
  );
}
