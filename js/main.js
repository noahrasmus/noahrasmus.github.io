// Mobile nav toggle (used on non-home pages via .site-header)
document.addEventListener("click", (e) => {
  const toggle = e.target.closest(".site-header__nav-toggle");
  if (!toggle) return;
  const header = toggle.closest(".site-header");
  if (!header) return;
  header.classList.toggle("is-open");
});

// Work page filter — hooks up buttons with data-filter to grid items with data-tag.
(function initFilters() {
  const filters = document.querySelectorAll("[data-filter]");
  if (!filters.length) return;
  const grid = document.querySelector("[data-grid]");
  if (!grid) return;
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
      const total = items.length;
      countEl.textContent =
        shown + " of " + total + " pieces" + (current === "All" ? "" : " · " + current);
    }
    for (const btn of filters) {
      btn.setAttribute("aria-pressed", btn.dataset.filter === current ? "true" : "false");
    }
  }

  for (const btn of filters) {
    btn.addEventListener("click", () => apply(btn.dataset.filter));
  }
  apply("All");
})();

// Home hero slider — rotates hero image every ROTATE_MS,
// with the "next in queue" always visible in the strip below.
(function initHeroSlider() {
  const stage = document.querySelector("[data-hero-stage]");
  const strip = document.querySelector("[data-recent-strip]");
  if (!stage || !strip) return;

  const IMAGES = [
    { src: "assets/tattoo-01.jpeg", alt: "Skeletal hand wrapped by a snake and rose" },
    { src: "assets/tattoo-02.jpeg", alt: "Warrior sleeve — calf" },
    { src: "assets/tattoo-04-thigh.jpeg", alt: "Dragon — thigh" },
    { src: "assets/tattoo-05-arm.jpeg", alt: "Veiled portrait — upper arm" },
    { src: "assets/tattoo-03-back.jpeg", alt: "Arm sleeve" },
    { src: "assets/tattoo-06-hip.jpeg", alt: "Chained serpent — hip" },
  ];
  const ROTATE_MS = 4500;
  const CROSSFADE_MS = 900;

  // Preload so swaps don't stutter on first pass.
  for (const it of IMAGES) {
    const im = new Image();
    im.src = it.src;
  }

  const layerA = stage.querySelector('[data-layer="a"]');
  const layerB = stage.querySelector('[data-layer="b"]');
  const stripImgs = Array.from(strip.querySelectorAll(".slot img"));
  const progress = document.querySelector("[data-progress]");
  if (progress) progress.style.animationDuration = ROTATE_MS + "ms";

  function restartProgress() {
    if (!progress) return;
    progress.classList.remove("is-running");
    void progress.offsetWidth;
    progress.classList.add("is-running");
  }

  let idx = 0;
  let showingA = true;

  function renderStrip() {
    for (let i = 0; i < stripImgs.length; i++) {
      const item = IMAGES[(idx + 1 + i) % IMAGES.length];
      if (stripImgs[i].getAttribute("src") !== item.src) {
        stripImgs[i].src = item.src;
        stripImgs[i].alt = item.alt;
      }
    }
  }

  // Seed layer A with the current image, prime layer B with the next.
  layerA.src = IMAGES[idx].src;
  layerA.alt = IMAGES[idx].alt;
  layerA.classList.add("is-active");
  layerB.src = IMAGES[(idx + 1) % IMAGES.length].src;
  layerB.alt = IMAGES[(idx + 1) % IMAGES.length].alt;
  renderStrip();
  restartProgress();

  function tick() {
    idx = (idx + 1) % IMAGES.length;
    const incoming = showingA ? layerB : layerA;
    const outgoing = showingA ? layerA : layerB;

    incoming.classList.add("is-active");
    outgoing.classList.remove("is-active");
    outgoing.setAttribute("aria-hidden", "true");
    incoming.removeAttribute("aria-hidden");

    // After the crossfade finishes, prime the now-hidden layer with the next image.
    setTimeout(() => {
      const nextItem = IMAGES[(idx + 1) % IMAGES.length];
      outgoing.src = nextItem.src;
      outgoing.alt = nextItem.alt;
    }, CROSSFADE_MS);

    showingA = !showingA;
    renderStrip();
    restartProgress();
  }

  setInterval(tick, ROTATE_MS);
})();
