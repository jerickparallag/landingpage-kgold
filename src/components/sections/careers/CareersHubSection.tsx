import { CAREERS_PAGE } from '../../../constants/content';
import { CareerSectionBanner } from './CareerSectionBanner';

export function CareersHubSection() {
  const { jobs, internships } = CAREERS_PAGE;

  return (
    <section className="scroll-section bg-background">
      <div id="jobs">
        <CareerSectionBanner {...jobs.banner} imagePosition="left" />
      </div>
      <div id="internships">
        <CareerSectionBanner {...internships.banner} imagePosition="right" />
      </div>
    </section>
  );
}
