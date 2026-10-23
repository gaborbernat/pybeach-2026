<script setup lang="ts">
import { useIsSlideActive, useNav, useSlideContext } from '@slidev/client'
import { computed, onMounted, onUnmounted, ref, useTemplateRef, watch } from 'vue'

const { loop = false } = defineProps<{ loop?: boolean }>()
const active = useIsSlideActive()
const { isPrintMode } = useNav()
const { $clicks, $renderContext } = useSlideContext()
const scene = useTemplateRef<HTMLElement>('scene')
const reducedMotion = ref(false)
const animate = computed(() => active.value && !isPrintMode.value && !reducedMotion.value && ['slide', 'presenter'].includes($renderContext.value))

onMounted(() => {
  const preference = window.matchMedia('(prefers-reduced-motion: reduce)')
  const update = () => { reducedMotion.value = preference.matches }
  update()
  preference.addEventListener('change', update)
  onUnmounted(() => preference.removeEventListener('change', update))
})

let replay: ReturnType<typeof window.setTimeout> | undefined

function sceneAnimations(element: HTMLElement) {
  return element.getAnimations({ subtree: true }).filter((animation): animation is CSSAnimation => animation instanceof CSSAnimation)
}

// Only scenes with something in flight, or marked `loop`, replay; arrivals marked `once` stay settled while the rest repeats.
function loopingAnimations(element: HTMLElement) {
  if (!loop && !element.querySelector('.flight')) return []
  return sceneAnimations(element).filter(animation => !((animation.effect as KeyframeEffect).target as Element).closest('.once'))
}

function queueReplay() {
  window.clearTimeout(replay)
  const element = scene.value
  if (!element || !animate.value) return
  const animations = sceneAnimations(element)
  if (!animations.length || !loopingAnimations(element).length) return
  const remaining = Math.max(...animations.map(animation => Number(animation.effect!.getComputedTiming().endTime) - Number(animation.currentTime)))
  replay = window.setTimeout(() => {
    for (const animation of loopingAnimations(element)) {
      animation.currentTime = 0
      animation.play()
    }
    queueReplay()
  }, Math.max(0, remaining) + 1800)
}

watch([scene, animate, $clicks], queueReplay, { flush: 'post' })
onUnmounted(() => window.clearTimeout(replay))
</script>

<template>
  <div ref="scene" class="animation-scene" :class="{ 'motion-active': animate, 'has-first-click': $clicks >= 1, 'has-second-click': $clicks >= 2 }" @animationstart="queueReplay" @animationend="queueReplay">
    <slot :clicks="$clicks" />
  </div>
</template>

<style>
.animation-scene { --scene-paper: #f4f6fa; --scene-ink: #182536; --scene-muted: #526071; --scene-rule: #bec9d7; color: var(--scene-ink); }
.dark .animation-scene { --scene-paper: #1b2330; --scene-ink: #f1f5f9; --scene-muted: #adb8c8; --scene-rule: #59687c; }
.animation-scene .scene-note { color: var(--scene-muted); font-size: 17px; }
.animation-scene .scene-mono { font-family: var(--slidev-code-font-family); }
.animation-scene .flight { opacity: 0; pointer-events: none; }
@media print, (prefers-reduced-motion: reduce) {
  .animation-scene *, .animation-scene *::before, .animation-scene *::after { animation: none !important; transition: none !important; }
  .animation-scene .flight { display: none !important; }
}
</style>
