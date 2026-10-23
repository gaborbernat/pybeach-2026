<script setup lang="ts">
defineProps<{ mode: 'embedded' | 'ripple' | 'separate' }>()
</script>

<template>
  <AnimationScene class="build-metadata" :class="mode">
    <template v-if="mode === 'embedded'">
      <div class="machine-record tone-build"><div class="record-heading"><mdi-laptop /><a href="https://pypi.org/project/virtualenv/21.10.0/">virtualenv 21.10.0</a></div><pre class="scene-mono">OS: Ubuntu 24.04.5 LTS
kernel: 6.17.0-1022-azure
machine: x86_64
compiler: Clang 22.1.3
Python build: Sep 1, 14:18:09</pre></div>
      <div v-click="1" class="metadata-packing"><mdi-arrow-right class="packing-arrow" /><div class="inventory-paper tone-build"><mdi-clipboard-list-outline /><strong>Embedded SBOM</strong><span>Shipped code</span><div class="machine-sticker tone-danger"><mdi-laptop /><span>+ build machine</span></div></div><mdi-arrow-right class="packing-arrow" /><div class="packed-wheel tone-danger"><ArtifactParcel /><strong>Different machine</strong><span>Different wheel bytes</span></div></div>
    </template>
    <template v-else-if="mode === 'ripple'">
      <div class="metadata-cascade"><div v-for="(step, index) in [{ name: 'Machine details', icon: 'i-mdi-laptop', tone: 'build', detail: 'OS / compiler / build time' }, { name: 'Embedded SBOM', icon: 'i-mdi-clipboard-list-outline', tone: 'build', detail: 'Inventory bytes change' }, { name: 'RECORD', icon: 'i-mdi-file-document-outline', tone: 'dependency', detail: 'Entry digest changes' }, { name: 'Whole wheel', icon: 'i-mdi-package-variant-closed', tone: 'danger', detail: 'Archive digest changes' }]" :key="step.name" class="cascade-step" :class="`tone-${step.tone}`" :style="{ '--step': index }"><span :class="step.icon" /><strong>{{ step.name }}</strong><div class="digest-stripes"><i v-for="stripe in 12" :key="stripe" :style="{ '--stripe': stripe }" /></div><small>{{ step.detail }}</small><mdi-arrow-right v-if="index < 3" class="cascade-arrow" /></div></div>
      <div class="unchanged-source tone-source"><mdi-file-code-outline /><code>Python source</code><span>unchanged</span></div>
    </template>
    <template v-else>
      <div class="rebuild-record"><a href="https://pypi.org/project/virtualenv/21.14.6/" class="tone-dependency">virtualenv 21.14.6</a><pre class="scene-mono">source: <a class="tone-source fit-value source-commit" href="https://github.com/pypa/virtualenv/commit/9e69ac725fd4dc83726536c084ab9ca4f099c5b6">9e69ac725fd4dc83726536c084ab9ca4f099c5b6</a>
Python: 3.15.0
hatchling: 1.32.4
hatch-vcs: 0.5.0
<a href="https://reproducible-builds.org/docs/source-date-epoch/">SOURCE_DATE_EPOCH</a>: 1791470894</pre><span class="scene-note">Fix archive timestamps and permissions.</span></div>
      <div v-click="1" class="separated-records"><div class="stable-wheel tone-dependency"><ArtifactParcel /><div><strong>Inside the wheel</strong><span>Shipped-code inventory</span><small>Stable across equivalent builds</small></div></div><div class="machine-provenance tone-build"><mdi-file-certificate-outline /><div><strong>Separate build record</strong><span>Identity + output digest</span><small>Publish outside the artifact</small></div></div><div class="separating-sticker flight tone-build"><mdi-file-certificate-outline /> Build record</div><svg class="separation-path" viewBox="0 0 500 220" aria-hidden="true"><path d="M 40 85 V 150 H 100 M 90 142 L 100 150 L 90 158" /></svg></div>
    </template>
  </AnimationScene>
</template>

