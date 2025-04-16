import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './', // ← VERY IMPORTANT so paths work when Flask serves it
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0', // ← allows external devices to access your Vite dev server
    port: 5173,
    proxy: {
      '/api': 'http://127.0.0.1:5000', // keep this if Flask is on same machine
    },
    historyApiFallback: true
  },
  build: {
    outDir: 'dist', // this is default, but good to be explicit
  },
})
