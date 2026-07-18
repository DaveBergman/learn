import { fetchManifest, fetchDeck } from "../api";
import { loadReviewOverrides, saveReviewOverride, appendSessionLog } from "../storage";
import { isDue, nextReview, freshReviewState } from "../sm2";
import { setHTML } from "../dom";
import type { Card, Grade } from "../types";

export async function renderFlashcards(el: HTMLElement, track: string, module: string) {
  setHTML(el, `<div class="empty-state">Loading…</div>`);

  const manifest = await fetchManifest();
  const entry = manifest.decks.find((d) => d.track === track && d.module === module);
  if (!entry) {
    setHTML(el, `<div class="empty-state">No deck found for ${track}/${module}.</div>`);
    return;
  }
  const deck = await fetchDeck(entry.file);
  const overrides = loadReviewOverrides();

  const queue: Card[] = deck.cards
    .map((c) => ({ ...c, review: overrides[c.id] ?? c.review ?? freshReviewState() }))
    .filter((c) => isDue(c.review));

  if (queue.length === 0) {
    setHTML(el, `
      <h1>${track} — ${module}</h1>
      <div class="empty-state">Nothing due right now — nice work. Check back later, or <a href="#/">go to the dashboard</a>.</div>
    `);
    return;
  }

  let index = 0;
  let flipped = false;
  let reviewedCount = 0;
  const startedAt = Date.now();

  function renderCurrent() {
    const card = queue[index];
    setHTML(el, `
      <h1>${track} — ${module}</h1>
      <div class="progress-bar"><div class="fill" style="width:${(index / queue.length) * 100}%"></div></div>
      <p style="font-size:0.8rem;">${index + 1} of ${queue.length} due</p>
      <div class="flip-card${flipped ? " flipped" : ""}" id="flip">
        <div class="flip-inner">
          <div class="flip-face front">${escapeHtml(card.front)}</div>
          <div class="flip-face back">
            <div>${escapeHtml(card.back)}</div>
            <div class="src">${escapeHtml(card.source_url)}</div>
          </div>
        </div>
      </div>
      ${flipped ? `
        <div class="grade-row">
          <button class="grade-btn again" data-grade="again">Again</button>
          <button class="grade-btn hard" data-grade="hard">Hard</button>
          <button class="grade-btn good" data-grade="good">Good</button>
        </div>
      ` : `<p style="text-align:center;">Tap the card to reveal the answer</p>`}
    `);

    el.querySelector("#flip")?.addEventListener("click", () => {
      flipped = true;
      renderCurrent();
    });

    el.querySelectorAll<HTMLButtonElement>("[data-grade]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const grade = btn.dataset.grade as Grade;
        const card = queue[index];
        const updated = nextReview(card.review, grade, new Date());
        saveReviewOverride(card.id, updated);
        reviewedCount++;

        if (grade === "again") {
          // resurface later in this same queue rather than dropping it
          queue.push({ ...card, review: updated });
        }

        index++;
        flipped = false;
        if (index >= queue.length) {
          finishSession();
        } else {
          renderCurrent();
        }
      });
    });
  }

  function finishSession() {
    const durationSec = Math.round((Date.now() - startedAt) / 1000);
    appendSessionLog({
      date: new Date().toISOString(),
      track,
      module,
      modalities: ["cards"],
      duration_sec: durationSec,
      cards_reviewed: reviewedCount,
      quiz_correct: 0,
      quiz_total: 0,
    });
    setHTML(el, `
      <h1>${track} — ${module}</h1>
      <div class="empty-state">
        Session complete — ${reviewedCount} cards reviewed in ${durationSec}s.
        <div class="btn-row" style="margin-top:1rem;">
          <a class="btn" href="#/quiz/${track}/${module}">Take the quiz</a>
          <a class="btn secondary" href="#/">Dashboard</a>
        </div>
      </div>
    `);
  }

  renderCurrent();
}

function escapeHtml(s: string): string {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}
