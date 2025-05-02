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

// Apply global styles when the component is imported
applyGlobalStyles();

/**
 * Hero Section component for displaying a fullscreen slider with content
 */
const HeroSection: FC<HeroSectionProps> = ({ config }) => {
    // Merge default config with provided config
    const mergedConfig = { ...defaultConfig, ...config };
    
    // Get hero content data
    const heroContent = getHeroContent(mergedConfig.contentAnimation || 'slideUpSpring');
    
    // Use our custom slider hook to handle slider functionality
    const {
        currentSlide, 
        sliderRef,
        touchHandlers,
        hoverHandlers,
        slideControls
    } = useSlider({
        slides,
        autoplay: mergedConfig.autoplay || false,
        autoplaySpeed: mergedConfig.autoplaySpeed || 5000,
        pauseOnHover: mergedConfig.pauseOnHover || true
    });
    
    // Update current slide in hero content
    heroContent.currentSlide = currentSlide;

    return (
        <div 
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
        >
            {/* Full-screen background slider */}
            <div 
                className="absolute inset-0 z-0 w-full" 
                style={getHeightStyle(
                    'screen', 
                    mergedConfig.navbarSpacing, 
                    mergedConfig.navbarHeight
                )}
                ref={sliderRef}
            >
                {/* Slide Backgrounds */}
                <SlideBackground 
                    slides={slides} 
                    currentSlide={currentSlide} 
                    slidesAnimation={mergedConfig.slidesAnimation || 'fade'} 
                />
                
                {/* Slide number indicator */}
                {mergedConfig.showNumber && (
                    <div 
                        className="absolute z-10 hidden md:block"
                        style={{
                            bottom: 'clamp(40px, 10vh, 64px)',
                            right: 'clamp(24px, 5vw, 40px)'
                        }}
                    >
                        <SlideNumber currentSlide={currentSlide} totalSlides={slides.length} />
                    </div>
                )}
                
                {/* Navigation indicators */}
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
            </div>
            
            {/* Content */}
            <div className="absolute inset-0 z-10 w-full h-full">
                <HeroContent {...heroContent} />
            </div>
            
            {/* Scroll indicator */}
            {mergedConfig.showScrollIndicator && (
                <ScrollIndicator
                    variant={mergedConfig.scrollIndicatorVariant}
                    color={mergedConfig.scrollIndicatorColor}
                    size={mergedConfig.scrollIndicatorSize as 'sm' | 'md' | 'lg'}
                />
            )}
        </div>
    );
};

export default HeroSection;
