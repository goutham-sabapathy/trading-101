---
title: Interactive Tools
nav_order: 7
has_children: false
---

# Interactive Tools

Self-contained interactive apps and Claude artifacts, served live via GitHub Pages.

## Available

- [Options Strategy Builder](../strategy-builder/index.html) — in-browser payoff/Greeks
  visualizer with presets, scenario simulation, and a time-decay chart.

_New artifacts will be listed here as they're added._

## How to add an artifact

Artifacts are interactive HTML pages that live in the repo and render at a Pages URL —
the same mechanism as the strategy builder. To add one:

1. Create `docs/artifacts/<name>/index.html`. It will be served at
   `https://goutham-sabapathy.github.io/trading-101/artifacts/<name>/`.
2. Add a link to it under **Available** above.
3. Open a PR (same review workflow as the docs).

### Self-contained standard (required)

- **Inline all CSS and JS** into the HTML, or co-locate them as relative files in the
  artifact's own folder.
- **No CDN / external requests** — embed assets as `data:` URIs. (Avoid the Google-Fonts
  CDN the strategy builder uses; prefer a system-font stack so the page works offline.)
- **No YAML front matter in the `.html`** — this guarantees Jekyll copies it verbatim and
  never runs it through Liquid (so `{{` / `{%` in your JS stays intact).

> Why here and not the GitHub Wiki? The Wiki sanitizes JavaScript, so interactive
> artifacts won't run there. Pages serves them live, under the same PR review as the docs.
