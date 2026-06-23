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
    <section id="categories" className="bg-background section-padding">
      <div className="page-container">
        <SectionHeader
          title={FEATURED_CATEGORIES.title}
          description={FEATURED_CATEGORIES.description}
        />

        <div
          ref={ref}
          className={cn(
            'reveal mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:grid-rows-2 lg:gap-4',
            isVisible && 'reveal-visible',
          )}
        >
          {FEATURED_CATEGORIES.items.map((category) => (
            <a
              key={category.id}
              href={category.href}
              className={cn(
                'group relative min-h-[280px] overflow-hidden rounded-brand bg-surface sm:min-h-[320px]',
                spanClass[category.span],
              )}
            >
              <img
                src={category.image}
                alt={category.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface/95 via-surface/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-surface/30 to-transparent opacity-0 transition group-hover:opacity-100" />

              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-[11px] font-medium tracking-[0.2em] text-primary uppercase">
                  {category.tagline}
                </p>
                <h3 className="mt-2 text-2xl font-semibold tracking-tight text-surface-foreground sm:text-3xl">
                  {category.name}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-surface-foreground/65 transition group-hover:text-surface-foreground/85">
                  {category.description}
                </p>
                <span className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-surface-foreground opacity-0 transition group-hover:opacity-100">
                  View collection <span aria-hidden="true">→</span>
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
