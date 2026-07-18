import { fetchQuiz } from "../api";
import { appendSessionLog } from "../storage";
import { setHTML } from "../dom";
import type { QuizQuestion } from "../types";

export async function renderQuiz(el: HTMLElement, track: string, module: string) {
  setHTML(el, `<div class="empty-state">Loading…</div>`);

  const questions = await fetchQuiz(track, module);
  if (!questions || questions.length === 0) {
    setHTML(el, `
      <h1>${track} — ${module}</h1>
      <div class="empty-state">No quiz questions yet for this module. Run <code>/learn-cards</code> after ingesting notes.</div>
    `);
    return;
  }

  // Interleave: shuffle once per session rather than presenting in file order.
  const shuffled = [...questions].sort(() => Math.random() - 0.5);

  let index = 0;
  let correct = 0;
  let answered = false;
  const startedAt = Date.now();

  function renderQuestion() {
    const q: QuizQuestion = shuffled[index];
    setHTML(el, `
      <h1>${track} — ${module} quiz</h1>
      <div class="progress-bar"><div class="fill" style="width:${(index / shuffled.length) * 100}%"></div></div>
      <p style="font-size:0.8rem;">Question ${index + 1} of ${shuffled.length} · blueprint ${escapeHtml(q.blueprint_ref)}</p>
      <div class="card-panel">
        <p style="color:var(--text);font-size:1.02rem;">${escapeHtml(q.question)}</p>
        <div id="choices">
          ${Object.entries(q.choices)
            .map(([key, text]) => `<button class="choice" data-key="${key}">${escapeHtml(text)}</button>`)
            .join("")}
        </div>
        <div id="feedback"></div>
      </div>
    `);

    el.querySelectorAll<HTMLButtonElement>(".choice").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (answered) return;
        answered = true;
        const chosen = btn.dataset.key!;
        const isCorrect = chosen === q.answer;
        if (isCorrect) correct++;

        el.querySelectorAll<HTMLButtonElement>(".choice").forEach((b) => {
          if (b.dataset.key === q.answer) b.classList.add("correct");
          else if (b.dataset.key === chosen) b.classList.add("incorrect");
        });

        const feedback = document.getElementById("feedback")!;
        setHTML(
          feedback,
          `<div class="explanation">${isCorrect ? "Correct. " : "Not quite. "}${escapeHtml(q.explanation)}</div>
           <button class="btn" id="next" style="margin-top:0.75rem;">${index + 1 < shuffled.length ? "Next" : "Finish"}</button>`
        );
        document.getElementById("next")!.addEventListener("click", () => {
          answered = false;
          index++;
          if (index >= shuffled.length) finishSession();
          else renderQuestion();
        });
      });
    });
  }

  function finishSession() {
    const durationSec = Math.round((Date.now() - startedAt) / 1000);
    appendSessionLog({
      date: new Date().toISOString(),
      track,
      module,
      modalities: ["quiz"],
      duration_sec: durationSec,
      cards_reviewed: 0,
      quiz_correct: correct,
      quiz_total: shuffled.length,
    });
    setHTML(el, `
      <h1>${track} — ${module} quiz</h1>
      <div class="empty-state">
        ${correct} / ${shuffled.length} correct (${Math.round((correct / shuffled.length) * 100)}%)
        <div class="btn-row" style="margin-top:1rem;">
          <a class="btn" href="#/">Dashboard</a>
          <a class="btn secondary" href="#/quiz/${track}/${module}">Retry</a>
        </div>
      </div>
    `);
  }

  renderQuestion();
}

function escapeHtml(s: string): string {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}
