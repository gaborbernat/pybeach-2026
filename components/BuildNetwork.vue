<template>
  <AnimationScene class="build-network">
    <svg class="network-routes" viewBox="0 0 960 330" aria-hidden="true"><path d="M 160 150 H 345 M 420 150 H 485 V 45 H 570 M 485 150 H 570 M 485 150 V 255 H 570" /><path class="blocked-route" d="M 385 262 V 280 H 310 V 314" /><circle v-for="route in ['packages', 'source', 'signing', 'blocked']" :key="route" :class="['flight', route, route === 'blocked' ? 'tone-danger' : 'tone-dependency']" r="7" /></svg>
    <div class="network-runner tone-build"><mdi-server-security /><strong>virtualenv</strong><span>Build job</span></div>
    <div class="network-gate tone-dependency"><mdi-shield-check-outline /><strong>Allowlist</strong><code>egress-policy: block</code></div>
    <div class="network-destinations">
      <div class="network-destination tone-install"><mdi-package-variant-closed /><div><strong>Packages</strong><code>pypi.org · files.pythonhosted.org</code></div></div>
      <div class="network-destination tone-source"><mdi-github /><div><strong>Source + GitHub API</strong><code>github.com · api.github.com</code></div></div>
      <div class="network-destination tone-publish"><mdi-file-certificate-outline /><div><strong>Signing + transparency log</strong><code>fulcio.sigstore.dev · rekor.sigstore.dev</code></div></div>
    </div>
    <div class="network-blocked tone-danger"><mdi-cancel /><div><strong>Unlisted: blocked</strong><code>collector.example</code><small>Illustrative destination</small></div></div>
    <div v-click="1" class="network-limit scene-note">Allowed services can still carry data out. Investigate new destinations before adding them.</div>
    <div class="network-selection scene-note">Selected destinations from virtualenv’s build allowlist; all use HTTPS.</div>
  </AnimationScene>
</template>

<style scoped>
.build-network { position: relative; height: 402px; margin-top: 24px; }
.network-routes { position: absolute; top: 0; width: 960px; height: 330px; fill: none; stroke: var(--scene-rule); stroke-width: 3; }
.network-routes circle { fill: currentColor; stroke: none; }
.network-routes .blocked { }
.blocked-route { stroke-dasharray: 7 7; }
.network-runner, .network-gate { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 9px; background: var(--scene-paper); padding: 10px; }
.network-runner { left: 20px; top: 85px; width: 170px; }
.network-gate { left: 292px; top: 96px; width: 188px; }
.network-runner > svg { font-size: 64px; }
.network-gate > svg { font-size: 56px; }
.network-runner strong, .network-gate strong { font-size: 25px; }
.network-runner span { font-size: 21px; }
.network-gate code { font-size: 13px; white-space: nowrap; }
.network-destinations { position: absolute; left: 570px; right: 0; top: 4px; display: grid; gap: 35px; }
.network-destination { display: flex; gap: 13px; align-items: center; min-height: 70px; }
.network-destination > svg { font-size: 38px; flex-shrink: 0; }
.network-destination strong { font-size: 22px; }
.network-destination code { display: block; font-size: 15px; margin-top: 8px; }
.network-blocked { position: absolute; left: 292px; top: 288px; display: flex; align-items: center; gap: 10px; }
.network-blocked > svg { font-size: 30px; }
.network-blocked strong { font-size: 19px; }
.network-blocked code { display: block; margin-top: 6px; font-size: 17px; }
.network-blocked small { display: block; font-size: 13px; color: var(--scene-muted); margin-top: 4px; }
.network-limit { position: absolute; top: 383px; width: 100%; text-align: center; }
.network-selection { position: absolute; top: 414px; width: 100%; text-align: center; font-size: 15px !important; }
.packages { offset-path: path('M 160 150 H 485 V 45 H 570'); }
.source { offset-path: path('M 160 150 H 570'); }
.signing { offset-path: path('M 160 150 H 485 V 255 H 570'); }
.blocked { offset-path: path('M 385 262 V 280 H 310 V 314'); }
.motion-active .network-routes circle { animation: network-packet 2.3s ease-in-out both; }
.motion-active .network-routes .source { animation-delay: .4s; }
.motion-active .network-routes .signing { animation-delay: .8s; }
.motion-active .network-routes .blocked { animation: blocked-packet 2.3s .6s ease-in-out both; }
@keyframes network-packet { 0% { opacity: 0; offset-distance: 0%; } 12%, 88% { opacity: 1; } 100% { opacity: 0; offset-distance: 100%; } }
@keyframes blocked-packet { 0% { opacity: 0; offset-distance: 0%; } 15% { opacity: 1; } 70%, 85% { opacity: 1; offset-distance: 100%; } 100% { opacity: 0; offset-distance: 95%; } }
</style>
