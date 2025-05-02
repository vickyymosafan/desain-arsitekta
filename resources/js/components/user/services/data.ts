import { Service } from './types';

export const servicesData: Service[] = [
  {
    id: 1,
    title: "Desain Arsitektur",
    description: "Layanan desain arsitektur profesional untuk rumah, gedung, dan bangunan komersial yang sesuai dengan kebutuhan dan gaya Anda.",
    icon: "fa-solid fa-drafting-compass",
    features: [
      "Konsep desain yang unik dan personal",
      "Gambar kerja detail dan lengkap",
      "Visualisasi 3D realistis",
      "Konsultasi dengan arsitek berpengalaman"
    ]
  },
  {
    id: 2,
    title: "Konstruksi Bangunan",
    description: "Jasa konstruksi bangunan berkualitas tinggi dengan tim ahli yang berpengalaman dan material premium.",
    icon: "fa-solid fa-building",
    features: [
      "Manajemen proyek profesional",
      "Pengerjaan tepat waktu",
      "Quality control ketat",
      "Garansi struktur bangunan"
    ]
  },
  {
    id: 3,
    title: "Renovasi",
    description: "Layanan renovasi untuk memperbaharui atau mengubah tampilan dan fungsi bangunan yang sudah ada.",
    icon: "fa-solid fa-hammer",
    features: [
      "Konsultasi dan perencanaan renovasi",
      "Estimasi biaya transparan",
      "Pengerjaan rapi dan cepat",
      "Solusi untuk ruang terbatas"
    ]
  }
];
