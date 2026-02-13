import { MetadataRoute } from 'next';
import { client } from '@/src/sanity/client';

type WorkSitemapEntry = {
  slug: string;
  updatedAt?: string;
  publishedAt?: string;
};

type BlogSitemapEntry = {
  slug: string;
  updatedAt?: string;
  publishedAt?: string;
  createdAt?: string;
};

const BASE_URL = 'https://www.roguesalad.co';

const WORK_QUERY = `*[_type == "work" && defined(slug.current)]{
  "slug": slug.current,
  "updatedAt": _updatedAt,
  publishedAt
}`;

const BLOG_QUERY = `*[_type == "page" && defined(slug.current)]{
  "slug": slug.current,
  "updatedAt": _updatedAt,
  "createdAt": _createdAt,
  publishedAt
}`;

function resolveLastModified(
  ...dates: Array<string | undefined>
): Date | undefined {
  const value = dates.find(Boolean);
  return value ? new Date(value) : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [workEntries, blogEntries] = await Promise.all([
    client.fetch<WorkSitemapEntry[]>(WORK_QUERY),
    client.fetch<BlogSitemapEntry[]>(BLOG_QUERY),
  ]);

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/work`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/privacy`, lastModified: now, changeFrequency: 'yearly', priority: 0.2 },
  ];

  const workRoutes: MetadataRoute.Sitemap = workEntries.map((entry) => ({
    url: `${BASE_URL}/work/${entry.slug}`,
    lastModified: resolveLastModified(entry.updatedAt, entry.publishedAt) ?? now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const blogRoutes: MetadataRoute.Sitemap = blogEntries.map((entry) => ({
    url: `${BASE_URL}/blog/${entry.slug}`,
    lastModified:
      resolveLastModified(entry.updatedAt, entry.publishedAt, entry.createdAt) ?? now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...staticRoutes, ...workRoutes, ...blogRoutes];
}
