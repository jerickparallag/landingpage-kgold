import { ProductCard } from '../../ui/ProductCard';
import { SectionHeader } from '../../ui/SectionHeader';
import { useInView } from '../../../hooks/useInView';
import { cn } from '../../../lib/utils';
import type { IProductItem } from '../../../content/types';

interface ICollectionProductsProps {
  collectionName: string;
  products: readonly IProductItem[];
}

export function CollectionProducts({ collectionName, products }: ICollectionProductsProps) {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <section className="bg-background section-padding">
      <div className="page-container">
        <div ref={ref} className={cn('reveal', isVisible && 'reveal-visible')}>
          <SectionHeader
            title={`Shop ${collectionName}`}
            description="Explore the products in this collection — formulated to the same KGOLD standard, every batch."
          />

          <div className="section-stack section-card-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
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
      </div>
    </section>
  );
}
