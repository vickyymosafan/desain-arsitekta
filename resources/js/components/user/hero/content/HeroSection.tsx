import { FC } from 'react';
import { HeroSectionProps } from '../utils/types';
import { applyGlobalStyles } from '../utils/styles';
import { defaultConfig, slides, getHeroContent } from '../utils/data';
import { getHeightStyle } from '../utils/layoutUtils';
import SlideBackground from '../slides/SlideBackground';
import SlideNumber from '../slides/SlideNumber';
import HeroContent from './HeroContent';
import SlideIndicators from '../slides/SlideIndicators';
import ScrollIndicator from '../controls/ScrollIndicator';
import useSlider from '../utils/useSlider';
import { motion, useScroll, useTransform } from 'framer-motion';


// Menerapkan gaya global saat komponen diimpor
applyGlobalStyles();

/**
 * Komponen Hero Section untuk menampilkan slider layar penuh dengan konten
 * Enhanced with modern animations
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

    return (
        <motion.div 
            className="relative section-fullscreen overflow-hidden w-full"
            style={{
                marginTop: mergedConfig.navbarSpacing ? `${mergedConfig.navbarHeight}px` : 0,
                position: 'relative',
                ...getHeightStyle(
                    mergedConfig.height, 
                    mergedConfig.navbarSpacing, 
                    mergedConfig.navbarHeight
                )
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
                        <SlideNumber 
                            currentSlide={currentSlide} 
                            totalSlides={slides.length} 
                        />
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
                        customClass="absolute left-1/2 -translate-x-1/2 bottom-0 mb-8 sm:mb-12 z-20 w-full flex justify-center"
                    />
                )}
            </motion.div>
            
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
            
            {/* Indikator scroll */}
            {mergedConfig.showScrollIndicator && (
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
                    <ScrollIndicator
                        variant={mergedConfig.scrollIndicatorVariant}
                        color={mergedConfig.scrollIndicatorColor}
                        size={mergedConfig.scrollIndicatorSize as 'sm' | 'md' | 'lg'}
                    />
                </div>
            )}
        </motion.div>
    );
};

export default HeroSection;
