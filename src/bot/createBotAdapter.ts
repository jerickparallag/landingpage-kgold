import { buildKnowledgeIndex } from './buildKnowledgeIndex';
import { CHAT_ADAPTER, CHAT_API_URL } from './constants';
import { ApiBotAdapter } from './adapters/apiAdapter';
import { StaticContentAdapter } from './adapters/staticAdapter';
import type { IBotAdapter } from './types';

let cachedAdapter: IBotAdapter | undefined;

function usesRemoteChat(): boolean {
  return CHAT_ADAPTER === 'gemini' || CHAT_ADAPTER === 'api';
}

export function createBotAdapter(): IBotAdapter {
  if (cachedAdapter) return cachedAdapter;

  const index = buildKnowledgeIndex();
  const staticAdapter = new StaticContentAdapter(index);
  const apiUrl = CHAT_API_URL || '/api/chat';

  if (usesRemoteChat() && apiUrl) {
    cachedAdapter = new ApiBotAdapter(apiUrl, staticAdapter);
  } else {
    cachedAdapter = staticAdapter;
  }

  return cachedAdapter;
}

export function isBotContentEnabled(): boolean {
  return buildKnowledgeIndex().config.enabled;
}

export function isGeminiChatEnabled(): boolean {
  return usesRemoteChat();
}
