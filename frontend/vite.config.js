/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import https from "https";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const isDev = command === 'serve';
    return {
      plugins: [react(), mkcert()],
      base: "/Myrdal/",
      server: isDev ? {
        proxy: {
          '/api': {
            target: "http://localhost:8000",
            changeOrigin: true,
            secure: false,
            agent: new https.Agent(),
          },
        },
      } : undefined,
      test: {
        globals: true,
        environment: "jsdom",
        coverage: {
          reporter: ['text', 'json-summary', 'json', 'html'],
          reportOnFailure: true,
          exclude: [
            ...configDefaults.exclude,
            '**/index.jsx',
            '**/.eslintrc.cjs',
            '**/postcss.config.js',
            '**/tailwind.config.js',
            '**/*{.,-}{test,spec,bench,benchmark}?(-d).?(c|m)[jt]s?(x)',
          ],
        }
      },
  };
});