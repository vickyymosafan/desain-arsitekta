import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// UI Components
import AnimatedBackground from './ui/AnimatedBackground';

// Section Components
import StatsFullscreenContent from './StatsSection';
import ServicesFullscreenContent from './ServicesSection';

const FeaturesSection: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [activeView, setActiveView] = useState<'stats' | 'services'>('services');
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const toggleView = () => {
    setActiveView(prev => prev === 'stats' ? 'services' : 'stats');
  };

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-black py-16 sm:py-20"
      style={{ scrollMarginTop: '80px' }}
    >
      <AnimatedBackground scrollY={scrollY} />
      
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
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
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <button 
              onClick={toggleView}
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
        </div>

        <div className="overflow-visible">
          <AnimatePresence mode="wait">
            {activeView === 'stats' ? (
              <motion.div
                key="stats"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <StatsFullscreenContent />
              </motion.div>
            ) : (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="w-full"
              >
                <ServicesFullscreenContent />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
