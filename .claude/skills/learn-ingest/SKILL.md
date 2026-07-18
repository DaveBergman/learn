---
name: learn-ingest
description: Discover and fact-check real learning sources for a cert/module, then write cited notes, sources.md, and seed material into tracks/. Use when Dave says "/learn-ingest", asks to add a new cert/module/topic, or /learn reports missing content for the next syllabus item.
---

# /learn-ingest <track> <cert-or-module>

Populates a track/module with real, verified source material. This is the
only skill allowed to introduce new claims into `tracks/` — and only after
the fact-check gate passes. Model routing: orchestrate on the calling
model, discovery via `source-scout` (sonnet), verification via
`fact-checker` (sonnet, with any exam-blueprint mapping spot-checked by the
caller if it's running on a stronger model).

## Steps

1. **Scope.** Confirm the track and module (e.g. `splunk`,
   `00-power-user`). If the module directory doesn't exist yet, create it
   with the standard skeleton (`syllabus.md`, `notes/`, `cards/`, `quiz/`,
   `labs/`, `sources.md`).

2. **Blueprint first.** Before sourcing content, get the *official* exam
   blueprint / learning-path page for this cert (WebFetch from
   splunk.com/certification or docs.splunk.com). Write/update
   `syllabus.md` as a checklist mapped 1:1 to the blueprint's topic list,
   with the blueprint URL cited at the top. Do not proceed on a
   remembered/assumed blueprint — fetch it live.

3. **Discover.** Spawn `source-scout` with the specific syllabus topic(s) in
   scope. It returns a ranked candidate list — do not accept it uncritically;
   skim for anything that looks like guessed URLs or suspiciously convenient
   podcast titles.

4. **Fact-check.** For each candidate source and each draft claim/note drawn
   from it, spawn `fact-checker`. Only items that PASS (or are explicitly
   Dave-verifiable UNVERIFIED, e.g. Splunk University content behind his
   login) get written into `sources.md` and `notes/`.

5. **Write.** Append passed sources to `sources.md` (tier, URL, one-line
   description, accessed date). Write short cited notes to `notes/` — one
   file per syllabus sub-topic, each claim tagged with its source. Do not
   generate cards/quiz here — that's `/learn-cards`.

6. **NotebookLM pack.** Add the newly verified official-tier sources to
   `notebooklm/<track>-<module>-sources.md` (a flat list of doc URLs/PDFs
   suitable for pasting into a NotebookLM notebook) and update
   `notebooklm/manifest.md`.

7. **Report.** Summarize what was added, what failed fact-check and why,
   and anything flagged UNVERIFIED for Dave to confirm manually (e.g.
   Splunk University course content he can see but Claude can't fetch).

## Hard rules

- No exam braindumps, ever — reject any candidate that reads like recalled
  real exam content rather than official blueprint-derived material. This
  overrides "but it looked accurate."
- No claim reaches `notes/` without a citation `fact-checker` has verified
  this session.
