import { Link } from 'react-router-dom';
import { FEATURED_CATEGORIES } from '../../constants/content';
import { SectionHeader } from '../ui/SectionHeader';
import { useInView } from '../../hooks/useInView';
import { cn } from '../../lib/utils';

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
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

              <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
                <p className="luxury-eyebrow text-white/70">{category.tagline}</p>
                <h3 className="mt-2 text-base font-normal tracking-wide text-white sm:text-lg">
                  {category.name}
                </h3>
                <span className="mt-3 inline-block relative text-[10px] font-normal tracking-[0.2em] text-white/80 uppercase">
                  {FEATURED_CATEGORIES.viewCollectionLabel}
                  <span className='absolute left-0 bottom-[-2px] h-[1px] bg-current w-0 transition-all duration-300 ease-out group-hover:w-full' />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
