<script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from 'nuxt/app'
interface ToolsData {
  tools: string[];
}
const { data, pending, error } = await useFetch<ToolsData>('/api/tools', {
  default: () => ({ tools: [] })
})
console.log('Data:', data.value);
const test  = ref('test2');
</script>

<!-- pages/index.vue -->
<template>
  <main style="padding:24px">
    <h1>Hello Nuxt</h1>

    <div v-if="pending">読み込み中…</div>
    <div v-else-if="error">読み込みエラー</div>
    <div v-else-if="data">
      
      <ul>
        <li v-for="(tool, index) in data.tools" :key="index">
          <p>Name: {{ tool.name }}</p>
          <p>URL: <a :href="tool.url" target="_blank">{{ tool.url }}</a></p>
        </li>
      </ul>
    </div>
    
  </main>
</template>