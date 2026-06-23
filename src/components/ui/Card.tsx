import type { HTMLAttributes, ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ICardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
}

export function Card({ children, className, hover = false, ...rest }: ICardProps) {
  return (
    <div
      className={cn(
        'rounded-brand border border-border bg-card p-6 text-card-foreground shadow-[var(--shadow-card)]',
        hover && 'transition hover:-translate-y-0.5 hover:shadow-md',
        className,
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
