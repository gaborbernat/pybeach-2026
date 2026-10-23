<script setup lang="ts">
defineProps<{ mode: 'wheel' | 'zipapp' | 'validate' }>()
</script>

<template>
  <AnimationScene class="archive-inventory" :class="mode">
    <template v-if="mode === 'wheel'">
      <div class="wheel-contents">
        <div class="outer-wheel tone-install"><ArtifactParcel /><a href="https://pypi.org/project/virtualenv/21.14.6/">virtualenv 21.14.6</a><span class="scene-note">Wheel</span></div>
        <div class="unpack-arrow tone-build"><span>bundles</span><mdi-arrow-right /></div>
        <div class="bundled-wheels">
          <div class="bundle tone-build" style="--bundle: 0"><mdi-package-variant /><strong>pip</strong><small>26.0.1 / 26.2.1</small></div>
          <div class="bundle tone-build" style="--bundle: 1"><mdi-package-variant /><strong>setuptools</strong><small>82.0.1 / 84.0.0</small></div>
        </div>
        <div class="vendor-arrows tone-publish"><div><span>vendors</span><mdi-arrow-right /></div><div><span>vendors</span><mdi-arrow-right /></div></div>
        <div class="vendored-libraries tone-publish"><div class="vendor-group"><a href="https://pypi.org/project/requests/">requests</a><a href="https://pypi.org/project/urllib3/">urllib3</a><a href="https://pypi.org/project/rich/">rich</a><a href="https://pypi.org/project/packaging/">packaging</a><small>Selected libraries inside pip</small></div><div class="vendor-group"><a href="https://pypi.org/project/jaraco.text/">jaraco.text</a><a href="https://pypi.org/project/more-itertools/">more-itertools</a><a href="https://pypi.org/project/packaging/">packaging</a><a href="https://pypi.org/project/wheel/">wheel</a><small>Selected libraries inside setuptools</small></div></div>
      </div>
      <div v-click="1" class="wheel-evidence">
        <div class="component-identity"><a href="https://github.com/package-url/purl-spec">Component identity</a><code>pkg:pypi/pip@26.2.1</code></div>
        <div class="sbom-location tone-install"><a href="https://peps.python.org/pep-0770/">PEP 770: inventory inside the wheel</a><code>.dist-info/sboms/</code><span class="inventory-formats"><a href="https://cyclonedx.org/">CycloneDX</a> · <a href="https://spdx.dev/">SPDX</a></span></div>
      </div>
    </template>
    <template v-else-if="mode === 'zipapp'">
      <div class="zipapp-contents">
        <div class="zipapp-heading tone-publish"><mdi-zip-box /><a href="https://virtualenv.pypa.io/en/latest/reference/release-artifacts.html#sboms">Standalone zipapp</a><span class="scene-note">virtualenv +<br>runtime dependencies</span></div>
        <div class="unpack-arrow tone-source"><span>bundles</span><mdi-arrow-right /></div>
        <div class="zipapp-selection">
          <a class="zipapp-lock tone-source" href="https://github.com/pypa/virtualenv/blob/bf09c7eb/pylock.zipapp.toml">pylock.zipapp.toml</a>
          <div class="python-branches"><div class="tone-build"><span>Python 3.9</span><mdi-arrow-down /><code>filelock 3.19.1</code></div><div class="tone-dependency"><span>Python 3.10+</span><mdi-arrow-down /><code>filelock 4.0.9</code></div></div>
        </div>
      </div>
      <div v-click="1" class="zipapp-evidence"><div class="zipapp-digest"><span>filelock 4.0.9 wheel SHA-256</span><code>9287fd61b99a806e5202be29a83034c0808a1b9830e820537c2f5773981f7eeb</code></div><div class="zipapp-caption tone-publish">Different contents. Separate inventory.</div></div>
    </template>
    <template v-else>
      <div class="validation-source tone-build"><ArtifactParcel /><strong>Archive files</strong><code>pip-26.2.1-py3-none-any.whl</code><span class="scene-note">Bundled in virtualenv</span></div>
      <div class="inventory-reconciliation"><div v-for="(entry, index) in [{ label: 'Identity + version', value: 'pkg:pypi/pip@26.2.1' }, { label: 'Relationship + coverage', value: 'bundled in virtualenv' }, { label: 'Licenses + file hashes', value: 'zipapp hashes ↔ archive files' }]" :key="entry.label" class="inventory-entry" :style="{ '--entry': index }"><div v-click="1" class="match-line tone-dependency"><i /><mdi-check-circle-outline /></div><div><strong>{{ entry.label }}</strong><code>{{ entry.value }}</code></div></div></div>
    </template>
  </AnimationScene>
</template>

