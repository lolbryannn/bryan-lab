/* Home page rendering */
document.addEventListener("DOMContentLoaded", function () {
  "use strict";
  const A = window.App;
  const $ = id => document.getElementById(id);

  function render() {
    const S = A.SITE;

    // identity
    $("avatar").innerHTML = S.photo
      ? `<img src="${A.esc(A.safeUrl(S.photo))}" alt="${A.esc(S.name)}">`
      : A.esc(S.initials || (S.name || "?").charAt(0));
    $("who-name").textContent = S.name || "";
    $("who-handle").textContent = S.handle || "";

    // headline: highlight the last word
    const tag = A.t(S.tagline);
    const cut = tag.lastIndexOf(" ");
    $("headline").innerHTML = cut > 0
      ? `${A.esc(tag.slice(0, cut))} <span class="hl">${A.esc(tag.slice(cut + 1))}</span>`
      : A.esc(tag);

    // fake terminal line with live counts
    const free = A.ITEMS.filter(i => !(i.price > 0)).length;
    $("term").innerHTML = `<b>$</b> <span>ls ./${A.esc((S.brand || "lab").replace(/[^a-z0-9.-]/gi, ""))}</span> &nbsp;→&nbsp; ${A.ITEMS.length} items · ${A.PROMPTS.length} prompts · ${free} free`;

    // type cards
    const cards = A.TYPES.map(ty => {
      const n = A.ITEMS.filter(i => i.type === ty.key).length;
      return `<a class="type-card reveal" href="library.html?type=${encodeURIComponent(ty.key)}">
        <span class="type-glyph" aria-hidden="true">${A.esc(ty.glyph)}</span>
        <span class="arrow" aria-hidden="true">↗</span>
        <h3>${A.esc(A.t(ty.label))}</h3>
        <span class="count">${n} ${A.esc(A.ui("count.items"))}</span>
      </a>`;
    });
    cards.splice(1, 0, `<a class="type-card reveal" href="#prompts">
        <span class="type-glyph" aria-hidden="true">&gt;_</span>
        <span class="arrow" aria-hidden="true">↓</span>
        <h3>${A.esc(A.ui("type.prompts"))}</h3>
        <span class="count">${A.PROMPTS.length} ${A.esc(A.ui("count.items"))}</span>
      </a>`);
    $("types").innerHTML = cards.join("");

    // featured
    let feat = A.ITEMS.filter(i => i.featured);
    if (!feat.length) feat = A.ITEMS.slice(0, 3);
    $("featured").innerHTML = feat.slice(0, 6).map(A.cardHTML).join("");

    renderPrompts();

    // socials
    $("social-list").innerHTML = A.socialsHTML();

    A.observeReveal();
  }

  /* ---------- prompt pack with topic filters ---------- */
  const CATS = window.PROMPT_CATS || [];
  let promptCat = "all";

  function renderPrompts() {
    const chip = (key, label, n) =>
      `<button type="button" class="chip" data-cat="${A.esc(key)}" aria-pressed="${promptCat === key}">${A.esc(label)} <span class="n">${n}</span></button>`;
    $("prompt-filters").innerHTML = CATS.length
      ? [chip("all", A.ui("lib.all"), A.PROMPTS.length)]
          .concat(CATS.map(c => chip(c.key, A.t(c.label), A.PROMPTS.filter(p => p.cat === c.key).length)))
          .join("")
      : "";
    const catLabel = key => { const c = CATS.find(x => x.key === key); return c ? A.t(c.label) : ""; };
    $("prompt-list").innerHTML = A.PROMPTS.map((p, i) => ({ p, i }))
      .filter(x => promptCat === "all" || x.p.cat === promptCat)
      .map(({ p, i }) => `
      <article class="prompt reveal">
        <div class="prompt-head"><h3>${A.esc(A.t(p.title))}</h3><span class="meta">${A.sampleBadge(p)}<span class="badge">${A.esc(p.tag || "")}</span></span></div>
        <pre tabindex="0">${A.esc(A.t(p.text))}</pre>
        <div class="prompt-foot"><span class="mono muted" style="font-size:12px">#${String(i + 1).padStart(2, "0")} · ${A.esc(catLabel(p.cat))}</span><button class="btn btn-sm copy" type="button" data-i="${i}">${A.esc(A.ui("copy"))}</button></div>
      </article>`).join("");
    A.observeReveal($("prompt-list"));
  }

  $("prompt-filters").addEventListener("click", e => {
    const b = e.target.closest(".chip");
    if (!b) return;
    promptCat = b.dataset.cat;
    renderPrompts();
  });

  $("prompt-list").addEventListener("click", async e => {
    const b = e.target.closest(".copy");
    if (!b) return;
    const ok = await A.copyText(A.t(A.PROMPTS[+b.dataset.i].text));
    if (!ok) return;
    b.textContent = A.ui("copied");
    b.classList.add("done");
    setTimeout(() => { b.textContent = A.ui("copy"); b.classList.remove("done"); }, 1600);
  });

  A.onLang(render);
  render();
});
