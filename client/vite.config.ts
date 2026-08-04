import path from 'path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(), // Tailwind CSS v4 — vite 플러그인 방식
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // import '@/...' 로 src 절대경로 참조
    },
  },
  server: {
    // 서버의 app.share-base-url(http://localhost:3000/q)과 포트를 맞춤
    port: 3000,
    strictPort: true,
    proxy: {
      // 개발 중에는 /api 요청을 백엔드로 프록시 → 같은 오리진이라 CORS 불필요
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
      },
    },
  },
});
