# Component Catalog

Every UI component in the project is documented here.
Claude Code should build all components to these specs to ensure consistency across pages.

---

## Top Bar
**Location**: Above nav, on every page
**Height**: ~36px
**Background**: `var(--blue)`
**Text**: `var(--cream)`, 0.78rem, letter-spacing 0.08em, weight 500
**Content**: "OPEN NOW ●  ·  9am–8:30pm  ·  2210 Eastlake Ave E, Seattle"
**Pulsing dot**: CSS animation, color `var(--accent)`, pulses opacity 1→0.4 on 2s loop

```css
.top-bar { background: var(--blue); color: var(--cream); text-align: center; padding: 0.65rem 1rem; font-size: 0.78rem; letter-spacing: 0.08em; }
.open-now::before { content: "●"; color: var(--accent); animation: pulse 2s ease-in-out infinite; }
@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
```

---

## Navigation
**Position**: Sticky top, z-index 100
**Height**: ~80px
**Background**: `var(--cream)`
**Border**: 1px bottom, `var(--rule)`
**Layout**: logo left / links center-right / CTA far right

### Nav Logo
- SVG placeholder until real asset arrives
- Width: 110px
- Links to index.html

### Nav Links
- Font: Inter 500, 0.85rem
- Color: `var(--ink)` default, `var(--blue)` on hover
- Links: Menu, Visit, Order Online
- Hide on mobile (< 768px) — hamburger menu or just show CTA only

### Nav CTA Button
- Text: "Order Now"
- Background: `var(--accent)` yellow
- Color: `var(--ink)`
- Padding: 0.6rem 1.25rem
- Border-radius: 4px (slightly boxy, not pill)
- Font: Inter 600, 0.85rem
- Links to: pages/order.html

---

## Hero Section
**Page**: index.html only
**Background**: `var(--cream)` with optional food photo behind overlay
**Layout**: text left, image right (stacks on mobile)

- Eyebrow: small caps label, `var(--blue)`, 0.75rem, letter-spacing wide
- Headline: Fraunces 900, large (clamp 2rem → 4rem), with one italic `<em>` word
- Subhead: Inter 400, `var(--ink-soft)`, 1.05rem, max-width 480px
- CTA: "Order Now →" — same style as nav CTA but larger (padding 0.85rem 2rem)
- Secondary link: "See our menu ↓" — text link, `var(--blue)`

---

## Menu Item Card
**Used on**: pages/order.html
**Width**: Full width mobile, 50% at 640px+

```
┌─────────────────────────────┐
│  [Image placeholder 160px]  │
│  Item Name         $price   │
│  Short description text     │
│  [    + Add to Cart    ]    │
└─────────────────────────────┘
```

- Background: white
- Border: 1px `var(--rule)`
- Border-radius: 4px
- Image: 160px tall placeholder (grey background), `loading="lazy"`
- Name: Fraunces 700, 1.05rem
- Price: Inter 600, `var(--blue)`, aligned right
- Description: Inter 400, 0.85rem, `var(--ink-soft)`, 2-line max
- Button: full width, 52px tall, `var(--accent)` background, Inter 600

### Add to Cart Button States
- Default: yellow background, ink text
- Added: blue background, cream text, "✓ Added" for 1.5s, then revert
- Disabled: grey, "Sold Out"

---

## Category Tabs
**Used on**: pages/order.html
**Layout**: Horizontal scrolling row, no wrap

- Tab height: 48px
- Padding: 0 1.25rem
- Font: Inter 500, 0.9rem
- Default: `var(--ink-soft)`, no underline
- Active: `var(--blue)`, 2px bottom border `var(--blue)`
- Container: `overflow-x: auto`, hide scrollbar

---

## Sticky Cart Bar
**Used on**: pages/order.html
**Position**: Fixed bottom, full width
**Height**: 64px + safe-area-inset-bottom
**Background**: `var(--blue)`
**Visibility**: Hidden when cart is empty, visible when 1+ items

Layout: `[🛒 3 items]` left  ·  `[$24.50]` center  ·  `[View Cart →]` right button

- Item count badge: `var(--accent)` circle, Inter 700
- Subtotal: Fraunces 700, `var(--cream)`
- Button: `var(--accent)` background, `var(--ink)` text, 40px tall, border-radius 4px

---

## Cart Screen
**Used on**: pages/order.html (replaces menu view)
**Trigger**: Clicking "View Cart" in sticky bar

### Cart Item Row
```
[Item Name]          [−] [2] [+]     $18.00   [×]
[Modifier/notes]
```
- Name: Inter 600, 0.95rem
- Qty controls: 36px buttons, `var(--rule)` border
- Line price: Inter 600, `var(--blue)`
- Remove (×): `var(--ink-soft)`, hover red

### Cart Footer
- Subtotal row: label left, price right, Fraunces 700
- "Checkout →" button: full width, 56px, `var(--blue)` background, cream text

---

## Checkout Form
**Used on**: pages/order.html (replaces cart view)

Fields (all required unless noted):
1. **Name** — text input, placeholder "Your name"
2. **Phone** — tel input, placeholder "(206) 555-0000"
3. **Pickup Time** — time input, min="09:00" max="20:30"
4. **Special Instructions** — textarea, optional, placeholder "Allergies, substitutions, notes..."

### Input Styles
```css
input, textarea {
  width: 100%;
  padding: 0.85rem 1rem;
  font-size: 16px; /* prevents iOS zoom */
  border: 1.5px solid var(--rule);
  border-radius: 4px;
  background: white;
  color: var(--ink);
}
input:focus, textarea:focus {
  outline: none;
  border-color: var(--blue);
}
```

### Place Order Button
- Full width, 56px tall
- Background: `var(--blue)`
- Text: "Place Order" — Inter 600, `var(--cream)`, 1rem
- Loading state: "Placing order..." + spinner
- **Note**: Currently logs to console and advances to confirmation screen. Wire to real platform later.

---

## Order Confirmation Screen
**Trigger**: After "Place Order" tapped
**Layout**: Centered, full screen

- Large SVG checkmark, `var(--blue)`, animated draw-on
- Headline: "We got it!" — Fraunces 900
- Subhead: "See you at [pickup time], [name]."
- Body: "Come find us at 2210 Eastlake Ave E — we'll have it ready."
- Button: "Back to Menu" — outline style, links back to order page

---

## Footer
**Pages**: index.html (order.html can have minimal footer or none)

- Background: `var(--ink)`
- Text: `var(--cream)`
- Logo: SVG version, white
- Tagline: "A neighborhood deli & market · Eastlake, Seattle"
- Links: Menu · Visit · Instagram · Phone
- Copyright: "© 2026 Otherside Market & Deli"
