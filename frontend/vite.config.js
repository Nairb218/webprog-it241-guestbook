import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // Proxy /api requests to the NestJS backend during local development
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
})
