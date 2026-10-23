---
theme: default
favicon: /favicon.png
title: 'Securing Your Python Supply Chain: From Dependencies to Deployment'
author: 'Bernát Gábor'
info: |
  Follow a Python package from its source to deployment, using the 2026 Trivy/LiteLLM
  and Elementary incidents and the release security work in virtualenv. PyBeach, October 24, 2026.
titleTemplate: '%s'
canvasWidth: 1080
aspectRatio: 16/9
colorSchema: auto
routerMode: hash
download: false
exportFilename: pybeach-2026
export:
  withToc: true
selectable: true
drawings:
  enabled: false
transition: slide-left
duration: 25min
timer: countdown
wakeLock: true
---

<div class="cover-layout pt-8">
<div>

<h1 class="cover-title" highlight>Securing Your Python Supply Chain</h1>

<div class="text-3xl pt-5 opacity-85">From Dependencies to Deployment</div>

<div class="text-2xl pt-4 tone-danger">Nine things I discovered in my own project</div>

<div class="text-xl pt-10"><a href="https://bernat.tech/">Bernát Gábor</a> · <a href="https://2026.pybeach.org/" class="inline-flex items-center gap-1 align-middle">PyBeach <BaseImg src="pybeach-logo.svg" alt="" class="inline-block w-6 h-6" /></a> · October 24, 2026</div>

<div class="text-lg pt-3 opacity-75"><a href="https://bernat.tech/">bernat.tech</a> · <a href="https://github.com/gaborbernat">github.com/gaborbernat</a></div>

</div>
<div>
<div class="cover-symbols">
<BaseImg src="pybeach-logo.svg" class="w-28 h-28" alt="" />
<CoverJourney />
</div>
<div class="cover-qr">
<a href="https://gaborbernat.github.io/pybeach-2026/" aria-label="Open the slides">
<QRCode class="!pt-0" data="https://gaborbernat.github.io/pybeach-2026/" :size="150" />
</a>
<span><a href="https://gaborbernat.github.io/pybeach-2026/">Slides</a></span>
</div>
</div>
</div>

<!--
[00:00–00:21]

You add a security scanner to your release pipeline. Which credentials can that scanner read? In March, a compromised security tool helped turn widely used Python packages into credential stealers. I discovered nine problems in my own project. This talk is those nine, and what each one would have cost.
-->

---

# <logos-python class="" /> Bernát Gábor

<div class="grid grid-cols-[180px_1fr] gap-10 items-center pt-8">
<div>
<BaseImg src="me.webp" class="rounded-full w-44 h-44" alt="Bernát Gábor" />
<Credit license="CC BY 4.0">Bernát Gábor</Credit>
</div>
<div class="text-2xl leading-relaxed">

<logos-python /> <a href="https://www.pypa.io/">PyPA</a> / <a href="https://github.com/tox-dev">tox-dev</a> maintainer

<div class="project-links">
<a class="tone-source" href="https://github.com/pypa/virtualenv" target="_blank" rel="noopener noreferrer">virtualenv</a>
<span aria-hidden="true">·</span>
<a class="tone-dependency" href="https://github.com/tox-dev/tox" target="_blank" rel="noopener noreferrer">tox</a>
<span aria-hidden="true">·</span>
<a class="tone-build" href="https://github.com/pypa/pipx" target="_blank" rel="noopener noreferrer">pipx</a>
<span aria-hidden="true">·</span>
<a class="tone-publish" href="https://github.com/tox-dev/platformdirs" target="_blank" rel="noopener noreferrer">platformdirs</a>
<span aria-hidden="true">·</span>
<a class="tone-install" href="https://github.com/tox-dev/filelock" target="_blank" rel="noopener noreferrer">filelock</a>
</div>

<div class="pt-5 text-xl"><mdi-briefcase class="tone-source" /> <a href="https://bloomberg.github.io/">Bloomberg</a>, Developer Experience</div>

</div>
</div>

<!--
[00:21–00:39]

I'm Bernát. I work on developer experience at Bloomberg and maintain virtualenv, tox, pipx, and a few other packaging tools. virtualenv creates Python environments. It gets about a hundred million downloads a month, which is why the nine things matter to more people than me.
-->

---
clicks: 2
---

# <mdi-shield-alert class="tone-danger" /> Your <span class="tone-source">security scanner</span> was <span class="tone-danger">compromised</span>

<div class="text-xl opacity-80 pt-2"><a href="https://blog.pypi.org/posts/2026-04-02-incident-report-litellm-telnyx-supply-chain-attack/">LiteLLM · CircleCI · all steps shared one environment</a> · March 2026</div>

<CompromiseChain />

<div class="refs-bar">
<a href="https://blog.pypi.org/posts/2026-04-02-incident-report-litellm-telnyx-supply-chain-attack/">PSF / PyPI: LiteLLM and Telnyx incident report, April 2, 2026</a>
<a href="https://docs.litellm.ai/blog/security-townhall-updates">LiteLLM maintainers: unpinned Trivy and static secrets in CircleCI</a>
<a href="https://docs.litellm.ai/blog/security-incident-oct-21-2026">LiteLLM: release v1.107.0 compromised, October 21, 2026</a>
</div>

<!--
[00:39–01:27]

Hands up if your CI runs a security scanner. Keep them up if you know which secrets that job can read.

[Watch the hands drop. Give it three seconds.]

If your hand went down, this talk is for you.

[Click: Follow the credential to LiteLLM.]

LiteLLM ran on CircleCI; all steps shared one environment. Its maintainers reported an unpinned Trivy scanner that could read static release secrets, including the PyPI credential. Their account links that access to the malicious releases. The scanner was there to make the release safer. It had the keys to the release.

[Click: Follow the releases to users.]

Telnyx was hit in the same campaign. Both packages carried credential-stealing code to everyone who installed them. And before anyone relaxes: GitHub Actions steps in one job share a runner too. This is not a CircleCI story.

And on Wednesday, attackers compromised LiteLLM again, through a different door.
-->

---

# <mdi-timer-sand class="tone-danger" /> Downloads <span class="tone-danger">don't wait</span> for responders

<DownloadTally />

<div v-click="1" class="text-2xl pt-7 leading-relaxed"><a href="https://github.com/pypa/virtualenv/pull/3336">Our <span class="tone-build">virtualenv changelog job</span> also had <span class="tone-danger">release authority</span>.</a></div>
<FoundCounter v-click="1" :count="1" route="secret" />

<div class="refs-bar">
<a href="https://blog.pypi.org/posts/2026-04-02-incident-report-litellm-telnyx-supply-chain-attack/">PSF / PyPI: LiteLLM and Telnyx incident report, April 2, 2026</a>
<a href="https://github.com/aquasecurity/trivy/security/advisories/GHSA-69fq-xp46-6x23">Aqua Security: Trivy incident advisory</a>
</div>

<!--
[01:27–02:03]

LiteLLM normally saw roughly 1,700 downloads a minute. In March, the affected versions received over 119,000 downloads before quarantine, two hours and thirty-two minutes later. That's downloads, not compromised machines, but every one of them was a chance. Downloads kept coming the whole time people were responding.

You might be thinking, ‘I'd never make that mistake.’ Then I checked mine.

[Click: Reveal the changelog’s release authority. Pause for recognition.]

There it was, in changelog generation. The tools writing our release notes ran in a job with access to the release credential. Not a scanner, a Markdown generator, with the same reach. That's the first one; keep count.
-->

---

# <mdi-comment-alert class="tone-danger" /> A <span class="tone-source">PR comment</span> reached the <span class="tone-danger">release job</span>

<div class="text-xl opacity-80 pt-2"><a href="https://www.elementary-data.com/post/security-incident-report-malicious-release-of-elementary-oss-python-cli-v0-23-3">Elementary Data</a> · April 24, 2026</div>

<CommentInjection />

<div v-click="1" class="text-2xl pt-4"><a href="https://www.elementary-data.com/post/security-incident-report-malicious-release-of-elementary-oss-python-cli-v0-23-3">elementary-data 0.23.3</a> reached PyPI and a Docker image.</div>
<div v-click="1" class="text-xl pt-5">Comment jobs: no <code>actions: write</code>. Release environment: required reviewers.</div>

<div class="refs-bar">
<a href="https://www.elementary-data.com/post/security-incident-report-malicious-release-of-elementary-oss-python-cli-v0-23-3">Elementary maintainer report: incident April 24; report April 27, 2026</a>
</div>

<!--
[02:03–02:40]

Before we open mine, the other way in. In April, a PR comment on Elementary's repository became shell code inside a workflow. Not a dependency, not a stolen file: text, pasted into a script by the workflow itself. The attacker got the workflow's GitHub token and used it to dispatch the release workflow.

[Click: Reveal the affected release.]

A malicious CLI release reached PyPI and Docker, and stayed there for eleven and a half hours.

Two incidents, two routes: a secret that a tool could read, and a string that a workflow executed. Hold on to those two, because seven of my nine are one of them.
-->

---

# <mdi-map-marker-path class="tone-source" /> A Python package's <span class="tone-publish">lifecycle</span>

<ReleaseJourney />
<div class="grid grid-cols-2 gap-12 pt-5 text-2xl"><div><mdi-account-wrench class="tone-build" /> Maintainers build and publish releases.</div><div><mdi-laptop class="tone-install" /> Users install packages and their dependencies.</div></div>

<div class="refs-bar">
<a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/THREAT_MODEL.md">virtualenv threat model and assurance case</a>
</div>

<!--
[02:40–03:01]

Here's the map, so you know where we are. Source, dependencies, build, publish, install, respond. Maintainers own source through publish; the people installing own install; both own respond. The nine findings land on four of these stops. I'll go through the stops in this order, and close most of them with a field guide: the settings and commands on one slide, to read later.
-->

