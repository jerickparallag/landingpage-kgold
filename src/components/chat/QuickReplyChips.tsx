import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import type { IQuickReply } from '../../bot/types';
import { cn } from '../../lib/utils';

interface IQuickReplyChipsProps {
  replies: IQuickReply[];
  onSelect: (id: string) => void;
  onDismiss: () => void;
  disabled?: boolean;
}

export function QuickReplyChips({
  replies,
  onSelect,
  onDismiss,
  disabled = false,
}: IQuickReplyChipsProps) {
  if (replies.length === 0) return null;

  return (
    <div className="chat-quick-replies-tray">
      <div className="chat-quick-replies-header">
        <span>Suggested questions</span>
        <button
          type="button"
          disabled={disabled}
          className={cn(
            'chat-quick-replies-dismiss',
            disabled && 'cursor-not-allowed opacity-50',
          )}
          aria-label="Hide suggested questions"
          onClick={onDismiss}
        >
          <HugeiconsIcon
            icon={Cancel01Icon}
            size={12}
            color="currentColor"
            strokeWidth={1.75}
            aria-hidden
          />
        </button>
      </div>

      <div className="chat-quick-replies" role="group" aria-label="Suggested questions">
        {replies.map((reply) => (
          <button
            key={reply.id}
            type="button"
            disabled={disabled}
            className={cn(
              'chat-quick-reply',
              disabled && 'cursor-not-allowed opacity-50',
            )}
            onClick={() => onSelect(reply.id)}
          >
            {reply.label}
          </button>
        ))}
      </div>
    </div>
  );
}
