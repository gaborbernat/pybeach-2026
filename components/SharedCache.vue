<template>
  <AnimationScene class="shared-cache">
    <div class="cache-premise scene-note">Risk: another job can write to a cache scope the release restores.</div>
    <div class="cache-flow">
      <svg viewBox="0 0 960 215" aria-hidden="true"><path d="M 205 85 H 375 M 565 85 H 740" /><path d="M 363 77 L 375 85 L 363 93 M 728 77 L 740 85 L 728 93" /><rect class="flight cache-save tone-danger" width="17" height="22" rx="3" /><rect class="flight cache-restore tone-danger" width="17" height="22" rx="3" /></svg>
      <div class="cache-node tone-danger"><mdi-server /><strong>Earlier job</strong><span>Writes cached files</span></div>
      <div class="cache-node tone-build"><mdi-database /><strong>Shared cache</strong><span>Persists across jobs</span></div>
      <div class="cache-node tone-publish"><mdi-cog-transfer-outline /><strong>Release build</strong><span>Restores and uses files</span></div>
      <small class="save-label">save</small><small class="restore-label">restore</small>
    </div>
    <div v-click="1" class="cache-choice"><mdi-shield-lock-outline class="tone-dependency" /><div><strong>virtualenv: disable shared uv cache restore / save</strong><code>enable-cache: false</code></div><mdi-cancel class="tone-danger" /></div>
    <div v-click="1" class="local-cache"><strong>Local cache stays within the job</strong><span class="scene-note">These flags control local caching, not GitHub’s shared cache:</span><div><code>uv --no-cache sync --locked</code><code>python -m pip --no-cache-dir install -r requirements.txt</code></div></div>
  </AnimationScene>
</template>

<style scoped>
.shared-cache { margin-top: 22px; }
.cache-premise { text-align: center; }
.cache-flow { position: relative; display: flex; justify-content: space-between; align-items: center; height: 185px; }
.cache-flow > svg { position: absolute; inset: 0; width: 100%; height: 185px; fill: none; stroke: var(--scene-rule); stroke-width: 3; }
.cache-flow rect { fill: currentColor; stroke: none; }
.cache-node { width: 220px; display: flex; flex-direction: column; align-items: center; gap: 10px; }
.cache-node > svg { font-size: 54px; }
.cache-node strong { font-size: 24px; }
.cache-node span { font-size: 18px; color: var(--scene-muted); }
.cache-flow small { position: absolute; top: 52px; font-size: 16px; color: var(--scene-muted); }
.save-label { left: 275px; }
.restore-label { left: 630px; }
.cache-save { offset-path: path('M 205 85 H 375'); }
.cache-restore { offset-path: path('M 565 85 H 740'); }
.cache-choice { display: flex; gap: 16px; align-items: center; padding: 13px 0; border-top: 2px solid var(--scene-rule); }
.cache-choice > svg { font-size: 39px; }
.cache-choice > svg:last-child { margin-left: auto; }
.cache-choice strong { font-size: 23px; }
.cache-choice code { display: block; margin-top: 6px; font-size: 18px; }
.local-cache { display: grid; gap: 6px; margin-top: 4px; }
.local-cache strong { font-size: 20px; }
.local-cache > div { display: flex; justify-content: space-between; gap: 20px; font-size: 16px; }
.motion-active .cache-save { animation: cache-travel 1.5s ease-in-out both; }
.motion-active .cache-restore { animation: cache-travel 1.5s 1.7s ease-in-out both; }
.motion-active.has-first-click .cache-restore { animation-name: cache-block; }
@keyframes cache-travel { 0% { opacity: 0; offset-distance: 0%; } 10%, 90% { opacity: 1; } 100% { opacity: 0; offset-distance: 100%; } }
@keyframes cache-block { 0% { opacity: 0; offset-distance: 0%; } 20%, 65% { opacity: 1; offset-distance: 35%; } 100% { opacity: 0; offset-distance: 35%; } }
</style>
