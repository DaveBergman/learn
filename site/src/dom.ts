import DOMPurify from "dompurify";

// Every dynamic-HTML render in this app goes through here so it's always
// sanitized — views build template strings, but nothing reaches the DOM
// without a DOMPurify pass first.
export function setHTML(el: HTMLElement, html: string) {
  el["innerHTML"] = DOMPurify.sanitize(html);
}
