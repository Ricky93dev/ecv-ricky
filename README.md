# E-CV — Portofolio Digital Ricky

Website portofolio digital pribadi untuk tugas mata kuliah Digital Kreatif.

## Tech Stack

- HTML5, CSS3, JavaScript Vanilla (tanpa framework, tanpa build step)
- Google Fonts (Inter + Poppins)
- Lucide Icons (CDN)

## Struktur Folder

```
E-CV/
├── index.html
├── css/
│   └── style.css
├── js/
│   ├── data.js       ← Edit data pribadi di sini
│   └── main.js
├── assets/
│   ├── foto-ricky.png
│   ├── cv-ricky.pdf
│   ├── favicon.png
│   ├── og-image.png
│   ├── project-1.png
│   ├── project-2.png
│   └── project-3.png
└── README.md
```

## Cara Menjalankan Lokal

1. Buka folder `E-CV` di VS Code.
2. Install extension **Live Server**.
3. Klik kanan `index.html` → **Open with Live Server**.

## Deploy ke Vercel

1. Push folder ini ke repository GitHub.
2. Buka [vercel.com](https://vercel.com) → klik **Add New Project**.
3. Import repo GitHub yang sudah di-push.
4. Vercel otomatis mendeteksi sebagai static site — klik **Deploy**.
5. Selesai! Website akan live di URL `*.vercel.app`.

## Cara Edit Data

Buka file `js/data.js` lalu edit bagian yang bertanda `[ISI DI SINI]`.

