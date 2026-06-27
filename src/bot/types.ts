export type TBotActionType = 'link' | 'navigate' | 'mailto' | 'tel' | 'external';

export interface IBotAction {
  type: TBotActionType;
  label: string;
  href: string;
}

export interface IBotMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  actions?: IBotAction[];
  timestamp: number;
}

export interface IQuickReply {
  id: string;
  label: string;
}

export interface IBotResponse {
  content: string;
  actions?: IBotAction[];
  followUpQuickReplies?: IQuickReply[];
}

export interface ISalesChannel {
  id: string;
  label: string;
  href: string;
  enabled: boolean;
}

export interface IBotIntent {
  id: string;
  keywords: string[];
  answer: string;
  actions?: string[];
}

export interface IBotConfig {
  enabled: boolean;
  assistantName: string;
  welcome: {
    title: string;
    body: string;
  };
  disclaimer: string;
  quickReplies: IQuickReply[];
  salesChannels: {
    title: string;
    note: string;
    channels: ISalesChannel[];
  };
  intents: IBotIntent[];
  fallback: {
    message: string;
    actions: string[];
  };
}

export interface IKnowledgeTopic {
  id: string;
  keywords: string[];
  question?: string;
  answer: string;
  actionRefs?: string[];
}

export interface IKnowledgeIndex {
  topics: IKnowledgeTopic[];
  config: IBotConfig;
}

export interface IBotAdapter {
  getAssistantName(): string;
  getDisclaimer(): string;
  getWelcome(): IBotResponse;
  getQuickReplies(): IQuickReply[];
  matchQuickReply(id: string): IBotResponse;
  matchQuery(text: string): IBotResponse;
  supportsAsync?: boolean;
  matchQueryAsync?(text: string, history?: Pick<IBotMessage, 'role' | 'content'>[]): Promise<IBotResponse>;
}
