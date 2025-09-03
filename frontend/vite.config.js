import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})

// Vite automatically loads .env files with VITE_ prefix.
// Use import.meta.env.VITE_API_URL in your React code.
