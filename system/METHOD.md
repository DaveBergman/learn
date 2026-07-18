# METHOD — how this system teaches

This document is the pedagogy contract. Every skill in `.claude/skills/` implements these principles; `LEARNER_PROFILE.md` is where they get personalized to Dave specifically as evidence comes in.

## Core principles (evidence-based defaults, used until the profile says otherwise)

1. **Retrieval practice over re-reading.** Testing yourself (quiz, flashcard, explain-it-back) produces far better retention than re-reading notes. Every module's "read" step is short; most of the time budget goes to being quizzed on it.
2. **Spaced repetition.** Cards are scheduled with SM-2 (SuperMemo-2): each review's ease and interval depend on how well you recalled it, so struggling cards resurface sooner and easy ones drift further apart. Implemented in `site/` for daily drilling and exported to Anki `.apkg` for mobile/offline drilling with a mature scheduler.
3. **Interleaving.** Don't block all study of one sub-topic together — mix question types and topics within a session so the brain has to retrieve the *right* method, not just the next one in sequence.
4. **Dual coding.** Pair verbal explanation with a visual or hands-on artifact wherever possible — a diagram, a real SPL query, a dashboard you built — rather than text alone.
5. **Hands-on over abstract.** Splunk (and most technical certs) reward doing over memorizing. Every module pairs its concept notes with a `labs/` exercise run against the live Splunk instance (`splunk-am06`), not a simulator.
6. **Feynman check.** Periodically asked to explain a concept in your own words as if teaching someone else — the gap between what you can explain and what you merely recognize is where real weakness hides.
7. **Multimodal.** The same material shows up as: short cited notes (read), flashcards (drill), quiz questions mapped to the exam blueprint (test), a hands-on lab (do), and — via NotebookLM — an audio overview (listen, e.g. for commutes/rides).

## Integrity rules (non-negotiable)

- **No invented facts.** Every note, card, and quiz question cites its source (URL + accessed date).
- **Fact-check gate.** The `fact-checker` agent verifies every citation resolves and actually supports the claim before anything merges into `tracks/`.
- **No exam braindumps.** Leaked/real exam questions are never used — this violates certification candidate agreements. Question banks are generated from the *official public exam blueprint*, with answers cited to official documentation, plus official practice exams where Splunk provides them.
- **Source hierarchy:** official Splunk documentation / Splunk Education / Splunk University > official Splunk blog/Lantern/.conf talks > independent expert content (verified live at ingest time, never assumed).

## Session shape (what `/learn` runs)

A typical `/learn` session interleaves, roughly:
1. **Warm-up retrieval** — cards due today (SM-2 queue).
2. **New material** — one short cited note, kept small (one sitting, one concept).
3. **Do** — a hands-on lab step against splunk-am06 tied to that note.
4. **Test** — a handful of blueprint-mapped quiz questions covering new + recent material (interleaved, not blocked).
5. **Log** — session outcome written to `progress/` (modality, duration, scores, self-rated difficulty) to feed `/learn-review`.

## Adaptation loop

`/learn-review` (weekly) reads `progress/` and updates `system/LEARNER_PROFILE.md` with what's actually working — which modality produces better retention, what time of day, what session length before quality drops, which topic types need more hands-on vs. more reading. `/learn` then reads the profile before building each day's session. The defaults above are the starting point, not a fixed rule — they're expected to shift as the profile accumulates evidence.
