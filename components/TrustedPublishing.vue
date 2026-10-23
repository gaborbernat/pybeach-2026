<template>
  <AnimationScene v-slot="{ clicks }" class="trusted-publishing">
    <div class="publisher-policy"><h3><a href="https://docs.pypi.org/trusted-publishers/security-model/">Registered publisher</a></h3><div v-for="(field, index) in [{ label: 'repository', value: 'pypa/virtualenv' }, { label: 'workflow', value: 'release.yaml' }, { label: 'environment', value: 'release' }]" :key="field.label" class="publisher-field" :class="{ matched: clicks >= 1 }" :style="{ '--field': index }"><span>{{ field.label }}</span><code>{{ field.value }}</code><mdi-check v-click="1" class="tone-dependency" /></div><p>PyPI matches the job’s identity before issuing a token.</p></div>
    <div v-click="1" class="publisher-exchange" :class="{ exchanging: clicks >= 1, 'step-2': clicks >= 2, 'step-3': clicks >= 3, 'step-4': clicks >= 4 }" aria-label="GitHub-signed job identity goes to PyPI. PyPI matches the registered publisher and returns a short-lived upload token. The job uploads the package and signed statement. PyPI accepts the upload. The PyPI upload token expires within 15 minutes of the authorizing OIDC flow.">
      <div class="publisher-host github-host tone-source"><mdi-github /><strong>GitHub job</strong></div><div class="publisher-host pypi-host tone-publish"><mdi-server /><strong>PyPI</strong></div>
      <svg class="exchange-lines" viewBox="0 0 610 310" aria-hidden="true"><path d="M 65 0 V 310 M 545 0 V 310" class="host-lifelines" /><path v-for="(position, index) in [45, 115, 195, 275]" :key="position" v-click="index + 1" :d="index % 2 ? `M 545 ${position} H 65 M 77 ${position - 7} L 65 ${position} L 77 ${position + 7}` : `M 65 ${position} H 545 M 533 ${position - 7} L 545 ${position} L 533 ${position + 7}`" /></svg>
      <div class="exchange-item identity-card tone-source"><mdi-card-account-details-outline /><span>GitHub-signed job identity</span></div>
      <div v-click="2" class="exchange-item upload-token tone-publish"><mdi-key-variant /><span>Short-lived upload token</span><mdi-timer-sand class="expiry-clock" /></div>
      <div v-click="3" class="exchange-item uploaded-wheel tone-build"><ArtifactParcel /><span>Package + signed statement</span><mdi-file-certificate-outline /></div>
      <div v-click="4" class="exchange-item accepted-upload tone-dependency"><mdi-check-circle-outline /><span>Upload accepted</span></div>
      <div v-click="4" class="token-expiry scene-note"><mdi-timer-off-outline /> <a href="https://docs.pypi.org/trusted-publishers/security-model/#general-considerations">Expires within 15 min of authorization</a></div>
    </div>
  </AnimationScene>
</template>

<style scoped>
.trusted-publishing { display: grid; grid-template-columns: 280px 1fr; gap: 30px; margin-top: 12px; height: 365px; }
.publisher-policy h3 { font-size: 23px; margin: 5px 0 15px; }
.publisher-field { position: relative; padding: 8px 35px 9px 12px; border-left: 3px solid var(--scene-rule); margin-top: 8px; background: var(--scene-paper); }
.publisher-field span { display: block; color: var(--scene-muted); font-size: 15px; margin-bottom: 5px; }
.publisher-field code { font-size: 21px; }
.publisher-field svg { position: absolute; right: 9px; top: 30px; font-size: 22px; }
.publisher-policy p { font-size: 18px; margin-top: 16px; }
.publisher-exchange { position: relative; height: 365px; }
.publisher-host { position: absolute; top: 0; display: flex; align-items: center; gap: 8px; padding: 8px 14px; border-bottom: 3px solid currentColor; background: var(--scene-paper); font-size: 22px; }
.publisher-host > svg { font-size: 31px; }
.github-host { left: 0; }
.pypi-host { right: 0; }
.exchange-lines { position: absolute; top: 44px; width: 100%; height: 310px; fill: none; stroke: var(--scene-rule); stroke-width: 2; }
.host-lifelines { stroke-dasharray: 4 6; opacity: .5; }
.exchange-item { position: absolute; left: 105px; right: 100px; display: flex; justify-content: center; align-items: center; gap: 9px; background: var(--scene-paper); padding: 5px 8px; border-radius: 4px; font-size: 18px; white-space: nowrap; }
.exchange-item > svg { font-size: 31px; flex-shrink: 0; }
.identity-card { top: 61px; }
.upload-token { top: 130px; }
.uploaded-wheel { top: 203px; }
.uploaded-wheel .artifact-parcel { width: 36px; height: 34px; }
.accepted-upload { top: 285px; }
.token-expiry { position: absolute; top: 334px; right: 10px; font-size: 16px !important; }
.motion-active .exchanging .identity-card { animation: identity-travels 1.2s ease-out both; }
.motion-active .matched svg { animation: identity-matches .4s ease-out both; animation-delay: calc(.65s + var(--field) * .15s); }
.motion-active .step-2 .upload-token { animation: token-returns 1.2s ease-out both; }
.motion-active .step-2 .expiry-clock { animation: expiry-turn 1s ease-in-out 4 both; }
.motion-active .step-3 .uploaded-wheel { animation: identity-travels 1.2s ease-out both; }
.motion-active .step-4 .accepted-upload { animation: token-returns 1.2s ease-out both; }
.motion-active .step-4 .token-expiry { animation: show-expiry .7s ease-out both; animation-delay: .9s; }
@keyframes identity-travels { from { opacity: 0; transform: translateX(-100px); } to { opacity: 1; transform: none; } }
@keyframes token-returns { from { opacity: 0; transform: translateX(100px); } to { opacity: 1; transform: none; } }
@keyframes identity-matches { from { opacity: 0; transform: scale(.3); } to { opacity: 1; transform: none; } }
@keyframes expiry-turn { to { transform: rotate(180deg); } }
@keyframes show-expiry { from { opacity: 0; } to { opacity: 1; } }
</style>
