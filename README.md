# Scent Theory

The full interactive experience as plain HTML, CSS and JavaScript. It includes the intro, the five trials, the Composing screen, the profile, the sources page and the share card.

## Desktop and phone

The site picks its layout when it loads:
- **Desktop (760px wide and up):** the 1280 × 832 design, scaled to fit the window.
- **Phones:** a 390 × 832 portrait layout. Everything is restacked, swiping replaces the mouse wheel on the intro, tapping replaces hover, and the particle animations are re-centered.

The phone styles are at the bottom of `styles.css`, under "Phone layout". They target elements marked `data-m="…"` in `app.js`. Resizing a browser window across 760px reloads into the other layout.

To preview the phone layout on your computer: open the page in Chrome, open DevTools, turn on the device toolbar (Ctrl/Cmd + Shift + M) and pick an iPhone.

To try it on your real phone: with Live Server running, open `http://<your-computer's-IP>:5500` on a phone connected to the same Wi-Fi.

## Run it in VS Code

The site uses JavaScript modules, which browsers only load from a local server. Double-clicking `index.html` won't work, so use one of these:

**Option A: Live Server extension (easiest)**
1. In VS Code, open the Extensions panel and install **Live Server** (by Ritwick Dey).
2. Open this folder (File → Open Folder…).
3. Right-click `index.html` and choose **Open with Live Server**.

**Option B: terminal**
```
npx serve .
```
or
```
python3 -m http.server 8000
```
Then open http://localhost:8000 (or the address `serve` prints).

## What's in the folder

| File | What it does |
|---|---|
| `index.html` | The page. It loads the fonts, the CSS and `app.js`. |
| `styles.css` | All styles: glass buttons, cards, sliders, transitions and the page frame. |
| `app.js` | The whole experience: state, particle animations, cube and fade transitions, tone, profile logic, and the markup template at the bottom. |
| `runtime.js` | A small helper. Calling `setState` re-renders the template, and the 1280 × 832 design is scaled to fit the window. |
| `vendor/lit-html/` | lit-html (BSD-3 license). It updates only the parts of the page that changed. It's included locally, so nothing loads from a CDN. |
| `assets/memories/` | The halftone illustrations for Trial 04. They're turned into particles at runtime. |

## Where to edit things

- **Copy and layout:** the `template` at the bottom of `app.js`. Values like `${v.pName}` come from `renderVals()`.
- **Profile names, notes, families, label words:** the `FAMS`, `NAMES`, `COLOR_TOP`, `MEM_BASE` and `WORDS` constants near the top of `app.js`.
- **How each answer weighs on the blend:** `blendValues()` in `app.js`.
- **Colors, glass and type:** `styles.css`, plus the inline styles in the template.

Fonts (Geist, Geist Mono and Inter Tight) load from Google Fonts. Without internet the page falls back to system fonts.
