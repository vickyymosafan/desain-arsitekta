import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { transitions, itemVariants, getAnimationWithDelay } from '../../../utils/animations';
import { useResponsive } from '../../../utils/hooks';
import { companyValues } from '../../../utils/data/companyValues';

interface ValuesCarouselProps {
    isVisible: boolean;
}

/**
 * ValuesCarousel Component
 * 
 * Displays company values in an interactive carousel format with auto-rotation
 * and touch/swipe navigation for mobile devices.
 */
const ValuesCarousel: React.FC<ValuesCarouselProps> = ({ isVisible }) => {
    const [activeValue, setActiveValue] = useState(0);
    const [isHovering, setIsHovering] = useState(false);
    const [touchStartX, setTouchStartX] = useState(0);
    const [touchEndX, setTouchEndX] = useState(0);
    const [swipeIndicator, setSwipeIndicator] = useState<'left' | 'right' | null>(null);
    
    const valuesRef = useRef<HTMLDivElement>(null);
    const { isMobile } = useResponsive();
    
    // Values data dari file terpisah - meningkatkan maintainability
    
    // isMobile diambil dari hook useResponsive
    
    // Auto-rotate through values
    useEffect(() => {
        // Auto-rotate through values (slower on mobile)
        const interval = setInterval(() => {
            if (!isHovering) {
                setActiveValue((prev) => (prev + 1) % companyValues.length);
            }
        }, isMobile ? 4000 : 3000);

        return () => {
            clearInterval(interval);
        };
    }, [isHovering, isMobile, companyValues.length]);
    
    // Handle touch events for swipe navigation between values
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
    };
    
    const handleTouchEnd = (e: React.TouchEvent) => {
        setTouchEndX(e.changedTouches[0].clientX);
        handleSwipe();
    };
    
    const handleSwipe = () => {
        const swipeThreshold = 50;
        if (touchStartX - touchEndX > swipeThreshold) {
            // Swiped left - next value
            setSwipeIndicator('left');
            setActiveValue((prev) => (prev + 1) % companyValues.length);
            setTimeout(() => setSwipeIndicator(null), 500);
        } else if (touchEndX - touchStartX > swipeThreshold) {
            // Swiped right - previous value
            setSwipeIndicator('right');
            setActiveValue((prev) => (prev === 0 ? companyValues.length - 1 : prev - 1));
            setTimeout(() => setSwipeIndicator(null), 500);
        }
    };

    return (
        <div 
            ref={valuesRef}
            className="relative p-6 md:p-8 bg-gradient-to-br from-white to-emerald-50 dark:from-gray-900 dark:to-gray-800 rounded-xl shadow-lg overflow-hidden"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
        >
            {/* Swipe indicator */}
            {swipeIndicator && (
                <div className={`absolute inset-0 bg-emerald-500 bg-opacity-10 z-10 flex items-center justify-${swipeIndicator === 'left' ? 'start' : 'end'} px-4`}>
                    <div className={`text-emerald-500 text-4xl animate-pulse`}>
                        {swipeIndicator === 'left' ? '→' : '←'}
                    </div>
                </div>
            )}
            
            <motion.h3 
                className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-6"
                variants={itemVariants}
            >
                Nilai-Nilai Kami
            </motion.h3>
            
            <div className="relative min-h-[180px]">
                {companyValues.map((value, index) => (
                    <motion.div
                        key={value.title}
                        className={`absolute inset-0 ${index === activeValue ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ 
                            opacity: index === activeValue ? 1 : 0,
                            y: index === activeValue ? 0 : 20 
                        }}
                        transition={transitions.spring}
                    >
                        <div className="flex items-start mb-4">
                            <div className="rounded-full bg-emerald-100 dark:bg-emerald-900 p-3 mr-4">
                                <svg className="w-6 h-6 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={value.icon} />
                                </svg>
                            </div>
                            <div>
                                <h4 className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white">{value.title}</h4>
                                <p className="text-gray-600 dark:text-gray-300 mt-1">{value.description}</p>
                            </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300 mt-4">
                            {value.detail}
                        </p>
                    </motion.div>
                ))}
            </div>
            
            {/* Dot indicators */}
            <div className="flex justify-center space-x-2 mt-6">
                {companyValues.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveValue(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${index === activeValue ? 'bg-emerald-500 w-6' : 'bg-gray-300 dark:bg-gray-600'}`}
                        aria-label={`Go to value ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default ValuesCarousel;
