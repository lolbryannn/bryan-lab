# bryan.lab

Bryan's creator hub: templates, prompts, design files, presets, tutorials and products, in Indonesian and English.
It's a plain static site (HTML, CSS and JS), with no framework, build step or database.

## Files

| File | What it is |
|---|---|
| `index.html` | Home: intro, categories, featured items, prompts, socials |
| `library.html` | Library: search, filters, and a detail panel at `library.html#item/<slug>` |
| `data/content.js` | **All your content.** This is the only file you edit day to day |
| `assets/style.css` | Look and feel. Colours are at the top under `:root` |
| `assets/app.js` | Shared code plus all button and label text in both languages (`UI`) |
| `assets/home.js`, `assets/library.js` | Page logic |
| `serve.js` | Local preview server (not needed online) |

## Preview on your computer

```
node serve.js
```
Then open http://localhost:5173

## Add something new

Open `data/content.js` and copy an item in `ITEMS`:

```js
{
  slug: "my-new-template",          // shows up in the link: library.html#item/my-new-template
  type: "template",                 // template | design | preset | tutorial | product
  title:   { id: "Judul", en: "Title" },
  summary: { id: "Ringkasan…", en: "Summary…" },
  price: 0,                         // 0 = free, or e.g. 49000
  link: "https://…",                // download, GitHub, Lynk.id, Gumroad, Google Drive, YouTube…
  image: "assets/img/my-new-template.webp",   // optional
  tags: ["website", "html"],
  features: { id: ["…"], en: ["…"] },
  steps:    { id: ["…"], en: ["…"] },
  files: ["index.html"],            // optional
  updated: "2026-11-21",
  featured: true                    // also show it on the home page
}
```

Prompts go in `PROMPTS`. Your name, links and tagline are in `SITE`.
Delete the items marked `sample: true` once you have your own.

**Your photo:** put it at `assets/me.jpg` and set `photo: "assets/me.jpg"` in `SITE`.

## Where to host the files people download

- **Code templates:** one GitHub repo each. Use the ZIP link: `https://github.com/<you>/<repo>/archive/refs/heads/main.zip`
- **Big files or apps:** GitHub Releases, or Google Drive
- **Paid products:** Lynk.id, Gumroad, Trakteer or Saweria. Put that checkout link in `link`

## Put the site online (free)

1. Create a GitHub repo and upload everything in this folder.
2. Pick one host:
   - **GitHub Pages:** repo → Settings → Pages → Branch `main` → Save
   - **Netlify:** drag this folder onto app.netlify.com/drop
   - **Vercel / Cloudflare Pages:** import the GitHub repo, no build command
3. Optional: buy a domain (for example `bryan.my.id` or `.biz.id` from an Indonesian registrar) and add it in your host's domain settings.

## Ideas for later

- Download and view counters (needs a small backend, such as a Cloudflare Worker or Supabase)
- A page for each product with its own preview images
- A PRD or prompt generator form
