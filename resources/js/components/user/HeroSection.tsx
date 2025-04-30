import { Link } from '@inertiajs/react';
import { useState, useEffect, useRef, FC, useCallback } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';

// Types
type ButtonVariant = 'primary' | 'secondary' | 'outline';
// Animation types for more powerful and flexible animations
type AnimationVariant = 
    'fadeIn' | 'fadeInSlow' | 'fadeInFast' |
    'slideUp' | 'slideUpBounce' | 'slideUpSpring' |
    'slideDown' | 'slideDownBounce' | 'slideDownSpring' |
    'slideLeft' | 'slideLeftBounce' | 'slideLeftSpring' |
    'slideRight' | 'slideRightBounce' | 'slideRightSpring' |
    'zoom' | 'zoomBounce' | 'zoomSpring' |
    'flip' | 'flipX' | 'flipY' |
    'rotate' | 'pulse' | 'shake' | 'bounce' | 'stagger' | 'none' |
    'glitch' | 'blur' | 'wave' | 'float' | 'morph' | '3dFlip' | 'neon' |
    'textReveal' | 'textGradient' | 'textShadow' | 'prismaticText';

type TransitionType = 'tween' | 'spring' | 'inertia';
type EasingType = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'circIn' | 'circOut' | 'circInOut' | 'backIn' | 'backOut' | 'backInOut' | 'anticipate';

interface Slide {
    id: number;
    image: string;
    alt: string;
    headline?: string;
    subtext?: string;
    overlay?: string; // Custom overlay gradient
    position?: 'center' | 'top' | 'bottom' | 'left' | 'right'; // Image position
    video?: string; // Optional video background
    effect?: 'none' | 'parallax' | 'blur' | 'zoom' | 'glitch' | 'grain'; // Visual effects
    accent?: string; // Accent color for slide-specific highlights
    tag?: string; // Optional tag (like 'New', 'Featured', etc.)
}

interface SlideIndicatorProps {
    slides: Slide[];
    currentSlide: number;
    goToSlide: (index: number) => void;
    variant?: 'dots' | 'lines' | 'numbers' | 'pills' | 'emoji' | 'minimal';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    position?: 'bottom' | 'top' | 'left' | 'right' | 'custom';
    customClass?: string;
}

interface CTAButton {
    text: string;
    href: string;
    variant?: ButtonVariant;
    icon?: boolean;
    external?: boolean;
}

interface HeroContentProps {
    title: string;
    titleHighlight?: string;
    description: string;
    ctaPrimary: CTAButton;
    ctaSecondary?: CTAButton;
    currentSlide: number;
    animation?: AnimationVariant;
    alignment?: 'left' | 'center' | 'right';
}

