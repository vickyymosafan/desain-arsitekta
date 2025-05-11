// Import dari utilitas terpusat untuk konsistensi
import { AnimationVariant, AnimationVariantProps, EasingType, TransitionType } from '../../../../utils/shared-types';

// Utilitas animasi untuk mengurangi redundansi
export const transitions = {
    default: { duration: 0.6, ease: 'easeOut' as EasingType },
    slow: { duration: 1.2, ease: 'easeInOut' as EasingType },
    fast: { duration: 0.3, ease: 'easeOut' as EasingType },
    bounce: { type: 'spring' as TransitionType, stiffness: 300, damping: 10, mass: 0.5 },
    spring: { type: 'spring' as TransitionType, stiffness: 100, damping: 15, mass: 1 },
    elastic: { type: 'spring' as TransitionType, stiffness: 200, damping: 8, mass: 0.8 }
};

// Variasi animasi yang dapat digunakan kembali
export const animationVariants: Record<string, AnimationVariantProps> = {
    // Variasi fade
    fadeIn: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: transitions.default
    },
    fadeInSlow: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: transitions.slow
    },
    fadeInFast: {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: transitions.fast
    },
    
    // Variasi slide
    slideUp: {
        initial: { opacity: 0, y: 50 },
        animate: { opacity: 1, y: 0 },
        transition: transitions.default
    },
    slideUpBounce: {
        initial: { opacity: 0, y: 70 },
        animate: { opacity: 1, y: 0 },
        transition: transitions.bounce
    },
    slideDown: {
        initial: { opacity: 0, y: -50 },
        animate: { opacity: 1, y: 0 },
        transition: transitions.default
    },
    slideLeft: {
        initial: { opacity: 0, x: 50 },
        animate: { opacity: 1, x: 0 },
        transition: transitions.default
    },
    slideRight: {
        initial: { opacity: 0, x: -50 },
        animate: { opacity: 1, x: 0 },
        transition: transitions.default
    }
};

// Fungsi pembantu untuk mendapatkan variasi animasi dengan penundaan
export const getAnimationWithDelay = (type: AnimationVariant, delay: number = 0): AnimationVariantProps => {
    const variant = animationVariants[type] || animationVariants.fadeIn;
    return {
        ...variant,
        transition: {
            ...variant.transition,
            delay
        }
    };
};

// Buat prop animasi dengan opsi yang dapat dikonfigurasi
export const createAnimationProps = (type: AnimationVariant, delay: number = 0, once: boolean = false) => {
    const variant = getAnimationWithDelay(type, delay);
    
    return {
        initial: variant.initial,
        animate: variant.animate,
        transition: variant.transition,
        viewport: once ? { once: true } : undefined
    };
};

// Buat variasi animasi slide berdasarkan jenis dan status saat ini
export const getSlideAnimationStyle = (
    animationType: string, 
    isActive: boolean
) => {
    // Definisikan preset transisi untuk slide
    const slideTransitions = {
        default: { duration: 0.8, ease: 'easeOut' as EasingType },
        smooth: { duration: 1.2, ease: 'easeInOut' as EasingType },
        spring: { type: 'spring' as TransitionType, stiffness: 80, damping: 20 },
        bounce: { type: 'spring' as TransitionType, stiffness: 200, damping: 15, velocity: 1 }
    };

    // Definisikan preset animasi lanjutan untuk slide
    switch(animationType) {
        case 'fade':
            return {
                initial: { opacity: 0 },
                animate: { opacity: 1 },
                exit: { opacity: 0 },
                transition: slideTransitions.default
            };
            
        case 'slide':
            return {
                initial: { opacity: 0, x: isActive ? '100%' : '-100%' },
                animate: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: isActive ? '-100%' : '100%' },
                transition: slideTransitions.smooth
            };
            
        case 'zoom':
            return {
                initial: { opacity: 0, scale: 1.2, filter: 'blur(8px)' },
                animate: { opacity: 1, scale: 1, filter: 'blur(0px)' },
                exit: { opacity: 0, scale: 0.9, filter: 'blur(8px)' },
                transition: slideTransitions.default
            };
            
        case 'crossFade':
            return {
                initial: { opacity: 0, filter: 'blur(8px)' },
                animate: { opacity: 1, filter: 'blur(0px)' },
                exit: { opacity: 0, filter: 'blur(8px)' },
                transition: { ...slideTransitions.default, duration: 1.2 }
            };
            
        default: // 'none'
            return {
                initial: { opacity: 1 },
                animate: { opacity: 1 },
                exit: { opacity: 1 },
                transition: { duration: 0 }
            };
    }
};
