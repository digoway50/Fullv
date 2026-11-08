# Fleex Garment – Official Atelier & Menswear Store

<p align="center">
  <img src="assets/fleex-brand-square.png" alt="Fleex Garment Monogram" width="120" style="border-radius: 50%;" />
  <br>
  <img src="assets/fleex-brand-logo.png" alt="Fleex Garment Official Brand Logo" width="360" />
</p>

Official online store and digital catalog for **Fleex Garment** (`fleexgarments.shop`) — Pakistan's premier atelier for boys stitched 2-piece kameez shalwar, readymade suits, wrinkle-free wash-and-wear fabrics, and bespoke eastern menswear.

---

## 🌐 Live Website & Domain
- **Official Domain:** [https://fleexgarments.shop](https://fleexgarments.shop)
- **WhatsApp Concierge & Orders:** [+92 370 2265968](https://wa.me/923702265968)
- **Atelier Address:** Mughal Market, Main Matli Road, Tando Ghulam Ali, Sindh, Pakistan

---

## 📂 Repository Structure & Assets

- `index.html` – Homepage with full-screen hero carousel, 10 curated boys suit designs, trending categories, and interactive WhatsApp concierge.
- `collection.html` – Full 2026 boys readymade kameez shalwar collection with Tinder-style interactive swipe cards, category filters, and quick inquiries.
- `about.html` – Atelier heritage, fabric authenticity (Royal Boski, Egyptian Giza cotton), and master tailoring standards.
- `contact.html` – Concierge, WhatsApp direct order dispatch, and store location.
- `assets/` – Brand logos (`fleex-brand-logo.png`, `fleex-brand-square.png`), monograms, and suit design photography.
- `favicon.ico`, `favicon.svg`, `favicon-*.png`, `apple-touch-icon.png` – High-definition Google Search and multi-device favicons.
- `site.webmanifest` & `robots.txt` – PWA manifest and Googlebot indexing rules.

---

## 🚀 GitHub Pages Deployment

1. **Deploying from Repository Root (`/`):**
   - In GitHub repository settings: **Settings** > **Pages**
   - Source: **Deploy from a branch**
   - Branch: `main` (or `master`) / folder: `/(root)`
   - Custom domain: `fleexgarments.shop` (already configured in `CNAME`)
   - Check **Enforce HTTPS**

2. **Deploying Vite Build (`/dist`):**
   - Run `npm run build`
   - Deploy contents of `dist/` to the `gh-pages` branch.
