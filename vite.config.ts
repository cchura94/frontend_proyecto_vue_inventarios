import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import { PrimeVueResolver } from '@primevue/auto-import-resolver';
import tailwindcss from '@tailwindcss/vite';
import Components from 'unplugin-vue-components/vite';
// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
      noDiscovery: true
  },
  plugins: [
    vue(),
    tailwindcss(),
    Components({
            resolvers: [PrimeVueResolver()]
        })
  ],
  resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    },

  // base: '/frontend_proyecto_vue_inventarios/',
})
