/* Prompt builder: pick what you're making, fill in a short form, copy a ready prompt.
   Blank fields stay as [BRACKETS] so the prompt still reads, and the reader can fill them in the chat. */
(function () {
  "use strict";
  const AI = window.SC_ASSISTANT;
  const $ = (s, r = document) => r.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const PRODUCTS = ["Smart Communications platform", "SmartCOMM™", "SmartIQ™", "SmartPATH™", "SmartHUB™", "SmartDX™", "Conversation Cloud™"];
  const INDUSTRIES = ["P&C insurance", "Life insurance", "Health insurance", "Banking and financial services", "Healthcare",
    "Government and public sector", "Trade and logistics"];
  const AUDIENCES = ["Business decision-makers (C-suite, VP)", "IT and technical buyers", "Operations leaders", "Customer experience leaders",
    "Compliance and risk teams", "Marketing teams", "Existing customers", "Partners", "Our own team (internal)"];
  const REGIONS = ["Global", "North America", "UK and Europe", "APAC"];
  const ROLES = ["Marketing", "Field marketing", "Product marketing", "Sales", "Customer success", "Communications", "Design"];

  // shared fields: [id, label, kind, options or placeholder]
  const F = {
    role: ["role", "Your role", "select", ROLES],
    product: ["product", "Product", "select", PRODUCTS],
    industry: ["industry", "Industry", "select", INDUSTRIES],
    audience: ["audience", "Audience", "select", AUDIENCES],
    region: ["region", "Region", "select", REGIONS],
    topic: ["topic", "Topic or key message", "area", "What it's about, in a sentence or two"],
    goal: ["goal", "Goal or call to action", "text", "e.g. Book a demo, register for the webinar"],
    source: ["source", "Source material", "area", "Paste notes, links or release notes, or say you'll attach a file"],
    proof: ["proof", "Approved proof points", "area", "Stats, quotes or results you're cleared to use. Only these will be used."],
  };

  const TYPES = [
    { id: "social", name: "Social post", skills: ["brand", "social", "copy"], fields: [
      ["postType", "Post type", "select", ["Announcement or news", "Event or webinar promotion", "Report or content launch", "Thought leadership", "Customer story", "Hiring", "Award or recognition"]],
      ["format", "Format", "select", ["Square tile (1080 × 1080)", "Landscape tile (1200 × 627)", "Carousel (4–8 square frames)", "Text-only post"]],
      F.topic, F.audience, F.product, F.goal, ["url", "Link", "text", "https://"], F.proof],
      build: (v, c) => [
        `Create ${art(v.postType)} LinkedIn post about ${v.topic}. Format: ${v.format}.`,
        `Audience: ${v.audience}. Product: ${v.product}.`,
        `On-image copy: no more than 40 words, one call to action: ${v.goal} (${v.url}).`,
        `Also write the caption: a hook line, 1–3 sentences, the link and 0–3 hashtags.`,
        v.proof !== "[PROOF POINTS]" ? `Use only these proof points: ${v.proof}` : "",
        c ? "Show me the frame outline and spec first (recipe, surface, hex, type, logo, icons), then build the PNG." : "Show me the layout and on-image copy first, then the caption.",
      ] },
    { id: "brief", name: "Solution brief", skills: ["brand", "digital-pdf", "copy"], fields: [
      ["useCase", "Use case", "text", "e.g. claims correspondence, policy onboarding"],
      F.industry, F.product, F.audience, ["length", "Length", "select", ["2-page brief", "4–6 page eBook (US Letter)"]], F.source, F.proof],
      build: (v, c) => [
        `Create a solution brief on ${v.useCase} for ${v.industry} organizations, featuring ${v.product}.`,
        `Audience: ${v.audience}. Length: ${v.length}.`,
        `Structure: the challenge, what changes with ${v.product} (outcomes first), how it works, proof, and a closing call to action.`,
        `Source content: ${v.source}`,
        v.proof !== "[PROOF POINTS]" ? `Proof points I'm cleared to use: ${v.proof}` : "Mark every proof point I still need as [NEEDS PROOF].",
        c ? "Give me the page outline (recipe + title + content beats) and per-page spec first; build the PDF once I approve." : "Give me the page outline (title + content beats) first; write the page content once I approve.",
      ] },
    { id: "case", name: "Case study", skills: ["copy", "digital-pdf"], fields: [
      ["customer", "Customer", "text", "Name, or leave blank to anonymize"],
      ["approved", "Approved for public use?", "select", ["Yes, the customer has approved it", "No, anonymize it (e.g. “a top-10 US insurer”)"]],
      F.industry, F.product,
      ["format", "Format", "select", ["Web story (400 words) plus a 75-word sales summary", "One-page PDF", "One slide for a sales deck"]],
      ["notes", "Interview notes or approved details", "area", "Challenge, what they did, results, quotes"], F.proof],
      build: (v) => [
        `Turn these approved facts into a customer story about ${v.customer} (${v.industry}), featuring ${v.product}.`,
        `Approved for public use: ${v.approved}.`,
        `Format: ${v.format}.`,
        `Structure: challenge, what they did with ${v.product}, outcome (only numbers in my notes), quote (only quotes in my notes, word for word).`,
        `Notes: ${v.notes}`,
        v.proof !== "[PROOF POINTS]" ? `Results I'm cleared to use: ${v.proof}` : "",
        "Flag anything that looks like it needs customer sign-off.",
      ] },
    { id: "datasheet", name: "Data sheet", skills: ["brand", "digital-pdf", "copy"], fields: [
      F.product, ["capabilities", "Key capabilities", "area", "One per line"], ["integrations", "Integrations, specs or deployment", "area", "e.g. cloud, APIs, Salesforce, Guidewire"],
      F.audience, ["length", "Length", "select", ["1 page (US Letter)", "2 pages (US Letter)"]], F.source, F.proof],
      build: (v, c) => [
        `Create a data sheet for ${v.product}. Length: ${v.length}.`,
        `Audience: ${v.audience}.`,
        `Sections: a headline and one-line value proposition, key capabilities as outcome-led bullets, integrations and technical details, proof, and a call to action.`,
        `Key capabilities: ${v.capabilities}`,
        `Integrations, specs or deployment: ${v.integrations}`,
        `Source content: ${v.source}`,
        v.proof !== "[PROOF POINTS]" ? `Proof points I'm cleared to use: ${v.proof}` : "Mark every proof point I still need as [NEEDS PROOF].",
        c ? "Show me the outline and per-page spec first; build the PDF once I approve." : "Show me the outline first; write the content once I approve.",
      ] },
    { id: "whitepaper", name: "White paper or eBook", skills: ["digital-pdf", "copy"], fields: [
      F.topic, F.industry, F.audience, F.region,
      ["length", "Format", "select", ["eBook, 4–8 pages (US Letter)", "Report, 12–20 pages (US Letter)", "LinkedIn PDF carousel, 6–8 pages (15 × 8 in)"]],
      ["research", "Research the topic first?", "select", ["Yes, research it and show me sources first", "No, use only my source material"]], F.source],
      build: (v, c) => [
        `Create ${art(v.length)} on ${v.topic} for ${v.audience} in ${v.industry} (${v.region}).`,
        /^yes/i.test(v.research)
          ? "Step 1: research the topic from public sources and show me the key findings, each with a link and a date. Separate facts from interpretation."
          : `Use only this source material: ${v.source}`,
        `Step ${/^yes/i.test(v.research) ? 2 : 1}: once I approve, outline it page by page${c ? " with recipe names" : ""}, then ${c ? "build it" : "write it"}.`,
        "Only use statistics that appear in the sources, and cite each one.",
      ] },
    { id: "deck", name: "Presentation", skills: ["brand", "ppt"], fields: [
      ["meeting", "Meeting", "select", ["Discovery call", "Demo follow-up", "Executive briefing", "Quarterly business review", "Internal release briefing", "Webinar or event talk"]],
      ["account", "Account or event", "text", "Anonymize if you'll share the prompt"], F.industry, F.product,
      ["slides", "Number of slides", "select", ["5–8 slides", "8–12 slides", "12–20 slides"]],
      ["priorities", "What they care about", "area", "Their priorities, questions or the agenda"], F.proof],
      build: (v, c) => [
        `Build a Smart Communications presentation (${v.slides}) for ${art(v.meeting)} with ${v.account} (${v.industry}).`,
        `Products to feature: ${v.product}.`,
        `Their priorities: ${v.priorities}`,
        v.proof !== "[PROOF POINTS]" ? `Proof points I'm cleared to use: ${v.proof}` : "Use [NEEDS PROOF] wherever proof is missing.",
        "One idea per slide, body text at least 14 pt, no invented customer logos or statistics.",
        c ? "Show me the outline table (# · recipe · title · purpose) first, then build the .pptx with the slide builder."
          : "Show me the outline (# · title · purpose) first, then write the slide content. I'll build it in the 2026 master template.",
      ] },
    { id: "email", name: "Email", skills: ["copy"], fields: [
      ["emailType", "Email type", "select", ["Single email", "3-email nurture sequence", "5-email nurture sequence", "Event invitation sequence", "Follow-up after a meeting", "Internal announcement"]],
      F.audience, ["trigger", "Trigger or context", "text", "e.g. downloaded the benchmark report"], F.topic, F.goal, F.proof],
      build: (v) => [
        `Write ${art(v.emailType)} for ${v.audience}.`,
        `Context: ${v.trigger}. Topic: ${v.topic}.`,
        `Goal: ${v.goal}.`,
        "For each email: purpose, send timing, subject line (no more than 50 characters, no all caps), preview text, body (no more than 150 words, second person) and one call to action.",
        "Each email should earn the next; don't repeat the same pitch.",
        v.proof !== "[PROOF POINTS]" ? `Proof points I'm cleared to use: ${v.proof}` : "",
        "Don't commit to pricing, dates or terms.",
      ] },
    { id: "blog", name: "Blog post", skills: ["copy"], fields: [
      F.topic, F.audience, ["angle", "The one point readers should leave with", "text", ""],
      ["length", "Length", "select", ["600–800 words", "800–1,200 words", "1,200–1,600 words"]],
      ["keyword", "Search keyword (optional)", "text", ""], F.source, F.goal],
      build: (v) => [
        `Write a blog post for ${v.audience} on ${v.topic}. Length: ${v.length}.`,
        `Angle: ${v.angle}.`,
        /^\[/.test(v.keyword) ? "" : `Search keyword: ${v.keyword}.`,
        `Sources to use: ${v.source}. Cite every statistic with its source; don't invent any.`,
        `Structure: a title-case headline (10 words or fewer), a 2-sentence lede, 3–5 subheads, and a short close with one call to action: ${v.goal}.`,
        "Also give me a meta description (155 characters or fewer), 3 social pull quotes and a LinkedIn caption.",
      ] },
    { id: "landing", name: "Landing page", skills: ["copy", "brand"], fields: [
      ["offer", "Offer", "select", ["Report download", "Webinar registration", "Demo request", "Product page", "Event page"]],
      F.topic, F.audience, F.product, F.goal, F.proof],
      build: (v) => [
        `Write landing page copy for ${art(v.offer)} about ${v.topic}, for ${v.audience}. Product: ${v.product}.`,
        `Sections: hero (headline of 10 words or fewer, a lede of 35 words or fewer, one call to action: ${v.goal}), 3 benefit blocks (outcome headline + 1–2 sentences), a proof section, a 4-question FAQ and a closing call to action.`,
        v.proof !== "[PROOF POINTS]" ? `Use only this proof: ${v.proof}` : "Mark the proof section [NEEDS PROOF].",
      ] },
    { id: "webinar", name: "Webinar or event promotion", skills: ["copy", "social"], fields: [
      F.topic, ["date", "Date and time", "text", "e.g. 4 December, 11 am ET"], ["speakers", "Speakers and titles", "text", ""], F.audience, ["url", "Registration link", "text", "https://"]],
      build: (v) => [
        `We're running a webinar on ${v.topic} on ${v.date} with ${v.speakers}, for ${v.audience}.`,
        "Create: 3 title options (10 words or fewer), a 100-word abstract, 3 learning outcomes, registration page copy, 3 promo emails (announce, reminder, last chance), 2 LinkedIn posts with captions, and a follow-up email with a [RECORDING LINK] placeholder.",
        `Registration link: ${v.url}.`,
      ] },
    { id: "press", name: "Press release", skills: ["copy"], fields: [
      ["newsType", "News", "select", ["Product release", "Partnership", "Customer win", "Award or analyst recognition", "Company news"]],
      ["facts", "Facts", "area", "Who, what, when, where, approved numbers"], ["spokesperson", "Spokesperson and title", "text", ""]],
      build: (v) => [
        `Draft a press release announcing ${art(v.newsType)}.`,
        `Facts: ${v.facts}`,
        `Quote from ${v.spokesperson}: write a draft clearly marked DRAFT FOR APPROVAL.`,
        "Include a headline, subhead, dateline, body (400 words or fewer), [INSERT APPROVED BOILERPLATE] and a media contact placeholder.",
      ] },
    { id: "battlecard", name: "Battlecard", skills: ["copy"], fields: [
      ["competitor", "Competitor", "text", ""], F.industry, F.product],
      build: (v) => [
        `Create a battlecard: Smart Communications (${v.product}) vs ${v.competitor} for ${v.industry}.`,
        "Research the competitor from public sources only (website, analyst coverage, press, reviews) and link every claim.",
        "Sections: their positioning in one line, where they're strong, where we win (outcome-led), landmines to set, 5 objection and response pairs, and questions to ask the prospect.",
        "Keep it factual and fair, with no disparaging claims. Mark anything you couldn't verify.",
      ] },
  ];

  const state = { type: TYPES[0].id, values: {} };

  const KEEP_CASE = new Set(["product", "region", "role"]);
  // dropdown choices sit mid-sentence: lowercase the first letter unless it starts an acronym or a name
  const lc = (s) => (/^[A-Z][a-z]/.test(s) ? s[0].toLowerCase() + s.slice(1) : s);
  const art = (s) => (/^[aeiou]/i.test(s) ? "an " : "a ") + s;

  function value(f) {
    const v = (state.values[f[0]] || "").trim();
    if (!v) return `[${f[1].replace(/\?$/, "").toUpperCase()}]`;
    return f[2] === "select" && !KEEP_CASE.has(f[0]) ? lc(v) : v;
  }

  function prompt() {
    const t = TYPES.find((x) => x.id === state.type);
    const c = AI.mode === "claude";
    const v = {};
    t.fields.forEach((f) => { v[f[0]] = value(f); });
    v.proof = (state.values.proof || "").trim() || "[PROOF POINTS]";
    const head = c ? AI.skillsLine(["smart-communications-brand"].concat(t.skills.filter((s) => s !== "brand").map((s) => "smart-communications-" + s)))
      : AI.brand;
    const who = `I'm in ${(state.values.role || "").trim() || "[ROLE]"} at Smart Communications.`;
    return [head, who].concat(t.build(v, c).filter(Boolean)).join("\n");
  }

  function fieldHTML(f) {
    const [id, label, kind, opt] = f;
    const val = esc(state.values[id] || "");
    const ctl = kind === "select"
      ? `<select id="b-${id}" data-f="${id}"><option value="">Choose…</option>${opt.map((o) => `<option${o === state.values[id] ? " selected" : ""}>${esc(o)}</option>`).join("")}</select>`
      : kind === "area"
        ? `<textarea id="b-${id}" data-f="${id}" rows="3" placeholder="${esc(opt || "")}">${val}</textarea>`
        : `<input id="b-${id}" data-f="${id}" type="text" placeholder="${esc(opt || "")}" value="${val}">`;
    return `<div class="b-field${kind === "area" ? " b-field--wide" : ""}"><label for="b-${id}">${esc(label)}</label>${ctl}</div>`;
  }

  function renderTypes() {
    $("#b-types").innerHTML = TYPES.map((t) =>
      `<button type="button" class="b-type" data-btype="${t.id}" aria-pressed="${t.id === state.type}">${esc(t.name)}</button>`).join("");
  }

  function renderForm() {
    const t = TYPES.find((x) => x.id === state.type);
    $("#b-fields").innerHTML = [F.role].concat(t.fields).map(fieldHTML).join("");
    $("#b-form-title").textContent = t.name;
    renderPreview();
  }

  function renderPreview() {
    const text = prompt();
    $("#b-preview").innerHTML = esc(text).replace(/\[[^\]\n]+\]/g, (m) => `<span class="pl-br">${m}</span>`);
    const left = (text.match(/\[[^\]\n]+\]/g) || []).filter((m) => m !== "[NEEDS PROOF]" && m !== "[INSERT APPROVED BOILERPLATE]" && m !== "[RECORDING LINK]").length;
    $("#b-left").textContent = left ? `${left} blank${left === 1 ? "" : "s"} left in [BRACKETS]: fill them here or in the chat.` : "Every field is filled in.";
  }

  function toast(msg) {
    const el = $("#toast");
    el.textContent = msg;
    el.classList.add("is-on");
    clearTimeout(toast.t);
    toast.t = setTimeout(() => el.classList.remove("is-on"), 2200);
  }

  document.addEventListener("click", (e) => {
    const t = e.target.closest(".b-type");
    if (t) { state.type = t.dataset.btype; renderTypes(); renderForm(); return; }
    if (e.target.closest("#b-copy")) {
      const text = prompt();
      const done = () => toast("Prompt copied. Paste it into a new chat in your AI assistant.");
      try { navigator.clipboard.writeText(text).then(done, () => toast("Select the prompt and press Ctrl+C or ⌘C.")); } catch (err) { toast("Select the prompt and press Ctrl+C or ⌘C."); }
      return;
    }
    if (e.target.closest("#b-reset")) {
      const role = state.values.role;
      state.values = role ? { role } : {};
      renderForm();
    }
  });
  document.addEventListener("input", (e) => {
    const f = e.target.closest("[data-f]");
    if (!f || !f.closest("#builder")) return;
    state.values[f.dataset.f] = f.value;
    renderPreview();
  });
  AI.onChange(renderPreview);

  renderTypes();
  renderForm();
})();
