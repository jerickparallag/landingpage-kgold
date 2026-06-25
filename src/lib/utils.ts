import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes without conflicting utility overrides. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Luxury section title — prominent, standard casing, bolder than body. */
export const sectionHeadingClass =
  'text-xl font-semibold tracking-tight text-foreground sm:text-2xl lg:text-[1.75rem] lg:leading-snug';

/** Body copy directly under a section title. */
export const sectionDescriptionClass =
  'mt-3 text-sm font-light leading-relaxed text-muted-foreground sm:text-[15px]';

/** Intro lede under a section title (editorial blocks). */
export const sectionLedeClass = 'mt-5 text-base font-light leading-relaxed text-muted-foreground';

/** Grid item or card body copy. */
export const sectionItemBodyClass =
  'mt-2 text-sm font-light leading-relaxed text-muted-foreground';

/** Smaller subsection labels — location names, inquiry types, etc. */
export const subsectionHeadingClass =
  'text-xs font-medium tracking-wide text-foreground sm:text-[13px]';

/** Page hero h1 — editorial / inner pages. */
export const heroTitleClass =
  'text-[clamp(1.75rem,4vw,2.75rem)] leading-[1.12] font-light tracking-[0.04em]';

/** Home hero h1. */
export const heroHomeTitleClass =
  'text-[clamp(2rem,5vw,3.5rem)] leading-[1.08] font-light tracking-[0.06em] uppercase';

/** Collection hero h1. */
export const heroCollectionTitleClass =
  'text-[clamp(1.75rem,3.5vw,2.5rem)] leading-[1.1] font-light tracking-[0.04em]';

/** Hero subheadline — use after h1 (or after rule on home). */
export const heroSubheadlineClass =
  'text-base font-normal tracking-[0.06em] sm:text-lg';

/** Hero subheadline with standard top spacing after h1. */
export const heroSubheadlineSpacedClass = cn(heroSubheadlineClass, 'mt-6');

/** Hero body copy on dark backgrounds. */
export const heroBodyClass =
  'mt-4 max-w-xl text-sm font-light leading-relaxed text-white/65 sm:text-[15px]';

/** Hero CTA link row spacing. */
export const heroActionClass = 'mt-10';

/** Solid CTA button — monochrome. */
export const sectionCtaButtonClass =
  'mt-8 inline-flex items-center rounded-brand bg-foreground px-7 py-3 text-[10px] font-normal tracking-[0.22em] text-background uppercase transition hover:bg-foreground/85';

/** Hero CTA outline link — luxury ghost button. */
export const heroActionLinkClass = cn(
  heroActionClass,
  'luxury-cta-outline inline-flex w-fit',
);
