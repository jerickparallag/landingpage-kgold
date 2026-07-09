import { Hero } from '../components/sections/Hero';
import { FeaturedCategories } from '../components/sections/FeaturedCategories';
import { BestSellers } from '../components/sections/BestSellers';
import { QualityValues } from '../components/sections/QualityValues';
import { FaqSection } from '../components/sections/FaqSection';
import { About } from '../components/sections/About';
import { FinalCta } from '../components/sections/FinalCta';
import { TrustSection } from '../components/sections/TrustSection';

export function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <BestSellers />
      <TrustSection />
      <QualityValues />
      <FaqSection />
      <About />
      <FinalCta />
    </>
  );
}
