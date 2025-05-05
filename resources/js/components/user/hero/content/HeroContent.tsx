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
    currentSlide = 0
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
    const time = useTime();
    const rotate = useTransform(time, [0, 4000], [0, 360], { clamp: false });
    const floatY = useTransform(time, [0, 2000, 4000], [0, -10, 0], { clamp: false });
    
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
            <motion.div 
                className="absolute top-10 right-10 w-32 h-32 border-r-2 border-t-2 border-white/20 rounded-tr-lg hidden md:block"
                style={{ opacity: 0.6 }}
                animate={{ rotate: [0, 5, 0], scale: [1, 1.02, 1] }}
                transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            />
            
            <motion.div 
                className="absolute bottom-10 left-10 w-40 h-40 border-l-2 border-b-2 border-white/20 rounded-bl-lg hidden md:block"
                style={{ opacity: 0.6 }}
                animate={{ rotate: [0, -5, 0], scale: [1, 1.02, 1] }}
                transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
            />
            
            <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full">
                <motion.div 
                    className={`w-full max-w-xl md:max-w-2xl lg:max-w-3xl ${alignment === 'center' ? 'mx-auto' : ''} ${alignment === 'right' ? 'ml-auto' : ''}`}
                    {...animProps}
                >
                    {/* Subtle architectural element before label */}
                    <motion.div 
                        className="w-10 h-0.5 bg-white/40 hidden sm:inline-block absolute -ml-14 mt-3"
                        initial={{ opacity: 0, scaleX: 0, originX: 1 }}
                        animate={{ opacity: 1, scaleX: 1 }}
                        transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
                    />
                    
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
                        <span className="text-xs uppercase tracking-widest font-semibold text-white letter-spacing-2">Arsitekta Design Studio</span>
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
                            className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal leading-tight sm:leading-tight md:leading-tight lg:leading-tight text-white drop-shadow-xl relative z-10 mb-3 md:mb-4 tracking-tight"
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
                                    <span className="relative"
                                        style={{
                                            background: 'linear-gradient(90deg, #34d399 0%, #047857 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundSize: '200% 100%',
                                            animation: 'gradient-shift 5s ease infinite'
                                        }}
                                    >
                                        {titleHighlight}
                                    </span>
                                    {/* Elegant underline decoration with refined animation */}
                                    <motion.span 
                                        className="absolute bottom-0 left-0 w-full h-1 md:h-1.5 bg-gradient-to-r from-emerald-300/70 via-emerald-500/90 to-emerald-700/70"
                                        initial={{ scaleX: 0, originX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ delay: ANIMATION_TIMINGS.staggered.highlight + 0.3, duration: 0.9, ease: 'circOut' }}
                                    />
                                </motion.span>
                            )}
                        </motion.h1>
                        
                        <motion.p 
                            className="text-base sm:text-lg md:text-xl text-white/90 mb-8 sm:mb-10 drop-shadow-lg mx-auto max-w-full sm:max-w-lg md:max-w-xl bg-black/20 backdrop-blur-md rounded-md py-4 px-4 sm:px-5 border-l-2 border-emerald-500/30 font-light leading-relaxed tracking-wide"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: ANIMATION_TIMINGS.staggered.description, duration: ANIMATION_TIMINGS.durations.fast }}
                        >
                            <motion.span 
                                className="block w-12 h-0.5 bg-emerald-500/50 mb-3"
                                initial={{ opacity: 0, width: 0 }}
                                animate={{ opacity: 1, width: 48 }}
                                transition={{ delay: ANIMATION_TIMINGS.staggered.description + 0.3, duration: 0.8 }}
                            />
                            
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
                        {/* Subtle line connector for architectural feel */}
                        <motion.div 
                            className="absolute -left-20 top-1/2 w-16 h-px bg-white/30 hidden xl:block"
                            initial={{ scaleX: 0, opacity: 0 }}
                            animate={{ scaleX: 1, opacity: 0.7 }}
                            transition={{ delay: ANIMATION_TIMINGS.staggered.cta + 0.5, duration: 0.8 }}
                        />
                        
                        <CTAButtonComponent button={ctaPrimary} index={0} />
                        {ctaSecondary && <CTAButtonComponent button={ctaSecondary} index={1} />}
                    </motion.div>
                </motion.div>
                
                {/* Subtle architectural measuring lines */}
                <motion.div 
                    className="absolute bottom-10 right-10 hidden lg:block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.6 }}
                    transition={{ delay: 1.5, duration: 0.8 }}
                >
                    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1H119V119" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" strokeDasharray="4 4"/>
                        <path d="M1 40H80" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" strokeDasharray="4 4"/>
                        <path d="M40 119V40" stroke="rgba(255,255,255,0.3)" strokeWidth="0.5" strokeDasharray="4 4"/>
                        <circle cx="40" cy="40" r="2" fill="rgba(52,211,153,0.5)"/>
                    </svg>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroContent;
