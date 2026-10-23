<template>
  <AnimationScene loop class="cover-journey" role="img" aria-label="A package moves from source through verification to deployment.">
    <div class="teaser-track"><i /></div>
    <div class="teaser-package tone-build"><ArtifactParcel /><mdi-file-certificate-outline class="teaser-evidence tone-install" /></div>
    <div class="teaser-stops"><mdi-code-braces class="tone-source" /><mdi-shield-check class="teaser-check tone-dependency" /><mdi-server-outline class="tone-install" /></div>
  </AnimationScene>
</template>

<style scoped>
.cover-journey { position: relative; width: 200px; height: 88px; }
.teaser-track { position: absolute; left: 16px; right: 16px; top: 51px; height: 2px; background: var(--scene-rule); }
.teaser-track > i { display: block; height: 100%; background: currentColor; transform-origin: left; }
.teaser-package { position: absolute; left: 161px; top: 4px; }
.teaser-package > .artifact-parcel { width: 39px; height: 36px; }
.teaser-evidence { position: absolute; right: -3px; bottom: -3px; font-size: 19px; background: var(--scene-paper); border-radius: 3px; }
.teaser-stops { display: flex; justify-content: space-between; position: absolute; left: 3px; right: 3px; top: 61px; font-size: 27px; }
.motion-active .teaser-package { animation: cover-delivery 5.6s ease-in-out both; }
.motion-active .teaser-track > i { animation: cover-progress 5.6s ease-in-out both; }
.motion-active .teaser-check { animation: cover-verify 5.6s ease-in-out both; }
.motion-active .teaser-evidence { animation: cover-evidence 5.6s ease-out both; }
@keyframes cover-delivery { 0%, 12% { left: 0; } 38%, 58% { left: 81px; } 84%, 100% { left: 161px; } }
@keyframes cover-progress { 0%, 12% { transform: scaleX(0); } 38%, 58% { transform: scaleX(.5); } 84%, 100% { transform: scaleX(1); } }
@keyframes cover-verify { 0%, 38%, 70%, 100% { transform: none; } 50% { transform: scale(1.23); } }
@keyframes cover-evidence { 0%, 48% { opacity: 0; transform: scale(.5); } 60%, 100% { opacity: 1; transform: none; } }
</style>
