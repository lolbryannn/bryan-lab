/* Library page: search, filters, grid and the #item/<slug> detail drawer */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  const A = window.App;
  const $ = id => document.getElementById(id);
  const q = $("q"), grid = $("grid"), filters = $("filters"), drawer = $("drawer");

  const params = new URLSearchParams(location.search);
  const state = {
    type: A.TYPES.some(t => t.key === params.get("type")) ? params.get("type") : "all",
    price: "all",
    query: ""
  };
  let lastFocus = null;

  /* ---------- filters ---------- */
  function renderFilters() {
    const chip = (group, key, label, n) =>
      `<button type="button" class="chip" data-group="${group}" data-key="${A.esc(key)}" aria-pressed="${state[group] === key}">${A.esc(label)}${n != null ? ` <span class="n">${n}</span>` : ""}</button>`;
    const out = [chip("type", "all", A.ui("lib.all"), A.ITEMS.length)];
    A.TYPES.forEach(ty => {
      const n = A.ITEMS.filter(i => i.type === ty.key).length;
      if (n) out.push(chip("type", ty.key, `${ty.glyph} ${A.t(ty.label)}`, n));
    });
    out.push('<span class="sep" aria-hidden="true"></span>');
    out.push(chip("price", "all", A.ui("lib.all")));
    out.push(chip("price", "free", A.ui("lib.free")));
    out.push(chip("price", "paid", A.ui("lib.paid")));
    filters.innerHTML = out.join("");
  }

  filters.addEventListener("click", e => {
    const b = e.target.closest(".chip");
    if (!b) return;
    state[b.dataset.group] = b.dataset.key;
    if (b.dataset.group === "type") {
      const u = new URL(location.href);
      if (state.type === "all") u.searchParams.delete("type"); else u.searchParams.set("type", state.type);
      history.replaceState(null, "", u.pathname + u.search + u.hash);
    }
    renderFilters();
    renderGrid();
  });

  /* ---------- grid ---------- */
  function haystack(i) {
    const both = v => (v && typeof v === "object" && !Array.isArray(v)) ? [v.id, v.en].join(" ") : (v || "");
    const ty = A.typeOf(i.type);
    return [both(i.title), both(i.summary), (i.tags || []).join(" "), both(ty.label), i.type].join(" ").toLowerCase();
  }
  function visible() {
    const words = state.query.toLowerCase().split(/\s+/).filter(Boolean);
    return A.ITEMS.filter(i =>
      (state.type === "all" || i.type === state.type) &&
      (state.price === "all" || (state.price === "free" ? !(i.price > 0) : i.price > 0)) &&
      words.every(w => haystack(i).includes(w))
    );
  }
  function renderGrid() {
    const list = visible();
    $("count").textContent = A.ui("lib.results", { n: list.length });
    grid.innerHTML = list.length
      ? list.map(i => A.cardHTML(i, true)).join("")
      : `<div class="empty">${A.esc(A.ui("lib.empty"))}</div>`;
    A.observeReveal(grid);
  }

  q.addEventListener("input", () => { state.query = q.value; renderGrid(); });
  document.addEventListener("keydown", e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") { e.preventDefault(); q.focus(); q.select(); }
    else if (e.key === "/" && document.activeElement !== q && !document.body.classList.contains("is-open")) { e.preventDefault(); q.focus(); }
    else if (e.key === "Escape" && document.body.classList.contains("is-open")) close();
  });

  /* ---------- detail drawer ---------- */
  function slugFromHash() {
    const m = location.hash.match(/^#item\/(.+)$/);
    return m ? decodeURIComponent(m[1]) : null;
  }
  function list(arr, cls) {
    const a = A.t(arr);
    return Array.isArray(a) && a.length ? `<ul class="${cls}">${a.map(x => `<li>${A.esc(x)}</li>`).join("")}</ul>` : "";
  }
  function renderDrawer(item) {
    if (!item) {
      drawer.innerHTML = `<div class="drawer-top"><span class="mono muted">404</span><button class="btn btn-sm" type="button" data-close>✕ ${A.esc(A.ui("d.close"))}</button></div>
        <div class="drawer-body"><h2 id="d-title">${A.esc(A.ui("lib.notfound"))}</h2></div>`;
      return;
    }
    const ty = A.typeOf(item.type);
    const paid = item.price > 0;
    const mainLabel = paid ? A.ui("d.buy", { p: A.money(item.price) }) : A.ui("d.download");
    const features = list(item.features, "checks");
    const steps = list(item.steps, "steps");
    const files = (item.files || []).length ? `<div class="files">${item.files.map(f => `<code>${A.esc(f)}</code>`).join("")}</div>` : "";
    drawer.innerHTML = `
      <div class="drawer-top">
        <span class="mono muted" style="font-size:12px">#item/${A.esc(item.slug)}</span>
        <button class="btn btn-sm" type="button" data-close>✕ ${A.esc(A.ui("d.close"))}</button>
      </div>
      ${A.thumb(item)}
      <div class="drawer-body">
        <div class="meta"><span class="badge">${A.esc(ty.glyph)} ${A.esc(A.t(ty.label))}</span>${A.priceBadge(item)}${A.sampleBadge(item)}</div>
        <h2 id="d-title">${A.esc(A.t(item.title))}</h2>
        <p class="summary">${A.esc(A.t(item.summary))}</p>
        <div class="actions">
          <a class="btn btn-primary" href="${A.esc(A.safeUrl(item.link))}" target="_blank" rel="noopener">${A.esc(mainLabel)} ↗</a>
          ${item.demo ? `<a class="btn" href="${A.esc(A.safeUrl(item.demo))}" target="_blank" rel="noopener">${A.esc(A.ui("d.demo"))} ↗</a>` : ""}
          ${item.source ? `<a class="btn" href="${A.esc(A.safeUrl(item.source))}" target="_blank" rel="noopener">GitHub ↗</a>` : ""}
          <button class="btn" type="button" data-share>${A.esc(A.ui("d.share"))}</button>
        </div>
        ${features ? `<div class="block"><h3>${A.esc(A.ui("d.features"))}</h3>${features}</div>` : ""}
        ${steps ? `<div class="block"><h3>${A.esc(A.ui("d.steps"))}</h3>${steps}</div>` : ""}
        ${files ? `<div class="block"><h3>${A.esc(A.ui("d.files"))}</h3>${files}</div>` : ""}
        ${item.updated ? `<p class="note mono">${A.esc(A.ui("d.updated"))}: ${A.esc(item.updated)}</p>` : ""}
        <p class="note">${A.esc(A.ui("d.note"))}</p>
      </div>`;
  }
  function syncDrawer() {
    const slug = slugFromHash();
    if (!slug) {
      if (document.body.classList.contains("is-open")) {
        document.body.classList.remove("is-open");
        drawer.setAttribute("aria-hidden", "true");
        if (lastFocus && document.contains(lastFocus)) lastFocus.focus();
      }
      return;
    }
    const item = A.ITEMS.find(i => i.slug === slug);
    renderDrawer(item);
    document.title = (item ? A.t(item.title) + " · " : "") + "Library · " + (A.SITE.brand || "");
    if (!document.body.classList.contains("is-open")) {
      lastFocus = document.activeElement;
      document.body.classList.add("is-open");
      drawer.setAttribute("aria-hidden", "false");
      drawer.scrollTop = 0;
      setTimeout(() => drawer.focus(), 50);
    }
  }
  function close() {
    history.replaceState(null, "", location.pathname + location.search);
    document.title = "Library · " + (A.SITE.brand || "");
    syncDrawer();
  }

  drawer.addEventListener("click", async e => {
    if (e.target.closest("[data-close]")) return close();
    if (e.target.closest("[data-share]")) {
      if (await A.copyText(location.href)) A.toast(A.ui("linkCopied"));
    }
  });
  $("scrim").addEventListener("click", close);
  // keep keyboard focus inside the open drawer
  drawer.addEventListener("keydown", e => {
    if (e.key !== "Tab") return;
    const f = drawer.querySelectorAll("a[href], button");
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && (document.activeElement === first || document.activeElement === drawer)) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
  window.addEventListener("hashchange", syncDrawer);

  function renderAll() { renderFilters(); renderGrid(); if (slugFromHash()) syncDrawer(); }
  A.onLang(renderAll);
  renderAll();
  syncDrawer();
});
