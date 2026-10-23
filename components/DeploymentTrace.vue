<script setup lang="ts">
const wheelDigest = 'eb1a20c5878569b69667f6a1af03458a8512b3afa7be771a2dafe92fdca05bb9'

defineProps<{ mode: 'promote' | 'incident' }>()
</script>

<template>
  <AnimationScene class="deployment-trace" :class="mode">
    <div class="deployment-stations">
      <div class="deployment-station" :class="mode === 'incident' ? 'tone-danger' : 'tone-source'"><template v-if="mode === 'promote'"><ArtifactParcel /><strong>Reviewed wheel</strong><code class="fit-value" :title="wheelDigest">{{ wheelDigest }}</code></template><template v-else><mdi-alarm-light-outline class="advisory-beacon once" /><strong>Find the component</strong><code>pkg:pypi/pip@26.2.1</code></template></div>
      <div v-click="mode === 'incident' ? 1 : false" class="deployment-station tone-dependency"><template v-if="mode === 'promote'"><ArtifactParcel /><strong>Tested wheel</strong><code class="fit-value" :title="wheelDigest">{{ wheelDigest }}</code></template><template v-else><div class="inventory-dossier"><mdi-clipboard-list-outline /><span>pip 26.2.1</span><mdi-arrow-down /><code class="fit-value" :title="wheelDigest">{{ wheelDigest }}</code></div><strong>Match the artifact</strong><span class="scene-note">Inventory + wheel digest</span></template></div>
      <div v-click="mode === 'incident' ? 2 : false" class="deployment-station tone-install"><div class="server-rack"><div v-for="drive in 3" :key="drive"><span /><i /><i /></div><small>ci-runner-07</small></div><strong>{{ mode === 'promote' ? 'Deployed wheel' : 'Locate the deployment' }}</strong><code class="fit-value">{{ mode === 'promote' ? wheelDigest : 'ci-runner-07' }}</code></div>
      <svg class="deployment-arrows" viewBox="0 0 960 250" aria-hidden="true"><path v-click="mode === 'incident' ? 1 : false" d="M 230 85 H 360 M 349 77 L 360 85 L 349 93" /><path v-click="mode === 'incident' ? 2 : false" d="M 565 85 H 695 M 684 77 L 695 85 L 684 93" /></svg>
      <div v-if="mode === 'promote'" class="promoted-parcel flight tone-build"><ArtifactParcel /><code class="fit-value" :title="wheelDigest">{{ wheelDigest }}</code></div>
      <div v-else class="trace-signal first-signal flight tone-danger"><mdi-magnify /></div>
      <div v-if="mode === 'incident'" class="trace-signal second-signal flight tone-danger"><mdi-magnify /></div>
    </div>
    <div v-if="mode === 'promote'" v-click="1" class="evidence-record once"><div class="record-title"><mdi-file-certificate-outline /> Retained deployment record</div><div><code class="tone-source">pkg:pypi/pip@26.2.1</code><mdi-link-variant /><code class="tone-build fit-value record-digest" :title="wheelDigest">{{ wheelDigest }}</code><mdi-link-variant /><code class="tone-install">ci-runner-07</code></div></div>
  </AnimationScene>
</template>

