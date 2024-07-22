/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// TODO: Edit Default Config
export default defineConfig({
    plugins: [react()],
    test: {
        // ...
    },
})
