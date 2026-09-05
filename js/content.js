/* ─────────────────────────────────────────────────────────────
   Single source of truth for site content.
   Edit here → home slider, home preview, and work grid all
   update. Add a new tattoo by adding one object to TATTOOS.
   ───────────────────────────────────────────────────────────── */
(function () {
const SITE = {
  brand: "Noah Rasmus",
};

// "Home" is intentionally omitted — the brand/wordmark is the home link
// on every page, so a redundant "Home" nav item would be noise.
const NAV = [
  { href: "work.html", label: "Work", page: "work" },
  { href: "about.html", label: "About", page: "about" },
  { href: "contact.html", label: "Contact", page: "contact" },
];

// Each entry:
//   src     path to image (leave empty '' for an unfilled slot on the grid)
//   place   caption text ("Forearm", "Calf", …)
//   tag     filter group on /work — one of the tags in FILTER_TAGS below
//   year    stored for reference; NOT currently rendered anywhere on the site
//   span    grid-row span for the mixed-height gallery (2 or 3)
//   alt     accessible description of the piece
//
// Order matters — first items appear first in the slider, first in the
// preview on Home, and first in the Work grid. "featured" pieces stay
// on top; everything below fills the rest of the gallery.
const TATTOOS = [
  // ─── Featured pieces (front and center) ───────────────────
  { src: "assets/featured/IMG_6908.jpeg", place: "Thigh",     tag: "Leg", year: 2025, span: 3, alt: "Dragon with outstretched wing on the thigh" },
  { src: "assets/featured/IMG_7573.jpeg", place: "Upper arm", tag: "Arm", year: 2025, span: 3, alt: "Vibrant hibiscus, marigold and hummingbird color sleeve" },
  { src: "assets/featured/IMG_7652.jpeg", place: "Arm",       tag: "Arm", year: 2025, span: 3, alt: "Mountain scene with roaring tiger and samurai" },
  { src: "assets/featured/IMG_7461.jpeg", place: "Hip",       tag: "Leg", year: 2025, span: 2, alt: "Fine-line botanical florals across the hip and thigh" },
  { src: "assets/featured/IMG_6207.jpeg", place: "Calf",      tag: "Leg", year: 2025, span: 3, alt: "Hooded reaper skull with skeletal hand on the calf" },
  { src: "assets/featured/IMG_7699.jpeg", place: "Shin",      tag: "Leg", year: 2025, span: 3, alt: "Samurai skull in helmet gripping a katana" },
  { src: "assets/featured/IMG_7277.jpeg", place: "Upper arm", tag: "Arm", year: 2025, span: 3, alt: "Grotesque creature crowned with thorns" },
  { src: "assets/featured/IMG_6279.jpeg", place: "Forearm",   tag: "Arm", year: 2025, span: 2, alt: "Hooded angel-knight holding a sword under a moon" },
  { src: "assets/featured/IMG_6587.jpeg", place: "Calf",      tag: "Leg", year: 2025, span: 3, alt: "Vegas gambling scene — cards, dice, chips and cash" },
  { src: "assets/featured/IMG_7478.jpeg", place: "Forearm",   tag: "Arm", year: 2025, span: 2, alt: "Realistic black and grey rose in progress" },
  { src: "assets/featured/IMG_7547.jpeg", place: "Calf",      tag: "Leg", year: 2025, span: 3, alt: "Stormtrooper standing before the Imperial insignia" },

  // ─── Additional gallery pieces ────────────────────────────
  { src: "assets/IMG_1124.jpeg",         place: "Arm",       tag: "Arm",  year: 2025, span: 3, alt: "Portrait-and-skull morph with snake and skull sleeve" },
  { src: "assets/IMG_4738.jpeg",         place: "Arm",       tag: "Arm",  year: 2025, span: 3, alt: "Money portrait, praying hands, eye and rose full sleeve" },
  { src: "assets/IMG_5651.jpeg",         place: "Arm",       tag: "Arm",  year: 2025, span: 3, alt: "Valkyrie warrior with wolf full sleeve" },
  { src: "assets/IMG_6182.jpeg",         place: "Arm",       tag: "Arm",  year: 2025, span: 3, alt: "Lady Justice with scales and mermaid sleeve" },
  { src: "assets/IMG_4994.jpeg",         place: "Arm",       tag: "Arm",  year: 2025, span: 3, alt: "Skull with baroque filigree, blue eye and hourglass sleeve" },
  { src: "assets/IMG_5711.jpeg",         place: "Arm",       tag: "Arm",  year: 2025, span: 3, alt: "Skeleton reading, flowers, and stack of books" },
  { src: "assets/IMG_6398.jpeg",         place: "Arm",       tag: "Arm",  year: 2025, span: 3, alt: "Spartan warrior with helmet, army and temple sleeve" },
  { src: "assets/IMG_2183.jpeg",         place: "Upper arm", tag: "Arm",  year: 2024, span: 3, alt: "Reaper skull holding a face" },
  { src: "assets/IMG_5698.jpeg",         place: "Hands",     tag: "Arm",  year: 2025, span: 2, alt: "Skeletal hand tattoos with spider and snake" },
  { src: "assets/IMG_4483.jpeg",         place: "Forearm",   tag: "Arm",  year: 2025, span: 2, alt: "Snake wrapped around a skull" },
  { src: "assets/IMG_4600.jpeg",         place: "Forearm",   tag: "Arm",  year: 2025, span: 3, alt: "Abstract collage forearm — fragmented figures and faces" },
  { src: "assets/IMG_6287.jpeg",         place: "Forearm",   tag: "Arm",  year: 2025, span: 3, alt: "Chola portrait with 'Hope' script and ace of spades" },
  { src: "assets/IMG_7564.jpeg",         place: "Forearm",   tag: "Arm",  year: 2025, span: 2, alt: "Split face and skull with crown of thorns" },
  { src: "assets/IMG_1500.jpeg",         place: "Arm",       tag: "Arm",  year: 2024, span: 3, alt: "Skull with Deathly Hallows crown and dragon" },
  { src: "assets/IMG_0527.jpeg",         place: "Upper arm", tag: "Arm",  year: 2024, span: 3, alt: "Kratos with axe (color)" },
  { src: "assets/IMG_5758.jpeg",         place: "Arm",       tag: "Arm",  year: 2024, span: 3, alt: "Skull with red spider web (color)" },
  { src: "assets/IMG_5896.jpeg",         place: "Arm",       tag: "Arm",  year: 2024, span: 3, alt: "Snowflakes and cherry blossoms on deep blue (color sleeve)" },
  { src: "assets/IMG_7529.jpeg",         place: "Forearm",   tag: "Arm",  year: 2025, span: 3, alt: "Psyduck and Gengar Pokemon piece (color)" },
  { src: "assets/IMG_6283.jpeg",         place: "Hand",      tag: "Arm",  year: 2025, span: 2, alt: "Ghostface with red rotary phone hand piece (color)" },

  { src: "assets/IMG_3064.jpeg",         place: "Calf",      tag: "Leg",  year: 2025, span: 3, alt: "Plague doctor holding a lantern" },
  { src: "assets/IMG_3419.jpeg",         place: "Calf",      tag: "Leg",  year: 2025, span: 2, alt: "Frankenstein's monster portrait" },
  { src: "assets/IMG_6267.jpeg",         place: "Leg",       tag: "Leg",  year: 2025, span: 3, alt: "Gothic full-leg piece — skull, virgin figure, roses, snake" },
  { src: "assets/IMG_0559.jpeg",         place: "Calf",      tag: "Leg",  year: 2024, span: 3, alt: "Spider on green ground (color)" },

  { src: "assets/IMG_5922.jpeg",         place: "Back",      tag: "Back", year: 2025, span: 3, alt: "Odin with raven, sword and skull back piece" },
  { src: "assets/IMG_6327.jpg",          place: "Back",      tag: "Back", year: 2025, span: 3, alt: "Winged saint with skeletal figures full-back piece" },
  { src: "assets/IMG_7173.jpeg",         place: "Upper back",tag: "Back", year: 2025, span: 2, alt: "Fine-line floral bouquet with ferns and chrysanthemums" },

  { src: "assets/IMG_9438.jpeg",         place: "Chest",     tag: "Torso",year: 2025, span: 3, alt: "Angel-winged woman, anatomical heart, horned demon skull chest piece" },
  { src: "assets/IMG_6811.jpeg",         place: "Chest",     tag: "Torso",year: 2025, span: 2, alt: "Skull with feathered headdress and ink splatter" },
];

// Filter buttons shown on /work — order preserved. "All" is added automatically.
const FILTER_TAGS = ["Arm", "Leg", "Back", "Torso"];

const MOTION = {
  rotateMs: 4500, // slider auto-advance interval (keep in sync with --rotate-ms in tokens.css)
  crossfadeMs: 900, // hero image crossfade duration
};

window.__NR = { SITE, NAV, TATTOOS, FILTER_TAGS, MOTION };
})();
