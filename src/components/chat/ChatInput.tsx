import { useState, type FormEvent, type KeyboardEvent } from 'react';
import { ArrowRight01Icon } from '@hugeicons/core-free-icons';
import { HugeiconsIcon } from '@hugeicons/react';
import { cn } from '../../lib/utils';

interface IChatInputProps {
  onSend: (text: string) => void;
  disabled?: boolean;
}

export function ChatInput({ onSend, disabled = false }: IChatInputProps) {
  const [value, setValue] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmed = value.trim();
    if (!trimmed || disabled) return;
    onSend(trimmed);
    setValue('');
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      const trimmed = value.trim();
      if (!trimmed || disabled) return;
      onSend(trimmed);
      setValue('');
    }
  }

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <label htmlFor="kgold-chat-input" className="sr-only">
        Type your message
      </label>
      <textarea
        id="kgold-chat-input"
        rows={1}
        value={value}
        disabled={disabled}
        placeholder="Type your question..."
        className={cn('chat-input', disabled && 'opacity-60')}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={handleKeyDown}
      />
      <button type="submit" className="chat-send-button" disabled={disabled || !value.trim()} aria-label="Send message">
        <HugeiconsIcon
          icon={ArrowRight01Icon}
          size={18}
          color="currentColor"
          strokeWidth={1.75}
          aria-hidden
        />
      </button>
    </form>
  );
}
