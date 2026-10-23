<script setup lang="ts">
defineProps<{ count: number; route?: 'secret' | 'string' }>()
</script>

<template>
  <div class="found-counter" aria-label="Running count of issues found in virtualenv during this talk">
    <span class="found-label">Found in virtualenv</span>
    <strong :key="count" class="found-count tone-danger">{{ count }}</strong>
    <span v-if="route" :key="route" class="found-route"><mdi-key-variant v-if="route === 'secret'" class="tone-build" /><mdi-format-quote-close v-else class="tone-source" />{{ route === 'secret' ? 'a secret read' : 'a string executed' }}</span>
  </div>
</template>

<style scoped>
.found-counter { position: absolute; top: 22px; right: 28px; display: flex; flex-direction: column; align-items: flex-end; line-height: 1; }
.found-label { font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: #526071; }
.dark .found-label { color: #adb8c8; }
.found-count { font-size: 44px; margin-top: 4px; transform-origin: right center; animation: found-tick .3s ease-out both; }
.found-route { display: flex; align-items: center; gap: 4px; margin-top: 6px; font-size: 13px; color: #526071; animation: found-tick .3s ease-out both; transform-origin: right center; }
.dark .found-route { color: #adb8c8; }
.found-route svg { font-size: 16px; }
@keyframes found-tick { 0% { transform: scale(1.5); } 100% { transform: scale(1); } }
@media print, (prefers-reduced-motion: reduce) { .found-count, .found-route { animation: none; } }
</style>
