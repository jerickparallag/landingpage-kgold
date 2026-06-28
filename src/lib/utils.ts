import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes without conflicting utility overrides. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Typography scale (defined in index.css @theme + .type-* utilities)
 *
 * | Token            | Size   | Use                          |
 * |------------------|--------|------------------------------|
 * | type-nav         | 11px   | Appbar, sub-nav, filters     |
 * | type-eyebrow     | 12px   | Product line, category tags  |
 * | type-body        | 14px   | Body copy, descriptions      |
 * | type-subheading  | 16px   | Card titles, value part heads  |
 * | type-section-title | 22–26px | Section h2               |
 * | type-hero-title  | clamp  | Page hero h1                 |
 * | type-hero-home-title | clamp | Home hero h1             |
 */

export const typeNavClass = 'type-nav font-normal normal-case tracking-normal text-foreground';
export const typeEyebrowClass = 'type-eyebrow font-normal normal-case tracking-normal text-muted-foreground';
export const typeBodyClass = 'type-body font-light leading-relaxed text-foreground';
export const typeBodyMutedClass = 'type-body font-light leading-relaxed text-muted-foreground';
export const typeSubheadingClass = 'type-subheading font-semibold tracking-tight text-foreground';

/** Section h2 — primary page section title. */
export const sectionHeadingClass = 'type-section-title font-semibold tracking-tight text-foreground';

/** Body copy directly under a section title. */
export const sectionDescriptionClass = cn(typeBodyMutedClass, 'mt-3');

/** Intro lede under a section title (editorial blocks). */
export const sectionLedeClass = cn(typeBodyMutedClass, 'mt-5');

/** Grid item or card body copy. */
export const sectionItemBodyClass = cn(typeBodyMutedClass, 'mt-2');

/** Smaller inline labels — location names, inquiry types, etc. */
export const subsectionHeadingClass = cn(typeNavClass, 'font-medium');

/** Feature titles under a section heading — culture pillars, value cards, etc. */
export const sectionSubheadingClass = typeSubheadingClass;

/** Page hero h1 — editorial / inner pages. */
export const heroTitleClass = 'type-hero-title font-light tracking-[0.04em]';

/** Home hero h1. */
export const heroHomeTitleClass =
  'type-hero-home-title font-extrabold tracking-[0.04em] uppercase text-white';

/** Collection hero h1. */
export const heroCollectionTitleClass =
  'type-hero-title font-extrabold tracking-[0.04em] uppercase text-white';

/** Hero subheadline — use after h1 (or after rule on home). */
export const heroSubheadlineClass =
  'type-subheading font-semibold tracking-[0.04em] text-white/80';

/** Hero body copy over image backgrounds. */
export const heroBodyClass = cn(typeBodyClass, 'mt-4 max-w-xl font-medium text-white/85');

/** Shared hero section shell. */
export const heroSectionClass = 'relative overflow-hidden bg-background text-foreground';

/** Shared hero min-height + content grid — inner pages. */
export const heroContentGridClass =
  'hero-min-h-home hero-content grid items-center gap-12 lg:grid-cols-12';

/** Home hero content grid — same height, bottom-aligned on small screens. */
export const heroHomeContentGridClass =
  'hero-min-h-home hero-content grid items-end gap-8 sm:gap-10 lg:grid-cols-12 lg:items-center lg:gap-12';

/** Horizontal fade — black gradient for hero text readability. */
export const heroOverlayHorizontalClass =
  'pointer-events-none absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/5';

/** Vertical fade — black gradient for hero depth. */
export const heroOverlayVerticalClass =
  'pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/10';

/** Hero CTA filled button over image backgrounds. */
export const heroCtaOnImageClass = 'luxury-cta-filled-on-image';

/** Hero CTA link row spacing. */
export const heroActionClass = 'mt-10';

/** Filled CTA button — 12px, normal case. */
export const ctaButtonClass = 'luxury-cta-filled normal-case';

/** Filled CTA with top spacing for section blocks. */
export const sectionCtaButtonClass = cn(ctaButtonClass, 'mt-8');

/** Hero CTA link — filled white on image. */
export const heroActionLinkClass = cn(heroActionClass, heroCtaOnImageClass, 'inline-flex w-fit');

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
