<template>
  <AnimationScene class="package-selection" aria-label="A new wheel upload needs review even for an existing release. Route a private package only to its approved index.">
    <div class="selection-panel">
      <a class="selection-heading tone-dependency" href="https://github.com/pypa/virtualenv/blob/bf09c7eb/tasks/check_wheel_age.py">Check each upload</a>
      <div class="upload-timeline"><div class="existing-release tone-source"><mdi-tag-outline /><strong>Existing version</strong><span class="scene-note">Release already exists</span></div><div class="upload-rail"><i /><mdi-arrow-right /></div><div class="new-upload once tone-build"><mdi-package-variant /><strong>New wheel</strong><span class="scene-note">Same version</span></div></div>
      <div class="age-check once tone-build"><mdi-clock-alert-outline /><div><strong>New upload time</strong><span>Review this file’s age.</span></div></div>
      <div class="selection-note">An old version can contain a fresh upload.</div>
    </div>
    <div v-click="1" class="selection-panel source-panel">
      <span class="selection-heading tone-source">Choose the allowed source</span>
      <div class="index-map">
        <div class="private-package tone-publish"><mdi-package-variant-closed /><strong>Private package</strong></div>
        <svg class="index-routes" viewBox="0 0 440 195" aria-hidden="true"><path class="allowed-route" d="M 105 100 H 180 V 48 H 245 M 235 40 L 245 48 L 235 56" /><path class="denied-route" d="M 180 100 V 150 H 245" /><path class="denied-cross" d="M 216 141 L 234 159 M 216 159 L 234 141" /></svg>
        <div class="approved-index tone-dependency"><mdi-server-security /><span>Approved<br>private index</span></div>
        <div class="other-index"><mdi-server-outline /><span>Other index</span></div>
        <span class="index-packet flight tone-dependency"><mdi-cube-outline /></span>
      </div>
      <div class="index-settings"><a href="https://docs.astral.sh/uv/concepts/indexes/">uv: explicit indexes</a><a href="https://pip.pypa.io/en/stable/cli/pip_install/#finding-packages">pip: one controlled index</a></div>
    </div>
  </AnimationScene>
</template>

<style scoped>
.package-selection { display: grid; grid-template-columns: 1fr 1fr; gap: 42px; margin-top: 35px; }
.selection-heading { display: block; font-size: 25px; }
.upload-timeline { display: grid; grid-template-columns: 1fr 58px 1fr; align-items: center; height: 192px; }
.existing-release, .new-upload { display: flex; align-items: center; flex-direction: column; gap: 12px; text-align: center; }
.existing-release > svg, .new-upload > svg { font-size: 48px; }
.upload-timeline strong { font-size: 22px; }
.upload-rail { position: relative; color: var(--scene-muted); }
.upload-rail > i { position: absolute; left: 0; right: 13px; top: 50%; border-top: 2px solid currentColor; }
.upload-rail > svg { display: block; margin-left: auto; font-size: 30px; }
.age-check { display: flex; align-items: center; gap: 18px; padding: 15px 0; border-top: 2px solid var(--scene-rule); }
.age-check > svg { font-size: 43px; }
.age-check strong, .age-check span { display: block; }
.age-check strong { font-size: 24px; }
.age-check span { margin-top: 9px; font-size: 21px; color: var(--scene-ink); }
.selection-note { font-size: 20px; margin-top: 20px; line-height: 1.4; }
.index-map { height: 195px; position: relative; margin-top: 20px; }
.private-package { position: absolute; left: 0; top: 63px; display: flex; flex-direction: column; align-items: center; gap: 13px; width: 138px; }
.private-package > svg { font-size: 45px; }
.private-package strong { font-size: 19px; }
.index-routes { position: absolute; inset: 0; width: 100%; height: 195px; fill: none; stroke-width: 3; }
.allowed-route { stroke: var(--scene-rule); }
.denied-route { stroke: var(--scene-rule); stroke-dasharray: 6 5; }
.denied-cross { stroke: var(--scene-muted); }
.approved-index, .other-index { position: absolute; left: 267px; display: flex; align-items: center; gap: 13px; font-size: 20px; line-height: 1.35; }
.approved-index { top: 17px; }
.other-index { top: 128px; color: var(--scene-muted); }
.approved-index > svg, .other-index > svg { font-size: 35px; flex-shrink: 0; }
.index-packet { position: absolute; left: 95px; top: 84px; font-size: 30px; background: var(--scene-paper); }
.index-settings { display: flex; flex-direction: column; gap: 15px; margin-top: 14px; font-size: 22px; }
.motion-active .new-upload { animation: wheel-arrives 3.4s ease-out both; }
.motion-active .age-check > svg { animation: upload-clock 3.4s ease-out both; }
.motion-active.has-first-click .index-packet { animation: approved-route 3.4s ease-in-out both; }
@keyframes wheel-arrives { 0%, 10% { opacity: 0; transform: translateY(-30px); } 30%, 100% { opacity: 1; transform: none; } }
@keyframes upload-clock { 0%, 30% { transform: rotate(-35deg); } 45%, 100% { transform: none; } }
@keyframes approved-route { 0% { opacity: 0; transform: none; } 15% { opacity: 1; transform: none; } 40% { opacity: 1; transform: translateX(70px); } 60% { opacity: 1; transform: translate(70px, -52px); } 85% { opacity: 1; transform: translate(130px, -52px); } 100% { opacity: 0; transform: translate(130px, -52px); } }
</style>
