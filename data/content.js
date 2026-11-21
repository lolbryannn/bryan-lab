/*
  ALL SITE CONTENT LIVES HERE.
  - Edit SITE for your name, links and tagline.
  - Add an object to ITEMS to publish something in the Library.
  - Add an object to PROMPTS to publish a prompt on the home page.
  Every text field can be { id: "...", en: "..." } for Indonesian + English,
  or a plain string if it is the same in both languages.
  Remove `sample: true` (or the whole sample item) once you put in your own content.
*/

window.SITE = {
  name: "Bryan",
  brand: "bryan.lab",
  handle: "@lolbryannn",
  initials: "B",
  photo: "", // e.g. "assets/me.jpg" — leave empty to show initials
  tagline: {
    id: "Semua yang kamu lihat di videoku, ada di sini.",
    en: "Everything you see in my videos lives here."
  },
  intro: {
    id: "Template, prompt, file desain, preset, tutorial, dan produk yang aku pakai sendiri. Ambil, ubah, pakai.",
    en: "Templates, prompts, design files, presets, tutorials and products I actually use. Grab them, tweak them, use them."
  },
  socials: [
    { name: "Instagram", handle: "@lolbryannn", url: "https://www.instagram.com/lolbryannn/" },
    { name: "TikTok", handle: "@lolbryan6996", url: "https://www.tiktok.com/@lolbryan6996" }
  ],
  currency: "IDR"
};

/* Item types shown as filters in the Library. Change labels or add your own. */
window.TYPES = [
  { key: "template", glyph: "</>", label: { id: "Template", en: "Templates" } },
  { key: "design",   glyph: "◇",   label: { id: "File Desain", en: "Design files" } },
  { key: "preset",   glyph: "≋",   label: { id: "Preset", en: "Presets" } },
  { key: "tutorial", glyph: "▶",   label: { id: "Tutorial", en: "Tutorials" } },
  { key: "product",  glyph: "◎",   label: { id: "Produk", en: "Products" } }
];

