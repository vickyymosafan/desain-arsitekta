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

// Menerapkan gaya global saat komponen diimpor
applyGlobalStyles();

/**
 * Komponen Hero Section untuk menampilkan slider layar penuh dengan konten
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
        slideControls
    } = useSlider({
        slides,
        autoplay: mergedConfig.autoplay || false,
        autoplaySpeed: mergedConfig.autoplaySpeed || 5000,
        pauseOnHover: mergedConfig.pauseOnHover || true
    });
    
    // Memperbarui slide saat ini di konten hero
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
            {/* Slider latar belakang layar penuh */}
            <div 
                className="absolute inset-0 z-0 w-full" 
                style={getHeightStyle(
                    'screen', 
                    mergedConfig.navbarSpacing, 
                    mergedConfig.navbarHeight
                )}
                ref={sliderRef}
            >
                {/* Latar belakang slide */}
                <SlideBackground 
                    slides={slides} 
                    currentSlide={currentSlide} 
                    slidesAnimation={mergedConfig.slidesAnimation || 'fade'} 
                />
                
                {/* Indikator nomor slide */}
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
                
                {/* Indikator navigasi */}
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
            
            {/* Konten */}
            <div className="absolute inset-0 z-10 w-full h-full">
                <HeroContent {...heroContent} />
            </div>
            
            {/* Indikator scroll */}
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
