import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/app/components/SectionHeader";
import { Reveal, RevealGroup, RevealItem } from "@/app/components/Reveal";

export const metadata: Metadata = {
  title: "About",
  description:
    "Riley Pearce is a senior web developer building fast, accessible WordPress and Next.js websites. Background, capabilities, and experience.",
  alternates: { canonical: "/about" },
};

const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Riley Pearce",
  jobTitle: "Senior Web Developer",
  url: "https://www.roguesalad.co/about",
  image: "https://www.roguesalad.co/riley-4-3.webp",
  worksFor: {
    "@type": "Organization",
    name: "Rogue Salad Productions",
    url: "https://www.roguesalad.co",
  },
};

const capabilities = [
  {
    group: "Build",
    items: ["Next.js & React", "TypeScript", "Tailwind CSS", "Node.js", "GraphQL & REST APIs", "Vite / Webpack"],
  },
  {
    group: "Platforms",
    items: ["WordPress & PHP", "Oxygen Builder & ACF", "E-commerce systems"],
  },
  {
    group: "Design & strategy",
    items: [
      "UI/UX & Material Design",
      "Performance",
      "Accessibility",
      "Brand systems & digital strategy",
      "Video editing & motion graphics",
    ],
  },
];

const experience = [
  {
    role: "VP, Front-End Technologies",
    company: "Wicked Think Marketing",
    period: "2021 - Present",
    bullets: [
      "Lead front-end architecture and performance strategy across projects.",
      "Build scalable, accessible interfaces in Next.js/React and WordPress.",
      "Mentor engineers and streamline dev workflows and standards.",
    ],
  },
  {
    role: "Senior Web Developer (Consultant)",
    company: "Independent",
    period: "2015 - Present",
    bullets: [
      "Ship custom websites, design systems, and e-commerce experiences.",
      "Integrate APIs/GraphQL and optimize Lighthouse/Core Web Vitals.",
      "Collaborate with designers to deliver clear, minimal UX.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="container-max py-16 space-y-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
      />

      {/* Hero: split, text left / portrait right; stacks on mobile */}
      <section className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-10 md:gap-16 items-center">
        <div className="space-y-6">
          <Reveal trigger="load">
            <h1 className="font-display tracking-wide">About</h1>
          </Reveal>
          <Reveal trigger="load" delay={0.1}>
            <p className="text-lg text-slate-300 leading-relaxed max-w-[40ch]">
              I&apos;m Riley Pearce, a senior web developer building fast, accessible websites
              that balance clean design with technical precision.
            </p>
          </Reveal>
        </div>
        <Reveal trigger="load" delay={0.2}>
          <div className="relative aspect-[4/3] rounded-md panel overflow-hidden">
            <Image
              src="/riley-4-3.webp"
              alt="Portrait of Riley Pearce"
              fill
              className="object-cover filter grayscale contrast-95"
              priority
              sizes="(max-width: 768px) 100vw, 45vw"
            />
            <div
              className="absolute inset-0 bg-cyan-300/6 mix-blend-screen pointer-events-none"
              aria-hidden
            />
          </div>
        </Reveal>
      </section>

      {/* Pull quote: full width, no card */}
      <Reveal>
        <figure className="max-w-3xl border-l-2 border-cyan-400/60 pl-6 md:pl-8 space-y-4">
          <blockquote className="text-lg md:text-xl text-slate-200 leading-relaxed">
            <p>
              &ldquo;Every project I work on is an exercise in eliminating friction and amplifying
              signal. Good design is not just about looks. It&apos;s about accessibility, speed, and
              creating experiences people actually enjoy using.&rdquo;
            </p>
          </blockquote>
          <figcaption className="text-sm text-slate-400">
            Riley Pearce, Senior Web Developer
          </figcaption>
        </figure>
      </Reveal>

      {/* Capabilities: prose left, grouped tags right; stacks on mobile */}
      <section aria-labelledby="capabilities-heading">
        <SectionHeader id="capabilities-heading" title="What I work with" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          <Reveal className="space-y-4 text-slate-300 leading-relaxed max-w-prose">
            <p>
              I&apos;m also VP of Front-End Technologies at Wicked Think Marketing. My approach is
              rooted in tactical minimalism: removing clutter while amplifying clarity, usability,
              and performance.
            </p>
            <p>
              I thrive on problem-solving, whether it&apos;s streamlining user flows, improving site
              performance, or bridging the gap between design and engineering. My work extends
              across industries including marketing, fitness, education, and gaming.
            </p>
          </Reveal>
          <RevealGroup className="space-y-8">
            {capabilities.map((c) => (
              <RevealItem key={c.group} className="space-y-3">
                {/* `!` needed: globals.css sets unlayered h1-h3 sizes, which outrank Tailwind utilities */}
                <h3 className="font-display text-lg! tracking-wide text-cyan-300">{c.group}</h3>
                <ul className="flex flex-wrap gap-2">
                  {c.items.map((item) => (
                    <li key={item} className="tag">
                      {item}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Experience: vertical timeline */}
      <section aria-labelledby="experience-heading">
        <SectionHeader id="experience-heading" title="Experience" />
        <RevealGroup as="ul" className="max-w-3xl border-l border-cyan-500/30 space-y-10">
          {experience.map((job) => (
            <RevealItem as="li" key={`${job.company}-${job.role}`} className="pl-6 md:pl-8 space-y-2">
              <p className="text-sm text-slate-400">{job.period}</p>
              <h3 className="font-display text-lg! md:text-xl! tracking-wide text-slate-100">
                {job.role} <span className="font-normal text-slate-400">at {job.company}</span>
              </h3>
              <ul className="list-disc pl-5 text-sm text-slate-300 space-y-1 leading-relaxed">
                {job.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      {/* CTA */}
      <Reveal>
        <section className="panel brackets rounded-md p-10 text-center space-y-4">
          <h2 className="font-display tracking-wide text-lg">Have a mission in mind?</h2>
          <p className="text-sm text-slate-400">
            Get a ballpark in a couple of minutes, or tell me about your project directly.
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <Link href="/quote" className="btn btn-primary">
              Get an Estimate
            </Link>
            <Link href="/contact" className="btn">
              Let&apos;s Talk
            </Link>
          </div>
        </section>
      </Reveal>

      <Reveal>
      {/* Cats Section */}
      <section className="space-y-8 pt-4">
        <h2 className="text-cyan-300 font-display text-sm tracking-widest">CATS: RIPLEY & VOID</h2>
        <p className="text-slate-400 text-sm max-w-prose">Mission support felines. A weapon to surpass Metal Gear.</p>
        <div className="grid md:grid-cols-2 gap-8">
          {/* Ripley */}
          <div className="panel rounded-md p-5 space-y-4 brackets">
          <div
            className="relative aspect-[4/3] rounded-md panel overflow-hidden"
            aria-label="Photo of Ripley the cat">
            <Image
              src="/Cats/ripley-dnd.webp"
              alt="Ripley standing in front of a GM Screen for the ALIEN RPG."
              fill
              className="object-cover"
              priority={false}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0 bg-cyan-300/6 mix-blend-screen pointer-events-none"
              aria-hidden
            />
          </div>
            <div className="space-y-2">
              <h3 className="font-display tracking-wide text-lg text-cyan-300">Ripley</h3>
              <p className="text-sm text-slate-300 leading-relaxed">Ripley is, for all intents and purposes, a baby. She loves being held and cuddled, and she has a particular fondness for warm laps and soft blankets. She is a phenomenal coding companion and often provides moral support during late-night coding sessions. And yes, her namesake comes from the 1979 film &quot;ALIEN.&quot;</p>
              <a
                href="https://donate.stripe.com/3cI4gB8cR3Z6f6J3bI87K01"
                target="_blank"
                rel="noopener noreferrer"
                className="btn text-xs"
                aria-label="Buy Ripley a treat (opens Stripe in new tab)"
              >
                Buy Ripley a Treat ↗
              </a>
            </div>
          </div>
          {/* Void */}
          <div className="panel rounded-md p-5 space-y-4 brackets">
          <div
            className="relative aspect-[4/3] rounded-md panel overflow-hidden"
            aria-label="Photo of Void the cat">
            <Image
              src="/Cats/void.webp"
              alt="The Void Laying in front of a keyboard"
              fill
              className="object-cover"
              priority={false}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div
              className="absolute inset-0 bg-cyan-300/6 mix-blend-screen pointer-events-none"
              aria-hidden
            />
          </div>
            <div className="space-y-2">
              <h3 className="font-display tracking-wide text-lg text-cyan-300">The Void</h3>
              <p className="text-sm text-slate-300 leading-relaxed">The Void will regularly take advantage of her fur coloring to blend in with the shadows. She is, without a doubt, the loudest and most vocal cat I&apos;ve ever had the pleasure of knowing. She&apos;s incredibly soft and has a knack for finding the coziest spots in the house.</p>
              <a
                href="https://donate.stripe.com/3cI4gB8cR3Z6f6J3bI87K01"
                target="_blank"
                rel="noopener noreferrer"
                className="btn text-xs"
                aria-label="Buy Void a treat (opens Stripe in new tab)"
              >
                Buy Void a Treat ↗
              </a>
            </div>
          </div>
        </div>
      </section>
      </Reveal>
    </div>
  );
}
