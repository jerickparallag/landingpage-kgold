# KGOLD Beauty Essentials — Landing Page

Brand-awareness marketing site for **KGOLD Beauty Essentials**. Built with Vite, React 19, TypeScript, and Tailwind CSS v4.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:5175](http://localhost:5175).

## Build & preview

```bash
npm run build
npm run preview
```

Static output is in `dist/` — deploy to Vercel, Cloudflare Pages, or Netlify.

## Project structure

| Path | Purpose |
|------|---------|
| `src/constants/content.ts` | All marketing copy — edit here without touching components |
| `src/constants/brand.constants.ts` | Logo path & sizing tokens (shared pattern with questionnaire) |
| `src/index.css` | KGOLD brand design tokens (portable to parcel-proof) |
| `src/components/ui/` | Reusable primitives: `Button`, `Card`, `SectionHeading` |
| `src/components/brand/AppBrand.tsx` | Shared logo + wordmark component |
| `src/hooks/useTheme.tsx` | Light/dark theme with `localStorage` persistence |
| `src/lib/careers.ts` | Future careers API stub |

## Reusability (parcel-proof / questionnaire)

These files follow the same conventions as `questionnaire/frontend` and can be copied into `parcel-proof-kgold/frontend` when aligning brand tokens:

- `src/index.css` — brand palette & dark mode
- `src/constants/brand.constants.ts`
- `src/lib/utils.ts` — `cn()` helper
- `src/utils/theme.utils.ts` + `src/constants/theme.constants.ts`
- `src/components/brand/AppBrand.tsx`
- `src/components/ui/Button.tsx`, `Card.tsx`

## Content updates

Replace placeholder copy in `src/constants/content.ts`. Add real photography to `public/` and update section components when assets are ready.

## Environment

Copy `.env.example` to `.env` when wiring the future careers endpoint:

```
VITE_CAREERS_API_URL=
```

## SEO

- Semantic HTML with a single `<h1>` in the hero
- Open Graph & Twitter meta in `index.html`
- `public/robots.txt` and `public/sitemap.xml`
- Add `public/og-image.png` (1200×630) before production deploy

## Out of scope (v1)

E-commerce, careers job board UI, CMS, backend contact form API.
