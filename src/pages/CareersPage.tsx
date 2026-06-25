import { CareersHero } from '../components/sections/careers/CareersHero';
import { CareersCulture } from '../components/sections/careers/CareersCulture';
import { JobOpenings } from '../components/sections/careers/JobOpenings';
import { InternshipProgram } from '../components/sections/careers/InternshipProgram';
import { CareersCta } from '../components/sections/careers/CareersCta';
import { PageSubNav } from '../components/layout/PageSubNav';

export function CareersPage() {
  return (
    <>
      <CareersHero />
      <PageSubNav
        parentLink={{ label: 'Careers', href: '/careers' }}
        links={[
          { label: 'Culture', href: '/careers#culture' },
          { label: 'Open Roles', href: '/careers#open-roles' },
          { label: 'Internships', href: '/careers#internships' },
          { label: 'Contact', href: '/contact' },
        ]}
      />
      <CareersCulture />
      <JobOpenings />
      <InternshipProgram />
      <CareersCta />
    </>
  );
}
