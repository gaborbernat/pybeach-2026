<template>
  <AnimationScene v-slot="{ clicks }" class="wheel-fingerprint" aria-label="A wheel is a ZIP archive. The version remains 21.14.6 while a one-character ZIP comment is added. Does its digest remain the same?">
    <div class="fingerprint-archive" :class="{ edited: clicks >= 1 }">
      <div class="archive-heading tone-dependency"><ArtifactParcel /><div><a href="https://packaging.python.org/en/latest/specifications/binary-distribution-format/">Installable package archive</a><code>virtualenv-21.14.6-py3-none-any.whl</code><strong>version: 21.14.6</strong></div></div>
      <div class="archive-contents"><div><mdi-file-code-outline /><code>virtualenv/</code></div><div><mdi-file-document-outline /><code>METADATA + RECORD</code></div><div v-click="1" class="zip-comment once tone-danger"><mdi-pencil /><code>ZIP comment: <b>x</b></code><span>+1 character</span></div></div>
      <div class="fingerprint-scan flight" />
    </div>
    <div class="digest-result tone-build"><mdi-fingerprint /><div><span>Original SHA-256 · fingerprint of the file’s bytes</span><code class="fit-value">eb1a20c5878569b69667f6a1af03458a8512b3afa7be771a2dafe92fdca05bb9</code></div></div>
    <div v-click="1" class="digest-question">Same version. <strong class="tone-danger">Will the install pass?</strong></div>
  </AnimationScene>
</template>

<style scoped>
.wheel-fingerprint { margin-top: 24px; }
.fingerprint-archive { position: relative; border: 2px solid var(--scene-rule); border-radius: 6px; overflow: hidden; }
.archive-heading { display: flex; align-items: center; gap: 24px; padding: 16px 24px; }
.archive-heading .artifact-parcel { width: 84px; height: 77px; }
.archive-heading > div { display: flex; flex-direction: column; gap: 8px; }
.archive-heading a { font-size: 20px; color: var(--scene-muted); }
.archive-heading code { font-size: 25px; }
.archive-heading strong { font-size: 21px; }
.archive-contents { display: flex; align-items: center; justify-content: space-around; padding: 18px 12px; border-top: 1px dashed var(--scene-rule); background: var(--scene-paper); font-size: 17px; }
.archive-contents > div { display: flex; align-items: center; gap: 8px; }
.archive-contents svg { font-size: 27px; }
.zip-comment { flex-wrap: wrap; max-width: 235px; }
.zip-comment > span { width: 100%; font-size: 15px; text-align: center; }
.zip-comment b { display: inline-block; border: 2px solid currentColor; padding: 0 6px; }
.fingerprint-scan { position: absolute; top: 0; bottom: 0; width: 5px; background: #2165b1; box-shadow: 0 0 18px #89bfff; }
.digest-result { display: flex; align-items: center; gap: 18px; margin-top: 24px; }
.digest-result > svg { font-size: 56px; }
.digest-result > div { min-width: 0; display: flex; flex-direction: column; gap: 6px; }
.digest-result span { font-size: 20px; }
.digest-result code { font-size: 22px; }
.digest-question { margin-top: 24px; text-align: center; font-size: 30px; }
.motion-active .fingerprint-scan { animation: fingerprint-scan 1.4s ease-in-out both; }
.motion-active .edited .zip-comment b { animation: comment-arrives .65s ease-out both; }
@keyframes fingerprint-scan { 0% { left: 0; opacity: 0; } 12%, 88% { opacity: 1; } 100% { left: 100%; opacity: 0; } }
@keyframes comment-arrives { from { transform: translateY(-45px) rotate(-20deg); opacity: 0; } to { transform: none; opacity: 1; } }
</style>
