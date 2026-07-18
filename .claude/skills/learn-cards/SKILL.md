---
name: learn-cards
description: Generate flashcards and blueprint-mapped quiz questions from already-ingested, fact-checked notes for a module. Use when Dave says "/learn-cards", asks to make flashcards or quiz questions for a topic, or after /learn-ingest adds new notes with no cards yet.
---

# /learn-cards <track> <module>

Turns already-verified notes into drillable flashcards and quiz items.
Cheap, high-volume — run on **haiku**. This skill does not discover new
facts; it only transforms `notes/` content that has already passed
`fact-checker` in `/learn-ingest`. If a note lacks a citation, stop and send
it back to `/learn-ingest` rather than inventing one.

## Steps

1. Read every file in `tracks/<track>/<module>/notes/` that doesn't yet have
   corresponding cards (cross-check against existing `cards/*.yaml`
   `source_note:` fields).

2. For each note, generate:
   - **Flashcards** (`cards/<note-slug>.yaml`): a list of cards, each with
     `front`, `back`, `source_note` (path), `source_url` (carried from the
     note's citation), and an empty `review:` block (SM-2 state: `interval`,
     `ease`, `due`, `reps` — left for `/learn` to populate after first
     review). Mix formats per METHOD.md — cloze deletion, direct Q&A, and
     (for Splunk) scenario-based "what SPL would you write for X" cards.
   - **Quiz questions** (`quiz/<note-slug>.yaml`): multiple-choice or
     short-answer items mapped to the specific `syllabus.md` blueprint line
     they test, each with the correct answer cited back to the source note.

3. Every card/question must carry a `source_note` and (transitively)
   resolve to a citation already verified in `sources.md` — do not add any
   fact not present in the note.

4. Report counts added per note and flag any note that was too thin to
   produce good retrieval questions from (signal back to `/learn-ingest`
   that it needs more depth).

## Hard rules

- Never write a card whose claim isn't traceable to an already-fact-checked
  note. This skill transforms verified content; it doesn't verify content
  itself.
- Keep cards atomic — one fact/concept per card, not compound questions
  that test three things at once (bad for spaced-repetition scheduling).
