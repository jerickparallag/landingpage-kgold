import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

type TButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';

type IButtonProps = {
  variant?: TButtonVariant;
  children: ReactNode;
  className?: string;
  as?: 'button' | 'a';
} & (ButtonHTMLAttributes<HTMLButtonElement> | AnchorHTMLAttributes<HTMLAnchorElement>);

const variants: Record<TButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary-hover focus-visible:ring-primary/40 disabled:bg-primary/50',
  secondary:
    'border border-border bg-background text-foreground hover:bg-muted focus-visible:ring-primary/20',
  ghost:
    'text-foreground hover:bg-muted focus-visible:ring-primary/20',
  link: 'text-primary underline-offset-4 hover:underline focus-visible:ring-primary/20',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-brand text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60';

export function Button({
  variant = 'primary',
  children,
  className,
  as: Comp = 'button',
  ...props
}: IButtonProps) {
  const classes = cn(base, variants[variant], 'h-10 px-5', className);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Polymorphic component requires this
    <Comp className={classes} {...(props as any)}>
      {children}
    </Comp>
  );
}
