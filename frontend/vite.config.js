import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist'
  },
  server: {
    port: 3000
  },
  // 👇 Ajoute ce bloc pour Vercel
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  base: './',
});