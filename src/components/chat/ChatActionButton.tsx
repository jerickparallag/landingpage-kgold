import { Link } from 'react-router-dom';
import { useBot } from '../../bot/botProvider';
import type { IBotAction } from '../../bot/types';
import { cn } from '../../lib/utils';

interface IChatActionButtonProps {
  action: IBotAction;
  className?: string;
}

export function ChatActionButton({ action, className }: IChatActionButtonProps) {
  const { navigateTo } = useBot();

  const baseClass = cn(
    'inline-flex min-h-8 items-center justify-center rounded-brand border border-border bg-background px-3 py-1.5 text-[10px] font-normal tracking-[0.16em] uppercase transition hover:bg-muted',
    action.type === 'navigate' && 'border-foreground/20 bg-foreground text-background hover:bg-foreground/90',
    className,
  );

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
