# Securing Your Python Supply Chain

PyBeach, October 24, 2026. A 25-minute talk told as nine findings from virtualenv's own release pipeline, framed by the
2026 Trivy/LiteLLM and Elementary incidents. Five field-guide slides carry the settings and commands, each followed by
the detailed slides behind its rows; those get one sentence each.



## Present

```bash
npm ci
npm run dev
```

Open <http://localhost:3030/#/1> on the projector and <http://localhost:3030/#/presenter/1> on your screen, in the same
browser; the presenter view shows the notes and drives the slides window. The six terminal videos autoplay muted, hold
the final result for at least 30 seconds, loop while their slide is visible and reset when you leave. Videos and posters
follow the deck theme: Catppuccin Latte in light mode and Mocha in dark mode. They are local files and need no network
connection during the talk.

To present from the published deck instead, with nothing installed, open
<https://gaborbernat.github.io/pybeach-2026/#/1> and <https://gaborbernat.github.io/pybeach-2026/#/presenter/1> in the
same browser. The page and videos then load from GitHub Pages, so open both and step through the videos once before the
talk. Set the displays to extend, not mirror.

The presenter view's notes hold the speaker script and timing; the [speaker PDF](pdf/pybeach-2026-speaker.pdf) has the
same.



## Build and export

```bash
npm run build
npm run export:all
```

`dist/` contains the static site, including recordings and poster frames. The PDF exports use the end of each recording
as a static frame. The export script uses Google Chrome at `/usr/bin/google-chrome`; use Slidev's `--executable-path`
option if Chrome lives elsewhere. Exported PDFs are in [pdf/](pdf/). Keep `npm run dev` running on port 3030 while
exporting, and restart it first if slides changed since it started, or an export can capture a stale slide.



## Story

The chapters follow the lifecycle map: Source, Dependencies, Build, Publish, Install, Respond, each opened by a divider.
The refrain "Then I checked mine" introduces the findings, and the counter in the top-right corner runs to nine. Each
chapter tells its findings first, then the detail slides behind them. Every chapter closes with its own field guide, one
row per check. The field-guide notes are one fixed sentence plus the line that matters; do not read their rows aloud.



## Q&A: CodeQL and the October 1 reports

**You had CodeQL configured. How did they find two more bugs?**

CodeQL checks the behavior its queries model. Our
[activation query](https://github.com/pypa/virtualenv/blob/bf09c7eb/.github/codeql/queries/UnquotedActivationValue.ql)
treats a call to `quote()` as a barrier. That can catch a missing call; it doesn't prove the quoting rules fit the shell
or that later replacements leave the result alone. Kevin Stubbings's reports covered those two gaps:
[fish quoting rules](https://github.com/pypa/virtualenv/security/advisories/GHSA-c947-3pg5-gm8q) and
[replacement of already-quoted text](https://github.com/pypa/virtualenv/security/advisories/GHSA-8rjx-v5ww-45pp). We
need regression tests for those behaviors alongside the queries.



## uv and pip examples

The slides pair uv 0.13.0 and pip 26.2.1. The pip cooldown needs
[pip 26.1 or newer](https://pip.pypa.io/en/stable/news/#v26-1); its
[lock command](https://pip.pypa.io/en/stable/cli/pip_lock/) and `pylock.toml` installation are experimental, so lock for
the target Python and platform. pip has no per-package cooldown exception: `--uploaded-prior-to P0D` re-resolves the
whole graph, so constrain unrelated packages to their previous pins and review the lock before installing.

For an established pip workflow, [pip-tools](https://pip-tools.readthedocs.io/en/latest/) produces hashed requirements:

```bash
python -m pip install pip-tools
python -m piptools compile --generate-hashes requirements.in
python -m pip install --require-hashes -r requirements.txt
```

The uv equivalent:

```bash
uv pip compile --generate-hashes requirements.in -o requirements.txt
uv pip install --require-hashes -r requirements.txt
```

Install scanning and verification tools in a separate environment: `uv tool install`, or `python -m venv .tools` with
pip. Pin and review those tools as release inputs too.



## Recordings and sources

The terminal recordings use the published virtualenv 21.14.6 wheel; workflow examples refer to virtualenv commit
`bf09c7eb`. Slides cite primary sources next to the claims they support, and the deck extends the
[supply-chain guide](https://bernat.tech/posts/securing-python-supply-chain/). The cover uses the official
[PyBeach logo](https://2026.pybeach.org/static/images/pybeach-logo.svg), designed by
[Chloe Ezra](https://bsky.app/profile/ccezra.bsky.social).
