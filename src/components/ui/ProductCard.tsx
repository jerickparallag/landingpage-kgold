import { cn } from '../../lib/utils';

interface IProductCardProps {
  name: string;
  line: string;
  description: string;
  image: string;
  badge?: string;
  className?: string;
}

/** Accenture-style editorial card — text overlay + hover reveal. */
export function ProductCard({ name, line, description, image, badge, className }: IProductCardProps) {
  return (
    <article
      className={cn(
        'group relative min-h-[380px] overflow-hidden rounded-brand sm:min-h-[440px] lg:min-h-[520px]',
        className,
      )}
    >
      <img
        src={image}
        alt={name}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover object-center transition duration-700 ease-out group-hover:scale-[1.03] group-hover:brightness-[0.65]"
      />

      {/* Base gradient — fades out on hover */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-surface/80 via-surface/20 to-surface/60 transition-opacity duration-500 ease-out group-hover:opacity-0"
        aria-hidden="true"
      />

      {/* Default state — badge, line, title stacked (no overlap) */}
      <div className="relative z-10 flex min-h-[380px] flex-col p-6 sm:min-h-[440px] sm:p-7 lg:min-h-[520px]">
        <div className="transition-opacity duration-500 ease-out group-hover:opacity-0">
          {badge ? (
            <span className="mb-4 inline-block rounded-brand bg-surface-foreground/95 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-surface uppercase">
              {badge}
            </span>
          ) : null}
          <p className="text-[11px] font-semibold tracking-[0.18em] text-surface-foreground/80 uppercase">{line}</p>
          <h3 className="mt-3 max-w-[16ch] text-xl leading-snug font-semibold tracking-tight text-surface-foreground sm:text-2xl">
            {name}
          </h3>
        </div>
      </div>

      {/* Hover — smooth fade-in panel with extra content */}
      <div
        className={cn(
          'absolute inset-0 z-20 flex flex-col justify-between p-6 opacity-0 transition-opacity duration-500 ease-out sm:p-7',
          'group-hover:opacity-100 group-focus-within:opacity-100',
        )}
      >
        <div className="absolute inset-0 bg-surface/90 backdrop-blur-[3px]" aria-hidden="true" />

        <div className="relative z-10">
          {badge ? (
            <span className="mb-4 inline-block rounded-brand bg-surface-foreground/95 px-3 py-1 text-[10px] font-semibold tracking-[0.14em] text-surface uppercase">
              {badge}
            </span>
          ) : null}
          <p className="text-[11px] font-semibold tracking-[0.18em] text-primary uppercase">{line}</p>
          <h3 className="mt-3 text-xl font-semibold tracking-tight text-surface-foreground sm:text-2xl">{name}</h3>
        </div>

        <div className="relative z-10">
          <p className="text-sm leading-relaxed text-surface-foreground/80 sm:text-base">{description}</p>
          <a
            href="#quality"
            className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-surface-foreground transition hover:text-primary"
          >
            Learn more
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </article>
  );
}
