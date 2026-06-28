import { Link } from 'react-router-dom';
import { useBot } from '../../bot/botProvider';
import type { IBotAction } from '../../bot/types';
import { ctaButtonClass, cn } from '../../lib/utils';

interface IChatActionButtonProps {
  action: IBotAction;
  className?: string;
}

export function ChatActionButton({ action, className }: IChatActionButtonProps) {
  const { navigateTo } = useBot();

  const baseClass = cn(ctaButtonClass, 'min-h-8 px-3 py-1.5', className);

  if (action.type === 'navigate') {
    return (
      <button type="button" className={baseClass} onClick={() => navigateTo(action.href)}>
        {action.label}
      </button>
    );
  }

  if (action.type === 'link') {
    if (action.href.startsWith('/#') || action.href.startsWith('#')) {
      return (
        <a href={action.href} className={baseClass}>
          {action.label}
        </a>
      );
    }

    return (
      <Link to={action.href} className={baseClass}>
        {action.label}
      </Link>
    );
  }

  if (action.type === 'external') {
    return (
      <a href={action.href} className={baseClass} target="_blank" rel="noopener noreferrer">
        {action.label}
      </a>
    );
  }

  return (
    <a href={action.href} className={baseClass}>
      {action.label}
    </a>
  );
}
