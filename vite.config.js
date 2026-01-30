import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Frontend can call /api/* and Vite will forward it to the Express server
      '/api': 'http://localhost:5000'
    }
  }
})
