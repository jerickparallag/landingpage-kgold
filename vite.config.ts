import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function applyDotEnvFileOverrides(cwd: string) {
  const dotEnvPath = resolve(cwd, '.env');
  try {
    const contents = readFileSync(dotEnvPath, 'utf8');
    for (const line of contents.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const separator = trimmed.indexOf('=');
      if (separator === -1) continue;
      const key = trimmed.slice(0, separator).trim();
      const value = trimmed.slice(separator + 1).trim();
      if (key === 'GEMINI_API_KEY' || key === 'GEMINI_MODEL') {
        process.env[key] = value;
      }
    }
  } catch {
    // .env is optional in some environments
  }
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);
  applyDotEnvFileOverrides(process.cwd());

  return {
    base: process.env.VITE_BASE_PATH || '/',
    plugins: [
      react(),
      {
        name: 'kgold-chat-api',
        async configureServer(server) {
          const { createChatMiddleware } = await import('./server/chatApi');
          server.middlewares.use('/api/chat', createChatMiddleware());
        },
      },
    ],
    optimizeDeps: {
      include: ['react', 'react-dom', 'react-router-dom', 'clsx', 'tailwind-merge'],
    },
    server: {
      port: 5175,
      strictPort: false,
    },
  };
});
