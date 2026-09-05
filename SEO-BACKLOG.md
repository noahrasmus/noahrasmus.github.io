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

## 15. Google Search Console (P1)

**What:** Set up GSC on the production domain, verify ownership, submit
sitemap, request indexing.

**Blocker:** Happens after launch. Also requires the final domain to be
locked in (see #21).

**Decision needed:** Who runs GSC — you, Noah, or both? Which Google
account?

---

## 19. Performance / Core Web Vitals (P2)

**What:** Lighthouse pass. Modern formats (WebP/AVIF), responsive image
sizes, lazy-loading below the fold, declared width/height, don't
lazy-load the hero.

**Current state:**
- Images already resized to max 1600px, quality ~78-82, ~200-575KB each
- Hero uses two `<img>` layers stacked (JS-swapped) — not lazy
- No `loading="lazy"` anywhere yet
- No responsive `srcset` — single size served to all viewports

**Decision needed:** Full audit + fixes now, or deferred until launch?
If now, do you want WebP conversion (needs `cwebp` install) or just add
`loading="lazy"` and `width`/`height` attrs on tiles?

---

## 21. Custom domain (P1)

**What:** Decide the final production domain and swap all references
away from `noahrasmus.github.io`.

**Touch points (all handled by one search-and-replace):**
- Canonical `<link>` on all pages
- OG `og:url` and `og:image` absolute URLs
- JSON-LD `url` and `@id` fields
- `sitemap.xml`
- `robots.txt` (`Sitemap:` reference)

**Decision needed:** What's the final domain? `noaharasmus.com`?
Something else? Or ship on `noahrasmus.github.io` for a while?

---

## 12. OG images per page (P3)

**What:** Currently most pages share the dragon (`IMG_6908`) as the OG
image. Piece pages could use their own image; Work could pick something
different from Home.

**Decision needed:** Worth investing in per-page social imagery, or is
one strong hero image enough for now?

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
