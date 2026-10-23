<template>
  <AnimationScene class="advisory-lookup" aria-label="Illustrative advisory lookup: package name and version are compared with published vulnerability reports. No match means no known advisory; malware was not assessed. Findings need an owner, an assessment, and a recorded decision.">
    <div class="audit-lookup">
      <svg class="lookup-wires" viewBox="0 0 960 235" aria-hidden="true"><path d="M 230 95 H 320 M 620 95 H 685" /><circle class="lookup-query flight tone-source" r="7" /><circle class="lookup-answer flight tone-dependency" r="7" /></svg>
      <div class="audit-package tone-source"><mdi-package-variant-closed /><strong>Package + version</strong><code>example-lib 1.2.3</code><small>Illustrative package</small></div>
      <div class="advisory-catalog tone-publish"><div class="catalog-heading"><mdi-database-search /><strong>Published advisories</strong></div><div class="catalog-rows"><span><i /><i /></span><span><i /><i /></span><span><i /><i /></span><b class="catalog-scan" /></div><small>Match package and affected version</small></div>
      <div class="audit-result"><mdi-file-document-check-outline class="tone-dependency" /><strong class="tone-dependency">No matching advisory</strong><div class="malware-unknown tone-danger"><mdi-help-circle-outline /><span>Malware not assessed</span></div></div>
    </div>
    <div v-click="1" class="finding-response"><strong>When an advisory matches</strong><div class="response-steps"><div><mdi-account-check-outline class="tone-source" /><span>Assign an owner</span></div><div><mdi-magnify-scan class="tone-build" /><span>Assess affected functionality</span></div><div><mdi-file-document-edit-outline class="tone-publish" /><span>Record the decision</span></div></div></div>
    <div v-click="1" class="metadata-warning"><mdi-alert-outline class="tone-build" /><span>Resolving source-distribution metadata can run a build backend.</span></div>
  </AnimationScene>
</template>

<style scoped>
.advisory-lookup { margin-top: 30px; }
.audit-lookup { position: relative; width: 960px; height: 235px; }
.lookup-wires { position: absolute; inset: 0; width: 100%; height: 235px; }
.lookup-wires path { fill: none; stroke: var(--scene-rule); stroke-width: 3; }
.lookup-wires circle { fill: currentColor; }
.lookup-query { offset-path: path('M 230 95 H 320'); }
.lookup-answer { offset-path: path('M 620 95 H 685'); }
.audit-package, .audit-result { position: absolute; display: flex; flex-direction: column; align-items: center; gap: 12px; text-align: center; }
.audit-package { left: 0; top: 30px; width: 235px; }
.audit-package > svg { font-size: 74px; }
.audit-package strong, .audit-result strong { font-size: 23px; }
.audit-package code { font-size: 19px; }
.audit-package small, .advisory-catalog small { font-size: 14px; color: var(--scene-muted); }
.advisory-catalog { position: absolute; top: 18px; left: 320px; width: 300px; }
.catalog-heading { display: flex; align-items: center; gap: 10px; }
.catalog-heading > svg { font-size: 40px; }
.catalog-heading strong { font-size: 22px; }
.catalog-rows { position: relative; margin: 12px 15px; display: grid; gap: 9px; padding: 12px; border-block: 2px solid currentColor; }
.catalog-rows > span { display: grid; grid-template-columns: 1.4fr 1fr; gap: 18px; }
.catalog-rows i { height: 8px; background: currentColor; opacity: .35; border-radius: 3px; }
.catalog-rows > span:nth-child(2) i:first-child { width: 80%; }
.catalog-rows > span:nth-child(3) i:last-child { width: 60%; }
.catalog-scan { position: absolute; inset: 0 0 auto; height: 20px; background: currentColor; opacity: 0; }
.advisory-catalog small { display: block; text-align: center; }
.audit-result { top: 15px; left: 685px; width: 275px; }
.audit-result > svg { font-size: 82px; }
.malware-unknown { display: flex; align-items: center; gap: 8px; margin-top: 2px; font-size: 18px; }
.malware-unknown > svg { font-size: 28px; }
.finding-response { border-top: 2px solid var(--scene-rule); padding-top: 19px; margin-top: 10px; }
.finding-response > strong { font-size: 21px; }
.response-steps { display: grid; grid-template-columns: 1fr 1.35fr 1fr; gap: 22px; margin-top: 20px; }
.response-steps > div { display: flex; align-items: center; gap: 11px; font-size: 19px; }
.response-steps svg { flex-shrink: 0; font-size: 36px; }
.metadata-warning { display: flex; align-items: center; gap: 12px; margin-top: 28px; color: var(--scene-muted); font-size: 18px; }
.metadata-warning > svg { font-size: 27px; }
.motion-active .lookup-query { animation: advisory-query 4.8s linear both; }
.motion-active .catalog-scan { animation: advisory-scan 4.8s linear both; }
.motion-active .lookup-answer { animation: advisory-answer 4.8s linear both; }
.motion-active .audit-result { animation: advisory-report 4.8s ease-out both; }
@keyframes advisory-query { 0%, 5%, 30%, 100% { opacity: 0; offset-distance: 0%; } 10% { opacity: 1; offset-distance: 0%; } 27% { opacity: 1; offset-distance: 100%; } }
@keyframes advisory-scan { 0%, 27%, 65%, 100% { opacity: 0; transform: none; } 30% { opacity: .18; transform: none; } 60% { opacity: .18; transform: translateY(50px); } }
@keyframes advisory-answer { 0%, 60%, 82%, 100% { opacity: 0; offset-distance: 0%; } 63% { opacity: 1; offset-distance: 0%; } 80% { opacity: 1; offset-distance: 100%; } }
@keyframes advisory-report { 0%, 72% { opacity: .2; transform: translateY(4px); } 85%, 100% { opacity: 1; transform: none; } }
</style>
