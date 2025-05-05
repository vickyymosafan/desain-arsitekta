---
description: Berikut rincian kebutuhan fitur untuk website jasa bangun rumah dengan dua peran utama (User & Admin) serta ekosistem pendukung yang solid. Saya bagi menjadi **Functional Requirements** (apa yang sistem harus bisa lakukan)
---

## 1. Functional Requirements

### 1.1. Pengguna (User) / Calon Klien

1. **Halaman Utama & Company Profile**

   - Hero section dengan CTA (“Konsultasi Sekarang”, “Lihat Portofolio”)
   - Ringkasan layanan (Desain, Konstruksi, Renovasi)
   - Statistik singkat (Proyek selesai, Tahun beroperasi, Testimoni)

2. **Portofolio Proyek**

   - Galeri foto (filter berdasarkan tipe rumah / lokasi)
   - Detail proyek (deskripsi, luas bangunan, durasi pengerjaan)
   - Lightbox untuk melihat gambar dengan zoom

3. **Pencarian & Filter Layanan**

   - Cari berdasarkan nama layanan atau kata kunci
   - Filter: tipe bangunan (rumah tinggal, ruko), status (selesai, ongoing)

4. **Formulir Permintaan Penawaran (Request Quote)**

   - Input: nama, email, nomor telepon, jenis layanan, deskripsi proyek, upload gambar/sketsa
   - Validasi front-end (required fields, ukuran file maksimal)
   - Captcha sederhana untuk mencegah spam

5. **User Registration & Authentication**

   - Daftar via email/password atau social login (Google/Facebook)
   - Verifikasi email otomatis
   - Lupa password & reset via email

6. **Dashboard User**

   - Melihat status request (Pending, Proses, Selesai)
   - Riwayat penawaran dan faktur
   - Chat / pesan internal dengan tim admin
   - Kelola profil: data diri, alamat, password

7. **Sistem Chat / Live Support**

   - Widget chat berbasis WebSocket (real-time) atau integrasi dengan WhatsApp API
   - Riwayat percakapan tersimpan per user

8. **Pembayaran & Invoice**

   - Integrasi payment gateway (Midtrans, Xendit, dll.)
   - Generate invoice otomatis (PDF)
   - Notifikasi email + dashboard saat invoice telah dibayar

9. **Testimoni & Rating**

   - Formulir pengisian testimoni setelah proyek selesai
   - Tampilan rating bintang & komentar di halaman portofolio

10. **Blog / Artikel Tips**
    - CMS sederhana untuk posting artikel (SEO-friendly)
    - Kategori & tag
    - Komentar (opsional) dan share ke social media

---

### 1.2. Administrator (Admin)

1. **Authentication & Authorization**

   - Login aman dengan 2FA (opsional)
   - Role-based access control (Super Admin vs Staff)

2. **Dashboard Admin**

   - Ringkasan KPI: jumlah request baru, pendapatan bulan ini, chat terpending, dll.
   - Grafik tren (misal permintaan per bulan, revenue)

3. **Manajemen Pengguna**

   - CRUD (Create, Read, Update, Delete) user dan staf
   - Reset password user, aktif/nonaktifkan akun

4. **Manajemen Layanan & Portofolio**

   - CRUD layanan (nama, deskripsi, harga estimasi)
   - CRUD proyek portofolio (foto, detail, status)

5. **Manajemen Request & Penawaran**

   - Lihat daftar request masuk
   - Buat/edit penawaran (estimasi biaya, timeline)
   - Kirim email notifikasi otomatis ke user

6. **Manajemen Pembayaran & Invoice**

   - Lihat status pembayaran
   - Generate / kirim ulang invoice PDF
   - Rekonsiliasi transaksi dari payment gateway

7. **Chat Support & Helpdesk**

   - Panel untuk membalas chat user
   - Tanda “urgent” untuk request prioritas

8. **Manajemen Konten Blog**

   - CRUD artikel, kategori, tag
   - Preview & publish scheduling

9. **Laporan & Eksport Data**

   - Export CSV / Excel: daftar user, request, transaksi
   - Laporan berkala (harian, mingguan, bulanan)

10. **Pengaturan Sistem**
    - Konfigurasi payment gateway
    - Setting email SMTP
    - Pengaturan SEO global (meta tag, sitemap)

Dengan skenario di atas, Anda mendapatkan gambaran lengkap fitur apa saja yang perlu dikembangkan untuk memenuhi kebutuhan user dan admin, sekaligus memastikan website Anda aman, cepat, mudah di-maintain, serta siap untuk di-scale di kemudian hari.