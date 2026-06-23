import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Merge Tailwind classes without conflicting utility overrides. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared section title style — matches careers page headings. */
export const sectionHeadingClass =
  'text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-[2.5rem] lg:leading-tight';

/** Smaller subsection labels — Who, Purpose, Vision, Mission, etc. */
export const subsectionHeadingClass =
  'text-xl font-semibold tracking-tight text-foreground sm:text-2xl';
