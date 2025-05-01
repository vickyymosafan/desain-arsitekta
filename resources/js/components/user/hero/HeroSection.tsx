import { useState, useEffect, useRef, FC, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HeroSectionProps, Slide, HeroConfig, ButtonVariant } from './types';
import { getSlideAnimationStyle } from './animationUtils';
import HeroContent from './HeroContent';
import SlideIndicators from './SlideIndicators';
import ScrollIndicator from './ScrollIndicator';

// Adding CSS to handle navbar spacing globally
const globalCss = `
    @keyframes gradient-shift {
        0% { background-position: 0% 50% }
        50% { background-position: 100% 50% }
        100% { background-position: 0% 50% }
    }
`;

// Add the global CSS to the document
if (typeof document !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = globalCss;
    document.head.appendChild(style);
}

const HeroSection: FC<HeroSectionProps> = ({ config }) => {
    // Default configuration with enhanced animation options
    const defaultConfig: HeroConfig = {
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
    
    // Merge default config with provided config
    const mergedConfig = { ...defaultConfig, ...config };
    
    // Data for slides with enhanced properties
    const slides: Slide[] = [
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

    // State for current slide
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    // Hero content data with improved user-friendly messaging
    const heroContent = {
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
        animation: mergedConfig.contentAnimation,
        alignment: 'center' as 'left' | 'center' | 'right'
    };

    // Auto-advance slides
    useEffect(() => {
        if (!mergedConfig.autoplay || isPaused) return;
        
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, mergedConfig.autoplaySpeed);

        return () => clearInterval(interval);
    }, [mergedConfig.autoplay, mergedConfig.autoplaySpeed, slides.length, isPaused]);

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
    
    // Pause autoplay on hover if configured
    const handleMouseEnter = () => {
        if (mergedConfig.pauseOnHover) {
            setIsPaused(true);
        }
    };
    
    const handleMouseLeave = () => {
        if (mergedConfig.pauseOnHover) {
            setIsPaused(false);
        }
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

    // Calculate precise navbar spacing based on config and viewport size
    const getContentPosition = useCallback(() => {
        if (mergedConfig.navbarSpacing) {
            return {
                height: `calc(100vh - ${mergedConfig.navbarHeight}px)`,
                minHeight: `calc(100vh - ${mergedConfig.navbarHeight}px)`
            };
        }
        return {
            height: '100vh',
            minHeight: '100vh'
        };
    }, [mergedConfig.navbarSpacing, mergedConfig.navbarHeight]);

    // Convert height configuration to precise CSS values including calc() for responsive adjustments
    const getHeightStyle = useCallback((height?: string) => {
        if (!height) return {};
        
        if (height === 'screen') {
            return mergedConfig.navbarSpacing 
                ? { 
                    height: `calc(100vh - ${mergedConfig.navbarHeight}px)`,
                    minHeight: `calc(100vh - ${mergedConfig.navbarHeight}px)` 
                }
                : { 
                    height: '100vh',
                    minHeight: '100vh' 
                };
        } else if (height === 'full') {
            return { 
                height: '100%',
                minHeight: '100vh' 
            };
        } else if (height === 'auto') {
            return { height: 'auto' };
        } else if (height.includes('px') || height.includes('%') || height.includes('vh')) {
            return { 
                height,
                minHeight: height.includes('vh') ? height : '100vh'
            };
        }
        return {};
    }, [mergedConfig.navbarSpacing, mergedConfig.navbarHeight]);

    return (
        <div 
            className={`relative section-fullscreen overflow-hidden w-full`}
            style={{
                marginTop: mergedConfig.navbarSpacing ? `${mergedConfig.navbarHeight}px` : 0,
                position: 'relative',
                ...getHeightStyle(mergedConfig.height)
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            ref={sliderRef}
        >
            {/* Full-screen background slider */}
            <div className="absolute inset-0 z-0 w-full" style={getContentPosition()}>
                <AnimatePresence initial={false}>
                    {slides.map((slide, index) => (
                        index === currentSlide && (
                            <motion.div 
                                key={slide.id}
                                className="absolute inset-0"
                                {...getSlideAnimationStyle(mergedConfig.slidesAnimation || 'fade', index > currentSlide)}
                            >
                                {/* Slide image with effect based on slide.effect property */}
                                <motion.div className="h-full w-full" style={{ overflow: 'hidden', position: 'relative' }}>
                                    <motion.img 
                                        src={slide.image} 
                                        alt={slide.alt} 
                                        className={`absolute inset-0 h-full w-full object-cover ${
                                            slide.position === 'top' ? 'object-top' : 
                                            slide.position === 'bottom' ? 'object-bottom' : 
                                            slide.position === 'left' ? 'object-left' : 
                                            slide.position === 'right' ? 'object-right' : 'object-center'
                                        }`}
                                        loading={index === 0 ? "eager" : "lazy"}
                                        fetchPriority={index === 0 ? "high" : "auto"}
                                        decoding="async"
                                        animate={
                                            slide.effect === 'parallax' ? { scale: 1.1, y: [0, -15, 0], x: [0, 10, 0] } : 
                                            slide.effect === 'zoom' ? { scale: [1, 1.05, 1.02] } : 
                                            slide.effect === 'blur' ? { filter: ['blur(0px)', 'blur(2px)', 'blur(0px)'] } : 
                                            slide.effect === 'glitch' ? { x: [0, -2, 2, -1, 1, 0], y: [0, 1, -1, 0] } : 
                                            { scale: 1 }
                                        }
                                        transition={{ 
                                            duration: 8, 
                                            ease: 'easeInOut',
                                            repeat: Infinity, 
                                            repeatType: 'reverse' 
                                        }}
                                        style={{
                                            willChange: 'transform',
                                            transform: 'translateZ(0)' // Hardware acceleration
                                        }}
                                    />
                                </motion.div>
                                
                                {/* Grain overlay for texture - optimized performance */}
                                <div 
                                    className="absolute inset-0 opacity-30 w-full h-full" 
                                    style={{ 
                                        backgroundImage: 'url("https://images.unsplash.com/photo-1595876210-50f6313738a4?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3")', 
                                        backgroundRepeat: 'repeat',
                                        backgroundSize: 'auto',
                                        mixBlendMode: 'overlay',
                                        willChange: 'opacity',
                                        pointerEvents: 'none' // Prevents mouse events for better performance
                                    }}
                                    aria-hidden="true"
                                ></div>
                                
                                {/* Gradient overlay - customizable per slide */}
                                <div className={`absolute inset-0 w-full h-full ${slide.overlay || mergedConfig.overlayStyle}`}></div>
                                
                                {/* Decorative elements - based on slide accent color with improved positioning and performance */}
                                <motion.div 
                                    className="absolute opacity-20 mix-blend-screen hidden md:block" 
                                    style={{ 
                                        background: slide.accent || '#34d399',
                                        left: 'calc(10% + clamp(0px, 2vw, 20px))',  // Responsive positioning with clamp
                                        top: 'calc(20% + clamp(0px, 2vh, 20px))',   // Responsive positioning with clamp
                                        width: 'clamp(64px, 8vw, 128px)',           // Responsive sizing with clamp
                                        height: 'clamp(64px, 8vw, 128px)',          // Responsive sizing with clamp
                                        borderRadius: '50%',
                                        willChange: 'transform, opacity',
                                        pointerEvents: 'none'
                                    }}
                                    animate={{ 
                                        y: [-10, 10, -5, 0],
                                        scale: [1, 1.1, 0.9, 1],
                                        rotate: [0, 5, -5, 0],
                                        opacity: [0.2, 0.3, 0.2]
                                    }}
                                    transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror' }}
                                    aria-hidden="true"
                                />
                                
                                <motion.div 
                                    className="absolute opacity-20 mix-blend-screen hidden md:block" 
                                    style={{ 
                                        background: slide.accent || '#34d399',
                                        right: 'calc(15% + clamp(0px, 2vw, 20px))',  // Responsive positioning with clamp
                                        bottom: 'calc(25% + clamp(0px, 2vh, 20px))', // Responsive positioning with clamp
                                        width: 'clamp(48px, 6vw, 96px)',             // Responsive sizing with clamp
                                        height: 'clamp(48px, 6vw, 96px)',            // Responsive sizing with clamp
                                        borderRadius: '50%',
                                        willChange: 'transform, opacity',
                                        pointerEvents: 'none'
                                    }}
                                    animate={{ 
                                        y: [10, -10, 5, 0],
                                        scale: [0.9, 1.1, 1, 0.9],
                                        rotate: [0, -5, 5, 0],
                                        opacity: [0.2, 0.3, 0.2]
                                    }}
                                    transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror', delay: 1 }}
                                    aria-hidden="true"
                                />
                                
                                {/* Tag - New, Trending, Featured, etc. - With improved positioning and responsive design */}
                                {slide.tag && (
                                    <motion.div 
                                        className="absolute z-20 sm:top-6 sm:right-6 top-4 right-4"
                                        initial={{ opacity: 0, y: -20, rotate: -5 }}
                                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                                        transition={{ delay: 0.7, type: 'spring', stiffness: 120, damping: 15 }}
                                    >
                                        <div 
                                            className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10" 
                                            style={{ 
                                                boxShadow: `0 0 20px ${slide.accent || '#34d399'}40`,
                                                transform: 'translateZ(0)' // Hardware acceleration
                                            }}
                                        >
                                            <span 
                                                className="w-2 h-2 rounded-full animate-pulse" 
                                                style={{ background: slide.accent || '#34d399' }}
                                                aria-hidden="true"
                                            />
                                            <span className="text-white text-xs font-medium tracking-wider">{slide.tag}</span>
                                        </div>
                                    </motion.div>
                                )}
                                
                                {/* Enhanced slide info badge - With improved responsive positioning and visual design */}
                                {(slide.headline || slide.subtext) && (
                                    <motion.div 
                                        className="absolute bg-black/40 backdrop-blur-md rounded-xl py-3 px-5 max-w-xs hidden md:block border border-white/10"
                                        style={{ 
                                            boxShadow: `0 10px 30px -5px ${slide.accent || '#34d399'}20`,
                                            top: 'clamp(24px, 5vh, 40px)',          // Responsive positioning with clamp
                                            left: 'clamp(24px, 5vw, 40px)',          // Responsive positioning with clamp
                                            maxWidth: 'clamp(240px, 25vw, 320px)',   // Responsive width with clamp
                                            transform: 'translateZ(0)'                // Hardware acceleration
                                        }}
                                        initial={{ opacity: 0, x: -30, y: 20 }}
                                        animate={{ opacity: 1, x: 0, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.7, type: 'spring', stiffness: 100, damping: 15 }}
                                    >
                                        {slide.headline && 
                                            <motion.h3 
                                                className="text-white font-semibold text-xl mb-1"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.6 }}
                                            >
                                                <span 
                                                    className="pr-2 inline-block"
                                                    style={{ 
                                                        borderLeft: `3px solid ${slide.accent || '#34d399'}`, 
                                                        paddingLeft: '8px',
                                                        marginLeft: '-12px'
                                                    }}
                                                >
                                                    {slide.headline}
                                                </span>
                                            </motion.h3>
                                        }
                                        {slide.subtext && 
                                            <motion.p 
                                                className="text-white/80 text-sm leading-relaxed"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.7 }}
                                            >
                                                {slide.subtext}
                                            </motion.p>
                                        }
                                    </motion.div>
                                )}
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
                
                {/* Slide number indicator - optional based on config - with improved responsive positioning */}
                {mergedConfig.showNumber && (
                    <div 
                        className="absolute z-10 hidden md:block"
                        style={{
                            bottom: 'clamp(40px, 10vh, 64px)',  // Responsive positioning with clamp
                            right: 'clamp(24px, 5vw, 40px)'      // Responsive positioning with clamp
                        }}
                    >
                        <div className="text-white font-light text-3xl tracking-tighter shadow-lg bg-black/20 backdrop-blur-sm rounded-md px-3 py-1 border border-white/10">
                            <span className="text-emerald-400 font-medium">{(currentSlide + 1).toString().padStart(2, '0')}</span>
                            <span className="text-white/40 mx-2">/</span>
                            <span className="text-white/70">{slides.length.toString().padStart(2, '0')}</span>
                        </div>
                    </div>
                )}
                
                {/* Navigation controls - optional based on config - with improved positioning */}
                {mergedConfig.showIndicators && (
                    <SlideIndicators 
                        slides={slides} 
                        currentSlide={currentSlide} 
                        goToSlide={goToSlide}
                        variant={mergedConfig.indicatorType as any}
                        size={mergedConfig.indicatorSize as any}
                        position="custom"
                        customClass="absolute left-1/2 -translate-x-1/2 bottom-0 mb-8 sm:mb-12 z-20 w-full flex justify-center"
                    />
                )}
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 z-10 w-full h-full">
                <HeroContent {...heroContent} currentSlide={currentSlide} />
            </div>
            
            {/* Scroll indicator - optional based on config */}
            {mergedConfig.showScrollIndicator && (
                <ScrollIndicator
                    variant={mergedConfig.scrollIndicatorVariant}
                    color={mergedConfig.scrollIndicatorColor}
                    size={mergedConfig.scrollIndicatorSize as any}
                />
            )}
        </div>
    );
};

export default HeroSection;
