import Image from "next/image";

export const metadata = { title: "About" };

export default function AboutPage() {
  return (
    <div className="container-max py-16 space-y-10">
      <header className="max-w-3xl space-y-4">
        <h1 className="font-display tracking-wide">About</h1>
        <p className="text-slate-400 text-sm">
          I’m Riley Pearce, a Senior Web Developer and VP of Front-End
          Technologies at Wicked Think Marketing. I specialize in building
          high-performing websites and digital experiences that balance clean
          design with technical precision. My approach is rooted in tactical
          minimalism—removing clutter while amplifying clarity, usability, and
          performance.
        </p>
      </header>

      <blockquote className="panel rounded-md p-6 text-slate-300 text-sm leading-relaxed italic border-cyan-500/30 relative">
        <p>
          &quot;Every project I work on is an exercise in eliminating friction
          and amplifying signal. Good design is not just about looks—it’s about
          accessibility, speed, and creating experiences people actually enjoy
          using.&quot;
        </p>
      </blockquote>

      <section>
        <h2 className="text-cyan-300 font-display text-sm tracking-widest mb-3">
          SKILLS
        </h2>
        <ul className="grid sm:grid-cols-3 gap-3 text-xs tracking-wide">
          {[
            "Web Development",
            "Next.js & React",
            "WordPress & Oxygen Builder",
            "GraphQL & API Integration",
            "E-Commerce Systems",
            "UI/UX & Material Design",
            "Video Editing & Motion Graphics",
            "Brand Systems & Digital Strategy",
          ].map((skill) => (
            <li key={skill} className="panel p-2 rounded-sm text-center">
              {skill}
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-3xl space-y-4 text-slate-400 text-sm leading-relaxed">
        <p>
          I thrive on problem-solving, whether it’s streamlining user flows,
          improving site performance, or bridging the gap between design and
          engineering. My work extends across industries including marketing,
          fitness, education, and gaming.
        </p>
      </section>
      <section className="space-y-6">
        <h2 className="text-cyan-300 font-display text-sm tracking-widest">RESUME</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-slate-200 font-medium">Experience</h3>
            <ul className="space-y-3">
              {[
                {
                  role: "VP, Front-End Technologies",
                  company: "Wicked Think Marketing",
                  period: "2021 — Present",
                  bullets: [
                    "Lead front-end architecture and performance strategy across projects.",
                    "Build scalable, accessible interfaces in Next.js/React and WordPress.",
                    "Mentor engineers and streamline dev workflows and standards.",
                  ],
                },
                {
                  role: "Senior Web Developer (Consultant)",
                  company: "Independent",
                  period: "2015 — Present",
                  bullets: [
                    "Ship custom websites, design systems, and e‑commerce experiences.",
                    "Integrate APIs/GraphQL and optimize Lighthouse/Core Web Vitals.",
                    "Collaborate with designers to deliver clear, minimal UX.",
                  ],
                },
              ].map((job) => (
                <li key={`${job.company}-${job.role}`} className="panel rounded-md p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-slate-200 font-medium">
                        {job.role} <span className="text-slate-400">@ {job.company}</span>
                      </p>
                    </div>
                    <span className="text-xs text-slate-400 whitespace-nowrap">{job.period}</span>
                  </div>
                  <ul className="mt-3 list-disc pl-5 text-xs text-slate-400 space-y-1">
                    {job.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-slate-200 font-medium">Tools</h3>
            <ul className="grid sm:grid-cols-2 gap-3 text-xs tracking-wide">
              {[
                "Next.js / React",
                "TypeScript",
                "Tailwind CSS",
                "Node.js",
                "GraphQL / REST",
                "WordPress / PHP",
                "Oxygen / ACF",
                "Vite / Webpack",
              ].map((tool) => (
                <li key={tool} className="panel p-2 rounded-sm text-center">
                  {tool}
                </li>
              ))}
            </ul>
            <div className="panel brackets rounded-md p-4 space-y-4">
              <header className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm tracking-widest text-cyan-300 font-display">RILEY PEARCE</p>
                  <p className="text-slate-300 text-sm mt-1">Senior Web Developer • VP, Front-End Technologies</p>
                </div>
                <div className="text-right text-[11px] text-slate-400 leading-relaxed">
                  <a href="mailto:riley@roguesalad.co" className="hover:text-cyan-300">riley@roguesalad.co</a>
                </div>
              </header>
              <div className="codec-line" />
              <section className="space-y-2">
                <h4 className="text-[12px] tracking-widest text-cyan-300 font-display">SUMMARY</h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Tactical front‑end specialist focused on speed, accessibility, and clean execution.
                  I design and build performant interfaces with Next.js/React and WordPress, and
                  streamline delivery through pragmatic standards, strong collaboration, and attention to detail.
                </p>
              </section>
              <section className="space-y-2">
                <h4 className="text-[12px] tracking-widest text-cyan-300 font-display">HIGHLIGHTS</h4>
                <ul className="text-xs text-slate-400 list-disc pl-5 space-y-1">
                  <li>Architect and lead front‑end delivery for agency and freelance projects.</li>
                  <li>Optimize Core Web Vitals and accessibility without sacrificing design.</li>
                  <li>Ship scalable, maintainable UI systems across React and WordPress.</li>
                </ul>
              </section>
              <section className="space-y-2">
                <h4 className="text-[12px] tracking-widest text-cyan-300 font-display">SPECIALTIES</h4>
                <ul className="flex flex-wrap gap-2 text-[11px]">
                  {[
                    "Next.js / React",
                    "TypeScript",
                    "WordPress / Oxygen",
                    "GraphQL / REST",
                    "UI/UX",
                    "Performance",
                    "Accessibility",
                  ].map((tag) => (
                    <li key={tag} className="rounded-sm border border-cyan-500/30 bg-black/20 px-2 py-1 text-slate-300">
                      {tag}
                    </li>
                  ))}
                </ul>
              </section>
            </div>
          </div>
        </div>
      </section>
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
              src="/Cats/Void.webp"
              alt="Void Laying in front of a keyboard"
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
              <h3 className="font-display tracking-wide text-lg text-cyan-300">Void</h3>
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
    </div>
  );
}
