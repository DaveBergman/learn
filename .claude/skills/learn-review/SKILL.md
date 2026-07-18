---
name: learn-review
description: Weekly retro over progress/ logs — updates system/LEARNER_PROFILE.md with what's actually improving retention, and re-plans the coming week. Use when Dave says "/learn-review", asks for a progress check-in, or roughly a week has passed since the profile was last updated.
---

# /learn-review — weekly adaptation

Turns session history into a personalized learner profile. This is the
adaptation loop described in `system/METHOD.md` — it's the only skill
allowed to rewrite `system/LEARNER_PROFILE.md`.

## Steps

1. **Gather.** Read every `progress/*.json` log since `LEARNER_PROFILE.md`'s
   `Last updated` date (and the full history the first time this runs).

2. **Analyze**, looking specifically for patterns with enough data points to
   be a real signal (say it plainly if there isn't enough data yet — don't
   manufacture a trend from two sessions):
   - Modality vs. retention: do quiz scores on cards from lab-paired modules
     beat cards from read-only modules?
   - Session length vs. accuracy: does accuracy drop off after some point?
   - Time-of-day patterns, if timestamps are logged.
   - Card format performance: cloze vs. Q&A vs. scenario-based.
   - Self-rated difficulty vs. actual quiz accuracy (is Dave's own sense of
     "I've got this" calibrated, or is he over/under-confident?).
   - Any open question from `LEARNER_PROFILE.md`'s "Open questions" section
     that now has enough evidence to answer.

3. **Update `system/LEARNER_PROFILE.md`.** Rewrite the "Known context",
   "Current defaults in effect", and "Open questions" sections based on
   findings. Every new claim in the profile should cite which progress logs
   support it (e.g. "confirmed across 2026-07-18, 2026-07-21, 2026-07-25
   logs"). Append a dated entry to the Revision log explaining what changed
   and why — don't silently overwrite prior reasoning.

4. **Re-plan.** Check `syllabus.md` progress across active modules and
   suggest what the coming week's `/learn` sessions should prioritize
   (catch-up on overdue cards, a module that's stalled, a cert nearing
   completion worth pushing to finish).

5. **Report.** Short summary to Dave: what changed in his profile and why,
   plus the coming week's plan. Ask him to sanity-check anything
   counterintuitive rather than asserting it as settled.

## Hard rules

- Never assert a learning-style conclusion without pointing to the specific
  `progress/` logs behind it — this file should stay evidence-based, not
  drift into generic advice.
- Small sample sizes get flagged as "early signal, not yet confirmed," not
  written in as settled fact.
