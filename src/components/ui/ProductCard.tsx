import { OptimizedImage } from '../ui/OptimizedImage';
import { cn, typeBodyMutedClass, typeSubheadingClass } from '../../lib/utils';

interface IProductCardProps {
  name: string;
  line: string;
  description: string;
  image: string;
  badge?: string;
  className?: string;
}

/** Editorial product card — image on neutral ground, minimal text below. */
export function ProductCard({ name, line, description, image, badge, className }: IProductCardProps) {
  return (
    <article className={cn('group', className)}>
      <div className="relative aspect-[3/4] overflow-hidden rounded-brand bg-muted">
        <OptimizedImage
          src={image}
          alt={name}
          pictureClassName="absolute inset-0 block h-full w-full"
          className="object-cover object-center transition duration-700 ease-out group-hover:scale-[1.02]"
        />
        {badge ? (
          <span className="luxury-eyebrow absolute top-3 left-3 rounded-brand bg-background/90 px-2 py-1 text-foreground">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="mt-3 px-0.5">
        <p className="luxury-eyebrow">{line}</p>
        <h3 className={cn(typeSubheadingClass, 'mt-1.5 font-normal tracking-wide')}>{name}</h3>
        <p className={cn(typeBodyMutedClass, 'mt-1.5 line-clamp-2')}>{description}</p>
      </div>
    </article>
  );
}
