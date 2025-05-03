import { FC } from 'react';
import { HeroSectionProps } from './types';
import { applyGlobalStyles } from './styles';
import { defaultConfig, slides, getHeroContent } from './data';
import { getHeightStyle } from './layoutUtils';
import SlideBackground from './SlideBackground';
import SlideNumber from './SlideNumber';
import HeroContent from './HeroContent';
import SlideIndicators from './SlideIndicators';
import ScrollIndicator from './ScrollIndicator';
import useSlider from './useSlider';
import { motion, useScroll, useTransform } from 'framer-motion';
import FloatingElement from '../../shared/FloatingElement';
import ModernUIStyles from '../../shared/ModernUIStyles';

// Menerapkan gaya global saat komponen diimpor
applyGlobalStyles();

/**
 * Komponen Hero Section untuk menampilkan slider layar penuh dengan konten
 * Enhanced with modern Gen-Z UI elements and animations
 */
const HeroSection: FC<HeroSectionProps> = ({ config }) => {
    // Menggabungkan konfigurasi default dengan konfigurasi yang disediakan
    const mergedConfig = { ...defaultConfig, ...config };
    
    // Mendapatkan data konten hero
    const heroContent = getHeroContent(mergedConfig.contentAnimation || 'slideUpSpring');
    
    // Menggunakan hook slider kustom untuk menangani fungsionalitas slider
    const {
        currentSlide, 
        sliderRef,
        touchHandlers,
        hoverHandlers,
        clickHandlers,
        slideControls
    } = useSlider({
        slides,
        autoplay: mergedConfig.autoplay || false,
        autoplaySpeed: mergedConfig.autoplaySpeed || 5000,
        pauseOnHover: mergedConfig.pauseOnHover || true
    });
    
    // Memperbarui slide saat ini di konten hero
    heroContent.currentSlide = currentSlide;
    
    // Parallax scroll effect
    const { scrollYProgress } = useScroll();
    const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const parallaxScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
    const textY = useTransform(scrollYProgress, [0, 0.25], [0, -50]);

    // Adding floating decorative elements
    const floatingElements = [
        { top: '10%', left: '5%', size: '80px', intensity: 'light', speed: 'slow', delay: 0, shape: 'circle' },
        { top: '15%', right: '8%', size: '120px', intensity: 'medium', speed: 'medium', delay: 0.3, shape: 'square' },
        { bottom: '20%', left: '12%', size: '100px', intensity: 'light', speed: 'fast', delay: 0.6, shape: 'triangle' },
        { bottom: '15%', right: '10%', size: '80px', intensity: 'medium', speed: 'slow', delay: 0.9, shape: 'ring' },
    ];

    return (
        <>
            {/* Add modern UI global styles */}
            <ModernUIStyles />
            
            <motion.div 
                className="relative section-fullscreen overflow-hidden w-full"
                style={{
                    marginTop: mergedConfig.navbarSpacing ? `${mergedConfig.navbarHeight}px` : 0,
                    position: 'relative',
                    ...getHeightStyle(
                        mergedConfig.height, 
                        mergedConfig.navbarSpacing, 
                        mergedConfig.navbarHeight
                    ),
                }}
                {...touchHandlers}
                {...hoverHandlers}
                {...clickHandlers}
            >
                {/* Slider latar belakang layar penuh with parallax effect */}
                <motion.div 
                    className="absolute inset-0 z-0 w-full" 
                    style={{
                        ...getHeightStyle(
                            'screen', 
                            mergedConfig.navbarSpacing, 
                            mergedConfig.navbarHeight
                        ),
                        y: parallaxY,
                        scale: parallaxScale,
                    }}
                    ref={sliderRef}
                >
                    {/* Latar belakang slide */}
                    <SlideBackground 
                        slides={slides} 
                        currentSlide={currentSlide} 
                        slidesAnimation={mergedConfig.slidesAnimation || 'fade'} 
                    />
                    
                    {/* Modern overlay gradient for better text readability */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 z-5"></div>
                    
                    {/* Indikator nomor slide with modern styling */}
                    {mergedConfig.showNumber && (
                        <div 
                            className="absolute z-10 hidden md:block"
                            style={{
                                bottom: 'clamp(40px, 10vh, 64px)',
                                right: 'clamp(24px, 5vw, 40px)'
                            }}
                        >
                            <FloatingElement 
                                intensity="light" 
                                speed="slow" 
                                glowEffect={true}
                                glowColor="rgba(16, 185, 129, 0.5)"
                            >
                                <SlideNumber 
                                    currentSlide={currentSlide} 
                                    totalSlides={slides.length} 
                                />
                            </FloatingElement>
                        </div>
                    )}
                    
                    {/* Indikator navigasi with modern styling */}
                    {mergedConfig.showIndicators && (
                        <SlideIndicators 
                            slides={slides} 
                            currentSlide={currentSlide} 
                            goToSlide={slideControls.goToSlide}
                            variant={mergedConfig.indicatorType as 'dots' | 'lines' | 'numbers' | 'pills' | 'emoji' | 'minimal'}
                            size={mergedConfig.indicatorSize as 'sm' | 'md' | 'lg' | 'xl'}
                            position="custom"
                            customClass="absolute left-1/2 -translate-x-1/2 bottom-0 mb-8 sm:mb-12 z-20 w-full flex justify-center glass-effect py-2 px-4 mx-auto rounded-full max-w-xs backdrop-blur-md"
                        />
                    )}
                </motion.div>
                
                {/* Floating decorative elements - modern Gen-Z UI trend */}
                {floatingElements.map((el, index) => (
                    <FloatingElement
                        key={index}
                        className={`absolute z-20 hidden md:block ${el.shape === 'circle' ? 'rounded-full' : el.shape === 'square' ? 'rounded-lg' : ''}`}
                        intensity={el.intensity as 'light' | 'medium' | 'heavy'}
                        speed={el.speed as 'slow' | 'medium' | 'fast'}
                        delay={el.delay}
                        glowEffect={true}
                        glowColor="rgba(16, 185, 129, 0.5)"
                    >
                        <div
                            className={`
                                ${el.shape === 'circle' ? 'rounded-full bg-white/10 backdrop-blur-md' : 
                                  el.shape === 'square' ? 'rounded-lg bg-white/10 backdrop-blur-md' : 
                                  el.shape === 'triangle' ? 'clip-path-triangle bg-white/10 backdrop-blur-md' : 
                                  'ring-2 ring-white/20 rounded-full'}
                                glass-effect
                            `}
                            style={{
                                width: el.size,
                                height: el.size,
                                top: el.top,
                                left: el.left,
                                right: el.right,
                                bottom: el.bottom,
                                ...(el.shape === 'ring' ? {width: el.size, height: el.size, border: '2px solid rgba(255,255,255,0.2)'} : {}),
                            }}
                        />
                    </FloatingElement>
                ))}
                
                {/* Konten with scroll animation */}
                <motion.div 
                    className="absolute inset-0 z-10 w-full h-full"
                    style={{ 
                        opacity: textOpacity,
                        y: textY,
                    }}
                >
                    <HeroContent {...heroContent} />
                </motion.div>
                
                {/* Indikator scroll with modern styling */}
                {mergedConfig.showScrollIndicator && (
                    <FloatingElement
                        intensity="light"
                        speed="medium"
                        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
                    >
                        <ScrollIndicator
                            variant={mergedConfig.scrollIndicatorVariant}
                            color={mergedConfig.scrollIndicatorColor}
                            size={mergedConfig.scrollIndicatorSize as 'sm' | 'md' | 'lg'}
                        />
                    </FloatingElement>
                )}
            </motion.div>
        </>
    );
};

export default HeroSection;
