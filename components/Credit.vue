<script setup lang="ts">
defineProps<{ license: string }>();
</script>

<template>
  <div class="text-[10px] opacity-75 pt-1">Source: <slot />. License: {{ license }}.</div>
</template>
