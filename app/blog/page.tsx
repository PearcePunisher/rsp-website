import Link from 'next/link';
import Image from 'next/image';
import { client } from '@/src/sanity/client';

const QUERY = `*[_type == "post" && defined(slug.current)]|order(publishedAt desc)[0...12]{
  title,
  "slug": slug.current,
  publishedAt,
  "imageUrl": mainImage.asset->url,
  "excerpt": pt::text(body)[0...200]
}`;

const options = { next: { revalidate: 60 } };

type Post = { slug: string; title: string; publishedAt: string; imageUrl?: string; excerpt?: string };

export default async function BlogIndex() {
  const posts = await client.fetch<Post[]>(QUERY, {}, options);

  return (
    <div className="container-max py-16 space-y-12">
      <header className="space-y-2">
        <h1 className="font-display tracking-wide">Blog</h1>
        <p className="text-slate-400 max-w-prose text-sm">Recent posts and essays.</p>
      </header>
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="panel brackets rounded-md p-4 group">
            <div className="relative aspect-video w-full mb-3 bg-slate-800/40 rounded-sm overflow-hidden" aria-hidden>
              {p.imageUrl && (
                <Image src={p.imageUrl} alt={p.title} fill className="object-cover rounded-sm" sizes="(max-width: 640px) 100vw, 50vw" />
              )}
            </div>
            <h2 className="text-base font-semibold tracking-wide group-hover:text-cyan-300 transition-colors">{p.title}</h2>
            <p className="text-xs text-slate-400 mt-1 line-clamp-3">{p.excerpt}</p>
            <span className="mt-3 inline-block text-[10px] text-cyan-300/70 tracking-widest">{new Date(p.publishedAt).toLocaleDateString()}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
