<template>
  <AnimationScene class="prompt-evaluation" aria-label="Since 21.13.0, display escaping required BASH_VERSION, so zsh received the raw environment name. oh-my-zsh enables PROMPT_SUBST, which evaluates PS1 each time the prompt is displayed. Version 21.14.4 extended display escaping to zsh.">
    <div class="prompt-setting"><mdi-console class="tone-source" /><span><a href="https://github.com/ohmyzsh/ohmyzsh/blob/4d4cfc287e9d887b81242c0e431b5f49f9cec5c1/lib/theme-and-appearance.zsh#L5">oh-my-zsh</a> enables <a href="https://zsh.sourceforge.io/Doc/Release/Options.html#Prompting"><code>PROMPT_SUBST</code></a></span></div>
    <div class="prompt-flow">
      <div class="prompt-node tone-source"><mdi-shield-check-outline /><strong>Display escaping</strong><code>BASH_VERSION</code><span>Required since 21.13.0</span></div>
      <div class="prompt-arrow tone-source"><mdi-arrow-right /><i class="flight" /></div>
      <div class="prompt-node tone-danger"><mdi-file-code-outline /><strong>zsh skips escaping</strong><code>PS1</code><span>Receives the raw name</span></div>
      <div v-click="1" class="prompt-arrow tone-danger"><mdi-arrow-right /><i class="flight" /></div>
      <div v-click="1" class="prompt-node tone-danger"><mdi-console-line /><strong>Display the prompt</strong><span>Evaluate the prompt text</span><div class="prompt-draws"><code v-for="n in 3" :key="n" :style="{ '--n': n - 1 }">(<b>$(cmd)</b>) ~ %</code><small><mdi-autorenew /> Every prompt</small></div></div>
    </div>
    <div v-click="1" class="second-pass"><mdi-alert-circle-outline class="tone-danger" /><div><strong>21.14.4: escape the name under zsh too</strong><span>Test how each shell displays the prompt.</span></div></div>
    <div v-click="1" class="scene-note">Mechanism illustration · no shell code runs</div>
  </AnimationScene>
</template>

<style scoped>
.prompt-evaluation { margin-top: 16px; }
.prompt-setting { display: flex; align-items: center; justify-content: center; gap: 16px; font-size: 24px; }
.prompt-setting svg { font-size: 34px; }
.prompt-flow { display: grid; grid-template-columns: 1fr 90px 1fr 90px 1fr; align-items: start; margin-top: 20px; }
.prompt-node { display: flex; flex-direction: column; align-items: center; gap: 13px; text-align: center; }
.prompt-node > svg { font-size: 62px; }
.prompt-node strong { font-size: 23px; }
.prompt-node > span { color: var(--scene-muted); font-size: 18px; }
.prompt-node code { font-size: 22px; }
.prompt-arrow { position: relative; margin-top: 45px; }
.prompt-arrow > svg { font-size: 60px; }
.prompt-arrow i { position: absolute; left: 0; top: -5px; width: 10px; height: 10px; border-radius: 50%; background: currentColor; }
.prompt-draws { display: flex; flex-direction: column; align-items: flex-start; gap: 3px; }
.prompt-draws code { font-size: 15px; }
.prompt-draws code b { font-weight: 600; padding: 0 3px; border-radius: 3px; }
.prompt-draws small { display: flex; align-items: center; gap: 6px; margin-top: 4px; font-size: 15px; }
.prompt-draws small svg { font-size: 20px; }
.second-pass { display: flex; align-items: center; justify-content: center; gap: 18px; margin-top: 12px; }
.second-pass > svg { font-size: 40px; }
.second-pass strong, .second-pass span { display: block; }
.second-pass strong { font-size: 25px; }
.second-pass span { margin-top: 10px; font-size: 19px; }
.prompt-evaluation > .scene-note { text-align: center; margin-top: 8px; font-size: 14px; }
.motion-active .prompt-arrow .flight { animation: prompt-value 3s linear both; }
.motion-active.has-first-click .prompt-draws code { animation: prompt-drawn .4s ease-out both; animation-delay: calc(1.2s + var(--n) * .8s); }
.motion-active.has-first-click .prompt-draws code b { animation: prompt-expands .4s ease-out both; animation-delay: calc(1.4s + var(--n) * .8s); }
.motion-active.has-first-click .prompt-draws small svg { animation: prompt-again 2.6s ease-in-out both; animation-delay: 1.2s; }
@keyframes prompt-value { 0%, 100% { opacity: 0; transform: none; } 10% { opacity: 1; transform: none; } 75% { opacity: 1; transform: translateX(55px); } }
@keyframes prompt-again { 0%, 30% { transform: none; } 100% { transform: rotate(360deg); } }
@keyframes prompt-drawn { from { opacity: .15; } to { opacity: 1; } }
@keyframes prompt-expands { from { background: transparent; } to { background: color-mix(in srgb, currentColor 22%, transparent); } }
</style>
