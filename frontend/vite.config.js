/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import https from "https";

// https://vitejs.dev/config/
// TODO: Edit Default Config
export default defineConfig({
  plugins: [react(), mkcert()],
  server: {
    proxy: {
      '/api': {
        target: 'https://localhost:8000',
        changeOrigin: true,
        secure: false,
        agent: new https.Agent(),
      },
    },
  },
  test: {
      coverage: {
        reporter: ['text', 'json-summary', 'json'],
        reportOnFailure: true,
      }
  },
})
