import { cn } from '../../lib/utils';

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
        <img
          src={image}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.02]"
        />
        {badge ? (
          <span className="absolute top-3 left-3 rounded-brand bg-background/90 px-2 py-1 text-[9px] font-normal tracking-[0.18em] text-foreground uppercase">
            {badge}
          </span>
        ) : null}
      </div>
      <div className="mt-3 px-0.5">
        <p className="luxury-eyebrow">{line}</p>
        <h3 className="mt-1.5 text-sm font-normal tracking-wide text-foreground">{name}</h3>
        <p className="mt-1.5 line-clamp-2 text-xs font-light leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </article>
  );
}
