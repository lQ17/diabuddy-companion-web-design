import { fileURLToPath, URL } from 'node:url'
import Components from 'unplugin-vue-components/vite'
import { VantResolver } from '@vant/auto-import-resolver'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // 告诉 Vue 编译器如何处理自定义元素
          isCustomElement: (tag) => tag.startsWith('water-level') || tag.startsWith('icon-sport')
        }
      }
    }),
    Components({
      resolvers: [VantResolver()]
    })
  ],
  server: {
    host: '0.0.0.0'
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
