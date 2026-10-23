<template>
  <AnimationScene class="sbom-generation">
    <div class="sbom-environment tone-source"><mdi-folder-cog-outline /><strong>.venv</strong><div class="sbom-packages"><mdi-package-variant-closed /><mdi-package-variant-closed /><mdi-package-variant-closed /></div><span class="scene-note">Installed package metadata</span></div>
    <div class="sbom-transfer tone-source"><mdi-arrow-right /><span class="metadata-flight"><mdi-file-document-outline /></span></div>
    <div class="sbom-tool tone-build"><mdi-magnify-scan /><strong>CycloneDX</strong><span class="scene-note">Inspect the target environment</span></div>
    <div class="sbom-transfer tone-install"><mdi-arrow-right /><span class="inventory-flight"><mdi-format-list-bulleted /></span></div>
    <div class="sbom-output tone-install"><mdi-file-code-outline /><strong>sbom.json</strong><span class="scene-note">Names · versions · dependencies</span></div>
  </AnimationScene>
</template>

<style scoped>
.sbom-generation { display: grid; grid-template-columns: 1fr 60px 1fr 60px 1fr; gap: 10px; align-items: center; margin: 20px 0 22px; }
.sbom-environment, .sbom-tool, .sbom-output { display: flex; flex-direction: column; align-items: center; gap: 8px; position: relative; }
.sbom-generation strong { font-size: 24px; }
.sbom-environment > svg, .sbom-tool > svg, .sbom-output > svg { font-size: 62px; }
.sbom-packages { position: absolute; display: flex; top: 35px; left: calc(50% - 30px); background: var(--scene-paper); font-size: 20px; }
.sbom-transfer { position: relative; height: 65px; }
.sbom-transfer > svg { position: absolute; top: 25px; width: 60px; height: 30px; }
.sbom-transfer span { position: absolute; left: 18px; top: 0; font-size: 25px; }
.motion-active .metadata-flight { animation: sbom-transfer 3.6s ease-in-out both; }
.motion-active .inventory-flight { animation: sbom-transfer 3.6s 1s ease-in-out both; }
.motion-active .sbom-tool > svg { animation: sbom-scan 3.6s ease-in-out both; }
@keyframes sbom-transfer { 0%, 15% { transform: translateX(-20px); opacity: .3; } 65%, 100% { transform: translateX(20px); opacity: 1; } }
@keyframes sbom-scan { 0%, 100% { transform: translateY(0); } 35% { transform: translateY(5px); } 65% { transform: translateY(-5px); } }
</style>
