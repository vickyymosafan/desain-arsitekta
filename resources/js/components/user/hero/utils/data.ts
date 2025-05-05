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

// Data slide dengan gambar dan konten yang lebih relevan untuk target audience
export const slides: Slide[] = [
    {
        id: 1,
        image: "/storage/images/hero/1.webp",
        alt: "Progressive Architecture Design",
        headline: "Spatial Vision",
        subtext: "Menghadirkan keseimbangan sempurna antara estetika dan fungsionalitas ruang",
        position: 'center',
        overlay: 'bg-gradient-to-b from-black/60 via-black/40 to-black/60',
        effect: 'parallax',
        accent: '#10b981',
        tag: 'Featured'
    },
    {
        id: 2,
        image: "/storage/images/hero/2.webp",
        alt: "Luxury Interior Design",
        headline: "Material Harmony",
        subtext: "Kurasi material premium yang menghadirkan dimensi dan tekstur tak terlupakan",
        position: 'center',
        overlay: 'bg-gradient-to-b from-black/60 via-black/40 to-black/60',
        effect: 'zoom',
        accent: '#8b5cf6',
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
