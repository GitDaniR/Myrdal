/// <reference types="vitest" />
import { defineConfig } from 'vite'
import { configDefaults } from 'vitest/config'
import react from '@vitejs/plugin-react'
import mkcert from 'vite-plugin-mkcert'
import https from "https";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  if (command === 'serve') {
    return {
        plugins: [react(), mkcert()],
        base: "/Myrdal/",
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
  } else {
    return {
      plugins: [react()],
      base: "/Myrdal/",
      server: {
        proxy: {
          '/api': {
            target: "https://myrdal-backend-api-cdh7cvgag7bxhdgh.westeurope-01.azurewebsites.net",
            changeOrigin: true,
            secure: false,
            agent: new https.Agent(),
          },
        },
      },
    };
  }
});