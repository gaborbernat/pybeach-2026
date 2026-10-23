<template>
  <AnimationScene v-slot="{ clicks }" class="incident-response" aria-label="A vulnerability report requires assessment. After malicious code executes, contain systems, preserve evidence, and investigate credentials. Fixing a package does not revoke an exposed credential.">
    <div class="response-columns">
      <div class="response-panel">
        <div class="response-heading tone-build"><mdi-bug-outline /><strong>Vulnerability reported</strong></div>
        <div class="response-actions"><span>Assess affected functionality</span><span>Apply the appropriate fix</span><span>Record the decision</span></div>
        <div class="package-fix once"><mdi-package-variant class="tone-build" /><div class="fix-arrow"><mdi-arrow-right /></div><mdi-package-variant-closed class="fixed-package tone-dependency" /><span class="tone-dependency">Package updated</span></div>
      </div>
      <div v-click="1" class="response-panel exposure-panel">
        <div class="response-heading tone-danger"><mdi-alert-octagon-outline /><strong>Malicious code executed</strong></div>
        <div class="response-actions"><span>Contain systems</span><span>Preserve evidence</span><span>Investigate credential exposure</span></div>
        <div class="credential-access" :class="{ revoked: clicks >= 2 }"><div class="copied-key tone-danger"><mdi-key-variant /><span>Exposed key</span></div><div class="credential-track"><i /><span class="access-packet flight"><mdi-circle-small /></span><mdi-close-circle-outline v-if="clicks >= 2" class="access-block" /></div><div class="remote-service tone-source"><mdi-cloud-lock-outline /><span>Service</span></div></div>
        <div class="credential-status" :class="clicks >= 2 ? 'tone-dependency' : 'tone-danger'">{{ clicks >= 2 ? 'Revoked: access denied' : 'Still valid after the package update' }}</div>
      </div>
    </div>
    <div v-click="2" class="response-conclusion">Rotate exposed credentials. Updating a package cannot undo a stolen token.</div>
    <div v-click="2" class="response-targets"><a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/SECURITY.md#what-to-expect">virtualenv private report: acknowledge in <strong class="tone-source">5 working days</strong> · assess in <strong class="tone-build">15 working days</strong></a><small>Targets, not guarantees.</small></div>
  </AnimationScene>
</template>

<style scoped>
.incident-response { margin-top: 16px; }
.response-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
.response-heading { display: flex; align-items: center; gap: 12px; font-size: 23px; }
.response-heading > svg { font-size: 32px; flex-shrink: 0; }
.response-actions { display: flex; flex-direction: column; gap: 10px; margin-top: 16px; font-size: 22px; line-height: 1.45; }
.package-fix { display: flex; align-items: center; gap: 13px; margin-top: 12px; height: 76px; }
.package-fix > svg { font-size: 48px; }
.fix-arrow { font-size: 30px; }
.package-fix > span { font-size: 21px; }
.credential-access { display: grid; grid-template-columns: 110px 1fr 100px; gap: 12px; align-items: center; margin-top: 15px; color: var(--scene-ink); }
.copied-key, .remote-service { display: flex; align-items: center; flex-direction: column; gap: 9px; font-size: 18px; }
.copied-key > svg, .remote-service > svg { font-size: 40px; }
.credential-track { position: relative; height: 45px; color: var(--scene-muted); }
.credential-track > i { position: absolute; top: 20px; width: 100%; border-top: 3px solid currentColor; }
.access-packet { position: absolute; left: 0; top: -1px; font-size: 43px; color: var(--scene-ink); }
.access-block { position: absolute; left: calc(50% - 19px); top: 2px; font-size: 38px; background: var(--scene-paper); border-radius: 50%; color: var(--scene-ink); }
.credential-status { font-size: 20px; text-align: center; margin-top: 14px; }
.revoked .credential-track > i { border-top-style: dashed; }
.response-conclusion { margin-top: 18px; padding-top: 12px; border-top: 2px solid var(--scene-rule); font-size: 23px; line-height: 1.4; }
.response-targets { margin-top: 12px; font-size: 18px; }
.response-targets small { display: block; margin-top: 4px; font-size: 15px; color: var(--scene-muted); }
.motion-active .fix-arrow { animation: apply-fix 3.4s ease-in-out both; }
.motion-active .fixed-package { animation: fixed-file 3.4s ease-out both; }
.motion-active.has-first-click .credential-access:not(.revoked) .access-packet { animation: credential-works 3.4s linear both; }
.motion-active.has-second-click .revoked .access-packet { animation: credential-denied 3.4s ease-out both; }
@keyframes apply-fix { 0%, 10% { transform: translateX(-8px); opacity: .3; } 45%, 100% { transform: none; opacity: 1; } }
@keyframes fixed-file { 0%, 30% { opacity: .3; } 50%, 100% { opacity: 1; } }
@keyframes credential-works { 0% { left: 0; opacity: 0; } 15% { opacity: 1; } 75% { left: calc(100% - 35px); opacity: 1; } 100% { left: calc(100% - 35px); opacity: 0; } }
@keyframes credential-denied { 0% { left: 0; opacity: 0; } 15% { opacity: 1; } 45% { left: calc(50% - 45px); opacity: 1; } 65%, 100% { left: calc(50% - 45px); opacity: 0; } }
</style>
