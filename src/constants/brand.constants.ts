import { IMAGES } from '../assets/images';

/** KGOLD brand mark — bundled for single-file builds, served from /public otherwise. */
export const BRAND_LOGO_SRC = IMAGES.kgoldLogo;

export const BRAND_NAME = 'KGOLD Beauty Essentials' as const;

/** Shared app bar logo sizing. */
export const APP_BRAND_LOGO_CLASS = 'size-10 sm:size-12' as const;

/** Landing header — slightly larger mark. */
export const HEADER_BRAND_LOGO_CLASS = 'size-9 sm:size-10' as const;

/** Minimum app bar row height. */
export const APP_BAR_HEIGHT_CLASS = 'min-h-[4.5rem] sm:min-h-20' as const;
