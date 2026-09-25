/* Smart Communications brand guide — behavior. No dependencies. */
(() => {
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

  /* ---- Toast ------------------------------------------------------------------ */
  const toast = $("#toast");
  let toastTimer;
  function say(html) {
    toast.innerHTML = html;
    toast.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-on"), 1800);
  }

  /* ---- Disclosure (sections + sub-panels) --------------------------------------------
     APG accordion pattern. Closed panels use hidden="until-found" so browser
     find-in-page still reaches the text and opens the panel. */
  function setOpen(btn, open) {
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    btn.setAttribute("aria-expanded", String(open));
    if (open) panel.removeAttribute("hidden");
    else panel.setAttribute("hidden", "until-found");
    const label = btn.querySelector("[data-state]");
    if (label) label.textContent = open ? "Hide" : "Show";
  }
  const toggles = $$("[data-toggle]");
  toggles.forEach((btn) => {
    const panel = document.getElementById(btn.getAttribute("aria-controls"));
    setOpen(btn, btn.getAttribute("aria-expanded") === "true");
    btn.addEventListener("click", () => {
      const open = btn.getAttribute("aria-expanded") !== "true";
      setOpen(btn, open);
      if (open && btn.dataset.toggle === "section") history.replaceState(null, "", "#" + btn.closest("[id]").id);
    });
    panel.addEventListener("beforematch", () => setOpen(btn, true));
  });

  const allBtn = $("#toggle-all");
  function syncAllBtn() {
    const anyClosed = $$('[data-toggle="section"]').some((b) => b.getAttribute("aria-expanded") !== "true");
    allBtn.textContent = anyClosed ? "Expand all" : "Collapse all";
  }
  allBtn.addEventListener("click", () => {
    const open = allBtn.textContent === "Expand all";
    toggles.forEach((b) => setOpen(b, open));
    syncAllBtn();
  });
  toggles.forEach((b) => b.addEventListener("click", syncAllBtn));

  /* Open the section a link points at (nav, deep link, in-page links). */
  function reveal(id, scroll) {
    const target = document.getElementById(id);
    if (!target) return;
    const btn = $('[data-toggle="section"]', target);
    if (btn && btn.getAttribute("aria-expanded") !== "true") setOpen(btn, true);
    for (let el = target; el; el = el.parentElement) {
      if (el.hasAttribute("hidden")) {
        const owner = $(`[aria-controls="${el.id}"]`);
        if (owner) setOpen(owner, true);
      }
    }
    syncAllBtn();
    if (scroll) target.scrollIntoView({ block: "start" });
  }
  document.addEventListener("click", (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || a.getAttribute("href").length < 2 || a.classList.contains("skip-link")) return;
    const id = a.getAttribute("href").slice(1);
    if (!document.getElementById(id)) return;
    e.preventDefault();
    reveal(id, true);
    history.pushState(null, "", "#" + id);
  });
  window.addEventListener("hashchange", () => reveal(location.hash.slice(1), true));
  if (location.hash.length > 1) requestAnimationFrame(() => reveal(location.hash.slice(1), true));

  /* ---- Nav: stuck state + scroll spy ---------------------------------------------------- */
  const nav = $(".topnav");
  const hero = $(".hero");
  const navLinks = $$(".topnav ol a");
  const spyTargets = navLinks.map((a) => document.getElementById(a.hash.slice(1))).filter(Boolean);
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    nav.classList.toggle("is-stuck", window.scrollY >= hero.offsetHeight);
    // Current section = the last one whose top has passed under the nav; the last one at page end.
    const atEnd = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4;
    let current = atEnd ? spyTargets[spyTargets.length - 1] : null;
    if (!current) for (const t of spyTargets) if (t.getBoundingClientRect().top <= 140) current = t;
    navLinks.forEach((a) => {
      if (current && a.hash === "#" + current.id) a.setAttribute("aria-current", "location");
      else a.removeAttribute("aria-current");
    });
  };
  window.addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  /* ---- Clipboard --------------------------------------------------------------------------- */
  function legacyCopy(text) {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:-100px;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  }
  async function copy(text, msg) {
    const active = document.activeElement;
    let ok = false;
    try { await navigator.clipboard.writeText(text); ok = true; } catch { ok = legacyCopy(text); }
    if (active && active.focus) active.focus({ preventScroll: true });
    say(ok ? msg : "Couldn’t copy — the value is " + text);
  }

  /* ---- Color ---------------------------------------------------------------------------------- */
  const C = window.SC_COLORS;
  const rgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
  const lum = (hex) => {
    const [r, g, b] = rgb(hex).map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + 0.05) / (y + 0.05); };
  const inkFor = (hex) => (ratio("#FFFFFF", hex) >= ratio("#0E2030", hex) ? "#FFFFFF" : "#0E2030");

  // CMYK + closest PMS (Solid Coated) under each swatch, from SC_PRINT in data.js
  function printLines(hex) {
    const p = (window.SC_PRINT || {})[hex.toUpperCase()];
    if (!p) return "";
    const cmyk = `<span class="swatch__rgb">CMYK ${p.cmyk.join(" ")}</span>`;
    const pms = p.pms
      ? `<span class="swatch__rgb">PMS ${p.pms}${p.de > 6 ? " <em>(loose match)</em>" : ""}</span>`
      : `<span class="swatch__rgb">PMS — ${p.note.toLowerCase()}</span>`;
    return cmyk + pms;
  }

  function swatch(name, step, hex, isDefault) {
    const li = document.createElement("li");
    const ink = inkFor(hex);
    li.innerHTML = `
      <button type="button" class="swatch${isDefault ? " is-default" : ""}" data-hex="${hex}" data-name="${name}${step ? " " + step : ""}"
        aria-label="Copy ${name}${step ? " " + step : ""}, ${hex}">
        <span class="swatch__chip" style="background:${hex}">
          ${step ? `<span class="swatch__step${ratio(ink, hex) < 4.5 ? " is-backed" : ""}" style="color:${ink}">${step}</span>` : ""}
          <span class="swatch__copy" aria-hidden="true">Copy</span>
        </span>
        <span class="swatch__hex">${hex}</span>
        <span class="swatch__rgb">RGB ${rgb(hex).join(", ")}</span>
        ${printLines(hex)}
      </button>`;
    return li;
  }

  const palette = $("#palette");
  if (palette) {
    C.groups.forEach((g) => {
      const wrap = document.createElement("div");
      wrap.className = "palette-group";
      wrap.innerHTML = `<h3>${g.name}</h3><p>${g.note}</p>`;
      g.families.forEach((f) => {
        const fam = document.createElement("div");
        fam.className = "family";
        fam.innerHTML = `<h4>${f.name}<small>${f.role}</small></h4>`;
        const ul = document.createElement("ul");
        ul.className = "ramp";
        f.ramp.forEach((hex, i) => ul.appendChild(swatch(f.name, C.steps[i], hex, i === 2)));
        fam.appendChild(ul);
        wrap.appendChild(fam);
      });
      palette.appendChild(wrap);
    });
    const util = document.createElement("div");
    util.className = "palette-group";
    util.innerHTML = `<h3>Utility + text</h3><p>Supporting values. Regal is for body text on light print pieces — it is not a seventh brand color.</p>`;
    const ul = document.createElement("ul");
    ul.className = "ramp";
    ul.style.marginTop = "18px";
    C.utility.forEach((u) => {
      const li = swatch(u.name, "", u.hex, false);
      li.querySelector(".swatch__rgb").insertAdjacentHTML("beforebegin", `<span class="swatch__rgb" style="color:var(--text-strong);font-weight:500">${u.name} · ${u.role}</span>`);
      ul.appendChild(li);
    });
    util.appendChild(ul);
    palette.appendChild(util);

    palette.addEventListener("click", (e) => {
      const b = e.target.closest(".swatch");
      if (b) copy(b.dataset.hex, `<i style="background:${b.dataset.hex}"></i>Copied ${b.dataset.hex} · ${b.dataset.name}`);
    });
  }

  const prop = $("#proportions");
  if (prop) {
    prop.innerHTML = C.proportions.map((p) =>
      `<div style="flex:${p.flex};background:${p.hex}" title="${p.name} — ${p.role}"><span>${p.name}<br>${p.role}</span></div>`).join("");
  }

  const chart = $("#chart-colors");
  if (chart) chart.innerHTML = C.chart.map((c, i) => `<li><i style="background:${c.hex}"></i>${i + 1}. ${c.name} <code>${c.hex}</code></li>`).join("");

  const contrast = $("#contrast-rows");
  if (contrast) {
    contrast.innerHTML = C.pairs.map((p) => {
      const r = ratio(p.fg, p.bg);
      const badge = r >= 4.5 ? '<span class="badge badge--pass">AA · all text</span>'
        : r >= 3 ? '<span class="badge badge--large">AA · large text only</span>'
        : '<span class="badge badge--fail">Fails · decoration only</span>';
      return `<tr><td><span class="sample" style="color:${p.fg};background:${p.bg};box-shadow:inset 0 0 0 1px rgba(3,16,44,.08)">${p.label}</span></td>
        <td>${r.toFixed(2)} : 1</td><td>${badge}</td></tr>`;
    }).join("");
  }

  /* ---- Placeholder links ---------------------------------------------------------------------------- */
  $$("[data-link]").forEach((a) => {
    const url = (window.SC_LINKS || {})[a.dataset.link];
    if (url) {
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      a.insertAdjacentHTML("beforeend", '<span class="visually-hidden"> (opens in a new tab)</span>');
    } else {
      a.removeAttribute("href");
      a.setAttribute("role", "link");
      a.setAttribute("aria-disabled", "true");
      a.insertAdjacentHTML("beforeend", ' <span class="pending-tag">Link coming</span>');
    }
  });

  /* ---- SVG → PNG download ---------------------------------------------------------------------------- */
  async function svgToPng(url, filename, targetWidth) {
    const text = await (await fetch(url)).text();
    const doc = new DOMParser().parseFromString(text, "image/svg+xml");
    const svg = doc.documentElement;
    const vb = (svg.getAttribute("viewBox") || "").split(/[\s,]+/).map(Number);
    const w = parseFloat(svg.getAttribute("width")) || vb[2] || 512;
    const h = parseFloat(svg.getAttribute("height")) || vb[3] || 512;
    const scale = targetWidth / w;
    svg.setAttribute("width", Math.round(w * scale));
    svg.setAttribute("height", Math.round(h * scale));
    const blob = new Blob([new XMLSerializer().serializeToString(svg)], { type: "image/svg+xml" });
    const src = URL.createObjectURL(blob);
    const img = new Image();
    img.src = src;
    await img.decode();
    const canvas = document.createElement("canvas");
    canvas.width = Math.round(w * scale);
    canvas.height = Math.round(h * scale);
    canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
    URL.revokeObjectURL(src);
    canvas.toBlob((png) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(png);
      a.download = filename;
      a.click();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      say(`Downloaded ${filename} · ${canvas.width}×${canvas.height}px`);
    }, "image/png");
  }
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-png]");
    if (!b) return;
    svgToPng(b.dataset.png, b.dataset.filename, Number(b.dataset.width || 2000)).catch(() => say("PNG export failed — use the SVG instead."));
  });

  /* ---- Icons -------------------------------------------------------------------------------------------- */
  const grid = $("#icon-grid");
  if (grid) {
    const board = $("#icon-board");
    const input = $("#icon-search");
    const count = $("#icon-count");
    const dialog = $("#icon-dialog");
    let variant = "dark";

    const render = () => {
      const q = input.value.trim().toLowerCase();
      const list = window.SC_ICONS.filter((i) => !q || `${i.slug} ${i.label} ${i.tags}`.toLowerCase().includes(q));
      grid.innerHTML = list.map((i) => `
        <li><button type="button" class="icon-btn" data-slug="${i.slug}" aria-label="${i.label} — open download options">
          <img src="assets/icons/${variant}/${i.slug}.svg" alt="" loading="lazy" width="44" height="44">
          <span>${i.label}</span></button></li>`).join("") || "";
      $("#icon-empty").hidden = list.length > 0;
      count.textContent = `${list.length} of ${window.SC_ICONS.length} icons`;
    };
    input.addEventListener("input", render);
    $$("#icon-variant button").forEach((b) => b.addEventListener("click", () => {
      variant = b.dataset.variant;
      $$("#icon-variant button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
      board.classList.toggle("is-dark", variant === "white");
      render();
    }));
    render();

    grid.addEventListener("click", (e) => {
      const b = e.target.closest(".icon-btn");
      if (!b) return;
      const icon = window.SC_ICONS.find((i) => i.slug === b.dataset.slug);
      $("#icon-dialog-title").textContent = icon.label;
      $("#icon-dialog-slug").textContent = icon.slug + ".svg";
      $("#icon-dialog-dark").src = `assets/icons/dark/${icon.slug}.svg`;
      $("#icon-dialog-white").src = `assets/icons/white/${icon.slug}.svg`;
      $("#icon-dialog-actions").innerHTML = ["dark", "white"].map((v) => `
        <a class="btn btn--sm" href="assets/icons/${v}/${icon.slug}.svg" download="SC_icon_${icon.slug}_${v}.svg">${v === "dark" ? "Dark" : "White"} SVG</a>
        <button type="button" class="btn btn--sm btn--ghost" data-png="assets/icons/${v}/${icon.slug}.svg" data-filename="SC_icon_${icon.slug}_${v}.png" data-width="512">${v === "dark" ? "Dark" : "White"} PNG</button>`).join("");
      dialog.showModal();
    });
    $("#icon-dialog-close").addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (e) => { if (e.target === dialog) dialog.close(); });
  }

  /* ---- Naming checker ---------------------------------------------------------------------------------- */
  const checker = $("#name-check");
  if (checker) {
    const out = $("#name-check-result");
    const products = ["IQ", "COMM", "PATH", "HUB", "DX"];
    const rules = [
      ...products.map((p) => ({
        re: new RegExp(`\\bSmart[\\s\\-_.]*${p}\\b`, "gi"),
        test: (m) => m !== "Smart" + p,
        fix: "Smart" + p
      })),
      { re: /\bSmart\s?Comms?\b(?!unication)/g, test: () => true, fix: "SmartCOMM (product) or Smart Communications (company)" },
      { re: /\b(SIQ|SCOMM|SPATH|SHUB|SDX)\b/g, test: () => true, fix: "the full product name — never abbreviate" },
      { re: /\bConversation\s*cloud\b/gi, test: (m) => m !== "Conversation Cloud", fix: "Conversation Cloud" },
      { re: /\bSmart Communication\b(?!s)/g, test: () => true, fix: "Smart Communications" },
      { re: /\bSmartCommunications\b/g, test: () => true, fix: "Smart Communications (two words)" },
      { re: /\b(colour|centre|organis(e|ed|ing|ation)|personalis(e|ed|ation)|optimis(e|ed|ation)|customis(e|ed|ation))\b/gi, test: () => true, fix: "American spelling (color, center, organize, personalize)" }
    ];
    const esc = (s) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
    const run = () => {
      const text = checker.value;
      if (!text.trim()) { out.innerHTML = ""; return; }
      const hits = [];
      rules.forEach((r) => {
        for (const m of text.matchAll(r.re)) if (r.test(m[0])) hits.push({ found: m[0], fix: r.fix });
      });
      const firsts = {};
      products.forEach((p) => {
        const all = [...text.matchAll(new RegExp(`\\bSmart${p}(™)?`, "g"))];
        if (all.length && !all[0][1]) firsts[p] = true;
      });
      const tm = Object.keys(firsts).map((p) => `Add ™ to the first mention of <b>Smart${p}</b> in formal materials.`);
      if (!hits.length && !tm.length) {
        out.innerHTML = '<p class="checker__ok">Looks good — no naming issues found.</p>';
        return;
      }
      out.innerHTML = `<p class="checker__bad">${hits.length} naming issue${hits.length === 1 ? "" : "s"} found</p><ul>${
        hits.map((h) => `<li><mark>${esc(h.found)}</mark> → use ${esc(h.fix)}</li>`).join("")}${
        tm.map((t) => `<li>${t}</li>`).join("")}</ul>`;
    };
    let t;
    checker.addEventListener("input", () => { clearTimeout(t); t = setTimeout(run, 200); });
    run();
  }

  /* ---- Proxima Nova availability (specimens fall back to Arial) ------------------------------------------ */
  const note = $("#proxima-note");
  if (note) {
    const c = document.createElement("canvas").getContext("2d");
    const w = (f) => { c.font = `72px ${f}`; return c.measureText("Every letter, on brand. 0123").width; };
    const installed = w('"Proxima Nova", monospace') !== w("monospace");
    note.innerHTML = installed
      ? "<strong>Proxima Nova is installed</strong> on this device, so the samples below render in the brand face."
      : "<strong>Showing Arial</strong> — Proxima Nova isn't installed on this device. Arial is the approved fallback until the Proxima files are in place.";
  }
})();
