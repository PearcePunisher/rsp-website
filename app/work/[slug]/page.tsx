import { projects } from "../../(data)/projects";
import { notFound } from "next/navigation";
import Link from "next/link";

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams(){
  return projects.map(p => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projects.find(p => p.slug === params.slug);
  if(!project) return { title: "Project" };
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: Props){
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if(!project) notFound();
  return (
    <article className="container-max py-16 space-y-10">
      <header>
        <h1 className="font-display tracking-wide mb-2">{project.title}</h1>
        <p className="text-slate-400 text-sm max-w-prose">{project.summary}</p>
        <ul className="flex flex-wrap gap-2 mt-4 text-[11px] tracking-wider text-cyan-300/80">
          {project.tags.map(tag => <li key={tag}>{tag}</li>)}
        </ul>
      </header>
      {project.videoUrl ? (
        <div className="aspect-video w-full panel rounded-md" aria-label="Video placeholder" />
      ) : (
        <div className="aspect-video w-full panel rounded-md" aria-label="Image placeholder" />
      )}
      {project.caseStudy && (
        <div className="grid md:grid-cols-3 gap-8 text-sm text-slate-300">
          <div>
            <h2 className="text-cyan-300 font-display text-sm tracking-widest mb-2">PROBLEM</h2>
            <p>{project.caseStudy.problem}</p>
          </div>
          <div>
            <h2 className="text-cyan-300 font-display text-sm tracking-widest mb-2">APPROACH</h2>
            <p>{project.caseStudy.approach}</p>
          </div>
          <div>
            <h2 className="text-cyan-300 font-display text-sm tracking-widest mb-2">OUTCOME</h2>
            <p>{project.caseStudy.outcome}</p>
          </div>
        </div>
      )}
      <nav className="flex justify-between text-xs tracking-wide pt-8 border-t border-cyan-500/20">
        <Link href="/work" className="text-cyan-300">← All Work</Link>
      </nav>
    </article>
  );
}
