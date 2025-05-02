import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide } from './types';
import { getSlideAnimationStyle } from './animationUtils';
import SlideDecorations from './SlideDecorations';
import SlideTag from './SlideTag';
import SlideInfo from './SlideInfo';

interface SlideBackgroundProps {
    slides: Slide[];
    currentSlide: number;
    slidesAnimation: string;
}

const SlideBackground: FC<SlideBackgroundProps> = ({ 
    slides, 
    currentSlide, 
    slidesAnimation 
}) => {
    return (
        <AnimatePresence initial={false}>
            {slides.map((slide, index) => (
                index === currentSlide && (
                    <motion.div 
                        key={slide.id}
                        className="absolute inset-0"
                        {...getSlideAnimationStyle(slidesAnimation || 'fade', index > currentSlide)}
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
                        
                        {/* Grain overlay for texture */}
                        <div 
                            className="absolute inset-0 opacity-30 w-full h-full" 
                            style={{ 
                                backgroundImage: 'url("https://images.unsplash.com/photo-1595876210-50f6313738a4?q=80&w=300&auto=format&fit=crop&ixlib=rb-4.0.3")', 
                                backgroundRepeat: 'repeat',
                                backgroundSize: 'auto',
                                mixBlendMode: 'overlay',
                                willChange: 'opacity',
                                pointerEvents: 'none'
                            }}
                            aria-hidden="true"
                        />
                        
                        {/* Gradient overlay */}
                        <div className={`absolute inset-0 w-full h-full ${slide.overlay || 'bg-gradient-to-b from-black/60 via-black/40 to-black/60'}`} />
                        
                        {/* Decorative elements */}
                        <SlideDecorations accent={slide.accent} />
                        
                        {/* Tag - New, Trending, Featured, etc. */}
                        {slide.tag && <SlideTag tag={slide.tag} accent={slide.accent} />}
                        
                        {/* Enhanced slide info badge */}
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
