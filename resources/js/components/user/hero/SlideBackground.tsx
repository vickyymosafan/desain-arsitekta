import { FC } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Slide } from './types';
import { getSlideAnimationStyle } from './animationUtils';

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

interface SlideDecorationsProps {
    accent?: string;
}

const SlideDecorations: FC<SlideDecorationsProps> = ({ accent = '#34d399' }) => (
    <>
        <motion.div 
            className="absolute opacity-20 mix-blend-screen hidden md:block" 
            style={{ 
                background: accent,
                left: 'calc(10% + clamp(0px, 2vw, 20px))',
                top: 'calc(20% + clamp(0px, 2vh, 20px))',
                width: 'clamp(64px, 8vw, 128px)',
                height: 'clamp(64px, 8vw, 128px)',
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
                background: accent,
                right: 'calc(15% + clamp(0px, 2vw, 20px))',
                bottom: 'calc(25% + clamp(0px, 2vh, 20px))',
                width: 'clamp(48px, 6vw, 96px)',
                height: 'clamp(48px, 6vw, 96px)',
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
    </>
);

interface SlideTagProps {
    tag: string;
    accent?: string;
}

const SlideTag: FC<SlideTagProps> = ({ tag, accent = '#34d399' }) => (
    <motion.div 
        className="absolute z-20 sm:top-6 sm:right-6 top-4 right-4"
        initial={{ opacity: 0, y: -20, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 120, damping: 15 }}
    >
        <div 
            className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10" 
            style={{ 
                boxShadow: `0 0 20px ${accent}40`,
                transform: 'translateZ(0)'
            }}
        >
            <span 
                className="w-2 h-2 rounded-full animate-pulse" 
                style={{ background: accent }}
                aria-hidden="true"
            />
            <span className="text-white text-xs font-medium tracking-wider">{tag}</span>
        </div>
    </motion.div>
);

interface SlideInfoProps {
    headline?: string;
    subtext?: string;
    accent?: string;
}

const SlideInfo: FC<SlideInfoProps> = ({ headline, subtext, accent = '#34d399' }) => (
    <motion.div 
        className="absolute bg-black/40 backdrop-blur-md rounded-xl py-3 px-5 max-w-xs hidden md:block border border-white/10"
        style={{ 
            boxShadow: `0 10px 30px -5px ${accent}20`,
            top: 'clamp(24px, 5vh, 40px)',
            left: 'clamp(24px, 5vw, 40px)',
            maxWidth: 'clamp(240px, 25vw, 320px)',
            transform: 'translateZ(0)'
        }}
        initial={{ opacity: 0, x: -30, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, type: 'spring', stiffness: 100, damping: 15 }}
    >
        {headline && 
            <motion.h3 
                className="text-white font-semibold text-xl mb-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <span 
                    className="pr-2 inline-block"
                    style={{ 
                        borderLeft: `3px solid ${accent}`, 
                        paddingLeft: '8px',
                        marginLeft: '-12px'
                    }}
                >
                    {headline}
                </span>
            </motion.h3>
        }
        {subtext && 
            <motion.p 
                className="text-white/80 text-sm leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
            >
                {subtext}
            </motion.p>
        }
    </motion.div>
);

export default SlideBackground;
