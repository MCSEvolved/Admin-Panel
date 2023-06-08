import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue({
    template: {
      compilerOptions: {
        isCustomElement: tag => ['mcs-navbar'].includes(tag)
      }
    }
  })],
  base: '/admin-panel'
})
