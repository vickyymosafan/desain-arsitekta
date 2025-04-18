Kamu adalah seorang ahli dalam desain web UX/UI dan juga senior developer. Tugasmu adalah mendesain ulang website jasa konstruksi *https://jasabangunrumahjember.com/* agar terlihat lebih profesional, modern, dan menarik secara visual. Berikut adalah daftar fitur yang harus kamu implementasikan:

### 🎯 _Fitur Utama yang Sudah Ada dan Harus Ditingkatkan_

1. Buat _navigasi utama_ yang bersih dan responsif, dengan anchor links ke Home, Layanan, Portofolio, Tentang Kami, dan CTA WhatsApp.
2. Tambahkan _hero section_ dengan headline kuat, subheadline singkat, dan tombol CTA “Konsultasi Gratis” atau “Hubungi Kami Sekarang”.
3. Sertakan _statistik kepercayaan_ (jumlah proyek, tahun pengalaman, dll.) dengan animasi angka.
4. Desain ulang tampilan _layanan_ menjadi grid card yang informatif dan klikabel ke halaman detail masing-masing layanan.
5. Kembangkan halaman _portofolio proyek_ dengan tampilan grid dan fitur filter (mis. berdasarkan kategori proyek).
6. Tampilkan _testimoni pelanggan_ dalam format slider, dengan opsi teks dan video.
7. Optimalkan bagian _FAQ_ dengan elemen accordion agar ringkas dan mudah dinavigasi.
8. Buat _footer profesional_ dengan info kontak, alamat, jam kerja, dan link sosial media.

---

### 🚀 _Fitur Tambahan untuk Meningkatkan Profesionalitas & Konversi_

9. Tambahkan _galeri interaktif Before–After_ dengan slider horizontal agar pengunjung bisa melihat transformasi proyek.
10. Integrasikan _live chat_ atau chatbot AI yang bisa menjawab pertanyaan dasar 24/7 dan mengarahkan ke CS.
11. Buat _kalkulator estimasi biaya proyek_ berbasis form interaktif (tipe proyek, luas bangunan, dll.) dengan hasil estimasi langsung dan tombol kirim ke WhatsApp.
12. Bangun _portal klien_ untuk tracking proyek, unggah dokumen, dan progress update dengan login personal.
13. Tambahkan _blog/artikel_ seputar tips bangun rumah, renovasi, dan inspirasi desain interior untuk mendukung SEO.
14. Integrasikan _feed Instagram_ langsung di website agar selalu ada konten visual terbaru.
15. Sediakan opsi _newsletter berlangganan_ untuk pengunjung yang ingin update promo/tips langsung ke email.
16. Tambahkan fitur _preview 3D/AR proyek_ untuk user yang ingin menjelajahi desain rumah mereka secara virtual.
17. Implementasikan opsi _dark mode toggle_ dan buat website menjadi _Progressive Web App (PWA)_ agar bisa diakses seperti aplikasi.
18. Tambahkan _multi-bahasa_ (Bahasa Indonesia dan English) serta pastikan aksesibilitas bagi pengguna difabel (WCAG compliant).
19. Integrasikan _Google Analytics + Heatmap_ untuk melacak perilaku pengguna dan mengoptimalkan desain dari data tersebut.

---

### ⚙ _Teknis & Performansi_

20. Optimasi _kecepatan website_ (gunakan lazy loading, image optimization, dan minifikasi file).
21. Pastikan website _mobile-friendly dan responsif_ di semua device.
22. Terapkan _SSL dan keamanan dasar_ (captcha di form, proteksi brute force).
23. Gunakan _struktur SEO-friendly_ (heading H1–H3, meta tag, schema markup).
24. Tambahkan fitur _formulir kontak profesional_ dengan notifikasi otomatis dan integrasi ke CRM/email.

---

Kamu harus menyusun struktur desain UI-nya berdasarkan urutan pengalaman pengguna dari landing hingga konversi. Fokus pada trust-building, kemudahan akses, dan visual yang bersih namun menarik.

---

ini adalah versi wireframe, mockup, dan UI kit

# Desain Wireframe, Mockup, dan UI Kit

Dokumen ini menyajikan tiga deliverable utama untuk redesign website Jasa Bangun Rumah Jember:

1. Wireframe: Sketsa tata letak halaman utama dan halaman penting.
2. Mockup: Penjelasan elemen visual tingkat tinggi.
3. UI Kit: Panduan gaya untuk komponen, warna, dan tipografi.

---

## 1. Wireframes

Wireframes berikut disusun dalam format blok untuk menggambarkan hierarchy konten tanpa detail visual.

### 1.1 Beranda (Home Page)

