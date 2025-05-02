export interface ServiceData {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: string;
}

export const SERVICES: ServiceData[] = [
  {
    id: 'maintenance',
    title: 'Perawatan',
    description: 'Layanan perawatan berkala untuk memastikan bangunan Anda tetap dalam kondisi optimal dan tahan lama.',
    icon: 'fa-wrench',
    category: 'maintenance'
  }
];
