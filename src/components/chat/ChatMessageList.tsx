import { useEffect, useRef } from 'react';
import type { IBotMessage } from '../../bot/types';
import { ChatMessage } from './ChatMessage';

interface IChatMessageListProps {
  messages: IBotMessage[];
  isTyping: boolean;
}

export function ChatMessageList({ messages, isTyping }: IChatMessageListProps) {
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isTyping]);

  return (
    <div className="chat-message-list" role="log" aria-live="polite" aria-relevant="additions">
      {messages.map((message, index) => (
        <ChatMessage
          key={message.id}
          message={message}
          isWelcome={index === 0 && message.role === 'assistant'}
        />
      ))}
      {isTyping && (
        <div className="chat-message chat-message-assistant" aria-label="Assistant is typing">
          <div className="chat-message-bubble chat-typing-indicator">
            <span />
            <span />
            <span />
          </div>
        </div>
      )}
      <div ref={endRef} />
    </div>
  );
}