─────────────────────────────────────────────
│ Navbar: Logo | Home | Layanan | Portofolio | Blog | Kontak │
│────────────────────────────────────────────│
│ Hero Section: Headline + Subheadline + [CTA: Konsultasi Gratis] │
│────────────────────────────────────────────│
│ Statistik: [Proyek Selesai] [Tahun Pengalaman] [Klien Puas] │
│────────────────────────────────────────────│
│ Fitur Layanan (Grid 3 kolom with icons & titles) │
│────────────────────────────────────────────│
│ Galeri Portofolio (Grid 4 kolom, filter category) │
│────────────────────────────────────────────│
│ Testimoni Slider (foto + kutipan) │
│────────────────────────────────────────────│
│ FAQ (Accordion list) │
│────────────────────────────────────────────│
│ CTA Sekunder: [Dapatkan Penawaran Gratis] │
│────────────────────────────────────────────│
│ Footer: Kontak | Alamat | Social Links | Newsletter form │
─────────────────────────────────────────────

### 1.2 Halaman Layanan (Services Page)

────────────────────────────────
│ Breadcrumbs: Home > Layanan > [Nama Layanan] │
│────────────────────────────────
│ Hero singkat: Judul Layanan + Gambar Ilustrasi │
│────────────────────────────────
│ Deskripsi Layanan (2 kolom: teks + gambar) │
│────────────────────────────────
│ Manfaat & Proses (timeline atau steps) │
│────────────────────────────────
│ Studi Kasus / Project Terkait (card carousel) │
│────────────────────────────────
│ CTA: [Konsultasi Layanan Ini] │
────────────────────────────────

### 1.3 Halaman Portofolio (Portfolio Page)

────────────────────────────────────────────────
│ Navbar + Breadcrumbs │
│────────────────────────────────────────────────
│ Filter Bar (Kategori, Tahun) │
│────────────────────────────────────────────────
│ Gallery Grid (3 kolom: gambar + judul + overlay hover) │
│────────────────────────────────────────────────
│ Lightbox / Detail Modal saat klik project │
│────────────────────────────────────────────────
│ CTA: [Lihat Semua Proyek] │
────────────────────────────────────────────────

### 1.4 Halaman Kontak & Estimasi (Contact & Estimator)

────────────────────────────────────────────
│ Hero singkat: Judul + Deskripsi pendek │
│────────────────────────────────────────────
│ Form Kontak: Nama | Email | Telepon | Pesan │
│────────────────────────────────────────────
│ Kalkulator Estimasi: Luas m² | Tipe Proyek | [Hitung Biaya] │
│────────────────────────────────────────────
│ Info Kontak Alternatif: Telepon | Email | Alamat & Map Embed │
────────────────────────────────────────────

---

## 2. Mockup (High‑Fidelity Concept)

Penjelasan visual utama untuk gaya mockup:

- _Palet Warna_: Biru gelap (#0D3B66), oranye aksen (#F95738), abu-abu muda (#F5F5F5), putih dan hitam teks.
- _Tipografi_:
    - Judul: Poppins Bold (36–48px)
    - Subjudul: Poppins Semi‑Bold (24–32px)
    - Body: Inter Regular (16px)
- _Grid & Spasi_: 12‑kolom responsive grid; margin utama 24px; padding internal komponen 16px.
- _Interaksi_:
    - Hover: tombol menggelap 10%; kartu portofolio mengangkat (box-shadow)
    - Transisi: 200ms ease-in-out
- _Gaya Foto_: Semua foto proyek diberi overlay gradien lembut untuk teks putih tetap terbaca.

### Contoh Mockup Halaman Beranda

1. Hero section dengan background gambar proyek dan overlay gelap (opacity 50%).
2. Statistik dipresentasikan sebagai ikon vektor dengan animasi counter.
3. Kartu layanan dengan sudut rounded‑lg dan shadow‑md.
4. Slider testimonial dengan panah navigasi minimalis.

---

## 3. UI Kit

Panduan komponen yang bisa langsung diimplementasi sebagai React/Tailwind:

### 3.1 Skema Warna

| Nama           | HEX     | Usage                     |
| -------------- | ------- | ------------------------- |
| Primary Dark   | #0D3B66 | Navbar, CTA background    |
| Primary Accent | #F95738 | Tombol, link hover        |
| Neutral Light  | #F5F5F5 | Background sekunder       |
| Text Dark      | #1A1A1A | Teks utama                |
| Text Light     | #FFFFFF | Teks di atas Primary Dark |

### 3.2 Tipografi & Skala

- _Font Family_: Poppins, Inter, sans-serif.
- _Scale_:
    - H1: 48px / 56px line-height
    - H2: 36px / 44px
    - H3: 24px / 32px
    - Body: 16px / 24px
    - Small: 14px / 20px

### 3.4 Ikon & Illustrasi

- Gunakan ikon vektor dari lucide-react.
- Ilustrasi custom bisa dibuat dengan gaya flat minimalis.

---

Dengan wireframe, mockup concept, dan UI kit ini, tim desain dan development dapat langsung memulai implementasi front-end dengan konsistensi visual dan UX yang optimal.
