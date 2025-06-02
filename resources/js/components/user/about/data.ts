// Data file for About section
// Centralizes all content to make it easier to manage and update

export interface SocialLinks {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
}

export interface TeamMemberData {
    id: number;
    name: string;
    role: string;
    photo: string;
    description: string;
    expertise?: string[];
    education?: string;
    yearsOfExperience?: number;
    projects?: string[];
    social: SocialLinks;
}

export interface CompanyValueData {
    id: number;
    title: string;
    description: string;
    detailedDescription?: string;
    icon: string;
    examples?: string[];
}

export interface MilestoneData {
    id: number;
    year: number;
    title: string;
    description: string;
    icon?: string;
    highlight?: boolean;
}

// Team members data with additional information for more dynamic presentation
export const teamMembers: TeamMemberData[] = [
    {
        id: 1,
        name: 'Anisa Wijaya',
        role: 'Principal Architect',
        photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        description: 'Berpengalaman lebih dari 10 tahun dalam desain arsitektur perkotaan dan hunian mewah.',
        expertise: ['Urban Design', 'Luxury Housing', 'Sustainable Architecture'],
        education: 'Master of Architecture, Institut Teknologi Bandung',
        yearsOfExperience: 12,
        projects: ['Green Tower Jakarta', 'Seaside Villas Bali', 'Urban Heights Apartments'],
        social: {
            instagram: '#',
            linkedin: '#',
            twitter: '#',
            website: 'https://anisawijaya.com'
        }
    },
    {
        id: 2,
        name: 'Budi Santoso',
        role: 'Senior Interior Designer',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        description: 'Spesialis dalam desain interior minimalis dan kontemporer dengan sentuhan budaya lokal.',
        expertise: ['Minimalist Design', 'Contemporary Interiors', 'Cultural Fusion'],
        education: 'Bachelor of Interior Design, Universitas Indonesia',
        yearsOfExperience: 8,
        projects: ['Minimalist Villa Collection', 'Javanese Heritage Hotel', 'Urban Loft Designs'],
        social: {
            instagram: '#',
            linkedin: '#'
        }
    },
    {
        id: 3,
        name: 'Carla Putri',
        role: 'Project Manager',
        photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        description: 'Mengelola proyek dari konsep hingga penyelesaian dengan fokus pada ketepatan waktu dan anggaran.',
        expertise: ['Project Planning', 'Budget Management', 'Team Coordination'],
        education: 'MBA in Project Management, Universitas Gadjah Mada',
        yearsOfExperience: 7,
        projects: ['Central Business District Jakarta', 'Luxury Villa Complex Bali', 'Corporate Headquarters Renovations'],
        social: {
            instagram: '#',
            linkedin: '#',
            twitter: '#'
        }
    },
    {
        id: 4,
        name: 'Denny Pratama',
        role: 'Sustainability Expert',
        photo: '/assets/images/team/denny.jpg',
        description: 'Ahli dalam implementasi prinsip arsitektur berkelanjutan dan sertifikasi green building.',
        expertise: ['Green Building', 'Sustainable Materials', 'Energy Efficiency'],
        education: 'PhD in Sustainable Development, University of Melbourne',
        yearsOfExperience: 10,
        projects: ['Eco-Friendly Office Park', 'Zero-Carbon Residential Complex', 'Green Building Certification Programs'],
        social: {
            instagram: '#',
            linkedin: '#'
        }
    },
    {
        id: 5,
        name: 'Elisa Rahman',
        role: 'Landscape Architect',
        photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        description: 'Mengkhususkan diri dalam menciptakan lanskap yang harmonis dengan lingkungan dan arsitektur.',
        expertise: ['Urban Landscaping', 'Sustainable Gardens', 'Biophilic Design'],
        education: 'Bachelor of Landscape Architecture, Institut Pertanian Bogor',
        yearsOfExperience: 6,
        projects: ['Central Park Redevelopment', 'Rooftop Gardens Project', 'Coastal Resort Landscaping'],
        social: {
            instagram: '#',
            linkedin: '#'
        }
    },
    {
        id: 6,
        name: 'Fajar Nugroho',
        role: '3D Visualization Artist',
        photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        description: 'Menciptakan visual 3D yang fotorealistik untuk membantu klien memvisualisasikan proyek dengan jelas.',
        expertise: ['3D Modeling', 'Photorealistic Rendering', 'Virtual Reality'],
        education: 'Digital Arts and Animation, School of Design',
        yearsOfExperience: 5,
        projects: ['Virtual Reality Showroom', 'Interactive Building Visualizations', 'Architectural Animation Series'],
        social: {
            instagram: '#',
            website: 'https://fajarnugroho.com'
        }
    }
];

