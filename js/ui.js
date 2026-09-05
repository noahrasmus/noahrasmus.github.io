/* ─────────────────────────────────────────────────────────────
   UI feature initializers. Each function is a no-op if the
   relevant markup isn't on the page, so main.js can call all
   of them on every page without checking.
   ───────────────────────────────────────────────────────────── */
(function () {
const { SITE, NAV, TATTOOS, FILTER_TAGS, MOTION } = window.__NR;

/* ─── helpers ─── */

function escapeAttr(s) {
  return String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

function renderTile(t) {
  const hasImage = Boolean(t.src);
  const slotClass = hasImage ? "slot slot--contain" : "slot";
  const placeholder = hasImage ? "" : ` data-placeholder="${escapeAttr(t.place)}"`;
  const img = hasImage
    ? `<img src="${escapeAttr(t.src)}" alt="${escapeAttr(t.alt || t.place)}" />`
    : `<img src="" alt="" />`;
  return `
    <div class="grid__piece" data-tag="${escapeAttr(t.tag)}" style="grid-row: span ${t.span}">
      <a href="piece.html">
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
      `<a href="${n.href}"${n.page === activePage ? ' aria-current="page"' : ""}>${n.label}</a>`,
  ).join("");
}

/* ─── site header (injected on non-home pages) ─── */

function initSiteHeader() {
  const host = document.querySelector('[data-partial="site-header"]');
  if (!host) return;
  const activePage = document.body.dataset.page;
  host.innerHTML = `
    <a class="site-header__brand" href="index.html">${SITE.brand}</a>
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

/* ─── work filters ─── */

function initFilters() {
  const host = document.querySelector("[data-filters]");
  const grid = document.querySelector("[data-grid]");
  if (!host || !grid) return;

  const tags = ["All", ...FILTER_TAGS];
  host.innerHTML = tags
    .map(
      (t) =>
        `<button class="filter" type="button" data-filter="${escapeAttr(t)}" aria-pressed="${t === "All"}">${t}</button>`,
    )
    .join("");

  const filters = host.querySelectorAll("[data-filter]");
  const countEl = document.querySelector("[data-count]");
  const items = Array.from(grid.querySelectorAll("[data-tag]"));

  function apply(current) {
    let shown = 0;
    for (const item of items) {
      const match = current === "All" || item.dataset.tag === current;
      item.style.display = match ? "" : "none";
      if (match) shown++;
    }
    if (countEl) {
      countEl.textContent =
        shown + " of " + items.length + " pieces" + (current === "All" ? "" : " · " + current);
    }
    for (const btn of filters) {
      btn.setAttribute("aria-pressed", btn.dataset.filter === current ? "true" : "false");
    }
  }

  for (const btn of filters) {
    btn.addEventListener("click", () => apply(btn.dataset.filter));
  }
  apply("All");
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
