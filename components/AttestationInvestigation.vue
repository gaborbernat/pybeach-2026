<template>
  <AnimationScene class="attestation-investigation">
    <div class="wave-label scene-note">Ultralytics · December 2024</div>
    <div class="attack-wave first-wave">
      <div class="wave-origin tone-danger"><mdi-database-alert /><strong>Poisoned cache</strong></div><mdi-arrow-right class="wave-arrow" />
      <div class="wave-method tone-source"><mdi-github /><strong>Legitimate workflow</strong></div><mdi-arrow-right class="wave-arrow" />
      <div class="wave-evidence tone-publish"><mdi-file-certificate-outline /><strong>Valid attestation</strong><small>Malicious package still published</small></div>
      <div class="evidence-reading"><mdi-magnify /><span>Investigate source / build → cache compromise found</span></div>
      <div class="flight wave-upload tone-danger"><mdi-package-variant-closed /></div>
    </div>
    <div v-click="1" class="attack-wave later-wave">
      <div class="wave-origin tone-danger"><mdi-key-variant /><strong>Old API token</strong></div><mdi-arrow-right class="wave-arrow" />
      <div class="wave-method tone-build"><mdi-cloud-upload /><strong>Direct PyPI upload</strong></div><mdi-arrow-right class="wave-arrow" />
      <div class="wave-evidence tone-danger"><mdi-file-hidden /><strong>No attestation</strong><small>No matching repository activity</small></div>
      <div class="evidence-reading"><mdi-magnify /><span>Different upload path → investigate the leftover token</span></div>
      <div class="flight wave-upload tone-danger"><mdi-package-variant-closed /></div>
    </div>
    <div v-click="1" class="scene-note investigation-limit">Attestations helped trace the uploads. They did not prevent these releases.</div>
  </AnimationScene>
</template>

<style scoped>
.attestation-investigation { margin-top: 12px; }
.wave-label { margin-bottom: 9px; }
.attack-wave { position: relative; display: grid; grid-template-columns: 215px 65px 265px 65px 1fr; align-items: center; row-gap: 10px; }
.wave-origin, .wave-method, .wave-evidence { display: flex; align-items: center; flex-direction: column; gap: 8px; }
.attack-wave svg { font-size: 34px; }
.attack-wave strong { font-size: 22px; }
.attack-wave small { font-size: 15px; color: var(--scene-muted); }
.attack-wave .wave-arrow { font-size: 33px; color: var(--scene-muted); }
.evidence-reading { grid-column: 1 / -1; display: flex; align-items: center; gap: 10px; font-size: 20px; padding: 6px 16px; background: var(--scene-paper); }
.evidence-reading svg { font-size: 26px; }
.later-wave { border-top: 2px solid var(--scene-rule); margin-top: 14px; padding-top: 12px; }
.wave-upload { position: absolute; top: 5px; left: 200px; }
.wave-upload svg { font-size: 24px; }
.later-wave .wave-upload { top: 23px; }
.investigation-limit { margin-top: 12px; text-align: center; }
.motion-active .first-wave .wave-upload, .motion-active.has-first-click .later-wave .wave-upload { animation: wave-publishes 2.5s ease-in-out both; }
.motion-active.has-first-click .later-wave .wave-upload { animation-delay: .5s; }
@keyframes wave-publishes { 0% { opacity: 0; transform: none; } 10%, 90% { opacity: 1; } 100% { opacity: 0; transform: translateX(440px); } }
</style>