<style scoped>
.deployment-trace { margin-top: 30px; }
.deployment-stations { position: relative; display: grid; grid-template-columns: repeat(3, 1fr); gap: 38px; height: 240px; }
.deployment-station { display: flex; flex-direction: column; align-items: center; gap: 15px; padding-top: 18px; }
.deployment-station > strong { font-size: 22px; }
.deployment-station { min-width: 0; }
.deployment-station > code { max-width: 100%; font-size: 21px; }
.deployment-station:first-child > code { font-size: 19px; }
.deployment-station .artifact-parcel { width: 115px; height: 105px; }
.deployment-arrows { position: absolute; inset: 0; width: 100%; height: 250px; fill: none; stroke: var(--scene-rule); stroke-width: 3; pointer-events: none; }
.server-rack { width: 122px; height: 105px; border: 2px solid currentColor; border-radius: 5px; padding: 10px 10px 4px; background: var(--scene-paper); box-shadow: 6px 6px 0 color-mix(in srgb, currentColor 15%, transparent); }
.server-rack > div { display: flex; gap: 4px; align-items: center; height: 18px; border: 1px solid var(--scene-rule); margin-bottom: 4px; padding: 0 5px; }
.server-rack span { flex: 1; height: 2px; background: currentColor; opacity: .5; }
.server-rack i { width: 4px; height: 4px; border-radius: 50%; background: currentColor; }
.server-rack small { display: block; font: 11px var(--slidev-code-font-family); text-align: center; margin-top: 6px; }
.evidence-record { margin: 5px 30px 0; border-top: 2px solid var(--scene-rule); padding-top: 17px; }
.record-title { font-size: 21px; display: flex; align-items: center; gap: 10px; margin-bottom: 15px; }
.record-title svg { font-size: 29px; }
.evidence-record > div:last-child { display: flex; align-items: center; justify-content: space-between; gap: 12px; font-size: 22px; }
.evidence-record .record-digest { flex: 1; }
.evidence-record code:not(.record-digest), .evidence-record svg { flex-shrink: 0; }
.evidence-record code { font-size: 20px; }
.promoted-parcel { position: absolute; top: 12px; left: 106px; display: flex; align-items: center; flex-direction: column; background: var(--scene-paper); padding: 5px; }
.promoted-parcel .artifact-parcel { width: 80px; height: 74px; }
.promoted-parcel code { max-width: 105px; font-size: 16px; }
.advisory-beacon { font-size: 93px; height: 105px; }
.inventory-dossier { width: 180px; height: 120px; padding: 8px 16px; background: var(--scene-paper); border: 2px solid currentColor; display: grid; grid-template-columns: 30px 1fr; align-items: center; gap: 3px; }
.inventory-dossier > svg:first-child { font-size: 29px; }
.inventory-dossier > span { font-size: 18px; }
.inventory-dossier > svg:nth-of-type(2) { grid-column: 1 / -1; justify-self: center; font-size: 23px; }
.inventory-dossier code { width: 100%; grid-column: 1 / -1; font-size: 19px; text-align: center; }
.incident .deployment-stations { height: 265px; }
.trace-signal { position: absolute; top: 61px; background: var(--scene-paper); border: 2px solid currentColor; border-radius: 50%; padding: 4px; font-size: 34px; }
.first-signal { left: 210px; }
.second-signal { left: 550px; }
.motion-active.promote .promoted-parcel { animation: promote-artifact 3s ease-in-out both; }
.motion-active.promote.has-first-click .evidence-record { animation: retain-evidence .8s ease-out both; }
.motion-active.incident .advisory-beacon { animation: advisory-arrives .9s ease-out both; }
.motion-active.incident.has-first-click .first-signal { animation: trace-component 1.3s ease-in-out both; }
.motion-active.incident.has-second-click .second-signal { animation: trace-component 1.3s ease-in-out both; }
.motion-active.incident.has-second-click .server-rack { animation: runner-found 1.6s ease-out both; }
@keyframes promote-artifact { 0% { opacity: 0; transform: none; } 12% { opacity: 1; } 43%, 55% { opacity: 1; transform: translateX(336px); } 85% { opacity: 1; transform: translateX(672px); } 100% { opacity: 0; transform: translateX(672px); } }
@keyframes retain-evidence { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }
@keyframes advisory-arrives { 0% { transform: rotate(-12deg); } 35% { transform: rotate(10deg); } 70% { transform: rotate(-5deg); } 100% { transform: none; } }
@keyframes trace-component { 0% { opacity: 0; transform: none; } 15%, 75% { opacity: 1; } 100% { opacity: 0; transform: translateX(190px); } }
@keyframes runner-found { 0%, 50% { box-shadow: 0 0 0 0 currentColor; } 65% { box-shadow: 0 0 0 12px color-mix(in srgb, currentColor 20%, transparent); } 100% { box-shadow: 6px 6px 0 color-mix(in srgb, currentColor 15%, transparent); } }
</style>
