/* Smart Communications brand guide — content data.
   Colors come from brand-execution-kit/tokens (Figma chip fills). Do not add hex values here
   that are not in the kit. */

/* SharePoint / external links. Paste a URL to switch a placeholder button on.
   null = the button renders as "Link coming". */
window.SC_LINKS = {
  productLogoPack: null,
  imageLibrary: null,
  messagingDoc: null,
  masterTemplate: null,
  corporateDeck: null,
  briefAdvert: null,
  eventBackdrops: null,
  retractableBanners: null,
  guideBrief: null,
  guideMarketo: null,
  guideAsana: null,
  guide6Sense: null,
  proximaFonts: null
};

window.SC_COLORS = {
  steps: ["Darker", "Dark", "Default", "Light", "Lighter"],
  groups: [
    {
      name: "Brights",
      note: "Accents, calls to action, stats and a rare purple flash.",
      families: [
        { name: "UI Blue", role: "Buttons + hyperlinks", ramp: ["#001F6D", "#1344C1", "#326EEF", "#90B1F4", "#D6E2FC"] },
        { name: "Indigo Purple", role: "Brand color 1 — use sparingly", ramp: ["#38009F", "#661DEE", "#9963FD", "#BE9DFA", "#D9C9F7"] },
        { name: "Dodger Blue", role: "Brand color 2 — sales + social accent", ramp: ["#003154", "#0062A8", "#0094FF", "#57B8FF", "#ABDCFF"] }
      ]
    },
    {
      name: "Backgrounds",
      note: "Fields, panels and page canvas.",
      families: [
        { name: "Industry Blue", role: "Brand color 3 — navy fields", ramp: ["#03102C", "#072057", "#0A3184", "#5D77AE", "#D6E2FC"] },
        { name: "Maya Blue", role: "Soft background blue", ramp: ["#2C3751", "#576FA2", "#84A8F5", "#AEC6F8", "#D6E2FC"] },
        { name: "Hawkes Blue", role: "Neutrals + light canvas", ramp: ["#45494E", "#89939C", "#D0DEEC", "#E0E9F2", "#EFF4F9"] }
      ]
    }
  ],
  utility: [
    { name: "Tiber", hex: "#0E2030", role: "Logo fill + gradient end" },
    { name: "White", hex: "#FFFFFF", role: "Light surfaces" },
    { name: "Glass", hex: "#EAF2FF", role: "Glass fill + stroke (digital only)" },
    { name: "Regal", hex: "#183958", role: "Body text on light (print)" }
  ],
  proportions: [
    { name: "UI Blue", role: "Buttons / Hyperlinks", hex: "#326EEF", flex: 1 },
    { name: "Indigo Purple", role: "Brand Color 1", hex: "#9963FD", flex: 1 },
    { name: "Dodger Blue", role: "Brand Color 2", hex: "#0094FF", flex: 1 },
    { name: "Industry Blue", role: "Brand Color 3", hex: "#0A3184", flex: 1.9 },
    { name: "Industry Blue Darker", role: "Background Color", hex: "#03102C", flex: 1.9 },
    { name: "Dodger Blue Lighter", role: "Background Color", hex: "#ABDCFF", flex: 1.9 },
    { name: "Hawkes Blue Light", role: "Background Color", hex: "#E0E9F2", flex: 1.9 },
    { name: "Maya Blue Lighter", role: "Background Color", hex: "#D6E2FC", flex: 1.9 }
  ],
  chart: [
    { name: "Dodger", hex: "#0094FF" },
    { name: "Dodger Light", hex: "#57B8FF" },
    { name: "Maya", hex: "#84A8F5" },
    { name: "Industry", hex: "#0A3184" },
    { name: "Hawkes", hex: "#D0DEEC" }
  ],
  /* Text/background pairs people actually reach for. Ratios are computed live. */
  pairs: [
    { fg: "#FFFFFF", bg: "#326EEF", label: "White on UI Blue" },
    { fg: "#FFFFFF", bg: "#0094FF", label: "White on Dodger Blue" },
    { fg: "#FFFFFF", bg: "#0A3184", label: "White on Industry Blue" },
    { fg: "#FFFFFF", bg: "#03102C", label: "White on Industry Darker" },
    { fg: "#FFFFFF", bg: "#9963FD", label: "White on Indigo Purple" },
    { fg: "#326EEF", bg: "#FFFFFF", label: "UI Blue on White" },
    { fg: "#0094FF", bg: "#FFFFFF", label: "Dodger Blue on White" },
    { fg: "#0094FF", bg: "#03102C", label: "Dodger Blue on Industry Darker" },
    { fg: "#183958", bg: "#EFF4F9", label: "Regal on Hawkes Lighter" },
    { fg: "#0E2030", bg: "#ABDCFF", label: "Tiber on Dodger Lighter" },
    { fg: "#84A8F5", bg: "#03102C", label: "Maya on Industry Darker" }
  ]
};

