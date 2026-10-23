<script setup lang="ts">
const props = withDefaults(defineProps<{ from?: number; to?: number; heading?: string; credits?: boolean }>(), {
  from: 0,
  to: 6,
  heading: 'Six activation advisories · publication dates',
  credits: false,
})

const cases = [
  { date: 'Sep 18', shell: 'bash + fish', issue: 'Paths became commands', advisory: 'GHSA-p58f-9548-mpm2' },
  { date: 'Sep 18', shell: 'Windows batch', issue: 'Prompt became commands', advisory: 'GHSA-x78j-v8h9-3j2q' },
  { date: 'Oct 1', shell: 'Templates', issue: 'Rewrote quoted text', advisory: 'GHSA-8rjx-v5ww-45pp' },
  { date: 'Oct 1', shell: 'fish', issue: 'Wrong quoting rules', advisory: 'GHSA-c947-3pg5-gm8q' },
  { date: 'Oct 2', shell: 'zsh', issue: 'Prompt interpreted again', advisory: 'GHSA-5vjq-rrrf-7h2q' },
  { date: 'Oct 12', shell: 'bash', issue: 'Prompt interpreted again', advisory: 'GHSA-vxj4-q4g9-crj7' },
].slice(0, props.to)
</script>

<template>
  <AnimationScene class="activation-history" aria-label="A 2024 activation quoting fix was followed by six published advisories in September and October 2026, covering different shells, template replacement, and prompt evaluation.">
    <a class="first-fix" href="https://github.com/advisories/GHSA-rqc4-2hc7-8c8v"><mdi-shield-check class="tone-dependency" /><strong class="tone-dependency">2024</strong><span>CVE-2024-53899: activation template quoting</span></a>
    <div class="later-cases">
      <div class="history-heading"><strong class="tone-danger">2026</strong><span>{{ heading }}</span></div>
      <div class="case-grid">
        <a v-for="(item, index) in cases" :key="item.advisory" :href="`https://github.com/pypa/virtualenv/security/advisories/${item.advisory}`" class="activation-case" :class="{ earlier: index < from }" :style="{ '--case': index - from }"><span class="case-date tone-build">{{ item.date }}</span><strong :class="index > 3 ? 'tone-publish' : 'tone-source'">{{ item.shell }}</strong><span>{{ item.issue }}</span></a>
      </div>
    </div>
    <div v-if="credits" class="reporter-credits"><div><span class="tone-build">Both</span><a href="https://github.com/Kwstubbs">Kevin Stubbings</a><span>GitHub Security Lab</span></div></div>
  </AnimationScene>
</template>

<style scoped>
.activation-history { margin-top: 28px; }
.first-fix { display: flex; align-items: center; gap: 18px; font-size: 22px; }
.first-fix svg { font-size: 42px; }
.history-heading { display: flex; align-items: baseline; gap: 20px; margin: 26px 0 16px; font-size: 21px; }
.history-heading span { font-size: 18px; color: var(--scene-muted); }
.case-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px 40px; }
.activation-case { display: grid; grid-template-columns: 80px 1fr; align-items: baseline; gap: 7px 12px; border-left: 3px solid var(--scene-rule); padding-left: 14px; }
.case-date { font-size: 24px; }
.activation-case strong { font-size: 27px; }
.activation-case > span:not(.case-date) { grid-column: 2; font-size: 24px; }
.reporter-credits { display: flex; gap: 12px; align-items: baseline; margin-top: 30px; font-size: 21px; }
.reporter-credits > div { display: flex; flex-wrap: wrap; gap: 5px 12px; align-items: baseline; }
.reporter-credits > div > span:last-child:not(:first-child) { color: var(--scene-muted); }
.activation-case.earlier { opacity: .45; }
.motion-active .activation-case:not(.earlier) { animation: case-arrives .6s ease-out both; animation-delay: calc(.3s + var(--case) * .35s); }
@keyframes case-arrives { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: none; } }
</style>
