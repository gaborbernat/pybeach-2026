<template>
  <AnimationScene v-slot="{ clicks }" class="account-protection">
    <div class="account-flow">
      <div class="account-node tone-source"><mdi-account-key /><strong>Maintainer account</strong><span>Can change the workflow</span></div>
      <div class="account-link tone-danger"><mdi-arrow-right /><mdi-pencil class="account-change" /></div>
      <div class="account-node tone-build"><mdi-file-code-outline /><strong>release.yaml</strong><span>Runs with release authority</span></div>
      <div class="account-link tone-publish"><mdi-arrow-right /><mdi-package-variant-closed class="account-release" /></div>
      <div class="account-node tone-publish"><mdi-cloud-upload /><strong>PyPI release</strong><span>Trusted Publishing</span></div>
    </div>
    <div class="account-explanation">Trusted Publishing still relies on the registered workflow.</div>
    <div v-click="1" class="account-safeguards">
      <div><mdi-shield-key class="tone-dependency" /><a href="https://docs.github.com/en/authentication/authenticating-with-a-passkey/about-passkeys">GitHub passkey</a></div>
      <div><mdi-usb-flash-drive class="tone-publish" /><a href="https://pypi.org/help/#twofa">PyPI security key</a></div>
      <div><mdi-safe-square-outline class="tone-build" /><a href="https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/configuring-two-factor-authentication-recovery-methods">Recovery codes<br>in your password manager</a></div>
    </div>
    <div v-if="clicks >= 1" class="account-note scene-note">Protect the accounts that control the release.</div>
  </AnimationScene>
</template>

<style scoped>
.account-protection { margin-top: 50px; }
.account-flow { display: grid; grid-template-columns: 1fr 70px 1fr 70px 1fr; align-items: center; gap: 10px; }
.account-node { display: flex; flex-direction: column; align-items: center; gap: 14px; text-align: center; }
.account-node > svg { font-size: 70px; }
.account-node strong { font-size: 24px; }
.account-node span { font-size: 18px; color: var(--scene-muted); }
.account-link { position: relative; height: 80px; }
.account-link > svg:first-child { position: absolute; top: 32px; width: 70px; height: 32px; }
.account-change, .account-release { position: absolute; top: 0; left: 20px; font-size: 30px; }
.account-explanation { text-align: center; margin-top: 42px; font-size: 24px; }
.account-safeguards { display: flex; justify-content: space-between; gap: 24px; margin-top: 42px; }
.account-safeguards > div { display: flex; align-items: center; gap: 10px; font-size: 20px; }
.account-safeguards svg { font-size: 38px; flex-shrink: 0; }
.account-note { text-align: center; margin-top: 20px; }
.motion-active .account-change { animation: account-travel 3.8s ease-in-out both; }
.motion-active .account-release { animation: account-travel 3.8s 1s ease-in-out both; }
.motion-active.has-first-click .account-safeguards svg { animation: account-shield 3s ease-in-out both; }
@keyframes account-travel { 0%, 15% { transform: translateX(-25px); opacity: .35; } 65%, 100% { transform: translateX(25px); opacity: 1; } }
@keyframes account-shield { 0%, 100% { transform: scale(1); } 35% { transform: scale(1.16); } }
</style>
