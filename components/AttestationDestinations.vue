<template>
  <AnimationScene class="attestation-destinations">
    <div class="destination-row tone-publish"><mdi-language-python /><div><strong><a href="https://pypi.org/project/virtualenv/21.14.6/#files">PyPI · each wheel / sdist</a></strong><span>Publish attestation uploaded with the distribution</span><code>pypa/gh-action-pypi-publish</code></div><mdi-arrow-right /><a class="destination-access" href="https://docs.pypi.org/attestations/consuming-attestations/">File details → Provenance<br><small>Retrieve through PyPI’s Integrity API</small></a></div>
    <div v-click="1" class="destination-row tone-source"><mdi-github /><div><strong><a href="https://github.com/pypa/virtualenv/attestations">GitHub · repository attestations</a></strong><span>Signed build provenance and SBOM statements</span><code>actions/attest</code></div><mdi-arrow-right /><div class="destination-access">Look up by artifact digest<br><code>gh attestation verify</code></div></div>
    <div v-click="1" class="destination-row tone-build"><mdi-file-download-outline /><div><strong><a href="https://github.com/pypa/virtualenv/releases/tag/21.14.6">GitHub release · downloadable bundle</a></strong><span>Zipapp provenance alongside the zipapp</span><code>virtualenv.pyz.intoto.jsonl</code></div><mdi-arrow-right /><div class="destination-access"><code>virtualenv.pyz</code><br><span>Matched by its SHA-256 digest</span></div></div>
    <div v-click="1" class="destination-rule scene-note">You can host a signed bundle beside your artifact. Verify its signature, identity, and digest.</div>
  </AnimationScene>
</template>

<style scoped>
.attestation-destinations { margin-top: 18px; }
.destination-row { display: grid; grid-template-columns: 47px 490px 34px 1fr; gap: 14px; align-items: center; padding: 10px 0; border-bottom: 1px solid var(--scene-rule); }
.destination-row > svg { font-size: 36px; }
.destination-row strong { display: block; font-size: 23px; }
.destination-row span { display: block; font-size: 18px; margin-top: 6px; }
.destination-row code { display: inline-block; font-size: 17px; margin-top: 6px; }
.destination-access { font-size: 19px; line-height: 1.6; }
.destination-access small { font-size: 15px; }
.destination-access span { font-size: 16px; }
.destination-rule { margin-top: 16px; text-align: center; }
.motion-active .destination-row:first-child > svg:nth-of-type(2), .motion-active.has-first-click .destination-row:not(:first-child) > svg:nth-of-type(2) { animation: destination-arrow 1.8s ease-in-out both; }
@keyframes destination-arrow { 0%, 100% { transform: none; } 45% { transform: translateX(6px); } }
</style>
