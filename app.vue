<!-- app.vue -->
<template>
  <!-- 画面上部のロードバー（色はデフォルト） -->
  <NuxtLoadingIndicator />

  <!-- ページ遷移のアナウンス（アクセシビリティ） -->
  <NuxtRouteAnnouncer />

  <!-- 全体レイアウトの枠 -->
  <NuxtLayout>
    <!-- ルートの切替にトランジションを付ける例 -->
    <Transition name="page" mode="out-in">
      <NuxtPage />
    </Transition>
  </NuxtLayout>

  <!-- 例: グローバルに出すモーダル/トーストのマウントポイントなど -->
  <teleport to="body">
    <div id="toast-root" />
  </teleport>
</template>

<script setup lang="ts">
// グローバルな <head>（タイトル・OGなど）
// ページ側で上書き/追加も可能
/*
useHead({
  titleTemplate: (t) => (t ? `${t} | SiteName` : 'SiteName'),
  meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }]
})
*/
// 例：致命的エラーの捕捉（任意）
/*
const nuxtApp = useNuxtApp()
nuxtApp.hook('vue:error', (err, _instance, info) => {
  console.error('[GlobalVueError]', err, info)
})
*/
</script>

<style>
/* ページ遷移のフェード（好みでどうぞ） */
.page-enter-active, .page-leave-active { transition: opacity .2s ease; }
.page-enter-from, .page-leave-to { opacity: 0; }

/* ベースのリセットやフォントは assets/css/global.css を用意して
   nuxt.config.ts の css: ['~/assets/css/global.css'] で読み込むのが定石 */
html, body { margin: 0; padding: 0; }
</style>