<style scoped>
.build-metadata { position: relative; margin-top: 28px; }
.embedded { display: grid; grid-template-columns: 345px 1fr; gap: 20px; }
.machine-record { padding: 16px 0; }
.record-heading { display: flex; align-items: center; gap: 10px; font-size: 23px; }
.record-heading > svg { font-size: 42px; }
.machine-record pre { font-size: 18px; line-height: 1.75; margin-top: 16px; padding-left: 13px; border-left: 3px solid currentColor; white-space: pre-wrap; }
.metadata-packing { display: flex; align-items: center; gap: 13px; }
.packing-arrow { flex-shrink: 0; font-size: 28px; color: var(--scene-muted); }
.inventory-paper { position: relative; width: 190px; padding: 20px 10px; border: 2px solid currentColor; background: var(--scene-paper); box-shadow: 7px 7px 0 color-mix(in srgb, currentColor 12%, transparent); text-align: center; }
.inventory-paper > svg { font-size: 46px; }
.inventory-paper strong, .inventory-paper > span { display: block; font-size: 20px; margin-top: 10px; }
.inventory-paper > span { font-size: 18px; }
.machine-sticker { display: flex; align-items: center; gap: 6px; border: 2px dashed currentColor; font-size: 15px; margin-top: 25px; padding: 8px 4px; transform: rotate(-4deg); }
.machine-sticker svg { font-size: 25px; }
.packed-wheel { display: flex; align-items: center; flex-direction: column; gap: 12px; text-align: center; width: 220px; }
.packed-wheel .artifact-parcel { width: 120px; height: 110px; }
.packed-wheel strong { font-size: 21px; }
.packed-wheel span { font-size: 18px; }
.metadata-cascade { display: grid; grid-template-columns: repeat(4, 1fr); gap: 32px; padding-top: 15px; }
.cascade-step { position: relative; display: flex; flex-direction: column; align-items: center; gap: 22px; text-align: center; }
.cascade-step > span { display: block; width: 64px; height: 64px; }
.cascade-step strong { font-size: 22px; }
.cascade-step small { font-size: 17px; }
.cascade-arrow { position: absolute; right: -32px; top: 29px; font-size: 30px; color: var(--scene-muted); }
.digest-stripes { display: flex; gap: 4px; width: 160px; height: 46px; align-items: center; }
.digest-stripes i { flex: 1; height: calc(16px + mod(var(--stripe) * 7, 28) * 1px); background: currentColor; }
.unchanged-source { display: flex; align-items: center; justify-content: center; gap: 15px; margin-top: 40px; font-size: 24px; }
.unchanged-source svg { font-size: 35px; }
.unchanged-source span { font-size: 21px; color: var(--scene-muted); }
.separate { display: grid; grid-template-columns: 400px 1fr; gap: 35px; }
.rebuild-record > a { font-size: 23px; }
.rebuild-record pre { font-size: 19px; line-height: 1.7; margin: 16px 0; }
.rebuild-record .source-commit { max-width: calc(100% - 8ch); }
.rebuild-record .scene-note { font-size: 17px; }
.separated-records { position: relative; padding-top: 10px; }
.stable-wheel, .machine-provenance { display: flex; align-items: center; gap: 18px; }
.stable-wheel .artifact-parcel { flex-shrink: 0; width: 86px; height: 79px; }
.stable-wheel strong, .machine-provenance strong { display: block; font-size: 23px; }
.stable-wheel span, .machine-provenance span { display: block; font-size: 20px; margin-top: 7px; }
.stable-wheel small, .machine-provenance small { display: block; font-size: 15px; margin-top: 8px; }
.machine-provenance { margin: 78px 0 0 100px; }
.machine-provenance > svg { flex-shrink: 0; font-size: 49px; }
.separation-path { position: absolute; width: 100%; height: 220px; top: 10px; left: 0; fill: none; stroke: currentColor; stroke-width: 2; color: var(--scene-muted); }
.separating-sticker { position: absolute; top: 45px; left: 20px; padding: 8px; background: var(--scene-paper); border: 2px dashed currentColor; font-size: 17px; }
.motion-active.has-first-click .machine-sticker { animation: pack-machine 1.5s ease-out both; }
.motion-active .cascade-step { animation: metadata-changed .6s ease-out both; animation-delay: calc(var(--step) * .65s); }
.motion-active .digest-stripes i { animation: digest-rewrite .5s ease-in-out both; animation-delay: calc(var(--step) * .65s + var(--stripe) * .025s); }
.motion-active.has-first-click .separating-sticker { animation: separate-machine 1.8s ease-in-out both; }
.motion-active.has-first-click .machine-provenance { animation: provenance-arrives 1.8s both; }
@keyframes pack-machine { from { opacity: 0; transform: translateX(-250px) rotate(-20deg); } to { opacity: 1; transform: rotate(-4deg); } }
@keyframes metadata-changed { from { opacity: .25; transform: translateY(-8px); } to { opacity: 1; transform: none; } }
@keyframes digest-rewrite { 0% { transform: scaleY(.25); } 50% { transform: scaleY(1.3); } 100% { transform: none; } }
@keyframes separate-machine { 0% { opacity: 0; transform: none; } 15%, 65% { opacity: 1; } 100% { opacity: 0; transform: translate(110px, 150px); } }
@keyframes provenance-arrives { 0%, 55% { opacity: .15; } 100% { opacity: 1; } }
</style>
