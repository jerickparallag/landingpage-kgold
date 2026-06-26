/** Bundled image URLs — inlined as base64 in the single-file build. */
import heroBg from '../../public/hero-bg.png';
import kgoldLogo from '../../public/kgold_logo.png';

import homeHero from '../../public/Home/home_hero.jpg';
import homeSkincareCover from '../../public/Home/skincare_cover.png';
import homeSkincareHero from '../../public/Home/skincare_hero.jpg';
import homeMenCover from '../../public/Home/men_essen_cover.jpg';
import homeMenHero from '../../public/Home/men_essen_hero.jpg';
import homeHerbalCover from '../../public/Home/herbal_cover.jpg';
import homeHerbalHero from '../../public/Home/herbal_hero.jpg';
import homeWellnessCover from '../../public/Home/wellness_cover.png';
import productSerum from '../../public/Home/product-serum.png';
import productShampoo from '../../public/Home/product-shampoo.png';
import productBodycream from '../../public/Home/product-bodycream.png';
import productSpf from '../../public/Home/product-spf.png';

import aboutHero from '../../public/About/about-hero.jpg';
import aboutOwner from '../../public/About/about-owner.jpg';
import core1 from '../../public/About/coreval_1.jpg';
import core2 from '../../public/About/coreval_2.jpg';
import core3 from '../../public/About/coreval_3.jpg';
import core4 from '../../public/About/coreval_4.jpg';
import core5 from '../../public/About/coreval_5.jpg';

import careerHero from '../../public/Career/career-hero.jpg';
import careerJobBanner from '../../public/Career/career_job.jpg';
import careerInternBanner from '../../public/Career/career_intern.jpg';

import contactHero from '../../public/Contact/contact_hero.jpg';

import jobTelesales from './images/jobs/telesales.png';
import jobTiktokLiveSellers from './images/jobs/tiktok-live-sellers.png';

export const IMAGES = {
  heroBg,
  kgoldLogo,
  homeHero,
  homeSkincareCover,
  homeSkincareHero,
  homeMenCover,
  homeMenHero,
  homeHerbalCover,
  homeHerbalHero,
  homeWellnessCover,
  productSerum,
  productShampoo,
  productBodycream,
  productSpf,
  aboutHero,
  aboutOwner,
  careerHero,
  careerJobBanner,
  careerInternBanner,
  contactHero,
  core1,
  core2,
  core3,
  core4,
  core5,
  jobTelesales,
  jobTiktokLiveSellers,
} as const;

export type TImageKey = keyof typeof IMAGES;
