import { BEST_SELLERS } from '../../constants/content';
import { ProductCard } from '../ui/ProductCard';
import { SectionHeader } from '../ui/SectionHeader';
import { useInView } from '../../hooks/useInView';
import { cn } from '../../lib/utils';

export function BestSellers() {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section id="bestsellers" className="scroll-section bg-background section-padding">
      <div className="page-container">
        <SectionHeader
          title={BEST_SELLERS.title}
          description={BEST_SELLERS.description}
          action={
            <a
              href={BEST_SELLERS.viewAllHref}
              className="luxury-cta-outline border-foreground text-foreground"
            >
              {BEST_SELLERS.viewAllLabel}
            </a>
          }
        />

        <div
          ref={ref}
          className={cn(
            'reveal section-stack section-card-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
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
