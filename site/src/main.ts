import "./style.css";
import { setHTML } from "./dom";
import { renderDashboard } from "./views/dashboard";
import { renderFlashcards } from "./views/flashcards";
import { renderQuiz } from "./views/quiz";
import { renderLabsIndex, renderMarkdownContent } from "./views/labs";
import { renderProfile } from "./views/profile";

const app = document.querySelector<HTMLDivElement>("#app")!;

setHTML(
  app,
  `
  <div id="app-shell">
    <header class="topbar">
      <div class="brand">learn<span>.</span></div>
      <button id="theme-toggle" class="btn secondary" style="width:auto;padding:0.4rem 0.7rem;">◐</button>
    </header>
    <main id="view"></main>
    <nav class="tabbar">
      <a href="#/" data-route="/"><span class="icon">◆</span>Today</a>
      <a href="#/labs" data-route="/labs"><span class="icon">▤</span>Syllabus</a>
      <a href="#/profile" data-route="/profile"><span class="icon">◑</span>Profile</a>
    </nav>
  </div>
`
);

const viewEl = document.getElementById("view")!;
const tabLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>(".tabbar a"));

function setActiveTab(hash: string) {
  const top = "/" + (hash.replace(/^#\/?/, "").split("/")[0] ?? "");
  tabLinks.forEach((a) => a.classList.toggle("active", a.dataset.route === top || (top === "/" && a.dataset.route === "/")));
}

async function route() {
  const hash = window.location.hash || "#/";
  setActiveTab(hash);
  const parts = hash.replace(/^#\/?/, "").split("/").filter(Boolean);

  window.scrollTo(0, 0);

  if (parts.length === 0) {
    await renderDashboard(viewEl);
  } else if (parts[0] === "cards" && parts[1] && parts[2]) {
    await renderFlashcards(viewEl, parts[1], parts[2]);
  } else if (parts[0] === "quiz" && parts[1] && parts[2]) {
    await renderQuiz(viewEl, parts[1], parts[2]);
  } else if (parts[0] === "labs") {
    await renderLabsIndex(viewEl);
  } else if (parts[0] === "syllabus" && parts[1] && parts[2]) {
    await renderMarkdownContent(viewEl, "syllabus", `${parts[1]}-${parts[2]}.md`, `${parts[1]} — ${parts[2]} syllabus`);
  } else if (parts[0] === "lab" && parts[1] && parts[2] && parts[3]) {
    await renderMarkdownContent(viewEl, "labs", `${parts[1]}-${parts[2]}-${parts[3]}.md`, `Lab: ${parts[3]}`);
  } else if (parts[0] === "profile") {
    await renderProfile(viewEl);
  } else {
    await renderDashboard(viewEl);
  }
}

window.addEventListener("hashchange", route);

// Same-hash link clicks (e.g. "Retry quiz") don't fire hashchange, so
// intercept internal nav clicks and force a re-route when needed.
document.body.addEventListener("click", (e) => {
  const link = (e.target as HTMLElement)?.closest("a");
  if (!link) return;
  const href = link.getAttribute("href");
  if (!href || !href.startsWith("#/")) return;
  if (href === window.location.hash) {
    e.preventDefault();
    route();
  }
});

const THEME_KEY = "learn:theme";
function applyTheme(theme: string) {
  document.documentElement.setAttribute("data-theme", theme);
}
const savedTheme = localStorage.getItem(THEME_KEY);
if (savedTheme) applyTheme(savedTheme);

document.getElementById("theme-toggle")?.addEventListener("click", () => {
  const current = document.documentElement.getAttribute("data-theme") ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  applyTheme(next);
  localStorage.setItem(THEME_KEY, next);
});

route();
