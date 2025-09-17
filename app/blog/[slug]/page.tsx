import { PortableText } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';
import { client } from '@/src/sanity/client';
import { notFound } from 'next/navigation';

const PAGE_QUERY = `*[_type == "page" && slug.current == $slug][0]{
  _id,
  title,
  "slug": slug.current,
  seoDescription,
  heroImage{asset->{url}},
  sections[]{
    _type == 'blockSection' => {
      _type,
      heading,
      content
    },
    _type == 'quoteSection' => {
      _type,
      quote,
      author,
      role
    },
    _type == 'ctaSection' => {
      _type,
      variant,
      heading,
      body,
      buttonLabel,
      buttonUrl
    },
    _type == 'imageSection' => {
      _type,
      image,
      alt,
      caption,
      fullWidth,
      credit
    }
  }
}`;

const options = { next: { revalidate: 120 } };

type PTBlock = { _type: string; [key: string]: unknown };
type BlockSection = { _type: 'blockSection'; heading?: string; content?: PTBlock[] };
type QuoteSection = { _type: 'quoteSection'; quote?: string; author?: string; role?: string };
type CtaSection = { _type: 'ctaSection'; variant?: string; heading?: string; body?: PTBlock[]; buttonLabel?: string; buttonUrl?: string };
interface ImageValue { asset?: { url?: string } }
type ImageSection = { _type: 'imageSection'; image?: ImageValue; alt?: string; caption?: string; fullWidth?: boolean; credit?: string };
type PageDoc = {
  _id: string;
  title: string;
  slug: string;
  seoDescription?: string;
  heroImage?: { asset?: { url?: string } };
  sections?: (BlockSection | QuoteSection | CtaSection | ImageSection)[];
};

export default async function PageView({ params }: { params: Promise<{ slug: string }> }) {
  const page = await client.fetch<PageDoc>(PAGE_QUERY, await params, options);
  if (!page) notFound();

  return (
    <article className="container-max py-16 space-y-10 max-w-3xl">
      <header className="space-y-2">
        <h1 className="font-display tracking-wide">{page.title}</h1>
        {page.seoDescription && (
          <p className="text-slate-400 text-sm max-w-prose">{page.seoDescription}</p>
        )}
      </header>
      {page.heroImage?.asset?.url && (
        <div className="relative aspect-video w-full panel rounded-md overflow-hidden" aria-label="Hero image">
          <Image src={page.heroImage.asset.url} alt={page.title} fill className="object-cover" />
        </div>
      )}
      {page.sections && page.sections.length > 0 && (
        <div className="space-y-12">
          {page.sections.map((section, idx) => {
            switch (section._type) {
              case 'blockSection': {
                const s = section as BlockSection;
                return (
                  <section key={idx} className="space-y-4">
                    {s.heading && <h2 className="text-xl font-display tracking-wide">{s.heading}</h2>}
                    {s.content && s.content.length > 0 && (
                      <div className="prose text-slate-300">
                        <PortableText value={s.content} />
                      </div>
                    )}
                  </section>
                );
              }
              case 'quoteSection': {
                const s = section as QuoteSection;
                return (
                  <figure key={idx} className="panel rounded-md p-6 space-y-3">
                    {s.quote && <blockquote className="text-lg font-medium leading-relaxed">“{s.quote}”</blockquote>}
                    {(s.author || s.role) && (
                      <figcaption className="text-xs text-slate-500">
                        {s.author}{s.role ? `, ${s.role}` : ''}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              case 'ctaSection': {
                const s = section as CtaSection;
                return (
                  <section key={idx} className="panel rounded-md p-8 text-center space-y-4">
                    {s.heading && <h2 className="font-display tracking-wide text-lg">{s.heading}</h2>}
                    {s.body && s.body.length > 0 && (
                      <div className="prose mx-auto text-slate-300">
                        <PortableText value={s.body} />
                      </div>
                    )}
                    {s.buttonLabel && s.buttonUrl && (
                      <Link href={s.buttonUrl} className="btn" aria-label={s.buttonLabel} target='_blank'>{s.buttonLabel}</Link>
                    )}
                  </section>
                );
              }
              case 'imageSection': {
                const s = section as ImageSection;
                const src = s.image?.asset?.url;
                if (!src) return null;
                return (
                  <figure key={idx} className={s.fullWidth ? '-mx-4 sm:mx-0' : ''}>
                    <div className={`relative w-full ${s.fullWidth ? 'aspect-[21/9]' : 'aspect-video'} panel rounded-md overflow-hidden`}>
                      <Image src={src} alt={s.alt || page.title} fill className="object-cover" />
                    </div>
                    {(s.caption || s.credit) && (
                      <figcaption className="mt-2 text-[11px] text-slate-500">
                        {s.caption}
                        {s.credit && <span className="ml-1 text-slate-600">© {s.credit}</span>}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              default:
                return null;
            }
          })}
        </div>
      )}
      <div className="pt-8 border-t border-cyan-500/20">
        <Link href="/blog" className="text-xs text-cyan-300 hover:underline">← All Pages</Link>
      </div>
    </article>
  );
}
