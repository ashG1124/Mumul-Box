import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

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
})
