<template>
  <AnimationScene v-slot="{ clicks }" class="seed-integrity" aria-label="CVE-2026-102930: virtualenv checked embedded pip and setuptools wheels, but downloaded seed wheels had no equivalent verification. The 21.7.12 fix compares downloads against PyPI's digest; custom indexes skip that check.">
    <div class="seed-bundled"><mdi-package-variant-closed class="tone-dependency" /><strong>Bundled pip / setuptools</strong><mdi-shield-check class="tone-dependency" /><span>Already checked against bundled hashes</span></div>
    <div class="seed-download">
      <div class="seed-node tone-source"><mdi-cloud-download-outline /><strong>Downloaded wheel</strong><code>pip / setuptools</code><span>Update or requested download</span></div>
      <div class="seed-arrow tone-source"><mdi-arrow-right /><i class="flight" /></div>
      <div class="seed-check" :class="clicks >= 1 ? 'tone-dependency' : 'tone-danger'"><mdi-shield-check v-if="clicks >= 1" /><mdi-shield-off-outline v-else /><strong>{{ clicks >= 1 ? 'Compare SHA-256' : 'No equivalent check' }}</strong><span>{{ clicks >= 1 ? 'Expected digest from PyPI' : 'Trust the downloaded bytes' }}</span></div>
      <div class="seed-arrow" :class="clicks >= 1 ? 'tone-dependency' : 'tone-danger'"><mdi-arrow-right /><i class="flight" /></div>
      <div class="seed-node tone-build"><mdi-folder-plus-outline /><strong>Seed new environments</strong><span>Install pip / setuptools</span><span class="seeded-envs" :class="clicks >= 1 ? 'tone-dependency' : 'tone-danger'"><mdi-folder-outline v-for="n in 3" :key="n" :style="{ '--n': n - 1 }" /></span><small>{{ clicks >= 1 ? 'Verified wheels seed later environments' : 'An altered wheel seeds every later environment' }}</small></div>
    </div>
    <div v-click="1" class="seed-fix"><mdi-fingerprint class="tone-dependency" /><strong>21.7.12: compare before seeding</strong><span>Mismatch → reject the wheel</span></div>
    <div v-click="1" class="seed-limit"><mdi-information-outline class="tone-build" /><span>Custom index configured? This PyPI-digest check is skipped.</span></div>
  </AnimationScene>
</template>

<style scoped>
.seed-integrity { margin-top: 30px; }
.seed-bundled { display: flex; align-items: center; justify-content: center; gap: 15px; font-size: 20px; }
.seed-bundled svg { font-size: 31px; }
.seed-bundled span { font-size: 18px; color: var(--scene-muted); }
.seed-download { display: grid; grid-template-columns: 1fr 70px 1fr 70px 1fr; align-items: start; margin-top: 28px; }
.seed-node, .seed-check { display: flex; flex-direction: column; align-items: center; gap: 11px; text-align: center; }
.seed-node > svg, .seed-check > svg { font-size: 62px; }
.seed-download strong { font-size: 23px; }
.seed-download code { font-size: 20px; }
.seed-download span { font-size: 18px; color: var(--scene-muted); }
.seed-download small { font-size: 15px; color: var(--scene-muted); }
.seed-arrow { position: relative; margin-top: 48px; }
.seed-arrow > svg { font-size: 55px; }
.seed-arrow i { position: absolute; left: 0; top: -8px; width: 11px; height: 11px; background: currentColor; border-radius: 50%; }
.seed-fix { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 24px; font-size: 23px; }
.seed-fix svg { font-size: 34px; }
.seed-fix span { font-size: 21px; }
.seed-limit { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 14px; font-size: 20px; }
.seed-limit svg { font-size: 25px; }
.seeded-envs { display: flex; gap: 8px; font-size: 30px; line-height: 1; }
.motion-active .seed-arrow .flight { animation: seed-travel 2.6s linear both; }
.motion-active .seeded-envs svg { animation: env-seeded .4s ease-out both; animation-delay: calc(2s + var(--n) * .25s); }
@keyframes env-seeded { from { opacity: .2; transform: scale(.8); } to { opacity: 1; transform: none; } }
@keyframes seed-travel { 0%, 100% { opacity: 0; transform: none; } 10% { opacity: 1; transform: none; } 80% { opacity: 1; transform: translateX(48px); } }
</style>
