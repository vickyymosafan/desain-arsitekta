---
description: Berikut adalah alur kerja (workflow) yang menggambarkan proses dari awal permintaan konsultasi gratis oleh pengguna hingga hasil akhir, dengan sistem yang terintegrasi antara dashboard klien dan admin.
---

### **Alur Pengguna**

1. **Aksi Pengguna: Klik Tombol "Mulai Konsultasi Gratis"**

   * **Langkah 1**: Pengguna mengklik tombol "Mulai Konsultasi Gratis".
   * **Langkah 2**: Sistem menampilkan tanggal terbaru dan memungkinkan pengguna memilih tanggal, bulan, dan tahun yang diinginkan untuk konsultasi.
   * **Langkah 3**: Pengguna memilih dan mengirimkan tanggal yang dipilih.

2. **Aksi Sistem: Tampilkan Dashboard Klien**

   * **Langkah 4**: Setelah pengiriman, sistem mengarahkan pengguna ke dashboard klien mereka.
   * **Langkah 5**: Sebuah notifikasi muncul di dashboard klien: *"Menunggu respon dari admin"*.
   * **Langkah 6**: Sistem menyimpan permintaan tersebut di database dan mengirimkannya ke dashboard admin.

---

### **Alur Admin**

1. **Dashboard Admin**

   * **Langkah 1**: Admin menerima permintaan konsultasi yang mencakup tanggal, bulan, dan tahun yang dipilih oleh pengguna.
   * **Langkah 2**: Admin dapat memeriksa permintaan dan memutuskan apakah akan menerima atau menolak permintaan tersebut.
   * **Langkah 3**: Admin memilih tombol **"Terima"** (Terima) atau **"Tolak"** (Tolak). Jika ditolak, admin harus memberikan alasan penolakan.

2. **Aksi Sistem: Perbarui Dashboard Klien**

   * **Langkah 4**: Jika permintaan **diterima**:

     * **Langkah 4.1**: Dashboard klien diperbarui dengan notifikasi konfirmasi: *"Konsultasi Diterima"*.
   * **Langkah 5**: Jika permintaan **ditolak**:

     * **Langkah 5.1**: Dashboard klien diperbarui dengan notifikasi penolakan: *"Konsultasi Ditolak"*, termasuk alasan yang diberikan oleh admin.

3. **Aliran Data**

   * **Langkah 6**: Sistem mencatat tindakan yang diambil (diterima atau ditolak) dan memberikan cap waktu untuk referensi di masa depan.
   * **Langkah 7**: Dashboard klien dan admin diperbarui secara real-time mengenai status permintaan.

---

### **Titik Integrasi**

* **Dashboard Klien**: Menampilkan status konsultasi (menunggu, diterima, atau ditolak).
* **Dashboard Admin**: Memungkinkan admin untuk melihat dan mengambil tindakan terhadap permintaan konsultasi.
* **Database**: Menyimpan semua permintaan konsultasi, tindakan yang diambil oleh admin, dan pembaruan status, memastikan konsistensi data antara dashboard klien dan admin.

---

Alur ini memastikan interaksi yang lancar antara sistem klien dan admin, memberikan pembaruan status secara real-time dan pelacakan untuk kedua pihak.

klien = user

buatkan database nya juga jangan lupa