import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    cssMinify: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        // separa react/react-dom em chunk próprio para cache mais estável
        manualChunks(id) {
          if (id.includes('node_modules/react')) return 'react'
        },
      },
    },
  },
})
