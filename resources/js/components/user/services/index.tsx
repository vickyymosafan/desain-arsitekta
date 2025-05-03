import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import ServiceCard from './ServiceCard';
import SectionHeader from './SectionHeader';
import { servicesData } from './data';
import LazyComponent from '@/components/ui/lazy-component';

// Komponen placeholder untuk loading state
const ServiceCardPlaceholder: React.FC = () => (
  <div 
    className="flex flex-col h-full backdrop-blur-sm bg-navy-800/50 rounded-xl border border-navy-700/50 overflow-hidden relative"
    aria-hidden="true"
  >
    {/* Shimmer effect overlay */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="shimmer-effect animate-shimmer absolute -inset-10 opacity-30"></div>
    </div>
    
    <div className="p-6 flex-1 flex flex-col relative z-10">
      <div className="relative mb-6">
        <div className="w-14 h-14 bg-emerald-500/10 rounded-xl"></div>
      </div>
      <div className="h-7 bg-navy-700/50 rounded-lg w-3/4 mb-3"></div>
      <div className="h-4 bg-navy-700/50 rounded-lg w-full mb-2"></div>
      <div className="h-4 bg-navy-700/50 rounded-lg w-5/6 mb-6"></div>
      <div className="space-y-3 mb-4">
        <div className="flex items-start">
          <div className="h-4 w-4 bg-emerald-400/20 rounded-full mr-2 flex-shrink-0"></div>
          <div className="h-4 bg-navy-700/50 rounded-lg w-3/4"></div>
        </div>
        <div className="flex items-start">
          <div className="h-4 w-4 bg-emerald-400/20 rounded-full mr-2 flex-shrink-0"></div>
          <div className="h-4 bg-navy-700/50 rounded-lg w-2/3"></div>
        </div>
      </div>
    </div>
    <div className="px-6 pb-6 pt-2 border-t border-navy-700/30">
      <div className="h-5 bg-emerald-400/20 rounded-lg w-1/3"></div>
    </div>
  </div>
);

// Background elements decoratif
const BackgroundElements: React.FC = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
    
    {/* Grid pattern overlay */}
    <div className="absolute inset-0 opacity-5">
      <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(rgba(80, 230, 180, 0.8) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
    </div>
  </div>
);

// Spotlight dinamis untuk mengikuti hover
interface SpotlightProps {
  hoveredIndex: number | null;
}

const DynamicSpotlight: React.FC<SpotlightProps> = ({ hoveredIndex }) => (
  <motion.div 
    className="absolute w-[500px] h-[500px] rounded-full blur-3xl bg-emerald-500/3 pointer-events-none"
    animate={{ 
      opacity: hoveredIndex !== null ? 1 : 0,
      x: hoveredIndex !== null ? (hoveredIndex % 3) * 300 + 150 : 0,
      y: hoveredIndex !== null ? Math.floor(hoveredIndex / 3) * 300 + 300 : 0,
      scale: hoveredIndex !== null ? 1 : 0.5,
      transition: { duration: 0.8, ease: "easeOut" }
    }}
    aria-hidden="true"
  />
);

// Animasi sparkle pada judul
interface SparkleIconProps {
  isHovered: boolean;
}

const SparkleIcon: React.FC<SparkleIconProps> = ({ isHovered }) => (
  <motion.div 
    className="absolute -top-12 left-1/2 -translate-x-1/2 text-emerald-400 opacity-75 hidden sm:block"
    animate={{ 
      y: isHovered ? [0, -10, 0] : 0,
      rotate: isHovered ? [0, 5, -5, 0] : 0,
      scale: isHovered ? [1, 1.1, 1] : 1
    }}
    transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, repeatType: 'loop' }}
    aria-hidden="true"
  >
    <Sparkles className="w-8 h-8" />
  </motion.div>
);

// Button untuk navigasi keyboard
interface NavigationButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  isVisible: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ direction, onClick, isVisible }) => (
  <button
    className={`absolute top-1/2 -translate-y-1/2 z-10 bg-navy-700/60 text-emerald-400 w-10 h-10 rounded-full flex items-center justify-center ${
      direction === 'prev' ? 'left-2' : 'right-2'
    } ${
      isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
    } transition-opacity duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 hover:bg-emerald-500 hover:text-navy-900`}
    onClick={onClick}
    aria-label={direction === 'prev' ? 'Layanan sebelumnya' : 'Layanan berikutnya'}
  >
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      className="h-5 w-5" 
      fill="none" 
      viewBox="0 0 24 24" 
      stroke="currentColor"
    >
      {direction === 'prev' ? (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      ) : (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      )}
    </svg>
  </button>
);

// Variants untuk animasi container
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

// Variants untuk animasi card
const cardVariants = {
  initial: { scale: 1 },
  active: { scale: 1, zIndex: 20 }
};

/**
 * Komponen utama untuk menampilkan section layanan
 */
const ServicesSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const serviceRefs = useRef<Array<HTMLDivElement | null>>([]);

  // Menangani navigasi keyboard
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % servicesData.length;
      setFocusedIndex(nextIndex);
      serviceRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + servicesData.length) % servicesData.length;
      setFocusedIndex(prevIndex);
      serviceRefs.current[prevIndex]?.focus();
    }
  };

  // Navigasi dengan tombol
  const navigateToService = (index: number) => {
    setFocusedIndex(index);
    serviceRefs.current[index]?.focus();
  };

  return (
    <section 
      id="services" 
      className="section-fullscreen relative overflow-hidden bg-navy-900 text-white"
      aria-labelledby="services-heading"
    >
      <BackgroundElements />
      <DynamicSpotlight hoveredIndex={hoveredIndex} />

      <div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-full flex flex-col justify-center py-12 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredIndex(null);
        }}
      >
        <div className="relative">
          <SparkleIcon isHovered={isHovered} />
          
          <SectionHeader 
            title="Layanan Kami"
            description="Arsitekta menyediakan layanan lengkap dari desain hingga konstruksi bangunan dengan kualitas premium dan nilai estetika tinggi."
            titleId="services-heading"
          />
        </div>

        {/* Keyboard navigation instructions */}
        <div className="sr-only">
          Gunakan tombol panah kiri/kanan untuk navigasi antar layanan.
        </div>

        <NavigationButton 
          direction="prev" 
          onClick={() => {
            const prevIndex = focusedIndex !== null
              ? (focusedIndex - 1 + servicesData.length) % servicesData.length
              : servicesData.length - 1;
            navigateToService(prevIndex);
          }}
          isVisible={focusedIndex !== null}
        />

        <NavigationButton 
          direction="next" 
          onClick={() => {
            const nextIndex = focusedIndex !== null
              ? (focusedIndex + 1) % servicesData.length
              : 0;
            navigateToService(nextIndex);
          }}
          isVisible={focusedIndex !== null}
        />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 xl:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          role="list"
          aria-label="Daftar layanan kami"
        >
          {servicesData.map((service, index) => (
            <motion.div
              key={service.id}
              className="h-full"
              variants={cardVariants}
              initial="initial"
              animate={hoveredIndex === index || focusedIndex === index ? "active" : "initial"}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setFocusedIndex(index)}
              onBlur={() => setFocusedIndex(null)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => {
                if (el) {
                  serviceRefs.current[index] = el;
                }
              }}
              tabIndex={-1}
              transition={{ duration: 0.3 }}
              role="listitem"
            >
              <LazyComponent 
                threshold={0.1}
                rootMargin="300px"
                className="h-full"
                placeholder={<ServiceCardPlaceholder />}
              >
                <ServiceCard service={service} />
              </LazyComponent>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
