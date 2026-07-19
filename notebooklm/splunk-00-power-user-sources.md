# NotebookLM source pack — Splunk Core Certified Power User

All sources below are pulled straight from the fact-checked
[`tracks/splunk/00-power-user/sources.md`](../tracks/splunk/00-power-user/sources.md)
registry — official Splunk material only, each already verified. This file
exists to make setup fast: paste these URLs into a new NotebookLM notebook
and you get grounded Q&A and an Audio Overview built entirely from official
Splunk docs, with no risk of the notebook inventing SPL syntax that isn't
real.

## Setup steps (manual — NotebookLM has no public API)

1. Go to [notebooklm.google.com](https://notebooklm.google.com) and sign in
   with your Google account.
2. Create a new notebook, name it **"Splunk — Core Certified Power User"**.
3. Add each source below via "Add source" → "Website" (paste the URL). For
   the exam blueprint PDF, use "Add source" → "PDF" after downloading it
   from the link below (NotebookLM can also take a URL directly for PDFs in
   most cases — try the URL first).
4. Once all sources are added, use NotebookLM's **"Generate"** panel to
   create an **Audio Overview** — a podcast-style discussion of the
   material, good for commutes or rides. You can also just chat with the
   notebook directly for grounded Q&A (it cites back to the sources you
   added, which keeps it from hallucinating SPL syntax).
5. Update `notebooklm/manifest.md` to mark this module's notebook as
   created, and note the Audio Overview once generated.

## Sources (official tier only, per sources.md)

- [Splunk Core Certified Power User exam guide/blueprint PDF](https://www.splunk.com/en_us/pdfs/training/splunk-test-blueprint-power-user.pdf)
- [Certification track page](https://www.splunk.com/en_us/training/certification-track/splunk-core-certified-power-user.html)
- [`chart` command reference](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Chart)
- [`timechart` command reference](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Timechart)
- [`eval` command reference](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Eval)
- [`where` command reference](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Where)
- [`search` command reference](https://docs.splunk.com/Documentation/Splunk/9.3.1/SearchReference/Search)
- [`fillnull` command reference](https://docs.splunk.com/Documentation/Splunk/latest/SearchReference/Fillnull)

## Not yet included

Sections 3.0–10.0 of the blueprint aren't ingested yet (see
[`tracks/splunk/ROADMAP.md`](../tracks/splunk/ROADMAP.md) and the
module's `syllabus.md`). Once `/learn-ingest` covers them, their sources
will land in `sources.md` and should be appended to this pack — re-run
`/learn-ingest` to keep this file in sync rather than hand-editing new URLs
in here (this file mirrors sources.md, it isn't a second source of truth).

**Note on Splunk University:** Dave has full Splunk University access, but
that courseware sits behind a login Claude can't reach, so it isn't listed
here. Recommend adding relevant Splunk University course PDFs/exports to
this same NotebookLM notebook by hand if he wants them in the mix — just
keep them clearly separate from the auto-tracked list above so future
`/learn-ingest` runs don't overwrite manual additions without notice.
