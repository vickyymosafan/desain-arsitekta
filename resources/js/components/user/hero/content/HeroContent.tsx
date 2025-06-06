import { FC } from 'react';
import { motion, useMotionValue, useTransform, useTime } from 'framer-motion';
import { HeroContentProps } from '../utils/types';
import CTAButtonComponent from '../controls/CTAButton';
import { createAnimationProps } from '../utils/animationUtils';
import { ANIMATION_TIMINGS } from '../utils/constants';

// Komponen untuk konten hero (teks dan tombol) dengan elemen arsitektur modern
const HeroContent: FC<HeroContentProps> = ({ 
    title, 
    titleHighlight = '', 
    description, 
    ctaPrimary, 
    ctaSecondary, 
    animation = 'fadeIn',
    alignment = 'center',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    currentSlide = 0 // intentionally not used
}) => {
    // Menghasilkan kelas penyelarasan teks berdasarkan prop alignment
    const alignmentClasses = {
        left: 'text-left justify-start',
        center: 'text-center justify-center mx-auto',
        right: 'text-right justify-end'
    };
    
    // Mendapatkan prop animasi untuk komponen saat ini menggunakan fungsi utilitas kita
    const animProps = createAnimationProps(animation, 0);
    
    // Architectural elements animation
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const time = useTime();
    // Removed unused transformations
    // const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });
    // const floatY = useTransform(time, [0, 2000, 4000], [0, -10, 0], { clamp: false });
    
    // Grid animation values
    const gridMotion = useMotionValue(0);
    const gridOpacity = useTransform(gridMotion, [0, 100], [0.15, 0.05]);
    
    return (
        <div className={`relative h-full w-full z-10 flex items-center ${alignmentClasses[alignment]}`}>
            {/* Architectural grid overlay for depth */}
            <motion.div 
                className="absolute inset-0 w-full h-full z-0 pointer-events-none"
                style={{
                    backgroundImage: `
                        linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '60px 60px',
                    opacity: gridOpacity
                }}
                animate={{ x: [0, 5, 0], y: [0, 5, 0] }}
                transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
            />
            
            {/* Architectural line elements */}
            {/* Top-right decorative border removed as requested */}
            
            {/* Bottom-left decorative border removed as requested */}
            
            <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full">
                <motion.div 
                    className={`w-full max-w-xl md:max-w-2xl lg:max-w-3xl ${alignment === 'center' ? 'mx-auto' : ''} ${alignment === 'right' ? 'ml-auto' : ''}`}
                    {...animProps}
                >
                    {/* Subtle architectural element removed for cleaner design */}
                    
                    <motion.div 
                        className="mb-3 inline-block bg-black/20 backdrop-blur-lg border border-emerald-500/30 px-5 py-1.5 rounded-sm overflow-hidden relative"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        {/* Animated gradient underline */}
                        <motion.div 
                            className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-emerald-300 via-emerald-500 to-emerald-300 w-full"
                            animate={{ x: ["-100%", "100%"] }}
                            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="text-xs uppercase tracking-widest font-semibold text-white letter-spacing-2">Antosa Architect</span>
                    </motion.div>
                    
                    <motion.div
                        className="relative mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Sophisticated decorative architectural elements */}
                        <motion.div
                            className="absolute -top-20 -left-10 w-40 h-40 sm:w-48 sm:h-48 bg-gradient-to-br from-slate-400/10 via-emerald-400/10 to-emerald-600/10 rounded-full filter blur-3xl opacity-60 z-0"
                            animate={{ 
                                scale: [1, 1.1, 1.05, 1],
                                rotate: [0, 3, -3, 0],
                            }}
                            transition={{ 
                                duration: 12, 
                                repeat: Infinity,
                                repeatType: 'mirror' 
                            }}
                        />
                        
                        {/* Additional layered blob for depth */}
                        <motion.div
                            className="absolute -top-10 left-20 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-tr from-emerald-400/5 via-emerald-300/10 to-white/5 rounded-full filter blur-2xl opacity-50 z-0"
                            animate={{ 
                                scale: [1, 1.15, 1, 1.15],
                                x: [0, 10, 0],
                                y: [0, -10, 0]
                            }}
                            transition={{ 
                                duration: 18, 
                                repeat: Infinity,
                                repeatType: 'mirror' 
                            }}
                        />

                        <motion.h1 
                            className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-tight sm:leading-tight md:leading-tight lg:leading-tight text-white drop-shadow-xl relative z-10 mb-3 md:mb-4 tracking-tight"
                            initial={{ opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' }}
                            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                            transition={{ delay: ANIMATION_TIMINGS.staggered.title, duration: ANIMATION_TIMINGS.durations.medium, ease: 'circOut' }}
                        >
                            {/* Subtle architectural line accent */}
                            <motion.span 
                                className="absolute -left-4 sm:-left-6 top-4 w-2 h-16 sm:h-20 bg-emerald-400/40 hidden md:block"
                                initial={{ opacity: 0, scaleY: 0 }}
                                animate={{ opacity: 1, scaleY: 1 }}
                                transition={{ delay: ANIMATION_TIMINGS.staggered.title + 0.2, duration: 0.8 }}
                            />
                            
                            {title}{' '}
                            {titleHighlight && (
                                <motion.span 
                                    className="relative inline-block"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: ANIMATION_TIMINGS.staggered.highlight, type: 'spring', stiffness: 100 }}
                                >
                                    <span 
                                        className="relative font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-emerald-400 to-green-500"
                                        style={{
                                            textShadow: '0 0 6px rgba(255, 255, 255, 0.69)'
                                        }}
                                    >
                                        {titleHighlight}
                                    </span>
                                    {/* Elegant underline decoration with refined animation */}
                                    <motion.span 
                                        className="absolute bottom-0 left-0 w-full h-1 md:h-1.5 bg-gradient-to-r from-emerald-300/80 via-emerald-500/90 to-green-600/80"
                                        initial={{ scaleX: 0, originX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ delay: ANIMATION_TIMINGS.staggered.highlight + 0.3, duration: 0.9, ease: 'circOut' }}
                                    />
                                </motion.span>
                            )}
                        </motion.h1>
                        
                        <motion.p 
                            className="text-base sm:text-lg md:text-xl text-white/95 mb-8 sm:mb-10 drop-shadow-lg mx-auto max-w-full sm:max-w-lg md:max-w-xl bg-black/15 backdrop-blur-xl rounded-xl py-5 px-6 border border-white/10 font-light leading-relaxed tracking-wide"
                            initial={{ opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' }}
                            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                            transition={{ 
                                delay: ANIMATION_TIMINGS.staggered.description, 
                                duration: ANIMATION_TIMINGS.durations.medium,
                                type: 'spring',
                                stiffness: 100,
                                damping: 20
                            }}
                        >
                            {/* Decorative line removed for cleaner design */}
                            
                            <motion.span
                                className="italic"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 1] }}
                                transition={{ 
                                    duration: ANIMATION_TIMINGS.durations.slow, 
                                    delay: ANIMATION_TIMINGS.staggered.description + 0.2,
                                    times: [0, 0.2, 1]
                                }}
                            >
                                {description}
                            </motion.span>
                        </motion.p>
                    </motion.div>
                    
                    <motion.div 
                        className="flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: ANIMATION_TIMINGS.staggered.cta }}
                    >
                        <CTAButtonComponent button={ctaPrimary} index={0} />
                        {ctaSecondary && <CTAButtonComponent button={ctaSecondary} index={1} />}
                    </motion.div>
                </motion.div>
                
                {/* Curved measuring lines removed as requested */}
            </div>
        </div>
    );
};

export default HeroContent;
