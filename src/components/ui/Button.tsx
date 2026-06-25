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
    'bg-foreground text-background hover:bg-foreground/85 focus-visible:ring-foreground/30 disabled:bg-foreground/50',
  secondary:
    'border border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background focus-visible:ring-foreground/20',
  ghost: 'text-foreground hover:bg-muted focus-visible:ring-foreground/20',
  link: 'text-foreground underline-offset-4 hover:underline focus-visible:ring-foreground/20',
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-brand text-[10px] font-normal tracking-[0.22em] uppercase transition focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed disabled:opacity-60';

export function Button({
  variant = 'primary',
  children,
  className,
  as: Comp = 'button',
  ...props
}: IButtonProps) {
  const classes = cn(base, variants[variant], 'h-10 px-6', className);

  return (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any -- Polymorphic component requires this
    <Comp className={classes} {...(props as any)}>
      {children}
    </Comp>
  );
}
