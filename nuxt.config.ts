import { resolve } from 'node:path'

const APP_ROOT = process.cwd()
export default defineNuxtConfig({
  devServer: { host: '0.0.0.0', port: 3000 },
  vite: {
    server: {
      watch: {
        ignored: [
          '**/node_modules/**',
          resolve(APP_ROOT, 'node_modules') + '/**',     // /app/node_modules
          resolve(APP_ROOT, '.nuxt') + '/**',
          resolve(APP_ROOT, '.output') + '/**',
          resolve(APP_ROOT, 'logs') + '/**',
          resolve(APP_ROOT, 'public_html') + '/**'
        ]
      },
      hmr: {
        protocol: 'wss',                       // HTTPS 経由
        host: 'sv202508.w-server.net',         // あなたのドメイン
        clientPort: 443,                       // ブラウザから見えるポート
        path: '/_nuxt/'                        // Nuxt の既定パス
      }
    }
  },
  build: {
    sourcemap: false                    // ソースマップ切るとメモリ節約
  },
  //  css: ['~/assets/scss/common.scss'],
  runtimeConfig: {
    public: { apiBase: '/api' }   // PHP API を同一オリジンで
  },

  routeRules: {
//    '/':         { prerender: true },
//    '/news':     { isr: 120 },
//    '/news/**':  { ssr: true }
  },

  devtools: {
    enabled: false
  }
})
