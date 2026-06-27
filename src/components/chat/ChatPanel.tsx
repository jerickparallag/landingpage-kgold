import { useEffect, useRef } from 'react';
import { Cancel01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { useBot } from '../../bot/botProvider';
import { cn } from '../../lib/utils';
import { ChatInput } from './ChatInput';
import { ChatMessageList } from './ChatMessageList';
import { QuickReplyChips } from './QuickReplyChips';

interface IChatPanelProps {
  onClose: () => void;
}

export function ChatPanel({ onClose }: IChatPanelProps) {
  const {
    messages,
    quickReplies,
    showSuggestedQuestions,
    isTyping,
    assistantName,
    disclaimer,
    sendMessage,
    selectQuickReply,
    dismissSuggestedQuestions,
  } = useBot();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  useEffect(() => {
    panelRef.current?.focus();
  }, []);

  return (
    <div
      ref={panelRef}
      id="kgold-chat-panel"
      className="chat-panel"
      role="dialog"
      aria-modal="true"
      aria-label={`${assistantName} chat`}
      tabIndex={-1}
    >
      <header className="chat-panel-header">
        <div>
          <p className="chat-panel-title">{assistantName}</p>
          <p className="chat-panel-subtitle">Your AI Assistant</p>
        </div>
        <button type="button" className="chat-panel-close" onClick={onClose} aria-label="Close chat">
          <HugeiconsIcon
            icon={Cancel01Icon}
            size={18}
            color="currentColor"
            strokeWidth={1.75}
            aria-hidden
          />
        </button>
      </header>

      <ChatMessageList messages={messages} isTyping={isTyping} />

      <div className="chat-panel-footer">
        {showSuggestedQuestions && (
          <QuickReplyChips
            replies={quickReplies}
            onSelect={selectQuickReply}
            onDismiss={dismissSuggestedQuestions}
            disabled={isTyping}
          />
        )}
        <ChatInput onSend={sendMessage} disabled={isTyping} />
        <p className={cn('chat-disclaimer')}>{disclaimer}</p>
      </div>
    </div>
  );
}