<style scoped>
.archive-inventory { margin-top: 22px; }
.wheel-contents { display: grid; grid-template-columns: 200px 65px 215px 70px 1fr; align-items: center; gap: 10px; min-height: 235px; }
.outer-wheel { display: flex; flex-direction: column; align-items: center; gap: 10px; font-size: 24px; }
.outer-wheel .artifact-parcel { width: 125px; height: 114px; }
.unpack-arrow { display: flex; align-items: center; flex-direction: column; gap: 9px; font-size: 18px; }
.unpack-arrow > svg { font-size: 55px; }
.bundled-wheels { display: grid; grid-template-rows: 105px 105px; gap: 20px; align-items: center; }
.bundle { display: grid; grid-template-columns: 35px 1fr; gap: 7px; font-size: 25px; }
.bundle > svg { font-size: 32px; }
.bundle small { grid-column: 2; font-size: 19px; }
.vendored-libraries, .vendor-arrows { display: grid; grid-template-rows: 105px 105px; gap: 20px; align-items: center; }
.vendor-arrows > div { display: flex; flex-direction: column; align-items: center; font-size: 15px; gap: 8px; }
.vendor-arrows svg { font-size: 35px; }
.vendor-group { display: flex; flex-wrap: wrap; gap: 8px; align-content: center; border-left: 2px solid currentColor; padding-left: 14px; }
.vendor-group a { padding: 4px 8px; background: var(--scene-paper); font-size: 18px; border-radius: 4px; }
.vendor-group small { width: 100%; margin-top: 3px; color: var(--scene-muted); font-size: 14px; }
.inventory-formats { font-size: 19px; }
.wheel-evidence { display: grid; grid-template-columns: 1fr 1fr; gap: 35px; margin-top: 28px; padding-top: 22px; border-top: 2px solid var(--scene-rule); }
.wheel-evidence > div { display: flex; flex-direction: column; gap: 13px; font-size: 22px; }
.wheel-evidence code { font-size: 22px; }
.zipapp-contents { display: grid; grid-template-columns: 245px 90px 1fr; gap: 25px; align-items: center; min-height: 235px; }
.zipapp-heading { display: flex; align-items: center; flex-direction: column; gap: 12px; font-size: 26px; text-align: center; }
.zipapp-heading > svg { font-size: 82px; }
.zipapp-heading .scene-note { font-size: 21px; line-height: 1.4; }
.zipapp-selection { min-width: 0; }
.zipapp-lock { display: block; font-size: 25px; text-align: center; margin-bottom: 22px; border-bottom: 2px solid var(--scene-rule); padding-bottom: 14px; }
.python-branches { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }
.python-branches > div { display: flex; align-items: center; flex-direction: column; gap: 13px; font-size: 23px; }
.python-branches svg { font-size: 30px; }
.python-branches code { font-size: 22px; }
.zipapp-evidence { margin-top: 28px; padding-top: 22px; border-top: 2px solid var(--scene-rule); }
.zipapp-digest span, .zipapp-digest code { display: block; }
.zipapp-digest span { font-size: 20px; color: var(--scene-muted); }
.zipapp-digest code { margin-top: 10px; font-size: 20px; }
.zipapp-caption { margin-top: 18px; font-size: 25px; }
.validate { display: grid; grid-template-columns: 360px 1fr; gap: 25px; height: 285px; }
.validation-source { display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 13px; }
.validation-source .artifact-parcel { width: 115px; height: 105px; }
.validation-source strong { font-size: 24px; }
.validation-source code { font-size: 20px; }
.inventory-reconciliation { display: flex; flex-direction: column; justify-content: space-around; }
.inventory-entry { display: grid; grid-template-columns: 160px 1fr; gap: 20px; align-items: center; }
.inventory-entry strong { display: block; font-size: 21px; margin-bottom: 10px; }
.inventory-entry code { font-size: 17px; }
.match-line { display: flex; align-items: center; gap: 12px; }
.match-line i { flex: 1; border-top: 3px solid currentColor; transform-origin: left; }
.match-line svg { font-size: 30px; }
.motion-active .bundle > svg { animation: wheel-unpacks 1.3s ease-out both; animation-delay: calc(var(--bundle) * .2s); }
.motion-active .vendored-libraries > div { animation: vendor-unpacks 1.5s ease-out both; }
.motion-active .python-branches > div > svg { animation: zipapp-unpacks 1.3s ease-out both; }
.motion-active .python-branches > div:nth-child(2) > svg { animation-delay: .3s; }
.motion-active.has-first-click .match-line i { animation: inventory-link .7s ease-out both; animation-delay: calc(var(--entry) * .5s); }
.motion-active.has-first-click .match-line svg { animation: inventory-check .35s ease-out both; animation-delay: calc(.6s + var(--entry) * .5s); }
@keyframes wheel-unpacks { 0%, 20% { opacity: 0; transform: translateX(-45px) scale(.6); } 100% { opacity: 1; transform: none; } }
@keyframes vendor-unpacks { 0%, 50% { opacity: 0; transform: translateY(-20px) scale(.75); } 100% { opacity: 1; transform: none; } }
@keyframes zipapp-unpacks { from { opacity: 0; transform: translateY(-15px); } to { opacity: 1; transform: none; } }
@keyframes inventory-link { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes inventory-check { from { opacity: 0; transform: scale(.2); } to { opacity: 1; transform: none; } }
</style>
