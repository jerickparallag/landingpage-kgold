/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_CAREERS_API_URL?: string;
  readonly VITE_SINGLE_FILE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
