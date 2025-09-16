import { PortableText } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/src/sanity/client';
import { notFound } from 'next/navigation';

const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  publishedAt,
  "imageUrl": mainImage.asset->url,
  body,
  url
}`;

const options = { next: { revalidate: 60 } };

type Post = { title: string; slug: string; publishedAt?: string; imageUrl?: string; body?: unknown[]; url?: string };

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const post = await client.fetch<Post>(POST_QUERY, await params, options);
  if (!post) notFound();

  return (
    <article className="container-max py-16 space-y-8 max-w-3xl">
      <header>
        <h1 className="font-display tracking-wide mb-2">{post.title}</h1>
        {post.publishedAt && <p className="text-xs text-slate-400">{new Date(post.publishedAt).toLocaleDateString()}</p>}
      </header>
      {post.imageUrl && (
        <div className="relative aspect-video w-full panel rounded-md overflow-hidden">
          <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
        </div>
      )}
      <div className="prose text-slate-300">
        {/* PortableText typings require @portabletext/types in the build; silence type check here */}
        {/* @ts-expect-error allow unknown portable text shape */}
        {Array.isArray(post.body) && <PortableText value={post.body} />}
      </div>
      {post.url && (
        <div className="pt-4">
          <a href={post.url} className="btn" target="_blank" rel="noopener">Visit link ↗</a>
        </div>
      )}
      <div className="pt-6">
        <Link href="/blog" className="text-xs text-cyan-300 hover:underline">← Back to blog</Link>
      </div>
    </article>
  );
}