---

# <span class="tone-source">Source</span>

<div class="divider-number advisory-count"><strong class="tone-danger"><span class="count-old">6</span><span v-click="1" class="count-new">21</span> advisories</strong> in <span class="count-old">4</span><span v-click="1" class="count-new tone-danger">5</span> weeks</div>
<TalkSection stage="source" />

<!--
[03:01–03:18]

First stop is the code we ship, so I checked mine: the activation scripts, the files virtualenv writes for every environment, in six shell languages.

[Click: Strike the six; twenty-one slams in.]

That number didn't hold. Counting every virtualenv advisory published since September 17, it's twenty-one in five weeks.
-->

---

# <mdi-console-line class="tone-source" /> The <span class="tone-danger">activation bugs</span> kept coming

<QuoteJourney :to="2" heading="September 18: two advisories" />
<FoundCounter :count="3" route="string" />

<div class="refs-bar">
<a href="https://github.com/pypa/virtualenv/pull/2771">2024: quote activation template values</a><a href="https://github.com/pypa/virtualenv/security/advisories/GHSA-p58f-9548-mpm2">CVE-2026-102925: bash and fish paths</a><a href="https://github.com/pypa/virtualenv/security/advisories/GHSA-x78j-v8h9-3j2q">CVE-2026-102937: activate.bat prompt</a>
</div>

<!--
[03:18–03:55]

Creating an environment writes shell scripts containing its path and prompt. If either value becomes a command, activating runs it, with your permissions, on your machine. We fixed one quoting bug in 2024. In September, we fixed two more.

The bash and fish scripts quoted a value and then placed it inside a second pair of quotes, so a path with shell punctuation closed the string early and ran as code. The Windows batch activator didn't escape the prompt at all; a double quote in it was live cmd.exe syntax. Two and three, both mine: a value that should have stayed data and didn't.
-->

---

# <mdi-folder-lock-outline class="tone-source" /> A <span class="tone-source">virtual environment</span> is no sandbox

<div class="grid grid-cols-2 gap-10 pt-7">
<div>

<div class="text-2xl pt-8 leading-relaxed"><span class="tone-dependency">Separate package installations</span></div>

<pre class="linked-code environment-tree"><span class="tone-source">.venv/</span>
├── pyvenv.cfg
├── bin/
│   ├── python
│   └── activate
└── lib/python3.15/
    └── <strong class="tone-dependency">site-packages/</strong></pre>

</div>
<div v-click="1">

<div class="text-2xl pt-8 leading-relaxed"><span class="tone-danger">Same operating-system permissions</span></div>

<ul class="permission-list">
<li><mdi-file-document-multiple-outline class="tone-source" /><span>Your files</span></li>
<li><mdi-key-variant class="tone-build" /><span>Your environment variables</span></li>
<li><mdi-lan-connect class="tone-install" /><span>Your network access</span></li>
</ul>

</div>
</div>

<div class="refs-bar">
<a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/SECURITY.md#scope">virtualenv security scope: caller-supplied values and generated files</a>
</div>

<!--
[03:55–04:08]

Why does that matter? A virtual environment separates packages, not permissions.

[Click: Reveal the shared operating-system permissions.]

Code in it runs as you: your files, your environment variables, your network. Activating changes none of that.
-->

---

# <mdi-console-line class="tone-source" /> Then <span class="tone-danger">someone else</span> looked

<QuoteJourney :from="2" :to="4" heading="October 1: two reports from GitHub Security Lab" credits />
<FoundCounter :count="5" route="string" />

<div class="refs-bar">
<a href="https://github.com/pypa/virtualenv/security/advisories/GHSA-8rjx-v5ww-45pp">Template replacement rewrote quoted text</a><a href="https://github.com/pypa/virtualenv/security/advisories/GHSA-c947-3pg5-gm8q">fish quoting rules</a>
</div>

<!--
[04:08–04:44]

Two weeks later Kevin Stubbings from GitHub Security Lab reported two more. The template renderer replaced placeholders one at a time across the whole script, so a directory named after a placeholder got rewritten after it had already been quoted. The bug wasn't in quote; it was in what happened to quote's output. And fish reads a backslash inside single quotes differently from POSIX, so the quoting rules we'd borrowed from the shell library were the wrong rules for that shell. Four and five.

[Pause.]

I had CodeQL on this code, configured, with custom queries. We'll get to why it saw neither.
-->

---
clicks: 1
---

# <mdi-autorenew class="tone-publish" /> The escaping check <span class="tone-danger">skipped zsh</span>

<PromptEvaluation />
<FoundCounter :count="$clicks >= 1 ? 7 : 6" route="string" />

<div class="refs-bar"><a href="https://github.com/pypa/virtualenv/security/advisories/GHSA-5vjq-rrrf-7h2q">zsh PROMPT_SUBST · published October 2 · patched in 21.14.4</a><a href="https://github.com/pypa/virtualenv/security/advisories/GHSA-vxj4-q4g9-crj7">Another prompt-expansion bug in bash · published October 12 · patched in 21.14.7</a></div>

<!--
[04:44–05:28]

Six and seven are the same bug twice. Since 21.13.0 we escaped the environment name for prompt display, but only when BASH_VERSION was set. zsh got the raw value, and zsh users run the bash activate script.

[Click: Follow the value to prompt display; let the repeat icon turn.]

oh-my-zsh turns on PROMPT_SUBST, so zsh evaluates the prompt text every time it draws it. An environment name became a command, once per prompt, forever. Kaya Emre Arikan reported it; the fix went out October 2. On October 12 we published the bash version of the same thing: bash makes two passes over the prompt, and we'd escaped for one of them. Quoting the assignment was never the question. What the shell does with the value afterwards is, and every shell does something different.
-->

---
clicks: 2
---

# <mdi-source-branch class="tone-publish" /> <span class="tone-publish">CodeQL</span> follows input through the code

<ScannerCoverage />

<div class="refs-bar">
<a href="https://codeql.github.com/docs/codeql-language-guides/analyzing-data-flow-in-python/">CodeQL: data-flow analysis in Python</a>
<a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/codeql/codeql-config.yml">virtualenv: security-extended queries and local inputs</a>
</div>

<!--
[05:28–06:12]

So why didn't CodeQL catch the October bugs? It follows a value from an input to the operation that uses it, and we count arguments and environment variables as input, not just HTTP requests.

[Trace the request through the scanner. Click: reveal the environment value.]

[Click: The value turns safe at the quote gate, then a replacement edits it.]

Our query treats a call to quote as a barrier: tainted value goes in, safe value comes out. That catches a missing call. It can't tell that the quoting rules are wrong for fish, or that a later replacement edits the result. The scanner modelled what we believed about the code. The bugs were in what we believed. So keep examples that must be flagged and examples that must pass, and when a report surprises you, add it before you fix it.
-->

---
clicks: 2
---

# <mdi-magnify class="tone-source" /> <span class="tone-source">Ruff</span> flags risky code patterns

<RuffCheck />

<div class="text-lg pt-6"><strong>Install Ruff</strong></div>
<div class="tool-options text-base pt-2"><span><a href="https://docs.astral.sh/uv/">uv</a>: <code>uv tool install ruff</code></span><span><a href="https://pip.pypa.io/en/stable/">pip</a>: <code>python -m pip install ruff</code></span></div>

<div class="refs-bar">
<a href="https://docs.astral.sh/ruff/rules/unsafe-yaml-load/">Ruff S506: unsafe YAML loading</a>
<a href="https://docs.astral.sh/ruff/rules/#flake8-bandit-s">Ruff security rules</a>
</div>

<!--
[06:12–06:34]

The other scanner here is Ruff. It flags a risky call without running anything: a YAML loader that builds arbitrary Python objects.

[Click: Reveal S506.]

S506 catches it.

[Click: Reveal safe_load.]

safe_load fixes it. Ruff sees the call, never where the input came from. Cheap, fast, and for a different bug than ours.
-->

---
clicks: 2
---

# <mdi-test-tube class="tone-source" /> <span class="tone-source">Fuzzing</span> checks a security property

<FuzzSecurity />

<div class="refs-bar">
<a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/tasks/fuzz_powershell_quote.py">Current virtualenv fuzz target: escaping, without shell execution</a>
<a href="https://github.com/pypa/virtualenv/security/advisories/GHSA-x78j-v8h9-3j2q">CVE-2026-102937: --prompt injection in activate.bat</a>
</div>

<!--
[06:34–07:05]

The batch bug is the one a fuzzer finds: vary the prompt; the rule is no extra command runs.

[Click: Follow the script into an isolated test.]

That means a disposable machine with no credentials and no network, and drawing the prompt, because two of the nine only fired at display time.

[Click: Keep a failing input as a regression case.]

This test is proposed. Our PowerShell fuzzer checks escaped text without running a shell, which is why it's a row in the guide and not yet code in the repo.
-->

---

# <mdi-book-open-variant class="tone-build" /> Field guide: <span class="tone-build">Source</span>

<div class="guide-intro">What runs on virtualenv's source today, and what each check can and cannot see.</div>
<FieldGuide section="source" />

<div class="refs-bar"><a href="https://docs.astral.sh/ruff/rules/#flake8-bandit-s">Ruff security rules</a><a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/codeql/codeql-config.yml">virtualenv CodeQL config</a><a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/tasks/fuzz_powershell_quote.py">Current fuzz target</a></div>

<!--
[07:05–07:16]

The source field guide: Ruff, CodeQL, regression examples both ways, fuzzing, every shell at assignment and display. One line: the scanner models what you believe about the code. Keep the inputs that surprised you.
-->

---


# <span class="tone-dependency">Dependencies</span>

<TalkSection stage="dependencies" />

<!--
[07:16–07:21]

