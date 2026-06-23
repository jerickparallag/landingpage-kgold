import { AboutHero } from '../components/sections/about/AboutHero';
import { AboutCompanySection } from '../components/sections/about/AboutCompanySection';
import { AboutMissionSection } from '../components/sections/about/AboutMissionSection';
import { AboutLeadershipSection } from '../components/sections/about/AboutLeadershipSection';
import { AboutCareersSection } from '../components/sections/about/AboutCareersSection';

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutCompanySection />
      <AboutMissionSection />
      <AboutLeadershipSection />
      <AboutCareersSection />
    </>
  );
}
