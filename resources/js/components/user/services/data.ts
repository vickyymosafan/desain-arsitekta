import { Service } from './types';
import { BuildingIcon, Compass, Hammer } from 'lucide-react';

export const servicesData: Service[] = [
  {
    id: 1,
    title: "Desain Arsitektur",
    description: "Layanan desain arsitektur profesional untuk rumah, gedung, dan bangunan komersial yang sesuai dengan kebutuhan dan gaya Anda.",
    icon: Compass,
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
    icon: BuildingIcon,
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
    icon: Hammer,
    features: [
      "Konsultasi dan perencanaan renovasi",
      "Estimasi biaya transparan",
      "Pengerjaan rapi dan cepat",
      "Solusi untuk ruang terbatas"
    ]
  }
];
