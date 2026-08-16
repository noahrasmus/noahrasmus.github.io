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
