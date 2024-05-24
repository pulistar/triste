

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // Asegura que la carpeta de salida sea 'dist'
  },
})