/*
  ITEM FIELDS
  slug      unique id, used in the link: library.html#item/<slug>
  type      one of the TYPES keys above
  title, summary            text (bilingual)
  price     0 for free, or a number in SITE.currency (e.g. 49000)
  link      where the main button goes (download, GitHub, Gumroad, Lynk.id, YouTube…)
  image     optional thumbnail path or URL
  tags      list of search words
  features, steps           { id: [...], en: [...] }
  files     optional list of what's inside
  updated   "YYYY-MM-DD"
  featured  true = also shown on the home page
*/
window.ITEMS = [
  {
    slug: "portfolio-starter",
    sample: true,
    type: "template",
    title: { id: "Portfolio Starter", en: "Portfolio Starter" },
    summary: {
      id: "Website portofolio satu halaman: hero, proyek, kontak. HTML + CSS murni, tinggal ganti teks.",
      en: "One-page portfolio site: hero, projects, contact. Plain HTML + CSS, just swap the text."
    },
    price: 0,
    link: "#",
    tags: ["website", "html", "portfolio"],
    features: {
      id: ["Responsif di HP", "Mode gelap & terang", "Tanpa framework, buka langsung index.html"],
      en: ["Mobile friendly", "Dark and light mode", "No framework, just open index.html"]
    },
    steps: {
      id: ["Unduh ZIP lalu ekstrak", "Ganti teks di index.html", "Unggah ke Netlify atau GitHub Pages"],
      en: ["Download the ZIP and extract it", "Edit the text in index.html", "Upload to Netlify or GitHub Pages"]
    },
    files: ["index.html", "style.css", "README.md"],
    updated: "2026-11-21",
    featured: true
  },
  {
    slug: "reels-cover-pack",
    sample: true,
    type: "design",
    title: { id: "Paket Cover Reels", en: "Reels Cover Pack" },
    summary: {
      id: "12 cover Reels 1080×1920 yang bisa diedit di Canva atau Figma.",
      en: "12 editable 1080×1920 Reels covers for Canva or Figma."
    },
    price: 0,
    link: "#",
    tags: ["canva", "figma", "reels", "cover"],
    features: {
      id: ["12 layout berbeda", "Font gratis", "Warna mudah diganti"],
      en: ["12 different layouts", "Free fonts only", "Easy colour swaps"]
    },
    steps: {
      id: ["Buka link template", "Duplikat ke akunmu", "Ganti judul dan foto"],
      en: ["Open the template link", "Duplicate it to your account", "Change the title and photo"]
    },
    updated: "2026-11-21",
    featured: true
  },
  {
    slug: "moody-night-presets",
    sample: true,
    type: "preset",
    title: { id: "Preset Moody Night", en: "Moody Night Presets" },
    summary: {
      id: "5 preset Lightroom untuk foto malam: biru dingin, lampu jalan hangat.",
      en: "5 Lightroom presets for night shots: cool blues, warm street lights."
    },
    price: 25000,
    link: "#",
    tags: ["lightroom", "foto", "photo", "preset"],
    features: {
      id: ["Lightroom mobile & desktop (.dng + .xmp)", "5 variasi", "Panduan pemasangan"],
      en: ["Lightroom mobile and desktop (.dng + .xmp)", "5 variations", "Install guide"]
    },
    steps: {
      id: ["Beli & unduh", "Impor ke Lightroom", "Atur exposure per foto"],
      en: ["Buy and download", "Import into Lightroom", "Adjust exposure per photo"]
    },
    updated: "2026-11-21",
    featured: true
  },
  {
    slug: "capcut-auto-captions",
    sample: true,
    type: "tutorial",
    title: { id: "Caption Otomatis di CapCut", en: "Auto Captions in CapCut" },
    summary: {
      id: "Tutorial 6 menit: caption per kata yang rapi, tanpa edit manual satu-satu.",
      en: "6-minute tutorial: clean word-by-word captions without editing each one."
    },
    price: 0,
    link: "#",
    tags: ["capcut", "caption", "video"],
    features: {
      id: ["Video langkah demi langkah", "Gaya caption siap pakai"],
      en: ["Step-by-step video", "Ready-made caption style"]
    },
    steps: {
      id: ["Tonton videonya", "Ikuti di CapCut"],
      en: ["Watch the video", "Follow along in CapCut"]
    },
    updated: "2026-11-21"
  },
  {
    slug: "content-planner-notion",
    sample: true,
    type: "product",
    title: { id: "Content Planner Notion", en: "Notion Content Planner" },
    summary: {
      id: "Kalender konten, bank ide, dan tracker performa dalam satu template Notion.",
      en: "Content calendar, idea bank and performance tracker in one Notion template."
    },
    price: 49000,
    link: "#",
    tags: ["notion", "planner", "konten", "content"],
    features: {
      id: ["Kalender bulanan & mingguan", "Bank ide dengan status", "Tracker views & likes"],
      en: ["Monthly and weekly calendar", "Idea bank with status", "Views and likes tracker"]
    },
    steps: {
      id: ["Beli lalu buka link Notion", "Klik Duplicate", "Mulai isi ide pertamamu"],
      en: ["Buy, then open the Notion link", "Click Duplicate", "Add your first idea"]
    },
    updated: "2026-11-21"
  },
  {
    slug: "link-in-bio",
    sample: true,
    type: "template",
    title: { id: "Link in Bio", en: "Link in Bio" },
    summary: {
      id: "Halaman link-in-bio milikmu sendiri, gratis dihosting, tanpa iklan.",
      en: "Your own link-in-bio page, free to host, no ads."
    },
    price: 0,
    link: "#",
    tags: ["website", "bio", "link"],
    features: {
      id: ["Satu file HTML", "Ikon sosial media", "Ringan & cepat"],
      en: ["Single HTML file", "Social icons", "Light and fast"]
    },
    steps: {
      id: ["Unduh", "Ganti link-linkmu", "Unggah"],
      en: ["Download", "Replace the links", "Upload"]
    },
    updated: "2026-11-21"
  }
];

/* Prompts live in data/prompts.js */
