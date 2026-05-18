# Otherside Market & Deli — Brand Guide

## Personality
Neighborhood, unpretentious, warm. A place locals actually love. Not trendy, not corporate — just a really good deli where the staff knows your name. The vibe is Pacific Northwest casual meets classic NYC deli energy.

Tone of voice: friendly, direct, a little dry humor. No marketing fluff. "A sandwich with your name on it" > "Crafted with artisanal ingredients."

## Logo
- Full name: **Otherside Market & Deli**
- Short name: **Otherside Market** (used in footer, nav)
- Instagram handle: @othersidemarket
- Logo is a deep blue rectangle with "OTHERSIDE" serif on top, wavy lines in the middle, "MARKET" serif on the bottom
- Logo image URL (from live site): https://images.squarespace-cdn.com/content/v1/67dde735dd9b8c2806bf4826/9fd6c214-14f7-49fd-a545-881aed0df4bb/LOGO+Other+Side+Web.png
- Use the SVG placeholder in code until client provides an SVG/PNG asset

## Color Palette
```css
:root {
  --cream:        #fff8eb;   /* Page background */
  --ink:          #0f1233;   /* Primary text */
  --ink-soft:     #4a4d5e;   /* Secondary text, labels */
  --blue:         #2849d6;   /* Primary brand blue — nav, CTAs, logo */
  --blue-deep:    #1a35b8;   /* Hover state for blue */
  --blue-light:   #c0cdff;   /* Tints, tags, subtle backgrounds */
  --accent:       #ffb800;   /* Yellow — highlights, badges, open indicator */
  --accent-warm:  #ff5a3c;   /* Orange-red — secondary accent, alerts */
  --rule:         rgba(40, 73, 214, 0.18); /* Dividers and borders */
}
```

## Typography
- **Display / Headings**: Fraunces (Google Fonts) — serif, optical-size aware, use italic for emphasis
  - Import: `https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700`
  - Use weights 700 and 900 for headlines, italic 400 for pullquotes
- **Body / UI**: Inter (Google Fonts) — clean, readable at small sizes
  - Use 400 for body, 500 for labels, 600 for buttons

## Spacing & Layout
- Max content width: 1100px, centered
- Section padding: 5rem 2rem (desktop), 3rem 1.25rem (mobile)
- Border radius: 4px for cards, 2px for buttons (slightly boxy — not pill shaped)
- Sticky nav height: ~80px — use `scroll-margin-top: 80px` on section anchors

## Key UI Patterns
- Top bar: slim blue bar with "OPEN NOW ●" pulsing dot in accent yellow
- Nav: cream background, sticky, logo left / links right / CTA button far right
- CTA button: accent yellow (`--accent`) background, ink text, no border-radius pill — slightly rectangular
- Section headers: Fraunces 700, large, often with an italic `<em>` word inside
- Cards: cream background, subtle blue border (`--rule`), light shadow on hover
- Animations: simple fade+slide-up reveals on scroll (IntersectionObserver, class toggle)

## What to Avoid
- Dark mode / dark backgrounds (the brand is cream and light)
- Rounded pill buttons
- Stock photography aesthetics
- Purple, green, or other off-brand colors
- Generic sans-serif headlines
