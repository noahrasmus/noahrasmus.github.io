#!/usr/bin/env node
/* Regenerate one static HTML page per tattoo piece from TATTOOS in
   js/content.js. Each page lives at work/{slug}/index.html so its URL
   is /work/{slug}/ (extensionless).

   Run:   node scripts/build-pieces.js

   Safe to run repeatedly — existing files are overwritten. No cleanup
   of stale slug directories; delete those by hand if you remove or
   rename a piece.
*/
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.resolve(__dirname, "..");
const { SITE, TATTOOS } = require(path.join(ROOT, "js/content.js"));

const DOMAIN = "https://noahrasmus.github.io";
const STYLE_LABEL_COLOR = "Color";
const STYLE_LABEL_BW = "Black & Grey";

function escape(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function isVideo(src) {
  return /\.(mp4|webm)$/i.test(src || "");
}
function posterFor(src) {
  return src.replace(/\.(mp4|webm)$/i, ".jpg");
}
function socialImage(t) {
  // OG / JSON-LD image — always a real image URL, use poster when src is video.
  return isVideo(t.src) ? posterFor(t.src) : t.src;
}

function isColor(t) {
  // Slug is authoritative — color pieces include "-color-" in the slug.
  return /-color-/.test(t.slug || "") || t.slug.endsWith("-color-sleeve");
}

function styleLabel(t) {
  return isColor(t) ? STYLE_LABEL_COLOR : STYLE_LABEL_BW;
}

// Derived "scope" chip — describes the piece's scale/kind at a glance.
function scopeLabel(t) {
  const alt = (t.alt || "").toLowerCase();
  const place = (t.place || "").toLowerCase();
  if (alt.includes("full-leg") || alt.includes("full leg")) return "Full leg";
  if (alt.includes("full-back") || alt.includes("full back")) return "Back piece";
  if (alt.includes("sleeve")) return "Sleeve";
  if (place === "back" || place === "upper back") return "Back piece";
  if (place === "chest") return "Chest piece";
  if (place === "hands") return "Matching pair";
  return "Custom piece";
}

function schemaJson(t, canonical, image) {
  const style = styleLabel(t);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "VisualArtwork",
        "@id": canonical + "#piece",
        name: t.title,
        artform: "Tattoo",
        artMedium: style + " tattoo",
        image: image,
        creator: { "@id": DOMAIN + "/#noah" },
        url: canonical,
      },
      {
        "@type": "Person",
        "@id": DOMAIN + "/#noah",
        name: SITE.brand,
        jobTitle: "Tattoo Artist",
        url: DOMAIN + "/",
        sameAs: [
          "https://www.instagram.com/noaharasmus/",
          "https://camphillcollective.com/pages/artists",
        ],
        knowsAbout: [
          "Black and grey realism tattooing",
          "Dark surreal tattooing",
          "Custom tattoo design",
        ],
        worksFor: { "@id": DOMAIN + "/#studio" },
      },
      {
        "@type": "TattooParlor",
        "@id": DOMAIN + "/#studio",
        name: "Camp Hill Collective Tattoo and PMU",
        url: "https://camphillcollective.com/",
        address: {
          "@type": "PostalAddress",
          streetAddress: "3805 Market St",
          addressLocality: "Camp Hill",
          addressRegion: "PA",
          postalCode: "17011",
          addressCountry: "US",
        },
      },
    ],
  };
}

function pageHtml(t) {
  const style = styleLabel(t);
  const descStyle = isColor(t) ? "Color" : "Black and grey";
  const canonical = `${DOMAIN}/work/${t.slug}/`;
  const image = `${DOMAIN}/${socialImage(t)}`;
  const seoTitle = `${t.title} on the ${t.place} — ${style} Realism | Noah Rasmus`;
  const description = `${descStyle} realism ${t.title} tattoo on the ${t.place.toLowerCase()} by Noah Rasmus in Camp Hill, PA. View the custom piece and book with Noah.`;
  const schema = JSON.stringify(schemaJson(t, canonical, image), null, 2);

  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <title>${escape(seoTitle)}</title>
    <meta name="description" content="${escape(description)}" />
    <link rel="canonical" href="${escape(canonical)}" />

    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="Noah Rasmus" />
    <meta property="og:title" content="${escape(seoTitle)}" />
    <meta property="og:description" content="${escape(description)}" />
    <meta property="og:url" content="${escape(canonical)}" />
    <meta property="og:image" content="${escape(image)}" />
    <meta name="twitter:card" content="summary_large_image" />

    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap"
    />
    <link rel="stylesheet" href="../../css/tokens.css" />
    <link rel="stylesheet" href="../../css/base.css" />
    <link rel="stylesheet" href="../../css/components.css" />
    <link rel="stylesheet" href="../../css/pages.css" />
    <script defer src="../../js/content.js"></script>
    <script defer src="../../js/ui.js"></script>
    <script defer src="../../js/main.js"></script>

    <script type="application/ld+json">
${schema}
    </script>
  </head>
  <body data-page="work" data-nav-prefix="../../">
    <header class="site-header" data-partial="site-header"></header>

    <main>
      <article class="piece">
        <div class="piece__image">
          <div class="slot slot--contain">
            ${isVideo(t.src)
              ? `<video controls playsinline preload="metadata" poster="../../${escape(posterFor(t.src))}" aria-label="${escape(t.alt || t.title)}"><source src="../../${escape(t.src)}" type="video/mp4"></video>`
              : `<img src="../../${escape(t.src)}" alt="${escape(t.alt || t.title)}" />`}
          </div>
        </div>

        <div class="piece__body">
          <h1 class="wm piece__title">${escape(t.title)}</h1>

          <div class="piece__tags">
            <span class="tag tag-outline">${escape(style)} Realism</span>
            <span class="tag tag-neutral">${escape(t.place)}</span>
            <span class="tag tag-neutral">${escape(t.tag)}</span>
            <span class="tag tag-outline">${escape(scopeLabel(t))}</span>
          </div>

          <div class="piece__actions">
            <a class="btn btn-primary" href="../../contact.html">Ask about similar work</a>
            <a class="btn btn-ghost" href="../../work.html">Back to work</a>
          </div>
        </div>
      </article>
    </main>
  </body>
</html>
`;
}

let written = 0;
for (const t of TATTOOS) {
  if (!t.src || !t.slug) continue;
  const dir = path.join(ROOT, "work", t.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, "index.html"), pageHtml(t));
  written++;
}
console.log(`Wrote ${written} piece pages to work/{slug}/index.html`);
