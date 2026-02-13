# Trading-101 Documentation

This repository now uses a strict documentation structure:

- `common/`: reusable trading knowledge used by all projects.
- `projects/`: one directory per idea/project with complete design artifacts.
- `archive/legacy/`: older drafts kept for history only.
- `templates/`: checklists/templates for creating new project docs.

## Folder Layout

```text
docs/
  README.md
  common/
  projects/
    earnings-options-engine/
  templates/
  archive/
    legacy/
```

## Rules

1. Each new idea must get its own folder under `projects/`.
2. Project docs must reference shared material in `common/` instead of duplicating basics.
3. Each project should include at least:
   - `README.md`
   - `prd.md`
   - `architecture.md`
   - `data-model-and-pipeline.md`
   - `rulebook.md`
   - `implementation-roadmap.md`
   - `diagrams.md` (if architecture/data flow is non-trivial)
4. Keep `archive/legacy/` read-only; do not place active docs there.

## Current Projects

- [Earnings Options Recommendation Engine](./projects/earnings-options-engine/README.md)

## Shared Knowledge Base

- [Common Docs Index](./common/README.md)

## Starting a New Idea

Follow: [Project Documentation Checklist](./templates/project-doc-checklist.md)
