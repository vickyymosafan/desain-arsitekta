import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import StatItem from './StatItem';
import ServiceCard from './ServiceCard';
import FullscreenButton from './FullscreenButton';
import { statsData, servicesData } from '../data/servicesStatData';

// Types
interface SectionTitleProps {
  title: string;
  subtitle: string;
  className?: string;
}

interface AnimatedBackgroundProps {
  scrollY: number;
  density?: number;
}

interface KeyboardIndicatorProps {
  show: boolean;
}

interface FullscreenSectionProps {
  title: string;
  scrollY: number;
  onClose: () => void;
  children: React.ReactNode;
}

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

// Constants
const ANIMATION_VIEWPORT = { once: true, margin: "-100px" };
const MOBILE_BREAKPOINT = 768;

// Animated background component with improved performance
const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ scrollY, density = 10 }) => (
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
const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className = '' }) => {
  const [firstWord, secondWord] = title.split(' ');
  
  return (
    <motion.div 
        className={`text-center mb-16 ${className}`}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true, margin: "-100px" }}
    >
        <h2 className="text-3xl md:text-5xl font-bold font-playfair text-white mb-4 relative">
            <span className="relative inline-block px-10">
                <span className="absolute -top-5 -left-2 text-7xl text-emerald-500/10 font-playfair">"</span>
                {firstWord} <span className="text-emerald-500 relative">
                    {secondWord}
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
};

// Lazy-loaded fullscreen button that only renders when in viewport
const LazyFullscreenButton: React.FC<React.ComponentProps<typeof FullscreenButton>> = (props) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  
  return (
    <div ref={ref} className="absolute top-4 right-4 z-50">
      {isInView && <FullscreenButton {...props} />}
    </div>
  );
};

// Visual indicator for keyboard navigation
const KeyboardIndicator: React.FC<KeyboardIndicatorProps> = ({ show }) => (
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

// Fullscreen section component
const FullscreenSection: React.FC<FullscreenSectionProps> = ({ 
  title, 
  children, 
  scrollY,
  onClose
}) => (
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
      onClick={onClose} 
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
          {title}
        </span>
      </motion.h2>
      
      {children}
    </motion.div>
  </motion.div>
);

// Main FeaturesSection component
const FeaturesSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeFullscreen, setActiveFullscreen] = useState<'stats' | 'services' | null>(null);
  const [showKeyboardHint, setShowKeyboardHint] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktopOnly, setIsDesktopOnly] = useState(false);
    
  // Handle scroll effect and detect viewport size
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // Mobile breakpoint
      setIsDesktopOnly(width >= 1024); // Only show fullscreen buttons on desktop (>=1024px)
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
      if (event.key === 'Escape' && activeFullscreen) {
        closeFullscreen();
      }
    };
    
    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [activeFullscreen]);
  
  // Toggle body scrolling and keyboard hint based on fullscreen state
  useEffect(() => {
    if (activeFullscreen) {
      document.body.style.overflow = 'hidden';
      setShowKeyboardHint(true);
    } else {
      document.body.style.overflow = '';
      setShowKeyboardHint(false);
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [activeFullscreen]);
    
  // Fullscreen toggle handlers
  const openFullscreen = (section: 'stats' | 'services') => {
    setActiveFullscreen(section);
  };
  
  const closeFullscreen = () => {
    setActiveFullscreen(null);
  };
  
  // Common animation props
  const sectionProps = {
    variants: containerVariants,
    initial: "hidden",
    whileInView: "visible",
    viewport: ANIMATION_VIEWPORT
  };
    
  // Stats Fullscreen content
  const renderStatsFullscreen = () => (
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
          />
        </motion.div>
      ))}
    </motion.div>
  );
  
  // Services Fullscreen content
  const renderServicesFullscreen = () => (
    <>
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
            />
          </motion.div>
        ))}
      </motion.div>
    </>
  );
    
    return (
        <section className="min-h-screen bg-gradient-to-b from-black to-neutral-900 pt-16 pb-16 md:pt-20 md:pb-20 flex flex-col justify-center relative overflow-hidden">
            <AnimatedBackground scrollY={scrollY} />
            
            {/* Keyboard navigation indicator */}
            <KeyboardIndicator show={showKeyboardHint} />
            
            {/* Fullscreen components */}
            <AnimatePresence>
                {activeFullscreen === 'stats' && (
                  <FullscreenSection 
                    title="Pencapaian Kami" 
                    scrollY={scrollY} 
                    onClose={closeFullscreen}
                  >
                    {renderStatsFullscreen()}
                  </FullscreenSection>
                )}
                
                {activeFullscreen === 'services' && (
                  <FullscreenSection 
                    title="Layanan Kami" 
                    scrollY={scrollY} 
                    onClose={closeFullscreen}
                  >
                    {renderServicesFullscreen()}
                  </FullscreenSection>
                )}
            </AnimatePresence>
            
            <div className="container mx-auto px-4 relative z-10 mt-0 md:mt-0">
                {/* Stats Section */}
                <motion.div 
                    className="relative mb-12 md:mb-16 flex justify-center items-center w-full"
                    {...sectionProps}
                >
                    {isDesktopOnly && (
                        <div className="absolute top-30 -right-4 z-20">
                            <LazyFullscreenButton 
                                isFullscreen={false} 
                                onClick={() => openFullscreen('stats')} 
                                position="top-right"
                                label="Perbesar"
                            />
                        </div>
                    )}
                    
                    <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto px-4 md:px-0 w-full">
                        {statsData.map((stat, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <StatItem 
                                    icon={stat.icon}
                                    count={stat.count}
                                    label={stat.label}
                                    onClick={() => openFullscreen('stats')}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Services Section */}
                <section className="relative mt-8 md:mt-0 flex flex-col items-center">
                    {/* Services section reference for lazy loading */}
                    <div className="relative w-full">
                        <SectionTitle 
                            title="Layanan Kami"
                            subtitle="Kami menyediakan berbagai layanan profesional untuk mewujudkan ruang impian Anda dengan kualitas terbaik"
                            className="px-4 md:px-0 mb-8"
                        />
                    </div>
                    
                    <motion.div 
                        className="relative mb-16 md:mb-24 flex justify-center items-center w-full"
                        {...sectionProps}
                    >
                        {isDesktopOnly && (
                          <div className="absolute top-30 -right-4 z-20">
                                <LazyFullscreenButton 
                                    isFullscreen={false} 
                                    onClick={() => openFullscreen('services')} 
                                    position="top-right"
                                    label="Perbesar"
                                />
                          </div>
                        )}
                        
                        <motion.div 
                            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4 md:px-6 lg:px-4 w-full"
                            initial="hidden"
                            whileInView="visible"
                            variants={{
                                hidden: { opacity: 0 },
                                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
                            }}
                            viewport={ANIMATION_VIEWPORT}
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
                                        onClick={() => openFullscreen('services')}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </section>
            </div>
        </section>
    );
};

export default FeaturesSection;
