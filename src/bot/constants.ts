export const CHAT_SESSION_KEY = 'kgold-chat-session-v1';

export const CHAT_ENABLED =
  import.meta.env.VITE_CHAT_ENABLED !== 'false';

export const CHAT_ADAPTER = import.meta.env.VITE_CHAT_ADAPTER ?? 'static';

export const CHAT_API_URL = import.meta.env.VITE_CHAT_API_URL ?? '';

export const MATCH_SCORE_THRESHOLD = 0.35;
