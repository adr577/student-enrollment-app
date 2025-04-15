import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
<<<<<<< Updated upstream
  plugins: [react()],
=======
  base: './', // ← VERY IMPORTANT so paths work when Flask serves it
  plugins: [react(), tailwindcss()],
  server: {
    historyApiFallback: true
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000', // proxy API calls to Flask
    },
  },
  build: {
    outDir: 'dist', // this is default, but good to be explicit
  },
>>>>>>> Stashed changes
})
