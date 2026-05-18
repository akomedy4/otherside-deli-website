# Otherside Market & Deli — Requirements & Status

## Project Goal
Build a mobile-first static website for Otherside Market & Deli with a pickup ordering flow. Deploy to Netlify.

---

## Pages

### index.html — Homepage
- [ ] Sticky nav (logo, links, "Order Now" CTA)
- [ ] Top bar with hours / open indicator
- [ ] Hero section (headline, subhead, CTA to order.html)
- [ ] Menu preview / highlights section
- [ ] Visit section (address, hours, phone, map link)
- [ ] Instagram link
- [ ] Footer

### pages/order.html — Mobile Ordering
- [ ] Category tabs (Breakfast / Cold Sandwiches / Hot Sandwiches / Market)
- [ ] Menu item cards (name, description, price, "Add to Cart" button)
- [ ] Sticky cart bar at bottom (item count + subtotal + "View Cart" button)
- [ ] Cart summary screen (list of items, quantities, remove button, subtotal)
- [ ] Checkout form:
  - [ ] Name
  - [ ] Phone number
  - [ ] Pickup time (time picker, within business hours)
  - [ ] Special instructions (textarea)
  - [ ] "Place Order" button (placeholder — no real submission yet)
- [ ] Order confirmation screen ("We got your order! See you at [time].")

---

## Ordering Platform (PENDING CLIENT DECISION)
The order.html UI is built as a skeleton. When the client chooses a platform, wire the "Place Order" button to:
- **Toast** — use Toast Online Ordering embed or API
- **Square** — use Square Online or Square Orders API
- **Custom** — POST to a backend endpoint (requires separate backend build)

Until then: form submission logs to console and shows confirmation screen.

---

## Assets Needed from Client
- [ ] High-res logo (SVG preferred, PNG acceptable)
- [ ] Food photography (interior shots, sandwich photos)
- [ ] Final menu with all items and prices
- [ ] Confirmation of ordering platform choice

---

## Out of Scope (this engagement)
- Backend / server-side code
- Real payment processing
- CMS / content management
- SEO beyond basic meta tags
- Blog or editorial content

---

## Tech Stack
- HTML5, CSS3, Vanilla JS
- Google Fonts (Fraunces + Inter)
- No frameworks, no npm, no build step
- Netlify for hosting (drag-and-drop deploy of the folder)

---

## Netlify Deploy Instructions
1. Go to https://app.netlify.com
2. Drag the entire `otherside-deli/` folder onto the deploy drop zone
3. Done — Netlify gives a live URL instantly
4. Connect a custom domain in Netlify dashboard settings if needed
