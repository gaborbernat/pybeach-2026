<script setup lang="ts">
const props = defineProps<{ section: 'dependencies' | 'build' | 'source' | 'publish' | 'inventory' | 'install' }>()

const guides = {
  dependencies: {
    columns: ['Check', 'Setting', 'Where'],
    rows: [
      ['Downloads', 'Verify each download\'s digest before use', '<a href="https://github.com/pypa/virtualenv/security/advisories/GHSA-94p9-xgh2-xp45">CVE-2026-102930</a>'],
      ['Requirements file', '<code>==</code> and a <code>--hash</code> per file; <code>--require-hashes</code>', '<a href="https://pip.pypa.io/en/stable/topics/secure-installs/">hash-checking mode</a>'],
      ['pylock.toml', '<code>nab lock pyproject.toml</code>; pip 26.1+ installs it (experimental)', '<a href="https://peps.python.org/pep-0751/">PEP 751</a>'],
      ['Reviewed hashes', 'Keep the reviewed hash with the inputs; when verification fails, find out why', 'Replacing the hash makes the check a suggestion'],
      ['Release tools', 'Their own lock, with hashes', '<a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/tasks/release-requirements.txt">release-requirements.txt</a>'],
    ],
  },
  build: {
    columns: ['Check', 'Setting', 'Where'],
    rows: [
      ['Workflow token', '<code>permissions: {}</code> at the top; grant per job', '<a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/workflows/release.yaml">release.yaml</a>'],
      ['Checkout credential', '<code>persist-credentials: false</code>', 'actions/checkout'],
      ['Actions', 'Pin to a reviewed commit; review what the Action downloads', '<a href="https://github.com/aquasecurity/trivy/security/advisories/GHSA-69fq-xp46-6x23#trivy-action-tag-hijacking">trivy-action tags</a>'],
      ['Shared cache', '<code>enable-cache: false</code> on release; <code>uv --no-cache</code>, <code>pip --no-cache-dir</code> are local only', '<a href="https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching">cache scopes</a>'],
      ['Egress', '<code>egress-policy: block</code> plus an allowlist', '<a href="https://github.com/step-security/harden-runner">harden-runner</a>'],
      ['Coding agents', 'No release credential in code-generation jobs; workflow edits get human review', '<a href="https://genai.owasp.org/llmrisk/llm01-prompt-injection/">OWASP</a>'],
      ['Lint', '<code>zizmor .github/workflows</code>', '<a href="https://docs.zizmor.sh/audits/">zizmor audits</a>'],
    ],
  },
  source: {
    columns: ['Check', 'Tool', 'Limit'],
    rows: [
      ['Risky calls', '<code>ruff check --select S</code>; S506 flags <code>yaml.load</code> without a safe loader', 'Sees the call, not where the input came from'],
      ['Input to sink', 'CodeQL with <code>threat-models: local</code>: arguments and environment variables count as input', 'Models <code>quote()</code> as a barrier; wrong quoting rules pass'],
      ['Regression examples', 'Keep inputs that must be flagged and inputs that must pass', 'A quieter scanner may just miss more'],
      ['Fuzzing', 'Vary the prompt; the property is "no extra command runs"', 'Current PowerShell target checks escaped text; batch test proposed'],
      ['Every shell, every pass', 'bash, fish, zsh, batch, PowerShell; assignment and display', 'The zsh and bash display bugs passed assignment checks'],
      ['Scope', 'A virtual environment separates packages, not permissions', 'Your files, environment variables, network'],
    ],
  },
  publish: {
    columns: ['Check', 'Setting', 'Where'],
    rows: [
      ['Upload authority', 'Trusted Publishing; revoke old tokens; release environment with required reviewers', '<a href="https://docs.pypi.org/trusted-publishers/security-model/">PyPI</a> · <a href="https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments">environments</a>'],
      ['Maintainer accounts', 'Passkey on GitHub, security key on PyPI, recovery codes in the password manager', '<a href="https://pypi.org/help/#twofa">PyPI 2FA</a>'],
      ['Install the verifier', '<code>uv tool install pypi-attestations==0.0.30</code>', '<a href="https://github.com/pypi/pypi-attestations">pypi-attestations</a>; pip installs it too'],
      ['Verify a file', '<code>pypi-attestations verify pypi --repository https://github.com/pypa/virtualenv virtualenv-21.14.6-py3-none-any.whl</code>', 'Neither installer checks attestations during install'],
      ['Choose first', 'Name the expected publisher before reading the attestation; keep the result with the digest', 'One file per result'],
      ['Where it lives', 'PyPI provenance details and Integrity API; GitHub <code>gh attestation verify</code>; <code>virtualenv.pyz.intoto.jsonl</code> beside the zipapp', '<a href="https://docs.pypi.org/attestations/consuming-attestations/">consuming attestations</a>'],
      ['Immutable release', 'Tags and assets cannot be replaced; a new bad release still can be published', '<a href="https://docs.github.com/en/code-security/concepts/supply-chain-security/immutable-releases">GitHub immutable releases</a>'],
    ],
  },
  inventory: {
    columns: ['Check', 'uv', 'pip'],
    rows: [
      ['Where in the wheel', '<code>.dist-info/sboms/</code> per PEP 770; CycloneDX with an SPDX rendering', '<a href="https://peps.python.org/pep-0770/">PEP 770</a>'],
      ['Component identity', '<code>pkg:pypi/pip@26.2.1</code>; pip vendors requests, urllib3, rich, packaging', 'Nesting belongs in the inventory too'],
      ['Separate artifacts', 'The zipapp locks filelock 3.19.1 for 3.9 and 4.0.9 for 3.10+', 'Each archive gets its own inventory'],
      ['Validate', 'Structure, relationships, and licenses on every build; zipapp files and hashes against the archive', 'Signing an incomplete inventory does not complete it'],
      ['Rebuild', 'Record commit, Python, tools, <code>SOURCE_DATE_EPOCH</code>', '<a href="https://virtualenv.pypa.io/en/latest/reference/release-artifacts.html">release artifacts</a>'],
      ['Environment SBOM', '<code>uv tool run --from cyclonedx-bom cyclonedx-py environment .venv/bin/python -o sbom.json</code>', '<code>.sbom-tools/bin/cyclonedx-py environment .venv/bin/python -o sbom.json</code>'],
      ['Keep it', 'Store the inventory with the digest and the deployment record', 'Today’s SBOM describes today'],
      ['Malware ran', 'Contain the systems, preserve evidence, revoke and replace exposed credentials', '<a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/INCIDENT_RESPONSE.md">incident response</a>'],
    ],
  },
  install: {
    columns: ['Check', 'uv', 'pip 26.1+'],
    rows: [
      ['Cooldown', '<code>[tool.uv] exclude-newer = "1 week"</code>; <code>uv lock --upgrade</code>; <code>uv sync --locked</code>', '<code>pip lock -r requirements.in --uploaded-prior-to P7D</code>; <code>pip install --require-hashes -r pylock.toml</code>'],
      ['Urgent fix', '<code>exclude-newer-package = { idna = "P0D" }</code>; <code>uv lock --upgrade-package idna</code>', '<code>P0D</code> re-resolves everything; constrain other pins; review the diff'],
      ['Advisories', '<code>uv export --locked --format pylock.toml -o pylock.toml</code>; <code>uvx pip-audit@2.10.1 --locked .</code>', '<code>.audit-tools/bin/python -m pip_audit --locked .</code>; scan the lock, not the tool environment'],
      ['Production install', '<code>uv pip install --require-hashes --only-binary=:all: -r requirements.txt</code>', '<code>python -m pip install --require-hashes --only-binary=:all: -r requirements.txt</code>'],
      ['Index', 'Route private packages to an explicit index', 'One controlled index; <code>extra-index-url</code> does not prefer it'],
      ['Deploy', 'Deploy the tested wheel; record its digest with the inventory', 'A rebuild at deploy time is another file to check'],
    ],
  },
} as const

const guide = guides[props.section]
</script>

<template>
  <div class="field-guide" :class="`guide-${section}`">
    <div class="guide-head"><span v-for="column in guide.columns" :key="column">{{ column }}</span></div>
    <div v-for="row in guide.rows" :key="row[0]" class="guide-row">
      <strong>{{ row[0] }}</strong>
      <span v-html="row[1]" />
      <span v-html="row[2]" />
    </div>
  </div>
</template>

<style scoped>
.field-guide { display: grid; grid-template-columns: 165px 1.15fr 1fr; gap: 8px 18px; margin-top: 12px; font-size: 17px; line-height: 1.28; }
.guide-head { display: contents; }
.guide-head span { font-size: 13px; letter-spacing: 0.08em; text-transform: uppercase; color: #526071; padding-bottom: 4px; border-bottom: 1px solid #bec9d7; }
.dark .guide-head span { color: #adb8c8; border-color: #59687c; }
.guide-row { display: contents; }
.guide-row strong { font-weight: 650; }
.guide-row span :deep(code) { font-size: 14.5px; }
.guide-row span :deep(a) { text-decoration: underline; text-decoration-color: #bec9d7; }
.guide-install, .guide-publish { grid-template-columns: 140px 1.1fr 1fr; }
</style>
