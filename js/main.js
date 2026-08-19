/* Orchestrator — runs after content.js + ui.js have loaded.
   Scripts use `defer`, so DOM is parsed and both dependencies
   are available by the time this executes. */
const ui = window.__NR_UI;

ui.initSiteHeader();
ui.initHeroNav();
ui.initNavToggle();
ui.initWorkGrid();
ui.initFilters();
ui.initPreviewGrid();
ui.initSlider();
