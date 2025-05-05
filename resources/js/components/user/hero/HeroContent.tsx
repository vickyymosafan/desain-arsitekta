import { FC } from 'react';
import { motion } from 'framer-motion';
import { HeroContentProps } from './types';
import CTAButtonComponent from './CTAButton';
import { createAnimationProps } from './animationUtils';

// Konstanta waktu animasi untuk konsistensi
const ANIMATION_TIMINGS = {
  staggered: {
    title: 0.3,
    highlight: 0.4,
    description: 0.6,
    cta: 0.8
  },
  durations: {
    fast: 0.5,
    medium: 0.7,
    slow: 1.5
  }
};

// Ikon media sosial dengan data yang lebih terstruktur
const SOCIAL_ICONS = [
    {
        href: "#",
        ariaLabel: "Facebook",
        delay: 0.7,
        svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" role="img" aria-label="Facebook"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
    },
    {
        href: "#",
        ariaLabel: "Instagram",
        delay: 0.8,
        svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" role="img" aria-label="Instagram"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
    },
    {
        href: "#",
        ariaLabel: "Twitter",
        delay: 0.9,
        svg: <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" role="img" aria-label="Twitter"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
    }
];

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
            {/* Teks samping vertikal */}
            <div className="absolute top-0 right-6 md:right-8 h-full flex items-center z-10 hidden lg:block">
                <div className="flex flex-col items-center">
                    {/* Lencana putar gaya 3D modern */}
                    <motion.div
                        initial={{ opacity: 0, y: 20, rotateX: 90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{ delay: 0.5, duration: 0.7, type: 'spring' }}
                        style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
                    >
                        <div className="transform -rotate-90 whitespace-nowrap">
                            <motion.p 
                                className="bg-gradient-to-r from-white to-emerald-300 bg-clip-text text-transparent font-medium uppercase tracking-[0.2em] text-sm"
                                animate={{ filter: ['drop-shadow(0 0 2px rgba(52, 211, 153, 0.7))', 'drop-shadow(0 0 5px rgba(52, 211, 153, 0.3))', 'drop-shadow(0 0 2px rgba(52, 211, 153, 0.7))'] }}
                                transition={{ duration: 4, repeat: Infinity }}
                            >
                                Est. 2025 • Premium Architecture
                            </motion.p>
                        </div>
                    </motion.div>
                    
                    {/* Garis beranimasi */}
                    <motion.div 
                        className="h-40 w-px my-6 relative overflow-hidden"
                        style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)' }}
                    >
                        <motion.div 
                            className="absolute top-0 left-0 w-full h-full bg-emerald-400/60"
                            animate={{ y: ['-100%', '100%'] }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                        />
                    </motion.div>
                    
                    {/* Ikon media sosial modern dengan efek hover */}
                    <div className="flex flex-col space-y-4">
                        {SOCIAL_ICONS.map((icon, index) => (
                            <motion.a 
                                key={`social-${index}`}
                                href={icon.href} 
                                className="relative bg-white/10 backdrop-blur-md p-3 rounded-full text-white/80 transition-colors hover:text-white"
                                whileHover={{ scale: 1.15, y: -2, boxShadow: '0 10px 25px -5px rgba(255, 255, 255, 0.3)' }}
                                whileTap={{ scale: 0.95 }}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: icon.delay, type: 'spring' }}
                                aria-label={icon.ariaLabel}
                            >
                                {icon.svg}
                            </motion.a>
                        ))}
                    </div>
                </div>
            </div>

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
