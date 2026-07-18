import { marked } from "marked";
import { setHTML } from "../dom";
import { loadSessionLog, exportProgress, importProgress } from "../storage";

const base = import.meta.env.BASE_URL;

export async function renderProfile(el: HTMLElement) {
  setHTML(el, `<div class="empty-state">Loading…</div>`);

  const res = await fetch(`${base}content/learner-profile.md`);
  const md = res.ok ? await res.text() : "_LEARNER_PROFILE.md not found — run the build script._";
  const html = await marked.parse(md);
  const log = loadSessionLog();

  setHTML(el, `
    <h1>Learner Profile</h1>
    <p>${log.length} session(s) logged on this device. This file is rewritten by <code>/learn-review</code> as evidence accumulates.</p>
    <div class="markdown-body card-panel">${html}</div>

    <h2>Your data</h2>
    <div class="card-panel">
      <p>Progress lives in this browser's storage. Export it to back it up or move it to another device; import to restore.</p>
      <div class="btn-row">
        <button class="btn secondary" id="export-btn">Export progress</button>
        <button class="btn secondary" id="import-btn">Import progress</button>
      </div>
      <input type="file" id="import-file" accept="application/json" style="display:none" />
    </div>
  `);

  document.getElementById("export-btn")?.addEventListener("click", () => {
    const blob = new Blob([exportProgress()], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `learn-progress-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  const fileInput = document.getElementById("import-file") as HTMLInputElement;
  document.getElementById("import-btn")?.addEventListener("click", () => fileInput.click());
  fileInput?.addEventListener("change", async () => {
    const file = fileInput.files?.[0];
    if (!file) return;
    importProgress(await file.text());
    renderProfile(el);
  });
}
