import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { CHAT_SESSION_KEY } from './constants';
import { createBotAdapter } from './createBotAdapter';
import {
  detectNavigationTarget,
  isNavigationQuery,
} from './siteNavigation';
import { sanitizeChatContent } from '../lib/sanitizeChatContent';
import type { IBotAction, IBotAdapter, IBotMessage, IBotResponse, IQuickReply } from './types';

interface IBotContextValue {
  isOpen: boolean;
  openChat: () => void;
  closeChat: () => void;
  toggleChat: () => void;
  messages: IBotMessage[];
  quickReplies: IQuickReply[];
  showSuggestedQuestions: boolean;
  isTyping: boolean;
  assistantName: string;
  disclaimer: string;
  sendMessage: (text: string) => void;
  selectQuickReply: (id: string) => void;
  dismissSuggestedQuestions: () => void;
  navigateTo: (href: string) => void;
}

const BotContext = createContext<IBotContextValue | null>(null);

function createMessageId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function responseToAssistantMessage(response: IBotResponse): IBotMessage {
  return {
    id: createMessageId(),
    role: 'assistant',
    content: sanitizeChatContent(response.content),
    actions: response.actions,
    timestamp: Date.now(),
  };
}

interface IBotProviderProps {
  adapter?: IBotAdapter;
  children: ReactNode;
}

