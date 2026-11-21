/*
  PROMPT PACK — shown on the home page with topic filters and a Copy button.
  Each prompt:
    cat    one of the PROMPT_CATS keys
    tag    a short label (tool or format)
    title  { id, en }
    text   { id, en }  — use [BRACKETS] for the parts people replace
  Line breaks inside `backticks` are kept exactly as written.
*/

window.PROMPT_CATS = [
  { key: "ai",       label: { id: "AI & Coding", en: "AI & Coding" } },
  { key: "content",  label: { id: "Konten", en: "Content" } },
  { key: "design",   label: { id: "Desain & Foto", en: "Design & Photo" } },
  { key: "business", label: { id: "Bisnis / UMKM", en: "Business" } }
];

window.PROMPTS = [

  /* ---------------- AI & CODING ---------------- */
  {
    cat: "ai",
    tag: "website",
    title: { id: "Website jadi dari 1 kalimat", en: "A full website from one sentence" },
    text: {
      id: `Kamu web developer senior. Buatkan landing page untuk: [JELASKAN USAHA/PROYEK DALAM 1 KALIMAT].

Aturan:
- Satu file index.html saja (HTML + CSS + JS di dalamnya), tanpa framework, tanpa library luar.
- Responsif dan enak dilihat di HP (cek lebar 375px).
- Bagian: hero dengan tombol aksi, 3 keunggulan, testimoni (tulis jelas "contoh"), FAQ 4 pertanyaan, footer dengan kontak.
- Gaya: [MISAL: gelap & modern / cerah & ceria / minimalis]. Warna utama: [WARNA].
- Tombol utama mengarah ke WhatsApp: https://wa.me/[NOMOR]
- Jangan mengarang angka, harga, atau klaim. Pakai placeholder yang jelas kalau tidak tahu.

Setelah kode, tulis 3 langkah singkat untuk mengunggahnya gratis ke Netlify.`,
      en: `You are a senior web developer. Build a landing page for: [DESCRIBE THE BUSINESS/PROJECT IN ONE SENTENCE].

Rules:
- A single index.html file (HTML + CSS + JS inside), no frameworks, no external libraries.
- Responsive and good-looking on phones (check at 375px wide).
- Sections: hero with a call-to-action button, 3 key benefits, testimonials (clearly marked "sample"), a 4-question FAQ, footer with contact.
- Style: [E.G. dark & modern / bright & playful / minimal]. Main colour: [COLOUR].
- The main button links to WhatsApp: https://wa.me/[NUMBER]
- Don't invent numbers, prices or claims. Use obvious placeholders when you don't know.

After the code, give 3 short steps to host it for free on Netlify.`
    }
  },
  {
    cat: "ai",
    tag: "debug",
    title: { id: "Benerin error tanpa pusing", en: "Fix an error without the headache" },
    text: {
      id: `Kodeku error. Jelaskan dengan bahasa sederhana, seperti ke pemula.

1. Artinya error ini apa (1–2 kalimat).
2. Penyebab paling mungkin di kodeku, tunjuk barisnya.
3. Perbaikan: tampilkan HANYA bagian kode yang diubah, dengan komentar singkat.
4. Cara memastikan sudah benar.

Jangan menulis ulang seluruh file. Kalau informasinya kurang, tanyakan dulu, jangan menebak.

Bahasa/framework: [MISAL: JavaScript, Python, PHP]
Pesan error:
[TEMPEL ERROR]

Kode:
[TEMPEL KODE]`,
      en: `My code throws an error. Explain it simply, as if I'm a beginner.

1. What the error means (1–2 sentences).
2. The most likely cause in my code — point to the line.
3. The fix: show ONLY the changed part, with short comments.
4. How to check it's really fixed.

Don't rewrite the whole file. If something is missing, ask me first instead of guessing.

Language/framework: [E.G. JavaScript, Python, PHP]
Error message:
[PASTE ERROR]

Code:
[PASTE CODE]`
    }
  },
  {
    cat: "ai",
    tag: "planning",
    title: { id: "Ide aplikasi jadi rencana kerja AI", en: "Turn an app idea into an AI work plan" },
    text: {
      id: `Bantu aku ubah ide ini jadi rencana yang bisa dikerjakan AI langkah demi langkah.

Ide: [JELASKAN APLIKASI/WEBSITE]
Pengguna: [SIAPA YANG PAKAI]
Batasan: [MISAL: gratis, jalan offline di HP, tanpa server]

Buat 2 bagian:

PRD.md
- Tujuan (1 paragraf)
- Fitur wajib (maks 6) dan fitur nanti
- Halaman/layar dan isinya
- Data yang disimpan
- Hal yang TIDAK dikerjakan

TASKS.md
- Daftar tugas bernomor, urut, masing-masing bisa selesai dalam 1 sesi chat
- Tiap tugas punya "selesai kalau…" yang bisa dicek

Tanyakan maksimal 3 hal yang belum jelas sebelum mulai.`,
      en: `Help me turn this idea into a plan an AI can build step by step.

Idea: [DESCRIBE THE APP/WEBSITE]
Users: [WHO WILL USE IT]
Constraints: [E.G. free, works offline on phones, no server]

Produce 2 parts:

PRD.md
- Goal (1 paragraph)
- Must-have features (max 6) and later features
- Pages/screens and what's on them
- Data that gets saved
- What is out of scope

TASKS.md
- A numbered, ordered task list, each doable in one chat session
- Each task has a checkable "done when…"

Ask me at most 3 clarifying questions before you start.`
    }
  },

  /* ---------------- CONTENT ---------------- */
  {
    cat: "content",
    tag: "hook",
    title: { id: "10 hook yang bikin berhenti scroll", en: "10 hooks that stop the scroll" },
    text: {
      id: `Kamu penulis konten TikTok/Reels Indonesia. Buat 10 kalimat pembuka untuk video tentang [TOPIK] untuk [TARGET PENONTON].

Aturan:
- Maks 12 kata, bisa diucapkan dalam 3 detik.
- Bahasa lisan sehari-hari, bukan bahasa iklan.
- Tanpa clickbait: hook harus dibayar oleh isi video.
- Variasikan gaya, beri label tiap hook: [pertanyaan] [angka] [kesalahan umum] [sebelum–sesudah] [cerita] [opini berani].

Lalu pilih 2 terbaik dan jelaskan kenapa dalam 1 kalimat masing-masing.`,
      en: `You are a short-form video writer. Write 10 opening lines for a video about [TOPIC] for [AUDIENCE].

Rules:
- Max 12 words, sayable in 3 seconds.
- Spoken, everyday language — not ad copy.
- No clickbait: the video must pay off the hook.
- Vary the style and label each one: [question] [number] [common mistake] [before–after] [story] [hot take].

Then pick the best 2 and explain why in one sentence each.`
    }
  },
  {
    cat: "content",
    tag: "script",
    title: { id: "Naskah Reels 45 detik", en: "45-second Reel script" },
    text: {
      id: `Tulis naskah video vertikal 45 detik tentang [TOPIK]. Aku bicara langsung ke kamera.

Format tabel: Detik | Yang aku ucapkan | Teks di layar | B-roll/visual

Struktur:
- 0–3 dtk: hook
- 3–10 dtk: masalah yang dirasakan penonton
- 10–38 dtk: 3 langkah/poin, masing-masing ada contoh nyata
- 38–45 dtk: penutup + ajakan: [MISAL: follow / komen kata "MAU" / cek link di bio]

Kalimat pendek, maks 15 kata per baris. Total ucapan ±110 kata.`,
      en: `Write a 45-second vertical video script about [TOPIC]. I talk straight to camera.

Table format: Seconds | What I say | On-screen text | B-roll/visual

Structure:
- 0–3s: hook
- 3–10s: the problem the viewer feels
- 10–38s: 3 steps/points, each with a real example
- 38–45s: wrap-up + call to action: [E.G. follow / comment "YES" / link in bio]

Short sentences, max 15 words per line. About 110 spoken words in total.`
    }
  },
  {
    cat: "content",
    tag: "caption",
    title: { id: "Caption + hashtag yang nggak alay", en: "Captions + hashtags that don't feel spammy" },
    text: {
      id: `Buat caption Instagram/TikTok untuk video ini: [RINGKASAN VIDEO].

Berikan 3 versi:
1. Pendek (1 baris)
2. Sedang (3–4 baris, ada 1 tips tambahan yang tidak ada di video)
3. Cerita (5–7 baris, pengalaman pribadi, tulis [ISI CERITAKU] di bagian yang harus aku lengkapi)

Tiap versi:
- Baris pertama harus kuat karena hanya itu yang terlihat sebelum "selengkapnya".
- Akhiri dengan 1 pertanyaan yang memancing komentar.
- Maks 2 emoji.

Lalu beri 5 hashtag: 2 besar, 2 menengah, 1 spesifik niche [NICHE].`,
      en: `Write an Instagram/TikTok caption for this video: [VIDEO SUMMARY].

Give 3 versions:
1. Short (1 line)
2. Medium (3–4 lines, with 1 extra tip that isn't in the video)
3. Story (5–7 lines, personal experience — write [MY STORY] where I need to fill in details)

For each version:
- The first line must be strong, since it's all people see before "more".
- End with 1 question that invites comments.
- Max 2 emojis.

Then suggest 5 hashtags: 2 big, 2 mid-size, 1 specific to the [NICHE] niche.`
    }
  },
  {
    cat: "content",
    tag: "repurpose",
    title: { id: "1 video panjang jadi 5 konten pendek", en: "One long video into 5 short ones" },
    text: {
      id: `Ini transkrip video/podcast panjangku:
[TEMPEL TRANSKRIP]

Cari 5 momen terbaik untuk dijadikan klip pendek 30–60 detik. Untuk tiap klip:
- Kutipan awal dan akhir (persis dari transkrip) supaya aku bisa cari di editor
- Kenapa momen ini menarik (1 kalimat)
- Hook baru untuk 3 detik pertama (teks di layar)
- Judul/caption pendek

Urutkan dari yang paling berpotensi viral. Jangan ubah kata-kata asliku di kutipan.`,
      en: `Here's the transcript of my long video/podcast:
[PASTE TRANSCRIPT]

Find the 5 best moments to turn into 30–60 second clips. For each clip:
- Exact start and end quotes from the transcript, so I can find them in my editor
- Why this moment works (1 sentence)
- A new hook for the first 3 seconds (on-screen text)
- A short title/caption

Order them from most to least likely to perform. Don't change my original words in the quotes.`
    }
  },

  /* ---------------- DESIGN & PHOTO ---------------- */
  {
    cat: "design",
    tag: "carousel",
    title: { id: "Isi carousel 7 slide", en: "7-slide carousel copy" },
    text: {
      id: `Buat isi carousel Instagram 7 slide (1080×1350) tentang [TOPIK] untuk [TARGET].

Slide 1: judul besar (maks 8 kata) + sub-judul kecil yang bikin geser.
Slide 2–6: satu poin per slide. Judul maks 6 kata + penjelasan maks 25 kata.
Slide 7: ringkasan 1 kalimat + ajakan (simpan / share / follow).

Untuk tiap slide, tambahkan juga:
- Saran visual (ikon, foto, atau ilustrasi apa)
- Kata yang di-highlight dengan warna aksen

Gaya bahasa: [SANTAI / PROFESIONAL]. Tulis dalam bentuk tabel.`,
      en: `Write a 7-slide Instagram carousel (1080×1350) about [TOPIC] for [AUDIENCE].

Slide 1: big title (max 8 words) + a small subtitle that makes people swipe.
Slides 2–6: one point per slide. Title max 6 words + explanation max 25 words.
Slide 7: a one-sentence recap + call to action (save / share / follow).

For each slide, also add:
- A visual suggestion (which icon, photo or illustration)
- The word to highlight in the accent colour

Tone: [CASUAL / PROFESSIONAL]. Present it as a table.`
    }
  },
  {
    cat: "design",
    tag: "AI image",
    title: { id: "Foto produk ala studio pakai AI", en: "Studio-style product photos with AI" },
    text: {
      id: `Kamu fotografer produk. Tulis 4 prompt gambar (dalam bahasa Inggris, karena generator gambar paling paham bahasa Inggris) untuk produk: [NAMA & DESKRIPSI PRODUK].

Variasi:
1. Studio bersih, latar polos [WARNA], cahaya lembut dari samping
2. Lifestyle: produk dipakai di [TEMPAT/SUASANA]
3. Flat lay dari atas dengan properti yang cocok
4. Dramatis/gelap untuk iklan

Tiap prompt: sebut subjek, sudut kamera, lensa (mis. 85mm), pencahayaan, komposisi, warna, dan rasio (1:1 untuk feed, 9:16 untuk story).
Tambahkan negative prompt: teks, watermark, tangan cacat, logo merek lain.`,
      en: `You are a product photographer. Write 4 image-generation prompts for this product: [PRODUCT NAME & DESCRIPTION].

Variations:
1. Clean studio, plain [COLOUR] background, soft side light
2. Lifestyle: the product in use at [PLACE/MOOD]
3. Top-down flat lay with fitting props
4. Dark and dramatic, for ads

Each prompt should name the subject, camera angle, lens (e.g. 85mm), lighting, composition, colours and aspect ratio (1:1 for feed, 9:16 for stories).
Add a negative prompt: text, watermark, deformed hands, other brands' logos.`
    }
  },

  /* ---------------- BUSINESS / UMKM ---------------- */
  {
    cat: "business",
    tag: "jualan",
    title: { id: "Deskripsi produk + broadcast WA", en: "Product listing + WhatsApp broadcast" },
    text: {
      id: `Aku jualan [PRODUK] seharga [HARGA] untuk [TARGET PEMBELI]. Keunggulannya: [SEBUTKAN 2–4].

Buatkan:
1. Judul produk untuk Shopee/Tokopedia (maks 70 karakter, kata kunci penting di depan).
2. Deskripsi marketplace: manfaat dulu baru fitur, poin-poin, spesifikasi, cara pakai/rawat, isi paket, dan FAQ 3 pertanyaan.
3. Pesan broadcast WhatsApp (maks 60 kata), ramah, tidak memaksa, ada 1 ajakan jelas.
4. 3 balasan untuk pertanyaan "bisa kurang?" yang sopan tapi tetap jaga harga.

Jangan mengarang testimoni, sertifikat, atau angka penjualan.`,
      en: `I sell [PRODUCT] for [PRICE] to [TARGET BUYERS]. Its strengths: [LIST 2–4].

Create:
1. A marketplace product title (max 70 characters, key search words first).
2. A listing description: benefits before features, bullet points, specs, how to use/care, what's in the box, and a 3-question FAQ.
3. A WhatsApp broadcast message (max 60 words), friendly, not pushy, with one clear call to action.
4. 3 replies to "can you lower the price?" that stay polite but protect the price.

Don't invent testimonials, certificates or sales figures.`
    }
  }
];
