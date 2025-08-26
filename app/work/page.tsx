import { projects } from "../(data)/projects";
import Link from "next/link";
import Image from "next/image";

export const metadata = { title: "Work" };

export default function WorkIndex(){
  return (
    <div className="container-max py-16 space-y-12">
      <header className="space-y-2">
        <h1 className="font-display tracking-wide">Work Archive</h1>
        <p className="text-slate-400 max-w-prose text-sm">Browse projects by category. Filters & search coming soon.</p>
      </header>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map(p => (
          <Link key={p.slug} href={`/work/${p.slug}`} className="panel brackets rounded-md p-4 group">
            <div className="relative aspect-video w-full mb-3 bg-slate-800/40 rounded-sm overflow-hidden" aria-hidden>
              <Image
                src={p.coverImage}
                alt={p.title}
                fill
                className="object-cover rounded-sm"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={false}
              />
            </div>
            <h2 className="text-base font-semibold tracking-wide group-hover:text-cyan-300 transition-colors">{p.title}</h2>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">{p.summary}</p>
            <span className="mt-3 inline-block text-[10px] text-cyan-300/70 tracking-widest">{p.category}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