// Expanded company values with more detailed information
export const companyValues: CompanyValueData[] = [
    {
        id: 1,
        title: 'Inovasi',
        description: 'Kami terus berinovasi dan mengadopsi teknologi terbaru untuk menciptakan desain yang progresif dan efisien.',
        detailedDescription: 'Inovasi adalah jantung dari pendekatan kami. Dari penggunaan software desain terbaru hingga integrasi teknologi smart home, kami selalu mencari cara untuk mendorong batas-batas desain arsitektur konvensional.',
        icon: 'lightbulb',
        examples: [
            'Integrasi teknologi smart home dalam setiap desain',
            'Penggunaan BIM (Building Information Modeling) untuk efisiensi proyek',
            'Aplikasi Virtual Reality untuk presentasi desain'
        ]
    },
    {
        id: 2,
        title: 'Keberlanjutan',
        description: 'Komitmen kami terhadap praktik arsitektur berkelanjutan dan ramah lingkungan untuk masa depan yang lebih baik.',
        detailedDescription: 'Keberlanjutan bukan sekadar tren bagi kami, melainkan komitmen mendasar. Setiap proyek yang kami kerjakan mempertimbangkan dampak lingkungan jangka panjang dan upaya untuk meminimalkan jejak karbon.',
        icon: 'leaf',
        examples: [
            'Penggunaan material ramah lingkungan dan lokal',
            'Desain yang memaksimalkan efisiensi energi',
            'Sistem pengelolaan air dan limbah yang berkelanjutan'
        ]
    },
    {
        id: 3,
        title: 'Kualitas',
        description: 'Kami mempertahankan standar kualitas tertinggi dalam setiap aspek desain dan konstruksi yang kami kerjakan.',
        detailedDescription: 'Kualitas bagi kami mencakup tidak hanya hasil akhir tetapi juga proses. Dari pemilihan material terbaik hingga kerja sama dengan kontraktor terpercaya, setiap langkah diawasi dengan ketat untuk menjamin kualitas tanpa kompromi.',
        icon: 'badge-check',
        examples: [
            'Inspeksi berkala selama proses konstruksi',
            'Penggunaan material premium dengan garansi',
            'Standar keamanan yang melebihi persyaratan regulasi'
        ]
    },
    {
        id: 4,
        title: 'Kolaborasi',
        description: 'Kami percaya pada kekuatan kolaborasi dengan klien dan tim untuk mencapai hasil terbaik bagi semua pihak.',
        detailedDescription: 'Kolaborasi adalah kunci kesuksesan proyek. Kami melibatkan klien di setiap tahap proses dan bekerja sama dengan ahli dari berbagai disiplin untuk memastikan perspektif yang komprehensif dalam setiap desain.',
        icon: 'users',
        examples: [
            'Proses desain yang sangat kolaboratif dengan klien',
            'Tim multidisiplin untuk setiap proyek',
            'Workshop dan sesi brainstorming reguler'
        ]
    }
];

// Company milestones showing the journey of growth
export const companyMilestones: MilestoneData[] = [
    {
        id: 1,
        year: 2010,
        title: 'Pendirian Arsitekta',
        description: 'Arsitekta didirikan oleh sekelompok arsitek muda dengan visi untuk menghadirkan desain inovatif di Indonesia.',
        icon: 'flag',
        highlight: true
    },
    {
        id: 2,
        year: 2012,
        title: 'Proyek Pertama',
        description: 'Menyelesaikan proyek pertama - Villa Resort di Bali yang mendapatkan penghargaan desain.',
        icon: 'award'
    },
    {
        id: 3,
        year: 2015,
        title: 'Ekspansi Tim',
        description: 'Mengembangkan tim menjadi 20 profesional dengan berbagai keahlian di bidang arsitektur dan desain.',
        icon: 'users'
    },
    {
        id: 4,
        year: 2018,
        title: 'Penghargaan Internasional',
        description: 'Menerima penghargaan internasional untuk proyek desain gedung ramah lingkungan di Jakarta.',
        icon: 'globe',
        highlight: true
    },
    {
        id: 5,
        year: 2020,
        title: 'Kantor Baru',
        description: 'Membuka kantor utama baru di Jakarta dengan studio desain modern dan galeri arsitektur.',
        icon: 'office-building'
    },
    {
        id: 6,
        year: 2023,
        title: 'Inovasi Digital',
        description: 'Meluncurkan platform digital untuk memungkinkan klien berkolaborasi secara real-time dalam proyek.',
        icon: 'device-mobile',
        highlight: true
    }
];

// Team department categories
export const teamDepartments = [
    { id: 'all', label: 'Semua' },
    { id: 'architecture', label: 'Arsitektur' },
    { id: 'interior', label: 'Desain Interior' },
    { id: 'management', label: 'Manajemen Proyek' },
    { id: 'sustainability', label: 'Keberlanjutan' }
];
