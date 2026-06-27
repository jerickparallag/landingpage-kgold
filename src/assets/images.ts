import jobTelesales from './images/jobs/telesales.png';
import jobTiktokLiveSellers from './images/jobs/tiktok-live-sellers.png';

const PUBLIC_BASE = import.meta.env.BASE_URL.replace(/\/$/, '');

/** Public-folder assets are served at the site root — do not import them as modules. */
function publicAsset(path: string): string {
  return `${PUBLIC_BASE}${path}`;
}

export const IMAGES = {
  heroBg: publicAsset('/hero-bg.png'),
  kgoldLogo: publicAsset('/kgold_logo.png'),
  homeHero: publicAsset('/Home/home_hero.jpg'),
  homeSkincareCover: publicAsset('/Home/skincare_cover.png'),
  homeSkincareHero: publicAsset('/Home/skincare_hero.jpg'),
  homeMenCover: publicAsset('/Home/men_essen_cover.jpg'),
  homeMenHero: publicAsset('/Home/men_essen_hero.jpg'),
  homeHerbalCover: publicAsset('/Home/herbal_cover.jpg'),
  homeHerbalHero: publicAsset('/Home/herbal_hero.jpg'),
  homeWellnessCover: publicAsset('/Home/wellness_cover.png'),
  productSerum: publicAsset('/Home/product-serum.png'),
  productShampoo: publicAsset('/Home/product-shampoo.png'),
  productBodycream: publicAsset('/Home/product-bodycream.png'),
  productSpf: publicAsset('/Home/product-spf.png'),
  aboutHero: publicAsset('/About/about-hero.jpg'),
  aboutOwner: publicAsset('/About/about-owner.jpg'),
  core1: publicAsset('/About/coreval_1.jpg'),
  core2: publicAsset('/About/coreval_2.jpg'),
  core3: publicAsset('/About/coreval_3.jpg'),
  core4: publicAsset('/About/coreval_4.jpg'),
  core5: publicAsset('/About/coreval_5.jpg'),
  careerHero: publicAsset('/Career/career-hero.jpg'),
  careerJobBanner: publicAsset('/Career/career_job.jpg'),
  careerInternBanner: publicAsset('/Career/career_intern.jpg'),
  contactHero: publicAsset('/Contact/contact_hero.jpg'),
  jobTelesales,
  jobTiktokLiveSellers,
} as const;

export type TImageKey = keyof typeof IMAGES;
