import { FC } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

// Centralized utilities
import { applyGlobalStyles, getHeightStyle } from '../../../../utils/styles';

// Local imports
import { HeroSectionProps } from '../utils/types';
import { defaultConfig, slides, getHeroContent } from '../utils/data';
import SlideBackground from '../slides/SlideBackground';
import SlideNumber from '../slides/SlideNumber';
import HeroContent from './HeroContent';
import SlideIndicators from '../slides/SlideIndicators';
import ScrollIndicator from '../controls/ScrollIndicator';
import useSlider from '../utils/useSlider';


// Note: Global styles should be applied at a higher level in the application
// rather than within individual components to prevent duplication

/**
 * Hero Section component for displaying fullscreen slider with content
 * Enhanced with modern animations for Gen Z audience appeal
 */
const HeroSection: FC<HeroSectionProps> = ({ config }) => {
    // Merge provided config with defaults
    const mergedConfig = { ...defaultConfig, ...config };
    
    // Get hero content data with appropriate animation style
    const heroContent = getHeroContent(mergedConfig.contentAnimation || 'slideUpSpring');
    
    // Use custom slider hook for handling slider functionality
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
    
    // Update current slide in hero content
    heroContent.currentSlide = currentSlide;
    
    // Parallax scroll effects for modern, dynamic feel
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
            aria-label="Hero slider section"
        >
            {/* Fullscreen background slider with parallax effect */}
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
                aria-hidden="true" // Background is decorative, mark as hidden for screen readers
            >
                {/* Slide background images */}
                <SlideBackground 
                    slides={slides} 
                    currentSlide={currentSlide} 
                    slidesAnimation={mergedConfig.slidesAnimation || 'fade'} 
                />
                
                {/* Modern overlay gradient for better text readability and visual appeal */}
                <div 
                    className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/50 z-5"
                    aria-hidden="true"
                ></div>
                
                {/* Slide number indicator with modern styling - hidden on mobile */}
                {mergedConfig.showNumber && (
                    <div 
                        className="absolute z-10 hidden md:block"
                        style={{
                            bottom: 'clamp(40px, 10vh, 64px)',
                            right: 'clamp(24px, 5vw, 40px)'
                        }}
                        aria-label="Current slide indicator"
                    >
                        <SlideNumber 
                            currentSlide={currentSlide} 
                            totalSlides={slides.length} 
                        />
                    </div>
                )}
                
                {/* Navigation indicators with modern styling and animations */}
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
            
            {/* Main content with scroll-based animations */}
            <motion.div 
                className="absolute inset-0 z-10 w-full h-full"
                style={{ 
                    opacity: textOpacity,
                    y: textY,
                }}
            >
                <HeroContent {...heroContent} />
            </motion.div>
            
            {/* Scroll indicator - visual cue for users to scroll down */}
            {mergedConfig.showScrollIndicator && (
                <div 
                    className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
                    aria-hidden="true" // Decorative element, hidden from screen readers
                >
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
