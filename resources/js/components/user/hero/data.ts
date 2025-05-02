import { Slide, HeroConfig, CTAButton, ButtonVariant, HeroContentProps, AnimationVariant } from './types';

// Default configuration with enhanced animation options
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

// Slide data
export const slides: Slide[] = [
    {
        id: 1,
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        alt: "Modern House Design",
        headline: "Desain Modern",
        subtext: "Arsitektur yang mengikuti tren terkini",
        position: 'center',
        effect: 'parallax',
        accent: '#34d399',
        tag: 'Trending'
    },
    {
        id: 2,
        image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
        alt: "Contemporary Home",
        headline: "Inovasi Terdepan",
        subtext: "Solusi rumah impian yang futuristik",
        position: 'center',
        effect: 'zoom',
        accent: '#3b82f6',
        tag: 'Popular'
    },
    {
        id: 3,
        image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
        alt: "Luxury Residence",
        headline: "Kemewahan Exclusive",
        subtext: "Pengalaman hunian premium berkualitas",
        position: 'center',
        overlay: 'bg-gradient-to-t from-black/70 via-black/50 to-black/70',
        effect: 'blur',
        accent: '#ef4444',
        tag: 'Featured'
    }
];

// Hero content data
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
