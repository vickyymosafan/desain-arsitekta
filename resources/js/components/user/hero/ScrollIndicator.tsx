import { FC } from 'react';
import { motion } from 'framer-motion';
import { ScrollIndicatorProps } from './types';

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
            className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center justify-center"
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

export default ScrollIndicator;