/* 68 monoline icons. Labels + tags added for search; file slugs match the kit + Figma 1364:10877. */
window.SC_ICONS = [
  ["ai-flow", "AI workflow", "ai automation process flow diagram"],
  ["bdd-testing", "Document cycle", "testing refresh update review"],
  ["calendar", "Calendar", "date schedule event"],
  ["calendar-2", "Calendar alt", "date schedule event"],
  ["icon-07", "Profile form", "user contact document edit sign"],
  ["icon-08", "Customer routing", "person journey shuffle branch"],
  ["icon-09", "PDF export", "document laptop download pdf"],
  ["icon-10", "Secure document", "laptop shield protect compliance"],
  ["icon-11", "Document automation", "laptop settings gear generate"],
  ["icon-12", "New document", "laptop add create plus"],
  ["icon-13", "Scheduled documents", "laptop clock time batch"],
  ["icon-15", "Approve copy", "duplicate check review"],
  ["icon-16", "Question answered", "faq help resolved check"],
  ["icon-17", "Achievement", "person trophy award success"],
  ["icon-18", "Team", "people group staff"],
  ["icon-19", "Premium value", "hand diamond gem offer"],
  ["icon-20", "Customer care", "hands heart support"],
  ["icon-21", "Ratings", "stars review feedback"],
  ["icon-22", "Community", "people group audience"],
  ["icon-23", "Verified person", "user check approved identity"],
  ["icon-24", "Call back", "phone refresh contact"],
  ["icon-25", "Keypad entry", "pin touch input"],
  ["icon-26", "One-time passcode", "otp password message verified"],
  ["icon-27", "Passcode", "pin keypad password"],
  ["icon-28", "Password lock", "security login"],
  ["icon-29", "Mobile approval", "phone hand check sign"],
  ["icon-30", "Secure email", "mail password"],
  ["icon-31", "Unlock", "password access"],
  ["icon-32", "Credentials", "keys password access"],
  ["icon-33", "Protection", "umbrella hands insurance cover"],
  ["icon-34", "Wealth protection", "person money shield financial"],
  ["icon-35", "Family cover", "people shield insurance"],
  ["icon-36", "Payment cards", "credit card billing"],
  ["icon-37", "Document approval", "stamp sign policy"],
  ["icon-38", "Secure location", "shield check trust"],
  ["icon-39", "Global security", "globe lock shield compliance"],
  ["icon-40", "Accident cover", "shield fall injury claim insurance"],
  ["icon-41", "Advisor", "agent person shield service"],
  ["icon-42", "Claims", "umbrella money insurance payout"],
  ["icon-43", "Payment protection", "card dollar shield"],
  ["icon-44", "Auto cover", "vehicle car truck shield insurance"],
  ["icon-45", "Policy dates", "calendar star shield renewal"],
  ["icon-46", "Policy document", "clipboard shield"],
  ["icon-47", "Rates", "hand percent discount shield"],
  ["icon-48", "24/7 support", "phone hours shield service"],
  ["icon-49", "Data security", "server shield database"],
  ["icon-50", "Cloud sync", "upload download transfer"],
  ["icon-51", "Cloud automation", "gear settings network"],
  ["icon-53", "Cloud download", "save transfer"],
  ["icon-54", "Cloud settings", "gear configure"],
  ["icon-55", "Cloud verified", "network check approved"],
  ["icon-56", "Cloud account", "user profile"],
  ["icon-57", "Cloud files", "folder download storage"],
  ["icon-58", "Cloud security", "lock private"],
  ["icon-59", "Cloud network", "servers connect"],
  ["icon-60", "Cloud connections", "integrations api"],
  ["icon-61", "Global AI", "globe ai chip world"],
  ["icon-62", "AI processor", "chip ai model"],
  ["icon-64", "Extract data", "binary search ai scan"],
  ["icon-65", "AI insight", "head sparkle thinking ai"],
  ["icon-66", "AI knowledge", "book ai learning training"],
  ["message-data", "Conversational AI", "chat message data ai"],
  ["messaging", "Messaging", "chat ai settings conversation"],
  ["network-connection-cloud-computer", "Cloud computer", "desktop network connection"],
  ["pinpoint", "Location", "pin map place"],
  ["stopwatch", "Speed", "fast time performance"],
  ["time-chronometer", "Timer", "time clock turnaround"],
  ["world-location", "Global", "world map location international"]
].map(([slug, label, tags]) => ({ slug, label, tags }));
