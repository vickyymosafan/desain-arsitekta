export interface ServiceData {
  title: string;
  description: string;
  icon: string;
}

export const SERVICES: ServiceData[] = [
  {
    title: 'Desain',
    description: 'Layanan desain profesional untuk rumah dan bangunan komersial dengan pendekatan yang memadukan estetika dan fungsionalitas.',
    icon: 'fa-drafting-compass'
  },
  {
    title: 'Konstruksi',
    description: 'Jasa konstruksi berkualitas tinggi dengan tim berpengalaman dan material terbaik untuk mewujudkan bangunan impian Anda.',
    icon: 'fa-hard-hat'
  },
  {
    title: 'Renovasi',
    description: 'Layanan renovasi untuk menyegarkan dan meningkatkan nilai properti Anda dengan sentuhan modern dan profesional.',
    icon: 'fa-tools'
  }
];
