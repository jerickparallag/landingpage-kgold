import { Link } from 'react-router-dom';
import { OptimizedImage } from '../../ui/OptimizedImage';
import { useInView } from '../../../hooks/useInView';
import { cn, sectionCtaButtonClass, sectionDescriptionClass, sectionHeadingClass } from '../../../lib/utils';

interface ICareerSectionBannerProps {
  image: string;
  headline: string;
  subline: string;
  ctaLabel?: string;
  ctaHref?: string;
  imagePosition?: 'left' | 'right';
}

export function CareerSectionBanner({
  image,
  headline,
  subline,
  ctaLabel,
  ctaHref,
  imagePosition = 'left',
}: ICareerSectionBannerProps) {
  const { ref, isVisible } = useInView<HTMLDivElement>();
  const ctaIsRoute = ctaHref?.startsWith('/');
  const imageOnLeft = imagePosition === 'left';

  const imageBlock = (
    <div
      className={cn(
        'relative min-h-[280px] sm:min-h-[360px] lg:min-h-[min(70vh,560px)]',
        imageOnLeft ? 'order-1' : 'order-1 lg:order-2',
      )}
    >
      <OptimizedImage
        src={image}
        alt=""
        pictureClassName="absolute inset-0 block h-full w-full"
        className="object-cover"
      />
    </div>
  );

  const contentBlock = (
    <div
      className={cn(
        'flex items-center bg-background px-8 py-14 sm:px-12 lg:px-16 lg:py-24 xl:px-20',
        imageOnLeft ? 'order-2 lg:justify-start lg:pl-16 xl:pl-24' : 'order-2 lg:order-1 lg:justify-start lg:pl-16 xl:pl-24',
      )}
    >
      <div className="w-full max-w-md text-left lg:max-w-lg">
        <h3 className={sectionHeadingClass}>{headline}</h3>
        <p className={cn(sectionDescriptionClass, 'mt-4 lg:mt-5')}>{subline}</p>
        {ctaLabel && ctaHref ? (
          ctaIsRoute ? (
            <Link to={ctaHref} className={sectionCtaButtonClass}>
              {ctaLabel}
            </Link>
          ) : (
            <a href={ctaHref} className={sectionCtaButtonClass}>
              {ctaLabel}
            </a>
          )
        ) : null}
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      className={cn('reveal grid lg:grid-cols-2', isVisible && 'reveal-visible')}
    >
      {imageBlock}
      {contentBlock}
    </div>
  );
}
