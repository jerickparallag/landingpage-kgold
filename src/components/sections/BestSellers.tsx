import { BEST_SELLERS } from '../../constants/content';
import { ProductCard } from '../ui/ProductCard';
import { SectionHeader } from '../ui/SectionHeader';
import { useInView } from '../../hooks/useInView';
import { cn } from '../../lib/utils';

export function BestSellers() {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section id="bestsellers" className="bg-background section-padding">
      <div className="page-container">
        <SectionHeader
          title={BEST_SELLERS.title}
          description={BEST_SELLERS.description}
          action={
            <a
              href={BEST_SELLERS.viewAllHref}
              className="inline-flex items-center gap-2 rounded-brand border border-border bg-background px-5 py-2.5 text-sm font-medium text-foreground transition hover:border-primary/40 hover:text-primary"
            >
              {BEST_SELLERS.viewAllLabel}
              <span aria-hidden="true">→</span>
            </a>
          }
        />

        <div
          ref={ref}
          className={cn(
            'reveal mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4',
            isVisible && 'reveal-visible',
          )}
        >
          {BEST_SELLERS.items.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              line={product.line}
              description={product.description}
              image={product.image}
              badge={product.badge}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
