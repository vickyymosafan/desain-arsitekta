import { FC } from 'react';
import { motion } from 'framer-motion';
import { IndicatorVariantConfig, SlideIndicatorProps } from './types';

const SlideIndicators: FC<SlideIndicatorProps> = ({ 
    slides, 
    currentSlide, 
    goToSlide, 
    variant = 'dots', 
    size = 'md',
    position = 'bottom',
    customClass = ''
}) => {
    // Pemetaan kelas ukuran
    const sizeClasses = {
        sm: { dot: 'h-1.5 w-1.5', line: 'h-1.5 w-4', active: 'w-8', pill: 'h-6 px-2', emoji: 'text-xs' },
        md: { dot: 'h-2.5 w-2.5', line: 'h-2.5 w-6', active: 'w-12', pill: 'h-8 px-3', emoji: 'text-sm' },
        lg: { dot: 'h-3 w-3', line: 'h-3 w-8', active: 'w-16', pill: 'h-10 px-4', emoji: 'text-base' },
        xl: { dot: 'h-4 w-4', line: 'h-4 w-10', active: 'w-20', pill: 'h-12 px-5', emoji: 'text-lg' }
    };
    
    // Pemetaan kelas posisi
    const positionClasses = {
        bottom: 'bottom-16 left-1/2 -translate-x-1/2',
        top: 'top-24 left-1/2 -translate-x-1/2',
        left: 'left-8 top-1/2 -translate-y-1/2 flex-col space-y-3 space-x-0',
        right: 'right-8 top-1/2 -translate-y-1/2 flex-col space-y-3 space-x-0',
        custom: customClass
    };

    // Konfigurasi untuk setiap varian indikator
    const variantConfig: Record<string, IndicatorVariantConfig> = {
        dots: {
            containerClass: 'flex space-x-3',
            itemClass: (index: number) => `rounded-full backdrop-blur-sm transition-all duration-300 ${sizeClasses[size].dot} ${
                index === currentSlide 
                    ? 'bg-emerald-500 scale-125 shadow-lg shadow-emerald-500/20' 
                    : 'bg-white/60 hover:bg-white/90'
            }`,
            motionProps: {
                whileTap: { scale: 0.9, rotate: -5 },
                whileHover: { scale: 1.2, y: -2, boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.3)' },
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: (index: number) => ({ delay: index * 0.1, type: 'spring', stiffness: 400 })
            },
            style: {},
            content: () => null
        },
        lines: {
            containerClass: 'flex space-x-4',
            itemClass: (index: number) => `relative backdrop-blur-sm transition-all duration-300 ${sizeClasses[size].line} ${
                index === currentSlide 
                    ? `${sizeClasses[size].active} bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/20` 
                    : 'bg-white/60 hover:bg-white/90'
            }`,
            motionProps: {
                whileTap: { scale: 0.9 },
                whileHover: { y: -2, boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.3)' },
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: (index: number) => ({ delay: index * 0.1, type: 'spring', stiffness: 300 })
            },
            style: { borderRadius: '8px' },
            content: () => null
        },
        pills: {
            containerClass: 'flex space-x-2',
            itemClass: (index: number) => `rounded-full backdrop-blur-sm flex items-center justify-center ${sizeClasses[size].pill} ${
                index === currentSlide 
                    ? 'bg-gradient-to-r from-emerald-400 to-emerald-600 text-white font-medium shadow-lg shadow-emerald-500/30' 
                    : 'bg-white/20 text-white/80 hover:bg-white/30'
            }`,
            motionProps: {
                whileTap: { scale: 0.9 },
                whileHover: { scale: 1.05, y: -2 },
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: (index: number) => ({ delay: index * 0.1, type: 'spring' })
            },
            style: {},
            content: (index: number) => index + 1
        },
        emoji: {
            containerClass: 'flex space-x-3',
            itemClass: (index: number) => `rounded-full flex items-center justify-center backdrop-blur-sm ${sizeClasses[size].emoji} p-2 ${
                index === currentSlide 
                    ? 'bg-black/40 text-white scale-125' 
                    : 'bg-black/20 text-white/70 hover:bg-black/30 hover:text-white/90'
            }`,
            motionProps: {
                whileTap: { scale: 0.9, rotate: -5 },
                whileHover: { scale: 1.2, y: -3, rotate: 5 },
                initial: { opacity: 0, scale: 0, rotate: -10 },
                animate: { opacity: 1, scale: (index: number) => index === currentSlide ? 1.25 : 1, rotate: 0 },
                transition: (index: number) => ({ delay: index * 0.1, type: 'spring', damping: 10 })
            },
            style: {},
            content: (index: number) => ['✨', '🔥', '💎', '✌️', '🚀', '💯', '🌈', '⭐'][index % 8]
        },
        minimal: {
            containerClass: 'flex items-center space-x-4 bg-black/20 backdrop-blur-xl px-4 py-2 rounded-full',
            itemClass: (index: number) => `w-1 h-6 rounded-full transition-all duration-300 ${
                index === currentSlide 
                    ? 'bg-emerald-500 h-8' 
                    : 'bg-white/40 hover:bg-white/60'
            }`,
            motionProps: {
                whileTap: { scaleX: 1.5 },
                whileHover: { scaleX: 1.5 },
                initial: { opacity: 0, scaleY: 0 },
                animate: { opacity: 1, scaleY: 1 },
                transition: (index: number) => ({ delay: index * 0.05 })
            },
            style: {},
            content: () => null
        },
        numbers: {
            containerClass: 'flex space-x-2',
            itemClass: (index: number) => `h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                index === currentSlide 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-white/20 text-white/80 hover:bg-white/30'
            }`,
            motionProps: {
                whileTap: { scale: 0.9 },
                whileHover: { scale: 1.1 },
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: (index: number) => ({ delay: index * 0.1 })
            },
            style: {},
            content: (index: number) => index + 1
        }
    };

    // Mendapatkan konfigurasi varian saat ini, default ke angka
    const config = variantConfig[variant as keyof typeof variantConfig] || variantConfig.numbers;
    
    return (
        <div className={`absolute ${positionClasses[position]} ${config.containerClass} z-10`}>
            {slides.map((_, index) => (
                <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={config.itemClass(index)}
                    whileTap={config.motionProps.whileTap}
                    whileHover={config.motionProps.whileHover}
                    initial={config.motionProps.initial}
                    animate={
                        typeof config.motionProps.animate === 'function' 
                        ? config.motionProps.animate(index) 
                        : config.motionProps.animate
                    }
                    transition={config.motionProps.transition(index)}
                    style={config.style}
                    aria-label={`Pergi ke slide ${index + 1}`}
                >
                    {config.content(index)}
                </motion.button>
            ))}
        </div>
    );
};

export default SlideIndicators;
