import { FC } from 'react';
import { motion } from 'framer-motion';
import { HeroContentProps } from '../utils/types';
import CTAButtonComponent from '../controls/CTAButton';
import { createAnimationProps } from '../utils/animationUtils';
import { ANIMATION_TIMINGS } from '../utils/constants';

// Komponen untuk konten hero (teks dan tombol)
const HeroContent: FC<HeroContentProps> = ({ 
    title, 
    titleHighlight = '', 
    description, 
    ctaPrimary, 
    ctaSecondary, 
    animation = 'fadeIn',
    alignment = 'center' 
}) => {
    // Menghasilkan kelas penyelarasan teks berdasarkan prop alignment
    const alignmentClasses = {
        left: 'text-left justify-start',
        center: 'text-center justify-center mx-auto',
        right: 'text-right justify-end'
    };
    
    // Mendapatkan prop animasi untuk komponen saat ini menggunakan fungsi utilitas kita
    const animProps = createAnimationProps(animation, 0);
    
    return (
        <div className={`relative h-full w-full z-10 flex items-center ${alignmentClasses[alignment]}`}>
            <div className="container mx-auto px-4 md:px-6 lg:px-8 w-full">
                <motion.div 
                    className={`w-full max-w-xl md:max-w-2xl lg:max-w-3xl ${alignment === 'center' ? 'mx-auto' : ''} ${alignment === 'right' ? 'ml-auto' : ''}`}
                    {...animProps}
                >
                    <motion.div 
                        className="mb-3 inline-block bg-emerald-500/90 backdrop-blur-sm px-4 py-1 rounded-full"
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <span className="text-xs uppercase tracking-wider font-semibold text-white">Arsitekta Pro</span>
                    </motion.div>
                    
                    <motion.div
                        className="relative mb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Bentuk blob dekoratif di latar belakang */}
                        <motion.div
                            className="absolute -top-10 -left-10 w-32 h-32 sm:w-40 sm:h-40 bg-gradient-to-br from-emerald-400/30 to-emerald-600/20 rounded-full filter blur-3xl opacity-70 z-0"
                            animate={{ 
                                scale: [1, 1.1, 1.05, 1],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{ 
                                duration: 8, 
                                repeat: Infinity,
                                repeatType: 'mirror' 
                            }}
                        />

                        <motion.h1 
                            className="font-playfair text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight sm:leading-tight md:leading-tight lg:leading-tight text-white drop-shadow-xl relative z-10 mb-2 md:mb-3"
                            initial={{ opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' }}
                            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                            transition={{ delay: ANIMATION_TIMINGS.staggered.title, duration: ANIMATION_TIMINGS.durations.medium, ease: 'circOut' }}
                        >
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
                                            background: 'linear-gradient(90deg, #34d399 0%, #10b981 100%)',
                                            WebkitBackgroundClip: 'text',
                                            WebkitTextFillColor: 'transparent',
                                            backgroundSize: '200% 100%',
                                            animation: 'gradient-shift 4s ease infinite'
                                        }}
                                    >
                                        {titleHighlight}
                                    </span>
                                    {/* Garis bawah dekoratif dengan animasi */}
                                    <motion.span 
                                        className="absolute bottom-0 left-0 w-full h-1 md:h-1.5 bg-gradient-to-r from-emerald-300 to-emerald-500"
                                        initial={{ scaleX: 0, originX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ delay: ANIMATION_TIMINGS.staggered.highlight + 0.3, duration: 0.7, ease: 'circOut' }}
                                    />
                                </motion.span>
                            )}
                        </motion.h1>
                        
                        <motion.p 
                            className="text-base sm:text-lg md:text-xl text-white/90 mb-6 sm:mb-8 drop-shadow-lg mx-auto max-w-full sm:max-w-lg md:max-w-xl bg-black/10 backdrop-blur-[2px] rounded-lg py-3 px-2 sm:px-3"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: ANIMATION_TIMINGS.staggered.description, duration: ANIMATION_TIMINGS.durations.fast }}
                        >
                            <motion.span
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
                        className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: ANIMATION_TIMINGS.staggered.cta }}
                    >
                        <CTAButtonComponent button={ctaPrimary} index={0} />
                        {ctaSecondary && <CTAButtonComponent button={ctaSecondary} index={1} />}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

export default HeroContent;
