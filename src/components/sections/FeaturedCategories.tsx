import { Link } from 'react-router-dom';
import { FEATURED_CATEGORIES } from '../../constants/content';
import { OptimizedImage } from '../ui/OptimizedImage';
import { SectionHeader } from '../ui/SectionHeader';
import { useInView } from '../../hooks/useInView';
import { cn, typeSubheadingClass } from '../../lib/utils';

const spanClass = {
  large: 'lg:col-span-2 lg:row-span-2',
  default: 'lg:col-span-1',
  wide: 'sm:col-span-2 lg:col-span-2',
} as const;

export function FeaturedCategories() {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section id="categories" className="scroll-section bg-background section-padding">
      <div className="page-container">
        <SectionHeader
          title={FEATURED_CATEGORIES.title}
          description={FEATURED_CATEGORIES.description}
        />

        <div
          ref={ref}
          className={cn(
            'reveal section-stack section-card-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2',
            isVisible && 'reveal-visible',
          )}
        >
          {FEATURED_CATEGORIES.items.map((category) => (
            <Link
              key={category.id}
              to={category.href}
              className={cn(
                'group relative min-h-[240px] overflow-hidden rounded-brand bg-muted sm:min-h-[240px]',
                spanClass[category.span],
              )}
            >
              <OptimizedImage
                src={category.image}
                alt={category.name}
                pictureClassName="absolute inset-0 block h-full w-full"
                className="object-cover transition duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <h3 className={cn(typeSubheadingClass, 'font-normal tracking-wide text-white')}>
                  {category.name}
                </h3>
                <span className="careers-text-link collection-card-link relative mt-3">
                  {FEATURED_CATEGORIES.viewCollectionLabel}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
