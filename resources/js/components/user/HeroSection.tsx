import { Link } from '@inertiajs/react';
import { useState, useEffect, useRef, FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface Slide {
    id: number;
    image: string;
    alt: string;
    headline?: string;
    subtext?: string;
}

interface SlideIndicatorProps {
    slides: Slide[];
    currentSlide: number;
    goToSlide: (index: number) => void;
}

interface HeroContentProps {
    title: string;
    titleHighlight: string;
    description: string;
    ctaPrimary: { text: string; href: string };
    ctaSecondary: { text: string; href: string };
    currentSlide: number;
}

// Component for slide indicators (dots)
const SlideIndicators: FC<SlideIndicatorProps> = ({ slides, currentSlide, goToSlide }) => (
    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-4 z-10">
        {slides.map((_, index) => (
            <motion.button
                key={index}
                onClick={() => goToSlide(index)}
                className={`relative h-2.5 transition-all duration-300 ${
                    index === currentSlide ? "w-12 bg-emerald-500" : "w-6 bg-white/60 hover:bg-white/90"
                }`}
                whileTap={{ scale: 0.9 }}
                whileHover={{ y: -2 }}
                aria-label={`Go to slide ${index + 1}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                style={{ borderRadius: '4px' }}
            />
        ))}
    </div>
);

// Component for hero content (text and buttons)
const HeroContent: FC<HeroContentProps> = ({ title, titleHighlight, description, ctaPrimary, ctaSecondary, currentSlide }) => {
    return (
        <div className="relative h-full w-full z-10 flex items-center justify-start">
            {/* Vertical side text */}
            <div className="absolute top-0 right-8 h-full flex items-center z-10 hidden lg:block">
                <div className="flex flex-col items-center">
                    <div className="transform -rotate-90 whitespace-nowrap">
                        <motion.p 
                            className="uppercase tracking-[0.2em] text-white/70 font-light text-sm"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            Est. 2025 • Premium Architecture
                        </motion.p>
                    </div>
                    <div className="h-40 w-px bg-white/30 my-6"></div>
                    <div className="flex space-x-4">
                        <motion.a 
                            href="#" 
                            className="text-white/80 hover:text-white transition-colors"
                            whileHover={{ y: -2, scale: 1.1 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                        </motion.a>
                        <motion.a 
                            href="#" 
                            className="text-white/80 hover:text-white transition-colors"
                            whileHover={{ y: -2, scale: 1.1 }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                        </motion.a>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <motion.div 
                    className="max-w-xl md:max-w-2xl"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <motion.div 
                        className="mb-3 inline-block bg-emerald-500/90 backdrop-blur-sm px-4 py-1 rounded-full"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="text-xs uppercase tracking-wider font-semibold text-white">Arsitekta Pro</span>
                    </motion.div>
                    
                    <motion.h1 
                        className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-4 text-white drop-shadow-md"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {title}{' '}
                        <motion.span 
                            className="text-emerald-400 inline-block"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {titleHighlight}
                        </motion.span>
                    </motion.h1>
                    
                    <motion.p 
                        className="text-lg text-white/90 mb-8 drop-shadow-sm max-w-lg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {description}
                    </motion.p>
                    
                    <motion.div 
                        className="flex flex-col sm:flex-row gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                href={ctaPrimary.href}
                                className="rounded-md bg-emerald-600 px-6 py-3.5 font-medium text-white shadow-lg transition flex items-center justify-center gap-2 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 group"
                            >
                                {ctaPrimary.text}
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transform transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                </svg>
                            </Link>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                            <Link
                                href={ctaSecondary.href}
                                className="rounded-md border border-white/70 backdrop-blur-sm bg-transparent px-6 py-3.5 font-medium text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 flex items-center justify-center"
                            >
                                {ctaSecondary.text}
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

// Component for scroll indicator
const ScrollIndicator: FC = () => (
    <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center justify-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
    >
        <div className="text-white/70 text-xs uppercase tracking-widest font-light mb-2">Scroll</div>
        <motion.div 
            animate={{ y: [0, 8, 0] }} 
            transition={{ repeat: Infinity, duration: 1.5 }}
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white/80" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
        </motion.div>
    </motion.div>
);

// Main Hero Section component
const HeroSection: FC = () => {
    // Data for slides
    const slides: Slide[] = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            alt: "Modern House Design",
            headline: "Desain Modern",
            subtext: "Arsitektur yang mengikuti tren terkini"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
            alt: "Contemporary Home",
            headline: "Inovasi Terdepan",
            subtext: "Solusi rumah impian yang futuristik"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            alt: "Luxury Residence",
            headline: "Kemewahan Exclusive",
            subtext: "Pengalaman hunian premium berkualitas"
        }
    ];

    // State for current slide
    const [currentSlide, setCurrentSlide] = useState<number>(0);

    // Hero content data
    const heroContent = {
        title: "Wujudkan Rumah",
        titleHighlight: "Impian Anda",
        description: "Kami memberikan solusi terbaik untuk kebutuhan desain dan konstruksi bangunan Anda dengan pendekatan modern dan berkelanjutan.",
        ctaPrimary: { text: "Konsultasi Sekarang", href: "/contact" },
        ctaSecondary: { text: "Lihat Portofolio", href: "/portfolio" }
    };

    // Auto-advance slides
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [slides.length]);

    // Reference for the slider container
    const sliderRef = useRef<HTMLDivElement>(null);
    
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
    
    // Touch swipe handling
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    
    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50;
    
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX);
    };
    
    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };
    
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        
        if (isLeftSwipe) {
            goToNextSlide();
        } else if (isRightSwipe) {
            goToPrevSlide();
        }
    };

    return (
        <section 
            className="relative h-screen w-full overflow-hidden" 
            ref={sliderRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Full-screen background slider */}
            <div className="absolute inset-0 z-0">
                <AnimatePresence initial={false}>
                    {slides.map((slide, index) => (
                        index === currentSlide && (
                            <motion.div 
                                key={slide.id}
                                className="absolute inset-0"
                                initial={{ opacity: 0, scale: 1.05 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.8, ease: "easeOut" }}
                            >
                                <img 
                                    src={slide.image} 
                                    alt={slide.alt} 
                                    className="h-full w-full object-cover"
                                    loading={index === 0 ? "eager" : "lazy"}
                                />
                                
                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/60"></div>
                                
                                {/* Slide info badge */}
                                <motion.div 
                                    className="absolute top-8 left-8 bg-black/30 backdrop-blur-md rounded-lg py-2 px-4 max-w-xs hidden md:block"
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                >
                                    <h3 className="text-white font-semibold text-lg">{slide.headline}</h3>
                                    <p className="text-white/80 text-sm">{slide.subtext}</p>
                                </motion.div>
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
                
                {/* Slide number indicator */}
                <div className="absolute bottom-8 right-8 z-10 hidden md:block">
                    <div className="text-white font-light text-3xl tracking-tighter">
                        <span className="text-emerald-400 font-medium">{(currentSlide + 1).toString().padStart(2, '0')}</span>
                        <span className="text-white/40 mx-2">/</span>
                        <span className="text-white/70">{slides.length.toString().padStart(2, '0')}</span>
                    </div>
                </div>
                
                {/* Navigation arrows */}
                <div className="absolute inset-y-0 left-4 z-10 flex items-center justify-center">
                    <motion.button 
                        onClick={goToPrevSlide}
                        className="p-2 rounded-full bg-black/20 backdrop-blur-sm text-white/80 hover:text-white hover:bg-emerald-600/80 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                        </svg>
                    </motion.button>
                </div>
                
                <div className="absolute inset-y-0 right-4 z-10 flex items-center justify-center">
                    <motion.button 
                        onClick={goToNextSlide}
                        className="p-2 rounded-full bg-black/20 backdrop-blur-sm text-white/80 hover:text-white hover:bg-emerald-600/80 transition-all duration-300"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 }}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </motion.button>
                </div>
                
                {/* Navigation controls */}
                <SlideIndicators slides={slides} currentSlide={currentSlide} goToSlide={goToSlide} />
            </div>
            
            {/* Content */}
            <HeroContent {...heroContent} currentSlide={currentSlide} />
            
            {/* Scroll indicator */}
            <ScrollIndicator />
        </section>
    );
};

export default HeroSection;
