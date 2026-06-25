import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from '../../lib/utils';
import { ICONS } from './iconRegistry';
import type { TIconKey } from '../../content/types';

interface IAppIconProps {
  name: TIconKey;
  size?: number;
  className?: string;
  strokeWidth?: number;
}

export function AppIcon({ name, size = 20, className, strokeWidth = 1.75 }: IAppIconProps) {
  return (
    <HugeiconsIcon
      icon={ICONS[name]}
      size={size}
      color="currentColor"
      strokeWidth={strokeWidth}
      className={cn('shrink-0', className)}
    />
  );
}
