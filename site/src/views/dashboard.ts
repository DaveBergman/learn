import { fetchManifest, fetchDeck } from "../api";
import { loadReviewOverrides, loadSessionLog } from "../storage";
import { isDue, freshReviewState } from "../sm2";
import { setHTML } from "../dom";

export async function renderDashboard(el: HTMLElement) {
  setHTML(el, `<div class="empty-state">Loading…</div>`);

  const manifest = await fetchManifest();
  const overrides = loadReviewOverrides();
  const log = loadSessionLog();

  let totalDue = 0;
  let totalCards = 0;
  const deckRows: string[] = [];

  for (const entry of manifest.decks) {
    const deck = await fetchDeck(entry.file);
    totalCards += deck.cards.length;
    const due = deck.cards.filter((c) => {
      const state = overrides[c.id] ?? c.review ?? freshReviewState();
      return isDue(state);
    }).length;
    totalDue += due;

    deckRows.push(`
      <div class="card-panel">
        <div style="display:flex;justify-content:space-between;align-items:center;">
          <div>
            <strong>${deck.track} — ${deck.module}</strong>
            <div style="font-size:0.8rem;color:var(--text-dim);margin-top:0.2rem;">
              ${deck.cards.length} cards · <span class="badge">${due} due</span>
            </div>
          </div>
        </div>
        <div class="btn-row">
          <a class="btn" href="#/cards/${entry.track}/${entry.module}">Drill cards</a>
          <a class="btn secondary" href="#/quiz/${entry.track}/${entry.module}">Quiz</a>
        </div>
      </div>
    `);
  }

  const streak = computeStreak(log);
  const lastSession = log[log.length - 1];

  setHTML(el, `
    <h1>Today</h1>
    <div class="stat-row">
      <div class="stat-tile"><span class="num">${totalDue}</span><span class="label">cards due</span></div>
      <div class="stat-tile"><span class="num">${streak}</span><span class="label">day streak</span></div>
      <div class="stat-tile"><span class="num">${totalCards}</span><span class="label">total cards</span></div>
    </div>

    ${lastSession ? `<p>Last session: ${new Date(lastSession.date).toLocaleDateString()} — ${lastSession.track}/${lastSession.module}, ${lastSession.quiz_correct}/${lastSession.quiz_total} quiz correct.</p>` : `<p>No sessions logged yet — run <code>/learn</code> or drill a deck below to get started.</p>`}

    <h2>Decks</h2>
    ${deckRows.join("") || `<div class="empty-state">No decks yet. Run <code>/learn-ingest</code> then <code>/learn-cards</code> to populate one.</div>`}
  `);
}

function computeStreak(log: { date: string }[]): number {
  if (log.length === 0) return 0;
  const days = new Set(log.map((e) => new Date(e.date).toDateString()));
  let streak = 0;
  const cursor = new Date();
  while (days.has(cursor.toDateString())) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
