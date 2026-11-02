/* Starter prompts page: search, type filter, copy. Data: prompts-data.js (window.SC_PROMPTS). */
(function () {
  "use strict";
  const DATA = window.SC_PROMPTS;
  const TYPES = ["Chat", "Research", "Execute"];
  const $ = (s) => document.querySelector(s);
  const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  const slug = (id) => "p-" + id.replace(".", "-");
  const byId = Object.fromEntries(DATA.prompts.map((p) => [p.id, p]));
  const typesOf = (p) => TYPES.filter((t) => p.type.includes(t));
  const skillsOf = (p) => [...new Set(p.skills.match(/smart-communications-[a-z-]+|deep-research/g) || [])];
  const typeTags = (p) => typesOf(p).map((t) => `<span class="pl-type pl-type--${t.toLowerCase()}">${t}</span>`)
    .join(p.type.includes("→") ? '<span class="pl-arrow" aria-hidden="true">→</span>' : "");
  let typeFilter = "All";
  try { typeFilter = localStorage.getItem("sc-prompt-type") || "All"; } catch (e) {}

  // brackets highlighted; the first line (which skills to load) set apart
  const fmt = (text) => text.split("\n").map((line, i) => {
    const h = esc(line).replace(/\[[^\]\n]+\]/g, (m) => `<span class="pl-br">${m}</span>`);
    return i === 0 && line.startsWith("Smart Communications task") ? `<span class="pl-first">${h}</span>` : h;
  }).join("\n");

  const card = (p) => {
    const long = p.text.split("\n").length > 9;
    const skills = skillsOf(p).map((s) => `<code>${s}</code>`).join("");
    return `<article class="pl-card" id="${slug(p.id)}">
      <div class="pl-card__head"><span class="pl-num">${p.id}</span><h3>${esc(p.title)}</h3><span class="pl-types">${typeTags(p)}</span></div>
      ${skills ? `<div class="pl-skills">${skills}</div>` : ""}
      <div class="pl-box${long ? "" : " is-open"}"><pre>${fmt(p.text)}</pre></div>
      ${p.add ? `<p class="pl-add"><strong>Add if you have:</strong> ${esc(p.add)}</p>` : ""}
      <div class="row pl-actions">
        <button class="btn btn--sm" type="button" data-copy="${p.id}">Copy prompt</button>
        ${long ? '<button class="btn btn--sm btn--ghost" type="button" data-expand aria-expanded="false">Show full prompt</button>' : ""}
      </div>
    </article>`;
  };

  const matches = (p, q) => {
    if (typeFilter !== "All" && !typesOf(p).includes(typeFilter)) return false;
    if (!q) return true;
    const sec = DATA.sections.find((s) => s.num === p.section);
    const hay = `${p.id} ${p.title} ${p.type} ${p.skills} ${p.text} ${p.add} ${sec ? sec.name : ""}`.toLowerCase();
    return q.toLowerCase().split(/\s+/).every((w) => hay.includes(w));
  };

  const RULES = [
    ["No invented facts", "No made-up statistics, customer names, quotes or logos. Illustrative figures are labeled."],
    ["Confidential stays confidential", "Share only the customer, employee or deal details the task needs. Never paste passwords or credentials."],
    ["A person approves", "Drafts don’t commit the company to pricing, dates or terms. Review before anything goes out."],
    ["Exact product names", "SmartCOMM™, SmartIQ™, SmartPATH™, SmartHUB™, SmartDX™, Conversation Cloud™. Never abbreviated."],
  ];

  function render() {
    const q = $("#pl-q").value.trim();
    const filtering = Boolean(q) || typeFilter !== "All";
    const shown = DATA.prompts.filter((p) => matches(p, q));
    $("#pl-count").textContent = `${shown.length} of ${DATA.prompts.length} prompts`;

    let html = "";
    if (!filtering) {
      html += `<section class="pl-block" id="quick-start"><h2>Quick start</h2><p class="pl-sub">The eight prompts people reach for most.</p><div class="pl-quick">` +
        DATA.quick.map((id) => `<a class="pl-qs" href="#${slug(id)}"><span class="pl-types">${typeTags(byId[id])}</span><strong>${esc(byId[id].title)}</strong></a>`).join("") +
        "</div></section>";
    }
    for (const s of DATA.sections) {
      const items = shown.filter((p) => p.section === s.num);
      if (items.length) html += `<section class="pl-block" id="s-${s.num}"><h2>${s.num}. ${esc(s.name)}</h2>${items.map(card).join("")}</section>`;
    }
    if (!shown.length) html += '<p class="pl-empty">No prompts match. Try a broader word or set the type back to All. You can also describe what you need to Claude and it will build a prompt for you.</p>';
    if (!filtering) {
      html += `<section class="pl-block" id="chains"><h2>Chaining prompts</h2><p class="pl-sub">Run these in order in the same chat and tell Claude to use the output above as the input, so research carries straight into the asset.</p><div class="pl-chains">` +
        DATA.chains.map((c) => `<div class="pl-chain"><strong>${esc(c.goal)}</strong><div class="pl-steps">${c.steps.map((st) => {
          const id = st.split(" ")[0];
          return byId[id] ? `<a href="#${slug(id)}">${esc(st)}</a>` : `<span>${esc(st)}</span>`;
        }).join('<span class="pl-arrow" aria-hidden="true">→</span>')}</div></div>`).join("") + "</div></section>";
      html += `<section class="pl-block" id="rules"><h2>Built into every prompt</h2><ul class="pl-rules">${RULES.map(([h, t]) => `<li><strong>${h}</strong>${t}</li>`).join("")}</ul>
        <p class="pl-sub">Have a prompt that works well? Share it with the brand team so it can be added here.</p></section>`;
    }
    $("#pl-list").innerHTML = html;

    $("#pl-rail").innerHTML = '<span class="pl-rail__label">Categories</span>' +
      DATA.sections.map((s) => {
        const n = shown.filter((p) => p.section === s.num).length;
        return n ? `<a href="#s-${s.num}">${esc(s.name)}<span>${n}</span></a>` : "";
      }).join("") + (filtering ? "" : '<a href="#chains">Chaining prompts</a>');

    $("#pl-types").innerHTML = ["All", ...TYPES].map((t) => `<button type="button" data-type="${t}" aria-pressed="${t === typeFilter}">${t}</button>`).join("");
  }

  let toastTimer;
  const toast = (msg) => {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("is-on"), 2200);
  };
  const selectText = (el) => { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); };

  document.addEventListener("click", (e) => {
    const c = e.target.closest("[data-copy]");
    if (c) {
      const p = byId[c.dataset.copy];
      const box = c.closest(".pl-card").querySelector(".pl-box");
      const ok = () => {
        c.textContent = "Copied";
        toast(`Copied “${p.title}”. Paste it into a new Claude chat.`);
        setTimeout(() => { c.textContent = "Copy prompt"; }, 2000);
      };
      const fail = () => { box.classList.add("is-open"); selectText(box.querySelector("pre")); toast("Prompt selected. Press Ctrl+C or ⌘C to copy."); };
      try { navigator.clipboard.writeText(p.text).then(ok, fail); } catch (err) { fail(); }
      return;
    }
    const x = e.target.closest("[data-expand]");
    if (x) {
      const open = x.closest(".pl-card").querySelector(".pl-box").classList.toggle("is-open");
      x.textContent = open ? "Show less" : "Show full prompt";
      x.setAttribute("aria-expanded", open);
      return;
    }
    const t = e.target.closest("[data-type]");
    if (t) {
      typeFilter = t.dataset.type;
      try { localStorage.setItem("sc-prompt-type", typeFilter); } catch (err) {}
      render();
    }
  });
  $("#pl-q").addEventListener("input", render);

  // a link to one prompt (#p-3-3) opens it even when a filter would hide it
  function openHash() {
    const id = location.hash.slice(1);
    if (!id) return;
    let el = document.getElementById(id);
    if (!el && id.startsWith("p-")) { $("#pl-q").value = ""; typeFilter = "All"; render(); el = document.getElementById(id); }
    if (!el) return;
    el.scrollIntoView({ block: "start" });
    if (el.classList.contains("pl-card")) { el.classList.add("is-flash"); setTimeout(() => el.classList.remove("is-flash"), 1600); }
  }
  window.addEventListener("hashchange", openHash);
  render();
  openHash();
})();
