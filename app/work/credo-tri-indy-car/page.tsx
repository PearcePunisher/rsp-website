import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Racing Hospitality — White-Label Racing Team App",
  description:
    "A white-label mobile app platform for professional racing teams, built in collaboration with Alexander Bisant. Currently powers Juncos Hollinger Racing's fan and VIP hospitality experience — live race data, driver profiles, VIP booking, QR check-in, and real-time fan chat, all rebrandable per team from a single codebase.",
  openGraph: {
    title: "Racing Hospitality — White-Label Racing Team App",
    description:
      "One React Native codebase, rebranded and re-backended per racing team. Live schedules, VIP experiences, QR check-in, real-time chat, and more — currently powering Juncos Hollinger Racing.",
    images: ["/work/credo/cover.webp"],
  },
};

const ASSET_DIR = path.join(process.cwd(), "public", "work", "credo");
function hasAsset(filename: string) {
  try {
    return fs.existsSync(path.join(ASSET_DIR, filename));
  } catch {
    return false;
  }
}

function Shot({
  file,
  alt,
  label,
  className = "",
}: {
  file: string;
  alt: string;
  label: string;
  className?: string;
}) {
  const exists = hasAsset(file);
  return (
    <div
      className={`relative aspect-video w-full panel rounded-md overflow-hidden ${className}`}>
      {exists ? (
        <Image
          src={`/work/credo/${file}`}
          alt={alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center border border-dashed border-cyan-500/20 m-2 rounded-sm">
          <span className="text-[11px] tracking-widest text-slate-600 text-center px-4">
            SCREENSHOT PENDING
            <br />
            {label}
          </span>
        </div>
      )}
    </div>
  );
}

const FEATURES = [
  {
    title: "Live Race Schedule & Countdown",
    body: "Dynamic countdown timers to the next race weekend, with practice, qualifying, and race times pulled from the live schedule feed.",
  },
  {
    title: "Driver & Team Profiles",
    body: "Biographies, achievements, and social links for every driver, plus full team branding and car details.",
  },
  {
    title: "Car Gallery",
    body: "High-resolution showcase of team cars — swappable per season, livery, or sponsor deal.",
  },
  {
    title: "Interactive Track Map",
    body: "Venue layout, coordinates, and track-specific details for every stop on the calendar.",
  },
  {
    title: "VIP Experience Booking",
    body: "Fans browse, book, and manage exclusive hospitality passes and credentials right from the app.",
  },
  {
    title: "QR Code Check-In",
    body: "Every attendee gets a personal QR badge; staff scan it in-app for fast, contactless access at the gate.",
  },
  {
    title: "Real-Time Fan Chat",
    body: "Stream Chat-powered messaging so fans can talk race weekend live — typing indicators, reactions, and read receipts included.",
  },
  {
    title: "Push Notifications",
    body: "Race alerts and VIP updates land in a custom in-app notification tray, not just an OS banner that gets missed.",
  },
  {
    title: "Staff Directory & Directions",
    body: "Who to find on-site, and how to get there — built for the reality of a race weekend, not just the couch.",
  },
  {
    title: "Onboarding & FAQ",
    body: "A guided welcome video and FAQ so new fans and guests are oriented in under a minute.",
  },
];

const STACK = [
  "React Native (Expo)",
  "TypeScript",
  "Expo Router",
  "Strapi CMS",
  "Node.js on Railway",
  "Stream Chat",
  "SportRadar API",
  "EAS Build & OTA Updates",
];

export default function CredoWorkPage() {
  return (
    <article className="container-max py-16 space-y-16 max-w-4xl">
      <header className="space-y-6">
        <div>
          <span className="text-cyan-300 text-[10px] tracking-[0.25em] font-medium">
            CASE STUDY — MOBILE APP
          </span>
          <h1 className="font-display tracking-wide mt-2">
            Racing Hospitality App — One Codebase, Any Team
          </h1>
          <p className="text-slate-400 mt-2 text-sm max-w-prose">
            A white-label mobile app platform for professional racing teams.
            Not a one-off build, but a reusable product currently powering{" "}
            <strong className="text-slate-200 font-medium">
              Juncos Hollinger Racing&apos;s, American Communication Construction&apos;s, and CEDO Apps&apos;
            </strong>{" "}
            fan and VIP hospitality experience.
          </p>
        </div>
        <ul className="flex flex-wrap gap-2 text-[11px] tracking-wider text-cyan-300/80">
          {[
            "React Native",
            "Expo",
            "Strapi CMS",
            "Multi-Client / White-Label",
            "Real-Time Chat",
          ].map((tag) => (
            <li
              key={tag}
              className="px-2.5 py-1 rounded-full border border-cyan-400/40 bg-[#0b1419]/70">
              {tag}
            </li>
          ))}
        </ul>
        <p className="text-xs text-slate-500">
          Built in collaboration with{" "}
          <span className="text-slate-300">Alexander Bisant</span>{" "}
          (Backend Engineer).
        </p>
      </header>

      <Shot
        file="cover.webp"
        alt="Credo Tri IndyCar app — home screen with race countdown"
        label="Home screen / race countdown"
      />

      <section className="space-y-4">
        <h2 className="text-xl font-display tracking-wide text-cyan-300">
          One Codebase, Any Team
        </h2>
        <div className="space-y-4 text-sm text-slate-300 max-w-prose">
          <p>
            This isn&apos;t built for one client. It&apos;s built to be
            re-skinned for virtually any client. Every team runs on the same core
            app, driven by a per-client configuration layer that controls
            branding (light and dark theme, logos, app icons), platform
            metadata (bundle IDs, app store listings), and backend endpoints
            (CMS content, chat, push credentials). All without touching a
            single line of the app itself.
          </p>
          <p>
            Right now that architecture runs three brands from one codebase:
            the CEDO Apps reference build,{" "}
            <strong className="text-slate-200 font-medium">
              Juncos Hollinger Racing&apos;s
            </strong>{" "}
            hospitality app, and{" "}
            <strong className="text-slate-200 font-medium">
              American Communication Construction&apos;s
            </strong>{" "}
            hospitality app. Onboarding the next racing team, or any hospitality
            brand with fans, VIPs, and a venue, means writing a config file,
            not forking a repo.
          </p>
          <p>
            That same modularity is what makes the feature set flexible: a
            smaller team that doesn&apos;t need VIP ticketing or a livestreamed
            fan chat can ship a lighter build with those modules scoped out,
            while a flagship team gets the full suite. It&apos;s architected
            to be catered, not one-size-fits-all.
          </p>
        </div>
      </section>

      <section className="grid sm:grid-cols-2 gap-4">
        <Shot
          file="theming.webp"
          alt="Side-by-side comparison of two client themes in the app"
          label="White-label theming — two brands, one codebase"
          className="sm:col-span-2"
        />
      </section>

      <section className="space-y-6">
        <h2 className="text-xl font-display tracking-wide text-cyan-300">
          What&apos;s Inside
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {FEATURES.map((f) => (
            <div key={f.title} className="panel brackets rounded-md p-5">
              <h3 className="text-sm font-semibold tracking-wide text-slate-100">
                {f.title}
              </h3>
              <p className="text-xs text-slate-400 mt-2">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid sm:grid-cols-2 gap-4">
        <Shot
          file="schedule.webp"
          alt="Race schedule screen"
          label="Race schedule"
        />
        <Shot file="team.webp" alt="Team and driver profiles screen" label="Team & driver profiles" />
        <Shot
          file="track-map.webp"
          alt="Interactive track map screen"
          label="Interactive track map"
        />
        <Shot file="vip.webp" alt="VIP experiences screen" label="VIP experiences" />
        <Shot file="chat.webp" alt="Real-time fan chat screen" label="Fan chat" />
        <Shot file="qr.webp" alt="QR code check-in screen" label="QR check-in" />
      </section>

      <section className="space-y-4">
        <h2 className="text-xl font-display tracking-wide text-cyan-300">
          Under the Hood
        </h2>
        <p className="text-sm text-slate-300 max-w-prose">
          Built with React Native and Expo for a single codebase across iOS,
          Android, and web, backed by a Strapi CMS for content and a Node.js
          service on Railway for auth, chat tokens, and push credentials.
          Live race data (optionally) comes from SportRadar; real-time messaging runs on
          Stream Chat; builds and over-the-air updates ship through EAS.
        </p>
        <ul className="flex flex-wrap gap-2 mt-2 text-[11px] tracking-wider text-slate-400">
          {STACK.map((t) => (
            <li
              key={t}
              className="px-2.5 py-1 rounded-full border border-slate-700 bg-[#0b1419]/70">
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section
        className="panel rounded-md p-6 border border-amber-400/30"
        aria-label="Disclaimer">
        <p className="text-sm text-amber-200/90">
          <span className="font-display tracking-wide text-amber-300">
          A long shot:
          </span>{" "}
          If anyone from Porsche happens to be reading this, I&apos;d
          gladly trade the time and work that went into this app for a GT3.
          I&apos;m not holding my breath, but I figured it doesn&apos;t hurt
          to ask.
        </p>
      </section>

      <section className="panel rounded-md p-8 text-center space-y-4">
        <h2 className="font-display tracking-wide text-lg">
          Have an idea outside the usual website?
        </h2>
        <p className="text-sm text-slate-400 max-w-prose mx-auto">
          I build custom software for just about any use case not just
          marketing sites. Mobile apps, internal tools, white-label
          platforms, CMS-backed products, whatever the problem calls for.
          If you&apos;ve got something specific in mind, let&apos;s talk
          about it.
        </p>
        <Link href="/contact" className="btn" aria-label="Contact — Start a custom project">
          Let&apos;s build something
        </Link>
      </section>

      <nav className="flex justify-between text-xs tracking-wide pt-8 border-t border-cyan-500/20">
        <Link href="/work" className="text-cyan-300">
          ← All Work
        </Link>
      </nav>
    </article>
  );
}