Next, the code we pull in, and how to know you received the bytes you reviewed.
-->

---
clicks: 1
---

# <mdi-fingerprint class="tone-dependency" /> Our <span class="tone-build">downloader</span> didn’t check <span class="tone-danger">hashes</span>

<div class="text-xl pt-2"><a href="https://github.com/pypa/virtualenv/security/advisories/GHSA-94p9-xgh2-xp45">CVE-2026-102930</a> · virtualenv · patched in 21.7.12</div>
<SeedWheelIntegrity />
<FoundCounter :count="8" />

<div class="refs-bar"><a href="https://github.com/pypa/virtualenv/security/advisories/GHSA-94p9-xgh2-xp45">Advisory: downloaded seed wheels and the custom-index exception</a><a href="https://github.com/pypa/virtualenv/pull/3251">virtualenv #3251: compare downloaded wheels with PyPI digests</a></div>

<!--
[07:21–08:01]

Then I checked mine: the downloader. virtualenv seeds every new environment with pip and setuptools wheels. The bundled copies ship inside virtualenv and are checked against hashes on every load. The downloaded updates weren't checked at all. Number eight.

An altered download could enter the cache and seed every environment created after it. A familiar filename says nothing about which bytes you received.

[Click: Put the digest check before seeding.]

The fix compares the download with PyPI's digest for that exact file, whichever index served it. It skips the comparison when a custom index is configured, because private indexes may legitimately serve rebuilt wheels, and that exception needs its own trust policy rather than a silent pass.
-->

---


# <mdi-file-document-outline class="tone-dependency" /> Pin versions <span class="tone-dependency">and hashes</span> in requirements.txt

<div class="pt-5">

```text
#
# This file is autogenerated by pip-compile with Python 3.15
# by the following command:
#
#    pip-compile --generate-hashes requirements.in
#
virtualenv==21.14.6 \
    --hash=sha256:c6b74616e64bffa9532cfa9dfd54ffbab0dc9b999df2bb8ec0d75e559b983661 \
    --hash=sha256:eb1a20c5878569b69667f6a1af03458a8512b3afa7be771a2dafe92fdca05bb9
    # via -r requirements.in
```

</div>
<div class="grid grid-cols-3 gap-8 pt-6 text-xl">
<div><mdi-pin class="tone-dependency" /> <code>==</code> pins the exact version.</div>
<div><mdi-fingerprint class="tone-dependency" /> <code>--hash</code>: one per file you accept, here the sdist and the wheel.</div>
<div><mdi-shield-check class="tone-dependency" /> <code>--require-hashes</code>: pip and uv refuse anything unlisted or unhashed.</div>
</div>

<div class="refs-bar">
<a href="https://pip-tools.readthedocs.io/en/latest/">pip-tools: pip-compile</a>
<a href="https://pip.pypa.io/en/stable/topics/secure-installs/">pip: hash-checking mode</a>
</div>

<!--
[08:01–08:26]

A requirements file can pin more than a version. Each entry names the exact version and the hash of every file you accept for it. Install with require-hashes and anything without a matching hash is refused, including dependencies you forgot to list.
-->

---


# <mdi-file-lock-outline class="tone-dependency" /> <span class="tone-dependency">pylock.toml</span>: the standard lock file

<div class="pt-4">

```toml
lock-version = "1.0"
created-by = "nab"
[[packages]]
name = "virtualenv"
version = "21.14.6"
[[packages.wheels]]
name = "virtualenv-21.14.6-py3-none-any.whl"
upload-time = 2026-10-08 14:49:54.988049+00:00
url = "https://files.pythonhosted.org/packages/c9/1f/…"
[packages.wheels.hashes]
sha256 = "eb1a20c5878569b6…"
```

</div>
<div class="grid grid-cols-3 gap-8 pt-4 text-lg">
<div><mdi-file-check-outline class="tone-dependency" /> Excerpt of real <code>nab lock</code> output.</div>
<div><mdi-cog-outline class="tone-dependency" /> <a href="https://nab.readthedocs.io/">nab</a> writes it; pip 26.1+ installs it (experimental).</div>
<div><mdi-package-variant-closed class="tone-dependency" /> uv projects keep <code>uv.lock</code> instead.</div>
</div>

<div class="refs-bar">
<a href="https://peps.python.org/pep-0751/">PEP 751: pylock.toml</a>
<a href="https://nab.readthedocs.io/en/stable/reference/lockfile.html">nab: the lock file</a>
<a href="https://pip.pypa.io/en/stable/cli/pip_lock/">pip lock</a>
</div>

<!--
[08:26–08:51]

pylock.toml is the standard version of the same idea: a TOML file that records, for every package, the version, where the file came from, and its hash. nab writes it with nab lock, and pip 26.1 can install it, though that support is still experimental. uv projects also keep uv.lock, uv's own lock file.
-->

---
clicks: 1
---

# <mdi-fingerprint class="tone-dependency" /> Same <span class="tone-dependency">version</span>. Different <span class="tone-danger">file</span>?

<WheelFingerprint />

<div class="refs-bar">
<a href="https://pip.pypa.io/en/stable/topics/secure-installs/">pip hash-checking mode</a>
<a href="https://docs.astral.sh/uv/pip/compatibility/#hash-checking-mode">uv hash-checking mode</a>
</div>

<!--
[08:51–09:18]

Let's see what a hash check catches. A wheel is a ZIP archive. PyPI won't let anyone overwrite an uploaded filename, so we'll change a local copy, the way a mirror, a proxy, or that cache could.

[Click: Reveal the question.]

We kept the original file's hash in our requirements. I'll keep the version number, keep the filename, and add a one-character ZIP comment. Will the install pass?

[Pause for three seconds, then advance.]
-->

---

<div class="terminal-slide">

# <mdi-fingerprint class="tone-dependency" /> A <span class="tone-danger">tiny edit</span> stops the install

<DemoVideo name="hashes" />

<div class="demo-caption">Recorded terminal · <a href="https://docs.astral.sh/uv/pip/compatibility/#hash-checking-mode">uv</a> + <a href="https://pip.pypa.io/en/stable/topics/secure-installs/">pip</a> · a disposable copy of <a href="https://pypi.org/project/virtualenv/21.14.6/">virtualenv 21.14.6</a> · a one-character ZIP comment</div>

<div class="refs-bar">
<a href="https://pip.pypa.io/en/stable/topics/secure-installs/">pip hash-checking mode</a>
<a href="https://docs.astral.sh/uv/pip/compatibility/#hash-checking-mode">uv hash-checking mode</a>
</div>

</div>

<!--
[09:18–09:52]

Same requirements file, uv and pip. Both accept the original file against the hash we recorded.

[Point to the successful installs, then the mismatch.]

One ZIP comment, and both reject it. That red error is the result I wanted.

[Pause.]

A hash still matches if you picked a malicious file to begin with; it proves these are the bytes you reviewed, nothing more. So keep the reviewed hash with the release inputs, and when verification fails, find out why. Replace the hash to make the error go away and the check becomes a suggestion.
-->

---

# <mdi-package-variant-plus class="tone-dependency" /> Your <span class="tone-build">build</span> has <span class="tone-dependency">dependencies</span> too

<div class="grid grid-cols-2 gap-12 pt-5">
<div>

**<mdi-play-circle class="tone-dependency" /> Runtime**

<pre class="linked-code"><a href="https://virtualenv.pypa.io/">virtualenv</a>
├── <a href="https://distlib.readthedocs.io/">distlib</a>
├── <a href="https://github.com/tox-dev/filelock">filelock</a>
├── <a href="https://packaging.pypa.io/">packaging</a>
├── <a href="https://github.com/tox-dev/platformdirs">platformdirs</a>
└── <a href="https://github.com/tox-dev/python-discovery">python-discovery</a></pre>

<div class="text-sm opacity-75 pt-2">Abbreviated; markers depend on Python.</div>

</div>
<div v-click="1">

**<mdi-hammer-wrench class="tone-build" /> Build and release**

<pre class="linked-code"><a href="https://hatch.pypa.io/">hatchling==1.32.4</a>
<a href="https://github.com/ofek/hatch-vcs">hatch-vcs==0.5.0</a>
<a href="https://tox.wiki/">tox</a> + <a href="https://docs.astral.sh/uv/">uv</a>
<a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/tasks/release-requirements.txt">cyclonedx-python-lib==11.12.0</a>
<a href="https://docs.github.com/en/actions/reference/security/secure-use">GitHub Actions</a></pre>

<div v-click="1" class="pt-6 text-xl">A lockfile records selected versions and files.</div>

</div>
</div>

<div class="refs-bar">
<a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/pyproject.toml">virtualenv dependency declarations</a>
<a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/tasks/release-requirements.txt">Locked release tools and hashes</a>
</div>

<!--
[09:52–10:16]

Building virtualenv runs other people's code: the build backend, the changelog tools, the SBOM generator. None of it lands on your machine; all of it can change the package you receive.

[Click: Reveal the build and release dependencies.]

So release tools get their own lock, with hashes. Calling something a development dependency doesn't limit what it can reach. Where we run it does.
-->

---


# <mdi-book-open-variant class="tone-build" /> Field guide: <span class="tone-build">Dependencies</span>

<div class="guide-intro">What virtualenv checks about the code it pulls in. Each row is one thing to check in yours.</div>
<FieldGuide section="dependencies" />

<div class="refs-bar"><a href="https://github.com/pypa/virtualenv/security/advisories/GHSA-94p9-xgh2-xp45">CVE-2026-102930: seed wheel digests</a><a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/tasks/release-requirements.txt">Locked release tools and hashes</a></div>

<!--
[10:16–10:24]

The dependencies field guide: digest checks on downloads, hashed requirements, pylock.toml, reviewed hashes, a lock for release tools. One line: a hash proves these are the bytes you reviewed, nothing more.
-->

