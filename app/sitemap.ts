import { MetadataRoute } from 'next';
import { projects } from './(data)/projects';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.roguesalad.co';
  const now = new Date();
  return [
    { url: base, lastModified: now },
    { url: base + '/work', lastModified: now },
    { url: base + '/about', lastModified: now },
    { url: base + '/services', lastModified: now },
    { url: base + '/contact', lastModified: now },
    { url: base + '/privacy', lastModified: now },
    ...projects.map(p => ({ url: `${base}/work/${p.slug}`, lastModified: now })),
  ];
}
