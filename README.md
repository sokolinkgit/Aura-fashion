# Aura Fashion

Women's fashion storefront for the Kenyan market — deras, kaftans, kimonos and handbags. Built with plain HTML, CSS and JavaScript. Serve this directory with any static web server, for example:

```sh
python3 -m http.server 3000 --bind 0.0.0.0
```

## Store details

- **Brand:** Aura Fashion — "Dress like the moment matters."
- **Location:** Nairobi CBD, Kenya — delivery countrywide.
- **Contact / orders:** +254 701 900664 (calls and WhatsApp). Every product links to a pre-filled WhatsApp order message.
- **Theme:** pink, white and black.

## Catalogue

- 12 listings: 9 wears (deras, kaftans, kimonos) and 3 bags (handbags).
- Filter bar above the grid: **Shop all / Wears / Bags**.
- Product imagery lives in `assets/catalog/`. All model photographs feature Black Kenyan women — no white models are used anywhere on the site.
- Images are a mix of AI-generated editorial photographs and web-sourced product/interior photos (downloaded from their source URLs and stored locally, so nothing breaks if a host blocks hotlinking). Sources: classyleatherbags.com, Fashion Nova, Amazon, Pinterest.
- `assets/photo-unavailable.svg` is a graceful placeholder shown if any image fails to load; it never substitutes an unrelated photo.
- Prices shown are "deal" prices with the original price struck through — confirm final price, sizes and availability on WhatsApp.

## Honesty notes

- The reviews section is a clearly labelled rotating information panel. It does not publish invented testimonials or verification badges; real customer feedback can be added once shared with permission.
- Images are AI-generated style references, not proof of exact stocked items. The site tells customers to confirm actual photos and availability on WhatsApp before ordering.

## Files

- `index.html` — the whole storefront (announcement bar, hero, benefits, filterable collection, offer strip, about, reviews, contact, footer, floating WhatsApp button).
- `styles.css` — pink/white/black theme, responsive from mobile to desktop.
- `script.js` — mobile navigation, Wears/Bags filtering, hero slideshow, review rotator, WhatsApp link builder, image fallback.
