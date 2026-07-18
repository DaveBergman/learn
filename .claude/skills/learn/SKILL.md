---
name: learn
description: Run today's learning session for Dave — reads system/LEARNER_PROFILE.md and progress/ to pick due cards, a short new-material note, a hands-on lab step, and interleaved quiz questions, then logs the outcome. Use when Dave says "let's learn", "/learn", asks to study, drill, or continue his Splunk cert prep, or asks what to study today.
---

# /learn — daily session driver

The daily entry point for `~/Git/learn`. Builds one session, runs it
interactively with Dave, and logs it. Read `system/METHOD.md` for the
pedagogy this implements and `system/LEARNER_PROFILE.md` for current
personalization before building the session.

## Steps

1. **Orient.** Read `system/LEARNER_PROFILE.md` and the most recent few files
   in `progress/` to know: which track/cert is active, what's due, session
   length that's worked well, modality mix that's worked well. If no track
   is specified and more than one is active, ask which one (or infer from
   most recent progress log).

2. **Pick today's module.** Find the active cert directory under
   `tracks/<track>/<NN-cert>/`. Read its `syllabus.md` to see progress
   through the blueprint and pick the next module, or continue one in
   progress.

3. **Build the session** (interleaved per METHOD.md, adjust mix per profile):
   - **Warm-up retrieval**: due cards from `cards/*.yaml` (SM-2 schedule —
     check each card's last-reviewed/interval fields, default new cards to
     due). Spawn `quiz-master` (haiku) to run this drill interactively.
   - **New material**: if the module has an unread note in `notes/`, present
     it — short, cited, one concept. If the module doesn't have notes yet
     for the next syllabus item, stop and tell Dave to run `/learn-ingest`
     first rather than fabricating material inline.
   - **Do**: if `labs/` has a matching exercise, run it via `/learn-lab`
     against the live `splunk-am06` MCP.
   - **Test**: interleaved quiz questions from `quiz/*.yaml` covering new +
     recent material, via `quiz-master`.

4. **Log.** Write `progress/<YYYY-MM-DD>-<track>-<module>.json` with:
   modality sequence used, duration, per-item quiz/card results, Dave's
   self-rated difficulty (ask him directly, one line), and any card
   scheduling updates (new SM-2 interval/ease per card reviewed — write
   these back into the card's YAML frontmatter under a `review:` block, not
   into a separate database).

5. **Close out.** One-line summary: what was covered, accuracy, what's next.
   If this is the 7th session-or-more since the last `LEARNER_PROFILE.md`
   update, suggest running `/learn-review`.

## Rules

- Never invent a note, card, or quiz question inline to fill a gap — if
  content is missing, say so and hand off to `/learn-ingest` /
  `/learn-cards`. This skill *runs* sessions from already fact-checked
  content; it does not author new claims.
- Keep the session focused — one module, not a sprawl across the whole
  track, unless the profile says Dave does better with broader interleaving.
