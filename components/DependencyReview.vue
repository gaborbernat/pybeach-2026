<template>
  <div class="dependency-review">
    <div class="dependency-check tone-source"><mdi-package-variant-remove /><strong>Do we need it?</strong><span>Check the standard library first.</span></div>
    <mdi-chevron-right class="review-arrow tone-source" />
    <div class="dependency-check tone-build"><mdi-source-commit /><strong>Who maintains it?</strong><span>Read fixes and release history.</span></div>
    <mdi-chevron-right class="review-arrow tone-build" />
    <div class="dependency-check tone-install"><mdi-shield-account /><strong>How do we report a flaw?</strong><a href="https://github.com/pypa/virtualenv/security/policy">virtualenv’s security policy</a></div>
  </div>
</template>

<style scoped>
.dependency-review { display: grid; grid-template-columns: 1fr 25px 1fr 25px 1fr; gap: 12px; margin-top: 35px; align-items: center; }
.dependency-check { display: flex; flex-direction: column; align-items: center; gap: 10px; text-align: center; }
.dependency-check > svg { font-size: 40px; }
.dependency-check strong { font-size: 22px; }
.dependency-check span, .dependency-check a { font-size: 18px; color: var(--scene-muted); }
.review-arrow { font-size: 28px; }
.motion-active.has-first-click .dependency-check > svg { animation: review-focus 3.8s ease-in-out both; }
.motion-active.has-first-click .dependency-check:nth-of-type(2) > svg { animation-delay: .7s; }
.motion-active.has-first-click .dependency-check:nth-of-type(3) > svg { animation-delay: 1.4s; }
@keyframes review-focus { 0%, 100% { transform: scale(1); } 35% { transform: scale(1.2); } }
</style>
