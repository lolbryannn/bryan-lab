/* Shared logic for every page: language, nav, footer, rendering helpers. */
(function () {
  "use strict";

  const SITE = window.SITE || {};
  const TYPES = window.TYPES || [];
  const ITEMS = window.ITEMS || [];
  const PROMPTS = window.PROMPTS || [];

  /* ---------- UI text (both languages) ---------- */
  const UI = {
    "nav.home":        { id: "beranda", en: "home" },
    "nav.library":     { id: "library", en: "library" },
    "nav.prompts":     { id: "prompt", en: "prompts" },
    "nav.socials":     { id: "sosmed", en: "socials" },
    "hero.status":     { id: "update tiap minggu", en: "updated weekly" },
    "hero.cta1":       { id: "Buka library", en: "Open the library" },
    "hero.cta2":       { id: "Lihat prompt", en: "See prompts" },
    "home.explore":    { id: "Jelajahi", en: "Explore" },
    "home.exploreH":   { id: "Pilih yang kamu cari", en: "Pick what you need" },
    "home.featured":   { id: "Pilihan", en: "Featured" },
    "home.featuredH":  { id: "Lagi banyak dicari", en: "Most wanted right now" },
    "home.all":        { id: "Semua item →", en: "All items →" },
    "home.prompts":    { id: "Prompt", en: "Prompts" },
    "home.promptsH":   { id: "Salin, ganti, jalankan", en: "Copy, tweak, run" },
    "home.socials":    { id: "Sosmed", en: "Socials" },
    "home.socialsH":   { id: "Ikuti biar nggak ketinggalan", en: "Follow so you don't miss drops" },
    "type.prompts":    { id: "Prompt", en: "Prompts" },
    "count.items":     { id: "item", en: "items" },
    "lib.title":       { id: "Library", en: "Library" },
    "lib.lead":        { id: "Semua template, file desain, preset, tutorial, dan produk di satu tempat. Klik item untuk lihat detail dan unduh.", en: "Every template, design file, preset, tutorial and product in one place. Click an item for details and downloads." },
    "lib.search":      { id: "Cari… (mis. canva, website, preset)", en: "Search… (e.g. canva, website, preset)" },
    "lib.all":         { id: "Semua", en: "All" },
    "lib.free":        { id: "Gratis", en: "Free" },
    "lib.paid":        { id: "Berbayar", en: "Paid" },
    "lib.results":     { id: "{n} item", en: "{n} items" },
    "lib.empty":       { id: "Tidak ada yang cocok. Coba kata lain.", en: "Nothing matches. Try another word." },
    "lib.notfound":    { id: "Item tidak ditemukan.", en: "Item not found." },
    "d.close":         { id: "Tutup", en: "Close" },
    "d.download":      { id: "Unduh gratis", en: "Download free" },
    "d.buy":           { id: "Beli · {p}", en: "Buy · {p}" },
    "d.share":         { id: "Salin link", en: "Copy link" },
    "d.features":      { id: "Isi & fitur", en: "What's inside" },
    "d.steps":         { id: "Cara pakai", en: "How to use" },
    "d.files":         { id: "Berkas", en: "Files" },
    "d.updated":       { id: "Diperbarui", en: "Updated" },
    "d.note":          { id: "Gratis untuk dipakai sendiri. Jangan dijual ulang. Kalau terbantu, follow & share ya.", en: "Free for your own use. Please don't resell. If it helped, a follow and a share means a lot." },
    "free":            { id: "Gratis", en: "Free" },
    "paid":            { id: "Berbayar", en: "Paid" },
    "sample":          { id: "contoh", en: "sample" },
    "copy":            { id: "Salin", en: "Copy" },
    "copied":          { id: "Tersalin ✓", en: "Copied ✓" },
    "linkCopied":      { id: "Link tersalin", en: "Link copied" },
    "foot.made":       { id: "Dibuat sendiri, dihosting gratis.", en: "Hand-made, hosted for free." }
  };

  /* ---------- Language ---------- */
  function readLang() {
    try {
      const saved = localStorage.getItem("lang");
      if (saved === "id" || saved === "en") return saved;
    } catch (e) { /* storage blocked */ }
    return (navigator.language || "").toLowerCase().startsWith("id") ? "id" : "en";
  }
  let lang = readLang();
  const listeners = [];

  function t(v) {
    if (v == null) return "";
    if (typeof v === "string" || typeof v === "number") return String(v);
    if (Array.isArray(v)) return v;
    return v[lang] != null ? v[lang] : (v.en != null ? v.en : v.id);
  }
  function ui(key, vars) {
    let s = t(UI[key]) || key;
    if (vars) Object.keys(vars).forEach(k => { s = s.replace("{" + k + "}", vars[k]); });
    return s;
  }
  function setLang(l) {
    lang = l;
    try { localStorage.setItem("lang", l); } catch (e) { /* ignore */ }
    applyStatic();
    listeners.forEach(fn => fn());
  }
  function onLang(fn) { listeners.push(fn); }

  function applyStatic() {
    document.documentElement.lang = lang;
    document.querySelectorAll("[data-i18n]").forEach(el => { el.textContent = ui(el.dataset.i18n); });
    document.querySelectorAll("[data-i18n-ph]").forEach(el => { el.placeholder = ui(el.dataset.i18nPh); });
    document.querySelectorAll("[data-site]").forEach(el => { el.textContent = t(SITE[el.dataset.site]); });
    document.querySelectorAll(".lang button").forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === lang)));
  }

  /* ---------- Helpers ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }
  function safeUrl(u) {
    const s = String(u || "#").trim();
    return /^(https?:|mailto:|#|\.{0,2}\/|[a-z0-9_-]+\.html|assets\/)/i.test(s) ? s : "#";
  }
  function money(n) {
    try {
      return new Intl.NumberFormat(lang === "id" ? "id-ID" : "en-US", { style: "currency", currency: SITE.currency || "IDR", maximumFractionDigits: 0 }).format(n);
    } catch (e) { return String(n); }
  }
  function typeOf(key) { return TYPES.find(x => x.key === key) || { key, glyph: "•", label: key }; }
  function hashHue(str) { let h = 0; for (const c of String(str)) h = (h * 31 + c.charCodeAt(0)) >>> 0; return h % 360; }
  function thumbStyle(item) {
    const h = hashHue(item.slug);
    return `background: radial-gradient(120% 120% at 0% 0%, hsl(${h} 70% 38%) 0%, transparent 55%), radial-gradient(120% 120% at 100% 100%, hsl(${(h + 70) % 360} 75% 30%) 0%, transparent 60%), #10131a;`;
  }
  function priceBadge(item) {
    return item.price > 0
      ? `<span class="badge badge-paid">${esc(money(item.price))}</span>`
      : `<span class="badge badge-free">${esc(ui("free"))}</span>`;
  }
  function sampleBadge(x) { return x.sample ? `<span class="badge badge-sample">${esc(ui("sample"))}</span>` : ""; }
  function thumb(item) {
    const ty = typeOf(item.type);
    const inner = item.image
      ? `<img src="${esc(safeUrl(item.image))}" alt="" loading="lazy">`
      : `<span class="thumb-glyph" aria-hidden="true">${esc(ty.glyph)}</span>`;
    return `<div class="thumb" style="${item.image ? "" : thumbStyle(item)}">${inner}<div class="badges">${priceBadge(item)}${sampleBadge(item)}</div></div>`;
  }
  function cardHTML(item, samePage) {
    const ty = typeOf(item.type);
    const href = (samePage === true ? "" : "library.html") + "#item/" + encodeURIComponent(item.slug);
    return `<a class="card reveal" href="${href}" data-slug="${esc(item.slug)}">
      ${thumb(item)}
      <div class="card-body">
        <span class="card-type">${esc(ty.glyph)} ${esc(t(ty.label))}</span>
        <h3>${esc(t(item.title))}</h3>
        <p>${esc(t(item.summary))}</p>
        <div class="card-foot"><span>${esc(item.updated || "")}</span><span class="price">${item.price > 0 ? esc(money(item.price)) : esc(ui("free"))}</span></div>
      </div>
    </a>`;
  }

  let toastTimer;
  function toast(msg) {
    let el = document.querySelector(".toast");
    if (!el) { el = document.createElement("div"); el.className = "toast"; el.setAttribute("role", "status"); document.body.appendChild(el); }
    el.textContent = msg;
    el.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("show"), 1800);
  }
  async function copyText(text) {
    try { await navigator.clipboard.writeText(text); return true; }
    catch (e) {
      const ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      let ok = false; try { ok = document.execCommand("copy"); } catch (e2) { ok = false; }
      ta.remove(); return ok;
    }
  }

  function observeReveal(root) {
    const els = (root || document).querySelectorAll(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) { els.forEach(e => e.classList.add("in")); return; }
    const io = new IntersectionObserver(entries => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -40px 0px" });
    els.forEach(e => io.observe(e));
  }

  const ICONS = {
    Instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg>',
    TikTok: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M16.6 3c.3 2.2 1.6 3.7 3.9 3.9v3.1c-1.4.1-2.7-.3-3.9-1v6.2c0 4-3.3 6.3-6.4 5.6-4.2-.9-5.3-6.3-1.9-8.7 1-.7 2.3-1 3.6-.9v3.2c-.4-.1-.8-.1-1.2 0-1.6.4-2 2.6-.6 3.4 1.3.8 3.3 0 3.3-2V3h3.2z"/></svg>',
    YouTube: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 8.2a3 3 0 0 0-2.1-2.1C18 5.6 12 5.6 12 5.6s-6 0-7.9.5A3 3 0 0 0 2 8.2 31 31 0 0 0 1.6 12 31 31 0 0 0 2 15.8a3 3 0 0 0 2.1 2.1c1.9.5 7.9.5 7.9.5s6 0 7.9-.5a3 3 0 0 0 2.1-2.1c.3-1.2.4-2.5.4-3.8s-.1-2.6-.4-3.8zM10 15V9l5.2 3L10 15z"/></svg>',
    default: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>'
  };
  function socialsHTML() {
    return (SITE.socials || []).map(s => `
      <a class="social reveal" href="${esc(safeUrl(s.url))}" target="_blank" rel="noopener">
        <span class="social-ico">${ICONS[s.name] || ICONS.default}</span>
        <span><b>${esc(s.name)}</b><span>${esc(s.handle)}</span></span>
        <span class="go" aria-hidden="true">↗</span>
      </a>`).join("");
  }

  /* ---------- Shared chrome ---------- */
  function initChrome() {
    document.querySelectorAll(".lang button").forEach(b => b.addEventListener("click", () => setLang(b.dataset.lang)));
    document.querySelectorAll("[data-brand]").forEach(el => { el.textContent = SITE.brand || SITE.name || ""; });
    const year = document.querySelector("[data-year]");
    if (year) year.textContent = new Date().getFullYear();
    const fs = document.querySelector("[data-foot-socials]");
    if (fs) fs.innerHTML = (SITE.socials || []).map(s => `<a href="${esc(safeUrl(s.url))}" target="_blank" rel="noopener">${esc(s.name)}</a>`).join(" · ");
    applyStatic();
  }

  window.App = { SITE, TYPES, ITEMS, PROMPTS, t, ui, esc, safeUrl, money, typeOf, thumb, cardHTML, priceBadge, sampleBadge, toast, copyText, observeReveal, socialsHTML, onLang, get lang() { return lang; } };
  document.addEventListener("DOMContentLoaded", initChrome);
})();
