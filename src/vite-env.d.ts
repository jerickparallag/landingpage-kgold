/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CAREERS_API_URL?: string;
  readonly VITE_SINGLE_FILE?: string;
  readonly VITE_CHAT_ENABLED?: string;
  readonly VITE_CHAT_ADAPTER?: string;
  readonly VITE_CHAT_API_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
