import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// UI Components
import AnimatedBackground from './ui/AnimatedBackground';

// Section Components
import StatsFullscreenContent from './StatsSection';
import ServicesFullscreenContent from './ServicesSection';

// Types
type ViewType = 'stats' | 'services';

// Animation variants
const animationVariants = {
  title: {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  },
  button: {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.2, duration: 0.5 } }
  },
  content: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: 0.5 }
  }
};

/**
 * SectionHeader Component - Displays the section title and subtitle based on active view
 */
const SectionHeader: React.FC<{ activeView: ViewType }> = ({ activeView }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={animationVariants.title}
  >
    <h2 className="mb-2 text-emerald-500 text-sm font-bold tracking-widest uppercase">
      {activeView === 'services' ? 'Layanan Kami' : 'Pencapaian Kami'}
    </h2>
    <h3 className="mb-6 text-4xl md:text-5xl font-playfair font-bold text-white">
      {activeView === 'services' ? (
        <>Solusi <span className="text-emerald-500">Arsitektur</span> Terbaik</>
      ) : (
        <>Pencapaian <span className="text-emerald-500">Antosa Architect</span></>
      )}
    </h3>
  </motion.div>
);

/**
 * ToggleButton Component - Button to switch between services and stats views
 */
const ToggleButton: React.FC<{ 
  activeView: ViewType, 
  onClick: () => void 
}> = ({ activeView, onClick }) => (
  <motion.div
    initial="hidden"
    animate="visible"
    variants={animationVariants.button}
  >
    <button 
      onClick={onClick}
      className="group inline-flex items-center py-3 px-6 bg-emerald-500/10 text-emerald-500 rounded-lg 
                transition-all duration-300 mt-6 mb-8 hover:bg-emerald-500/20 hover:shadow-lg 
                hover:shadow-emerald-500/10 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
      aria-label={activeView === 'services' ? 'Lihat Pencapaian' : 'Lihat Layanan'}
    >
      <span>{activeView === 'services' ? 'Lihat Pencapaian' : 'Lihat Layanan'}</span>
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d={activeView === 'services' ? "M17 8l4 4m0 0l-4 4m4-4H3" : "M7 16l-4-4m0 0l4-4m-4 4h18"} 
        />
      </svg>
    </button>
  </motion.div>
);

/**
 * ContentView Component - Renders the active content view with animations
 */
const ContentView: React.FC<{ activeView: ViewType }> = ({ activeView }) => (
  <AnimatePresence mode="wait">
    {activeView === 'stats' ? (
      <motion.div
        key="stats"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={animationVariants.content}
        className="w-full"
      >
        <StatsFullscreenContent />
      </motion.div>
    ) : (
      <motion.div
        key="services"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={animationVariants.content}
        className="w-full"
      >
        <ServicesFullscreenContent />
      </motion.div>
    )}
  </AnimatePresence>
);

/**
 * FeaturesSection Component
 * 
 * A responsive section that toggles between services and statistics views.
 * Includes animated transitions between views and responsive layout adjustments.
 */
const FeaturesSection: React.FC = () => {
  // State management
  const [scrollY, setScrollY] = useState<number>(0);
  const [activeView, setActiveView] = useState<ViewType>('services');
  const [isMobile, setIsMobile] = useState<boolean>(false);
  
  // Refs
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Handler functions for events
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => setIsMobile(window.innerWidth < 768);

    // Initial call to set mobile state
    handleResize();

    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Toggle between services and stats views
  const toggleView = () => {
    setActiveView(prevView => prevView === 'stats' ? 'services' : 'stats');
  };

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black py-16 sm:py-20"
      style={{ scrollMarginTop: '80px' }}
    >
      {/* Dynamic parallax background */}
      <AnimatedBackground scrollY={scrollY} />
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-12">
          {/* Section header with title and subtitle */}
          <SectionHeader activeView={activeView} />
          
          {/* Toggle button to switch views */}
          <ToggleButton activeView={activeView} onClick={toggleView} />
        </div>

        <div className="overflow-visible">
          {/* Content view with animated transitions */}
          <ContentView activeView={activeView} />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
