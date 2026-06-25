import { AboutHero } from '../components/sections/about/AboutHero';
import { AboutCompanySection } from '../components/sections/about/AboutCompanySection';
import { AboutMissionSection } from '../components/sections/about/AboutMissionSection';
import { AboutLeadershipSection } from '../components/sections/about/AboutLeadershipSection';
import { AboutCareersSection } from '../components/sections/about/AboutCareersSection';
import { PageSubNav } from '../components/layout/PageSubNav';

export function AboutPage() {
  return (
    <>
      <AboutHero />
      <PageSubNav
        parentLink={{ label: 'About', href: '/about' }}
        links={[
          { label: 'Company', href: '/about#company' },
          { label: 'Mission', href: '/about#mission' },
          { label: 'Leadership', href: '/about#leadership' },
          { label: 'Careers', href: '/about#careers' },
          { label: 'Contact', href: '/contact' },
        ]}
      />
      <AboutCompanySection />
      <AboutMissionSection />
      <AboutLeadershipSection />
      <AboutCareersSection />
    </>
  );
}
