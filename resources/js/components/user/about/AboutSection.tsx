import React, { useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import ValuesCarousel from './ValuesCarousel.js';
import AboutHeader from './AboutHeader.js';
import AboutContent from './AboutContent.js';
import { useIntersectionObserver, useResponsive } from '../../../utils/hooks';
import { animationVariants, containerVariants } from '../../../utils/animations';

/**
 * AboutSection Component
 * 
 * Main component that displays the about section with company values, 
 * mission statement, and background information.
 */
export default function AboutSection() {
    const [isVisible, setIsVisible] = useState(false);
    const sectionRef = useRef<HTMLElement | null>(null);
    const controls = useAnimation();
    const { isMobile } = useResponsive();
    
    // Use the custom intersection observer hook
    useIntersectionObserver(sectionRef, (isIntersecting: boolean) => {
        if (isIntersecting) {
            setIsVisible(true);
            controls.start("visible");
        } else {
            controls.start("hidden");
        }
    }, { threshold: isMobile ? 0.05 : 0.1 });

    return (
        <section 
            id="about" 
            ref={sectionRef}
            className="min-h-screen flex items-center relative overflow-hidden py-12 md:py-24"
        >
            <div className="container mx-auto px-4 py-10">
                {/* Header */}
                <AboutHeader isVisible={isVisible} />
                
                {/* Main content area */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mt-10"
                    variants={containerVariants}
                    initial="hidden"
                    animate={controls}
                >
                    {/* Left side - Company values */}
                    <ValuesCarousel isVisible={isVisible} />
                    
                    {/* Right side - About content */}
                    <AboutContent isVisible={isVisible} />
                </motion.div>
            </div>
        </section>
    );
}
