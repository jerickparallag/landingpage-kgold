import { cn } from '../../lib/utils';
import { BRAND_LOGO_SRC, BRAND_NAME } from '../../constants/brand.constants';

interface IAppBrandProps {
  className?: string;
  logoClassName?: string;
  showLabel?: boolean;
  label?: string;
  subtitle?: string;
}

export function AppBrand({
  className,
  logoClassName,
  showLabel = true,
  label = BRAND_NAME,
  subtitle,
}: IAppBrandProps) {
  return (
    <div className={cn('flex min-w-0 items-center gap-2.5', className)}>
      <img
        src={BRAND_LOGO_SRC}
        alt="KGOLD Beauty Essentials"
        className={cn(
          'shrink-0 rounded-full border border-border bg-card object-cover object-[center_28%]',
          logoClassName ?? 'size-10',
        )}
      />
      {showLabel ? (
        <div className="min-w-0">
          <span className="block truncate text-[11px] font-normal tracking-[0.22em] text-foreground uppercase">
            {label}
          </span>
          {subtitle ? (
            <span className="block truncate text-xs font-light text-muted-foreground">{subtitle}</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
