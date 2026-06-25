import { useInView } from '../../../hooks/useInView';
import { cn, heroActionClass, sectionDescriptionClass } from '../../../lib/utils';

interface ICareerSectionBannerProps {
  image: string;
  headline: string;
  subline: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export function CareerSectionBanner({
  image,
  headline,
  subline,
  ctaLabel,
  ctaHref,
}: ICareerSectionBannerProps) {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn('reveal section-stack', isVisible && 'reveal-visible')}
    >
      <div className="relative overflow-hidden rounded-brand">
        <div className="relative min-h-[200px] sm:min-h-[240px] lg:min-h-[280px]">
          <img
            src={image}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#1a1a1a]/90 via-[#1a1a1a]/65 to-[#1a1a1a]/25"
            aria-hidden="true"
          />
          <div className="relative flex h-full min-h-[inherit] flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
            <h3 className="max-w-xl text-xl font-light tracking-wide text-white sm:text-2xl lg:text-3xl lg:leading-snug">
              {headline}
            </h3>
            <p className={cn(sectionDescriptionClass, 'mt-3 max-w-lg text-white/70')}>
              {subline}
            </p>
            {ctaLabel && ctaHref ? (
              <a
                href={ctaHref}
                className={cn(heroActionClass, 'luxury-cta-outline inline-flex w-fit text-white')}
              >
                {ctaLabel}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
