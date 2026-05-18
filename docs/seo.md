# SEO Guide

## Target Keywords
This site should rank for local, intent-driven searches:
- "sandwich shop Eastlake Seattle"
- "deli near me Seattle"
- "Otherside Market"
- "Otherside Deli Seattle"
- "online order sandwich Seattle"

---

## Meta Tags (Required on Every Page)

### index.html
```html
<title>Otherside Market & Deli — Eastlake, Seattle</title>
<meta name="description" content="A neighborhood deli & market in Eastlake, Seattle. Hot & cold sandwiches, breakfast bagels, wine, and groceries. Order online for pickup." />
<meta name="keywords" content="deli Seattle, sandwich shop Eastlake, Otherside Market, pickup order Seattle" />
<link rel="canonical" href="https://www.othersidemarketdeli.com/" />
```

### pages/order.html
```html
<title>Order Online — Otherside Market & Deli</title>
<meta name="description" content="Order sandwiches and deli items online for pickup at Otherside Market & Deli in Eastlake, Seattle. Daily 9am–8:30pm." />
<link rel="canonical" href="https://www.othersidemarketdeli.com/pages/order.html" />
```

---

## Open Graph (Social Sharing)
Add to `<head>` on every page. Controls how the link looks when shared on iMessage, Instagram, etc.

```html
<!-- Open Graph -->
<meta property="og:type" content="website" />
<meta property="og:site_name" content="Otherside Market & Deli" />
<meta property="og:title" content="Otherside Market & Deli — Eastlake, Seattle" />
<meta property="og:description" content="A neighborhood deli & market in Eastlake, Seattle. Hot & cold sandwiches, breakfast bagels, wine, and groceries." />
<meta property="og:url" content="https://www.othersidemarketdeli.com/" />
<meta property="og:image" content="https://www.othersidemarketdeli.com/images/og-image.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />

<!-- Twitter / X card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Otherside Market & Deli" />
<meta name="twitter:description" content="A neighborhood deli & market in Eastlake, Seattle." />
<meta name="twitter:image" content="https://www.othersidemarketdeli.com/images/og-image.jpg" />
```

### OG Image
- File: `images/og-image.jpg`
- Size: exactly **1200 × 630px**
- Should show: food photo or logo on brand background
- **TODO**: Create this once client provides photos

---

## Favicon
```html
<link rel="icon" type="image/png" href="/images/favicon.png" />
<link rel="apple-touch-icon" href="/images/apple-touch-icon.png" />
```
- Favicon: 32×32px PNG
- Apple touch icon: 180×180px PNG
- **TODO**: Export from logo once client provides SVG

---

## Local Business Schema (Structured Data)
Add this JSON-LD block to `index.html` just before `</body>`. Helps Google show hours, address, and phone directly in search results.

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Restaurant",
  "name": "Otherside Market & Deli",
  "description": "A neighborhood deli and market in Eastlake, Seattle.",
  "url": "https://www.othersidemarketdeli.com",
  "telephone": "+12064535091",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "2210 Eastlake Ave E, Suite 107",
    "addressLocality": "Seattle",
    "addressRegion": "WA",
    "postalCode": "98102",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 47.6407,
    "longitude": -122.3246
  },
  "openingHours": "Mo-Su 09:00-20:30",
  "servesCuisine": ["Sandwiches", "Deli", "American"],
  "priceRange": "$$",
  "sameAs": [
    "https://www.instagram.com/othersidemarket/"
  ]
}
</script>
```

---

## Performance (Affects SEO)
Google ranks fast sites higher, especially on mobile.

- Run the site through **PageSpeed Insights**: https://pagespeed.web.dev
- Target score: 90+ on mobile
- Key wins:
  - Preconnect to Google Fonts (already in template)
  - `loading="lazy"` on all non-hero images
  - Compress all images before adding to `images/` folder (use https://squoosh.app)
  - No render-blocking scripts (all `<script>` at bottom of body)

---

## Checklist Before Launch
- [ ] All page titles unique and descriptive
- [ ] All meta descriptions written (under 160 characters)
- [ ] Canonical URLs set correctly
- [ ] OG image created and uploaded (1200×630px)
- [ ] Favicon and Apple touch icon in place
- [ ] Local Business schema added to index.html
- [ ] Site tested on PageSpeed Insights (mobile score 90+)
- [ ] All images compressed
- [ ] Google Search Console set up and site submitted
