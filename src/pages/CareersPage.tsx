import { CareersHero } from '../components/sections/careers/CareersHero';
import { CareersCulture } from '../components/sections/careers/CareersCulture';
import { JobOpenings } from '../components/sections/careers/JobOpenings';
import { InternshipProgram } from '../components/sections/careers/InternshipProgram';
import { CareersCta } from '../components/sections/careers/CareersCta';

export function CareersPage() {
  return (
    <>
      <CareersHero />
      <CareersCulture />
      <JobOpenings />
      <InternshipProgram />
      <CareersCta />
    </>
  );
}
