<template>
  <AnimationScene class="ruff-check" aria-label="Ruff reads Python source, flags unsafe YAML loading with rule S506, and suggests safe_load. It does not execute the program.">
    <div class="ruff-flow">
      <div class="ruff-node tone-source"><mdi-language-python /><strong>Python source</strong><code>yaml.load(text,<br>&nbsp; Loader=yaml.Loader)</code><span class="scan-line" /></div>
      <mdi-arrow-right v-click="1" class="tone-source" />
      <div v-click="1" class="ruff-node tone-danger"><mdi-file-alert-outline /><a href="https://docs.astral.sh/ruff/rules/unsafe-yaml-load/"><strong>S506</strong></a><span>Unsafe YAML loader</span></div>
      <mdi-arrow-right v-click="2" class="tone-dependency" />
      <div v-click="2" class="ruff-node tone-dependency"><mdi-shield-check /><strong>Use a safe loader</strong><code>yaml.safe_load(text)</code></div>
    </div>
    <div class="ruff-command"><mdi-magnify class="tone-source" /><code>ruff check --select S506 example.py</code></div>
    <div v-click="2" class="scene-note">For untrusted YAML, restrict which objects the loader can construct.</div>
  </AnimationScene>
</template>

<style scoped>
.ruff-check { margin-top: 34px; }
.ruff-flow { display: grid; grid-template-columns: 290px 45px 250px 45px 300px; gap: 7px; align-items: center; height: 220px; }
.ruff-flow > svg { font-size: 37px; }
.ruff-node { position: relative; display: flex; flex-direction: column; align-items: center; gap: 14px; text-align: center; }
.ruff-node > svg { font-size: 62px; }
.ruff-node strong { font-size: 25px; }
.ruff-node span { font-size: 21px; }
.ruff-node code { font-size: 19px; line-height: 1.6; }
.scan-line { position: absolute; top: 114px; left: 10px; width: 270px; height: 3px; background: currentColor; opacity: 0; }
.ruff-command { display: flex; justify-content: center; align-items: center; gap: 15px; margin-top: 24px; font-size: 23px; }
.ruff-command > svg { font-size: 32px; }
.ruff-check > .scene-note { margin-top: 22px; text-align: center; font-size: 20px; }
.motion-active .scan-line { animation: ruff-scan 4s ease-in-out both; }
.motion-active.has-first-click .ruff-node.tone-danger > svg { animation: ruff-finding 4s ease-out both; }
@keyframes ruff-scan { 0%, 8%, 70%, 100% { opacity: 0; transform: none; } 15% { opacity: .7; transform: none; } 60% { opacity: .7; transform: translateY(65px); } }
@keyframes ruff-finding { 0%, 65%, 100% { transform: none; } 75% { transform: scale(1.15); } }
</style>
