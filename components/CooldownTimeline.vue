<template>
  <AnimationScene class="cooldown-lane" aria-label="Uploads wait in a seven-day cooldown before they are eligible for review. A malicious upload removed after eleven and a half hours never reaches the eligible line.">
    <span class="lane-end tone-source"><mdi-cloud-upload /> Upload</span>
    <div class="lane-hold tone-build">
      <span class="hold-label">Example policy: 7 days</span>
      <i class="hold-line" />
      <span v-for="n in 3" :key="n" class="flight lane-parcel tone-dependency" :style="{ '--n': n }"><mdi-package-variant-closed /></span>
      <span class="flight lane-parcel pulled tone-danger"><mdi-package-variant-closed /></span>
      <span class="pull-mark once tone-danger"><mdi-close-circle-outline /><small>Elementary CLI: pulled after ~11½ h</small></span>
    </div>
    <span class="lane-end tone-dependency"><mdi-source-pull /> Eligible for review</span>
  </AnimationScene>
</template>

<style scoped>
.cooldown-lane { display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: 22px; margin: 12px 0 10px; font-size: 21px; }
.lane-end { display: flex; align-items: center; gap: 8px; white-space: nowrap; }
.lane-end svg { font-size: 26px; }
.lane-hold { position: relative; height: 74px; }
.hold-label { position: absolute; left: 0; right: 0; top: -12px; text-align: center; font-size: 17px; }
.hold-line { position: absolute; left: 0; right: 0; top: 40px; border-top: 3px dashed currentColor; }
.lane-parcel { position: absolute; top: 15px; left: 0; font-size: 24px; line-height: 1; }
.pull-mark { position: absolute; left: calc(7% - 12px); top: 47px; display: flex; align-items: center; gap: 6px; font-size: 22px; }
.pull-mark small { font-size: 13px; white-space: nowrap; }
.motion-active .lane-parcel { animation: parcel-waits 7s linear both; animation-delay: calc(var(--n) * 1.6s); }
.motion-active .pulled { animation: parcel-pulled 7s linear both; animation-delay: .4s; }
.motion-active .pull-mark { animation: pull-shows 7s both; animation-delay: .4s; }
@keyframes parcel-waits { 0% { left: 0; opacity: 0; } 5% { opacity: 1; } 92% { left: calc(100% - 24px); opacity: 1; } 100% { left: calc(100% - 24px); opacity: 0; } }
@keyframes parcel-pulled { 0% { left: 0; opacity: 0; transform: none; } 3% { opacity: 1; } 10% { left: calc(7% - 12px); opacity: 1; transform: none; } 16% { left: calc(7% - 12px); opacity: 0; transform: translateY(16px); } 100% { left: calc(7% - 12px); opacity: 0; } }
@keyframes pull-shows { 0%, 11% { opacity: 0; } 17%, 100% { opacity: 1; } }
</style>
