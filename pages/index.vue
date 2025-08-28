<!-- pages/index.vue -->

<script setup lang="ts">
import { ref } from 'vue'
import { useFetch } from 'nuxt/app'
import type { ToolsData } from '~/types/tools'
import type { ServerInfo } from '~/types/server'
const { data: toolsData, pending: toolsPending, error: toolsError } = await useFetch<ToolsData>('/api/tools', {
  default: () => ({ tools: [] })
});
const { data: serverData, pending: serverPending, error: serverError } = await useFetch<ServerInfo>('/api/server.info');
</script>

<template>
  <section class="contents">
    <h2>サーバー情報</h2>
    <div class="contents_data">
      <div v-if="serverPending">読み込み中…</div>
      <div v-else-if="serverError">サーバー情報の読み込みエラー</div>
      <div v-else-if="serverData">
        <p>Server Name: {{ serverData.serverIP }}</p>
        <p>Status: {{ serverData.status }}</p>
        <p>nodeVersion: {{ serverData.nodeVersion }}</p>
        <p>platform: {{ serverData.platform }}</p>
        <p>arch: {{ serverData.arch }}</p>
        <p>memoryUsage: {{ serverData.memoryUsage }}</p>
        <p>uptime: {{ serverData.uptime }}</p>
        <p>timestamp: {{ serverData.timestamp }}</p>
      </div>
    </div>
  </section>
  <section class="contents">
    <h2>Tools</h2>
    <div class="contents_data">
      <div v-if="toolsPending">読み込み中…</div>
      <div v-else-if="toolsError">読み込みエラー</div>
      <div v-else-if="toolsData">
        <ul>
          <li v-for="(tool, index) in toolsData.tools" :key="index">
            <a :href="tool.url" target="_blank">{{ tool.name }}</a>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>