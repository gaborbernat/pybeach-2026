<template>
  <AnimationScene class="build-inputs">
    <div class="input-lanes">
      <div class="input-source tone-source"><mdi-source-commit /><strong>Actions: exact commits</strong><code>actions/checkout</code><small>3d3c42e5aac5ba805825da76410c181273ba90b1</small></div>
      <div class="input-source tone-build"><mdi-file-lock-outline /><strong>Release tools: versions + hashes</strong><code>hatchling==1.32.4</code><a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/tasks/release-requirements.txt">tasks/release-requirements.txt</a></div>
    </div>
    <div class="input-paths"><svg viewBox="0 0 150 250" aria-hidden="true"><path d="M 0 55 H 65 V 125 H 150 M 0 195 H 65 V 125 M 138 117 L 150 125 L 138 133" /><circle class="flight first tone-source" r="7" /><circle class="flight second tone-build" r="7" /></svg></div>
    <div class="release-runner tone-build"><mdi-server-security /><strong>Build runner</strong><span class="scene-note">Build the release files</span><div v-click="1" class="checkout-boundary tone-danger"><mdi-key-remove /><strong>Remove checkout credential</strong><code>persist-credentials: false</code><small>Not retained in Git configuration</small></div></div>
    <div v-click="1" class="input-caution scene-note"><a href="https://github.com/aquasecurity/trivy/security/advisories/GHSA-69fq-xp46-6x23#trivy-action-tag-hijacking">trivy-action users: attackers moved existing tags.</a> Pin reviewed commits; check their dependencies too.</div>
  </AnimationScene>
</template>

<style scoped>
.build-inputs { display: grid; grid-template-columns: 430px 150px 1fr; align-items: center; margin-top: 25px; }
.input-lanes { display: grid; gap: 35px; }
.input-source { display: grid; grid-template-columns: 42px 1fr; gap: 10px; align-items: center; }
.input-source > svg { font-size: 37px; }
.input-source strong { font-size: 23px; }
.input-source code, .input-source small, .input-source a { grid-column: 2; font-size: 19px; }
.input-source small { font-family: var(--slidev-code-font-family); font-size: 15px; }
.input-source a { font-size: 17px; }
.input-paths svg { width: 150px; height: 250px; fill: none; stroke: var(--scene-rule); stroke-width: 3; }
.input-paths circle { fill: currentColor; stroke: none; }
.first { offset-path: path('M 0 55 H 65 V 125 H 150'); }
.second { offset-path: path('M 0 195 H 65 V 125 H 150'); }
.release-runner { text-align: center; }
.release-runner > svg { font-size: 65px; }
.release-runner > strong { display: block; font-size: 26px; margin: 8px 0; }
.checkout-boundary { margin-top: 28px; padding-top: 18px; border-top: 2px solid var(--scene-rule); }
.checkout-boundary > svg { font-size: 33px; }
.checkout-boundary strong, .checkout-boundary code, .checkout-boundary small { display: block; margin-top: 8px; font-size: 20px; }
.checkout-boundary code { font-size: 18px; }
.checkout-boundary small { font-size: 16px; color: var(--scene-muted); }
.input-caution { grid-column: 1 / -1; margin-top: 28px; text-align: center; }
.motion-active .input-paths circle { animation: input-travels 2.2s ease-in-out both; }
.motion-active .input-paths .second { animation-delay: .4s; }
@keyframes input-travels { 0% { opacity: 0; offset-distance: 0%; } 15%, 85% { opacity: 1; } 100% { opacity: 0; offset-distance: 100%; } }
</style>
