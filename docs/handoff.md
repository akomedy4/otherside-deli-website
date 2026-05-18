# Client & Developer Handoff

This document explains what was built, what is a placeholder, and how to make common updates.
Written for a non-technical client and any developer who picks this up in the future.

---

## What Was Built

| Page | File | Status |
|------|------|--------|
| Homepage | `index.html` | Complete (pending real photos) |
| Order Page | `pages/order.html` | UI complete — ordering not live yet |

---

## What Is a Placeholder (Important)

### 1. The Ordering System
The "Place Order" button on `order.html` **does not actually send orders yet.**
It shows a confirmation screen but no order is transmitted anywhere.

**To go live**, a developer needs to integrate one of:
- **Toast** — recommended if you use Toast for your POS
- **Square Online** — recommended if you use Square
- **Custom** — a developer builds a backend to receive orders

Until this is done, **do not advertise online ordering to customers.**

### 2. Photos
All images are placeholders. Real food/interior photos from the client need to be:
1. Saved into the `images/` folder
2. Referenced in the HTML (search for `placeholder` in the code to find them all)

### 3. Menu Items and Prices
The menu in `order.html` uses placeholder prices. Update `docs/menu.md` first, then a developer updates the HTML to match.

---

## How to Update Common Things

### Change the hours
Open `index.html` and `pages/order.html`. Search for `9:00am` — update every instance.
Also update the top bar text and the visit section.

### Add or remove a menu item
Open `pages/order.html`. Find the category section (e.g. `<!-- HOT SANDWICHES -->`).
Copy an existing `<div class="menu-item-card">` block, paste it, and update the name, description, and price.

### Update the phone number
Search all files for `2064535091` and replace with the new number.

### Update the address
Search all files for `2210 Eastlake Ave E` and update.

### Change a color
Open `css/styles.css`. All colors are at the top in the `:root { }` block. Change the hex value there and it updates everywhere automatically.

### Add a real photo
1. Save the photo file into the `images/` folder (e.g. `sandwich-hero.jpg`)
2. In the HTML, find the `<img>` tag you want to replace
3. Change `src="images/placeholder.jpg"` to `src="images/sandwich-hero.jpg"`

---

## How to Deploy Updates (Netlify)

### If you have the folder on your computer:
1. Make your changes to the files
2. Go to app.netlify.com → your site → **Deploys** tab
3. Drag the updated `otherside-deli` folder onto the deploy zone
4. Live in ~30 seconds

### If a developer is managing it via GitHub:
They push to GitHub and Netlify updates automatically — you don't need to do anything.

---

## File Structure Reference

```
otherside-deli/
├── index.html              ← Homepage
├── pages/
│   └── order.html          ← Mobile ordering page
├── css/
│   └── styles.css          ← All visual styles
├── js/
│   └── main.js             ← Cart logic, interactions
├── images/
│   └── (photos go here)
└── docs/
    ├── brand.md            ← Colors, fonts, design rules
    ├── menu.md             ← Menu items and prices (source of truth)
    ├── mobile.md           ← Mobile optimization rules
    ├── components.md       ← UI component specs
    ├── seo.md              ← SEO and meta tag guide
    ├── requirements.md     ← Feature checklist
    ├── handoff.md          ← This file
    └── reference-client.html ← Original client-provided HTML
```

---

## Contacts

| Role | Name | Contact |
|------|------|---------|
| Developer | [Your name] | [Your email] |
| Client | Otherside Market & Deli | (206) 453-5091 |
| Instagram | @othersidemarket | https://instagram.com/othersidemarket |

---

## Outstanding Decisions (Client Must Confirm)

- [ ] Which ordering platform? (Toast / Square / other)
- [ ] Custom domain? (e.g. order.othersidemarketdeli.com)
- [ ] Final menu with all items and prices
- [ ] Real logo file (SVG preferred)
- [ ] Food photography
