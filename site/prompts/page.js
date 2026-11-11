/* Tabs (#build / #library) and the AI assistant switch. */
(function () {
  "use strict";
  const AI = window.SC_ASSISTANT;
  const $ = (s) => document.querySelector(s);
  const LIBRARY = /^(library|quick-start|chains|rules|s-\d|p-\d)/;   // anchors that live in the library

  function show() {
    const lib = LIBRARY.test(location.hash.slice(1));
    document.body.classList.toggle("is-library", lib);
    $("#builder").hidden = lib;
    $("#main").hidden = !lib;
    $("#tab-build").setAttribute("aria-selected", String(!lib));
    $("#tab-library").setAttribute("aria-selected", String(lib));
    // the library script scrolls to its anchor before this shows the panel, so scroll again once it's visible
    const el = lib && document.getElementById(location.hash.slice(1));
    if (el) requestAnimationFrame(() => el.scrollIntoView({ block: "start" }));
  }
  window.addEventListener("hashchange", show);
  show();

  const NOTES = {
    claude: "Prompts start with a line that loads the Smart Communications brand skills, so Claude can build decks, PDFs and social tiles on brand.",
    other: "Prompts start with a short brand brief instead (voice, product names, colors and fonts), so Copilot, ChatGPT, Gemini or any other assistant writes on brand.",
  };
  function sync() {
    document.querySelectorAll("#pl-assistant button").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.ai === AI.mode)));
    $("#pl-assistant-note").textContent = NOTES[AI.mode];
  }
  $("#pl-assistant").addEventListener("click", (e) => {
    const b = e.target.closest("[data-ai]");
    if (b) AI.set(b.dataset.ai);
  });
  AI.onChange(sync);
  sync();
})();
