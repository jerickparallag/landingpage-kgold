import type { ReactNode } from 'react';
import { cn } from '../../lib/utils';
import { useInView } from '../../hooks/useInView';

interface ISectionHeadingProps {
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
  children?: ReactNode;
}

export function SectionHeading({
  title,
  description,
  align = 'left',
  className,
  children,
}: ISectionHeadingProps) {
  const { ref, isVisible } = useInView<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className={cn(
        'reveal max-w-3xl',
        isVisible && 'reveal-visible',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      <h2 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      ) : null}
      {children}
    </div>
  );
}
