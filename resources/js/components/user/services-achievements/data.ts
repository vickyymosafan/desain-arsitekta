// Service and achievement data for the Arsitekta website
// This file allows for easy data management and editing

export interface ServiceItem {
    id: number;
    title: string;
    description: string;
    icon: string;
    color: string;
    category: string;
    detailUrl?: string;
}

export interface AchievementItem {
    id: number;
    value: number;
    label: string;
    symbol: string;
    duration: number;
    icon?: string;
}

// Service data with categories for filtering
export const services: ServiceItem[] = [
    {
        id: 1,
        title: 'Desain Arsitektur',
        description: 'Layanan desain arsitektur yang menggabungkan estetika, keberlanjutan, dan fungsionalitas untuk berbagai jenis bangunan.',
        icon: 'pencil-ruler',
        color: 'emerald',
        category: 'desain',
        detailUrl: '/services/desain-arsitektur'
    },
    {
        id: 2,
        title: 'Konstruksi',
        description: 'Layanan konstruksi berkualitas tinggi yang mewujudkan desain menjadi bangunan nyata dengan standar terbaik.',
        icon: 'building',
        color: 'emerald',
        category: 'konstruksi',
        detailUrl: '/services/konstruksi'
    },
    {
        id: 3,
        title: 'Renovasi',
        description: 'Transformasi ruang yang ada menjadi lebih fungsional, modern, dan sesuai dengan kebutuhan Anda.',
        icon: 'paint-roller',
        color: 'emerald',
        category: 'renovasi',
        detailUrl: '/services/renovasi'
    },
    {
        id: 4,
        title: 'Desain Interior',
        description: 'Solusi desain interior yang menyatukan fungsi, estetika, dan kenyamanan untuk menciptakan ruang yang sesuai dengan gaya hidup Anda.',
        icon: 'couch',
        color: 'emerald',
        category: 'desain',
        detailUrl: '/services/desain-interior'
    },
    {
        id: 5,
        title: 'Konsultasi',
        description: 'Layanan konsultasi profesional untuk membantu Anda merencanakan proyek dengan tepat dan efisien.',
        icon: 'comments',
        color: 'emerald',
        category: 'konsultasi',
        detailUrl: '/services/konsultasi'
    },
    {
        id: 6,
        title: 'Manajemen Proyek',
        description: 'Pengelolaan proyek dari awal hingga akhir untuk memastikan proyek berjalan sesuai jadwal dan anggaran.',
        icon: 'tasks',
        color: 'emerald',
        category: 'konstruksi',
        detailUrl: '/services/manajemen-proyek'
    }
];

// Categories for services
export const serviceCategories = [
    { id: 'all', label: 'Semua' },
    { id: 'desain', label: 'Desain' },
    { id: 'konstruksi', label: 'Konstruksi' },
    { id: 'renovasi', label: 'Renovasi' },
    { id: 'konsultasi', label: 'Konsultasi' }
];

// Achievement data
export const achievements: AchievementItem[] = [
    {
        id: 1,
        value: 250,
        label: 'Proyek Selesai',
        symbol: '+',
        duration: 2.5,
        icon: 'check-circle'
    },
    {
        id: 2,
        value: 15,
        label: 'Tahun Pengalaman',
        symbol: '+',
        duration: 2.0,
        icon: 'calendar'
    },
    {
        id: 3,
        value: 98,
        label: 'Klien Puas',
        symbol: '%',
        duration: 3.0,
        icon: 'smile'
    },
    {
        id: 4,
        value: 30,
        label: 'Penghargaan',
        symbol: '+',
        duration: 2.2,
        icon: 'award'
    }
];
