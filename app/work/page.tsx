import Link from "next/link";
import { type SanityDocument } from "next-sanity";
import Image from "next/image";

import { client } from "@/src/sanity/client";

const WORK_QUERY = `*[
  _type == "work" && defined(slug.current)
]|order(publishedAt desc)[0...12]{
  _id,
  title,
  slug,
  publishedAt,
  "coverUrl": coverImage.asset->url,
  summary,
  category
}`;

const options = { next: { revalidate: 30 } };

export default async function IndexPage() {
  const work = await client.fetch<SanityDocument[]>(WORK_QUERY, {}, options);

  return (
    // <main className="container mx-auto min-h-screen max-w-3xl p-8">
    //   <h1 className="text-4xl font-bold mb-8">My Work</h1>
    //   <ul className="flex flex-col gap-y-4">
    //     {work.map((work) => (
    //       <li className="hover:underline" key={work._id}>
    //         <Link href={`/tech/${work.slug.current}`}>
    //           <h2 className="text-xl font-semibold">{work.title}</h2>
    //           <p>{new Date(work.publishedAt).toLocaleDateString()}</p>
    //         </Link>
    //       </li>
    //     ))}
    //   </ul>
    // </main>

    <div className="container-max py-16 space-y-12">
      <header className="space-y-2">
        <h1 className="font-display tracking-wide">Work Archive</h1>
        <p className="text-slate-400 max-w-prose text-sm">
          Browse projects by category. Filters & search coming soon.
        </p>
      </header>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {work.map((work) => (
          <Link
            key={work.slug.current}
            href={`/work/${work.slug.current}`}
            className="panel brackets rounded-md p-4 group">
            <div
              className="relative aspect-video w-full mb-3 bg-slate-800/40 rounded-sm overflow-hidden"
              aria-hidden>
              <Image
                src={work.coverUrl}
                alt={work.title}
                fill
                className="object-cover rounded-sm"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                priority={false}
              />
            </div>
            <h2 className="text-base font-semibold tracking-wide group-hover:text-cyan-300 transition-colors">
              {work.title}
            </h2>
            <p className="text-xs text-slate-400 mt-1 line-clamp-2">
              {work.summary}
            </p>
            <span className="mt-3 inline-block text-[10px] text-cyan-300/70 tracking-widest">
              {work.category}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
