import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// UI Components
import AnimatedBackground from './ui/AnimatedBackground';
import KeyboardIndicator from './ui/KeyboardIndicator';
import FullscreenSection from './ui/FullscreenSection';

// Section Components
import StatsSection, { StatsFullscreenContent } from './StatsSection';
import ServicesSection, { ServicesFullscreenContent } from './ServicesSection';

// Animation constants
import { DESKTOP_BREAKPOINT } from '../types';

/**
 * Main FeaturesSection component
 * Orchestrates the sections display in a fullscreen layout
 */
const FeaturesSection: React.FC = () => {
  // State management
  const [scrollY, setScrollY] = useState(0);
  const [activeView, setActiveView] = useState<'stats' | 'services'>('services');
  const [showKeyboardHint, setShowKeyboardHint] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
    
  // Handle scroll effect and detect viewport size
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // Mobile breakpoint
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
  
  // Add smooth scrolling for navigation hash links
  useEffect(() => {
    // Check if URL contains hash for this section
    if (window.location.hash === '#services' && sectionRef.current) {
      // Add a slight delay to ensure the DOM is fully rendered
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        // Auto-select services view when navigated via hash
        setActiveView('services');
      }, 100);
    }
  }, []);
    
  // Toggle between stats and services views
  const toggleView = () => {
    setActiveView(prev => prev === 'stats' ? 'services' : 'stats');
    // Show keyboard hint when view changes
    setShowKeyboardHint(true);
    setTimeout(() => setShowKeyboardHint(false), 3000);
  };
    
  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black"
      style={{ scrollMarginTop: '80px' }} // Add offset for fixed header
    >
      <AnimatedBackground scrollY={scrollY} />
      
      {/* Keyboard navigation indicator */}
      <KeyboardIndicator show={showKeyboardHint} />
      
      <div className="container mx-auto px-4 relative z-10 py-16">
        {/* Section Header */}
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
          
          {/* Toggle Button */}
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

        {/* Content Area */}
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
