<template>
  <AnimationScene class="finding-marks" aria-label="Nine findings in virtualenv">
    <span v-for="n in 9" :key="n" class="finding-mark tone-danger" :style="{ '--n': n - 1 }">{{ n }}</span>
  </AnimationScene>
</template>

<style scoped>
.finding-marks { display: flex; gap: 10px; margin-top: 26px; }
.finding-mark { display: grid; place-items: center; width: 34px; height: 34px; border: 2px solid currentColor; border-radius: 50%; font-size: 17px; font-weight: 600; }
.motion-active .finding-mark { animation: mark-found .35s ease-out both; animation-delay: calc(.4s + var(--n) * .18s); }
@keyframes mark-found { from { opacity: .15; transform: scale(.6); } to { opacity: 1; transform: none; } }
</style>
