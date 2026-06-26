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
  'text-[clamp(2.35rem,6.5vw,4.5rem)] leading-[0.92] font-extrabold tracking-[0.04em] uppercase text-white';

/** Collection hero h1. */
export const heroCollectionTitleClass =
  'text-[clamp(1.95rem,4.5vw,3.25rem)] leading-[0.94] font-extrabold tracking-[0.04em] uppercase text-white';

/** Hero subheadline — use after h1 (or after rule on home). */
export const heroSubheadlineClass =
  'text-base font-semibold tracking-[0.04em] text-white/80 sm:text-lg';

/** Hero body copy over image backgrounds. */
export const heroBodyClass =
  'mt-4 max-w-xl text-sm font-medium leading-relaxed text-white/85 sm:text-base';

/** Shared hero section shell. */
export const heroSectionClass = 'relative overflow-hidden bg-background text-foreground';

/** Horizontal fade — black gradient for hero text readability. */
export const heroOverlayHorizontalClass =
  'pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/5';

/** Vertical fade — black gradient for hero depth. */
export const heroOverlayVerticalClass =
  'pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10';

/** Hero CTA outline link over image backgrounds. */
export const heroCtaOnImageClass =
  'border-2 font-medium text-white border-white hover:bg-white hover:text-black';

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

/** Split a phrase into two editorial headline rows. */
export function splitEditorialHeadline(text: string): string[] {
  const words = text.trim().split(/\s+/);
  if (words.length <= 1) return [text];
  const midpoint = Math.ceil(words.length / 2);
  return [words.slice(0, midpoint).join(' '), words.slice(midpoint).join(' ')];
}

/** Stagger timing for hero entrance animations. */
export const HERO_ENTER_BASE_DELAY = 0.45;
export const HERO_ENTER_LINE_STEP = 0.14;

export function getHeroEnterDelay(lineIndex: number): string {
  return `${HERO_ENTER_BASE_DELAY + lineIndex * HERO_ENTER_LINE_STEP}s`;
}

export function getHeroEnterDelayAfterLines(lineCount: number, offset: number): string {
  return `${HERO_ENTER_BASE_DELAY + lineCount * HERO_ENTER_LINE_STEP + offset}s`;
}

export function heroEnterItemClass(animate: boolean, ...classes: ClassValue[]) {
  return cn(animate && 'hero-enter-item', ...classes);
}

export function heroEnterDelayStyle(animate: boolean, delay: string) {
  return animate ? { animationDelay: delay } : undefined;
}
