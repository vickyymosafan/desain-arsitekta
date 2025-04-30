import { Link } from '@inertiajs/react';
import { useState, useEffect, FC } from 'react';

// Types
interface Slide {
    id: number;
    image: string;
    alt: string;
}

interface SlideIndicatorProps {
    slides: Slide[];
    currentSlide: number;
    goToSlide: (index: number) => void;
}

interface NavigationArrowsProps {
    goToPrevSlide: () => void;
    goToNextSlide: () => void;
}

interface HeroContentProps {
    title: string;
    titleHighlight: string;
    description: string;
    ctaPrimary: { text: string; href: string };
    ctaSecondary: { text: string; href: string };
}

// Component for slide indicators (dots)
const SlideIndicators: FC<SlideIndicatorProps> = ({ slides, currentSlide, goToSlide }) => (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
        {slides.map((_, index) => (
            <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                    index === currentSlide 
                        ? "bg-emerald-600 dark:bg-emerald-500" 
                        : "bg-white/50 dark:bg-gray-400/50 hover:bg-white/80 dark:hover:bg-gray-400/80"
                }`}
                aria-label={`Go to slide ${index + 1}`}
            />
        ))}
    </div>
);

// Component for navigation arrows
const NavigationArrows: FC<NavigationArrowsProps> = ({ goToPrevSlide, goToNextSlide }) => (
    <>
        <button 
            onClick={goToPrevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Previous slide"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
        </button>
        <button 
            onClick={goToNextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            aria-label="Next slide"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
        </button>
    </>
);

// Component for hero content (text and buttons)
const HeroContent: FC<HeroContentProps> = ({ title, titleHighlight, description, ctaPrimary, ctaSecondary }) => (
    <div className="relative h-full w-full z-10 flex items-center justify-start">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className="max-w-xl md:max-w-2xl">
                <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-white drop-shadow-md">
                    {title} <span className="text-emerald-400">{titleHighlight}</span>
                </h1>
                <p className="text-lg text-white/90 mb-8 drop-shadow-sm max-w-lg">
                    {description}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        href={ctaPrimary.href}
                        className="rounded-md bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-lg transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                    >
                        {ctaPrimary.text}
                    </Link>
                    <Link
                        href={ctaSecondary.href}
                        className="rounded-md border border-white bg-transparent px-6 py-3 text-base font-medium text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                    >
                        {ctaSecondary.text}
                    </Link>
                </div>
            </div>
        </div>
    </div>
);

// Component for scroll indicator
const ScrollIndicator: FC = () => (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 animate-bounce hidden md:block">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
    </div>
);

// Main Hero Section component
const HeroSection: FC = () => {
    // Data for slides
    const slides: Slide[] = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            alt: "Modern House Design"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
            alt: "Contemporary Home"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            alt: "Luxury Residence"
        }
    ];

    // State for current slide
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    // Hero content data
    const heroContent = {
        title: "Wujudkan Rumah",
        titleHighlight: "Impian Anda",
        description: "Kami memberikan solusi terbaik untuk kebutuhan desain dan konstruksi bangunan Anda dengan pendekatan modern dan berkelanjutan.",
        ctaPrimary: { text: "Konsultasi Sekarang", href: "#" },
        ctaSecondary: { text: "Lihat Portofolio", href: "#" }
    };

    // Auto-advance slides
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [slides.length]);

    // Slide navigation handlers
    const goToSlide = (index: number): void => {
        setCurrentSlide(index);
    };

    const goToPrevSlide = (): void => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    const goToNextSlide = (): void => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Full-screen background slider */}
            <div className="absolute inset-0 z-0">
                {slides.map((slide, index) => (
                    <div 
                        key={slide.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img 
                            src={slide.image} 
                            alt={slide.alt} 
                            className="h-full w-full object-cover"
                            loading="eager"
                        />
                        {/* Dark overlay */}
                        <div className="absolute inset-0 bg-black/40"></div>
                    </div>
                ))}
                
                {/* Navigation controls */}
                <NavigationArrows goToPrevSlide={goToPrevSlide} goToNextSlide={goToNextSlide} />
                <SlideIndicators slides={slides} currentSlide={currentSlide} goToSlide={goToSlide} />
            </div>
            
            {/* Content */}
            <HeroContent {...heroContent} />
            
            {/* Scroll indicator */}
            <ScrollIndicator />
        </section>
    );
};

export default HeroSection;