---


# <span class="tone-build">Build</span>

<TalkSection stage="build" />

<!--
[10:24–10:29]

Now the release workflow, starting with the build.
-->

---
transition: fade
clicks: 1
---

# <mdi-key-variant class="tone-build" /> The <span class="tone-build">changelog</span> had the <span class="tone-danger">release keys</span>

<ReleaseAuthority mode="shared" />
<FoundCounter :count="8" route="secret" />

<div class="refs-bar">
<a href="https://github.com/pypa/virtualenv/pull/3336">virtualenv #3336: build the changelog without the release token</a>
</div>

<!--
[10:29–11:09]

Back to the first finding. Our release: generate the changelog, make a commit, and push a tag. Three steps, one job.

[Click: The keyring connects both operations. Let it settle before the joke.]

The preparation tools ran in a job with access to the credential used to write the release. A compromised one could have used that authority to publish whatever it liked, under our name, with our signature.

We asked it for bullet points and gave it the release keys.

[Pause.]

To generate a changelog, you need source files and somewhere to write text, nothing more. The release credential can go to a much smaller operation, and the preparation tools don't need to know it exists.
-->

---
clicks: 1
---

# <mdi-file-check-outline class="tone-dependency" /> Give the release job <span class="tone-source">text to validate</span>

<ReleaseAuthority mode="separated" />

<div class="refs-bar">
<a href="https://github.com/pypa/virtualenv/pull/3336">virtualenv #3336: build the changelog without the release token</a>
</div>

<!--
[11:09–11:44]

We split the job in two. The first runs the Python tools that generate the notes, without a release credential. It can be compromised; it can't publish.

[Click: The key moves to the release job. Follow the text through validation; the supplied script stays outside.]

It passes a changelog and a version to the privileged job. That job accepts only a numeric X.Y.Z version, and through the GitHub API it updates the changelog file and deletes the matching fragments. Nothing else. They can still write bad release notes. They can't commit code. That's the shape of every fix in this talk: shrink what the untrusted part can reach, then check what crosses the line.
-->

---

<div class="terminal-slide">

# <mdi-console class="tone-build" /> Lint <span class="tone-publish">GitHub Actions</span> with <a class="tone-source" href="https://docs.zizmor.sh/">zizmor</a>

<DemoVideo name="workflow" />

<div class="demo-caption tool-options"><span><a href="https://docs.astral.sh/uv/">uv</a>: <code>uv tool install zizmor==1.30.1</code></span><span><a href="https://pip.pypa.io/en/stable/">pip</a>: <code>python -m pip install zizmor==1.30.1</code></span></div>

<div class="refs-bar">
<a href="https://docs.zizmor.sh/audits/#template-injection">zizmor: template-injection</a>
<a href="https://docs.github.com/en/actions/reference/security/secure-use#good-practices-for-mitigating-script-injection-attacks">GitHub: handling untrusted workflow input</a>
</div>

</div>

<!--
[11:44–12:25]

Elementary's bug is a lint finding, and this is the linter. zizmor checks GitHub Actions workflows for security mistakes. Here, the pull request title appears directly in the run field. GitHub substitutes it before the shell ever parses the script, so a title with a semicolon in it is a command. That's template injection.

[Follow the finding and corrected file.]

The fix puts the title in an environment variable and passes its quoted value to printf. The shell parses a fixed script and treats the contents as data, the same principle as the activation-script fixes. We run zizmor on every workflow change, and it reads the file; it never runs it.
-->

---
clicks: 2
---

# <mdi-hard-hat class="tone-build" /> The build’s <span class="tone-danger">permissions</span> and <span class="tone-build">inputs</span>

<div v-click-hide="2"><BuildInputs /></div>

<div v-click="2" class="permission-review grid grid-cols-2 gap-10">
<div>

**Start with no token permissions**

```yaml
permissions: {}
jobs:
  scan:
    permissions:
      contents: read
  publish:
    environment: release
```

<div class="text-base pt-2">Permission/environment fragment; steps omitted.</div>
</div>
<div class="text-xl">
<p><mdi-magnify class="tone-source" /> Inspect the scanner job's <strong>secrets, environment, and checkout credentials</strong>.</p>
<p><mdi-key-variant class="tone-publish" /> Still on a PyPI API token? Keep it in the <strong>release environment</strong>; only the publish job uses it.</p>

```bash
zizmor .github/workflows
```

<a class="text-lg" href="https://docs.zizmor.sh/audits/#excessive-permissions">Review permissions per job, even if lint
is clean</a>

</div>
</div>

<div class="refs-bar"><a href="https://github.com/aquasecurity/trivy/security/advisories/GHSA-69fq-xp46-6x23#trivy-action-tag-hijacking">Trivy: existing Action tags were moved</a><a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/workflows/release.yaml">virtualenv release workflow</a><a href="https://docs.zizmor.sh/audits/#excessive-permissions">zizmor: minimal permissions per job</a><a href="https://docs.github.com/en/actions/how-tos/deploy/configure-and-manage-deployments/manage-environments">Environment secrets and required reviewers</a></div>

<!--
[12:25–12:56]

The Trivy campaign also moved trivy-action's version tags to malicious commits; Actions users were hit without changing a line. Pin Actions to reviewed commits, and check what the Action downloads, because a pin promises the same code, not good code.

[Follow the inputs. Click: remove the checkout credential.]

Checkout leaves a credential in Git's configuration; turn that off.

