import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './', // ← VERY IMPORTANT so paths work when Flask serves it
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // proxy API calls to Flask
    },
    historyApiFallback: true
  },
  build: {
    outDir: 'dist', // this is default, but good to be explicit
  },
})
