<template>
  <svg class="artifact-parcel" viewBox="0 0 120 110" aria-hidden="true">
    <path d="M 10 28 L 60 6 L 110 28 L 110 85 L 60 106 L 10 85 Z" fill="var(--scene-paper)" stroke="currentColor" stroke-width="2" />
    <path d="M 10 28 L 60 50 L 60 106 L 10 85 Z" fill="currentColor" opacity=".12" />
    <path d="M 60 50 L 110 28 L 110 85 L 60 106 Z" fill="currentColor" opacity=".26" />
    <path d="M 10 28 L 60 50 L 110 28 M 60 50 V 106 M 35 17 L 85 39 V 63" fill="none" stroke="currentColor" stroke-width="3" />
    <text x="32" y="70" text-anchor="middle" font-size="17" font-family="monospace" fill="currentColor" transform="rotate(23 32 70)">.whl</text>
  </svg>
</template>

<style scoped>
.artifact-parcel { display: block; width: 100px; height: 92px; }
.artifact-parcel text { font: 17px monospace; }
</style>
