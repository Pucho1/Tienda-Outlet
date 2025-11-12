import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [ react(), tailwindcss()],
  test: {
    environment: 'happy-dom', 
    globals: true,
    // Opcional: para usar los matchers de jest-dom:
    setupFiles: './src/setupTests.js', 
  },
})
