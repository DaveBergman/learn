import { marked } from "marked";
import { setHTML } from "../dom";

const base = import.meta.env.BASE_URL;

interface ContentManifest {
  modules: {
    track: string;
    module: string;
    syllabus: string | null;
    labs: { slug: string; file: string }[];
  }[];
}

async function fetchContentManifest(): Promise<ContentManifest> {
  const res = await fetch(`${base}content/manifest.json`);
  if (!res.ok) throw new Error(`content manifest fetch failed: ${res.status}`);
  return res.json();
}

export async function renderLabsIndex(el: HTMLElement) {
  setHTML(el, `<div class="empty-state">Loading…</div>`);
  const manifest = await fetchContentManifest();

  const rows = manifest.modules
    .map((m) => `
      <div class="card-panel">
        <strong>${m.track} — ${m.module}</strong>
        <div style="margin-top:0.6rem;display:flex;flex-direction:column;gap:0.4rem;">
          ${m.syllabus ? `<a class="btn secondary" href="#/syllabus/${m.track}/${m.module}">Syllabus</a>` : ""}
          ${m.labs.map((l) => `<a class="btn secondary" href="#/lab/${m.track}/${m.module}/${l.slug}">Lab: ${l.slug}</a>`).join("")}
        </div>
      </div>
    `)
    .join("");

  setHTML(el, `<h1>Syllabus &amp; Labs</h1>${rows || `<div class="empty-state">Nothing ingested yet.</div>`}`);
}

export async function renderMarkdownContent(el: HTMLElement, kind: "syllabus" | "labs", path: string, title: string) {
  setHTML(el, `<div class="empty-state">Loading…</div>`);
  const res = await fetch(`${base}content/${kind}/${path}`);
  if (!res.ok) {
    setHTML(el, `<div class="empty-state">Not found: ${escapeHtml(path)}</div>`);
    return;
  }
  const md = await res.text();
  const html = await marked.parse(md);
  setHTML(el, `<p><a href="#/labs">&larr; back</a></p><h1>${escapeHtml(title)}</h1><div class="markdown-body">${html}</div>`);
}

function escapeHtml(s: string): string {
  const div = document.createElement("div");
  div.textContent = s;
  return div.innerHTML;
}
