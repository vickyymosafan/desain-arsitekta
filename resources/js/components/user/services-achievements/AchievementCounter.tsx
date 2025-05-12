import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

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
}

const AchievementCounter: React.FC<AchievementCounterProps> = ({ 
    value, 
    label, 
    symbol = '', 
    duration = 2.5 
}) => {
    const [count, setCount] = useState(0);
    const countRef = useRef<NodeJS.Timeout | null>(null);
    const { ref, isVisible } = useElementVisibility();

    useEffect(() => {
        if (isVisible) {
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

    return (
        <motion.div 
            ref={ref}
            className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-emerald-800/30 hover:border-emerald-500/50 transition-all duration-500 text-center group hover:shadow-emerald-900/30 hover:shadow-lg"
            whileHover={{ y: -5 }}
        >
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-emerald-400 group-hover:text-emerald-300 transition-colors duration-300 mb-2 font-nunito">
                {count}{symbol}
            </h3>
            <p className="text-gray-300 font-medium">{label}</p>
        </motion.div>
    );
};

export default AchievementCounter;
