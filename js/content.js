/* ─────────────────────────────────────────────────────────────
   Single source of truth for site content.
   Edit here → home slider, home preview, and work grid all
   update. Add a new tattoo by adding one object to TATTOOS.
   ───────────────────────────────────────────────────────────── */
(function () {
const SITE = {
  brand: "Noah Rasmus",
};

const NAV = [
  { href: "index.html", label: "Home", page: "home" },
  { href: "work.html", label: "Work", page: "work" },
  { href: "about.html", label: "About", page: "about" },
  { href: "contact.html", label: "Contact", page: "contact" },
];

// Each entry:
//   src         path to image (leave empty '' to keep an unfilled slot on the grid)
//   place       caption text ("Forearm", "Calf", …)
//   tag         filter group on /work — one of the tags in FILTER_TAGS below
//   year        caption year
//   span        grid-row span for the mixed-height gallery (2 or 3)
//   alt         accessible description of the piece
const TATTOOS = [
  {
    src: "assets/tattoo-01.jpeg",
    place: "Forearm",
    tag: "Arm",
    year: 2025,
    span: 2,
    alt: "Skeletal hand wrapped by a snake and rose",
  },
  {
    src: "assets/tattoo-02.jpeg",
    place: "Calf",
    tag: "Leg",
    year: 2025,
    span: 3,
    alt: "Warrior sleeve — calf",
  },
  {
    src: "assets/tattoo-03-back.jpeg",
    place: "Arm",
    tag: "Arm",
    year: 2024,
    span: 2,
    alt: "Arm sleeve",
  },
  {
    src: "assets/tattoo-06-hip.jpeg",
    place: "Hip",
    tag: "Leg",
    year: 2025,
    span: 3,
    alt: "Hip — chained serpent",
  },
  {
    src: "assets/tattoo-05-arm.jpeg",
    place: "Upper arm",
    tag: "Arm",
    year: 2024,
    span: 3,
    alt: "Upper arm — veiled portrait",
  },
  {
    src: "assets/tattoo-04-thigh.jpeg",
    place: "Thigh",
    tag: "Leg",
    year: 2025,
    span: 2,
    alt: "Thigh — dragon",
  },
  { src: "", place: "Shoulder", tag: "Arm", year: 2023, span: 2, alt: "" },
  { src: "", place: "Spine", tag: "Back", year: 2024, span: 3, alt: "" },
];

// Filter buttons shown on /work — order preserved. "All" is added automatically.
const FILTER_TAGS = ["Arm", "Leg", "Back", "Torso"];

const MOTION = {
  rotateMs: 4500, // slider auto-advance interval (keep in sync with --rotate-ms in tokens.css)
  crossfadeMs: 900, // hero image crossfade duration
};

window.__NR = { SITE, NAV, TATTOOS, FILTER_TAGS, MOTION };
})();
