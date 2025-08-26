<h1 align="center">Rogue Salad Productions Portfolio</h1>

Stealth-influenced creative studio site built with Next.js App Router, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack
- Next.js (App Router)
- TypeScript
- Tailwind CSS (v4 inline @theme) + custom tokens
- Framer Motion (animations)
- next-seo (planned) / native metadata API
- Lucide Icons (planned)
- shadcn/ui primitives (to be integrated for form + modal components)

## Running Locally
```bash
npm install
npm run dev
```
Visit http://localhost:3000

## Project Data
Portfolio projects are defined in `app/(data)/projects.ts` using the `Project` type:
```ts
export type Project = {
	slug: string; title: string; role: string[]; year: number;
	category: "Filmmaking" | "Editing" | "Motion" | "Branding";
	tags: string[]; summary: string; coverImage: string; videoUrl?: string;
	images?: string[]; caseStudy?: { problem: string; approach: string; outcome: string };
};
```
Add or edit entries, then restart the dev server if using static generation for new slugs.

Media placeholders live under `/public/placeholders/` (create as needed). Replace with real assets maintaining descriptive `alt` text when implemented.

## Accessibility Targets
- Body font >=16px, line-height 1.6
- Visible focus state (cyan outline) for all interactive elements
- Sufficient contrast (AA) against dark surfaces
- Reduced motion respected via `prefers-reduced-motion`

## Performance / SEO Targets
- Lighthouse: 95+ Performance, 100 A11y, 100 Best Practices, 100 SEO (optimize once real media present)
- Metadata & Open Graph configured in `app/layout.tsx`
- `sitemap.ts` + `robots.ts` included (update production domain)

## Roadmap (Next Steps)
- Implement page transition shutter animation
- Add filter/search & sort UI on Work index
- Add Lightbox / VideoEmbed components
- Integrate shadcn/ui primitives & consistent form validation
- Command Palette (Cmd+K) for quick project jump
- Stealth Mode toggle (mute cyan accents)
- Replace placeholder hero background with procedural beams

## Adding A Project (Quick Guide)
1. Open `app/(data)/projects.ts`
2. Duplicate an object and change: `slug`, `title`, `year`, etc.
3. Provide at least `coverImage` (e.g. `/placeholders/new-cover.jpg`)
4. (Optional) Add `caseStudy` sections for detail page content.
5. Add any images to `/public/placeholders/` until real media is ready.

## Deployment
Deploy easily on Vercel. Set `NEXT_PUBLIC_SITE_URL` environment variable for canonical links and OG URLs once using dynamic generation.

## License
Private / All rights reserved (update if distributing).

