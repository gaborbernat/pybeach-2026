<script setup lang="ts">
defineProps<{ mode: 'incoming' | 'shared' | 'separated' }>()
</script>

<template>
  <AnimationScene v-slot="{ clicks }" class="release-authority" :class="mode">
    <div class="authority-scene" :class="{ revealed: clicks >= 1 }">
      <svg class="authority-wires" viewBox="0 0 960 275" aria-hidden="true"><path class="handoff-wire" d="M 270 122 H 692 M 680 112 L 692 122 L 680 132" /><path v-if="mode === 'shared'" v-click="1" class="credential-wire tone-danger" d="M 148 185 V 244 H 812 V 185" /></svg>
      <div class="job-machine prepare-machine" :class="mode === 'shared' ? 'tone-build' : 'tone-source'"><div class="job-top"><i /><i /><i /><span>Preparation job</span></div><mdi-file-document-edit v-if="mode !== 'incoming'" /><mdi-cog v-else /><strong>{{ mode === 'incoming' ? 'Files and tools' : 'Prepare changelog' }}</strong><span>{{ mode === 'shared' ? 'Run Python release tools' : 'Read-only job' }}</span><small v-if="mode !== 'shared'">No release credential</small></div>
      <div v-click="mode === 'separated' ? 1 : false" class="job-machine release-machine tone-publish"><div class="job-top"><i /><i /><i /><span>{{ mode === 'shared' ? 'Same job' : 'Release job' }}</span></div><mdi-source-commit /><strong>Commit + tag</strong><span>{{ mode === 'separated' ? 'Writes specified files only' : 'Write the release' }}</span><small v-if="mode === 'incoming'">Release credential lives here</small></div>
      <div v-if="mode === 'incoming'" v-click="1" class="incoming-files"><span v-for="(name, index) in ['Files', 'Caches', 'Scripts']" :key="name" :style="{ '--item': index }"><mdi-file-outline />{{ name }}</span></div>
      <div v-if="mode === 'shared'" v-click="1" class="release-key shared-key tone-danger"><mdi-key-variant /></div>
      <div v-if="mode === 'separated'" v-click="1" class="release-key isolated-key tone-publish"><mdi-key-variant /></div>
      <div v-if="mode !== 'shared'" class="trust-boundary" :class="{ gated: mode === 'separated' }"><span>{{ mode === 'separated' ? 'Validate' : 'Job boundary' }}</span><mdi-shield-check v-if="mode === 'separated'" v-click="1" class="tone-dependency" /></div>
      <div v-if="mode === 'separated'" v-click="1" class="accepted-text tone-dependency"><mdi-file-check-outline /><code>changelog.rst</code><small>Numeric X.Y.Z version</small></div>
      <div v-if="mode === 'separated'" v-click="1" class="rejected-script tone-danger"><mdi-script-text-outline /><span>Supplied script</span><mdi-close-circle-outline /></div>
    </div>
    <div v-if="mode === 'incoming'" v-click="1" class="authority-caption">Trace incoming files with the same care as the token.</div>
    <div v-if="mode === 'shared'" v-click="1" class="authority-caption"><strong class="tone-danger">One release credential available to both operations</strong><span>A compromised preparation tool could write the release.</span></div>
    <div v-if="mode === 'separated'" v-click="1" class="authority-caption"><strong class="tone-dependency">Accept only a numeric X.Y.Z version.</strong><span>Update <code>docs/changelog.rst</code>; remove matching release fragments.</span></div>
  </AnimationScene>
</template>

