<template>
  <AnimationScene class="fuzz-security" aria-label="Proposed Windows batch security test: a fuzzer varies a prompt, generates an activation script, and a harness would activate it in an isolated test environment. Any extra shell command should fail the test. The current virtualenv target checks escaping only.">
    <div class="fuzz-flow">
      <div class="fuzz-inputs tone-source"><mdi-test-tube /><strong>Vary the prompt</strong><code>team's env</code><code>café</code><code>project_42</code><small>Illustrative inputs</small></div>
      <div class="fuzz-arrow tone-source"><mdi-arrow-right /><i class="flight" /></div>
      <div class="fuzz-script tone-publish"><mdi-file-code-outline /><strong>Generate script</strong><code>activate.bat</code></div>
      <div v-click="1" class="fuzz-arrow tone-publish"><mdi-arrow-right /><i class="flight" /></div>
      <div v-click="1" class="fuzz-run tone-build"><mdi-console-line /><strong>Activate in isolation</strong><span>Disposable test machine</span><small>No credentials · outbound network blocked</small></div>
    </div>
    <div v-click="1" class="security-property"><mdi-shield-check class="tone-dependency" /><strong>Changing the prompt must not add a shell command.</strong></div>
    <div v-click="2" class="fuzz-failure"><mdi-alert-circle-outline class="tone-danger" /><span>Extra command?</span><mdi-arrow-right /><strong class="tone-danger">Fail the test</strong><mdi-arrow-right /><span>Keep the input as a regression case</span></div>
    <div v-click="1" class="fuzz-limit scene-note">Proposed batch test; the existing PowerShell target checks escaping without running a shell.</div>
  </AnimationScene>
</template>

<style scoped>
.fuzz-security { margin-top: 25px; }
.fuzz-flow { display: grid; grid-template-columns: 250px 65px 220px 65px 330px; align-items: center; gap: 8px; height: 240px; }
.fuzz-inputs, .fuzz-script, .fuzz-run { display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
.fuzz-flow strong { font-size: 24px; }
.fuzz-flow code { font-size: 20px; }
.fuzz-flow small { font-size: 14px; color: var(--scene-muted); }
.fuzz-flow span { font-size: 19px; color: var(--scene-muted); }
.fuzz-flow > div > svg { font-size: 48px; }
.fuzz-inputs { gap: 6px; }
.fuzz-inputs > code { min-width: 180px; }
.fuzz-arrow { position: relative; }
.fuzz-arrow > svg { font-size: 42px !important; }
.fuzz-arrow > i { position: absolute; left: 0; top: -16px; width: 12px; height: 12px; background: currentColor; border-radius: 50%; }
.security-property { display: flex; align-items: center; justify-content: center; gap: 16px; margin-top: 15px; font-size: 23px; }
.security-property > svg { font-size: 38px; }
.fuzz-failure { display: flex; align-items: center; justify-content: center; gap: 12px; margin-top: 23px; font-size: 19px; }
.fuzz-failure > svg { font-size: 28px; flex-shrink: 0; }
.fuzz-limit { margin-top: 22px; text-align: center; font-size: 15px !important; }
.motion-active .fuzz-inputs > code { animation: vary-prompt 4.5s ease-in-out both; }
.motion-active .fuzz-inputs > code:nth-of-type(2) { animation-delay: .5s; }
.motion-active .fuzz-inputs > code:nth-of-type(3) { animation-delay: 1s; }
.motion-active .fuzz-arrow .flight { animation: prompt-travels 4.5s linear both; }
.motion-active.has-first-click .fuzz-arrow.tone-publish .flight { animation-delay: 1.5s; }
@keyframes vary-prompt { 0%, 10%, 50%, 100% { transform: none; } 20%, 35% { transform: translateX(8px); } }
@keyframes prompt-travels { 0%, 8%, 50%, 100% { opacity: 0; transform: none; } 12% { opacity: 1; transform: none; } 45% { opacity: 1; transform: translateX(50px); } }
</style>
