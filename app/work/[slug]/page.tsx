import { projects } from "../../(data)/projects";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();
  let outboundHref: string | undefined = undefined;
  if (project.siteUrl) {
    try {
      const u = new URL(project.siteUrl);
      // UTM parameters: update source/medium/campaign as desired
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
        <p className="text-slate-400 text-sm max-w-prose">{project.summary}</p>
        <ul className="flex flex-wrap gap-2 mt-4 text-[11px] tracking-wider text-cyan-300/80">
          {project.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </header>
      <div
        className="relative aspect-video w-full panel rounded-md overflow-hidden"
        aria-label="Project cover image">
        <Image
          src={project.coverImage}
          alt={project.title}
          fill
          className="object-cover"
          priority={false}
          sizes="(max-width: 768px) 100vw, 80vw"
        />
      </div>
      {project.caseStudy && (
        <div className="grid md:grid-cols-3 gap-8 text-sm text-slate-300">
          <div>
            <h2 className="text-cyan-300 font-display text-sm tracking-widest mb-2">
              PROBLEM
            </h2>
            <p>{project.caseStudy.problem}</p>
          </div>
          <div>
            <h2 className="text-cyan-300 font-display text-sm tracking-widest mb-2">
              APPROACH
            </h2>
            <p>{project.caseStudy.approach}</p>
          </div>
          <div>
            <h2 className="text-cyan-300 font-display text-sm tracking-widest mb-2">
              OUTCOME
            </h2>
            <p>{project.caseStudy.outcome}</p>
          </div>
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
      <nav className="flex justify-between text-xs tracking-wide pt-8 border-t border-cyan-500/20">
        <Link href="/work" className="text-cyan-300">
          ← All Work
        </Link>
      </nav>
    </article>
  );
}
