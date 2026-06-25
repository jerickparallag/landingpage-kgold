import { ABOUT_PAGE } from '../../../constants/content';
import { CoreValuesCarousel } from './CoreValuesCarousel';
import { useInView } from '../../../hooks/useInView';
import { cn, sectionDescriptionClass, sectionHeadingClass, sectionLedeClass, subsectionHeadingClass } from '../../../lib/utils';

export function AboutMissionSection() {
  const { ref: storyRef, isVisible: storyVisible } = useInView<HTMLDivElement>();
  const { ref: valuesRef, isVisible: valuesVisible } = useInView<HTMLDivElement>();
  const { mission } = ABOUT_PAGE;

  return (
    <section id="mission" className="scroll-section bg-background section-padding">
      <div className="page-container">
        <div ref={storyRef} className={cn('reveal', storyVisible && 'reveal-visible')}>
          <div className="mx-auto max-w-4xl text-center">
            <h3 className={sectionHeadingClass}>{mission.storyTitle}</h3>
            <p className={sectionLedeClass}>{mission.storyLead}</p>
            <p className={sectionDescriptionClass}>{mission.story}</p>
          </div>

          <div className="section-stack section-grid grid lg:grid-cols-2 lg:gap-0">
            <div className="lg:pr-12">
              <h3 className={subsectionHeadingClass}>{mission.vision.title}</h3>
              <p className={sectionDescriptionClass}>{mission.vision.body}</p>
            </div>
            <div className="section-split">
              <h3 className={subsectionHeadingClass}>{mission.missionStatement.title}</h3>
              <p className={sectionDescriptionClass}>{mission.missionStatement.body}</p>
            </div>
          </div>
        </div>

        <div
          ref={valuesRef}
          className={cn('reveal section-stack', valuesVisible && 'reveal-visible')}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className={sectionHeadingClass}>{mission.valuesTitle}</h2>
              <p className={sectionDescriptionClass}>{mission.valuesTagline}</p>
            </div>
          </div>

          <div className="section-inner-stack">
            <CoreValuesCarousel values={mission.values} />
          </div>
        </div>
      </div>
    </section>
  );
}
