# learn

Dave's personal, multi-track learning system. Multimodal (read / lab / drill / audio), spaced-repetition-driven, and adapts to how he actually learns over time.

**Hard rule for every file in this repo: no invented facts.** Every claim in a note, flashcard, or quiz question carries a citation to an official or explicitly-verified source. Nothing merges into `tracks/` without passing the `fact-checker` agent.

## Tracks

- [`tracks/splunk`](tracks/splunk/ROADMAP.md) — Splunk certification ladder: Core Power User → Enterprise Admin → Architect.

## Layout

```
system/        pedagogy (METHOD.md) and the evolving learner profile
tracks/<t>/    one directory per learning track, subdivided by cert/module
notebooklm/    per-cert NotebookLM source packs + manifest (audio overviews)
progress/      session logs + quiz results (JSON), feeds the adaptation loop
site/          the front-end PWA (deployed to GitHub Pages + AM06 mirror)
tools/         build scripts (e.g. cards -> site JSON + Anki .apkg)
.claude/       skills (/learn, /learn-ingest, /learn-cards, /learn-lab, /learn-review) + agents
```

## Daily use

Run `/learn` for today's session. See [`system/METHOD.md`](system/METHOD.md) for the pedagogy and [`.claude/skills`](.claude/skills) for the full command set.
