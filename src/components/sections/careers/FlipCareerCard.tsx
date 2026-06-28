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
    <div className={cn('relative', className)}>
      <div className={cn(isFlipped && 'invisible')} aria-hidden={isFlipped}>
        {front}
      </div>
      <div
        className={cn(
          'absolute inset-0 flex flex-col overflow-hidden bg-background transition-opacity duration-300',
          isFlipped ? 'visible opacity-100' : 'invisible pointer-events-none opacity-0',
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
    <button type="button" onClick={onToggle} className="careers-text-link">
      {isFlipped ? backLabel : learnMoreLabel}
    </button>
  );
}
