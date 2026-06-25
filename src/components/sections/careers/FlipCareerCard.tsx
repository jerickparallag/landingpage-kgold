import type { ReactNode } from 'react';
import { cn } from '../../../lib/utils';

interface ISwitchCareerCardProps {
  isFlipped: boolean;
  front: ReactNode;
  back: ReactNode;
  className?: string;
}

export function FlipCareerCard({ isFlipped, front, back, className }: ISwitchCareerCardProps) {
  return (
    <div className={cn('switch-card relative h-full min-h-[22rem]', className)}>
      <div
        className={cn(
          'switch-card-panel flex h-full flex-col',
          isFlipped ? 'switch-card-panel-hidden' : 'switch-card-panel-visible',
        )}
        aria-hidden={isFlipped}
      >
        {front}
      </div>
      <div
        className={cn(
          'switch-card-panel flex h-full flex-col overflow-hidden bg-transparent',
          isFlipped ? 'switch-card-panel-visible' : 'switch-card-panel-hidden',
        )}
        aria-hidden={!isFlipped}
      >
        {back}
      </div>
    </div>
  );
}

interface IFlipToggleProps {
  isFlipped: boolean;
  onToggle: () => void;
  learnMoreLabel: string;
  backLabel: string;
}

export function FlipToggle({ isFlipped, onToggle, learnMoreLabel, backLabel }: IFlipToggleProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="luxury-nav-link opacity-70 hover:opacity-100"
    >
      {isFlipped ? backLabel : learnMoreLabel}
    </button>
  );
}
