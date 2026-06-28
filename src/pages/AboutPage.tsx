import { ABOUT_PAGE } from '../constants/content';
import { PageSubNav } from '../components/layout/PageSubNav';
import { AboutHero } from '../components/sections/about/AboutHero';
import { AboutCompanySection } from '../components/sections/about/AboutCompanySection';
import { AboutMissionSection } from '../components/sections/about/AboutMissionSection';
import { AboutLeadershipSection } from '../components/sections/about/AboutLeadershipSection';
import { AboutCareersSection } from '../components/sections/about/AboutCareersSection';

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <PageSubNav parentLink={ABOUT_PAGE.subNavParent} links={ABOUT_PAGE.subNav} />
      <AboutCompanySection />
      <AboutMissionSection />
      <AboutLeadershipSection />
      <AboutCareersSection />
    </>
  );
}
