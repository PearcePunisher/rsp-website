import { MetadataRoute } from 'next';
import { client } from '@/src/sanity/client';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://www.roguesalad.co';
  const now = new Date();
  const slugs: string[] = await client.fetch(
    `*[_type == "work" && defined(slug.current)].slug.current`
  );
  return [
    { url: base, lastModified: now },
    { url: base + '/work', lastModified: now },
    { url: base + '/about', lastModified: now },
    { url: base + '/services', lastModified: now },
    { url: base + '/contact', lastModified: now },
    { url: base + '/privacy', lastModified: now },
    ...slugs.map((slug) => ({ url: `${base}/work/${slug}`, lastModified: now })),
  ];
}
