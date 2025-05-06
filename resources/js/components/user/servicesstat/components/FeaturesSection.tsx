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

  useEffect(() => {
    if (window.location.hash === '#services' && sectionRef.current) {
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        setActiveView('services');
      }, 100);
    }
  }, []);

  const toggleView = () => {
    setActiveView(prev => prev === 'stats' ? 'services' : 'stats');
  };

  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black"
      style={{ scrollMarginTop: '80px' }}
    >
      <AnimatedBackground scrollY={scrollY} />
      
      <div className="container mx-auto px-4 relative z-10 py-16">
        <div className="text-center mb-8">
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
          <p className="max-w-3xl mx-auto text-gray-300 text-lg mb-8">
            {activeView === 'services' 
              ? 'Kami menyediakan berbagai layanan profesional untuk mewujudkan ruang impian Anda dengan kualitas terbaik.' 
              : 'Angka-angka yang menunjukkan dedikasi dan kualitas kami dalam dunia arsitektur dan konstruksi.'}
          </p>
          
          <button 
            onClick={toggleView}
            className="inline-flex items-center py-2 px-4 bg-emerald-500/10 text-emerald-500 rounded-lg transition duration-300 mb-12 mx-auto hover:bg-emerald-500/20"
          >
            {activeView === 'services' ? 'Lihat Pencapaian' : 'Lihat Layanan'}
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeView === 'stats' ? (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
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
            >
              <ServicesFullscreenContent />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default FeaturesSection;