// Component for slide indicators with multiple style variants
const SlideIndicators: FC<SlideIndicatorProps> = ({ 
    slides, 
    currentSlide, 
    goToSlide, 
    variant = 'dots', 
    size = 'md',
    position = 'bottom',
    customClass = ''
}) => {
    // Size classes mapping
    const sizeClasses = {
        sm: { dot: 'h-1.5 w-1.5', line: 'h-1.5 w-4', active: 'w-8', pill: 'h-6 px-2', emoji: 'text-xs' },
        md: { dot: 'h-2.5 w-2.5', line: 'h-2.5 w-6', active: 'w-12', pill: 'h-8 px-3', emoji: 'text-sm' },
        lg: { dot: 'h-3 w-3', line: 'h-3 w-8', active: 'w-16', pill: 'h-10 px-4', emoji: 'text-base' },
        xl: { dot: 'h-4 w-4', line: 'h-4 w-10', active: 'w-20', pill: 'h-12 px-5', emoji: 'text-lg' }
    };
    
    // Position classes mapping
    const positionClasses = {
        bottom: 'bottom-8 left-1/2 -translate-x-1/2',
        top: 'top-8 left-1/2 -translate-x-1/2',
        left: 'left-8 top-1/2 -translate-y-1/2 flex-col space-y-3 space-x-0',
        right: 'right-8 top-1/2 -translate-y-1/2 flex-col space-y-3 space-x-0',
        custom: customClass
    };

    // Render dots style indicators
    if (variant === 'dots') {
        return (
            <div className={`absolute ${positionClasses[position]} flex space-x-3 z-10`}>
                {slides.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`rounded-full backdrop-blur-sm transition-all duration-300 ${sizeClasses[size].dot} ${
                            index === currentSlide 
                                ? "bg-emerald-500 scale-125 shadow-lg shadow-emerald-500/20" 
                                : "bg-white/60 hover:bg-white/90"
                        }`}
                        whileTap={{ scale: 0.9, rotate: -5 }}
                        whileHover={{ scale: 1.2, y: -2, boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.3)' }}
                        aria-label={`Go to slide ${index + 1}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, type: 'spring', stiffness: 400 }}
                    />
                ))}
            </div>
        );
    }
    
    // Render lines style indicators
    if (variant === 'lines') {
        return (
            <div className={`absolute ${positionClasses[position]} flex space-x-4 z-10`}>
                {slides.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`relative backdrop-blur-sm transition-all duration-300 ${sizeClasses[size].line} ${
                            index === currentSlide 
                                ? `${sizeClasses[size].active} bg-gradient-to-r from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-500/20` 
                                : "bg-white/60 hover:bg-white/90"
                        }`}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ y: -2, boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.3)' }}
                        aria-label={`Go to slide ${index + 1}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, type: 'spring', stiffness: 300 }}
                        style={{ borderRadius: '8px' }}
                    />
                ))}
            </div>
        );
    }
    
    // Render pills style indicators (new trendy style)
    if (variant === 'pills') {
        return (
            <div className={`absolute ${positionClasses[position]} flex space-x-2 z-10`}>
                {slides.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`rounded-full backdrop-blur-sm flex items-center justify-center ${sizeClasses[size].pill} ${
                            index === currentSlide 
                                ? "bg-gradient-to-r from-emerald-400 to-emerald-600 text-white font-medium shadow-lg shadow-emerald-500/30" 
                                : "bg-white/20 text-white/80 hover:bg-white/30"
                        }`}
                        whileTap={{ scale: 0.9 }}
                        whileHover={{ scale: 1.05, y: -2 }}
                        aria-label={`Go to slide ${index + 1}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, type: 'spring' }}
                    >
                        {index + 1}
                    </motion.button>
                ))}
            </div>
        );
    }
    
    // Render emoji style indicators (fun Gen-Z style)
    if (variant === 'emoji') {
        const emojis = ['✨', '🔥', '💎', '✌️', '🚀', '💯', '🌈', '⭐'];
        return (
            <div className={`absolute ${positionClasses[position]} flex space-x-3 z-10`}>
                {slides.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`rounded-full flex items-center justify-center backdrop-blur-sm ${sizeClasses[size].emoji} p-2 ${
                            index === currentSlide 
                                ? "bg-black/40 text-white scale-125" 
                                : "bg-black/20 text-white/70 hover:bg-black/30 hover:text-white/90"
                        }`}
                        whileTap={{ scale: 0.9, rotate: -5 }}
                        whileHover={{ scale: 1.2, y: -3, rotate: 5 }}
                        aria-label={`Go to slide ${index + 1}`}
                        initial={{ opacity: 0, scale: 0, rotate: -10 }}
                        animate={{ opacity: 1, scale: index === currentSlide ? 1.25 : 1, rotate: 0 }}
                        transition={{ delay: index * 0.1, type: 'spring', damping: 10 }}
                    >
                        {emojis[index % emojis.length]}
                    </motion.button>
                ))}
            </div>
        );
    }
    
    // Render minimal style indicators (sleek modern style)
    if (variant === 'minimal') {
        return (
            <div className={`absolute ${positionClasses[position]} flex items-center space-x-4 z-10 bg-black/20 backdrop-blur-xl px-4 py-2 rounded-full`}>
                {slides.map((_, index) => (
                    <motion.button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`w-1 h-6 rounded-full transition-all duration-300 ${
                            index === currentSlide 
                                ? "bg-emerald-500 h-8" 
                                : "bg-white/40 hover:bg-white/60"
                        }`}
                        whileTap={{ scaleX: 1.5 }}
                        whileHover={{ scaleX: 1.5 }}
                        aria-label={`Go to slide ${index + 1}`}
                        initial={{ opacity: 0, scaleY: 0 }}
                        animate={{ opacity: 1, scaleY: 1 }}
                        transition={{ delay: index * 0.05 }}
                    />
                ))}
            </div>
        );
    }
    
    // Render numbers style indicators
    return (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 z-10">
            {slides.map((_, index) => (
                <motion.button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-8 w-8 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-300 ${
                        index === currentSlide 
                            ? "bg-emerald-500 text-white" 
                            : "bg-white/20 text-white/80 hover:bg-white/30"
                    }`}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{ scale: 1.1 }}
                    aria-label={`Go to slide ${index + 1}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                >
                    {index + 1}
                </motion.button>
            ))}
        </div>
    );
};

// Component for hero content (text and buttons)
const HeroContent: FC<HeroContentProps> = ({ 
    title, 
    titleHighlight = '', 
    description, 
    ctaPrimary, 
    ctaSecondary, 
    currentSlide,
    animation = 'fadeIn',
    alignment = 'left' 
}) => {
    // Generate text alignment classes based on alignment prop
    const alignmentClasses = {
        left: 'text-left justify-start',
        center: 'text-center justify-center',
        right: 'text-right justify-end'
    };
    
    // Enhanced animation system with advanced variants and transitions
    const getAnimationVariants = (type: AnimationVariant, customDelay: number = 0) => {
        // Base transition configurations
        const transitions = {
            default: { duration: 0.6, ease: 'easeOut' as EasingType },
            slow: { duration: 1.2, ease: 'easeInOut' as EasingType },
            fast: { duration: 0.3, ease: 'easeOut' as EasingType },
            bounce: { type: 'spring' as TransitionType, stiffness: 300, damping: 10, mass: 0.5 },
            spring: { type: 'spring' as TransitionType, stiffness: 100, damping: 15, mass: 1 },
            elastic: { type: 'spring' as TransitionType, stiffness: 200, damping: 8, mass: 0.8 },
            stagger: (i: number) => ({ delay: customDelay + (i * 0.1) })
        };
        
        // Animation variant presets
        const variants = {
            // Fade variants
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
            
            // Slide variants
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
            slideUpSpring: {
                initial: { opacity: 0, y: 50 },
                animate: { opacity: 1, y: 0 },
                transition: transitions.spring
            },
            slideDown: {
                initial: { opacity: 0, y: -50 },
                animate: { opacity: 1, y: 0 },
                transition: transitions.default
            },
            slideDownBounce: {
                initial: { opacity: 0, y: -70 },
                animate: { opacity: 1, y: 0 },
                transition: transitions.bounce
            },
            slideDownSpring: {
                initial: { opacity: 0, y: -50 },
                animate: { opacity: 1, y: 0 },
                transition: transitions.spring
            },
            slideLeft: {
                initial: { opacity: 0, x: 50 },
                animate: { opacity: 1, x: 0 },
                transition: transitions.default
            },
            slideLeftBounce: {
                initial: { opacity: 0, x: 70 },
                animate: { opacity: 1, x: 0 },
                transition: transitions.bounce
            },
            slideLeftSpring: {
                initial: { opacity: 0, x: 50 },
                animate: { opacity: 1, x: 0 },
                transition: transitions.spring
            },
            slideRight: {
                initial: { opacity: 0, x: -50 },
                animate: { opacity: 1, x: 0 },
                transition: transitions.default
            },
            slideRightBounce: {
                initial: { opacity: 0, x: -70 },
                animate: { opacity: 1, x: 0 },
                transition: transitions.bounce
            },
            slideRightSpring: {
                initial: { opacity: 0, x: -50 },
                animate: { opacity: 1, x: 0 },
                transition: transitions.spring
            },
            
            // Zoom and scale variants
            zoom: {
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                transition: transitions.default
            },
            zoomBounce: {
                initial: { opacity: 0, scale: 0.5 },
                animate: { opacity: 1, scale: 1 },
                transition: transitions.bounce
            },
            zoomSpring: {
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                transition: transitions.spring
            },
            
            // 3D transform variants
            flip: {
                initial: { opacity: 0, rotateY: 90 },
                animate: { opacity: 1, rotateY: 0 },
                transition: { ...transitions.default, duration: 0.8 }
            },
            flipX: {
                initial: { opacity: 0, rotateX: 90 },
                animate: { opacity: 1, rotateX: 0 },
                transition: { ...transitions.default, duration: 0.8 }
            },
            flipY: {
                initial: { opacity: 0, rotateY: 90 },
                animate: { opacity: 1, rotateY: 0 },
                transition: { ...transitions.default, duration: 0.8 }
            },
            
            // Special effects variants
            rotate: {
                initial: { opacity: 0, rotate: -15 },
                animate: { opacity: 1, rotate: 0 },
                transition: transitions.spring
            },
            pulse: {
                initial: { opacity: 0, scale: 0.8 },
                animate: { 
                    opacity: 1, 
                    scale: [0.8, 1.1, 0.9, 1.05, 1],
                },
                transition: { 
                    duration: 1, 
                    times: [0, 0.25, 0.5, 0.75, 1]
                }
            },
            shake: {
                initial: { opacity: 0, x: 0 },
                animate: { 
                    opacity: 1, 
                    x: [0, -10, 10, -5, 5, 0],
                },
                transition: { 
                    duration: 0.8, 
                    times: [0, 0.2, 0.4, 0.6, 0.8, 1]
                }
            },
            bounce: {
                initial: { opacity: 0, y: -20 },
                animate: { 
                    opacity: 1, 
                    y: [0, -30, -15, -30, -5, -10, 0],
                },
                transition: { 
                    duration: 1.5, 
                    times: [0, 0.2, 0.3, 0.45, 0.65, 0.85, 1]
                }
            },
            stagger: {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: transitions.stagger(0) // Will be applied per element with proper index
            },
            // Modern Gen-Z animations
            glitch: {
                initial: { opacity: 0, x: [-10, 10, -5, 5, 0], filter: 'blur(10px)' },
                animate: { 
                    opacity: 1, 
                    x: [5, -5, 2, -2, 0],
                    filter: 'blur(0px)',
                    textShadow: ['0 0 5px #0ff', '0 0 2px #f0f', '0 0 0px #000']
                },
                transition: { 
                    duration: 0.5,
                    times: [0, 0.2, 0.4, 0.6, 1]
                }
            },
            blur: {
                initial: { opacity: 0, filter: 'blur(20px)' },
                animate: { opacity: 1, filter: 'blur(0px)' },
                transition: { duration: 0.8, ease: 'easeOut' as EasingType }
            },
            wave: {
                initial: { y: 20, skewX: 0 },
                animate: { 
                    y: 0,
                    skewX: [-5, 5, -3, 3, 0]
                },
                transition: {
                    duration: 0.8,
                    times: [0, 0.3, 0.5, 0.7, 1]
                }
            },
            float: {
                initial: { y: 0 },
                animate: { y: [-8, 8, -4, 0] },
                transition: { 
                    repeat: Infinity, 
                    repeatType: 'mirror', 
                    duration: 5,
                    ease: 'easeInOut' as EasingType,
                    times: [0, 0.4, 0.7, 1]
                }
            },
            morph: {
                initial: { borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%', scale: 0.8, opacity: 0 },
                animate: { 
                    borderRadius: ['30% 70% 70% 30% / 30% 30% 70% 70%', '56% 44% 27% 73% / 24% 62% 38% 76%', '30% 70% 70% 30% / 30% 30% 70% 70%'],
                    scale: 1,
                    opacity: 1
                },
                transition: { duration: 1.5, repeat: 0 }
            },
            '3dFlip': {
                initial: { opacity: 0, rotateY: 90, perspective: '1000px' },
                animate: { opacity: 1, rotateY: 0, perspective: '1000px' },
                transition: transitions.elastic
            },
            neon: {
                initial: { opacity: 0, textShadow: '0 0 0px rgba(66, 220, 163, 0)' },
                animate: { 
                    opacity: 1, 
                    textShadow: [
                        '0 0 5px rgba(66, 220, 163, 0.8)', 
                        '0 0 10px rgba(66, 220, 163, 0.5)', 
                        '0 0 15px rgba(66, 220, 163, 0.3)',
                        '0 0 20px rgba(66, 220, 163, 0.7)'
                    ]
                },
                transition: { 
                    opacity: { duration: 0.3 },
                    textShadow: { 
                        duration: 3, 
                        repeat: Infinity, 
                        repeatType: 'reverse',
                        times: [0, 0.3, 0.6, 1]
                    }
                }
            },
            textReveal: {
                initial: { opacity: 0, y: 50, clipPath: 'inset(0 0 100% 0)' },
                animate: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' },
                transition: { duration: 0.8, ease: 'circOut' as EasingType }
            },
            textGradient: {
                initial: { backgroundPosition: '-100% 0', opacity: 0 },
                animate: { backgroundPosition: '0% 0', opacity: 1 },
                transition: { duration: 0.8 }
            },
            textShadow: {
                initial: { opacity: 0, textShadow: '0 0 0px rgba(16, 185, 129, 0)' },
                animate: { opacity: 1, textShadow: '0 10px 30px rgba(16, 185, 129, 0.5)' },
                transition: { duration: 0.6 }
            },
            prismaticText: {
                initial: { opacity: 0, backgroundPosition: '0% 50%' },
                animate: { opacity: 1, backgroundPosition: '100% 50%' },
                transition: { duration: 3, repeat: Infinity, repeatType: 'reverse' }
            },
            none: {
                initial: { opacity: 1 },
                animate: { opacity: 1 },
                transition: { duration: 0 }
            }
        };
        
        return variants[type] || variants.fadeIn;
    };
    
    // Create animation props with delay composition
    const createAnimationProps = (type: AnimationVariant, delay: number = 0, once: boolean = false) => {
        const variant = getAnimationVariants(type, delay);
        const transition = variant.transition as any; // Type cast to handle different transition types
        return {
            initial: variant.initial,
            animate: variant.animate,
            transition: {
                ...transition,
                delay: delay + (transition.delay || 0)
            },
            viewport: once ? { once: true } : undefined
        };
    };
    
    // Get animation props for current component
    const animProps = createAnimationProps(animation, 0);
    
    // Function to render button based on variant
    const renderButton = (button: CTAButton, index: number) => {
        const { text, href, variant = 'primary', icon = true, external = false } = button;
        
        // Button icon based on text content - auto-detect for better UX
        const getButtonIcon = () => {
            const lowerText = text.toLowerCase();
            if (lowerText.includes('kontak') || lowerText.includes('konsultasi')) {
                return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>;
            } else if (lowerText.includes('portfolio') || lowerText.includes('projek') || lowerText.includes('galeri')) {
                return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
            } else if (lowerText.includes('mulai') || lowerText.includes('order') || lowerText.includes('pesan')) {
                return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
            } else {
                return <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>;
            }
        };
        
        // Glassmorphism effect for buttons
        const getGlassmorphismEffect = () => {
            return variant === 'secondary' ? {
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.12)'
            } : {};
        };
        
        // Button style variants - modernized with more Gen-Z styling
        const buttonStyles = {
            primary: "rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3.5 font-medium text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-emerald-500/40 hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 group flex items-center justify-center gap-2",
            secondary: "rounded-xl border border-white/70 backdrop-blur-md bg-white/10 px-6 py-3.5 font-medium text-white transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 flex items-center justify-center gap-2",
            outline: "rounded-xl border-2 border-emerald-500 px-6 py-3.5 font-medium text-white transition-all duration-300 hover:bg-emerald-500/20 hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 flex items-center justify-center gap-2"
        };
        
        // Determine button component based on external flag
        const ButtonComponent = external ? 'a' : Link;
        const buttonProps = external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
        
        return (
            <motion.div 
                key={`btn-${index}`}
                whileHover={{ scale: 1.05, y: -5 }} 
                whileTap={{ scale: 0.95, rotate: -1 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + (index * 0.15), type: 'spring', stiffness: 400, damping: 10 }}
            >
                <ButtonComponent
                    {...buttonProps}
                    className={buttonStyles[variant]}
                >
                    {text}
                    {icon && (
                        <span className="relative ml-1 group-hover:translate-x-1 transition-transform">
                            {getButtonIcon()}
                        </span>
                    )}
                </ButtonComponent>
            </motion.div>
        );
    };
    
    return (
        <div className={`relative h-full w-full z-10 flex items-center ${alignmentClasses[alignment]}`}>
            {/* Vertical side text */}
            <div className="absolute top-0 right-8 h-full flex items-center z-10 hidden lg:block">
                <div className="flex flex-col items-center">
                    {/* Modern 3D-style rotating badge */}
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
                    
                    {/* Animated line */}
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
                    
                    {/* Modern social media icons with hover effects */}
                    <div className="flex flex-col space-y-4">
                        <motion.a 
                            href="#" 
                            className="relative bg-white/10 backdrop-blur-md p-3 rounded-full text-white/80 transition-colors hover:text-white"
                            whileHover={{ scale: 1.15, y: -2, boxShadow: '0 10px 25px -5px rgba(255, 255, 255, 0.3)' }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7, type: 'spring' }}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>
                        </motion.a>
                        <motion.a 
                            href="#" 
                            className="relative bg-white/10 backdrop-blur-md p-3 rounded-full text-white/80 transition-colors hover:text-white"
                            whileHover={{ scale: 1.15, y: -2, boxShadow: '0 10px 25px -5px rgba(255, 255, 255, 0.3)' }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.8, type: 'spring' }}
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>
                        </motion.a>
                        <motion.a 
                            href="#" 
                            className="relative bg-white/10 backdrop-blur-md p-3 rounded-full text-white/80 transition-colors hover:text-white"
                            whileHover={{ scale: 1.15, y: -2, boxShadow: '0 10px 25px -5px rgba(255, 255, 255, 0.3)' }}
                            whileTap={{ scale: 0.95 }}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.9, type: 'spring' }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>
                        </motion.a>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <motion.div 
                    className={`max-w-xl md:max-w-2xl ${alignment === 'center' ? 'mx-auto' : ''} ${alignment === 'right' ? 'ml-auto' : ''}`}
                    {...animProps}
                >
                    <motion.div 
                        className="mb-3 inline-block bg-emerald-500/90 backdrop-blur-sm px-4 py-1 rounded-full"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
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
                        {/* Decorative blob shape in background */}
                        <motion.div
                            className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-emerald-400/30 to-emerald-600/20 rounded-full filter blur-3xl opacity-70 z-0"
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
                            className="font-playfair text-4xl md:text-5xl lg:text-7xl font-bold leading-tight text-white drop-shadow-xl relative z-10 mb-2"
                            initial={{ opacity: 0, y: 30, clipPath: 'inset(0 0 100% 0)' }}
                            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                            transition={{ delay: 0.1, duration: 0.7, ease: 'circOut' }}
                        >
                            {title}{' '}
                            {titleHighlight && (
                                <motion.span 
                                    className="relative inline-block"
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, type: 'spring', stiffness: 100 }}
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
                                    {/* Decorative underline with animation */}
                                    <motion.span 
                                        className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-300 to-emerald-500"
                                        initial={{ scaleX: 0, originX: 0 }}
                                        animate={{ scaleX: 1 }}
                                        transition={{ delay: 0.7, duration: 0.7, ease: 'circOut' }}
                                    />
                                </motion.span>
                            )}
                        </motion.h1>
                        
                        <motion.p 
                            className="text-xl text-white/90 mb-8 drop-shadow-lg max-w-lg backdrop-blur-sm rounded-lg py-3 px-1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <motion.span
                                initial={{ opacity: 0 }}
                                animate={{ opacity: [0, 1, 1] }}
                                transition={{ 
                                    duration: 1.5, 
                                    delay: 0.8,
                                    times: [0, 0.2, 1]
                                }}
                            >
                                {description}
                            </motion.span>
                        </motion.p>
                    </motion.div>
                    
                    <motion.div 
                        className="flex flex-col sm:flex-row gap-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {renderButton(ctaPrimary, 0)}
                        {ctaSecondary && renderButton(ctaSecondary, 1)}
                    </motion.div>
                </motion.div>
            </div>
        </div>
    );
};

// Component for scroll indicator with enhanced animations
interface ScrollIndicatorProps {
    variant?: 'default' | 'pulse' | 'bounce' | 'fade';
    color?: string;
    size?: 'sm' | 'md' | 'lg';
}

const ScrollIndicator: FC<ScrollIndicatorProps> = ({ 
    variant = 'default', 
    color = 'white',
    size = 'md' 
}) => {
    // Size variants
    const sizeClasses = {
        sm: 'h-6 w-6 text-xs',
        md: 'h-8 w-8 text-sm',
        lg: 'h-10 w-10 text-base'
    };
    
    // Color variants
    const colorClasses = {
        white: 'text-white/80',
        emerald: 'text-emerald-400',
        primary: 'text-emerald-500'
    };
    
    // Animation variants
    const getIconAnimation = () => {
        switch(variant) {
            case 'pulse':
                return {
                    animate: { 
                        scale: [1, 1.2, 1],
                        opacity: [0.7, 1, 0.7]
                    },
                    transition: { 
                        repeat: Infinity, 
                        duration: 2,
                        ease: 'easeInOut'
                    }
                };
            case 'bounce':
                return {
                    animate: { 
                        y: [0, -8, 0],
                        scale: [1, 1.1, 1]
                    },
                    transition: { 
                        repeat: Infinity, 
                        duration: 1.2,
                        ease: 'easeOut'
                    }
                };
            case 'fade':
                return {
                    animate: { 
                        opacity: [0.4, 1, 0.4],
                        filter: ['blur(0px)', 'blur(1px)', 'blur(0px)']
                    },
                    transition: { 
                        repeat: Infinity, 
                        duration: 2.5
                    }
                };
            default: // Default scrolling animation
                return {
                    animate: { y: [0, 8, 0] },
                    transition: { repeat: Infinity, duration: 1.5 }
                };
        }
    };
    
    // Get color class based on color prop
    const textColor = colorClasses[color as keyof typeof colorClasses] || 'text-white/80';
    const iconAnimation = getIconAnimation();
    
    return (
        <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
        >
            <motion.div 
                className={`text-white/70 text-xs uppercase tracking-widest font-light mb-2`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
            >
                Scroll
            </motion.div>
            <motion.div 
                {...iconAnimation}
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className={`${sizeClasses[size]} ${textColor}`} 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={1.5} 
                        d="M19 14l-7 7m0 0l-7-7m7 7V3" 
                    />
                </svg>
            </motion.div>
        </motion.div>
    );
};

// Define hero section configuration types
interface HeroConfig {
    height?: 'full' | 'screen' | 'auto' | string;
    autoplay?: boolean;
    autoplaySpeed?: number;
    pauseOnHover?: boolean;
    showIndicators?: boolean;
    showNumber?: boolean;
    showScrollIndicator?: boolean;
    slidesAnimation?: 
        'fade' | 'slide' | 'zoom' | 'none' | 
        'flip' | 'rotate' | 'slideUp' | 'slideDown' | 
        'crossFade' | 'elastic';
    indicatorType?: 'dots' | 'lines' | 'numbers';
    indicatorSize?: 'sm' | 'md' | 'lg';
    contentAlignment?: 'left' | 'center' | 'right';
    contentAnimation?: AnimationVariant;
    overlayStyle?: string;
    scrollIndicatorVariant?: 'default' | 'pulse' | 'bounce' | 'fade';
    scrollIndicatorColor?: string;
    scrollIndicatorSize?: 'sm' | 'md' | 'lg';
    navbarSpacing?: boolean; // Option to control spacing below navbar
}

// Main Hero Section component with enhanced options
interface HeroSectionProps {
    config?: HeroConfig;
}

const HeroSection: FC<HeroSectionProps> = ({ config }) => {
    // Default configuration with enhanced animation options
    const defaultConfig: HeroConfig = {
        height: 'screen',
        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        showIndicators: true,
        showNumber: true,
        showScrollIndicator: true,
        slidesAnimation: 'fade',
        indicatorType: 'lines',
        indicatorSize: 'md',
        contentAlignment: 'left',
        contentAnimation: 'slideUpSpring',
        overlayStyle: 'bg-gradient-to-b from-black/60 via-black/40 to-black/60',
        scrollIndicatorVariant: 'default',
        scrollIndicatorColor: 'emerald',
        scrollIndicatorSize: 'md',
        navbarSpacing: true // New option to control navbar spacing
    };
    
    // Merge default config with provided config
    const mergedConfig = { ...defaultConfig, ...config };
    
    // Data for slides with enhanced properties
    const slides: Slide[] = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            alt: "Modern House Design",
            headline: "Desain Modern",
            subtext: "Arsitektur yang mengikuti tren terkini",
            position: 'center',
            effect: 'parallax',
            accent: '#34d399',
            tag: 'Trending'
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
            alt: "Contemporary Home",
            headline: "Inovasi Terdepan",
            subtext: "Solusi rumah impian yang futuristik",
            position: 'center',
            effect: 'zoom',
            accent: '#3b82f6',
            tag: 'Popular'
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            alt: "Luxury Residence",
            headline: "Kemewahan Exclusive",
            subtext: "Pengalaman hunian premium berkualitas",
            position: 'center',
            overlay: 'bg-gradient-to-t from-black/70 via-black/50 to-black/70',
            effect: 'blur',
            accent: '#ef4444',
            tag: 'Featured'
        }
    ];

    // State for current slide
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);

    // Hero content data
    const heroContent = {
        title: "Wujudkan Rumah",
        titleHighlight: "Impian Anda",
        description: "Kami memberikan solusi terbaik untuk kebutuhan desain dan konstruksi bangunan Anda dengan pendekatan modern dan berkelanjutan.",
        ctaPrimary: { 
            text: "Konsultasi Sekarang", 
            href: "/contact", 
            variant: 'primary' as ButtonVariant, 
            icon: true
        },
        ctaSecondary: { 
            text: "Lihat Portofolio", 
            href: "/portfolio", 
            variant: 'secondary' as ButtonVariant
        },
        animation: mergedConfig.contentAnimation,
        alignment: mergedConfig.contentAlignment
    };

    // Auto-advance slides
    useEffect(() => {
        if (!mergedConfig.autoplay || isPaused) return;
        
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, mergedConfig.autoplaySpeed);

        return () => clearInterval(interval);
    }, [mergedConfig.autoplay, mergedConfig.autoplaySpeed, slides.length, isPaused]);

    // Reference for the slider container
    const sliderRef = useRef<HTMLDivElement>(null);
    
    // Slide navigation handlers
    const goToSlide = (index: number): void => {
        setCurrentSlide(index);
    };

    const goToPrevSlide = (): void => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    const goToNextSlide = (): void => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };
    
    // Pause autoplay on hover if configured
    const handleMouseEnter = () => {
        if (mergedConfig.pauseOnHover) {
            setIsPaused(true);
        }
    };
    
    const handleMouseLeave = () => {
        if (mergedConfig.pauseOnHover) {
            setIsPaused(false);
        }
    };
    
    // Touch swipe handling
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    
    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50;
    
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX);
    };
    
    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };
    
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        
        if (isLeftSwipe) {
            goToNextSlide();
        } else if (isRightSwipe) {
            goToPrevSlide();
        }
    };
    
    // Enhanced slide animations with advanced transitions
    const getSlideAnimationStyle = (isActive: boolean) => {
        // Define transition presets for slides
        const slideTransitions = {
            default: { duration: 0.8, ease: 'easeOut' as EasingType },
            smooth: { duration: 1.2, ease: 'easeInOut' as EasingType },
            spring: { type: 'spring' as TransitionType, stiffness: 80, damping: 20 },
            bounce: { type: 'spring' as TransitionType, stiffness: 200, damping: 15, velocity: 1 }
        };

        // Define advanced animation presets for slides
        switch(mergedConfig.slidesAnimation) {
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
                
            // Add more advanced animation options
            case 'flip':
                return {
                    initial: { opacity: 0, rotateY: isActive ? 90 : -90 },
                    animate: { opacity: 1, rotateY: 0 },
                    exit: { opacity: 0, rotateY: isActive ? -90 : 90 },
                    transition: { ...slideTransitions.default, duration: 1 }
                };
                
            case 'rotate':
                return {
                    initial: { opacity: 0, rotate: isActive ? 5 : -5, scale: 0.9 },
                    animate: { opacity: 1, rotate: 0, scale: 1 },
                    exit: { opacity: 0, rotate: isActive ? -5 : 5, scale: 0.9 },
                    transition: slideTransitions.spring
                };
                
            case 'slideUp':
                return {
                    initial: { opacity: 0, y: 50 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: -50 },
                    transition: slideTransitions.spring
                };
                
            case 'slideDown':
                return {
                    initial: { opacity: 0, y: -50 },
                    animate: { opacity: 1, y: 0 },
                    exit: { opacity: 0, y: 50 },
                    transition: slideTransitions.spring
                };
                
            case 'crossFade':
                return {
                    initial: { opacity: 0, filter: 'blur(8px)' },
                    animate: { opacity: 1, filter: 'blur(0px)' },
                    exit: { opacity: 0, filter: 'blur(8px)' },
                    transition: { ...slideTransitions.default, duration: 1.2 }
                };
                
            case 'elastic':
                return {
                    initial: { opacity: 0, x: isActive ? 100 : -100, scale: 0.8 },
                    animate: { opacity: 1, x: 0, scale: 1 },
                    exit: { opacity: 0, x: isActive ? -100 : 100, scale: 0.8 },
                    transition: slideTransitions.bounce
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
    

    // Navbar height constant - adjust if your navbar has a different height
    const NAVBAR_HEIGHT_PX = 80; // 5rem/80px
    
    // Calculate height style with navbar adjustment
    const getHeightStyle = () => {
        if (mergedConfig.height === 'screen' && mergedConfig.navbarSpacing) {
            // For screen height, return the full viewport height minus navbar
            return {
                height: `calc(100vh - ${NAVBAR_HEIGHT_PX}px)`
            };
        } else if (mergedConfig.height === 'full') {
            return { height: '100%' };
        } else if (mergedConfig.height === 'auto') {
            return { height: 'auto' };
        } else {
            // For custom heights or default
            return { height: mergedConfig.height || `calc(100vh - ${NAVBAR_HEIGHT_PX}px)` };
        }
    };

    return (
        <section 
            className="relative w-full overflow-hidden"
            ref={sliderRef}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                ...getHeightStyle(),
                marginTop: mergedConfig.navbarSpacing ? `${NAVBAR_HEIGHT_PX}px` : '0'
            }}
        >
            {/* Full-screen background slider */}
            <div className="absolute inset-0 z-0 top-0">
                <AnimatePresence initial={false}>
                    {slides.map((slide, index) => (
                        index === currentSlide && (
                            <motion.div 
                                key={slide.id}
                                className="absolute inset-0"
                                {...getSlideAnimationStyle(index > currentSlide)}
                            >
                                {/* Slide image with effect based on slide.effect property */}
                                <motion.div className="h-full w-full" style={{ overflow: 'hidden' }}>
                                    <motion.img 
                                        src={slide.image} 
                                        alt={slide.alt} 
                                        className={`h-full w-full object-cover ${
                                            slide.position === 'top' ? 'object-top' : 
                                            slide.position === 'bottom' ? 'object-bottom' : 
                                            slide.position === 'left' ? 'object-left' : 
                                            slide.position === 'right' ? 'object-right' : 'object-center'
                                        }`}
                                        loading={index === 0 ? "eager" : "lazy"}
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
                                    />
                                </motion.div>
                                
                                {/* Grain overlay for texture */}
                                <div 
                                    className="absolute inset-0 opacity-30" 
                                    style={{ 
                                        backgroundImage: 'url("/noise.png")', 
                                        backgroundRepeat: 'repeat',
                                        mixBlendMode: 'overlay' 
                                    }}
                                ></div>
                                
                                {/* Gradient overlay - customizable per slide */}
                                <div className={`absolute inset-0 ${slide.overlay || mergedConfig.overlayStyle}`}></div>
                                
                                {/* Decorative elements - based on slide accent color */}
                                <motion.div 
                                    className="absolute left-[10%] top-[20%] w-32 h-32 rounded-full opacity-20 mix-blend-screen" 
                                    style={{ background: slide.accent || '#34d399' }}
                                    animate={{ 
                                        y: [-10, 10, -5, 0],
                                        scale: [1, 1.1, 0.9, 1],
                                        rotate: [0, 5, -5, 0],
                                        opacity: [0.2, 0.3, 0.2]
                                    }}
                                    transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror' }}
                                />
                                
                                <motion.div 
                                    className="absolute right-[15%] bottom-[25%] w-24 h-24 rounded-full opacity-20 mix-blend-screen" 
                                    style={{ background: slide.accent || '#34d399' }}
                                    animate={{ 
                                        y: [10, -10, 5, 0],
                                        scale: [0.9, 1.1, 1, 0.9],
                                        rotate: [0, -5, 5, 0],
                                        opacity: [0.2, 0.3, 0.2]
                                    }}
                                    transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror', delay: 1 }}
                                />
                                
                                {/* Tag - New, Trending, Featured, etc. */}
                                {slide.tag && (
                                    <motion.div 
                                        className="absolute top-6 right-6 z-20"
                                        initial={{ opacity: 0, y: -20, rotate: -5 }}
                                        animate={{ opacity: 1, y: 0, rotate: 0 }}
                                        transition={{ delay: 0.7, type: 'spring' }}
                                    >
                                        <div 
                                            className="flex items-center gap-1 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full" 
                                            style={{ boxShadow: `0 0 20px ${slide.accent || '#34d399'}40` }}
                                        >
                                            <span 
                                                className="w-2 h-2 rounded-full animate-pulse" 
                                                style={{ background: slide.accent || '#34d399' }}
                                            />
                                            <span className="text-white text-xs font-medium tracking-wider">{slide.tag}</span>
                                        </div>
                                    </motion.div>
                                )}
                                
                                {/* Enhanced slide info badge */}
                                {(slide.headline || slide.subtext) && (
                                    <motion.div 
                                        className="absolute top-8 left-8 bg-black/30 backdrop-blur-md rounded-xl py-3 px-5 max-w-xs hidden md:block border border-white/10"
                                        style={{ boxShadow: `0 10px 30px -5px ${slide.accent || '#34d399'}20` }}
                                        initial={{ opacity: 0, x: -30, y: 20 }}
                                        animate={{ opacity: 1, x: 0, y: 0 }}
                                        transition={{ delay: 0.4, duration: 0.7, type: 'spring' }}
                                    >
                                        {slide.headline && 
                                            <motion.h3 
                                                className="text-white font-semibold text-xl mb-1"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.6 }}
                                            >
                                                <span 
                                                    className="pr-2"
                                                    style={{ 
                                                        borderLeft: `3px solid ${slide.accent || '#34d399'}`, 
                                                        paddingLeft: '8px',
                                                        marginLeft: '-12px'
                                                    }}
                                                >
                                                    {slide.headline}
                                                </span>
                                            </motion.h3>
                                        }
                                        {slide.subtext && 
                                            <motion.p 
                                                className="text-white/80 text-sm"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.7 }}
                                            >
                                                {slide.subtext}
                                            </motion.p>
                                        }
                                    </motion.div>
                                )}
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>
                
                {/* Slide number indicator - optional based on config */}
                {mergedConfig.showNumber && (
                    <div className="absolute bottom-8 right-8 z-10 hidden md:block">
                        <div className="text-white font-light text-3xl tracking-tighter">
                            <span className="text-emerald-400 font-medium">{(currentSlide + 1).toString().padStart(2, '0')}</span>
                            <span className="text-white/40 mx-2">/</span>
                            <span className="text-white/70">{slides.length.toString().padStart(2, '0')}</span>
                        </div>
                    </div>
                )}
                
                {/* Navigation controls - optional based on config */}
                {mergedConfig.showIndicators && (
                    <SlideIndicators 
                        slides={slides} 
                        currentSlide={currentSlide} 
                        goToSlide={goToSlide}
                        variant={mergedConfig.indicatorType}
                        size={mergedConfig.indicatorSize}
                    />
                )}
            </div>
            
            {/* Content */}
            <HeroContent {...heroContent} currentSlide={currentSlide} />
            
            {/* Scroll indicator - optional based on config */}
            {mergedConfig.showScrollIndicator && (
                <ScrollIndicator
                    variant={mergedConfig.scrollIndicatorVariant}
                    color={mergedConfig.scrollIndicatorColor}
                    size={mergedConfig.scrollIndicatorSize}
                />
            )}
        </section>
    );
};

export default HeroSection;
