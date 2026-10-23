<script setup lang="ts">
import { useIsSlideActive, useNav, useSlideContext } from '@slidev/client'
import { computed, onUnmounted, ref, watch } from 'vue'

const TOTAL = 119_000
const MINUTES = 152
const CLIMB_MS = 7_500

const active = useIsSlideActive()
const { isPrintMode } = useNav()
const { $renderContext } = useSlideContext()
const progress = ref(1)
let frame = 0

function run() {
  window.cancelAnimationFrame(frame)
  const motion = active.value && !isPrintMode.value && ['slide', 'presenter'].includes($renderContext.value) && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (!motion) {
    progress.value = 1
    return
  }
  const start = performance.now()
  const step = (now: number) => {
    progress.value = Math.min(1, (now - start) / CLIMB_MS)
    if (progress.value < 1) frame = window.requestAnimationFrame(step)
  }
  progress.value = 0
  frame = window.requestAnimationFrame(step)
}

watch(active, run, { immediate: true, flush: 'post' })
onUnmounted(() => window.cancelAnimationFrame(frame))

const count = computed(() => `${Math.round(TOTAL * progress.value).toLocaleString('en-US')}${progress.value >= 1 ? '+' : ''}`)
const clock = computed(() => {
  const minutes = Math.round(MINUTES * progress.value)
  return `${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, '0')} min`
})
</script>

<template>
  <div class="download-tally" :class="{ quarantined: progress >= 1 }" aria-label="Over 119,000 downloads of the affected LiteLLM versions in the 2 hours 32 minutes before quarantine.">
    <div class="tally-headline"><a class="tally-count tone-danger" href="https://blog.pypi.org/posts/2026-04-02-incident-report-litellm-telnyx-supply-chain-attack/">{{ count }}</a><span class="tally-unit">downloads of the affected versions</span></div>
    <div class="tally-bar">
      <span class="bar-start tone-source"><mdi-cloud-upload /> Malicious release uploaded</span>
      <div class="bar-track"><div class="bar-fill" :style="{ transform: `scaleX(${progress})` }" /><span class="bar-clock scene-mono" :style="{ left: `${progress * 100}%` }">{{ clock }}</span></div>
      <span class="bar-end tone-dependency"><mdi-shield-off-outline /> Quarantined</span>
    </div>
    <div class="tally-status"><span class="status-responding tone-danger"><mdi-timer-sand /> Responders working. Downloads continuing.</span><span class="status-quarantined tone-dependency"><mdi-check /> Quarantined after 2 h 32 min</span></div>
    <div class="tally-rate">Normal traffic roughly <strong class="tone-danger">1,700 downloads a minute</strong> · downloads ≠ confirmed victims</div>
  </div>
</template>

<style scoped>
.download-tally { margin-top: 22px; }
.tally-headline { display: flex; align-items: baseline; gap: 20px; }
.tally-count { font-size: 64px; font-variant-numeric: tabular-nums; min-width: 300px; line-height: 1; }
.tally-unit { font-size: 23px; }
.tally-bar { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 18px; margin-top: 34px; font-size: 18px; }
.bar-start, .bar-end { display: flex; align-items: center; gap: 7px; white-space: nowrap; }
.bar-start svg, .bar-end svg { font-size: 24px; }
.bar-track { position: relative; height: 12px; border-radius: 6px; background: #d6dde8; }
.dark .bar-track { background: #3b4756; }
.bar-fill { height: 100%; border-radius: 6px; background: #bd3456; transform-origin: left; }
.dark .bar-fill { background: #fb95ac; }
.bar-clock { position: absolute; top: 18px; transform: translateX(-50%); font-size: 15px; color: #526071; white-space: nowrap; }
.dark .bar-clock { color: #adb8c8; }
.tally-status { position: relative; height: 32px; margin-top: 30px; font-size: 22px; }
.tally-status > span { position: absolute; left: 0; display: flex; align-items: center; gap: 10px; transition: opacity .4s ease; }
.tally-status svg { font-size: 26px; }
.status-quarantined { opacity: 0; }
.quarantined .status-quarantined { opacity: 1; }
.quarantined .status-responding { opacity: 0; }
.tally-rate { margin-top: 10px; font-size: 18px; color: #526071; }
.dark .tally-rate { color: #adb8c8; }
</style>
