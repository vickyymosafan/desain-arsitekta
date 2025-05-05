import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide } from '../utils/types';
import { getSlideAnimationStyle } from '../utils/animationUtils';
import SlideDecorations from './SlideDecorations';
import SlideTag from './SlideTag';
import SlideInfo from './SlideInfo';
import LazyImage from '@/components/ui/lazy-image';

interface SlideBackgroundProps {
    slides: Slide[];
    currentSlide: number;
    slidesAnimation: string;
}

// Type untuk efek yang didukung
type SlideEffectType = 'parallax' | 'zoom' | 'blur' | 'glitch' | 'grain' | 'none';

// Preset animasi untuk berbagai efek
const SLIDE_EFFECTS: Record<SlideEffectType, {
    animate: Record<string, string | number | number[] | string[]>;
    transition: Record<string, string | number | boolean>;
}> = {
    parallax: { 
        animate: { scale: 1.1, y: [0, -15, 0], x: [0, 10, 0] }, 
        transition: { duration: 8, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }
    },
    zoom: { 
        animate: { scale: [1, 1.05, 1.02] }, 
        transition: { duration: 8, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }
    },
    blur: { 
        animate: { filter: ['blur(0px)', 'blur(2px)', 'blur(0px)'] }, 
        transition: { duration: 8, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }
    },
    glitch: {
        animate: { x: [0, -2, 2, -1, 1, 0], y: [0, 1, -1, 0] },
        transition: { duration: 5, ease: 'easeInOut', repeat: Infinity, repeatType: 'reverse' }
    },
    grain: {
        animate: { opacity: [0.8, 0.9, 0.8], backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'] },
        transition: { duration: 8, ease: 'linear', repeat: Infinity }
    },
    none: { 
        animate: { scale: 1 }, 
        transition: { duration: 0 }
    }
};

const SlideBackground: FC<SlideBackgroundProps> = ({ 
    slides, 
    currentSlide, 
    slidesAnimation 
}) => {
    const getSlideEffect = (effect?: string) => {
        // Validasi apakah efek ada di SLIDE_EFFECTS, jika tidak gunakan 'none'
        const validEffect = (effect && effect in SLIDE_EFFECTS) 
            ? effect as SlideEffectType 
            : 'none';
            
        return SLIDE_EFFECTS[validEffect];
    };
    
    return (
        <AnimatePresence initial={false}>
            {slides.map((slide, index) => (
                index === currentSlide && (
                    <motion.div 
                        key={slide.id}
                        className="absolute inset-0"
                        {...getSlideAnimationStyle(slidesAnimation || 'fade', index > currentSlide)}
                    >
                        {/* Gambar slide dengan efek berdasarkan properti slide.effect */}
                        <motion.div className="h-full w-full" style={{ overflow: 'hidden', position: 'relative' }}>
                            <motion.div 
                                className={`absolute inset-0 h-full w-full ${
                                    slide.position === 'top' ? 'object-top' : 
                                    slide.position === 'bottom' ? 'object-bottom' : 
                                    slide.position === 'left' ? 'object-left' : 
                                    slide.position === 'right' ? 'object-right' : 'object-center'
                                }`}
                                animate={getSlideEffect(slide.effect).animate}
                                transition={getSlideEffect(slide.effect).transition}
                                style={{
                                    willChange: 'transform',
                                    transform: 'translateZ(0)' // Akselerasi hardware
                                }}
                            >
                                <LazyImage 
                                    src={slide.image} 
                                    alt={slide.alt}
                                    className="h-full w-full object-cover"
                                    threshold={0.1}
                                    placeholderColor="bg-emerald-200/20"
                                    blurEffect={true}
                                    fetchPriority={index === 0 ? "high" : "auto"}
                                    decoding="async"
                                />
                            </motion.div>
                        </motion.div>
                        
                        {/* Overlay gradien */}
                        <div className={`absolute inset-0 w-full h-full ${slide.overlay || 'bg-gradient-to-b from-black/60 via-black/40 to-black/60'}`} />
                        
                        {/* Elemen dekoratif */}
                        <SlideDecorations accent={slide.accent} />
                        
                        {/* Tag - Baru, Trending, Unggulan, dll. */}
                        {slide.tag && <SlideTag tag={slide.tag} accent={slide.accent} />}
                        
                        {/* Lencana info slide yang ditingkatkan */}
                        {(slide.headline || slide.subtext) && (
                            <SlideInfo headline={slide.headline} subtext={slide.subtext} accent={slide.accent} />
                        )}
                    </motion.div>
                )
            ))}
        </AnimatePresence>
    );
};

export default SlideBackground;
