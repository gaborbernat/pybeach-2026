<script setup lang="ts">
import { useDarkMode, useIsSlideActive, useNav, useSlideContext } from "@slidev/client";
import { computed, onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps<{ name: "hashes" | "workflow" | "verify" | "inventory-declared" | "inventory-bundled" | "inventory-sbom" }>();
const { isDark } = useDarkMode();
const { isPrintMode } = useNav();
const { $renderContext } = useSlideContext();
const isSlideActive = useIsSlideActive();
const active = computed(() => isSlideActive.value && !isPrintMode.value
  && ["slide", "presenter"].includes($renderContext.value));
const source = computed(() => `${import.meta.env.BASE_URL}demos/${props.name}${isDark.value ? "" : "-light"}`);
const video = ref<HTMLVideoElement>();

onMounted(() => {
  watch([active, video], () => {
    if (!video.value) return;
    if (active.value) resume();
    else {
      video.value.pause();
      video.value.currentTime = 0;
    }
  }, { immediate: true, flush: "post" });

  let previousTime = -1;
  const recovery = window.setInterval(() => {
    if (!active.value || document.hidden || !video.value) return;
    if (video.value.error || (!video.value.paused && video.value.currentTime === previousTime)) video.value.load();
    previousTime = video.value.currentTime;
    resume();
  }, 3000);
  document.addEventListener("visibilitychange", resume);
  onUnmounted(() => {
    window.clearInterval(recovery);
    document.removeEventListener("visibilitychange", resume);
  });
});

async function resume() {
  if (!active.value || document.hidden || !video.value || !video.value.paused) return;
  try {
    await video.value.play();
  } catch (error) {
    if (!(error instanceof DOMException && error.name === "AbortError")) console.warn("Demo playback failed", error);
  }
}
</script>

<template>
  <video ref="video" :key="source" :src="`${source}.webm`" :poster="active ? undefined : `${source}.png`"
    :autoplay="active" muted loop playsinline preload="auto" class="demo-video"
    :controls="false" disablepictureinpicture @canplay="resume" @pause="resume" @ended="resume" />
</template>
