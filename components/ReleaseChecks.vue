<template>
  <AnimationScene class="release-checks" aria-label="An immutable release blocks replacement. An independent rebuild compares digests from the same recorded inputs.">
    <div class="release-lock-panel">
      <a class="checks-heading tone-dependency" href="https://docs.github.com/en/code-security/concepts/supply-chain-security/immutable-releases">Immutable release</a>
      <div class="locked-artifact tone-dependency"><ArtifactParcel /><mdi-lock class="release-padlock" /><strong>Published tag + assets</strong></div>
      <div class="replacement-attempt tone-danger"><mdi-package-variant-closed /><span class="replacement-arrow"><mdi-arrow-up /></span><mdi-close-circle-outline /><span>Replacement blocked</span></div>
      <div class="checks-limit">A new, bad release is still possible.</div>
    </div>
    <div v-click="1" class="rebuild-panel">
      <a class="checks-heading tone-build" href="https://virtualenv.pypa.io/en/latest/reference/release-artifacts.html#build-reproducibility">Independent rebuild</a>
      <div class="recorded-inputs tone-source"><mdi-source-branch /><span>Same source + recorded tools</span></div>
      <div class="build-pair"><div v-for="name in ['A', 'B']" :key="name" class="build-lane tone-build"><mdi-arrow-down /><span>Build {{ name }}</span><mdi-cog-outline class="build-gear" /><mdi-package-variant-closed class="rebuilt-wheel" /></div></div>
      <div class="digest-comparison tone-dependency"><mdi-equal /><span>Matching digests</span><small>Example: same wheel bytes</small></div>
      <div class="checks-limit">A source bug can reproduce too.</div>
    </div>
  </AnimationScene>
</template>

<style scoped>
.release-checks { display: grid; grid-template-columns: 1fr 1fr; gap: 55px; margin-top: 28px; }
.checks-heading { display: block; font-size: 25px; }
.locked-artifact { position: relative; display: flex; flex-direction: column; align-items: center; gap: 16px; margin-top: 28px; }
.locked-artifact > .artifact-parcel { width: 127px; height: 116px; }
.release-padlock { position: absolute; left: calc(50% + 22px); top: 65px; font-size: 48px; background: var(--scene-paper); border-radius: 10px; }
.locked-artifact > strong { font-size: 24px; }
.replacement-attempt { position: relative; display: flex; align-items: center; justify-content: center; gap: 12px; height: 110px; }
.replacement-attempt > svg { font-size: 36px; }
.replacement-attempt > span:last-child { font-size: 22px; }
.replacement-arrow { position: absolute; left: calc(50% - 25px); top: 0; font-size: 30px; }
.checks-limit { margin-top: 13px; font-size: 21px; }
.recorded-inputs { display: flex; justify-content: center; align-items: center; gap: 12px; margin-top: 25px; font-size: 21px; }
.recorded-inputs > svg { font-size: 28px; }
.build-pair { display: grid; grid-template-columns: 1fr 1fr; margin-top: 5px; }
.build-lane { display: flex; align-items: center; flex-direction: column; gap: 8px; font-size: 20px; }
.build-lane > svg { font-size: 28px; }
.build-lane > .build-gear { font-size: 33px; }
.build-lane > .rebuilt-wheel { font-size: 38px; }
.digest-comparison { display: grid; grid-template-columns: 40px 1fr; align-items: center; gap: 3px 8px; width: fit-content; margin: 16px auto 0; font-size: 23px; }
.digest-comparison > svg { grid-row: span 2; font-size: 35px; }
.digest-comparison > small { font-size: 16px; color: var(--scene-muted); }
.rebuild-panel .checks-limit { margin-top: 18px; }
.motion-active .replacement-arrow { animation: blocked-replacement 3.5s ease-in-out both; }
.motion-active .release-padlock { animation: lock-holds 3.5s ease-in-out both; }
.motion-active.has-first-click .build-gear { animation: rebuild-turn 3.5s ease-in-out both; }
.motion-active.has-first-click .rebuilt-wheel { animation: rebuilt-file 3.5s ease-out both; }
.motion-active.has-first-click .digest-comparison { animation: compare-bytes 3.5s ease-out both; }
@keyframes blocked-replacement { 0%, 10% { opacity: 0; transform: translateY(18px); } 30% { opacity: 1; transform: translateY(-9px); } 40% { opacity: 1; transform: translateY(4px); } 65%, 100% { opacity: 0; transform: translateY(18px); } }
@keyframes lock-holds { 0%, 25%, 45%, 100% { transform: none; } 30% { transform: rotate(-8deg); } 35% { transform: rotate(8deg); } }
@keyframes rebuild-turn { 0% { transform: none; } 60%, 100% { transform: rotate(180deg); } }
@keyframes rebuilt-file { 0%, 45% { opacity: 0; transform: translateY(-12px); } 65%, 100% { opacity: 1; transform: none; } }
@keyframes compare-bytes { 0%, 65% { opacity: 0; } 85%, 100% { opacity: 1; } }
</style>
