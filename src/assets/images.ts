/** Bundled image URLs — inlined as base64 in the single-file build. */
import heroBg from '../../public/hero-bg.png';
import kgoldLogo from '../../public/kgold_logo.png';
import categorySkincare from '../../public/images/category-skincare.png';
import categoryHaircare from '../../public/images/category-haircare.png';
import categoryBodycare from '../../public/images/category-bodycare.png';
import categoryMen from '../../public/images/category-men.png';
import productSerum from '../../public/images/product-serum.png';
import productShampoo from '../../public/images/product-shampoo.png';
import productBodycream from '../../public/images/product-bodycream.png';
import productSpf from '../../public/images/product-spf.png';
import homeHero from '../../public/images/home_hero.jpg';
import aboutHero from '../../public/images/about-hero.jpg';
import aboutOwner from '../../public/images/about-owner.jpg';
import careerHero from '../../public/images/career-hero.jpg';
import core1 from '../../public/images/core_1.png';
import core2 from '../../public/images/core_2.png';
import core3 from '../../public/images/core_3.png';
import core4 from '../../public/images/core_4.png';
import core5 from '../../public/images/core_5.png';
import jobTelesales from './images/jobs/telesales.png';
import jobTiktokLiveSellers from './images/jobs/tiktok-live-sellers.png';

export const IMAGES = {
  heroBg,
  kgoldLogo,
  categorySkincare,
  categoryHaircare,
  categoryBodycare,
  categoryMen,
  productSerum,
  productShampoo,
  productBodycream,
  productSpf,
  homeHero,
  aboutHero,
  aboutOwner,
  careerHero,
  core1,
  core2,
  core3,
  core4,
  core5,
  jobTelesales,
  jobTiktokLiveSellers,
} as const;

export type TImageKey = keyof typeof IMAGES;
