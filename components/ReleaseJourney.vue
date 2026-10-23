<script setup lang="ts">
const stops = [
  { name: 'Source', tone: 'source', icon: 'i-mdi-code-braces', href: 'https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/THREAT_MODEL.md' },
  { name: 'Dependencies', tone: 'dependency', icon: 'i-mdi-package-variant', href: 'https://docs.astral.sh/uv/concepts/projects/sync/' },
  { name: 'Build', tone: 'build', icon: 'i-mdi-hammer-wrench', href: 'https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/workflows/release.yaml' },
  { name: 'Publish', tone: 'publish', icon: 'i-mdi-cloud-upload', href: 'https://docs.pypi.org/trusted-publishers/security-model/' },
  { name: 'Install', tone: 'install', icon: 'i-mdi-download-box', href: 'https://pip.pypa.io/en/stable/topics/secure-installs/' },
  { name: 'Respond', tone: 'danger', icon: 'i-mdi-fire-extinguisher', href: 'https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/INCIDENT_RESPONSE.md' },
]
</script>

<template>
  <AnimationScene class="release-journey" aria-label="Source and dependencies enter the build. The wheel moves to publication and installation; its retained evidence supports response.">
    <div class="release-track"><div class="release-progress" /></div>
    <div class="release-traveler"><mdi-folder-open-outline class="source-folder tone-source" /><ArtifactParcel class="built-wheel tone-build" /><mdi-file-certificate-outline class="retained-record tone-install" /></div>
    <div class="release-stops"><a v-for="(stop, index) in stops" :key="stop.name" :href="stop.href" :class="`tone-${stop.tone}`" :style="{ '--stop': index }"><span :class="stop.icon" /><strong>{{ stop.name }}</strong><i /></a></div>
    <div class="release-caption scene-note">New releases bring dependency updates, bug fixes, and security fixes.</div>
  </AnimationScene>
</template>

<style scoped>
.release-journey { position: relative; margin-top: 26px; height: 285px; }
.release-track { position: absolute; left: 8%; right: 8%; top: 118px; height: 4px; background: var(--scene-rule); }
.release-progress { height: 100%; background: currentColor; color: #08777e; transform-origin: left; }
.release-traveler { position: absolute; top: 8px; left: calc(91.7% - 40px); width: 80px; height: 86px; }
.release-traveler > svg { position: absolute; width: 80px; height: 80px; }
.source-folder { opacity: 0; }
.retained-record { width: 36px !important; height: 44px !important; top: 44px; left: 60px; }
.release-stops { display: grid; grid-template-columns: repeat(6, 1fr); padding-top: 147px; }
.release-stops a { position: relative; display: flex; align-items: center; flex-direction: column; gap: 10px; font-size: 21px; }
.release-stops a > span { display: block; width: 44px; height: 44px; }
.release-stops i { position: absolute; top: -34px; width: 13px; height: 13px; border: 3px solid currentColor; background: var(--scene-paper); border-radius: 50%; }
.release-caption { text-align: center; margin-top: 22px; }
.motion-active .release-traveler { animation: release-travel 6s ease-in-out both; }
.motion-active .source-folder { animation: folder-to-wheel 6s both; }
.motion-active .built-wheel { animation: wheel-built 6s both; }
.motion-active .retained-record { animation: record-retained 6s both; }
.motion-active .release-progress { animation: release-progress 6s ease-in-out both; }
.motion-active .release-stops i { animation: checkpoint .6s ease-out both; animation-delay: calc(var(--stop) * 1.05s); }
@keyframes release-travel { 0%, 8% { left: calc(8.3% - 40px); } 20%, 27% { left: calc(25% - 40px); } 40%, 47% { left: calc(41.7% - 40px); } 60%, 67% { left: calc(58.3% - 40px); } 80%, 87% { left: calc(75% - 40px); } 100% { left: calc(91.7% - 40px); } }
@keyframes folder-to-wheel { 0%, 36% { opacity: 1; } 45%, 100% { opacity: 0; } }
@keyframes wheel-built { 0%, 36% { opacity: 0; transform: scale(.5); } 45%, 100% { opacity: 1; transform: none; } }
@keyframes record-retained { 0%, 72% { opacity: 0; } 80%, 100% { opacity: 1; } }
@keyframes release-progress { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes checkpoint { from { box-shadow: 0 0 0 0 currentColor; } to { box-shadow: 0 0 0 9px transparent; } }
</style>
