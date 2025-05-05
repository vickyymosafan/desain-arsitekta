import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StatItem from './StatItem';
import ServiceCard from './ServiceCard';
import FullscreenButton from './FullscreenButton';
import { statsData, servicesData } from '../data/featuresData';

// Animated background component with improved performance
const AnimatedBackground: React.FC<{scrollY: number, density?: number}> = ({ scrollY, density = 10 }) => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(density)].map((_, i) => (
            <div 
                key={i}
                className="absolute bg-emerald-500/10 rounded-full blur-xl"
                style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    width: `${40 + Math.random() * 60}px`,
                    height: `${40 + Math.random() * 60}px`,
                    opacity: 0.1 + Math.random() * 0.15,
                    transform: `translateY(${scrollY * 0.03}px)`
                }}
            />
        ))}
    </div>
);

// Enhanced Section title component with better animation
const SectionTitle: React.FC<{title: string, subtitle: string, className?: string}> = ({ title, subtitle, className = '' }) => (
    <motion.div 
        className={`text-center mb-16 ${className}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-100px" }}
    >
        <h2 className="text-3xl md:text-5xl font-bold font-playfair text-white mb-4 relative">
            <span className="relative inline-block px-10"> {/* Added padding for quote marks */}
                <span className="absolute -top-5 -left-2 text-7xl text-emerald-500/10 font-playfair">"</span>
                {title.split(' ')[0]} <span className="text-emerald-500 relative">
                    {title.split(' ')[1]}
                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 15" width="100%" height="15">
                        <path d="M0,7.5 Q25,15 50,7.5 Q75,0 100,7.5" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </span>
                <span className="absolute -top-5 -right-2 text-7xl text-emerald-500/10 font-playfair">"</span>
            </span>
        </h2>
        <motion.p 
            className="text-neutral-300 max-w-2xl mx-auto font-nunito text-lg mb-10"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            viewport={{ once: true }}
        >
            {subtitle}
        </motion.p>
    </motion.div>
);

// Visual indicator for keyboard navigation
const KeyboardIndicator: React.FC<{show: boolean}> = ({ show }) => (
    <AnimatePresence>
        {show && (
            <motion.div 
                className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-neutral-900/80 backdrop-blur-md border border-emerald-500/30 rounded-full py-2 px-4 text-sm font-nunito text-emerald-400 z-50 shadow-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
            >
                <div className="flex items-center gap-2">
                    <span>Tekan</span>
                    <kbd className="bg-neutral-800 px-2 py-1 rounded border border-neutral-700 text-white">ESC</kbd>
                    <span>untuk keluar</span>
                </div>
            </motion.div>
        )}
    </AnimatePresence>
);

const FeaturesSection: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);
    const [statsFullscreen, setStatsFullscreen] = useState(false);
    const [servicesFullscreen, setServicesFullscreen] = useState(false);
    const [showKeyboardHint, setShowKeyboardHint] = useState(false);
    // Track viewport size for responsive adjustments
    const [isMobile, setIsMobile] = useState(false);
    
    // Handle scroll effect and detect viewport size
    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
        };
        
        // Initial check
        handleResize();
        
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, []);
    
    // Handle escape key to exit fullscreen
    useEffect(() => {
        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape' && (statsFullscreen || servicesFullscreen)) {
                toggleFullscreen(statsFullscreen, true);
            }
        };
        
        document.addEventListener('keydown', handleEscKey);
        return () => document.removeEventListener('keydown', handleEscKey);
    }, [statsFullscreen, servicesFullscreen]);
    
    // Prevent body scrolling when in fullscreen mode and immediately show keyboard hint
    useEffect(() => {
        if (statsFullscreen || servicesFullscreen) {
            document.body.style.overflow = 'hidden';
            // Show keyboard hint immediately (no delay)
            setShowKeyboardHint(true);
        } else {
            document.body.style.overflow = '';
            setShowKeyboardHint(false);
        }
        
        return () => {
            document.body.style.overflow = '';
        };
    }, [statsFullscreen, servicesFullscreen]);
    
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
        }
    };
    
    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100, damping: 10 }
        }
    };
    
    // Common animation props
    const sectionProps = {
        variants: containerVariants,
        initial: "hidden",
        whileInView: "visible",
        viewport: { once: true, margin: "-100px" }
    };
    
    // Define a simplified toggle function with better state management
    const toggleFullscreen = (isStats: boolean, forceExit: boolean = false) => {
        // Exit fullscreen mode - simplified case
        if (forceExit) {
            setStatsFullscreen(false);
            setServicesFullscreen(false);
            return;
        }
        
        // For entering fullscreen, set only one state to true and ensure other is false
        if (isStats) {
            setStatsFullscreen(prev => !prev);
            setServicesFullscreen(false);
        } else {
            setServicesFullscreen(prev => !prev);
            setStatsFullscreen(false);
        }
    };
    
    // Enhanced Stats Fullscreen component
    const StatsFullscreen = () => (
        <motion.div 
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <AnimatedBackground scrollY={scrollY} density={15} />
            <FullscreenButton 
                isFullscreen={true} 
                onClick={() => toggleFullscreen(true, true)} 
                position="top-right"
                label="Tutup"
            />
            
            <motion.div 
                className="container mx-auto px-4 py-8 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.h2 
                    className="text-4xl md:text-6xl font-bold text-white mb-12 text-center font-playfair"
                    animate={{ y: [10, 0], opacity: [0, 1] }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                        Pencapaian Kami
                    </span>
                </motion.h2>
                
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-12"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {statsData.map((stat, index) => (
                        <motion.div 
                            key={index} 
                            variants={itemVariants}
                            className="transform transition-transform duration-300"
                        >
                            <StatItem 
                                icon={stat.icon}
                                count={stat.count}
                                label={stat.label}
                                // No onClick in fullscreen mode to prevent accidental toggling
                            />
                        </motion.div>
                    ))}
                </motion.div>
                
                {/* ESC key hint now managed by the shared KeyboardIndicator component */}
            </motion.div>
        </motion.div>
    );
    
    // Enhanced Services Fullscreen component
    const ServicesFullscreen = () => (
        <motion.div 
            className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <AnimatedBackground scrollY={scrollY} density={15} />
            <FullscreenButton 
                isFullscreen={true} 
                onClick={() => toggleFullscreen(false, true)} 
                position="top-right"
                label="Tutup"
            />
            
            <motion.div 
                className="container mx-auto px-4 py-12 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
            >
                <motion.h2 
                    className="text-4xl md:text-6xl font-bold text-white mb-8 text-center font-playfair"
                    animate={{ y: [10, 0], opacity: [0, 1] }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                        Layanan Kami
                    </span>
                </motion.h2>
                
                <motion.p 
                    className="text-neutral-300 max-w-2xl mx-auto font-nunito text-lg mb-16 text-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    Kami menyediakan berbagai layanan profesional untuk mewujudkan ruang impian 
                    Anda dengan kualitas terbaik dan hasil yang memuaskan
                </motion.p>
                
                <motion.div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto"
                    initial="hidden"
                    animate="visible"
                    variants={{
                        hidden: { opacity: 0 },
                        visible: {
                            opacity: 1,
                            transition: { staggerChildren: 0.15, delayChildren: 0.5 }
                        }
                    }}
                >
                    {servicesData.map((service, index) => (
                        <motion.div 
                            key={index} 
                            variants={{
                                hidden: { y: 30, opacity: 0 },
                                visible: { y: 0, opacity: 1 }
                            }}
                            className="transform transition-transform duration-300"
                        >
                            <ServiceCard
                                icon={service.icon}
                                title={service.title}
                                description={service.description}
                                index={index}
                                // No onClick in fullscreen mode to prevent accidental toggling
                            />
                        </motion.div>
                    ))}
                </motion.div>
                
                {/* ESC key hint now managed by the shared KeyboardIndicator component */}
            </motion.div>
        </motion.div>
    );
    
    return (
        <section className="min-h-screen bg-gradient-to-b from-black to-neutral-900 py-16 md:py-24 flex flex-col justify-center relative overflow-hidden">
            <AnimatedBackground scrollY={scrollY} />
            
            {/* Keyboard navigation indicator */}
            <KeyboardIndicator show={showKeyboardHint} />
            
            {/* Fullscreen components */}
            <AnimatePresence>
                {statsFullscreen && <StatsFullscreen />}
                {servicesFullscreen && <ServicesFullscreen />}
            </AnimatePresence>
            
            <div className="container mx-auto px-4 relative z-10">
                {/* Stats Section */}
                <motion.div className="mb-16 md:mb-24 relative" {...sectionProps}>
                    <FullscreenButton 
                        isFullscreen={false} 
                        onClick={() => toggleFullscreen(true, false)} 
                        position="top-right"
                        label={isMobile ? undefined : "Perbesar"}
                    />
                    
                    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto px-4 md:px-0">
                        {statsData.map((stat, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <StatItem 
                                    icon={stat.icon}
                                    count={stat.count}
                                    label={stat.label}
                                    onClick={() => toggleFullscreen(true, false)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Services Section */}
                <section className="relative mt-8 md:mt-0">
                    <FullscreenButton 
                        isFullscreen={false} 
                        onClick={() => toggleFullscreen(false, false)} 
                        position="top-right"
                        label={isMobile ? undefined : "Perbesar"}
                    />
                    
                    <SectionTitle 
                        title="Layanan Kami"
                        subtitle="Kami menyediakan berbagai layanan profesional untuk mewujudkan ruang impian Anda dengan kualitas terbaik"
                        className="px-4 md:px-0"
                    />
                    
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 md:px-6 lg:px-4"
                        initial="hidden"
                        whileInView="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                        }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {servicesData.map((service, index) => (
                            <motion.div 
                                key={index} 
                                variants={{
                                    hidden: { y: 20, opacity: 0 },
                                    visible: { y: 0, opacity: 1 }
                                }}
                            >
                                <ServiceCard
                                    icon={service.icon}
                                    title={service.title}
                                    description={service.description}
                                    index={index}
                                    onClick={() => toggleFullscreen(false, false)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </section>
            </div>
        </section>
    );
};

export default FeaturesSection;
