import { ABOUT_PAGE } from '../../../constants/content';
import { CoreValuesCarousel } from './CoreValuesCarousel';
import { useInView } from '../../../hooks/useInView';
import { cn, sectionHeadingClass, subsectionHeadingClass } from '../../../lib/utils';

export function AboutMissionSection() {
  const { ref: storyRef, isVisible: storyVisible } = useInView<HTMLDivElement>();
  const { ref: valuesRef, isVisible: valuesVisible } = useInView<HTMLDivElement>();
  const { mission } = ABOUT_PAGE;

  return (
    <section id="mission" className="scroll-mt-28 bg-background section-padding">
      <div className="page-container">
        <div ref={storyRef} className={cn('reveal', storyVisible && 'reveal-visible')}>
          <div className="mx-auto max-w-4xl text-center">
            <h3 className={sectionHeadingClass}>{mission.storyTitle}</h3>
            <p className="mt-8 text-xl font-medium leading-relaxed text-foreground sm:text-2xl lg:text-[1.75rem] lg:leading-snug">
              {mission.storyLead}
            </p>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground sm:text-xl">
              {mission.story}
            </p>
          </div>

          <div className="mt-16 grid gap-12 lg:mt-20 lg:grid-cols-2 lg:gap-0">
            <div className="lg:pr-12">
              <h3 className={subsectionHeadingClass}>{mission.vision.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {mission.vision.body}
              </p>
            </div>
            <div className="border-t border-border pt-12 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-12">
              <h3 className={subsectionHeadingClass}>{mission.missionStatement.title}</h3>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {mission.missionStatement.body}
              </p>
            </div>
          </div>
        </div>

        <div
          ref={valuesRef}
          className={cn('reveal mt-16 lg:mt-20', valuesVisible && 'reveal-visible')}
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <h2 className={sectionHeadingClass}>{mission.valuesTitle}</h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
                {mission.valuesTagline}
              </p>
            </div>
          </div>

          <div className="mt-10 lg:mt-14">
            <CoreValuesCarousel values={mission.values} />
          </div>
        </div>
      </div>
    </section>
  );
}
