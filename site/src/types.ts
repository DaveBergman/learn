export interface ReviewState {
  interval: number; // days
  ease: number; // SM-2 ease factor, starts 2.5
  due: string | null; // ISO date, null = never reviewed (due now)
  reps: number;
}

export interface Card {
  id: string;
  front: string;
  back: string;
  source_note?: string;
  source_url: string;
  review: ReviewState;
}

export interface Deck {
  track: string;
  module: string;
  cards: Card[];
}

export interface DeckManifestEntry {
  track: string;
  module: string;
  file: string;
  card_count: number;
}

export interface DeckManifest {
  decks: DeckManifestEntry[];
}

// SM-2 recall quality, 0-5. We expose a simplified 3-button UI (Again/Hard/Good)
// mapped onto the classic SM-2 grades.
export type Grade = "again" | "hard" | "good";

export interface QuizQuestion {
  id: string;
  blueprint_ref: string;
  question: string;
  choices: Record<string, string>;
  answer: string;
  explanation: string;
  source_note?: string;
}

export interface SessionLogEntry {
  date: string; // ISO
  track: string;
  module: string;
  modalities: string[];
  duration_sec: number;
  cards_reviewed: number;
  quiz_correct: number;
  quiz_total: number;
  self_rated_difficulty?: number; // 1-5
}
