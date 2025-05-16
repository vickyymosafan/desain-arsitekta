import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

// Custom hook to detect when an element is visible in the viewport
const useElementVisibility = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const currentRef = ref.current;
        if (!currentRef) return;
        
        const observer = new IntersectionObserver((entries) => {
            const [entry] = entries;
            setIsVisible(entry.isIntersecting);
        }, { threshold: 0.3 });
        
        observer.observe(currentRef);
        
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);
    
    return { ref, isVisible };
};

interface AchievementCounterProps {
    value: number;
    label: string;
    symbol?: string;
    duration?: number;
    icon?: string;
}

const AchievementCounter: React.FC<AchievementCounterProps> = ({ 
    value, 
    label, 
    symbol = '', 
    duration = 2.5,
    icon = ''
}) => {
    const [count, setCount] = useState(0);
    const [hasAnimated, setHasAnimated] = useState(false);
    const countRef = useRef<NodeJS.Timeout | null>(null);
    const controls = useAnimation();
    const { ref, isVisible } = useElementVisibility();

    useEffect(() => {
        if (isVisible && !hasAnimated) {
            // Start visual animation
            controls.start({
                scale: [0.8, 1.1, 1],
                opacity: [0, 1],
                transition: { duration: 0.5, ease: 'easeOut' }
            });
            
            setHasAnimated(true); // Set flag to prevent re-animation
            const steps = 60; // Number of steps to reach the target
            const stepTime = (duration * 1000) / steps;
            const increment = value / steps;
            let currentCount = 0;
            
            // Clear any existing interval
            if (countRef.current) {
                clearInterval(countRef.current);
            }
            
            // Start counter animation
            countRef.current = setInterval(() => {
                currentCount += increment;
                if (currentCount >= value) {
                    setCount(value);
                    if (countRef.current) {
                        clearInterval(countRef.current);
                    }
                } else {
                    setCount(Math.floor(currentCount));
                }
            }, stepTime);
            
            // Cleanup function
            return () => {
                if (countRef.current) {
                    clearInterval(countRef.current);
                }
            };
        }
    }, [isVisible, value, duration]);

    // Map for achievement icons
    const icons: Record<string, React.ReactNode> = {
        'check-circle': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        'calendar': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        ),
        'smile': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        'award': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        )
    };

    return (
        <motion.div 
            ref={ref}
            className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-emerald-800/30 hover:border-emerald-500/50 transition-all duration-500 text-center group hover:shadow-emerald-900/30 hover:shadow-lg relative overflow-hidden"
            whileHover={{ y: -5 }}
            animate={controls}
            initial={{ opacity: 0, scale: 0.8 }}
        >
            {/* Background glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/0 to-emerald-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            {/* Icon */}
            {icon && (
                <motion.div 
                    className="mx-auto mb-3 flex justify-center items-center w-12 h-12 rounded-full bg-emerald-600/20 text-emerald-400 group-hover:text-emerald-300 group-hover:bg-emerald-600/30 transition-all duration-300"
                    whileHover={{ rotate: 10 }}
                    animate={{ rotate: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
                >
                    {icon in icons ? icons[icon] : null}
                </motion.div>
            )}
            
            {/* Counter Value */}
            <motion.h3 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300 mb-2 font-nunito"
                whileHover={{ scale: 1.05 }}
                transition={{ type: 'spring', stiffness: 300 }}
            >
                {count}{symbol}
            </motion.h3>
            
            {/* Label */}
            <p className="text-gray-300 font-medium relative z-10">{label}</p>
            
            {/* Interactive highlight */}
            <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500/0 group-hover:bg-emerald-500/50 transition-all duration-500"></div>
        </motion.div>
    );
};

export default AchievementCounter;
