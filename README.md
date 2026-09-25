# SMART Brand Guide — website

**Review build:** https://studiorendezvous.github.io/smart-communications-brand-guide/

A single-page brand guide for Smart Communications, built from the Figma **01b Brand Guide Layout** page (the design system) and the 2026 brand execution kit (the source of every color, name and rule).

Plain HTML, CSS and JavaScript. No build step and no dependencies, so it can be hosted anywhere static files can go: GitHub Pages, Railway, Netlify, SharePoint or an intranet server.

## Run it locally

```bash
python3 tools/serve.py
```

Then open http://localhost:4180. The dev server turns off caching so edits show on reload. Opening `site/index.html` directly also works; only click-to-copy falls back to an older browser method.

## What's where

| Path | What it is |
|------|------------|
| `site/index.html` | The page and all written content |
| `site/css/tokens.css` | Brand colors from the kit, plus layout values from the Figma layout page |
| `site/css/site.css` | Components: hero, sticky nav, section cards, swatches, icon browser, do/don't panels |
| `site/js/data.js` | Colors, icon names/search tags, and **the SharePoint link list** |
| `site/js/site.js` | Accordions, deep links, copy-to-clipboard, icon search, PNG export, naming checker |
| `site/assets/logos/` | Approved SVG logos (company, products, tagline, Conversation Cloud) |
| `site/assets/png-logos/` | 2000 px transparent PNGs of each logo |
| `site/assets/icons/{dark,light,dark-2color,light-2color}/` | The 68 monoline icons in four categories (2-color sets hold the 20 icons with a Dodger accent) |
| `site/assets/downloads/` | Logo pack, icon packs, 2026 swatches (.ase), CSS + JSON tokens |
| `tools/serve.py` | Local preview server |

## Turning on the SharePoint links

Buttons that point at SharePoint show a **Link coming** tag until a URL is added. Paste each URL into `window.SC_LINKS` at the top of `site/js/data.js`:

```js
window.SC_LINKS = {
  masterTemplate: "https://…sharepoint.com/…",
  ...
};
```

Each button switches on automatically and opens in a new tab. The keys: `productLogoPack`, `imageLibrary`, `messagingDoc`, `masterTemplate`, `corporateDeck`, `briefAdvert`, `eventBackdrops`, `retractableBanners`, `guideBrief`, `guideMarketo`, `guideAsana`, `guide6Sense`, `proximaFonts`.

## Before going live

1. Add the SharePoint URLs (above).
2. If the site moves to its own domain, update `og:image` and `og:url` in `site/index.html` so link previews keep working in Teams, Slack and email.
3. Remove the `<meta name="robots" content="noindex, nofollow">` line if the guide should be public. It's there so review builds stay out of search engines.
4. Deploy the `site/` folder as the web root. On GitHub this happens automatically on every push to `main` (`.github/workflows/pages.yml`).

## Features

- **Sections open on demand**, with Expand all / Collapse all. Closed sections stay searchable: Ctrl+F finds text inside them and opens the section (Chrome and Edge; other browsers can use Expand all).
- **Deep links** to any section or sub-panel, e.g. `#color`, `#sp-glass`, `#voice`.
- **Click any swatch** to copy its HEX. Every swatch lists HEX and RGB.
- **Accessible pairings** table: live WCAG contrast ratios for common text and background pairs.
- **Icon browser**: search by name or topic, switch between dark and white sets, and download a single icon as SVG or 512 px PNG.
- **Naming checker**: paste copy to catch "Smart IQ", "Smartcomm", "SIQ", "ConversationCloud", British spellings and a missing ™ on first mention. Runs entirely in the browser.
- **Downloads**: logo pack (SVG + PNG + usage notes), icon packs, 2026 Adobe swatches, CSS and JSON tokens.
- Works from 320 px phones up. Keyboard and screen-reader friendly. Zero violations in automated axe-core WCAG 2.2 AA checks (desktop and mobile, all sections open). A manual screen-reader pass is still worth doing before launch.

## Updating content

- **Colors**: change `tokens.css` and the matching entries in `data.js`, then regenerate the downloads in `assets/downloads/`.
- **Icons**: the four icon folders and zips are generated. Add the new icon's source SVGs (navy and white versions, any accent in Dodger `#0094FF`) to the studio icon source, run the icon build, then add a `[slug, label, tags]` row to `SC_ICONS` in `data.js` (and the slug to `SC_ICON_2COLOR` if it has an accent).
- **Copy**: edit `index.html` directly. Section numbers live in the `.eyebrow` spans.
