<!-- app.vue -->
<template>
  <NuxtLoadingIndicator />
  <NuxtRouteAnnouncer />
  <NuxtLayout :key="$route.meta.layout || 'default'">
    <NuxtPage :key="$route.fullPath" />
  </NuxtLayout>
  <teleport to="body"><div id="toast-root" /></teleport>
</template>

<script setup lang="ts">
  import { useHead,useNuxtApp} from '#imports'
  useHead({
    titleTemplate: (titleChunk) => 
      titleChunk ? `${titleChunk} | サーバー管理ツール` : 'サーバー管理ツール',
    meta: [
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'description', content: 'サーバー管理ツール' },
      { property: 'og:site_name', content: 'MySite' },
    ]
  })
  const nuxtApp = useNuxtApp()
  nuxtApp.hook('vue:error', (err, _instance, info) => {
    console.error('[GlobalVueError]', err, info)
  })

</script>