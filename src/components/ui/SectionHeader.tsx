import type { ReactNode } from 'react';
import { cn, sectionDescriptionClass, sectionHeadingClass } from '../../lib/utils';

interface ISectionHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function SectionHeader({ title, description, action, className }: ISectionHeaderProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center text-center',
        action ? 'gap-8 sm:flex-row sm:items-end sm:justify-between sm:text-left' : '',
        className,
      )}
    >
      <div className={cn('max-w-lg', action ? 'sm:text-left' : 'mx-auto')}>
        <h2 className={sectionHeadingClass}>{title}</h2>
        {description ? (
          <p className={cn(sectionDescriptionClass, action ? '' : 'mx-auto')}>{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
