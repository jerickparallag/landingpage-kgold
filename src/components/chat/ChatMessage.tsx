import type { IBotMessage } from '../../bot/types';
import { cn } from '../../lib/utils';
import { ChatActionButton } from './ChatActionButton';

interface IChatMessageProps {
  message: IBotMessage;
  isWelcome?: boolean;
}

export function ChatMessage({ message, isWelcome = false }: IChatMessageProps) {
  const isUser = message.role === 'user';
  const [title, ...bodyLines] = message.content.split('\n\n');
  const body = bodyLines.join('\n\n');

  return (
    <div className={cn('chat-message', isUser ? 'chat-message-user' : 'chat-message-assistant')}>
      <div className={cn('chat-message-bubble', isWelcome && 'chat-message-welcome')}>
        {isWelcome && !isUser ? (
          <>
            <p className="chat-message-welcome-title">{title}</p>
            {body && <p className="chat-message-welcome-body">{body}</p>}
          </>
        ) : (
          <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.content}</p>
        )}
        {!isUser && message.actions && message.actions.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.actions.map((action) => (
              <ChatActionButton key={`${action.type}-${action.href}-${action.label}`} action={action} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
