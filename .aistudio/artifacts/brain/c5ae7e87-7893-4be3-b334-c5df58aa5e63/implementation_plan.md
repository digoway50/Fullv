# Google Search Indexing & Ranking Diagnostic Plan

Diagnose why Fleex Garments is showing as **"Discovered – currently not indexed"** in Google Search Console and implement a comprehensive technical SEO fix to get the pages crawled, indexed, and ranked.

## Root Cause Analysis

In Google Search Console, **"Discovered – currently not indexed"** means Googlebot found your URLs, scheduled them to be crawled, but postponed or deprioritized crawling due to technical signals:

1. **Severe Canonical Domain Conflict (Primary Culprit)**:
   - Your custom domain is configured in `CNAME` as **`fleexgarments.shop`**.
   - However, your website code (`index.html`, `collection.html`, `about.html`, `contact.html`, `robots.txt`, and `sitemap.xml`) has hardcoded canonical tags pointing to **`https://fleexgarment.com/`**.
   - When Google visits `https://fleexgarments.shop/`, it reads `<link rel="canonical" href="https://fleexgarment.com/" />`. Google concludes: *"This page is just a duplicate mirror of fleexgarment.com, so do not index fleexgarments.shop"*.
   - Meanwhile, Googlebot attempts to crawl `fleexgarment.com`, which either doesn't match or fails DNS, leaving your real domain in an unindexed holding state.

2. **Outdated & Inconsistent Sitemap / Robots.txt**:
   - `public/robots.txt` points to `Sitemap: https://fleexgarment.com/sitemap.xml` instead of `https://fleexgarments.shop/sitemap.xml`.
   - `public/sitemap.xml` has `<loc>https://fleexgarment.com/...</loc>` instead of your live domain.

3. **Schema.org Structured Data URL Mismatch**:
   - Structured JSON-LD in `index.html` references `https://fleexgarment.com/`, confusing Google's knowledge graph.

4. **Domain Age & Crawl Request**:
   - New domains take anywhere from 3 to 14 days to be indexed once technical roadblocks are resolved and a manual "Request Indexing" is triggered in Google Search Console.

---

## User Review & Critical Decisions

> [!IMPORTANT]
> All URLs will be aligned to your active live domain: **`https://fleexgarments.shop`**. If you also own `fleexgarment.com` and want a permanent 301 redirect, confirm your registrar setup.

- **Primary Live Domain**: `https://fleexgarments.shop` (consistent with your `CNAME` file).
- **Target Search Query Priorities**: 
  - Brand keywords: *"Fleex Garment"*, *"Fleex Garments"*, *"fleexgarments.shop"*
  - Product keywords: *"readymade gents kurta shalwar"*, *"stitched salwar suit Pakistan"*, *"Tando Ghulam Ali tailoring"*

---

## Technical Architecture & SEO Pipeline

```
┌────────────────────────────────────────────────────────┐
│                   Googlebot / Crawler                  │
└───────────────────────────┬────────────────────────────┘
                            │ 1. Requests /robots.txt
                            ▼
┌────────────────────────────────────────────────────────┐
│             public/robots.txt (Clean Directives)       │
│  Sitemap: https://fleexgarments.shop/sitemap.xml       │
└───────────────────────────┬────────────────────────────┘
                            │ 2. Reads XML Sitemap
                            ▼
┌────────────────────────────────────────────────────────┐
│            public/sitemap.xml (Fresh Timestamps)       │
│  • https://fleexgarments.shop/                         │
│  • https://fleexgarments.shop/collection.html          │
│  • https://fleexgarments.shop/about.html               │
│  • https://fleexgarments.shop/contact.html             │
└───────────────────────────┬────────────────────────────┘
                            │ 3. Fetches Web Pages
                            ▼
┌────────────────────────────────────────────────────────┐
│       HTML Header Canonical Tags & Meta Tags           │
│  • <link rel="canonical" href="https://fleexgarments.shop/...">
│  • OpenGraph og:url matches https://fleexgarments.shop/
│  • JSON-LD Organization & WebSite Schemas              │
│  • Optional Google Site Verification Meta Tag Slot     │
└────────────────────────────────────────────────────────┘
```

---

## Proposed Changes

### 1. Synchronize Canonical & OpenGraph URLs
- Update all `<link rel="canonical">`, `<meta property="og:url">`, and Twitter URL tags across:
  - `/index.html` -> `https://fleexgarments.shop/`
  - `/collection.html` -> `https://fleexgarments.shop/collection.html`
  - `/about.html` -> `https://fleexgarments.shop/about.html`
  - `/contact.html` -> `https://fleexgarments.shop/contact.html`

### 2. Overhaul `public/robots.txt`
- Allow all legitimate search crawlers (`Googlebot`, `Bingbot`).
- Point directly to `https://fleexgarments.shop/sitemap.xml`.

### 3. Update `public/sitemap.xml`
- Replace all occurrences of `fleexgarment.com` with `https://fleexgarments.shop`.
- Update `<lastmod>` timestamps to current date (`2026-11-03`) to signal fresh content.
- Ensure all 4 primary routes are indexed with proper priority (`1.0` for home, `0.9` for collection, `0.8` for about and contact).

### 4. Fix Schema.org Structured Data (JSON-LD)
- Update JSON-LD in `index.html` to reference `https://fleexgarments.shop` for Organization, WebSite, and BreadcrumbList.
- Add Google site verification meta tag placeholder so you can paste your HTML tag verification code directly if needed.

### 5. Actionable Google Search Console Steps for the User
Provide a step-by-step checklist on how to trigger immediate re-crawling in Google Search Console once changes are deployed.

---

## Verification Plan

1. **Automated Verification**:
   - Run grep checks to guarantee **zero** outdated `fleexgarment.com` references remain in sitemaps, robots, or HTML files.
   - Verify `/robots.txt` and `/sitemap.xml` serve valid HTTP 200 with matching domains.
   - Run `npm run build` and `compile_applet` to confirm clean deployment output.

2. **User Acceptance Verification**:
   - Inspect URL in Google Search Console via "URL Inspection" tool for `https://fleexgarments.shop/`.
   - Click "Test Live URL" -> verify that Google's inspected canonical matches user-declared canonical.
   - Click "Request Indexing".
