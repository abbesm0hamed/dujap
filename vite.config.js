import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    build: {
      ssr: true,
    },
    ssr: {
      noExternal: ['lit', '@lit-labs/ssr', '@lit-labs/router']
    },
    optimizeDeps: {
      include: ['urlpattern-polyfill']
    },
    envPrefix: 'VITE_'
  }
})
