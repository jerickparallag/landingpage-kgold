import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { ctaButtonClass, cn } from '../../lib/utils';

type TButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';

type IButtonProps = {
  variant?: TButtonVariant;
  children: ReactNode;
  className?: string;
  as?: 'button' | 'a';
} & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>);

const variants: Record<TButtonVariant, string> = {
  primary: 'bg-foreground text-background hover:bg-foreground/85 focus-visible:ring-foreground/30',
  secondary: 'border border-border bg-muted text-foreground hover:bg-muted/80 focus-visible:ring-foreground/20',
  ghost: 'text-foreground hover:bg-muted focus-visible:ring-foreground/20',
  link: 'text-foreground underline-offset-4 hover:underline focus-visible:ring-foreground/20',
};

const base =
  'type-button inline-flex items-center justify-center gap-2 rounded-brand font-medium normal-case tracking-normal transition focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60';

export function Button({
  variant = 'primary',
  children,
  className,
  as: Comp = 'button',
  ...props
}: IButtonProps) {
  const classes = cn(
    variant === 'primary' ? ctaButtonClass : base,
    variant !== 'primary' && variants[variant],
    'h-10 px-6',
    className,
  );

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Polymorphic component requires this
    <Comp className={classes} {...(props as any)}>
      {children}
    </Comp>
  );
}
