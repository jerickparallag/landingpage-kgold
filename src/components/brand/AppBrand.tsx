import { cn } from '../../lib/utils';
import { BRAND_LOGO_SRC, BRAND_NAME } from '../../constants/brand.constants';

interface IAppBrandProps {
  className?: string;
  logoClassName?: string;
  showLabel?: boolean;
  label?: string;
  subtitle?: string;
}

/**
 * Shared KGOLD product mark — copy to parcel-proof / questionnaire as-is.
 * Uses brand.constants for logo path and sizing tokens.
 */
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
          'shrink-0 rounded-full border border-border bg-card object-cover object-[center_28%] shadow-[var(--shadow-xs)]',
          logoClassName ?? 'size-10',
        )}
      />
      {showLabel ? (
        <div className="min-w-0">
          <span className="block truncate text-sm font-semibold tracking-tight text-foreground">
            {label}
          </span>
          {subtitle ? (
            <span className="block truncate text-xs text-muted-foreground">{subtitle}</span>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
