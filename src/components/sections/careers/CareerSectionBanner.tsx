import { useInView } from '../../../hooks/useInView';
import { cn } from '../../../lib/utils';

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
      className={cn('reveal mt-10 lg:mt-12', isVisible && 'reveal-visible')}
    >
      <div className="relative overflow-hidden rounded-brand">
        <div className="relative min-h-[220px] sm:min-h-[260px] lg:min-h-[300px]">
          <img
            src={image}
            alt=""
            loading="lazy"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#1c1c1c]/90 via-[#1c1c1c]/65 to-[#1c1c1c]/25"
            aria-hidden="true"
          />
          <div className="relative flex h-full min-h-[inherit] flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:px-14">
            <h3 className="max-w-xl text-2xl font-semibold tracking-tight text-white sm:text-3xl lg:text-4xl lg:leading-tight">
              {headline}
            </h3>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
              {subline}
            </p>
            {ctaLabel && ctaHref ? (
              <a
                href={ctaHref}
                className="mt-6 inline-flex w-fit items-center rounded-brand bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary-hover"
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
