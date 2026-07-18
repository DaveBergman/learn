import type { ReviewState, SessionLogEntry } from "./types";

const REVIEW_KEY = "learn:reviews"; // { [cardId]: ReviewState }
const LOG_KEY = "learn:sessionLog"; // SessionLogEntry[]

type ReviewMap = Record<string, ReviewState>;

export function loadReviewOverrides(): ReviewMap {
  try {
    return JSON.parse(localStorage.getItem(REVIEW_KEY) ?? "{}");
  } catch {
    return {};
  }
}

export function saveReviewOverride(cardId: string, state: ReviewState) {
  const all = loadReviewOverrides();
  all[cardId] = state;
  localStorage.setItem(REVIEW_KEY, JSON.stringify(all));
}

export function loadSessionLog(): SessionLogEntry[] {
  try {
    return JSON.parse(localStorage.getItem(LOG_KEY) ?? "[]");
  } catch {
    return [];
  }
}

export function appendSessionLog(entry: SessionLogEntry) {
  const log = loadSessionLog();
  log.push(entry);
  localStorage.setItem(LOG_KEY, JSON.stringify(log));
}

export function exportProgress(): string {
  return JSON.stringify(
    {
      exported_at: new Date().toISOString(),
      reviews: loadReviewOverrides(),
      sessionLog: loadSessionLog(),
    },
    null,
    2
  );
}

export function importProgress(json: string) {
  const data = JSON.parse(json);
  if (data.reviews) localStorage.setItem(REVIEW_KEY, JSON.stringify(data.reviews));
  if (data.sessionLog) localStorage.setItem(LOG_KEY, JSON.stringify(data.sessionLog));
}
