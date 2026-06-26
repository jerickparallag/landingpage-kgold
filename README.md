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
| `src/content/*.json` | **Marketing copy** — edit JSON without touching React code |
| `src/content/careers/` | Job & internship listings (API-ready JSON) |
| `src/constants/content.ts` | Re-exports resolved content for components |
| `src/constants/brand.constants.ts` | Logo path & sizing tokens (shared pattern with questionnaire) |
| `src/index.css` | KGOLD brand design tokens (portable to parcel-proof) |
| `src/components/ui/` | Reusable primitives: `Button`, `Card`, `SectionHeading` |
| `src/components/brand/AppBrand.tsx` | Shared logo + wordmark component |
| `src/hooks/useTheme.tsx` | Light/dark theme with `localStorage` persistence |
| `src/lib/careers.ts` | Careers fetch, filters, and API normalization |

## Content updates (non-technical editors)

All visible copy lives in **`src/content/`** as JSON files:

| File | What to edit |
|------|----------------|
| `site.json` | Site name, nav labels, footer links |
| `home.json` | Homepage hero, categories, bestsellers, FAQ, CTAs |
| `about.json` | About page copy |
| `contact.json` | Contact page copy |
| `careers-page.json` | Careers page labels & section text |
| `careers/jobs.json` | Open job listings |
| `careers/internships.json` | Internship programs |

Use `"imageKey"` for photos — pick from keys defined in `src/assets/images.ts` (e.g. `"heroBg"`, `"homeSkincareCover"`, `"aboutHero"`, `"jobTelesales"`). Assets live under `public/Home`, `public/About`, and `public/Career`. Do not paste file paths.

For jobs/internships, set `"applyUrl"` to the email or application link.

## Reusability (parcel-proof / questionnaire)

These files follow the same conventions as `questionnaire/frontend` and can be copied into `parcel-proof-kgold/frontend` when aligning brand tokens:

- `src/index.css` — brand palette & dark mode
- `src/constants/brand.constants.ts`
- `src/lib/utils.ts` — `cn()` helper
- `src/utils/theme.utils.ts` + `src/constants/theme.constants.ts`
- `src/components/brand/AppBrand.tsx`
- `src/components/ui/Button.tsx`, `Card.tsx`

## Content updates

Edit the JSON files in `src/content/` — see table above. Run `npm run dev` to preview changes.

## Environment

Copy `.env.example` to `.env` when wiring the careers API:

```
VITE_CAREERS_API_URL=https://your-api.example.com/careers
```

The API should return JSON matching `src/content/careers/jobs.json` + `internships.json` shape (`jobs[]`, `internships[]`, optional `updatedAt`). When unset, local JSON files are used.

## SEO

- Semantic HTML with a single `<h1>` in the hero
- Open Graph & Twitter meta in `index.html`
- `public/robots.txt` and `public/sitemap.xml`
- Add `public/og-image.png` (1200×630) before production deploy

## Out of scope (v1)

E-commerce, careers job board UI, CMS, backend contact form API.
