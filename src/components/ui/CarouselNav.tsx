import { cn } from '../../lib/utils';

interface ICarouselNavProps {
  onPrev: () => void;
  onNext: () => void;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
  inverse?: boolean;
}

export function CarouselNav({
  onPrev,
  onNext,
  prevLabel = 'Previous slide',
  nextLabel = 'Next slide',
  className,
  inverse = false,
}: ICarouselNavProps) {
  const buttonClass = cn(
    'inline-flex size-10 items-center justify-center rounded-brand border transition',
    inverse
      ? 'border-white/20 text-white hover:border-white/40 hover:bg-white/10'
      : 'border-border text-foreground hover:bg-muted',
  );

  return (
    <div className={cn('flex items-center gap-2', className)}>
      <button type="button" onClick={onPrev} aria-label={prevLabel} className={buttonClass}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M15 18l-6-6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button type="button" onClick={onNext} aria-label={nextLabel} className={buttonClass}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
}