[Click: inspect the scanner's access.]

Then the question from the first slide: open the scanner job, read its secrets, environment, and checkout credentials. Empty permissions at the top, granted per job.
-->

---
clicks: 1
---

# <mdi-database-lock class="tone-build" /> A shared <span class="tone-build">cache</span> is another <span class="tone-danger">build input</span>

<SharedCache />

<div class="refs-bar"><a href="https://docs.github.com/en/actions/reference/workflows-and-actions/dependency-caching">GitHub cache scopes and restrictions</a><a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/workflows/release.yaml">virtualenv: disable setup-uv caching</a><a href="https://docs.astral.sh/uv/concepts/cache/">uv cache</a><a href="https://pip.pypa.io/en/stable/topics/caching/">pip cache</a></div>

<!--
[12:56–13:18]

A cache carries files from one job into the next. If a less-trusted job can write a cache the release restores, it's inside your build. A fork's pull request doesn't get that by default. Ultralytics' did; we'll meet it later.

[Click: stop shared-cache restoration.]

Our release restores no shared cache. The no-cache flags only control uv's local copy, not GitHub's restore step.
-->

---
clicks: 1
---

# <mdi-lan-connect class="tone-install" /> Limit where the build can <span class="tone-danger">connect</span>

<BuildNetwork />

<div class="refs-bar"><a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/workflows/release.yaml">virtualenv: actual build allowlist</a><a href="https://github.com/step-security/harden-runner">step-security/harden-runner</a></div>

<!--
[13:18–13:37]

The build needs PyPI, GitHub, and Sigstore, so the job allows exactly those.

[Follow an allowed request, then the blocked request. Click: reveal the limitation.]

A blocked request is an investigation, not a line to add. Allowed services can still carry data out, so this narrows a compromised build; it doesn't replace the permission work.
-->

---

# <mdi-robot class="tone-build" /> The <span class="tone-build">agent</span> has your <span class="tone-danger">permissions</span>

<div class="grid grid-cols-2 gap-10 pt-6 text-xl">
<div>

An agent reads repository files, dependency docs, and issue text. Some text contains instructions you did not authorize.

<a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/CONTRIBUTING.md">Review workflow changes</a> before
running them. Generated code goes through the same locks and scans.

</div>
<div v-click="1">

**<mdi-key-variant class="tone-publish" /> Example permission boundary**

<pre class="linked-code"><span class="tone-dependency">read source       allowed
edit source       reviewed diff</span>
<span class="tone-build">edit release.yaml human review</span>
<span class="tone-danger">publish to PyPI   no credential</span></pre>

</div>
</div>

<div class="refs-bar">
<a href="https://genai.owasp.org/llmrisk/llm01-prompt-injection/">OWASP: prompt injection and least privilege</a>
<a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/CONTRIBUTING.md">virtualenv contribution policy</a>
</div>

<!--
[13:37–13:59]

One more reader of untrusted text with your permissions: a coding agent. Repository files, docs, issue text; some of it contains instructions you didn't write. An agent without a publishing token can't publish. It can open a PR asking for one. Politely.

[Click: Reveal the example permission boundary.]

Same boundary as any tool: no release credential, and workflow edits get human review.
-->

---

# <mdi-book-open-variant class="tone-build" /> Field guide: <span class="tone-build">Build</span>

<div class="guide-intro">What virtualenv's release workflow does today. Each row is one thing to check in yours.</div>
<FieldGuide section="build" />

<div class="refs-bar"><a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/workflows/release.yaml">virtualenv release workflow</a><a href="https://docs.zizmor.sh/audits/">zizmor audits</a></div>

<!--
[13:59–14:10]

The build field guide: one row per check, for later. One line: start from permissions-empty and grant per job. Everything else follows from asking what each job can reach.
-->

---


# <span class="tone-publish">Publish</span>

<TalkSection stage="publish" />

<!--
[14:10–14:15]

Publishing comes next: who can upload, and what users can verify about the file.
-->

---
clicks: 4
---

# <mdi-key-chain class="tone-publish" /> <a href="https://docs.pypi.org/trusted-publishers/security-model/">A publishing <span class="tone-publish">credential</span> that <span class="tone-dependency">expires</span></a>

<TrustedPublishing />

<div class="refs-bar">
<a href="https://docs.pypi.org/trusted-publishers/security-model/">PyPI Trusted Publishing security model</a>
<a href="https://docs.pypi.org/attestations/">PyPI digital attestations</a>
</div>

<!--
[14:15–14:53]

And the token the changelog job could reach? Gone. With Trusted Publishing, the release job proves to PyPI who it is.

[Click: GitHub sends the signed identity statement; the registered fields match.]

GitHub signs the job's identity through OpenID Connect; PyPI matches it against the repository, workflow, and environment we registered.

[Click: The token comes back; the clock starts.]

It issues an upload credential valid for at most fifteen minutes.

[Click: Upload. Click: Accepted.]

A compromised job can still misuse that token inside its fifteen minutes, which is why the release environment has required reviewers. Naming an environment in YAML isn't configuring approval. Revoke the old tokens.
-->

---
clicks: 1
---

# <mdi-account-key class="tone-source" /> Protect the <span class="tone-source">maintainer accounts</span>

<AccountProtection />

<div class="refs-bar">
<a href="https://docs.github.com/en/authentication/authenticating-with-a-passkey/about-passkeys">GitHub passkeys</a>
<a href="https://pypi.org/help/#twofa">PyPI two-factor authentication and recovery</a>
<a href="https://docs.litellm.ai/blog/security-incident-oct-21-2026">LiteLLM: release v1.107.0 compromised, October 21, 2026</a>
</div>

<!--
[14:53–15:08]

Who can change that trusted workflow? Our GitHub accounts. Take over one with write access and Trusted Publishing will sign whatever you publish. That's how LiteLLM fell again on Wednesday: stolen maintainer tokens, branch protection overridden, and Trusted Publishing signed it.

[Click: reveal account protection and recovery.]

Passkey on GitHub, security key on PyPI, recovery codes in the password manager.
-->

---

<div class="terminal-slide">

# <mdi-shield-check class="tone-publish" /> The <span class="tone-dependency">right file</span>, from the <span class="tone-publish">expected publisher</span>

<DemoVideo name="verify" />

<div class="demo-caption tool-options"><span><a href="https://docs.astral.sh/uv/">uv</a>: <code>uv tool install pypi-attestations==0.0.30</code></span><span><a href="https://pip.pypa.io/en/stable/">pip</a>: <code>python -m pip install pypi-attestations==0.0.30</code></span></div>

<div class="refs-bar">
<a href="https://virtualenv.pypa.io/en/latest/how-to/verify-release.html">Verify a virtualenv release</a>
<a href="https://docs.pypi.org/attestations/consuming-attestations/">Consuming PyPI attestations</a>
</div>

</div>

<!--
[15:08–15:44]

A hash says these are the bytes I reviewed. The attestation says who built them. I tell the verifier I expect pypa/virtualenv's release workflow; it checks the publisher identity and the file's digest against the statement PyPI stored with the upload.

[Point to the successful result. Follow the changed file to its rejection.]

I change one byte. The signature is fine. It's not for this file. Neither uv nor pip does this during install; it's a separate step, the commands are below, and the important part is choosing the expected publisher before you look at what the file claims. Accept whatever identity the file brings and you've skipped the check.
-->

---

# <mdi-file-certificate-outline class="tone-publish" /> Which <span class="tone-dependency">file</span> did we <span class="tone-publish">verify</span>?

<pre class="linked-code text-xl">expected publisher: pypa/virtualenv
artifact: virtualenv-21.14.6-py3-none-any.whl
SHA-256: eb1a20c5878569b69667f6a1af03458a8512b3afa7be771a2dafe92fdca05bb9
verification: passed</pre>

<div v-click="1" class="text-2xl pt-8 leading-relaxed">Choose the expected publisher <strong>before</strong> inspecting the claim.</div>

<div v-click="1" class="text-2xl pt-8 leading-relaxed">Keep the result with the file’s digest.</div>

<div class="refs-bar">
<a href="https://virtualenv.pypa.io/en/latest/how-to/verify-release.html">Verify a virtualenv release</a>
<a href="https://docs.pypi.org/attestations/consuming-attestations/">Consuming PyPI attestations</a>
</div>

<!--
[15:44–16:03]

That result covers one file; another wheel needs its own run.

[Click: Reveal independent publisher selection and retained evidence.]

Name the publisher before you read what the file claims, and keep the result with the digest so later you know which bytes you checked. A valid signature says who built it, not that their dependencies were clean.
-->

---
clicks: 1
---

# <mdi-cloud-upload class="tone-publish" /> Where the <span class="tone-publish">attestations</span> live

<AttestationDestinations />

<div class="refs-bar"><a href="https://virtualenv.pypa.io/en/latest/reference/release-artifacts.html">virtualenv release files and destinations</a><a href="https://docs.pypi.org/attestations/producing-attestations/">Publish attestations to PyPI</a><a href="https://docs.github.com/en/actions/how-tos/secure-your-work/use-artifact-attestations/use-artifact-attestations">Publish attestations to GitHub</a></div>

<!--
[16:03–16:25]

Where do these statements live? PyPI keeps the publish attestation with each uploaded file, in the provenance details and the API.

[Click: reveal GitHub storage and the downloadable bundle.]

Our build and SBOM attestations live on GitHub, and a bundle sits next to virtualenv.pyz on the release, naming the file by hash. Wherever you got the file, verify the identity and the digest.
-->

---
clicks: 1
---

# <mdi-magnify-scan class="tone-publish" /> How attestations helped <span class="tone-publish">trace the attack</span>

<AttestationInvestigation />

<div class="refs-bar"><a href="https://blog.pypi.org/posts/2024-12-11-ultralytics-attack-analysis/">PyPI: Ultralytics incident analysis, December 2024</a><a href="https://blog.yossarian.net/2024/12/06/zizmor-ultralytics-injection">Investigator: template injection and cache poisoning</a></div>

<!--
[16:25–17:00]

Does any of this stop an attack? Ultralytics, December 2024: the first malicious releases had valid attestations, because they came from the real workflow with a poisoned build cache behind it, poisoned through the same template injection zizmor flags.

[Click: follow the second upload path.]

The later uploads had no attestation and no matching repository activity. An old API token nobody had revoked. The missing attestation wasn't an alarm; nothing stopped those uploads. It was a receipt nobody had signed, and it told the investigators which of two doors to look at. Evidence, not a gate. The gate is still the permissions.
-->

---
clicks: 1
---

# <mdi-content-copy class="tone-dependency" /> Can the <span class="tone-dependency">release change</span>? Can we <span class="tone-build">rebuild it</span>?

<ReleaseChecks />

<div class="refs-bar">
<a href="https://blog.pypi.org/posts/2024-12-11-ultralytics-attack-analysis/">PyPI: Ultralytics and what attestations revealed</a>
<a href="https://docs.pypi.org/attestations/">PyPI attestations</a>
<a href="https://docs.github.com/en/code-security/concepts/supply-chain-security/immutable-releases">GitHub immutable releases</a>
<a href="https://thehackernews.com/2026/10/hackers-hijack-five-ovhcloud-cli.html">OVHcloud CLI: assets replaced on five releases, October 19, 2026</a>
<a href="https://virtualenv.pypa.io/en/latest/reference/release-artifacts.html">virtualenv release artifacts and rebuild conditions</a>
</div>

<!--
[17:00–17:19]

Could someone change one of our releases, and could we rebuild one? Two checks. An immutable release stops anyone replacing a published tag or asset; a new bad release would have to be published, and that shows up. OVHcloud's CLI releases weren't immutable, and on Monday someone swapped the files on five of them, checksums included.

[Let the attempted replacement stop at the lock. Click: follow the same recorded inputs through two builds and compare their digests.]

And a rebuild from recorded inputs should produce the same bytes. Ours didn't; the reason comes with the inventory.
-->

---

# <mdi-book-open-variant class="tone-build" /> Field guide: <span class="tone-build">Publish</span>

<div class="guide-intro">Who can publish virtualenv, and how to check what was published.</div>
<FieldGuide section="publish" />

<div class="refs-bar"><a href="https://virtualenv.pypa.io/en/latest/how-to/verify-release.html">Verify a virtualenv release</a><a href="https://docs.pypi.org/attestations/consuming-attestations/">Consuming PyPI attestations</a><a href="https://docs.pypi.org/trusted-publishers/security-model/">Trusted Publishing</a></div>

<!--
[17:19–17:32]

The publish field guide: upload authority, maintainer accounts, the verifier, choose the publisher first, where the statements live, immutable releases. One line: name the publisher you expect before you read what the file claims.
-->

---
clicks: 1
---

# <span class="tone-install">Install</span>

<div class="divider-number"><strong class="tone-install">1,700 downloads</strong> a minute</div>
<TalkSection stage="install" />

<!--
[17:32–17:56]

Now the other side of the download: the 1,700 a minute, which is you.

[Click: Follow the review questions.]

Before adding a dependency: do we need it, or does the standard library already do it? Who maintains it, and how do they handle fixes? Where do we report a flaw, and does anyone answer? Then choose the release.
-->

---
clicks: 2
---

# <mdi-timer-sand class="tone-dependency" /> <span class="tone-dependency">Updates</span> can wait. <span class="tone-danger">Security fixes</span> may not.

<CooldownTimeline />

<div v-click-hide="2">
<div v-click="1" class="paired-commands grid grid-cols-2 gap-10 pt-4">
<div>

**<a href="https://docs.astral.sh/uv/concepts/resolution/#dependency-cooldowns">uv</a> · pyproject.toml**

```toml
[tool.uv]
exclude-newer = "1 week"
```

```bash
uv lock --upgrade
uv sync --locked
```

</div>
<div>

**<a href="https://pip.pypa.io/en/stable/cli/pip_lock/">pip 26.1+</a> · requirements.in**

```bash
python -m pip lock -r requirements.in \
  --uploaded-prior-to P7D
python -m pip install \
  --require-hashes -r pylock.toml
```

<div class="text-base pt-2"><a href="https://pip.pypa.io/en/stable/cli/pip_lock/">pip lock / pylock installation</a> are experimental.<br>Lock for the target Python and platform.</div>

</div>
</div>

<div v-click="1" class="text-xl pt-4"><a href="https://docs.astral.sh/uv/concepts/projects/sync/">Review the lock</a>, test the change, and <a href="https://blog.pypi.org/posts/2026-04-02-incident-report-litellm-telnyx-supply-chain-attack/#dependency-cooldowns">expedite security fixes</a>.</div>
</div>

<div v-click="2" class="cooldown-exception">
<div class="text-2xl tone-danger pb-3">Reviewed urgent fix: exempt one package with uv</div>
<div class="grid grid-cols-2 gap-10">
<div>

**uv · commit pyproject.toml + uv.lock**

```toml
[tool.uv]
exclude-newer = "1 week"
exclude-newer-package = { idna = "P0D" }
```

```bash
uv lock --upgrade-package idna
uv sync --locked
```

</div>
<div>

**pip · no per-package cooldown exception**

```bash
python -m pip lock -r requirements.in \
  --uploaded-prior-to P0D
python -m pip install \
  --require-hashes -r pylock.toml
```

<div class="text-lg pt-2"><strong class="tone-danger">P0D re-resolves the whole graph without a cooldown.</strong><br>Constrain other packages to their previous pins.</div>

</div>
</div>
<div class="text-lg pt-3">Review the lock diff. Remove the uv exception and relock once the fix clears the delay.</div>
<div class="text-lg pt-2"><a href="https://www.elementary-data.com/post/security-incident-report-malicious-release-of-elementary-oss-python-cli-v0-23-3">Elementary: roughly 11½ hours from malicious CLI upload to reported removal</a>.</div>
</div>

<div class="refs-bar">
<a href="https://docs.astral.sh/uv/concepts/resolution/#dependency-cooldowns">uv cooldowns</a>
<a href="https://pip.pypa.io/en/stable/cli/pip_lock/">pip upload-age filter and lock format</a>
</div>

<!--
[17:56–18:36]

For applications, lock exact versions and read the diff when you move them. Updates can wait for that review; a lockfile is the thing that makes the review possible.

[Click: Reveal both installer workflows.]

A cooldown keeps brand-new uploads out of the lock. Seven days here; PyPI's report suggests three. Elementary's malicious CLI was up for eleven and a half hours, so three would have kept it out.

[Click: Show the scoped exception.]

A security fix can't wait seven days. Exempt that one package, upgrade it, and the rest keep their cooldown; plain locked sync still passes. pip has no per-package exception, and the field guide says what to do instead.
-->

---
clicks: 1
---

# <mdi-package-variant class="tone-dependency" /> Choose <span class="tone-dependency">when</span> and <span class="tone-source">where</span> a file comes from

<PackageSelection />

<div class="refs-bar">
<a href="https://docs.astral.sh/uv/concepts/resolution/#dependency-cooldowns">uv cooldowns</a>
<a href="https://pip.pypa.io/en/stable/cli/pip_lock/">pip upload-age filter and lock format</a>
</div>

<!--
[18:36–18:58]

One more rule for cooldowns: a release can be old and still get a new file, so virtualenv checks each wheel's upload time, not the version's.

[Point to the new wheel arriving under the existing version. Click: follow the private package to its approved source.]

And private packages need an explicit source. extra-index-url adds a second place to look; it doesn't say which wins. Route the package in uv, or one controlled index with pip.
-->

---

# <mdi-alarm-light-outline class="tone-danger" /> Same <span class="tone-dependency">lockfile</span>, new <span class="tone-danger">advisory</span>

<div class="paired-commands grid grid-cols-2 gap-10 pt-4">
<div>

**<a href="https://docs.astral.sh/uv/concepts/projects/export/">uv</a> · export uv.lock**

```bash
uv export --locked --format pylock.toml \
  -o pylock.toml
uvx pip-audit@2.10.1 --locked .
```

</div>
<div>

**<a href="https://pip.pypa.io/en/stable/">pip</a> · audit pylock.toml**

```bash
python -m venv .audit-tools
.audit-tools/bin/python -m pip install \
  pip-audit==2.10.1
.audit-tools/bin/python -m pip_audit \
  --locked .
```

</div>
</div>

<div v-click="1" class="grid grid-cols-2 gap-12 pt-5 text-xl">
<div><mdi-source-pull class="tone-source" /> <a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/workflows/dependency-review.yaml">Review changed dependencies</a>.</div>
<div><mdi-calendar-clock class="tone-publish" /> <a href="https://github.com/pypa/pip-audit#usage">Example: scan deployed versions nightly</a>.<span class="block text-lg pt-1">Assign an owner to triage findings.</span></div>
</div>

<div class="text-lg pt-4">Hashed requirements also work: <code>pip-audit --require-hashes -r requirements.txt</code></div>

<div class="refs-bar">
<a href="https://github.com/pypa/pip-audit">pip-audit: lockfile auditing and security model</a>
<a href="https://docs.astral.sh/uv/concepts/projects/export/">uv: exporting lockfiles</a>
<a href="https://thehackernews.com/2026/10/critical-flaw-in-pythons-popular-pillow.html">Pillow 13.0.0: critical fixes for flaws dating back to 2013, October 16, 2026</a>
</div>

<!--
[18:58–19:16]

Even when the files don't change, what we know about them does. Pillow users saw that last week, when one release fixed critical flaws that had shipped for over a decade.

[Click: Reveal when the scan runs.]

pip-audit on the lock when dependencies change, and nightly against what's deployed, with a named owner; nightly without an owner means ignored nightly. Point it at the lockfile, not the environment you installed pip-audit into.
-->

---
clicks: 1
---

# <mdi-alarm-light-outline class="tone-danger" /> <span class="tone-dependency">No known advisory</span> ≠ <span class="tone-danger">no malware</span>

<AdvisoryLookup />

<div class="refs-bar">
<a href="https://github.com/pypa/pip-audit">pip-audit: lockfile auditing and security model</a>
<a href="https://docs.astral.sh/uv/concepts/projects/export/">uv: exporting lockfiles</a>
</div>

<!--
[19:16–19:40]

And read the result for what it is. No matching advisory means nobody has filed one. LiteLLM had none for two and a half hours.

[Follow the lookup and its report. Click: reveal how to handle a matching advisory.]

When something matches, check whether you use the affected code, and write down how you decided. And resolving source-distribution metadata can run a build backend, so scanning an untrusted package isn't a safe way to try it.
-->

---

# <mdi-truck-check class="tone-install" /> The <span class="tone-install">artifacts</span> that reach <span class="tone-publish">production</span>

<div class="paired-commands grid grid-cols-2 gap-10 pt-4">
<div>

**<a href="https://docs.astral.sh/uv/pip/compatibility/#hash-checking-mode">uv</a>**

```bash
uv pip install --require-hashes \
  --only-binary=:all: \
  -r requirements.txt
```

</div>
<div>

**<a href="https://pip.pypa.io/en/stable/topics/secure-installs/">pip</a>**

```bash
python -m pip install --require-hashes \
  --only-binary=:all: \
  -r requirements.txt
```

</div>
</div>

<div v-click="1" class="text-lg pt-5">Both accept hashed requirements. <a href="https://docs.astral.sh/uv/concepts/projects/export/">uv can export them</a>; <a href="https://pip-tools.readthedocs.io/en/latest/">pip-tools can compile them</a>.</div>

<div class="refs-bar">
<a href="https://pip.pypa.io/en/stable/topics/secure-installs/">pip: hash checking and wheel-only installs</a>
<a href="https://docs.astral.sh/uv/pip/compatibility/">uv: supported pip options and differences</a>
</div>

<!--
[19:40–19:56]

Production: require hashes and refuse source distributions, so an install can't quietly become a build.

[Click: reveal where the shared requirements file comes from.]

Both read the same hashed requirements; uv exports them, pip-tools compiles them. No compatible wheel, no install. Build and review one in a separate job.
-->

---
clicks: 1
---

# <mdi-truck-check class="tone-install" /> Which file did we <span class="tone-install">deploy</span>?

<DeploymentTrace mode="promote" />
<div v-click="1" class="text-base pt-4 opacity-80">Illustrative deployment record; the artifact and component are real, the runner is fictional.</div>
<div class="text-xl pt-5">Keep the inventory from the deployed release.</div>

<div class="refs-bar">
<a href="https://pip.pypa.io/en/stable/topics/secure-installs/">pip: hash checking and wheel-only installs</a>
<a href="https://docs.astral.sh/uv/pip/compatibility/">uv: supported pip options and differences</a>
</div>

<!--
[19:56–20:11]

Deploy the wheel you tested, not a rebuild; a rebuild is another file to check.

[Follow the wheel through review, test, and deployment; its digest stays attached. Click: Reveal the linked deployment record.]

Record its digest, and keep inventory, digest, and deployment record together.
-->

---

# <mdi-book-open-variant class="tone-build" /> Field guide: <span class="tone-build">Install</span>

<div class="guide-intro">The consumer side with uv and pip: lock, audit, install, deploy.</div>
<FieldGuide section="install" />

<div class="refs-bar"><a href="https://docs.astral.sh/uv/concepts/resolution/#dependency-cooldowns">uv cooldowns</a><a href="https://pip.pypa.io/en/stable/cli/pip_lock/">pip lock</a><a href="https://github.com/pypa/pip-audit">pip-audit</a><a href="https://pip.pypa.io/en/stable/topics/secure-installs/">pip secure installs</a></div>

<!--
[20:11–20:25]

The install field guide: cooldown and the urgent exception, audit the lock, hashes and wheels only in production, one explicit index, deploy what you tested. One line: no known advisory is not no malware. Someone has to own what the scanner finds.
-->

---


# <span class="tone-danger">Respond</span>

<TalkSection stage="respond" />

<!--
[20:25–20:30]

Then the day an advisory lands.
-->

---
clicks: 2
---

# <mdi-fire-extinguisher class="tone-danger" /> An <span class="tone-danger">advisory</span> lands

<div class="text-xl pt-4">Exercise: a fictional advisory names <code>pip 26.2.1</code>.</div>
<DeploymentTrace mode="incident" />
<div v-click="2" class="text-2xl pt-6">Was this copy bundled, installed, or executed?</div>

<div class="refs-bar">
<a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/INCIDENT_RESPONSE.md">virtualenv incident response plan</a>
<a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/SECURITY.md">Private reporting, scope, and maintainer response targets</a>
</div>

<!--
[20:30–21:05]

Now the inventory earns its keep. An advisory lands for pip 26.2.1. Fictional advisory, fictional runner, real version. You don't depend on pip. You depend on virtualenv. Are you affected?

[Click: Follow the component identity to the artifact’s inventory.]

[Click: Follow the artifact digest to the runner.]

The inventory names the component; the digest names the deployment; the deployment record says which runner got which wheel. That's the chain. But the first link is the one people skip: is pip even in there? pip list says you're fine. Hands up if you believe it.

[Give it three seconds.]
-->

---
clicks: 1

---

<div class="terminal-slide">

# <mdi-package-variant class="tone-build" /> What it <span class="tone-install">declares</span>, what it <span class="tone-build">carries</span>

<div class="demo-stack">
<div v-click-hide="1"><DemoVideo name="inventory-declared" /></div>
<div v-click="1"><DemoVideo name="inventory-bundled" /></div>
</div>

<div class="demo-caption">Requires-Dist, then the files inside the archive · virtualenv 21.14.6</div>

<div class="refs-bar">
<a href="https://virtualenv.pypa.io/en/latest/reference/release-artifacts.html#sboms">virtualenv wheel and zipapp SBOMs</a>
</div>

</div>

<!--
[21:05–21:40]

No. These are the declared dependencies, Requires-Dist in the wheel metadata, what the installer fetches alongside virtualenv. distlib, filelock, packaging, platformdirs. No pip.

[Click: swap to the bundled wheels. Pause for recognition.]

Same wheel, opened. There are pip and setuptools, carried inside virtualenv as wheel files, and those wheels carry copies of other libraries: requests, urllib3, rich. That's vendoring.

I work in packaging. Occasionally, we take that too literally.

[Give the line a beat.]

Whichever installer put virtualenv here, an environment listing misses everything carried as data. The advisory scanner reading that listing misses it too.
-->

---

<div class="terminal-slide">

# <mdi-clipboard-list-outline class="tone-install" /> What the <span class="tone-install">inventory</span> records

<DemoVideo name="inventory-sbom" />

<div class="demo-caption">Embedded SBOM · identities of bundled and vendored components · virtualenv 21.14.6</div>

<div class="refs-bar">
<a href="https://virtualenv.pypa.io/en/latest/reference/release-artifacts.html#sboms">virtualenv wheel and zipapp SBOMs</a>
</div>

</div>

<!--
[21:40–21:57]

The SBOM, the software bill of materials, has them. pip, its vendored requests and urllib3, setuptools and its copies, each by name and version, as a component identity a scanner can match. Keep this with the wheel and someone investigating an incident can see what was in the release they received, not the one you're building today.
-->

---
transition: fade
clicks: 1
---

# <mdi-clipboard-list-outline class="tone-install" /> Inventory the <span class="tone-build">wheels inside</span> the <span class="tone-install">wheel</span>

<ArchiveInventory mode="wheel" />

<div class="refs-bar">
<a href="https://peps.python.org/pep-0770/">PEP 770: embedded SBOMs</a>
<a href="https://virtualenv.pypa.io/en/latest/reference/release-artifacts.html">virtualenv release inventory and embedded-wheel advisories</a>
</div>

<!--
[21:57–22:17]

Follow the nesting: virtualenv carries pip and setuptools, and those carry more. All of it belongs in the inventory.

[Click: show a component identity and the inventory’s location.]

This package URL is pip from PyPI at 26.2.1, the identity a scanner matches on. PEP 770 reserves a path inside the wheel for it, so the inventory travels with the file.
-->

---
transition: fade
clicks: 1
---

# <mdi-zip-box class="tone-publish" /> A different <span class="tone-publish">artifact</span>, a different <span class="tone-install">inventory</span>

<ArchiveInventory mode="zipapp" />

<div class="refs-bar">
<a href="https://virtualenv.pypa.io/en/latest/reference/release-artifacts.html#sboms">virtualenv zipapp inventory</a>
<a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/pylock.zipapp.toml">Locked zipapp dependencies</a>
</div>

<!--
[22:17–22:30]

The zipapp, our standalone archive, bundles runtime dependencies too. Follow filelock: one version for Python 3.9, another for 3.10 and later.

[Click: reveal the wheel hash and the separate-inventory conclusion.]

Different code, different inventory. One per archive.
-->

---
clicks: 2
---

# <mdi-clipboard-check-outline class="tone-install" /> Does the <span class="tone-dependency">inventory</span> match what we ship?

<ArchiveInventory mode="validate" />
<div v-click="2" class="text-xl pt-6">An older supported Python may need a component whose fix requires newer Python. Document the tradeoff.</div>

<div class="refs-bar">
<a href="https://peps.python.org/pep-0770/">PEP 770: embedded SBOMs</a>
<a href="https://virtualenv.pypa.io/en/latest/reference/release-artifacts.html">virtualenv release inventory and embedded-wheel advisories</a>
</div>

<!--
[22:30–22:54]

An inventory you don't check is a list you hope is right.

[Click: Follow each connection from archive files to the corresponding inventory check.]

We check the inventory's structure, relationships, and licenses on every build, and for the zipapp, every file and its hash against the archive. Sign an incomplete inventory and you get a signed incomplete inventory.

[Click: Reveal the older-Python tradeoff.]

One honest gap: a bundled tool's fix may need a newer Python than we support. Document it.
-->

---
transition: fade
clicks: 1
---

# <mdi-laptop class="tone-build" /> Our <span class="tone-build">SBOM</span> included the <span class="tone-danger">machine</span>

<div class="text-xl pt-4">SBOM = software bill of materials: the inventory of shipped code.</div>
<BuildMetadata mode="embedded" />
<FoundCounter :count="9" />

<div class="refs-bar">
<a href="https://github.com/pypa/virtualenv/pull/3311">virtualenv #3311: remove build-machine details and normalize zipapp metadata</a>
<a href="https://virtualenv.pypa.io/en/latest/reference/release-artifacts.html#build-reproducibility">Documented rebuild conditions</a>
</div>

<!--
[22:54–23:32]

Remember the rebuild that didn't match? Then I checked our SBOM. It recorded the build machine: Ubuntu release, Azure kernel, architecture, compiler build. Number nine, and the last.

[Click: Follow the machine details into the embedded inventory.]

Two machines could build the same source with the same tools and produce different wheels, because these fields differed. Our wheel came with a souvenir from the build machine.

[Pause.]

These fields are from 21.10.0. We deleted them, and fixed archive timestamps and permissions while we were in there, so that a rebuild from the same commit, Python, and tools can match.
-->

---
transition: fade
---

# <mdi-fingerprint class="tone-build" /> Different <span class="tone-build">metadata</span>, different <span class="tone-danger">wheel hash</span>

<BuildMetadata mode="ripple" />

<div class="refs-bar">
<a href="https://github.com/pypa/virtualenv/pull/3311">virtualenv #3311: remove build-machine details and normalize zipapp metadata</a>
<a href="https://virtualenv.pypa.io/en/latest/reference/release-artifacts.html#build-reproducibility">Documented rebuild conditions</a>
</div>

<!--
[23:32–23:59]

[Follow the change from machine details to inventory, RECORD, and wheel.]

Why does that change the whole wheel? The inventory is a file inside it. Its bytes change, so its hash changes in RECORD, the file that lists every file in the wheel with its hash. RECORD changed, so the wheel's digest changed. Not one byte of Python moved. That's why a mismatch needs a diff before it needs a headline, and why the inventory now records what we shipped and nothing about where.
-->

---
clicks: 1
---

# <mdi-content-copy class="tone-dependency" /> What does a <span class="tone-dependency">rebuild</span> need?

<BuildMetadata mode="separate" />
<div class="text-base pt-5 opacity-80">Actual selected fields from 21.14.6. This and the preceding example are different published releases, not two builds of one commit.</div>

<div class="refs-bar">
<a href="https://github.com/pypa/virtualenv/pull/3311">virtualenv #3311: remove build-machine details and normalize zipapp metadata</a>
<a href="https://virtualenv.pypa.io/en/latest/reference/release-artifacts.html#build-reproducibility">Documented rebuild conditions</a>
</div>

<!--
[23:59–24:19]

What does a rebuild need now? The source commit, the Python patch version, the build tools, and a timestamp through SOURCE_DATE_EPOCH. These fields are 21.14.6; the souvenir was 21.10.0, two releases, not two builds.

[Click: Separate the build record from the shipped-code inventory.]

Where the build ran goes in a separate provenance statement that names the wheel by digest.
-->

---
clicks: 1
---

# <mdi-clipboard-plus-outline class="tone-install" /> Generate an <span class="tone-install">environment SBOM</span>

<SbomGeneration />

<div v-click="1" class="grid grid-cols-2 gap-8 sbom-commands">
<div>

**<a href="https://docs.astral.sh/uv/concepts/tools/">uv</a> · isolated tool environment**

```bash
uv tool run --from cyclonedx-bom \
  cyclonedx-py environment \
  .venv/bin/python -o sbom.json
```

</div>
<div>

**<a href="https://pip.pypa.io/en/stable/">pip</a> · separate tool environment**

```bash
python -m venv .sbom-tools
.sbom-tools/bin/python -m pip install \
  cyclonedx-bom
.sbom-tools/bin/cyclonedx-py \
  environment \
  .venv/bin/python -o sbom.json
```

</div>
</div>

<div v-click="1" class="text-xl pt-5"><strong class="tone-source">.venv</strong> is the application environment. Bundled and vendored code needs artifact-level inventory too.</div>

<div class="refs-bar">
<a href="https://cyclonedx-bom-tool.readthedocs.io/en/latest/usage.html#for-python-virtual-environment">CycloneDX Python: environment inventory · macOS / Linux commands</a>
</div>

<!--
[24:19–24:39]

For your own application, this is the one-liner: CycloneDX reads the environment's metadata and writes the SBOM.

[Click: reveal both commands. Point to the same target interpreter in each.]

Run it from a separate tool environment so its dependencies stay out of your inventory. And remember the show of hands: it reads what's installed. The wheels inside the wheel come from the artifact's inventory.
-->

---
clicks: 2
---

<div class="stage-label tone-danger"><mdi-fire-extinguisher /> Respond</div>

# <mdi-arrow-decision class="tone-danger" /> What do we need to <span class="tone-danger">fix</span>?

<IncidentResponse />

<div class="refs-bar">
<a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/INCIDENT_RESPONSE.md">virtualenv incident response plan</a>
<a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/SECURITY.md">Private reporting, scope, and maintainer response targets</a>
</div>

<!--
[24:39–25:12]

When something does land: for a vulnerability, assess whether we're affected and ship the fix. That alone doesn't tell you whether a credential was stolen.

[Click: Reveal the response to executed malware.]

If malicious code ran, contain the systems, preserve evidence, and investigate credential access. The package is fixed; the exposed key still works, and it will keep working after the all-clear.

[Click: revoke the exposed credential; watch access stop.]

Revoke and replace it. For private reports, virtualenv targets acknowledgment within five working days and assessment within fifteen.
-->

---

# <mdi-book-open-variant class="tone-build" /> Field guide: <span class="tone-build">Respond</span>

<div class="guide-intro">Where virtualenv's inventories live, how we check them, and what to do when something lands.</div>
<FieldGuide section="inventory" />

<div class="refs-bar"><a href="https://peps.python.org/pep-0770/">PEP 770</a><a href="https://virtualenv.pypa.io/en/latest/reference/release-artifacts.html#sboms">virtualenv inventories</a><a href="https://cyclonedx-bom-tool.readthedocs.io/en/latest/usage.html#for-python-virtual-environment">CycloneDX environment inventory</a></div>

<!--
[25:12–25:23]

The respond field guide: where the inventory sits, how components are named, one per artifact, validation, what a rebuild needs, the environment command, and what to do when malware ran. One line: keep the inventory with the digest and the deployment record. Today's SBOM describes today.
-->

---

# <mdi-stairs class="tone-dependency" /> Your <span class="tone-dependency">next release</span>

<div class="pt-5">

<table>
<thead><tr><th>When</th><th>Consumer</th><th>Publisher</th></tr></thead>
<tbody>
<tr><td>First changes</td><td><a href="https://docs.astral.sh/uv/concepts/projects/sync/">Keep <code>uv.lock</code> / <code>pylock.toml</code></a>; <a href="https://github.com/pypa/pip-audit#security-model">scan known vulnerabilities</a></td><td><a class="block" href="https://docs.astral.sh/ruff/rules/#flake8-bandit-s"><code>ruff check --select S</code></a><a class="block" href="https://docs.zizmor.sh/audits/#excessive-permissions"><code>zizmor .github/workflows</code></a></td></tr>
<tr v-click="1"><td>Next release</td><td><a href="https://docs.astral.sh/uv/concepts/resolution/#dependency-cooldowns">Review updates</a> and <a href="https://docs.astral.sh/uv/concepts/indexes/">source selection</a></td><td><a href="https://github.com/pypa/virtualenv/pull/3336">Restrict release authority</a>; use <a href="https://docs.pypi.org/trusted-publishers/security-model/">Trusted Publishing</a></td></tr>
<tr v-click="2"><td>Then</td><td><a href="https://virtualenv.pypa.io/en/latest/reference/release-artifacts.html#sboms">Retain deployed inventories</a>; <a href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/INCIDENT_RESPONSE.md">rehearse response</a></td><td><a href="https://virtualenv.pypa.io/en/latest/reference/release-artifacts.html#sboms">Publish inventories</a> and <a href="https://docs.pypi.org/attestations/">attestations</a>; <a href="https://virtualenv.pypa.io/en/latest/how-to/verify-release.html">verify releases</a></td></tr>
</tbody>
</table>

</div>

<div class="refs-bar">
<a href="https://bernat.tech/posts/securing-python-supply-chain/">Background guide and phased adoption</a>
</div>

<!--
[25:23–25:36]

[Click twice to reveal the table. It is the handout, not the script.]

Tonight, open your release workflow. Find the job that runs your scanner. Read its permissions block. If there isn't one, you have my answer, and you have your first finding.
-->

---

# <mdi-beach class="tone-source" /> What will you <span class="tone-source">check</span> in your <span class="tone-dependency">next release</span>?

<div class="grid grid-cols-[250px_1fr] gap-12 items-center pt-10">
<div class="bg-white p-3 rounded-lg w-fit">
<QRCode data="https://bernat.tech/posts/securing-python-supply-chain/" :size="220" />
</div>
<div>
<div class="text-2xl leading-relaxed"><mdi-key-variant class="tone-publish" /> <a class="tone-publish" href="https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/workflows/release.yaml">Limit what the release job can do.</a><br><mdi-fingerprint class="tone-dependency" /> <a class="tone-dependency" href="https://pip.pypa.io/en/stable/topics/secure-installs/">Check the file you ship.</a><br><mdi-package-variant class="tone-install" /> <a class="tone-install" href="https://virtualenv.pypa.io/en/latest/reference/release-artifacts.html#sboms">Keep a record of what is inside.</a></div>
<div class="text-xl pt-8"><a href="https://bernat.tech/posts/securing-python-supply-chain/">https://bernat.tech/posts/securing-python-supply-chain/</a></div>
<div class="text-xl pt-3"><a href="https://bernat.tech/">bernat.tech</a> · <a href="https://github.com/gaborbernat">@gaborbernat</a></div>
<FindingMarks />
<div class="text-3xl pt-5 tone-danger">I checked mine. Go check yours.</div>
</div>
</div>
<FoundCounter :count="9" />

<!--
[25:36–25:50]

Nine, in a project with a threat model, CodeQL, a fuzzer, and a maintainer who gives this talk. Your number isn't zero either. I checked mine. Go check yours. Thank you.

[Leave this conclusion and QR code visible. Open the sources slide only if needed.]
-->

---

# <mdi-book-open-page-variant class="tone-source" /> <span class="tone-source">Sources</span> and <span class="tone-dependency">examples</span>

<div class="grid grid-cols-2 gap-10 text-lg pt-4">
<div>

**Python supply chain**

- [Trivy → LiteLLM / Telnyx, 2026](https://blog.pypi.org/posts/2026-04-02-incident-report-litellm-telnyx-supply-chain-attack/)
- [Elementary workflow compromise, 2026](https://www.elementary-data.com/post/security-incident-report-malicious-release-of-elementary-oss-python-cli-v0-23-3)
- [Ultralytics incident analysis](https://blog.pypi.org/posts/2024-12-11-ultralytics-attack-analysis/)
- [pip secure installs](https://pip.pypa.io/en/stable/topics/secure-installs/) ·
  [pip lock](https://pip.pypa.io/en/stable/cli/pip_lock/)
- [LiteLLM maintainer account](https://docs.litellm.ai/blog/security-townhall-updates)
- [virtualenv activation CVE](https://github.com/advisories/GHSA-rqc4-2hc7-8c8v)
- [virtualenv 2026 activation advisories](https://github.com/pypa/virtualenv/security/advisories)
- [Downloaded seed wheels: CVE-2026-102930](https://github.com/pypa/virtualenv/security/advisories/GHSA-94p9-xgh2-xp45)
- [uv resolution and cooldowns](https://docs.astral.sh/uv/concepts/resolution/)
- [pip-audit security model](https://github.com/pypa/pip-audit#security-model)
- [Trusted Publishing](https://docs.pypi.org/trusted-publishers/)
- [PyPI attestations](https://docs.pypi.org/attestations/)
- [PEP 770](https://peps.python.org/pep-0770/)

</div>
<div>

**Maintainer work**

- [GitHub Actions secure use](https://docs.github.com/en/actions/reference/security/secure-use)
- [zizmor audits](https://docs.zizmor.sh/audits/)
- [virtualenv threat model](https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/THREAT_MODEL.md)
- [virtualenv release verification](https://virtualenv.pypa.io/en/latest/how-to/verify-release.html)
- [virtualenv release artifacts](https://virtualenv.pypa.io/en/latest/reference/release-artifacts.html)
- [OWASP prompt injection guidance](https://genai.owasp.org/llmrisk/llm01-prompt-injection/)
- [The longer guide](https://bernat.tech/posts/securing-python-supply-chain/)

</div>
</div>

<!--
[Reference slide.]

The slide citations link to the sources for each claim. The terminal recordings use
virtualenv 21.14.6, and repository examples refer to the inspected bf09c7eb snapshot. The recordings and commands live
with the deck so they can be refreshed before the talk.
-->
