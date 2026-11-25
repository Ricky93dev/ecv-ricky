/**
 * ============================================================
 *  DATA.JS — Semua konten E-CV ada di sini.
 *  Edit file ini untuk mengganti atau menambah data pribadi.
 * ============================================================
 */

const DATA = {

  /* ── Meta & SEO ─────────────────────────────────────── */
  meta: {
    title: "Mochamad Ricky Araya — Portofolio Digital",
    description: "Portofolio digital Mochamad Ricky Araya, mahasiswa Sistem Informasi Universitas Bina Sarana Informatika (BSI). Web & Mobile Developer.",
    ogImage: "assets/og-image.png",
    themeColor: "#2563eb",
    favicon: "assets/favicon.png",
  },

  /* ── Navbar ─────────────────────────────────────────── */
  nav: [
    { label: "Tentang", href: "#tentang" },
    { label: "Skill", href: "#skill" },
    { label: "Proyek", href: "#proyek" },
    { label: "Pengalaman", href: "#pengalaman" },
    { label: "Pendidikan", href: "#pendidikan" },
    { label: "Sertifikat", href: "#sertifikat" },
    { label: "Kontak", href: "#kontak" },
  ],

  /* ── Hero ────────────────────────────────────────────── */
  hero: {
    statusBadge: "Tersedia untuk PKL / Magang & Freelance",
    greeting: "Halo, saya",
    name: "Mochamad Ricky Araya",
    headlines: [
      "Information Systems Student",
      "Web & Mobile Developer",
      "Laravel & Tailwind Specialist",
      "Full-Stack Web Developer",
    ],
    summary: "Mahasiswa Sistem Informasi Universitas BSI dengan fokus pada rekayasa perangkat lunak web modern, efisien, dan berorientasi pada penyelesaian masalah instansi & organisasi.",
    photo: "assets/foto-ricky.png",
    cvFile: "assets/cv-ricky.pdf",
    ctaDownload: "Download CV (PDF)",
    ctaContact: "Hubungi via WhatsApp",
  },

  /* ── Tentang Saya ───────────────────────────────────── */
  about: {
    title: "Tentang Saya",
    subtitle: "Mengenal latar belakang akademik, fokus teknologi, dan dedikasi profesional saya.",
    paragraphs: [
      "Saya Mochamad Ricky Araya, mahasiswa program studi Sistem Informasi di Universitas Bina Sarana Informatika (BSI) yang memiliki ketertarikan kuat dalam rekayasa perangkat lunak web dan sistem informasi manajemen.",
      "Saya berpengalaman dalam membangun arsitektur aplikasi berbasis web secara komprehensif, mulai dari perancangan skema database MySQL, implementasi backend dengan Laravel & PHP, hingga perancangan front-end yang modern, responsif, dan mudah digunakan.",
      "Telah membuktikan kemampuan melalui proyek nyata seperti pengembangan sistem informasi internal SIPARDIS untuk Dinas Pariwisata Kabupaten Ciamis. Saya selalu antusias mempelajari teknologi baru dan siap berkontribusi secara profesional.",
    ],
    highlights: [
      {
        icon: "graduation-cap",
        title: "Pendidikan Formal",
        text: "Sistem Informasi — Universitas BSI",
      },
      {
        icon: "map-pin",
        title: "Domisili",
        text: "Jatinagara, Kab. Ciamis, Jawa Barat",
      },
      {
        icon: "briefcase",
        title: "Status Ketersediaan",
        text: "Terbuka untuk Magang, PKL & Freelance",
      },
      {
        icon: "code",
        title: "Spesialisasi",
        text: "Web Development (Laravel, PHP, Tailwind, JS)",
      },
    ],
  },

  /* ── Keahlian & Teknologi ─────────────────────────────
   * Level diisi: "Mahir", "Menengah", atau "Dasar"
   * Bebas dari pusing memikirkan persentase angka!
   * ─────────────────────────────────────────────────── */
  skills: {
    title: "Keahlian & Teknologi",
    subtitle: "Teknologi, bahasa pemrograman, dan alat bantu yang aktif saya kuasai dan gunakan.",
    list: [
      { name: "Laravel", level: "Menengah", category: "Backend", icon: "layers" },
      { name: "PHP", level: "Menengah", category: "Backend", icon: "server" },
      { name: "MySQL", level: "Menengah", category: "Backend", icon: "database" },
      { name: "Tailwind CSS", level: "Mahir", category: "Frontend", icon: "palette" },
      { name: "HTML5 & CSS3", level: "Mahir", category: "Frontend", icon: "code" },
      { name: "JavaScript", level: "Menengah", category: "Frontend", icon: "file-code" },
      { name: "Flutter & Dart", level: "Dasar", category: "Mobile", icon: "smartphone" },
      { name: "Firebase", level: "Dasar", category: "Backend", icon: "flame" },
      { name: "Git & GitHub", level: "Menengah", category: "Tools", icon: "git-branch" },
      { name: "Figma", level: "Menengah", category: "Design", icon: "pen-tool" },
      { name: "Jaringan Komputer", level: "Menengah", category: "Tools", icon: "network" },
    ],
  },

  /* ── Proyek ─────────────────────────────────────────── */
  projects: {
    title: "Proyek Unggulan",
    subtitle: "Kompilasi aplikasi dan sistem informasi yang telah saya kembangkan.",
    list: [
      {
        badge: "Sistem Instansi Pemerintah",
        name: "SIPARDIS — Dinas Pariwisata Kab. Ciamis",
        subname: "Sistem Informasi Pariwisata Administrasi Rapat Dokumentasi Informasi Statistik",
        description: "Sistem informasi internal terpusat berbasis web untuk Dinas Pariwisata Kabupaten Ciamis. Mengelola data kinerja, realisasi anggaran & PAD, kepegawaian, arsip dokumen kedinasan, serta agenda rapat terpadu dengan sistem otorisasi multi-peran.",
        techs: ["Laravel", "Tailwind CSS", "PHP", "MySQL"],
        image: "assets/project-1.png",
        demo: "",
        repo: "https://github.com/repos",
      },
      {
        badge: "Sistem Informasi Manajemen",
        name: "Pharmacast",
        subname: "Sistem Manajemen Tugas & Pusat Data Internal",
        description: "Aplikasi sistem informasi internal berbasis web yang dirancang untuk mempermudah pemrosesan tugas operasional instansi sekaligus menjadi pusat data terpadu yang aman, terstruktur, dan terintegrasi.",
        techs: ["PHP", "Laravel", "MySQL", "Tailwind CSS"],
        image: "assets/project-2.png",
        demo: "",
        repo: "https://github.com/repos",
      },
      {
        badge: "Aplikasi Mobile",
        name: "AbsenQR",
        subname: "Sistem Presensi Cepat Berbasis Kode QR",
        description: "Aplikasi presensi modern yang berfokus pada efisiensi waktu sebelum dimulainya kegiatan pembelajaran melalui mekanisme pemindaian QR Code yang cepat, praktis, dan tervalidasi ke basis data cloud.",
        techs: ["Flutter", "Dart", "Firebase"],
        image: "assets/project-3.png",
        demo: "",
        repo: "https://github.com/repos",
      },
    ],
  },

  /* ── Pengalaman ─────────────────────────────────────── */
  experience: {
    title: "Pengalaman Kerja & PKL",
    subtitle: "Rekam jejak kontribusi nyata di instansi pemerintahan.",
    list: [
      {
        role: "Web Developer (PKL)",
        company: "Dinas Pariwisata Kabupaten Ciamis",
        period: "Agustus 2026 – November 2026",
        type: "Praktik Kerja Lapangan (PKL)",
        description: [
          "Menyelesaikan permasalahan alur data dan dokumentasi Dinas Pariwisata melalui solusi digital terpusat berbasis website.",
          "Membuat dan mengimplementasikan aplikasi website SIPARDIS yang mencakup modul data kinerja, anggaran PAD, serta agenda rapat.",
          "Melakukan Full-Stack Development (Front-End & Back-End), perancangan basis data, integrasi antarmuka, hingga tahap deployment lokal.",
        ],
      },
    ],
  },

  /* ── Pendidikan ─────────────────────────────────────── */
  education: {
    title: "Riwayat Pendidikan",
    subtitle: "Jejak akademis formal di bidang teknologi dan sistem informasi.",
    list: [
      {
        degree: "D3 / S1 Sistem Informasi",
        school: "Universitas Bina Sarana Informatika (BSI)",
        period: "2024 – Sekarang",
        badge: "Pendidikan Tinggi",
        description: "Mempelajari analisis dan perancangan sistem informasi, rekayasa perangkat lunak, manajemen basis data, dan pemrograman aplikasi web.",
      },
      {
        degree: "SMK — Teknik Komputer dan Jaringan (TKJ)",
        school: "SMKN 1 Rajadesa",
        period: "2021 – 2024",
        badge: "Pendidikan Menengah Kejuruan",
        description: "Mendalami dasar arsitektur komputer, instalasi jaringan LAN/WAN, administrasi server, dan logika dasar pemrograman.",
      },
    ],
  },

  /* ── Sertifikat (opsional, tampil jika ada) ──────────── */
  certificates: {
    title: "Sertifikasi & Pelatihan",
    subtitle: "Pencapaian dan sertifikasi kompetensi keahlian.",
    list: [
      // Contoh jika ingin diaktifkan:
      // {
      //   name: "Sosialisasi PKM-K & P2MW",
      //   issuer: "Inkubator Bisnis Universitas BSI",
      //   date: "2026",
      //   link: "",
      // },
    ],
  },

  /* ── Kontak ─────────────────────────────────────────── */
  contact: {
    title: "Mari Terhubung",
    subtitle: "Tertarik berkolaborasi, mendiskusikan peluang proyek, atau menawarkan kesempatan magang? Jangan ragu untuk menghubungi saya melalui salah satu kanal di bawah ini.",
    email: "rickyaraya93@gmail.com",
    whatsappNumber: "6288971745553", // Ganti dengan nomor WhatsApp aktif kamu (format awalan 62)
    socials: [
      {
        platform: "WhatsApp",
        icon: "whatsapp",
        url: "https://wa.me/6288971745553?text=Halo%20Ricky,%20saya%20melihat%20portofolio%20digital%20Anda.",
        label: "Chat via WhatsApp",
        highlight: true,
      },
      {
        platform: "Email",
        icon: "mail",
        url: "mailto:rickyaraya93@gmail.com",
        label: "rickyaraya93@gmail.com",
      },
      {
        platform: "GitHub",
        icon: "github",
        url: "https://github.com/repos",
        label: "github.com/repos",
      },
      {
        platform: "Instagram",
        icon: "instagram",
        url: "https://www.instagram.com/rickyaraya93?dmpr=MTZveTByMzloZnMwZA==",
        label: "@rickyaraya93",
      },
    ],
  },

  /* ── Footer ─────────────────────────────────────────── */
  footer: {
    quote: "“Menghubungkan logika sistem informasi dengan pengalaman visual yang fungsional & bernilai guna.”",
    text: "© 2026 Mochamad Ricky Araya • Mahasiswa Sistem Informasi, Universitas Bina Sarana Informatika.",
    subtext: "Dibuat dengan HTML5, CSS3, dan Vanilla JavaScript untuk tugas mata kuliah Digital Kreatif.",
  },
};
