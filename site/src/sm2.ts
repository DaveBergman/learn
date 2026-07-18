import type { Grade, ReviewState } from "./types";

// SM-2 (SuperMemo-2), per system/METHOD.md. UI exposes 3 buttons mapped to
// the classic 0-5 quality scale: again=2 (fail, reset), hard=3 (pass, low
// confidence), good=5 (pass, high confidence).
const GRADE_QUALITY: Record<Grade, number> = { again: 2, hard: 3, good: 5 };

export function isDue(state: ReviewState, now: Date = new Date()): boolean {
  if (state.due === null) return true;
  return new Date(state.due).getTime() <= now.getTime();
}

export function nextReview(state: ReviewState, grade: Grade, now: Date = new Date()): ReviewState {
  const quality = GRADE_QUALITY[grade];
  let { interval, ease, reps } = state;

  if (quality < 3) {
    // Failed recall: reset repetitions, review again soon.
    reps = 0;
    interval = 0;
  } else {
    reps += 1;
    if (reps === 1) interval = 1;
    else if (reps === 2) interval = 6;
    else interval = Math.round(interval * ease);
  }

  ease = Math.max(1.3, ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));

  const due = new Date(now);
  due.setDate(due.getDate() + (interval === 0 ? 0 : interval));
  if (interval === 0) due.setMinutes(due.getMinutes() + 10); // "again" cards resurface same session

  return { interval, ease: Math.round(ease * 100) / 100, due: due.toISOString(), reps };
}

export function freshReviewState(): ReviewState {
  return { interval: 0, ease: 2.5, due: null, reps: 0 };
}
