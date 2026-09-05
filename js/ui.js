/* ─────────────────────────────────────────────────────────────
   UI feature initializers. Each function is a no-op if the
   relevant markup isn't on the page, so main.js can call all
   of them on every page without checking.
   ───────────────────────────────────────────────────────────── */
(function () {
const { SITE, NAV, TATTOOS, FILTER_TAGS, FILTER_STYLES, MOTION } = window.__NR;

// Style is derived from slug (slug contains "-color-" → color piece).
function styleOf(t) {
  return /-color-/.test(t.slug || "") ? "Color" : "Black & Grey";
}

/* ─── helpers ─── */

// Nav prefix — pages that live in a subdirectory (e.g. /work/{slug}/)
// set <body data-nav-prefix="../../"> so links to work.html / about.html
// / contact.html / index.html / assets/ resolve correctly.
const NAV_PREFIX = (typeof document !== "undefined" && document.body && document.body.dataset.navPrefix) || "";

function withPrefix(href) {
  // Absolute URLs (http, //, /) pass through unchanged.
  if (/^(https?:)?\/\//.test(href) || href.startsWith("/")) return href;
  return NAV_PREFIX + href;
}

function escapeAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function renderTile(t) {
  const hasImage = Boolean(t.src);
  const slotClass = hasImage ? "slot slot--contain" : "slot";
  const placeholder = hasImage ? "" : ` data-placeholder="${escapeAttr(t.place)}"`;
  const src = hasImage ? withPrefix(t.src) : "";
  const img = hasImage
    ? `<img src="${escapeAttr(src)}" alt="${escapeAttr(t.alt || t.place)}" />`
    : `<img src="" alt="" />`;
  const href = t.slug ? withPrefix("work/" + t.slug + "/") : withPrefix("work.html");
  return `
    <div class="grid__piece" data-placement="${escapeAttr(t.tag)}" data-style="${escapeAttr(styleOf(t))}" style="grid-row: span ${t.span}">
      <a href="${escapeAttr(href)}">
        <div class="${slotClass}"${placeholder}>${img}</div>
        <div class="grid__caption">${escapeAttr(t.place)}</div>
      </a>
    </div>
  `;
}

/* ─── nav links (rendered from NAV, with active-page marking) ─── */

function renderNavLinks(activePage) {
  return NAV.map(
    (n) =>
      `<a href="${escapeAttr(withPrefix(n.href))}"${n.page === activePage ? ' aria-current="page"' : ""}>${n.label}</a>`,
  ).join("");
}

/* ─── site header (injected on non-home pages) ─── */

function initSiteHeader() {
  const host = document.querySelector('[data-partial="site-header"]');
  if (!host) return;
  const activePage = document.body.dataset.page;
  host.innerHTML = `
    <a class="site-header__brand" href="${escapeAttr(withPrefix("index.html"))}">${SITE.brand}</a>
    <button class="site-header__nav-toggle" type="button" aria-label="Toggle navigation">≡</button>
    <nav class="nb" aria-label="Primary">${renderNavLinks(activePage)}</nav>
  `;
}

/* ─── hero nav (home only — same links, no "Home" entry) ─── */

function initHeroNav() {
  const host = document.querySelector('[data-partial="hero-nav"]');
  if (!host) return;
  host.innerHTML = renderNavLinks(document.body.dataset.page);
}

/* ─── mobile nav toggle ─── */

function initNavToggle() {
  document.addEventListener("click", (e) => {
    const toggle = e.target.closest(".site-header__nav-toggle");
    if (!toggle) return;
    const header = toggle.closest(".site-header");
    if (!header) return;
    header.classList.toggle("is-open");
  });
}

/* ─── work grid (renders from TATTOOS) ─── */

function initWorkGrid() {
  const grid = document.querySelector("[data-work-grid]");
  if (!grid) return;
  grid.innerHTML = TATTOOS.map(renderTile).join("");
}

/* ─── work filters — supports multiple dimensions (placement + style).
       Each <div data-filters="placement">…</div> row gets its own button set;
       selections across rows AND together. ─── */

function initFilters() {
  const hosts = document.querySelectorAll("[data-filters]");
  const grid = document.querySelector("[data-grid]");
  if (!hosts.length || !grid) return;

  const OPTIONS = {
    placement: FILTER_TAGS,
    style: FILTER_STYLES,
  };
  const items = Array.from(grid.querySelectorAll(".grid__piece"));
  const countEl = document.querySelector("[data-count]");
  const active = {};       // dimension → selected label ("All" or a value)
  const buttonsByDim = {}; // dimension → NodeList of buttons

  function apply() {
    let shown = 0;
    for (const item of items) {
      let match = true;
      for (const dim in active) {
        if (active[dim] === "All") continue;
        if (item.dataset[dim] !== active[dim]) {
          match = false;
          break;
        }
      }
      item.style.display = match ? "" : "none";
      if (match) shown++;
    }
    if (countEl) {
      const parts = Object.values(active).filter((v) => v !== "All");
      countEl.textContent =
        shown + " of " + items.length + " pieces" + (parts.length ? " · " + parts.join(" · ") : "");
    }
    for (const dim in buttonsByDim) {
      for (const btn of buttonsByDim[dim]) {
        btn.setAttribute(
          "aria-pressed",
          btn.dataset.filter === active[dim] ? "true" : "false",
        );
      }
    }
  }

  for (const host of hosts) {
    const dim = host.dataset.filters;
    if (!OPTIONS[dim]) continue;
    const labels = ["All", ...OPTIONS[dim]];
    host.innerHTML = labels
      .map(
        (l) =>
          `<button class="filter" type="button" data-filter="${escapeAttr(l)}" aria-pressed="${l === "All"}">${escapeAttr(l)}</button>`,
      )
      .join("");
    buttonsByDim[dim] = host.querySelectorAll("[data-filter]");
    active[dim] = "All";
    for (const btn of buttonsByDim[dim]) {
      btn.addEventListener("click", () => {
        active[dim] = btn.dataset.filter;
        apply();
      });
    }
  }

  apply();
}

/* ─── home preview grid — non-featured pieces only, so it doesn't
       duplicate what's already cycling through the slider above ─── */

function initPreviewGrid() {
  const grid = document.querySelector("[data-preview-grid]");
  if (!grid) return;
  grid.innerHTML = TATTOOS.filter((t) => t.src && !t.featured).map(renderTile).join("");
}

/* ─── home hero slider ─── */

function initSlider() {
  const stage = document.querySelector("[data-hero-stage]");
  const strip = document.querySelector("[data-recent-strip]");
  if (!stage || !strip) return;

  const images = TATTOOS.filter((t) => t.src && t.featured).map((t) => ({ src: t.src, alt: t.alt }));
  if (!images.length) return;

  const { rotateMs, crossfadeMs } = MOTION;

  // Preload so swaps don't stutter on first pass.
  for (const it of images) {
    const im = new Image();
    im.src = it.src;
  }

  const layerA = stage.querySelector('[data-layer="a"]');
  const layerB = stage.querySelector('[data-layer="b"]');
  const stripImgs = Array.from(strip.querySelectorAll(".slot img"));
  const progress = document.querySelector("[data-progress]");

  function restartProgress() {
    if (!progress) return;
    progress.classList.remove("is-running");
    void progress.offsetWidth;
    progress.classList.add("is-running");
  }

  function renderStrip() {
    for (let i = 0; i < stripImgs.length; i++) {
      const item = images[(idx + 1 + i) % images.length];
      if (stripImgs[i].getAttribute("src") !== item.src) {
        stripImgs[i].src = item.src;
        stripImgs[i].alt = item.alt;
      }
    }
  }

  let idx = 0;
  let showingA = true;

  layerA.src = images[idx].src;
  layerA.alt = images[idx].alt;
  layerA.classList.add("is-active");
  layerB.src = images[(idx + 1) % images.length].src;
  layerB.alt = images[(idx + 1) % images.length].alt;
  renderStrip();
  restartProgress();

  function tick() {
    idx = (idx + 1) % images.length;
    const incoming = showingA ? layerB : layerA;
    const outgoing = showingA ? layerA : layerB;

    incoming.classList.add("is-active");
    outgoing.classList.remove("is-active");
    outgoing.setAttribute("aria-hidden", "true");
    incoming.removeAttribute("aria-hidden");

    setTimeout(() => {
      const nextItem = images[(idx + 1) % images.length];
      outgoing.src = nextItem.src;
      outgoing.alt = nextItem.alt;
    }, crossfadeMs);

    showingA = !showingA;
    renderStrip();
    restartProgress();
  }

  setInterval(tick, rotateMs);
}

window.__NR_UI = {
  initSiteHeader,
  initHeroNav,
  initNavToggle,
  initWorkGrid,
  initFilters,
  initPreviewGrid,
  initSlider,
};
})();
