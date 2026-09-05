/* ─────────────────────────────────────────────────────────────
   Single source of truth for site content.
   Edit here → home slider, home preview, work grid, and the
   generated per-piece pages all update.

   To regenerate per-piece pages after editing TATTOOS:
       node scripts/build-pieces.js
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
//   src       path to image (leave empty '' for an unfilled slot on the grid)
//   slug      URL segment for the piece page — /work/{slug}/. Must be unique.
//   title     Short human-readable name — used as H1 and part of <title>.
//   place     Caption text ("Forearm", "Calf", …)
//   tag       Filter group on /work — one of the tags in FILTER_TAGS below
//   year      Stored for reference; NOT currently rendered anywhere on the site
//   span      Grid-row span for the mixed-height gallery (2 or 3)
//   alt       Accessible description of the piece (also used as meta description)
//   featured  Optional true — appears in the Home slider, excluded from the
//             Home preview grid. Everything appears in the Work grid.
const TATTOOS = [
  // ─── Featured pieces (Home slider — excluded from Home preview grid) ─
  { slug: "dragon-thigh",                       title: "Dragon",                        src: "assets/work/dragon-thigh.jpeg", place: "Thigh",     tag: "Leg",  year: 2025, span: 3, featured: true, alt: "Black and grey realism — dragon with outstretched wing on the thigh" },
  { slug: "pokemon-color-forearm",              title: "Psyduck and Gengar",            src: "assets/work/pokemon-color-forearm.jpeg", place: "Forearm",   tag: "Arm",  year: 2025, span: 3, featured: true, alt: "Color realism — psyduck and Gengar Pokemon piece" },
  { slug: "hibiscus-hummingbird-color-sleeve",  title: "Hibiscus and Hummingbird",      src: "assets/work/hibiscus-hummingbird-color-sleeve.jpeg", place: "Upper arm", tag: "Arm",  year: 2025, span: 3, featured: true, alt: "Color realism — vibrant hibiscus, marigold and hummingbird sleeve" },
  { slug: "tiger-mountain-samurai-sleeve",      title: "Tiger and Mountain",            src: "assets/work/tiger-mountain-samurai-sleeve.jpeg", place: "Arm",       tag: "Arm",  year: 2025, span: 3, featured: true, alt: "Black and grey realism — mountain scene with roaring tiger and samurai" },
  { slug: "fine-line-florals-hip",              title: "Fine-Line Florals",             src: "assets/work/fine-line-florals-hip.jpeg", place: "Hip",       tag: "Leg",  year: 2025, span: 2, featured: true, alt: "Black and grey realism — fine-line botanical florals across the hip and thigh" },
  { slug: "hooded-reaper-calf",                 title: "Hooded Reaper",                 src: "assets/work/hooded-reaper-calf.jpeg", place: "Calf",      tag: "Leg",  year: 2025, span: 3, featured: true, alt: "Black and grey realism — hooded reaper skull with skeletal hand on the calf" },
  { slug: "samurai-skull-katana-shin",          title: "Samurai Skull",                 src: "assets/work/samurai-skull-katana-shin.jpeg", place: "Shin",      tag: "Leg",  year: 2025, span: 3, featured: true, alt: "Black and grey realism — samurai skull in helmet gripping a katana" },
  { slug: "thorn-crowned-creature-upper-arm",   title: "Thorn-Crowned Creature",        src: "assets/work/thorn-crowned-creature-upper-arm.jpeg", place: "Upper arm", tag: "Arm",  year: 2025, span: 3, featured: true, alt: "Black and grey realism — grotesque creature crowned with thorns" },
  { slug: "angel-knight-forearm",               title: "Angel Knight",                  src: "assets/work/angel-knight-forearm.jpeg", place: "Forearm",   tag: "Arm",  year: 2025, span: 2, featured: true, alt: "Black and grey realism — hooded angel-knight holding a sword under a moon" },
  { slug: "gambling-calf",                      title: "Vegas Gambling",                src: "assets/work/gambling-calf.jpeg", place: "Calf",      tag: "Leg",  year: 2025, span: 3, featured: true, alt: "Black and grey realism — vegas gambling scene — cards, dice, chips and cash" },
  { slug: "realism-rose-forearm",               title: "Rose",                          src: "assets/work/realism-rose-forearm.jpeg", place: "Forearm",   tag: "Arm",  year: 2025, span: 2, featured: true, alt: "Black and grey realism — realistic black and grey rose in progress" },
  { slug: "stormtrooper-calf",                  title: "Stormtrooper",                  src: "assets/work/stormtrooper-calf.jpeg", place: "Calf",      tag: "Leg",  year: 2025, span: 3, featured: true, alt: "Black and grey realism — stormtrooper standing before the Imperial insignia" },

  // ─── Additional gallery pieces ────────────────────────────
  { slug: "portrait-skull-snake-sleeve",        title: "Portrait, Skull and Snake",     src: "assets/work/portrait-skull-snake-sleeve.jpeg",         place: "Arm",       tag: "Arm",  year: 2025, span: 3, alt: "Black and grey realism — portrait-and-skull morph with snake and skull sleeve" },
  { slug: "money-portrait-sleeve",              title: "Money Portrait Sleeve",         src: "assets/work/money-portrait-sleeve.jpeg",         place: "Arm",       tag: "Arm",  year: 2025, span: 3, featured: true, alt: "Black and grey realism — money portrait, praying hands, eye and rose full sleeve" },
  { slug: "valkyrie-wolf-sleeve",               title: "Valkyrie and Wolf",             src: "assets/work/valkyrie-wolf-sleeve.jpeg",         place: "Arm",       tag: "Arm",  year: 2025, span: 3, featured: true, alt: "Black and grey realism — valkyrie warrior with wolf full sleeve" },
  { slug: "lady-justice-mermaid-sleeve",        title: "Lady Justice and Mermaid",      src: "assets/work/lady-justice-mermaid-sleeve.jpeg",         place: "Arm",       tag: "Arm",  year: 2025, span: 3, featured: true, alt: "Black and grey realism — lady Justice with scales and mermaid sleeve" },
  { slug: "skull-blue-eye-hourglass-sleeve",    title: "Skull, Blue Eye and Hourglass", src: "assets/work/skull-blue-eye-hourglass-sleeve.jpeg",         place: "Arm",       tag: "Arm",  year: 2025, span: 3, alt: "Black and grey realism — skull with baroque filigree, blue eye and hourglass sleeve" },
  { slug: "skeleton-reading-books-sleeve",      title: "Skeleton Reading",              src: "assets/work/skeleton-reading-books-sleeve.jpeg",         place: "Arm",       tag: "Arm",  year: 2025, span: 3, alt: "Black and grey realism — skeleton reading, flowers, and stack of books" },
  { slug: "spartan-warrior-sleeve",             title: "Spartan Warrior",               src: "assets/work/spartan-warrior-sleeve.jpeg",         place: "Arm",       tag: "Arm",  year: 2025, span: 3, alt: "Black and grey realism — spartan warrior with helmet, army and temple sleeve" },
  { slug: "reaper-holding-face-upper-arm",      title: "Reaper Holding a Face",         src: "assets/work/reaper-holding-face-upper-arm.jpeg",         place: "Upper arm", tag: "Arm",  year: 2024, span: 3, alt: "Black and grey realism — reaper skull holding a face" },
  { slug: "skeletal-hands-spider-snake",        title: "Skeletal Hands",                src: "assets/work/skeletal-hands-spider-snake.jpeg",         place: "Hands",     tag: "Arm",  year: 2025, span: 2, alt: "Black and grey realism — skeletal hand tattoos with spider and snake" },
  { slug: "snake-and-skull-forearm",            title: "Snake and Skull",               src: "assets/work/snake-and-skull-forearm.jpeg",         place: "Forearm",   tag: "Arm",  year: 2025, span: 2, alt: "Black and grey realism — snake wrapped around a skull" },
  { slug: "collage-forearm",                    title: "Collage",                       src: "assets/work/collage-forearm.jpeg",         place: "Forearm",   tag: "Arm",  year: 2025, span: 3, alt: "Black and grey realism — abstract collage forearm — fragmented figures and faces" },
  { slug: "chola-portrait-hope-forearm",        title: "'Hope' Chola Portrait",         src: "assets/work/chola-portrait-hope-forearm.jpeg",         place: "Forearm",   tag: "Arm",  year: 2025, span: 3, alt: "Black and grey realism — chola portrait with 'Hope' script and ace of spades" },
  { slug: "split-face-skull-forearm",           title: "Split Face and Skull",          src: "assets/work/split-face-skull-forearm.jpeg",         place: "Forearm",   tag: "Arm",  year: 2025, span: 2, alt: "Black and grey realism — split face and skull with crown of thorns" },
  { slug: "deathly-hallows-skull-arm",          title: "Deathly Hallows Skull",         src: "assets/work/deathly-hallows-skull-arm.jpeg",         place: "Arm",       tag: "Arm",  year: 2024, span: 3, alt: "Black and grey realism — skull with Deathly Hallows crown and dragon" },
  { slug: "kratos-color-upper-arm",             title: "Kratos",                        src: "assets/work/kratos-color-upper-arm.jpeg",         place: "Upper arm", tag: "Arm",  year: 2024, span: 3, alt: "Color realism — kratos with axe" },
  { slug: "skull-red-web-color-arm",            title: "Skull on Red Web",              src: "assets/work/skull-red-web-color-arm.jpeg",         place: "Arm",       tag: "Arm",  year: 2024, span: 3, alt: "Color realism — skull with red spider web" },
  { slug: "snowflakes-color-sleeve",            title: "Snowflakes and Blossoms",       src: "assets/work/snowflakes-color-sleeve.jpeg",         place: "Arm",       tag: "Arm",  year: 2024, span: 3, alt: "Color realism — snowflakes and cherry blossoms on deep blue" },
  { slug: "ghostface-color-hand",               title: "Ghostface",                     src: "assets/work/ghostface-color-hand.jpeg",         place: "Hand",      tag: "Arm",  year: 2025, span: 2, alt: "Color realism — ghostface with red rotary phone hand piece" },
  { slug: "cryptkeeper-color-upper-arm",        title: "Cryptkeeper",                   src: "assets/work/cryptkeeper-color-upper-arm.jpeg",  place: "Upper arm", tag: "Arm",  year: 2025, span: 3, alt: "Color realism — Cryptkeeper portrait in red tones on the upper arm" },
  { slug: "astronaut-color-forearm",            title: "Astronaut",                     src: "assets/work/astronaut-color-forearm.jpeg",      place: "Forearm",   tag: "Arm",  year: 2025, span: 3, alt: "Color realism — astronaut floating in a purple and blue galaxy with moon and constellations" },
  { slug: "marvel-color-sleeve",                title: "Marvel Sleeve",                 src: "assets/work/marvel-color-sleeve.jpeg",          place: "Arm",       tag: "Arm",  year: 2025, span: 3, alt: "Color realism — Marvel sleeve with Spider-Man, Punisher skull, Deadpool and Wolverine" },
  { slug: "wolverine-color-forearm",            title: "Wolverine",                     src: "assets/work/wolverine-color-forearm.jpeg",      place: "Forearm",   tag: "Arm",  year: 2025, span: 3, alt: "Color realism — Wolverine portrait with claws and SNIKT comic effect" },
  { slug: "marvel-logo-color-forearm",          title: "Marvel Logo",                   src: "assets/work/marvel-logo-color-forearm.jpeg",    place: "Forearm",   tag: "Arm",  year: 2025, span: 2, alt: "Color realism — Marvel logo with Wolverine and Deadpool comic-book detail" },

  { slug: "plague-doctor-calf",                 title: "Plague Doctor",                 src: "assets/work/plague-doctor-calf.jpeg",         place: "Calf",      tag: "Leg",  year: 2025, span: 3, alt: "Black and grey realism — plague doctor holding a lantern" },
  { slug: "frankenstein-calf",                  title: "Frankenstein",                  src: "assets/work/frankenstein-calf.jpeg",         place: "Calf",      tag: "Leg",  year: 2025, span: 2, alt: "Black and grey realism — frankenstein's monster portrait" },
  { slug: "gothic-virgin-skull-leg",            title: "Gothic Leg Piece",              src: "assets/work/gothic-virgin-skull-leg.jpeg",         place: "Leg",       tag: "Leg",  year: 2025, span: 3, alt: "Black and grey realism — gothic full-leg piece — skull, virgin figure, roses, snake" },
  { slug: "spider-color-calf",                  title: "Spider on Green",               src: "assets/work/spider-color-calf.jpeg",         place: "Calf",      tag: "Leg",  year: 2024, span: 3, alt: "Color realism — spider on green ground" },

  { slug: "odin-raven-back",                    title: "Odin and Raven",                src: "assets/work/odin-raven-back.jpeg",         place: "Back",      tag: "Back", year: 2025, span: 3, featured: true, alt: "Black and grey realism — odin with raven, sword and skull back piece" },
  { slug: "winged-saint-back",                  title: "Winged Saint",                  src: "assets/work/winged-saint-back.jpg",          place: "Back",      tag: "Back", year: 2025, span: 3, featured: true, alt: "Black and grey realism — winged saint with skeletal figures full-back piece" },
  { slug: "floral-bouquet-upper-back",          title: "Floral Bouquet",                src: "assets/work/floral-bouquet-upper-back.jpeg",         place: "Upper back",tag: "Back", year: 2025, span: 2, alt: "Black and grey realism — fine-line floral bouquet with ferns and chrysanthemums" },

  { slug: "angel-woman-heart-chest",            title: "Angel, Heart and Demon",        src: "assets/work/angel-woman-heart-chest.jpeg",         place: "Chest",     tag: "Torso",year: 2025, span: 3, alt: "Black and grey realism — angel-winged woman, anatomical heart, horned demon skull chest piece" },
  { slug: "headdress-skull-chest",              title: "Skull with Headdress",          src: "assets/work/headdress-skull-chest.jpeg",         place: "Chest",     tag: "Torso",year: 2025, span: 2, alt: "Black and grey realism — skull with feathered headdress and ink splatter" },
];

// Filter buttons shown on /work — order preserved. "All" is added automatically.
const FILTER_TAGS = ["Arm", "Leg", "Back", "Torso"];

const MOTION = {
  rotateMs: 4500, // slider auto-advance interval (keep in sync with --rotate-ms in tokens.css)
  crossfadeMs: 900, // hero image crossfade duration
};

if (typeof window !== "undefined") {
  window.__NR = { SITE, NAV, TATTOOS, FILTER_TAGS, MOTION };
}

// Node consumers (scripts/build-pieces.js) can also import these values.
if (typeof module !== "undefined" && module.exports) {
  module.exports = { SITE, NAV, TATTOOS, FILTER_TAGS, MOTION };
}
})();
