import { ReactNode } from 'react';

/**
 * Varian tombol yang tersedia
 */
export type ButtonVariant = 'primary' | 'secondary' | 'outline';

/**
 * Varian animasi yang tersedia untuk komponen
 */
export type AnimationVariant = 
    'fadeIn' | 'fadeInSlow' | 'fadeInFast' |
    'slideUp' | 'slideUpBounce' | 'slideUpSpring' |
    'slideDown' | 'slideLeft' | 'slideRight' | 
    'zoom' | 'fade' | 'none' | 'blur';

/**
 * Tipe transisi animasi
 */
export type TransitionType = 'tween' | 'spring' | 'inertia';

/**
 * Tipe easing untuk animasi
 */
export type EasingType = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'circIn' | 'circOut' | 'circInOut' | 'backIn' | 'backOut' | 'backInOut' | 'anticipate';

/**
 * Props untuk varian animasi
 */
export type AnimationVariantProps = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initial: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animate: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transition: Record<string, any>;
};

/**
 * Interface slide untuk komponen hero
 */
export interface Slide {
    /** ID unik slide */
    id: number;
    /** URL gambar background */
    image: string;
    /** Teks alternatif untuk gambar */
    alt: string;
    /** Judul utama slide */
    headline?: string;
    /** Teks pendukung/subtitle slide */
    subtext?: string;
    /** Custom overlay gradient */
    overlay?: string;
    /** Posisi gambar latar belakang */
    position?: 'center' | 'top' | 'bottom' | 'left' | 'right';
    /** Video background opsional */
    video?: string;
    /** Efek visual untuk slide */
    effect?: 'none' | 'parallax' | 'blur' | 'zoom' | 'glitch' | 'grain';
    /** Warna aksen untuk highlight khusus per slide */
    accent?: string;
    /** Tag opsional (seperti 'New', 'Featured', dll) */
    tag?: string;
    /** Animasi khusus untuk slide */
    animation?: AnimationVariant;
    /** Perataan konten slide */
    alignment?: 'left' | 'center' | 'right';
}

/**
 * Props untuk komponen indikator slide
 */
export interface SlideIndicatorProps {
    /** Daftar slide */
    slides: Slide[];
    /** Indeks slide saat ini */
    currentSlide: number;
    /** Fungsi untuk pindah ke slide tertentu */
    goToSlide: (index: number) => void;
    /** Varian tampilan indikator */
    variant?: 'dots' | 'lines' | 'numbers' | 'pills' | 'emoji' | 'minimal';
    /** Ukuran indikator */
    size?: 'sm' | 'md' | 'lg' | 'xl';
    /** Posisi indikator */
    position?: 'bottom' | 'top' | 'left' | 'right' | 'custom';
    /** Kelas CSS kustom untuk digunakan jika position='custom' */
    customClass?: string;
}

/**
 * Interface tombol ajakan untuk bertindak (CTA)
 */
export interface CTAButton {
    /** Teks tombol */
    text: string;
    /** URL tujuan */
    href?: string;
    /** Varian tampilan tombol */
    variant?: ButtonVariant;
    /** Apakah menampilkan ikon */
    icon?: boolean;
    /** Apakah link eksternal */
    external?: boolean;
    /** Fungsi onClick untuk tombol */
    onClick?: () => void;
    /** Flag untuk menentukan apakah tombol membuka date picker */
    openDatePicker?: boolean;
}

/**
 * Props untuk komponen konten hero
 */
export interface HeroContentProps {
    /** Judul utama */
    title: string;
    /** Bagian judul yang disorot */
    titleHighlight?: string;
    /** Deskripsi konten */
    description: string;
    /** Tombol CTA primer */
    ctaPrimary: CTAButton;
    /** Tombol CTA sekunder (opsional) */
    ctaSecondary?: CTAButton;
    /** Indeks slide saat ini */
    currentSlide: number;
    /** Efek animasi untuk konten */
    animation?: AnimationVariant;
    /** Perataan konten */
    alignment?: 'left' | 'center' | 'right';
}

/**
 * Props untuk motion pada indikator
 */
export type IndicatorMotionProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  whileTap: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  whileHover: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initial: Record<string, any>;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animate: Record<string, any> | ((index: number) => Record<string, any>);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transition: (index: number) => Record<string, any>;
};

/**
 * Konfigurasi varian indikator
 */
export type IndicatorVariantConfig = {
    /** Kelas CSS untuk container indikator */
    containerClass: string;
    /** Fungsi untuk membuat kelas CSS item berdasarkan indeks */
    itemClass: (index: number) => string;
    /** Props motion/animasi untuk indikator */
    motionProps: IndicatorMotionProps;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: Record<string, any>;
    /** Fungsi untuk menentukan konten indikator berdasarkan indeks */
    content: (index: number) => ReactNode;
};

/**
 * Props untuk komponen indikator scroll
 */
export interface ScrollIndicatorProps {
    /** Varian tampilan indikator scroll */
    variant?: 'default' | 'pulse' | 'bounce' | 'fade';
    /** Warna indikator */
    color?: string;
    /** Ukuran indikator */
    size?: 'sm' | 'md' | 'lg';
}

/**
 * Konfigurasi untuk komponen hero
 */
export interface HeroConfig {
    /** Tinggi hero section */
    height?: 'full' | 'screen' | 'auto' | string;
    /** Apakah mengaktifkan autoplay */
    autoplay?: boolean;
    /** Kecepatan autoplay dalam milidetik */
    autoplaySpeed?: number;
    /** Jeda autoplay saat hover */
    pauseOnHover?: boolean;
    /** Tampilkan indikator slide */
    showIndicators?: boolean;
    /** Tampilkan nomor slide */
    showNumber?: boolean;
    /** Tampilkan indikator scroll */
    showScrollIndicator?: boolean;
    /** Jenis animasi transisi antar slide */
    slidesAnimation?: 
        'fade' | 'slide' | 'zoom' | 'none' | 
        'flip' | 'rotate' | 'slideUp' | 'slideDown' | 
        'crossFade' | 'elastic';
    /** Tipe indikator slide */
    indicatorType?: 'dots' | 'lines' | 'numbers';
    /** Ukuran indikator */
    indicatorSize?: 'sm' | 'md' | 'lg';
    /** Perataan konten */
    contentAlignment?: 'left' | 'center' | 'right';
    /** Animasi untuk konten */
    contentAnimation?: AnimationVariant;
    /** Gaya overlay */
    overlayStyle?: string;
    /** Varian indikator scroll */
    scrollIndicatorVariant?: 'default' | 'pulse' | 'bounce' | 'fade';
    /** Warna indikator scroll */
    scrollIndicatorColor?: string;
    /** Ukuran indikator scroll */
    scrollIndicatorSize?: 'sm' | 'md' | 'lg';
    /** Opsi untuk mengontrol spasi di bawah navbar */
    navbarSpacing?: boolean;
    /** Tinggi navbar dalam piksel */
    navbarHeight?: number;
}

/**
 * Props untuk komponen hero section
 */
export interface HeroSectionProps {
    /** Konfigurasi opsional untuk hero */
    config?: HeroConfig;
}
