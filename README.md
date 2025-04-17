# Architect - Website Jasa Konstruksi

Selamat datang di repositori website Jasa Bangun Rumah Jember yang telah didesain ulang menjadi lebih modern, profesional, dan menarik secara visual. Proyek ini merupakan redesign dari [website asli](https://jasabangunrumahjember.com/) untuk meningkatkan pengalaman pengguna (UX) dan tampilan visual (UI).

![Jasa Bangun Rumah Jember](https://via.placeholder.com/1200x600?text=Jasa+Bangun+Rumah+Jember)

## 🌟 Fitur Utama

- ✅ **Navigasi Utama** - Bersih, responsif, dengan anchor links ke semua bagian penting
- ✅ **Hero Section** - Headline kuat, subheadline, dan CTA "Konsultasi Gratis"
- ✅ **Statistik Kepercayaan** - Jumlah proyek, tahun pengalaman dengan animasi angka
- ✅ **Layanan** - Grid card informatif dan klikabel ke halaman detail
- ✅ **Portofolio Proyek** - Tampilan grid dengan fitur filter berdasarkan kategori
- ✅ **Testimoni Pelanggan** - Format slider dengan teks dan video
- ✅ **FAQ** - Elemen accordion untuk navigasi mudah
- ✅ **Footer Profesional** - Info kontak, alamat, jam kerja, dan link sosial media

## 🚀 Fitur Tambahan

- ✅ **Galeri Before-After** - Slider horizontal untuk menampilkan transformasi proyek
- ✅ **Live Chat/Chatbot AI** - Menjawab pertanyaan dasar 24/7
- ✅ **Kalkulator Estimasi Biaya** - Form interaktif dengan hasil estimasi langsung
- ✅ **Portal Klien** - Tracking proyek, unggah dokumen, dan progress update
- ✅ **Blog/Artikel** - Konten SEO-friendly tentang tips bangun rumah
- ✅ **Feed Instagram** - Integrasi konten visual terbaru dari Instagram
- ✅ **Newsletter** - Berlangganan update promo/tips via email
- ✅ **Preview 3D/AR** - Eksplorasi desain rumah secara virtual
- ✅ **Dark Mode** - Toggle tampilan gelap/terang
- ✅ **Multi-bahasa** - Dukungan Bahasa Indonesia dan English
- ✅ **Analytics & Heatmap** - Pelacakan perilaku pengguna

## 💻 Teknologi

- **Framework:** [Laravel](https://laravel.com/)
- **Frontend:**
  - [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
  - [Inertia.js](https://inertiajs.com/)
  - [Tailwind CSS](https://tailwindcss.com/)
  - [Radix UI](https://www.radix-ui.com/) components
- **Optimasi:**
  - Lazy loading
  - Image optimization
  - Minifikasi file
  - Mobile-friendly & responsif
  - SEO-friendly structure

## 🛠️ Instalasi

### Prasyarat

- PHP 8.1 atau lebih tinggi
- Composer
- Node.js & npm
- MySQL atau database lainnya
- XAMPP/WAMP/LAMP stack

### Langkah-langkah Instalasi

1. **Clone repositori**
   ```bash
   git clone https://github.com/username/architect.git
   cd architect
   ```

2. **Instalasi dependensi PHP**
   ```bash
   composer install
   ```

3. **Instalasi dependensi JavaScript**
   ```bash
   npm install
   ```

4. **Konfigurasi lingkungan**
   ```bash
   cp .env.example .env
   php artisan key:generate
   ```

5. **Konfigurasi database**
   - Edit file `.env` dan sesuaikan konfigurasi database:
     ```
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=architect
     DB_USERNAME=root
     DB_PASSWORD=
     ```

6. **Migrasi dan seeding database**
   ```bash
   php artisan migrate --seed
   ```

7. **Jalankan server pengembangan**
   ```bash
   php artisan serve
   ```

8. **Compile assets**
   ```bash
   npm run dev
   ```

9. **Akses aplikasi**
   - Buka browser dan kunjungi `http://localhost:8000`

## 🚀 Deployment

Untuk deployment ke production, gunakan langkah-langkah berikut:

1. **Optimize Laravel**
   ```bash
   php artisan optimize
   ```

2. **Build assets untuk production**
   ```bash
   npm run build
   ```

3. **Konfigurasi web server**
   - Konfigurasikan web server (Nginx/Apache) untuk mengarahkan ke direktori `public`
   - Aktifkan SSL/HTTPS

## 📝 Pengembangan

### Struktur kode

- `/app` - Kode PHP Laravel 
- `/resources` - Frontend (React, CSS, JS)
- `/public` - Assets statis
- `/database` - Migrasi dan seeders
- `/config` - Konfigurasi aplikasi

### Perintah yang tersedia

- `npm run dev` - Menjalankan Vite dev server
- `npm run build` - Membuild assets untuk production
- `npm run lint` - Menjalankan ESLint
- `npm run format` - Menjalankan Prettier

## 🔧 Customisasi

### Warna dan Tema

Warna dan tema dapat dikustomisasi melalui file konfigurasi Tailwind di `tailwind.config.js`.

### Konten

Konten website (teks, gambar, testimonial) dapat dikelola melalui admin panel.

## ✨ Kontribusi

Silahkan berkontribusi pada proyek ini:

1. Fork repositori
2. Buat branch fitur (`git checkout -b feature/amazing-feature`)
3. Commit perubahan (`git commit -m 'Add amazing feature'`)
4. Push ke branch (`git push origin feature/amazing-feature`)
5. Buka Pull Request

## 📄 Lisensi

[MIT License](./LICENSE)

## 📞 Kontak

Untuk pertanyaan, silahkan hubungi tim kami melalui:
- Email: info@jasabangunrumahjember.com
- WhatsApp: +6281234567890

---

&copy; 2025 Jasa Bangun Rumah Jember. All Rights Reserved.
