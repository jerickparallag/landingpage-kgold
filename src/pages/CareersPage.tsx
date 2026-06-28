import { CAREERS_PAGE } from '../constants/content';
import { PageSubNav } from '../components/layout/PageSubNav';
import { CareersHero } from '../components/sections/careers/CareersHero';
import { CareersCulture } from '../components/sections/careers/CareersCulture';
import { CareersHubSection } from '../components/sections/careers/CareersHubSection';
import { CareersCta } from '../components/sections/careers/CareersCta';

export function CareersPage() {
  return (
    <>
      <CareersHero />
      <PageSubNav parentLink={CAREERS_PAGE.subNavParent} links={CAREERS_PAGE.subNav} />
      <CareersCulture />
      <CareersHubSection />
      <CareersCta />
    </>
  );
}
