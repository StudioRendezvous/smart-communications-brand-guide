/* Starter prompts, built by studio/tools/build_prompt_library.py from Brittany's prompt library. Don't edit by hand. */
window.SC_PROMPTS = {
 "sections": [
  {
   "num": "1",
   "name": "Campaigns and planning"
  },
  {
   "num": "2",
   "name": "Copy and content"
  },
  {
   "num": "3",
   "name": "Sales enablement"
  },
  {
   "num": "4",
   "name": "Social and LinkedIn"
  },
  {
   "num": "5",
   "name": "Thought-leadership PDFs"
  },
  {
   "num": "6",
   "name": "Research"
  },
  {
   "num": "7",
   "name": "Events and webinars"
  },
  {
   "num": "8",
   "name": "Internal communications"
  },
  {
   "num": "9",
   "name": "Review, QA and analysis"
  }
 ],
 "prompts": [
  {
   "id": "1.1",
   "section": "1",
   "title": "Campaign brief",
   "type": "Chat",
   "skills": "smart-communications-brand, smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-copy skills.\nI'm a [ROLE] at Smart Communications planning a campaign for [PRODUCT, e.g. SmartCOMM™ / SmartIQ™ / Conversation Cloud™] aimed at [AUDIENCE: role + INDUSTRY + region].\nGoal: [e.g. 40 MQLs from mid-market insurers in Q1].\nTiming and budget: [DATES] · [BUDGET or \"not set\"].\nChannels I'm considering: [e.g. LinkedIn, email, webinar, paid search].\n\nDraft a one-page campaign brief with: objective and KPI, audience and their top 3 pains, core message (outcome → capability → product), proof points I should gather (don't invent any), channel plan, asset list with the brand skill that builds each, timeline, and open questions.\nUse the Smart Communications voice: Approachable, Clear, Assured.",
   "add": "last campaign's results, approved proof points, persona docs."
  },
  {
   "id": "1.2",
   "section": "1",
   "title": "Messaging framework",
   "type": "Chat",
   "skills": "smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-copy skills.\nBuild a messaging framework for [PRODUCT / CAPABILITY] for [AUDIENCE].\nInputs: [paste product notes, release notes or positioning].\nGive me: a one-line value proposition, three message pillars (each = outcome headline, 2-sentence explanation, capability that delivers it, proof point needed), an elevator pitch in 50 words, and words to avoid.\nLead with customer outcomes, not features. Exact product names with ™ on first mention. Mark any proof point I still need to source as [NEEDS PROOF].",
   "add": ""
  },
  {
   "id": "1.3",
   "section": "1",
   "title": "Persona snapshot",
   "type": "Chat",
   "skills": "smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-copy skills.\nCreate a persona snapshot for a [JOB TITLE] at a [COMPANY SIZE] [INDUSTRY] organization evaluating customer communications management (CCM).\nCover: responsibilities, what they're measured on, top frustrations with customer communications today, triggers to buy, objections, where they get information, and the two Smart Communications outcomes most likely to resonate.\nLabel anything that's an assumption rather than something I gave you, so I can validate it with sales.",
   "add": "call notes, win/loss notes, CRM fields (anonymized)."
  },
  {
   "id": "1.4",
   "section": "1",
   "title": "Content calendar",
   "type": "Execute",
   "skills": "smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-copy skills.\nBuild a [4/8/12]-week content calendar for [CAMPAIGN or THEME] across [CHANNELS].\nConstraints: [posting frequency], key dates [events, launches, holidays].\nFor each item: date, channel, working title (title case, ≤ 10 words), one-line angle, CTA, owner [leave blank], and which Smart Communications skill would produce it.\nDeliver as a Sheets artifact I can sort and filter.",
   "add": ""
  },
  {
   "id": "1.5",
   "section": "1",
   "title": "Launch plan for a release",
   "type": "Chat",
   "skills": "smart-communications-brand, smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-copy skills.\nWe're releasing [FEATURE / CAPABILITY] in [PRODUCT] on [DATE]. Audience: [existing customers / prospects / partners / internal].\nRelease notes: [paste].\nDraft a launch plan: what changes for customers (outcomes first), audiences and what each needs to hear, asset list (customer email, LinkedIn tile, release briefing deck, sales one-liner, FAQ), sequencing, and risks.\nDon't promise dates or roadmap items beyond what's in the notes.",
   "add": ""
  },
  {
   "id": "2.1",
   "section": "2",
   "title": "Write or rewrite copy on brand",
   "type": "Execute",
   "skills": "smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-copy skills.\n[Write / Rewrite] this [TYPE: headline / web section / product description / paragraph] for [AUDIENCE].\n[Paste draft or describe what it needs to say.]\nApply the Smart Communications voice (Approachable · Clear · Assured): second person, active voice, American English, one idea per sentence, outcome before feature, exact product names with ™ on first mention.\nLength: [budget]. Give me [2/3] options, then run the copy checker and list anything it flagged.",
   "add": ""
  },
  {
   "id": "2.2",
   "section": "2",
   "title": "Blog post",
   "type": "Execute",
   "skills": "smart-communications-copy (+ Research 6.2 first if the topic needs facts)",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-copy skills.\nWrite a [800–1,200]-word blog post for [AUDIENCE] on [TOPIC].\nAngle: [the one point the reader should leave with].\nSources to use: [links / research output]. Cite every statistic with its source; don't invent any.\nStructure: title-case headline (≤ 10 words), a 2-sentence lede, 3–5 subheads, a short close with one CTA to [URL / asset].\nAlso give me: meta description (≤ 155 characters), 3 social pull quotes, and a LinkedIn caption.\nDeliver as a Claude Doc I can share for review.",
   "add": ""
  },
  {
   "id": "2.3",
   "section": "2",
   "title": "Email nurture sequence",
   "type": "Execute",
   "skills": "smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-copy skills.\nWrite a [3/4/5]-email nurture sequence for [AUDIENCE] who [TRIGGER: downloaded X / attended webinar / went quiet after demo].\nGoal: [book a meeting / register / read the report].\nFor each email: purpose, send timing, subject line (≤ 50 characters, no all caps or \"!!!\"), preview text, body (≤ 150 words, second person), one CTA.\nEach email should earn the next — don't repeat the same pitch.",
   "add": ""
  },
  {
   "id": "2.4",
   "section": "2",
   "title": "Landing page copy",
   "type": "Execute",
   "skills": "smart-communications-copy, smart-communications-brand",
   "text": "Smart Communications task. Use the smart-communications-copy, smart-communications-brand skills.\nWrite landing page copy for [OFFER: report / webinar / demo / product page] targeting [AUDIENCE].\nSections: hero (headline ≤ 10 words + lede ≤ 35 words + one CTA), 3 benefit blocks (outcome headline + 1–2 sentences), proof section [use only proof I provide: ___], FAQ (4 questions), closing CTA.\nIf you mock it up, use Dodger Blue #0094FF buttons and Roboto for web, per the brand skill.",
   "add": ""
  },
  {
   "id": "2.5",
   "section": "2",
   "title": "Customer story",
   "type": "Execute",
   "skills": "smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-copy skills.\nTurn these approved facts into a customer story: [paste interview notes / approved case details].\nCustomer approved for public use: [yes / no — if no, anonymize as \"a top-10 US insurer\" style].\nStructure: challenge → what they did with [PRODUCT] → outcome (only numbers in my notes) → quote (only quotes in my notes, verbatim).\nGive me a 400-word version and a 75-word version for sales.\nFlag anything that looks like it needs customer sign-off.",
   "add": ""
  },
  {
   "id": "2.6",
   "section": "2",
   "title": "Press release or company news",
   "type": "Execute",
   "skills": "smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-copy skills.\nDraft a [press release / news post] announcing [NEWS].\nFacts: [who, what, when, where, approved numbers].\nQuote placeholders: [SPOKESPERSON NAME, TITLE] — write a draft quote clearly marked DRAFT FOR APPROVAL.\nInclude headline, subhead, dateline, body (≤ 400 words), boilerplate placeholder [INSERT APPROVED BOILERPLATE], and media contact placeholder.",
   "add": ""
  },
  {
   "id": "2.7",
   "section": "2",
   "title": "Repurpose one asset into many",
   "type": "Execute",
   "skills": "smart-communications-copy, smart-communications-social",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-copy, smart-communications-social skills.\nHere is a [report / webinar transcript / blog]: [paste or attach].\nRepurpose it into: 3 LinkedIn captions, 1 email (≤ 150 words), 5 headline options, 3 stat or quote callouts suitable for social tiles (only stats that appear in the source, with page reference), and a 60-word summary for sales.",
   "add": ""
  },
  {
   "id": "3.1",
   "section": "3",
   "title": "Sales deck from notes",
   "type": "Execute",
   "skills": "smart-communications-brand, smart-communications-ppt",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-ppt skills.\nBuild a [8–12]-slide Smart Communications deck for [MEETING: discovery / demo follow-up / exec briefing] with [ACCOUNT TYPE or anonymized account] in [INDUSTRY].\nTheir priorities: [what we know].\nProducts to feature: [PRODUCTS].\nShow me the outline table (# · recipe · title · purpose) first, then build the .pptx with the slide builder.\nOne idea per slide, body ≥ 14 pt, no invented customer logos or stats — use [NEEDS PROOF] where proof is missing.",
   "add": ""
  },
  {
   "id": "3.2",
   "section": "3",
   "title": "Rebuild an off-brand deck",
   "type": "Execute",
   "skills": "smart-communications-ppt, smart-communications-brand-review",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-ppt, smart-communications-brand-review skills.\nAttached is a deck that's off brand: [attach .pptx].\nRebuild it in the 2026 Master Template look using the PPT skill. Keep my content and narrative; fix fonts, colors, logo, icons and layout. Split crowded slides rather than shrinking text.\nAfterwards, list what changed and which slides you split.",
   "add": ""
  },
  {
   "id": "3.3",
   "section": "3",
   "title": "Battlecard",
   "type": "Research → Execute",
   "skills": "smart-communications-copy (+ deep-research)",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-copy skills. Use deep-research if it's available.\nCreate a battlecard: Smart Communications vs [COMPETITOR] for [INDUSTRY / USE CASE].\nResearch the competitor from public sources only (website, analyst coverage, press, reviews) and link every claim.\nSections: their positioning in one line, where they're strong, where we win (outcome-led), landmines to set, objection → response pairs (5), and questions to ask the prospect.\nKeep it factual and fair — no disparaging claims. Mark anything you couldn't verify.",
   "add": ""
  },
  {
   "id": "3.4",
   "section": "3",
   "title": "Objection handling",
   "type": "Chat",
   "skills": "smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-copy skills.\nI keep hearing these objections from [AUDIENCE] about [PRODUCT]: [list].\nFor each, give me: what's really behind it, a short acknowledging response, a reframe toward customer outcomes, a discovery question, and the proof point I'd need [NEEDS PROOF if we don't have one].\nConversational, not scripted.",
   "add": ""
  },
  {
   "id": "3.5",
   "section": "3",
   "title": "Solution one-pager or brief",
   "type": "Execute",
   "skills": "smart-communications-digital-pdf, smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-digital-pdf, smart-communications-copy skills.\nCreate a solution brief for [USE CASE, e.g. claims correspondence] in [INDUSTRY] featuring [PRODUCTS].\nFormat: [US Letter eBook, 4–6 pages] using the digital PDF skill.\nGive me the page outline (recipe + title + content beats) and per-page spec first; build the PDF once I approve.\nSource content: [paste or attach].",
   "add": ""
  },
  {
   "id": "3.6",
   "section": "3",
   "title": "Follow-up email after a meeting",
   "type": "Execute",
   "skills": "smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-copy skills.\nDraft a follow-up email to [ROLE] at [ACCOUNT, anonymize if sharing] after our [MEETING TYPE] on [DATE].\nWhat we discussed: [notes]. Agreed next steps: [list].\n≤ 150 words, warm and specific, recap in 3 bullets, one clear next step. Don't commit to pricing, timelines or terms beyond what's in my notes.",
   "add": ""
  },
  {
   "id": "3.7",
   "section": "3",
   "title": "QBR deck",
   "type": "Execute",
   "skills": "smart-communications-ppt",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-ppt skills.\nBuild a QBR deck for [CUSTOMER, internal use] covering [PERIOD].\nData: [attach or paste usage / outcomes / tickets / roadmap items cleared for sharing].\nSlides: agenda, outcomes delivered (stat row), what we learned, priorities for next quarter, action table (owner · date), close.\nOnly numbers from the data I give you.",
   "add": ""
  },
  {
   "id": "4.1",
   "section": "4",
   "title": "LinkedIn post tile + caption",
   "type": "Execute",
   "skills": "smart-communications-brand, smart-communications-social, smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-social, smart-communications-copy skills.\nCreate a LinkedIn [square 1080×1080 / landscape 1200×627] tile announcing [NEWS / CAMPAIGN / STAT].\nOn-image copy: ≤ 40 words, one CTA [TEXT + URL].\nAlso write the caption: hook line, 1–3 sentences, URL, 0–3 hashtags.\nShow me the frame outline and spec first (recipe, surface, hex, type, logo, icons), then build the PNG.",
   "add": ""
  },
  {
   "id": "4.2",
   "section": "4",
   "title": "Hiring post",
   "type": "Execute",
   "skills": "smart-communications-social",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-social skills.\nMake a hiring tile for [ROLE(S)] in [LOCATION / remote].\n[Single role → square; several roles → landscape hiring board.]\nApply link: [URL]. Keep it type-forward — no invented headshots. Include a caption that sounds like a real team member, not a job ad.",
   "add": ""
  },
  {
   "id": "4.3",
   "section": "4",
   "title": "Award or recognition post",
   "type": "Execute",
   "skills": "smart-communications-social, smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-social, smart-communications-copy skills.\nWe've been recognized: [AWARD / ANALYST MENTION, exact wording we're permitted to use].\nCreate a square award tile and a caption that thanks customers and the team. Use the award's name exactly as approved; no logos from the awarding body unless I attach a licensed file.",
   "add": ""
  },
  {
   "id": "4.4",
   "section": "4",
   "title": "LinkedIn image carousel",
   "type": "Execute",
   "skills": "smart-communications-social",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-social skills.\nTurn [TOPIC / SOURCE] into a [4–8]-frame square LinkedIn carousel. Frame 1 = hook, last frame = CTA to [URL].\nOne idea per frame, ≤ 40 words each. Give me the frame-by-frame outline with recipe names first, plus the post caption.",
   "add": ""
  },
  {
   "id": "4.5",
   "section": "4",
   "title": "Executive or employee thought-leadership post",
   "type": "Chat",
   "skills": "smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-copy skills.\nDraft a LinkedIn post for [NAME, ROLE] to publish from their own account about [TOPIC / POINT OF VIEW].\nTheir notes or voice sample: [paste].\n150–250 words, first person, one clear opinion, one takeaway, ends with a question. Mention Smart Communications products only if natural. Give me 2 versions: reflective and punchy.",
   "add": ""
  },
  {
   "id": "5.1",
   "section": "5",
   "title": "LinkedIn PDF carousel report",
   "type": "Execute",
   "skills": "smart-communications-digital-pdf",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-digital-pdf skills.\nCreate a 15×8 in LinkedIn PDF carousel (6–8 pages) teasing [REPORT / TREND].\nSource: [attach report or research output]. Only stats that appear in the source.\nGive me the page outline with recipe names and per-page spec first; build the PDF when I approve.",
   "add": ""
  },
  {
   "id": "5.2",
   "section": "5",
   "title": "Benchmark or research report",
   "type": "Execute",
   "skills": "smart-communications-digital-pdf",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-digital-pdf skills.\nTurn this survey data into a [12–20]-page benchmark report: [attach data / findings].\nAudience: [INDUSTRY + region]. Headline finding: [if known].\nOutline: cover, key findings, sections by theme with stat callouts and charts (Dodger → Maya → Industry palette), methodology, CTA.\nShow the outline and specs first. Label any chart that uses illustrative data.",
   "add": ""
  },
  {
   "id": "5.3",
   "section": "5",
   "title": "eBook or white paper",
   "type": "Research → Execute",
   "skills": "smart-communications-digital-pdf, smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-digital-pdf, smart-communications-copy skills.\nCreate a [US Letter, 4–8 page] eBook on [TOPIC] for [AUDIENCE].\nStep 1: research the topic (see section 6.2) and show me the key findings with sources.\nStep 2: once I approve, outline the eBook page by page with recipe names, then build it.",
   "add": ""
  },
  {
   "id": "6.1",
   "section": "6",
   "title": "Competitor scan",
   "type": "Research",
   "skills": "deep-research (if available)",
   "text": "Smart Communications task (we sell customer communications management software). Follow the smart-communications-brand voice and naming. Use deep-research if it's available.\nResearch [COMPETITOR(S)] in the customer communications management (CCM) and forms / document automation market.\nCover: positioning and messaging, target industries, recent product announcements (last 12 months), pricing model if public, notable customers they publicize, analyst coverage, and how their messaging compares with Smart Communications' outcome-led story.\nPublic sources only, every claim linked, nothing disparaging. End with \"what this means for our messaging\" as clearly labeled interpretation.",
   "add": ""
  },
  {
   "id": "6.2",
   "section": "6",
   "title": "Industry trend scan",
   "type": "Research",
   "skills": "deep-research (if available)",
   "text": "Smart Communications task (we sell customer communications management software). Follow the smart-communications-brand voice and naming. Use deep-research if it's available.\nWhat's changing for [INDUSTRY] organizations in [REGION] around customer communications, digital forms, document generation and AI in [YEAR]?\nCover: regulatory changes, customer-experience expectations, technology shifts, and 5–8 recent data points with sources.\nThen suggest 3 content angles Smart Communications could own, labeled as suggestions.\nKeep it to 1–2 pages; offer a full report if there's more worth saying.",
   "add": ""
  },
  {
   "id": "6.3",
   "section": "6",
   "title": "Account research before a call",
   "type": "Research",
   "skills": "",
   "text": "Smart Communications task (we sell customer communications management software). Follow the smart-communications-brand voice and naming.\nI have a [MEETING TYPE] with [COMPANY] ([INDUSTRY]) on [DATE]. Attendees: [ROLES].\nResearch from public sources: company overview, recent news (last 6 months), strategic priorities from annual report / earnings / press, customer-experience or digital-transformation initiatives, regulatory pressures, and any public mention of their communications or forms technology.\nFinish with 5 discovery questions and 2 Smart Communications outcomes most likely to matter to them. Link everything.",
   "add": ""
  },
  {
   "id": "6.4",
   "section": "6",
   "title": "Regulatory or compliance watch",
   "type": "Research",
   "skills": "",
   "text": "Smart Communications task (we sell customer communications management software). Follow the smart-communications-brand voice and naming.\nSummarize recent and upcoming [REGULATION / REGULATOR, e.g. state insurance notice rules, plain-language requirements, accessibility mandates] affecting customer communications in [INDUSTRY + JURISDICTION].\nFor each: what changed, effective date, who it affects, what it means for customer communications. Link the primary source.\nThis is for marketing context, not legal advice — note anything that needs our legal team.",
   "add": ""
  },
  {
   "id": "6.5",
   "section": "6",
   "title": "SEO and topic research",
   "type": "Research",
   "skills": "",
   "text": "Smart Communications task (we sell customer communications management software). Follow the smart-communications-brand voice and naming.\nFind content opportunities around [TOPIC / KEYWORD THEME] for [AUDIENCE].\nGive me: the questions people are actually asking, related terms, what the top-ranking pages cover and miss, and 5 article ideas with working titles (title case, ≤ 10 words) and the search intent each serves.",
   "add": ""
  },
  {
   "id": "6.6",
   "section": "6",
   "title": "Win/loss or feedback synthesis",
   "type": "Research (internal)",
   "skills": "—",
   "text": "Smart Communications task (we sell customer communications management software). Follow the smart-communications-brand voice and naming.\nHere are [N] [win/loss notes / survey responses / call transcripts], anonymized: [attach].\nFind recurring themes: why we win, why we lose, objections, language customers use to describe their problem, and quotes worth keeping (verbatim, with source ID).\nShow how often each theme appears. Don't infer beyond the notes.",
   "add": ""
  },
  {
   "id": "6.7",
   "section": "6",
   "title": "Analyst and market landscape",
   "type": "Research",
   "skills": "deep-research (if available)",
   "text": "Smart Communications task (we sell customer communications management software). Follow the smart-communications-brand voice and naming. Use deep-research if it's available.\nSummarize how analysts and market reports describe the [CCM / intelligent forms / document automation] market in [YEAR]: market definitions, evaluation criteria, named trends, and where Smart Communications is mentioned.\nPublic summaries only (I may not have access to full paid reports) — link every source and flag anything paywalled.",
   "add": ""
  },
  {
   "id": "7.1",
   "section": "7",
   "title": "Webinar package",
   "type": "Execute",
   "skills": "smart-communications-copy (titles, emails, registration page copy), smart-communications-social (tiles); a registration page mockup uses smart-communications-brand web rules (Dodger Blue buttons, Roboto)",
   "text": "Smart Communications task. Use the smart-communications-copy, smart-communications-social, smart-communications-brand skills.\nWe're running a webinar on [TOPIC] on [DATE, TIME ET] with [SPEAKERS, titles].\nCreate: title options (≤ 10 words), 100-word abstract, 3 learning outcomes, registration page copy, 3 promo emails (announce, reminder, last chance), 2 LinkedIn tiles with captions, and a post-event follow-up email with recording link placeholder.",
   "add": ""
  },
  {
   "id": "7.2",
   "section": "7",
   "title": "Event or trade-show plan",
   "type": "Chat",
   "skills": "smart-communications-brand",
   "text": "Smart Communications task. Use the smart-communications-brand skill.\nWe're attending [EVENT] on [DATES] in [CITY] with [booth / speaking slot / attendee only].\nHelp me plan: goals and KPIs, target accounts approach, pre-event outreach, booth or talk messaging (one core idea), asset list with the skill that builds each, on-site follow-up process, and post-event nurture.",
   "add": ""
  },
  {
   "id": "7.3",
   "section": "7",
   "title": "Speaker abstract or talk outline",
   "type": "Chat",
   "skills": "smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-copy skills.\nDraft a speaker submission for [EVENT] on [TOPIC] by [SPEAKER, ROLE].\nGive me a title (≤ 10 words), 150-word abstract, 3 takeaways, and a 20-minute talk outline. Thought leadership, not a product pitch.",
   "add": ""
  },
  {
   "id": "8.1",
   "section": "8",
   "title": "Release briefing deck",
   "type": "Execute",
   "skills": "smart-communications-ppt",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-ppt skills.\nBuild an internal release briefing deck for [RELEASE] for [AUDIENCE: sales / CS / all-hands].\nRelease notes: [paste]. Cover: what's new, why it matters to customers, who it's for, how to talk about it (one-liner + 3 talking points), what not to promise, FAQs, resources.",
   "add": ""
  },
  {
   "id": "8.2",
   "section": "8",
   "title": "Internal announcement",
   "type": "Execute",
   "skills": "smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-copy skills.\nWrite an internal [email / Teams post] announcing [NEWS] to [AUDIENCE].\nKey facts: [list]. What we need people to do: [action + deadline].\n≤ 200 words, warm and clear, one action. Give me a short Teams version too.",
   "add": ""
  },
  {
   "id": "8.3",
   "section": "8",
   "title": "Internal SLA or timeline graphic",
   "type": "Execute",
   "skills": "smart-communications-social",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-social skills.\nCreate an internal [SLA / campaign timeline / process] graphic for [TEAM] showing [STEPS / STAGES / SLAS].\nUse an internal-* recipe from the social skill (denser is OK, this isn't for LinkedIn). Landscape 1200×627 unless I say otherwise.",
   "add": ""
  },
  {
   "id": "8.4",
   "section": "8",
   "title": "Handover or project summary",
   "type": "Chat",
   "skills": "smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-copy skills.\nSummarize this [project / campaign / account] for a colleague taking it over: [paste notes, links].\nSections: where it stands, decisions made, open items with owners, key contacts (roles only), risks, and the first three things they should do. Keep confidential details to the minimum needed.",
   "add": ""
  },
  {
   "id": "9.1",
   "section": "9",
   "title": "\"Is this on brand?\" review",
   "type": "Execute",
   "skills": "smart-communications-brand-review",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-brand-review skills.\nReview this [deck / PDF / image / email / web page] against the 2026 Smart Communications brand: [attach].\nRun the automated checks, then look at every page. Give me: verdict, what's working, and a prioritized fix list (what · where · exact replacement token or file).\nOffer to rebuild if it's a deck.",
   "add": ""
  },
  {
   "id": "9.2",
   "section": "9",
   "title": "Proofread and polish",
   "type": "Execute",
   "skills": "smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-copy skills.\nProofread this for Smart Communications style: [paste].\nFix product names, ™ on first mention, American spelling, number/date/time style, title-case headings, passive voice. Run the copy checker. Show changes as a short list, then the clean version. Don't change my message.",
   "add": ""
  },
  {
   "id": "9.3",
   "section": "9",
   "title": "Review AI-generated or agency work",
   "type": "Execute",
   "skills": "smart-communications-brand-review, smart-communications-copy",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-brand-review, smart-communications-copy skills.\nAn [agency / AI tool] produced this: [attach]. Check it for brand (colors, type, logo, icons, layout), voice, product naming, and any unsupported claims, invented stats or customer names.\nGive me a fix list I can send back to them, written politely and specifically.",
   "add": ""
  },
  {
   "id": "9.4",
   "section": "9",
   "title": "Campaign performance analysis",
   "type": "Execute",
   "skills": "—",
   "text": "Smart Communications task (we sell customer communications management software). Follow the smart-communications-brand voice and naming.\nHere's campaign data: [attach CSV / export from Marketo, Salesforce, LinkedIn, GA].\nAnalyze performance against [GOAL]: what worked, what didn't, by channel / asset / audience, with the numbers computed from the file (not estimated).\nDeliver a dashboard plus 3–5 recommendations, labeled as recommendations.",
   "add": ""
  },
  {
   "id": "9.5",
   "section": "9",
   "title": "Accessibility check",
   "type": "Execute",
   "skills": "smart-communications-brand-review",
   "text": "Smart Communications task. Use the smart-communications-brand, smart-communications-brand-review skills.\nCheck this [email / web page / PDF / social tile] for accessibility: color contrast (body ≥ 4.5:1; white on Dodger #0094FF is large text only), heading structure, alt text, link text, reading order, and text size. List issues with fixes.",
   "add": ""
  }
 ],
 "quick": [
  "1.1",
  "2.1",
  "4.1",
  "3.1",
  "6.3",
  "6.2",
  "9.1",
  "2.3"
 ],
 "chains": [
  {
   "goal": "Thought-leadership campaign",
   "steps": [
    "6.2 Industry trend scan",
    "5.1 LinkedIn PDF carousel",
    "4.1 Tile + caption"
   ]
  },
  {
   "goal": "Competitive push",
   "steps": [
    "6.1 Competitor scan",
    "3.3 Battlecard",
    "3.4 Objection handling"
   ]
  },
  {
   "goal": "Big sales meeting",
   "steps": [
    "6.3 Account research",
    "3.1 Sales deck",
    "3.6 Follow-up email"
   ]
  },
  {
   "goal": "Product launch",
   "steps": [
    "1.5 Launch plan",
    "8.1 Release briefing",
    "2.3 Nurture",
    "4.1 Tile"
   ]
  },
  {
   "goal": "Cleaning up legacy assets",
   "steps": [
    "9.1 Brand review",
    "3.2 Rebuild deck"
   ]
  },
  {
   "goal": "Webinar",
   "steps": [
    "7.1 Webinar package",
    "2.7 Repurpose the recording"
   ]
  }
 ]
};
