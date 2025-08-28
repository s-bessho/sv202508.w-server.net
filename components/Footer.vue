<template>
  <footer>
		<p class="footer_copy">&copy;{{ date }} sv202508.w-server.net</p>
	</footer>
</template>
<script setup lang="ts">
const date = new Date().getFullYear();
</script>