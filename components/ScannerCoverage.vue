<template>
  <AnimationScene class="scanner-coverage" aria-label="Static analysis follows configured untrusted inputs into operations; local inputs include arguments and environment variables.">
    <div class="scan-heading"><mdi-magnify-scan class="tone-publish" /><span>Static data-flow analysis</span></div>
    <div class="scan-path tone-source">
      <div class="scan-node"><mdi-web /><strong>HTTP request</strong><code>request.args</code></div>
      <div class="scan-track"><i /><span class="scan-value flight">input</span><span class="scan-lens"><mdi-magnify /></span></div>
      <div class="scan-node tone-build"><mdi-cog-outline /><strong>File or command</strong><span class="scene-note">Uses request data</span></div>
    </div>
    <div v-click="1" class="scan-path local-path tone-publish">
      <div class="scan-node"><mdi-console-line /><strong>Environment value</strong><code>VIRTUALENV_PROMPT</code></div>
      <div class="scan-track"><i /><span class="scan-value flight">input</span><span class="scan-lens"><mdi-magnify /></span></div>
      <div class="scan-node tone-build"><mdi-file-code /><strong>Generated script</strong><code>Activate.ps1</code></div>
    </div>
    <div v-click="2" class="scan-path barrier-path tone-publish">
      <div class="scan-node"><mdi-console-line /><strong>Environment value</strong><code>VIRTUALENV_PROMPT</code></div>
      <div class="scan-track"><i /><span class="scan-value flight barrier-value">input</span><span class="scan-gate barrier-gate tone-dependency"><mdi-shield-check-outline /><small>quote()</small></span><span class="scan-gate barrier-edit tone-danger"><mdi-pencil-outline /><small>replace()</small></span></div>
      <div class="scan-node tone-build"><mdi-file-code /><strong>Generated script</strong><span class="scene-note">Edited after quoting</span></div>
    </div>
    <div v-click="1" class="scan-config"><a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/codeql/codeql-config.yml"><code>threat-models: local</code></a><span>Include arguments and environment variables.</span></div>
  </AnimationScene>
</template>

<style scoped>
.scanner-coverage { margin-top: 22px; }
.scan-heading { display: flex; align-items: center; justify-content: center; gap: 12px; font-size: 20px; color: var(--scene-muted); }
.scan-heading svg { font-size: 32px; }
.scan-path { display: grid; grid-template-columns: 300px 1fr 280px; align-items: center; gap: 22px; height: 104px; }
.scan-gate { position: absolute; top: -4px; width: 54px; height: 54px; border: 2px solid currentColor; border-radius: 50%; display: grid; place-items: center; background: var(--scene-paper); font-size: 28px; }
.scan-gate small { position: absolute; top: 56px; font-size: 13px; font-family: var(--slidev-code-font-family); }
.barrier-gate { left: calc(33% - 27px); }
.barrier-edit { left: calc(67% - 27px); }
.barrier-value { --safe: #16744a; --unsafe: #bd3456; }
.dark .barrier-value { --safe: #7cdaa5; --unsafe: #fb95ac; }
.scan-node { display: grid; grid-template-columns: 44px auto; justify-content: center; align-items: center; column-gap: 14px; row-gap: 6px; }
.scan-node > svg { grid-row: span 2; font-size: 38px; }
.scan-node > :not(svg) { justify-self: start; }
.scan-node > strong { font-size: 23px; }
.scan-node > code { font-size: 19px; }
.scan-track { position: relative; height: 50px; }
.scan-track > i { position: absolute; top: 24px; width: 100%; border-top: 3px solid currentColor; }
.scan-track > i::after { content: ''; position: absolute; right: 0; top: -7px; width: 11px; height: 11px; border-top: 3px solid currentColor; border-right: 3px solid currentColor; transform: rotate(45deg); }
.scan-lens { position: absolute; left: calc(50% - 27px); top: -2px; width: 54px; height: 54px; border: 2px solid currentColor; border-radius: 50%; display: grid; place-items: center; background: var(--scene-paper); font-size: 32px; }
.scan-value { position: absolute; top: -40px; left: 0; padding: 3px 8px; border: 1px solid currentColor; border-radius: 4px; background: var(--scene-paper); font-family: var(--slidev-code-font-family); font-size: 19px; }
.scan-config { display: flex; align-items: center; gap: 24px; border-top: 2px solid var(--scene-rule); padding-top: 14px; margin-top: 6px; font-size: 22px; }
.scan-config > span { font-size: 20px; }
.motion-active .scan-path:not(.local-path, .barrier-path) .scan-value, .motion-active.has-first-click .local-path .scan-value { animation: follow-input 3s ease-in-out both; }
.motion-active .scan-path:not(.local-path, .barrier-path) .scan-lens, .motion-active.has-first-click .local-path .scan-lens { animation: inspect-input 3s ease-in-out both; }
.motion-active.has-second-click .barrier-path .scan-value { animation: barrier-input 4s ease-in-out both; }
@keyframes barrier-input { 0% { left: 0; opacity: 0; } 12% { opacity: 1; color: inherit; } 30%, 40% { left: calc(33% - 34px); color: var(--safe); border-color: var(--safe); } 62%, 72% { left: calc(67% - 34px); color: var(--unsafe); border-color: var(--unsafe); } 90% { left: calc(100% - 68px); opacity: 1; color: var(--unsafe); } 100% { left: calc(100% - 68px); opacity: 0; } }
@keyframes follow-input { 0% { left: 0; opacity: 0; } 15% { opacity: 1; } 45%, 60% { left: calc(50% - 34px); opacity: 1; } 85% { left: calc(100% - 68px); opacity: 1; } 100% { left: calc(100% - 68px); opacity: 0; } }
@keyframes inspect-input { 0%, 30%, 85%, 100% { box-shadow: 0 0 0 0 transparent; } 45%, 60% { box-shadow: 0 0 0 9px color-mix(in srgb, currentColor 20%, transparent); } }
</style>
