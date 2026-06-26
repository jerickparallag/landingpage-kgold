import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: process.env.VITE_BASE_PATH || '/',
  plugins: [react()],
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'clsx', 'tailwind-merge'],
  },
  server: {
    port: 5175,
    strictPort: false,
  },
});
