# Otherside Market & Deli — Project Context

## What This Is
A hand-coded website rebuild for Otherside Market & Deli, a neighborhood sandwich shop and market in Eastlake, Seattle. The primary goal is a **mobile-first ordering experience** so customers can place pickup orders from their phones.

The client's current live site is at: https://www.othersidemarketdeli.com/
The client provided a reference HTML file (see `docs/reference-client.html`) as a design starting point.

## Hosting
**Netlify** — static site deployment. No server-side code. All ordering UI is frontend-only until a platform (Toast, Square, etc.) is chosen by the client.

## Project Structure
```
otherside-deli/
├── CLAUDE.md              ← You are here
├── index.html             ← Homepage / landing page
├── pages/
│   └── order.html         ← Mobile ordering flow (separate page)
├── css/
│   └── styles.css         ← All shared styles
├── js/
│   └── main.js            ← All shared JS (cart state, interactions)
├── images/                ← Client photos go here (not yet received)
└── docs/
    ├── brand.md           ← Colors, fonts, tone, logo usage
    ├── menu.md            ← Full menu items and prices
    ├── mobile.md          ← Mobile-first rules, breakpoints, touch targets
    ├── components.md      ← Every UI component with exact specs
    ├── seo.md             ← Meta tags, schema, OG image, performance
    ├── handoff.md         ← Client + future developer reference
    └── requirements.md    ← Feature checklist and project status
```

## Current Status
- [ ] Project scaffolded
- [ ] index.html built
- [ ] order.html built
- [ ] Cart logic wired (JS)
- [ ] Real photos added (pending from client)
- [ ] Ordering platform integrated (pending client decision)

## Key Rules
- Mobile-first always. Design for 390px wide, scale up.
- No frameworks. Vanilla HTML, CSS, JS only.
- No backend. Cart state lives in JS (localStorage ok).
- The "Place Order" button is a placeholder — do not wire to any real payment system yet.
- Keep the brand: cream background, deep blue, warm yellow accent, Fraunces serif display font.
- Do not modify anything in `docs/` — those are reference files only.
