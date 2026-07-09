import { OptimizedImage } from '../ui/OptimizedImage';
import { cn, typeBodyMutedClass, typeSubheadingClass } from '../../lib/utils';

interface IProductCardProps {
  name: string;
  line: string;
  description: string;
  image: string;
  badge?: string;
  orderNumber?: string;
  className?: string;
}

/** Editorial product card — image on neutral ground, minimal text below. */
export function ProductCard({ name, line, description, image, className }: IProductCardProps) {
  return (
    <article className={cn('group flex flex-col', className)}>
      <div className="relative aspect-[4/5] overflow-hidden rounded-brand bg-muted">
        <OptimizedImage
          src={image}
          alt={name}
          pictureClassName="absolute inset-0 block h-full w-full"
          className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.02]"
        />
      </div>
      <div className="mt-3 flex flex-1 flex-col px-0.5">
        <h3 className={cn(typeSubheadingClass, 'mt-1.5 font-normal tracking-wide')}>{name}</h3>
        <p className={cn(typeBodyMutedClass, 'mt-3 line-clamp-3')}>{description}</p>
        <div className="mt-auto flex justify-end">
          <a
            href="/contact"
            className="luxury-nav-link text-[0.75rem] font-semibold uppercase tracking-[0.24em]"
          >
            Order Now
          </a>
        </div>
      </div>
    </article>
  );
}
