# Trading-101 Documentation

A focused trading reference: capture the **basics and acronyms** once, then go
straight to **specific strategies and best practices**. It is a decision aid, not
a tutorial library — every doc should answer "what do I do?" or "what does this
term mean?". If a doc just re-explains a concept you can find anywhere, it does not
belong here.

## Scope

**In scope**

1. **Basics & acronyms** — the [Glossary](./common/glossary.md) is the foundation:
   options, Greeks, volatility, market-structure, and flow terms, defined once.
2. **Specific strategies** — concrete, screen-and-select playbooks and the
   rule-based SPY decision system (bias → classify → select structure).
3. **Best practices** — risk, position sizing, discipline, and journaling rules.
4. **Quick visual references** — diagram + a few bullets, linked from the glossary.
   Visuals are recall aids, not essays.

**Out of scope**

- General education / long explainers that duplicate what's freely available.
- Proprietary, private, or project-specific execution plans.

## Folder Layout

```text
docs/
  README.md                 # this file
  common/                   # the knowledge base — see common/README.md for the full index
  strategy-builder/         # interactive options payoff/Greeks visualizer
```

## Start Here

- **[Common Knowledge Base Index](./common/README.md)** — the categorized index of
  every concept doc, with a one-line description and suggested reading paths.
- **[Options Strategy Builder](./strategy-builder/index.html)** — interactive
  payoff/Greeks visualizer.

The Common Knowledge Base Index is the single source of truth for the document list.
Add new docs there (under the right category) rather than maintaining a second list here.

## Usage Rule

Keep entries generic and non-proprietary — no private drafts or proprietary execution
plans. Favor brevity: a tight reference you will reread beats a thorough doc you won't.
