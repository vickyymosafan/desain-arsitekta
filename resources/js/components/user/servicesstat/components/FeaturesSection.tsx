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
 * Orchestrates the sections display and fullscreen functionality
 */
const FeaturesSection: React.FC = () => {
  // State management
  const [scrollY, setScrollY] = useState(0);
  const [activeFullscreen, setActiveFullscreen] = useState<'stats' | 'services' | null>(null);
  const [showKeyboardHint, setShowKeyboardHint] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktopOnly, setIsDesktopOnly] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
    
  // Handle scroll effect and detect viewport size
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768); // Mobile breakpoint
      setIsDesktopOnly(width >= DESKTOP_BREAKPOINT); // Only show fullscreen buttons on desktop
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
      }, 100);
    }
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
    
  return (
    <section 
      ref={sectionRef}
      id="services" 
      className="min-h-screen bg-gradient-to-b from-black to-neutral-900 pt-16 md:pt-0 flex flex-col justify-center relative overflow-hidden"
      style={{ scrollMarginTop: '80px' }} // Add offset for fixed header
    >
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
            <StatsFullscreenContent />
          </FullscreenSection>
        )}
        
        {activeFullscreen === 'services' && (
          <FullscreenSection 
            title="Layanan Kami" 
            scrollY={scrollY} 
            onClose={closeFullscreen}
          >
            <ServicesFullscreenContent />
          </FullscreenSection>
        )}
      </AnimatePresence>
      
      <div className="container mx-auto px-4 relative z-10 mt-0 md:-mt-10">
        {/* Stats Section */}
        <StatsSection 
          openFullscreen={() => openFullscreen('stats')} 
          isDesktopOnly={isDesktopOnly} 
        />

        {/* Services Section */}
        <ServicesSection 
          openFullscreen={() => openFullscreen('services')} 
          isDesktopOnly={isDesktopOnly} 
        />
      </div>
    </section>
  );
};

export default FeaturesSection;