<style scoped>
.release-authority { margin-top: 30px; }
.authority-scene { height: 300px; position: relative; }
.authority-wires { position: absolute; inset: 0; width: 100%; height: 275px; fill: none; stroke-width: 3; }
.handoff-wire { stroke: var(--scene-rule); }
.credential-wire { stroke: currentColor; stroke-dasharray: 7 5; }
.job-machine { position: absolute; top: 30px; width: 272px; height: 198px; border: 2px solid currentColor; border-radius: 6px; background: var(--scene-paper); display: flex; align-items: center; flex-direction: column; gap: 8px; box-shadow: 0 7px 0 color-mix(in srgb, currentColor 16%, transparent); }
.prepare-machine { left: 8px; }
.release-machine { right: 8px; }
.job-top { display: flex; align-items: center; width: 100%; border-bottom: 1px solid currentColor; padding: 8px; gap: 4px; }
.job-top i { display: block; width: 5px; height: 5px; background: currentColor; border-radius: 50%; }
.job-top span { font-size: 14px; margin-left: 12px; }
.job-machine > svg { font-size: 39px; margin-top: 4px; }
.job-machine strong { font-size: 23px; }
.job-machine > span { font-size: 17px; }
.job-machine small { font-size: 15px; }
.trust-boundary { position: absolute; left: 590px; top: 15px; height: 240px; border-left: 3px dashed var(--scene-rule); }
.trust-boundary > span { position: absolute; width: 140px; left: -70px; top: -25px; text-align: center; font-size: 17px; color: var(--scene-muted); }
.trust-boundary > svg { position: absolute; font-size: 48px; left: -24px; top: 85px; background: var(--scene-paper); }
.incoming-files { position: absolute; left: 330px; top: 62px; width: 225px; display: grid; gap: 10px; }
.incoming-files span { display: flex; gap: 8px; align-items: center; background: var(--scene-paper); font-size: 21px; width: fit-content; padding: 2px 8px; }
.incoming-files svg { font-size: 28px; }
.release-key { position: absolute; width: 98px; height: 98px; background: var(--scene-paper); border: 3px solid currentColor; border-radius: 50%; display: grid; place-items: center; }
.release-key svg { font-size: 68px; }
.shared-key { top: 183px; left: 431px; }
.isolated-key { top: 200px; left: 764px; width: 64px; height: 64px; }
.isolated-key svg { font-size: 43px; }
.accepted-text { position: absolute; top: 62px; left: 337px; width: 220px; display: flex; flex-direction: column; align-items: center; gap: 7px; background: var(--scene-paper); }
.accepted-text > svg { font-size: 46px; }
.accepted-text code { font-size: 22px; }
.accepted-text small { font-size: 16px; }
.rejected-script { position: absolute; left: 335px; top: 205px; display: flex; align-items: center; gap: 8px; font-size: 17px; }
.rejected-script svg { font-size: 30px; }
.authority-caption { font-size: 24px; text-align: center; margin-top: 12px; }
.authority-caption span { display: block; font-size: 22px; margin-top: 14px; }
.motion-active .revealed .incoming-files span { animation: incoming-file 1.5s ease-out both; animation-delay: calc(var(--item) * .18s); }
.motion-active .revealed .shared-key { animation: keyring-swing 1.4s ease-out both; transform-origin: center top; }
.motion-active .revealed .isolated-key { animation: isolate-key 1.3s ease-in-out both; }
.motion-active .revealed .accepted-text { animation: validated-handoff 2s ease-in-out both; }
.motion-active .revealed .rejected-script { animation: rejected-handoff 1.6s ease-in-out both; }
@keyframes incoming-file { from { opacity: 0; transform: translateX(-170px); } to { opacity: 1; transform: none; } }
@keyframes keyring-swing { 0% { opacity: 0; transform: rotate(-30deg) scale(.5); } 35% { opacity: 1; transform: rotate(18deg); } 65% { transform: rotate(-9deg); } 100% { transform: none; } }
@keyframes isolate-key { from { transform: translateX(-332px) scale(1.4); } to { transform: none; } }
@keyframes validated-handoff { 0% { opacity: 0; transform: translateX(-150px); } 20%, 45% { opacity: 1; transform: none; } 70% { transform: translateX(200px); opacity: .2; } 71% { opacity: 0; transform: none; } 100% { opacity: 1; } }
@keyframes rejected-handoff { 0% { opacity: 0; transform: translateX(-140px); } 45% { opacity: 1; transform: translateX(30px); } 65% { transform: translateX(-20px); } 100% { opacity: 1; transform: none; } }
</style>
