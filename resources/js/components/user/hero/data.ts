import { Slide, HeroConfig, CTAButton, ButtonVariant, HeroContentProps, AnimationVariant } from './types';

// Konfigurasi default dengan opsi animasi yang ditingkatkan
export const defaultConfig: HeroConfig = {
    height: 'screen',
    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnHover: true,
    showIndicators: true,
    showNumber: true,
    showScrollIndicator: true,
    slidesAnimation: 'fade',
    indicatorType: 'lines',
    indicatorSize: 'md',
    contentAlignment: 'center',
    contentAnimation: 'slideUpSpring',
    overlayStyle: 'bg-gradient-to-b from-black/60 via-black/40 to-black/60',
    scrollIndicatorVariant: 'default',
    scrollIndicatorColor: 'emerald',
    scrollIndicatorSize: 'md',
    navbarSpacing: true,
    navbarHeight: 64
};

// Data slide
export const slides: Slide[] = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        alt: "Modern Minimalist Architecture",
        headline: "Desain Modern",
        subtext: "Menciptakan ruang yang timeless dengan sentuhan inovatif",
        position: 'center',
        effect: 'parallax',
        accent: '#34d399',
        tag: 'Trending'
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        alt: "Contemporary Interior",
        headline: "Aesthetic Space",
        subtext: "Kenyamanan dan estetika dalam satu harmoni sempurna",
        position: 'center',
        effect: 'zoom',
        accent: '#3b82f6',
        tag: 'Must See'
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80",
        alt: "Luxury Concept House",
        headline: "Premium Living",
        subtext: "Pengalaman hunian eksklusif dengan sentuhan luxury minimalist",
        position: 'center',
        overlay: 'bg-gradient-to-t from-black/60 via-black/40 to-black/60',
        effect: 'blur',
        accent: '#f59e0b',
        tag: 'Exclusive'
    }
];

// Data konten hero
export const getHeroContent = (contentAnimation: string | undefined): HeroContentProps => ({
    title: "Bangun Rumah",
    titleHighlight: "Impian Anda",
    description: "Desain modern, konstruksi berkualitas, dan solusi yang berkelanjutan untuk mewujudkan hunian ideal sesuai gaya hidup Anda.",
    ctaPrimary: { 
        text: "Mulai Konsultasi Gratis", 
        href: "/contact", 
        variant: 'primary' as ButtonVariant, 
        icon: true
    },
    ctaSecondary: { 
        text: "Lihat Hasil Karya", 
        href: "/portfolio", 
        variant: 'secondary' as ButtonVariant,
        icon: true
    },
    animation: contentAnimation as AnimationVariant,
    alignment: 'center' as 'left' | 'center' | 'right',
    currentSlide: 0
});
