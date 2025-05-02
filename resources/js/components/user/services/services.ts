export interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}

export const SERVICES: ServiceData[] = [
  {
    id: 'design',
    title: 'Desain',
    description: 'Layanan desain profesional untuk rumah dan bangunan komersial dengan pendekatan yang memadukan estetika dan fungsionalitas.',
    icon: 'fa-drafting-compass',
    category: 'design'
  },
  {
    id: 'construction',
    title: 'Konstruksi',
    description: 'Jasa konstruksi berkualitas tinggi dengan tim berpengalaman dan material terbaik untuk mewujudkan bangunan impian Anda.',
    icon: 'fa-hard-hat',
    category: 'construction'
  },
  {
    id: 'renovation',
    title: 'Renovasi',
    description: 'Layanan renovasi untuk menyegarkan dan meningkatkan nilai properti Anda dengan sentuhan modern dan profesional.',
    icon: 'fa-tools',
    category: 'renovation'
  },
  {
    id: 'interior',
    title: 'Desain Interior',
    description: 'Layanan desain interior untuk menciptakan ruang yang indah, fungsional, dan nyaman sesuai dengan gaya dan kebutuhan Anda.',
    icon: 'fa-paint-brush',
    category: 'design'
  },
  {
    id: 'consultation',
    title: 'Konsultasi',
    description: 'Konsultasi profesional untuk proyek konstruksi dan renovasi Anda dengan tim ahli yang berpengalaman.',
    icon: 'fa-pencil',
    category: 'consultation'
  },
  {
    id: 'maintenance',
    title: 'Perawatan',
    description: 'Layanan perawatan berkala untuk memastikan bangunan Anda tetap dalam kondisi optimal dan tahan lama.',
    icon: 'fa-wrench',
    category: 'maintenance'
  }
];
