# SEO Backlog — Items Remaining After the First Implementation Pass

Follow-up to `noah-rasmus-seo-dev-checklist.md`. The first pass covered
titles, descriptions, canonicals, JSON-LD, OG/Twitter meta, favicon,
sitemap, and visible Camp Hill copy across all pages.

This file tracks what's left. Numbering matches the section numbers in
the original checklist.

---

## 1. Launch flip (P0) — DONE

All 5 pages now carry `<meta name="robots" content="index, follow, max-image-preview:large">`.
`robots.txt` is `Allow: /` and references the sitemap. Site is crawlable
as of this commit.

---

## 7 & 8. Individual piece pages with unique URLs (P1) — DONE

Each of the 39 pieces now lives at `/work/{slug}/` (extensionless via
directory-index). Every page has:
- Unique title, meta description, canonical
- OG + Twitter card
- JSON-LD `VisualArtwork` linked to `Person` (Noah) and `TattooParlor`
  (Camp Hill Collective)
- Placement + Style meta list
- Actions: "Ask about this piece" → contact, "Back to work" → gallery

Copy is intentionally minimal for now — no paragraphs. Add per-piece
narrative later when ready.

**Generator:** `scripts/build-pieces.js` reads `TATTOOS` from
`content.js` and writes `work/{slug}/index.html` for each entry. Run
`node scripts/build-pieces.js` whenever TATTOOS changes.

---

## 9a. Descriptive image filenames (P1) — DONE

All 39 tattoo images renamed to match their slug and moved to
`assets/work/{slug}.{ext}` — e.g., `assets/work/dragon-thigh.jpeg`,
`assets/work/hooded-reaper-calf.jpeg`. `git mv` preserves history.
`content.js` src refs updated in the same pass, piece pages regenerated,
4 orphan duplicate JPEGs removed.

---

## 9b. Alt text audit (P1) — DONE

All 39 alts now lead with the style keyword — `Black and grey realism — {description}`
or `Color realism — {description}`. Piece-page style label continues to
be auto-derived from slug so no data duplication.

---

## 11. Camp Hill Collective backlink (P1) — DEFERRED

---

## 15. Google Search Console (P1) — CODE DONE, GSC UI PENDING

`googlee533aa7fa171d0f1.html` committed to root. Remaining is
account-side work in the Search Console dashboard: add the URL-prefix
property `https://noahrasmus.github.io/`, click Verify, submit
`sitemap.xml`, and request indexing on the top pages.

---

## 19. Performance / Core Web Vitals (P2) — DEFERRED

---

## 21. Custom domain (P1) — WAITING ON DOMAIN PURCHASE

Ship for now on `noahrasmus.github.io`. When a custom domain is bought:
1. Tell me the domain → I add a `CNAME` file at repo root + swap every
   `noahrasmus.github.io` reference across HTML/sitemap/robots/JSON-LD
   in one commit
2. Point DNS at GitHub Pages (`A` records or `ALIAS` per your registrar)
3. Update GSC property to the new domain

`grep -rn "noahrasmus.github.io" .` catches every touch point.

---

## 12. OG images per page (P3) — DONE (quick pass)

- Home / Work / Contact → dragon (`assets/work/dragon-thigh.jpeg`)
- About → Noah's portrait
- Piece pages → each piece's own image (or poster for video pieces)

Also fixed 4 dead refs left over from the earlier `assets/featured/…` →
`assets/work/…` rename that OG tags still pointed at.

Not done: proper 1200×630 crops of each. Modest tradeoff — social
platforms will crop, previews may lose some subject depending on how
each renders portrait-orientation images.

---

## 22. Launch QA (P2)

**What:** Full pre-launch checklist: robots, meta, canonicals, images,
schema, sitemap, GSC.

**Decision needed:** N/A — comes with launch.

---

## Additional items worth considering (not in original checklist)

### Breadcrumb schema (P3)
Once individual piece pages exist, `BreadcrumbList` JSON-LD helps search
show `Noah Rasmus > Work > Warrior Sleeve` in results.

### ImageObject schema on piece pages (P3)
Adding `ImageObject` JSON-LD per piece can help image search rank the
tattoo photos with proper attribution.

### About-page content expansion (P2)
Currently the About page is short (3 paragraphs). Checklist Section 17
recommends: artistic background, design philosophy, specialization,
approach to body placement, studio relationship. Real writing needed.

### FAQ content (P3)
If Noah gets recurring booking questions, an FAQ block with `FAQPage`
schema can capture long-tail queries. Only worth it if real questions
justify it.
