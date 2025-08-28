import { resolve } from 'node:path'

const APP_ROOT = process.cwd()
export default defineNuxtConfig({
  devServer: { host: '0.0.0.0', port: 3000 },

  // 追加: 型チェック/DevToolsなどを切って軽量化
  typescript: { typeCheck: false },
  devtools: { enabled: false },
  nitro: { sourceMap: false },

  vite: {
    server: {
      fs: {
        strict: true,
        allow: ['.'],
      },
      watch: {
        ignored: [
          '**/node_modules/**',
          resolve(APP_ROOT, 'node_modules') + '/**',
          resolve(APP_ROOT, '.nuxt') + '/**',
          resolve(APP_ROOT, '.output') + '/**',
          resolve(APP_ROOT, '.vscode') + '/**',
          resolve(APP_ROOT, '.git') + '/**',
          resolve(APP_ROOT, '.cache') + '/**',      // ← 追加
          resolve(APP_ROOT, 'dist') + '/**',        // ← 追加
          resolve(APP_ROOT, 'tmp') + '/**',         // ← 追加
          resolve(APP_ROOT, 'uploads') + '/**',     // ← 追加(大量画像など)
          resolve(APP_ROOT, 'storage') + '/**',     // ← 追加
          resolve(APP_ROOT, 'logs') + '/**',
          resolve(APP_ROOT, 'public_html') + '/**',
        ],
        usePolling: false,
        awaitWriteFinish: { stabilityThreshold: 250, pollInterval: 50 },
      },
      hmr: {
        protocol: 'wss',
        host: 'sv202508.w-server.net',
        clientPort: 443,
        path: '/_nuxt/',
        overlay: false, // ← 追加: 重いエラーオーバーレイを止める
      },
    },

    // 追加: 依存の事前最適化を明示して再解析を減らす
    optimizeDeps: {
      include: ['vue', 'vue-router', '@vueuse/core'], // 使っていなければ外してOK
      exclude: [],
    },

    // 追加: 変換処理を軽く
    esbuild: {
      legalComments: 'none',
      keepNames: false,
    },

    // 追加: 開発時のCSSソースマップを切る
    css: { devSourcemap: false },

    // 追加: Viteのログで画面クリア抑止（ログ肥大の副作用回避）
    clearScreen: false,
  },

  build: {
    sourcemap: false,
    transpile: [], // ← 不要に増やさない(必要なものだけ入れる)
  },

  css: ['~/assets/css/reset.css', '~/assets/scss/common.scss'],

  runtimeConfig: { public: { apiBase: '/api' } },

  routeRules: {
    // 使う時だけONに。dev中はコメントのままでOK
    // '/': { prerender: true },
    // '/news': { isr: 120 },
    // '/news/**': { ssr: true },
  },
})
