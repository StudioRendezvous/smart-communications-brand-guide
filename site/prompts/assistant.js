/* Which AI assistant the reader uses, and how a prompt changes for it.
   Claude with the Smart Communications skills: prompts open with the line that loads the skills.
   Any other assistant (Copilot, ChatGPT, Gemini…): that line becomes a short brand brief, and steps that only the
   Claude skills can do (slide builder, copy checker, recipes) become plain instructions. */
(function () {
  "use strict";
  const KEY = "sc-prompt-assistant";
  let mode = "claude";
  try { mode = localStorage.getItem(KEY) === "other" ? "other" : "claude"; } catch (e) {}

  const BRAND = [
    "Smart Communications task. Follow the Smart Communications brand:",
    "- Voice: approachable, clear and assured. Second person, active voice, American English, one idea per sentence, outcome before feature.",
    "- Exact product names, ™ on first mention, never abbreviated: Smart Communications™, SmartCOMM™, SmartIQ™, SmartPATH™, SmartHUB™, SmartDX™, Conversation Cloud™.",
    "- No invented statistics, customer names, quotes or logos. Mark missing proof as [NEEDS PROOF].",
    "- If you design anything: Industry Blue Darker #03102C and Dodger Blue #0094FF, Roboto for web, Segoe UI for PowerPoint and Word.",
  ].join("\n");

  // Claude-skill steps in the library prompts, and what they become for other assistants
  const SWAPS = [
    [/, and which Smart Communications skill would produce it/g, ", and the format it needs"],
    [/ with the (brand )?skill that builds each/g, ""],
    [/Deliver as a Sheets artifact I can sort and filter/g, "Deliver as a table I can paste into a spreadsheet"],
    [/, then run the copy checker and list anything it flagged/g, ", then list anything that breaks the brand rules above"],
    [/Run the copy checker\./g, "Check it against the brand rules above."],
    [/Deliver as a Claude Doc/g, "Deliver as a document"],
    [/, per the brand skill/g, ""],
    [/ \(# · recipe · title · purpose\)/g, " (# · title · purpose)"],
    [/then build the \.pptx with the slide builder/g, "then write the slide content"],
    [/ using the PPT skill/g, ""],
    [/ using the digital PDF skill/g, ""],
    [/ \(recipe \+ title \+ content beats\)/g, " (title + content beats)"],
    [/ \(recipe, surface, hex, type, logo, icons\), then build the PNG/g, " (layout, colors, type, logo), then write the on-image copy"],
    [/ with recipe names/g, ""],
    [/build the PDF (once|when) I approve/g, "write the page content $1 I approve"],
    [/, then build it\./g, ", then write it."],
    [/Use an internal-\* recipe from the social skill \(denser is OK, this isn't for LinkedIn\)\./g, "Denser is OK, this isn't for LinkedIn."],
  ];

  function adapt(text) {
    if (mode === "claude") return text;
    const nl = text.indexOf("\n");
    let first = text.slice(0, nl), body = text.slice(nl + 1);
    if (first.startsWith("Smart Communications task")) first = BRAND;
    SWAPS.forEach(([re, to]) => { body = body.replace(re, to); });
    return first + "\n" + body;
  }

  const listeners = [];
  window.SC_ASSISTANT = {
    get mode() { return mode; },
    set(m) {
      mode = m === "other" ? "other" : "claude";
      try { localStorage.setItem(KEY, mode); } catch (e) {}
      listeners.forEach((fn) => fn(mode));
    },
    onChange(fn) { listeners.push(fn); },
    adapt,
    skillsLine: (skills) => `Smart Communications task. Use the ${skills.join(", ")} skills.`,
    brand: BRAND,
  };
})();
