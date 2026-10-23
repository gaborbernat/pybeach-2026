<template>
  <AnimationScene class="compromise-chain" aria-label="LiteLLM: an unpinned compromised Trivy scanner could access release secrets in a shared CircleCI environment. Telnyx was affected in the same campaign; the dashed branch does not claim an identical credential-theft route. User groups do not show confirmed victim counts.">
    <div class="compromise-map">
      <svg class="compromise-wires" viewBox="0 0 960 330" aria-hidden="true">
        <path class="tone-danger" d="M 126 160 H 185 M 175 152 L 185 160 L 175 168" />
        <g v-click="1" class="tone-build"><path d="M 370 160 H 440 V 55 H 512 M 502 47 L 512 55 L 502 63" /><path class="campaign-link" d="M 185 285 H 512" /></g>
        <g v-click="2"><path class="tone-publish" d="M 700 55 H 790 M 780 47 L 790 55 L 780 63" /><path class="tone-install" d="M 700 230 H 790 M 780 222 L 790 230 L 780 238" /></g>
        <circle class="entry-signal flight tone-danger" r="6" />
        <g v-click="1"><circle class="token-signal upper-token flight tone-build" r="6" /></g>
        <g v-click="2"><circle class="release-signal upper-release flight tone-publish" r="6" /><circle class="release-signal lower-release flight tone-install" r="6" /></g>
      </svg>
      <div class="attacker-node tone-danger"><span class="attacker-mood" role="img" aria-label="Malicious attacker">😈</span><mdi-account-alert-outline /><strong>Attacker</strong></div>
      <a class="scanner-node tone-source" href="https://blog.pypi.org/posts/2026-04-02-incident-report-litellm-telnyx-supply-chain-attack/"><mdi-shield-search /><strong>Trivy scanner</strong><span>Unpinned in CircleCI</span></a>
      <div v-click="1" class="token-label tone-build"><mdi-key-variant /><span>LiteLLM<br>release secret</span></div>
      <div v-click="1" class="campaign-label tone-install">Same campaign</div>
      <template v-for="(project, index) in [{ name: 'LiteLLM', tone: 'tone-publish', faces: ['😠', '😢', '😞', '😡', '😟'] }, { name: 'Telnyx', tone: 'tone-install', faces: ['😢', '😡', '😟', '😠', '😞'] }]" :key="project.name">
        <a v-click="1" class="compromised-release" :class="project.tone" :style="{ top: `${index * 175 + 29}px` }" href="https://blog.pypi.org/posts/2026-04-02-incident-report-litellm-telnyx-supply-chain-attack/"><mdi-package-variant-closed /><strong>{{ project.name }}</strong><span>Malicious PyPI release</span></a>
        <div v-click="2" class="user-cluster" :class="project.tone" :style="{ top: `${index * 175 + 8}px` }"><div class="user-machines"><div v-for="(face, machine) in project.faces" :key="machine" class="user-machine" :style="{ '--machine': machine + 1 }"><mdi-laptop /><span class="user-mood" role="img" aria-label="Unhappy user">{{ face }}</span></div><span class="more-users" aria-label="More users; total unspecified">…</span></div><strong>{{ project.name }} users</strong></div>
      </template>
    </div>
    <div class="cluster-note"><div v-click="1">Dashed link: same campaign; Telnyx’s credential-theft route is unspecified.</div><div v-click="2">Machine groups illustrate potential spread, not confirmed victim counts.</div></div>
  </AnimationScene>
</template>

<style scoped>
.compromise-chain { margin-top: 10px; }
.compromise-map { position: relative; width: 960px; max-width: 100%; height: 330px; }
.compromise-wires { position: absolute; inset: 0; width: 100%; height: 330px; overflow: visible; }
.compromise-wires path { fill: none; stroke: currentColor; stroke-width: 3; }
.compromise-wires circle { fill: currentColor; }
.attacker-node, .scanner-node, .compromised-release, .user-cluster { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; }
.attacker-node { left: 0; top: 135px; width: 126px; }
.attacker-node > svg { font-size: 48px; }
.attacker-mood { position: absolute; top: -44px; font-size: 34px; line-height: 1; }
.attacker-node strong, .scanner-node strong { font-size: 25px; }
.scanner-node { left: 185px; top: 128px; width: 185px; }
.scanner-node > svg { font-size: 64px; }
.scanner-node span, .compromised-release span, .user-cluster span { font-size: 16px; line-height: 1.3; color: var(--scene-muted); }
.token-label { position: absolute; left: 290px; top: 12px; width: 130px; display: flex; flex-direction: column; align-items: center; gap: 8px; padding: 5px 0; font-size: 15px; line-height: 1.25; text-align: center; }
.token-label > svg { font-size: 27px; }
.campaign-link { stroke-dasharray: 7 7; }
.campaign-label { position: absolute; left: 210px; top: 300px; font-size: 18px; }
.compromised-release { left: 512px; width: 188px; }
.compromised-release > svg { font-size: 52px; }
.compromised-release strong { font-size: 26px; line-height: 1.2; }
.user-cluster { left: 790px; width: 170px; }
.user-machines { display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px 8px; width: 164px; }
.user-machine { position: relative; width: 44px; height: 44px; }
.user-machine > svg { display: block; width: 44px; height: 44px; }
.user-machine .user-mood { position: absolute; inset: 8px 6px 10px; display: grid; place-items: center; font-size: 18px; line-height: 1; }
.user-machines .more-users { color: inherit; font-size: 40px; line-height: 44px; }
.user-cluster strong { font-size: 19px; }
.cluster-note { margin-top: 26px; text-align: center; font-size: 13px; color: var(--scene-muted); }
.entry-signal { offset-path: path('M 126 160 H 185'); }
.upper-token { offset-path: path('M 370 160 H 440 V 55 H 512'); }
.upper-release { offset-path: path('M 700 55 H 790'); }
.lower-release { offset-path: path('M 700 230 H 790'); }
.motion-active .entry-signal { animation: compromise-entry 4.8s linear both; }
.motion-active.has-first-click .token-signal { animation: compromise-token 4.8s linear both; }
.motion-active.has-second-click .release-signal { animation: compromise-release 4.8s linear both; }
.motion-active.has-second-click .user-machine { animation: user-exposure 4.8s ease-out both; animation-delay: calc(var(--machine) * .07s); }
@keyframes compromise-entry { 0%, 5% { opacity: 0; offset-distance: 0%; } 8% { opacity: 1; offset-distance: 0%; } 25% { opacity: 1; offset-distance: 100%; } 26%, 100% { opacity: 0; offset-distance: 100%; } }
@keyframes compromise-token { 0%, 25% { opacity: 0; offset-distance: 0%; } 26% { opacity: 1; offset-distance: 0%; } 57% { opacity: 1; offset-distance: 100%; } 58%, 100% { opacity: 0; offset-distance: 100%; } }
@keyframes compromise-release { 0%, 57% { opacity: 0; offset-distance: 0%; } 58% { opacity: 1; offset-distance: 0%; } 78% { opacity: 1; offset-distance: 100%; } 79%, 100% { opacity: 0; offset-distance: 100%; } }
@keyframes user-exposure { 0%, 76%, 100% { transform: none; } 84% { transform: translateY(-4px); } }
</style>