export function BotProvider({ adapter, children }: IBotProviderProps) {
  const navigate = useNavigate();
  const botAdapter = useMemo(() => adapter ?? createBotAdapter(), [adapter]);
  const welcomeRef = useRef(botAdapter.getWelcome());
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<IBotMessage[]>([]);
  const [quickReplies, setQuickReplies] = useState<IQuickReply[]>([]);
  const [showSuggestedQuestions, setShowSuggestedQuestions] = useState(true);
  const initializedRef = useRef(false);
  const messagesRef = useRef(messages);
  const inFlightRequestRef = useRef(0);

  useEffect(() => {
    messagesRef.current = messages;
  }, [messages]);

  useEffect(() => {
    try {
      sessionStorage.removeItem(CHAT_SESSION_KEY);
    } catch {
      // Ignore private mode / storage errors.
    }
  }, []);

  const closeChat = useCallback(() => {
    setIsOpen(false);
  }, []);

  const navigateTo = useCallback(
    (href: string) => {
      const hashIndex = href.indexOf('#');

      if (hashIndex >= 0) {
        const path = href.slice(0, hashIndex) || '/';
        const sectionId = href.slice(hashIndex + 1);
        navigate(path);
        if (sectionId) {
          window.setTimeout(() => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 200);
        }
      } else {
        navigate(href);
      }

      closeChat();
    },
    [closeChat, navigate],
  );

  const hideSuggestedQuestions = useCallback(() => {
    setShowSuggestedQuestions(false);
    setQuickReplies([]);
  }, []);

  const maybeAutoNavigate = useCallback(
    (userQuery: string, response: IBotResponse) => {
      const target = detectNavigationTarget(userQuery);
      const navHref =
        target?.href ?? response.actions?.find((action) => action.type === 'navigate')?.href;

      if (!navHref || !isNavigationQuery(userQuery)) return;

      window.setTimeout(() => {
        navigateTo(navHref);
      }, 750);
    },
    [navigateTo],
  );

  const deliverAssistantResponse = useCallback(
    (response: IBotResponse, userQuery?: string) => {
      setMessages((current) => [...current, responseToAssistantMessage(response)]);
      if (userQuery) maybeAutoNavigate(userQuery, response);
    },
    [maybeAutoNavigate],
  );

  const runAsyncQuery = useCallback(
    (text: string, userMessage: IBotMessage, fallback: () => IBotResponse) => {
      if (!botAdapter.matchQueryAsync) return;

      const requestId = ++inFlightRequestRef.current;
      const history = [...messagesRef.current, userMessage].map((item) => ({
        role: item.role,
        content: item.content,
      }));

      setIsTyping(true);
      void botAdapter
        .matchQueryAsync(text, history)
        .then((response) => {
          if (requestId !== inFlightRequestRef.current) return;
          deliverAssistantResponse(response, text);
        })
        .catch(() => {
          if (requestId !== inFlightRequestRef.current) return;
          deliverAssistantResponse(fallback(), text);
        })
        .finally(() => {
          if (requestId === inFlightRequestRef.current) {
            setIsTyping(false);
          }
        });
    },
    [botAdapter, deliverAssistantResponse],
  );

  const ensureWelcome = useCallback(() => {
    if (initializedRef.current) return;
    initializedRef.current = true;
    deliverAssistantResponse(welcomeRef.current);
    setQuickReplies(
      welcomeRef.current.followUpQuickReplies ?? botAdapter.getQuickReplies(),
    );
  }, [botAdapter, deliverAssistantResponse]);

  const openChat = useCallback(() => {
    setIsOpen(true);
    ensureWelcome();
  }, [ensureWelcome]);

  const toggleChat = useCallback(() => {
    setIsOpen((open) => {
      if (!open) ensureWelcome();
      return !open;
    });
  }, [ensureWelcome]);

  const sendMessage = useCallback(
    (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;

      hideSuggestedQuestions();

      const userMessage: IBotMessage = {
        id: createMessageId(),
        role: 'user',
        content: trimmed,
        timestamp: Date.now(),
      };

      setMessages((current) => [...current, userMessage]);

      if (botAdapter.supportsAsync && botAdapter.matchQueryAsync) {
        runAsyncQuery(trimmed, userMessage, () => botAdapter.matchQuery(trimmed));
      } else {
        window.setTimeout(() => {
          deliverAssistantResponse(botAdapter.matchQuery(trimmed), trimmed);
        }, 280);
      }
    },
    [botAdapter, deliverAssistantResponse, hideSuggestedQuestions, runAsyncQuery],
  );

  const selectQuickReply = useCallback(
    (id: string) => {
      const reply = botAdapter.getQuickReplies().find((item) => item.id === id);
      if (!reply) return;

      hideSuggestedQuestions();

      const userMessage: IBotMessage = {
        id: createMessageId(),
        role: 'user',
        content: reply.label,
        timestamp: Date.now(),
      };

      setMessages((current) => [...current, userMessage]);

      if (botAdapter.supportsAsync && botAdapter.matchQueryAsync) {
        runAsyncQuery(reply.label, userMessage, () => botAdapter.matchQuickReply(id));
      } else {
        window.setTimeout(() => {
          deliverAssistantResponse(botAdapter.matchQuickReply(id), reply.label);
        }, 280);
      }
    },
    [botAdapter, deliverAssistantResponse, hideSuggestedQuestions, runAsyncQuery],
  );

  const dismissSuggestedQuestions = useCallback(() => {
    hideSuggestedQuestions();
  }, [hideSuggestedQuestions]);

  const value = useMemo<IBotContextValue>(
    () => ({
      isOpen,
      openChat,
      closeChat,
      toggleChat,
      messages,
      quickReplies,
      showSuggestedQuestions,
      isTyping,
      assistantName: botAdapter.getAssistantName(),
      disclaimer: botAdapter.getDisclaimer(),
      sendMessage,
      selectQuickReply,
      dismissSuggestedQuestions,
      navigateTo,
    }),
    [
      isOpen,
      openChat,
      closeChat,
      toggleChat,
      messages,
      quickReplies,
      showSuggestedQuestions,
      isTyping,
      botAdapter,
      sendMessage,
      selectQuickReply,
      dismissSuggestedQuestions,
      navigateTo,
    ],
  );

  return <BotContext.Provider value={value}>{children}</BotContext.Provider>;
}

export function useBot(): IBotContextValue {
  const context = useContext(BotContext);
  if (!context) {
    throw new Error('useBot must be used within BotProvider');
  }
  return context;
}

export type { IBotAction };
