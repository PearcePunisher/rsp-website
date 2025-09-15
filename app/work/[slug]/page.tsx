import { client } from "@/src/sanity/client";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const POST_QUERY = `*[_type == "work" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  summary,
  siteUrl,
  "coverUrl": coverImage.asset->url,
  tags,
  caseStudy,
  problemTest,
  plugins[]{ name, url, description },
  credits[]{ name, url, role }
}`;

const options = { next: { revalidate: 30 } };

type WorkDoc = {
  title: string;
  slug: string;
  summary?: string;
  siteUrl?: string;
  coverUrl?: string;
  tags?: string[];
  caseStudy?: { problem?: string; approach?: string; outcome?: string };
  plugins?: { name: string; url: string; description?: string }[];
  credits?: { name: string; url?: string; role: string }[];
};

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const project = await client.fetch<WorkDoc>(POST_QUERY, await params, options);
  if (!project) notFound();

  let outboundHref: string | undefined;
  if (project.siteUrl) {
    try {
      const u = new URL(project.siteUrl);
      u.searchParams.set("utm_source", "roguesalad.co");
      u.searchParams.set("utm_medium", "referral");
      u.searchParams.set("utm_campaign", project.slug);
      outboundHref = u.toString();
    } catch {
      outboundHref = project.siteUrl;
    }
  }

  return (
    <article className="container-max py-16 space-y-10">
      <header>
        <h1 className="font-display tracking-wide mb-2">{project.title}</h1>
        {project.summary && (
          <p className="text-slate-400 text-sm max-w-prose">{project.summary}</p>
        )}
        {project.tags && project.tags.length > 0 && (
          <ul className="flex flex-wrap gap-2 mt-4 text-[11px] tracking-wider text-cyan-300/80">
            {project.tags.map((tag) => (
              <li
                key={tag}
                className="px-2.5 py-1 rounded-full border border-cyan-400/40 bg-[#0b1419]/70">
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>
      {project.coverUrl && (
        <div
          className="relative aspect-video w-full panel rounded-md overflow-hidden"
          aria-label="Project cover image">
          <Image
            src={project.coverUrl}
            alt={project.title}
            fill
            className="object-cover"
            priority={false}
            sizes="(max-width: 768px) 100vw, 80vw"
          />
        </div>
      )}
      {project.caseStudy && (
        <div className="grid md:grid-cols-3 gap-8 text-sm text-slate-300">
          {project.caseStudy.problem && (
            <div>
              <h2 className="text-cyan-300 font-display text-sm tracking-widest mb-2">
                PROBLEM
              </h2>
              <p>{project.caseStudy.problem}</p>
            </div>
          )}
          {project.caseStudy.approach && (
            <div>
              <h2 className="text-cyan-300 font-display text-sm tracking-widest mb-2">
                APPROACH
              </h2>
              <p>{project.caseStudy.approach}</p>
            </div>
          )}
          {project.caseStudy.outcome && (
            <div>
              <h2 className="text-cyan-300 font-display text-sm tracking-widest mb-2">
                OUTCOME
              </h2>
              <p>{project.caseStudy.outcome}</p>
            </div>
          )}
        </div>
      )}
      {outboundHref && (
        <div className="pt-2">
          <a
            href={outboundHref}
            target="_blank"
            rel="noopener"
            referrerPolicy="strict-origin-when-cross-origin"
            className="btn text-sm">
            Visit Client Website ↗
          </a>
        </div>
      )}

      {project.plugins && project.plugins.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-display tracking-wide mb-4">
            Key Tools & Plugins
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.plugins.map((pl) => (
              <a
                key={pl.name}
                href={pl.url}
                target="_blank"
                rel="noopener nofollow sponsored"
                className="group inline-flex items-center gap-2 rounded-md border border-cyan-400/40 bg-[#0b1419]/70 px-4 py-2 text-xs font-medium tracking-wide text-cyan-200 transition
                           hover:border-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-100
                           focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-0">
                <span>{pl.name}</span>
                <span className="text-[10px] opacity-70 group-hover:opacity-90">
                  ↗
                </span>
              </a>
            ))}
          </div>
          {project.plugins.some((p) => p.description) && (
            <ul className="mt-4 space-y-1 text-[11px] text-slate-400">
              {project.plugins
                .filter((p) => p.description)
                .map((p) => (
                  <li key={p.name}>
                    <span className="text-cyan-300">{p.name}:</span>{" "}
                    {p.description}
                  </li>
                ))}
            </ul>
          )}
          <p className="mt-4 text-xs text-slate-500">
            Some links may be affiliate links and using them helps support my cats, Ripley and Void.
          </p>
        </section>
      )}
      {project.credits && project.credits.length > 0 && (
        <section className="mt-12">
          <h2 className="text-xl font-display tracking-wide mb-4">Credits</h2>
          <ul className="space-y-1 text-sm text-slate-300">
            {project.credits.map((c) => (
              <li key={c.name} className="flex items-center gap-2">
                <span className="text-cyan-300">{c.role}:</span>
                {c.url ? (
                  (() => {
                    let creditHref = c.url as string;
                    try {
                      const u = new URL(c.url as string);
                      u.searchParams.set("utm_source", "roguesalad.co");
                      u.searchParams.set("utm_medium", "referral");
                      u.searchParams.set("utm_campaign", project.slug);
                      u.searchParams.set("utm_content", "credit");
                      u.searchParams.set("utm_term", c.role);
                      creditHref = u.toString();
                    } catch {}
                    return (
                      <a href={creditHref} target="_blank" rel="noopener" className="underline hover:text-cyan-100">{c.name} ↗</a>
                    );
                  })()
                ) : (
                  <span>{c.name}</span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
      <section className="panel rounded-md p-8 text-center space-y-3 mt-12">
        <h2 className="font-display tracking-wide text-lg">Want a website like this one?</h2>
        <Link href="/contact" className="btn" aria-label="Contact — Start a project">
          Let&apos;s chat
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
