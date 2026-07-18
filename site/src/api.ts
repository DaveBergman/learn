import type { Deck, DeckManifest, QuizQuestion } from "./types";

const base = import.meta.env.BASE_URL;

export async function fetchManifest(): Promise<DeckManifest> {
  const res = await fetch(`${base}decks/manifest.json`);
  if (!res.ok) throw new Error(`manifest fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchDeck(file: string): Promise<Deck> {
  const res = await fetch(`${base}decks/${file}`);
  if (!res.ok) throw new Error(`deck fetch failed: ${res.status}`);
  return res.json();
}

export async function fetchQuiz(track: string, module: string): Promise<QuizQuestion[] | null> {
  const res = await fetch(`${base}quizzes/${track}-${module}.json`);
  if (!res.ok) return null;
  const data = await res.json();
  return data.questions;
}
