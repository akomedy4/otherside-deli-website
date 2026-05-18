# Mobile Optimization Guide

## Philosophy
Mobile-first means you design for 390px wide and scale UP — not the other way around.
Every layout decision starts at small screen. Desktop is an enhancement.

## Breakpoints
```css
/* Base styles = mobile (390px) */

@media (min-width: 640px)  { /* large phone / small tablet */ }
@media (min-width: 768px)  { /* tablet */ }
@media (min-width: 1024px) { /* desktop */ }
@media (min-width: 1280px) { /* wide desktop */ }
```

Never use max-width breakpoints. Always min-width (mobile-first).

---

## Touch Targets
- Minimum tap target size: **48x48px** (Apple HIG + Google Material standard)
- "Add to Cart" buttons: full width on mobile, min height 52px
- Nav links: min height 44px
- Cart item quantity buttons (+ / −): min 44x44px, never smaller
- Form inputs: min height 48px, font-size 16px minimum (prevents iOS zoom on focus)

---

## Typography Scale (Mobile)
```css
h1: clamp(2rem, 8vw, 4rem)       /* Hero headline */
h2: clamp(1.5rem, 6vw, 2.75rem)  /* Section headings */
h3: clamp(1.1rem, 4vw, 1.5rem)   /* Item names, card titles */
body: 1rem (16px)                 /* Never go below 16px on mobile */
labels/meta: 0.875rem (14px)      /* Prices, tags, secondary info */
```

---

## Order Page — Mobile Behavior

### Category Tabs
- Horizontally scrollable row, no wrapping
- Active tab: blue underline + blue text
- Tab height: 48px
- Overflow: scroll with `-webkit-overflow-scrolling: touch`
- Hide scrollbar visually but keep it functional

### Menu Item Cards
- Full width on mobile (no grid)
- 2-column grid at 640px+
- Card structure: [Image placeholder] / Item name / Description / Price / Add button
- "Add to Cart" button: full width, 52px tall, accent yellow

### Sticky Cart Bar
- Fixed to bottom of screen
- Height: 64px
- Always visible when cart has items (hidden when empty)
- Shows: item count badge + subtotal + "View Cart →" button
- Must clear iPhone home indicator: `padding-bottom: env(safe-area-inset-bottom)`
- z-index: 200 (above everything)

### Cart Screen
- Slides up as a full-screen panel (not a modal — full page replacement)
- Each item: name + quantity controls (− / count / +) + line price + remove (×)
- Subtotal pinned to bottom above "Checkout →" button

### Checkout Form
- Single column always
- Inputs stacked vertically with 1rem gap
- Pickup time: `<input type="time">` — native mobile time picker
- Large "Place Order" button: full width, 56px tall, blue background

### Confirmation Screen
- Full screen takeover
- Large checkmark icon (SVG)
- Order summary (name, pickup time)
- "Back to Menu" link

---

## Performance Rules
- No heavy libraries or frameworks
- Images: use `loading="lazy"` on all non-hero images
- Fonts: preconnect to Google Fonts, load only weights actually used
- Avoid layout shift: always set width/height on images even if placeholders
- No JavaScript blocking the render — all `<script>` tags at bottom of `<body>`

---

## iOS-Specific Fixes
```css
/* Prevent rubber-band scroll on fixed elements */
body { overscroll-behavior: none; }

/* Prevent iOS tap highlight on buttons */
button { -webkit-tap-highlight-color: transparent; }

/* Safe area for notch / home bar */
.sticky-cart-bar {
  padding-bottom: calc(1rem + env(safe-area-inset-bottom));
}

/* Prevent zoom on input focus (font-size must be 16px+) */
input, select, textarea { font-size: 16px; }
```

---

## Testing Checklist
- [ ] Test on iPhone SE (375px) — smallest common screen
- [ ] Test on iPhone 14 Pro (393px) — most common
- [ ] Test on iPad (768px)
- [ ] Test with Chrome DevTools device emulator
- [ ] Tap all buttons with finger (not mouse) — are targets big enough?
- [ ] Check sticky cart bar doesn't cover content
- [ ] Verify no horizontal scroll on any screen size
- [ ] Confirm inputs don't trigger zoom on iOS
