<script setup lang="ts">
import { computed, type Component } from 'vue'
import MdiArrowRight from '~icons/mdi/arrow-right'
import MdiAlarmLightOutline from '~icons/mdi/alarm-light-outline'
import MdiApplicationCogOutline from '~icons/mdi/application-cog-outline'
import MdiClipboardListOutline from '~icons/mdi/clipboard-list-outline'
import MdiCloudUpload from '~icons/mdi/cloud-upload'
import MdiCodeBraces from '~icons/mdi/code-braces'
import MdiFileCertificateOutline from '~icons/mdi/file-certificate-outline'
import MdiFileCodeOutline from '~icons/mdi/file-code-outline'
import MdiFormatText from '~icons/mdi/format-text'
import MdiFunctionVariant from '~icons/mdi/function-variant'
import MdiHammerWrench from '~icons/mdi/hammer-wrench'
import MdiKeyVariant from '~icons/mdi/key-variant'
import MdiMagnify from '~icons/mdi/magnify'
import MdiPackageVariant from '~icons/mdi/package-variant'
import MdiPackageVariantClosed from '~icons/mdi/package-variant-closed'

type Stage = 'source' | 'dependencies' | 'build' | 'publish' | 'respond' | 'install'

const { stage } = defineProps<{ stage: Stage }>()
const stages = ['Source', 'Dependencies', 'Build', 'Publish', 'Install', 'Respond']
const sections: Record<Stage, { from: [Component, string, string, string], to: [Component, string, string, string], carried: Component[], caption?: string, current: string[] }> = {
  source: { from: [MdiCodeBraces, 'tone-source', 'Caller input', 'Text, paths, configuration'], to: [MdiFunctionVariant, 'tone-publish', 'Program behavior', 'Keep data from becoming code'], carried: [MdiFormatText], caption: 'What can caller-controlled input change?', current: ['Source'] },
  dependencies: { from: [MdiPackageVariant, 'tone-dependency', 'Other people’s code', 'Build tools, seed wheels'], to: [MdiHammerWrench, 'tone-build', 'Our build', 'Runs and ships what it pulls in'], carried: [MdiPackageVariantClosed], caption: 'Which bytes did we receive?', current: ['Dependencies'] },
  build: { from: [MdiHammerWrench, 'tone-build', 'Release jobs', 'Tools, caches, credentials'], to: [MdiPackageVariantClosed, 'tone-publish', 'Release files', 'Wheel, sdist, zipapp'], carried: [MdiFileCodeOutline, MdiKeyVariant], caption: 'What can each release job reach?', current: ['Build'] },
  publish: { from: [MdiPackageVariantClosed, 'tone-source', 'Release file', 'Wheel + retained evidence'], to: [MdiCloudUpload, 'tone-publish', 'Package index', 'Publish evidence with the file'], carried: [MdiPackageVariantClosed, MdiFileCertificateOutline], caption: 'Who published it? What is inside? Can we verify it?', current: ['Publish'] },
  respond: { from: [MdiAlarmLightOutline, 'tone-danger', 'Advisory', 'Names a component and version'], to: [MdiClipboardListOutline, 'tone-install', 'What we shipped', 'Inventory + artifact digest'], carried: [MdiMagnify], caption: 'Is the affected component inside what we shipped?', current: ['Respond'] },
  install: { from: [MdiPackageVariantClosed, 'tone-source', 'Release file', 'Wheel + retained evidence'], to: [MdiApplicationCogOutline, 'tone-install', 'Application environment', 'Choose, install, deploy'], carried: [MdiPackageVariantClosed, MdiFileCertificateOutline], current: ['Install'] },
}
const section = computed(() => sections[stage])
</script>

<template>
  <AnimationScene class="talk-section" :class="{ 'install-section': stage === 'install' }">
    <div class="stage-map">
      <div class="stage-node" :class="section.from[1]"><component :is="section.from[0]" class="stage-icon" /><strong>{{ section.from[2] }}</strong><span>{{ section.from[3] }}</span></div>
      <div class="stage-transfer tone-publish"><MdiArrowRight class="transfer-arrow" /><component :is="icon" v-for="(icon, index) in section.carried" :key="index" class="carried" /></div>
      <div class="stage-node" :class="section.to[1]"><component :is="section.to[0]" class="stage-icon" /><strong>{{ section.to[2] }}</strong><span>{{ section.to[3] }}</span></div>
    </div>
    <div v-if="section.caption" class="stage-caption">{{ section.caption }}</div>
    <DependencyReview v-else v-click="1" />
    <div class="stage-progress"><template v-for="(name, index) in stages" :key="name"><mdi-chevron-right v-if="index" /><span :class="{ current: section.current.includes(name) }">{{ name }}</span></template></div>
  </AnimationScene>
</template>

<style scoped>
.talk-section { margin-top: 45px; }
.install-section { margin-top: 26px; }
.install-section .stage-node > .stage-icon { font-size: 70px; }
.install-section .stage-node { gap: 10px; }
.install-section .stage-progress { margin-top: 28px; }
.stage-map { display: grid; grid-template-columns: 1fr 170px 1fr; gap: 25px; align-items: center; }
.stage-node { display: flex; align-items: center; flex-direction: column; gap: 18px; }
.stage-node > .stage-icon { display: block; width: 1em; height: 1em; font-size: 95px; }
.stage-node strong { font-size: 27px; }
.stage-node span { font-size: 23px; }
.stage-transfer { position: relative; height: 100px; }
.stage-transfer > .transfer-arrow { position: absolute; left: 22px; top: 24px; width: 130px; height: 55px; }
.stage-transfer > .carried { position: absolute; top: 0; width: 1em; height: 1em; font-size: 35px; }
.stage-transfer > .carried:nth-child(2) { left: 52px; }
.stage-transfer > .carried:nth-child(3) { left: 90px; font-size: 29px; }
.stage-caption { text-align: center; margin-top: 48px; font-size: 27px; }
.stage-progress { display: flex; align-items: center; justify-content: center; gap: 14px; margin-top: 55px; font-size: 18px; color: var(--scene-muted); }
.stage-progress .current { color: var(--scene-ink); border-bottom: 3px solid currentColor; padding-bottom: 7px; }
.motion-active .stage-transfer > .carried { animation: stage-evidence 2.5s ease-in-out both; }
@keyframes stage-evidence { 0%, 100% { transform: none; } 55% { transform: translateX(25px); } }
</style>
