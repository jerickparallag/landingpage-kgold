import { Cancel01Icon, ChatBotIcon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useBot } from '../../bot/botProvider';
import { cn } from '../../lib/utils';
import { ChatPanel } from './ChatPanel';

export function ChatWidget() {
  const { isOpen, toggleChat, closeChat, assistantName } = useBot();

  return (
    <div className="chat-widget-root">
      {isOpen && (
        <>
          <button
            type="button"
            className="chat-backdrop"
            aria-label="Close chat overlay"
            onClick={closeChat}
          />
          <ChatPanel onClose={closeChat} />
        </>
      )}

      <button
        type="button"
        className={cn('chat-launcher', isOpen && 'chat-launcher-open')}
        aria-expanded={isOpen}
        aria-controls="kgold-chat-panel"
        aria-label={isOpen ? 'Close assistant' : `Open ${assistantName}`}
        onClick={toggleChat}
      >
        <HugeiconsIcon
          icon={isOpen ? Cancel01Icon : ChatBotIcon}
          size={32}
          color="currentColor"
          strokeWidth={1.75}
          className="chat-launcher-icon"
          aria-hidden
        />
      </button>
    </div>
  );
}
