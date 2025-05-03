import React, { useState, useRef, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';
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
    
    <div className="p-8 flex-1 flex flex-col relative z-10">
      <div className="relative mb-8">
        <div className="w-16 h-16 bg-emerald-500/10 rounded-xl"></div>
      </div>
      <div className="h-8 bg-navy-700/50 rounded-lg w-3/4 mb-4"></div>
      <div className="h-4 bg-navy-700/50 rounded-lg w-full mb-2"></div>
      <div className="h-4 bg-navy-700/50 rounded-lg w-5/6 mb-8"></div>
      <div className="space-y-4 mb-4">
        <div className="flex items-start">
          <div className="h-4 w-4 bg-emerald-400/30 rounded-full mr-2 flex-shrink-0"></div>
          <div className="h-4 bg-navy-700/50 rounded-lg w-3/4"></div>
        </div>
        <div className="flex items-start">
          <div className="h-4 w-4 bg-emerald-400/30 rounded-full mr-2 flex-shrink-0"></div>
          <div className="h-4 bg-navy-700/50 rounded-lg w-2/3"></div>
        </div>
      </div>
    </div>
    <div className="px-8 pb-6 pt-4 border-t border-navy-700/30">
      <div className="h-5 bg-emerald-400/30 rounded-lg w-1/3"></div>
    </div>
  </div>
);

// Background elements decoratif yang lebih sophisticated
const BackgroundElements: React.FC = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-emerald-500/10 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-emerald-500/10 to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
    
    {/* Grid pattern overlay */}
    <div className="absolute inset-0 opacity-5">
      <div className="h-full w-full" style={{ 
        backgroundImage: 'linear-gradient(rgba(80, 230, 180, 0.8) 1px, transparent 1px), linear-gradient(to right, rgba(80, 230, 180, 0.8) 1px, transparent 1px)', 
        backgroundSize: '40px 40px' 
      }}></div>
    </div>
    
    {/* Decorative architectural elements */}
    <div className="absolute top-1/4 left-0 w-20 h-40 border-r-2 border-emerald-500/10 opacity-50"></div>
    <div className="absolute bottom-1/4 right-0 w-20 h-40 border-l-2 border-emerald-500/10 opacity-50"></div>
    
    {/* Blueprint style elements */}
    <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-2 border-dashed border-emerald-500/10 opacity-30"></div>
    <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full border-2 border-dashed border-emerald-500/10 opacity-30"></div>
  </div>
);

// Spotlight dinamis untuk mengikuti hover yang lebih elegant
interface SpotlightProps {
  hoveredIndex: number | null;
}

const DynamicSpotlight: React.FC<SpotlightProps> = ({ hoveredIndex }) => {
  const controls = useAnimation();
  
  useEffect(() => {
    if (hoveredIndex !== null) {
      const x = (hoveredIndex % 3) * 330 + 150;
      const y = Math.floor(hoveredIndex / 3) * 350 + 300;
      
      controls.start({
        opacity: 1,
        x: x,
        y: y,
        scale: 1,
        filter: 'blur(80px)',
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } // Ease bezier curve for smoother animation
      });
    } else {
      controls.start({
        opacity: 0,
        scale: 0.8,
        filter: 'blur(60px)',
        transition: { duration: 1, ease: [0.34, 1.56, 0.64, 1] }
      });
    }
  }, [hoveredIndex, controls]);
  
  return (
    <motion.div 
      className="absolute w-[600px] h-[600px] rounded-full bg-emerald-500/5 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={controls}
      aria-hidden="true"
    />
  );
};

// Animasi sparkle pada judul yang lebih sophisticated
interface SparkleIconProps {
  isHovered: boolean;
}

const SparkleIcon: React.FC<SparkleIconProps> = ({ isHovered }) => (
  <motion.div 
    className="absolute -top-14 left-1/2 -translate-x-1/2 text-emerald-400 opacity-75 hidden sm:block"
    animate={{ 
      y: isHovered ? [0, -10, 0] : 0,
      rotate: isHovered ? [0, 5, -5, 0] : 0,
      scale: isHovered ? [1, 1.1, 1] : 1,
      filter: isHovered ? ["drop-shadow(0 0 0.2rem rgba(52, 211, 153, 0.3))", "drop-shadow(0 0 0.5rem rgba(52, 211, 153, 0.5))", "drop-shadow(0 0 0.2rem rgba(52, 211, 153, 0.3))"] : "drop-shadow(0 0 0.2rem rgba(52, 211, 153, 0.3))"
    }}
    transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, repeatType: 'loop' }}
    aria-hidden="true"
  >
    <Sparkles className="w-9 h-9" />
  </motion.div>
);

// Button untuk navigasi keyboard yang lebih elegant dan profesional
interface NavigationButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  isVisible: boolean;
}

const NavigationButton: React.FC<NavigationButtonProps> = ({ direction, onClick, isVisible }) => (
  <motion.button
    className={`absolute top-1/2 -translate-y-1/2 z-10 backdrop-blur-md bg-navy-800/70 text-emerald-400 w-12 h-12 rounded-full flex items-center justify-center border border-emerald-500/30 ${
      direction === 'prev' ? 'left-4 sm:left-8' : 'right-4 sm:right-8'
    } transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 hover:bg-emerald-500 hover:text-navy-900 hover:border-transparent`}
    onClick={onClick}
    aria-label={direction === 'prev' ? 'Layanan sebelumnya' : 'Layanan berikutnya'}
    initial={{ opacity: 0, x: direction === 'prev' ? -10 : 10 }}
    animate={{ 
      opacity: isVisible ? 1 : 0,
      x: isVisible ? 0 : (direction === 'prev' ? -10 : 10),
      pointerEvents: isVisible ? 'auto' : 'none'
    }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.3 }}
  >
    {direction === 'prev' ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
  </motion.button>
);

// Variants untuk animasi container yang lebih smooth
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

// Variants untuk animasi card yang lebih natural
const cardVariants = {
  initial: { 
    scale: 1,
    y: 0
  },
  active: { 
    scale: 1.03, 
    y: -10,
    zIndex: 20,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

/**
 * Komponen utama untuk menampilkan section layanan
 * dengan desain premium untuk target klien desain interior dan arsitek
 */
const ServicesSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const serviceRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    
    // Scroll the service into view if needed
    serviceRefs.current[index]?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center',
      inline: 'center'
    });
  };

  return (
    <section 
      id="services" 
      className="section-fullscreen min-h-screen relative overflow-hidden bg-navy-900 text-white py-32"
      aria-labelledby="services-heading"
      ref={sectionRef}
    >
      <BackgroundElements />
      <DynamicSpotlight hoveredIndex={hoveredIndex} />

      <div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col justify-center py-12 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredIndex(null);
        }}
      >
        <div className="relative mb-16">
          <SparkleIcon isHovered={isHovered} />
          
          <SectionHeader 
            title="Layanan Kami"
            description="Arsitekta menyediakan layanan lengkap dari desain arsitektur hingga konstruksi bangunan dengan kualitas premium dan nilai estetika tinggi untuk mewujudkan impian ruang anda."
            titleId="services-heading"
            className="max-w-3xl"
          />
          
          {/* Subtle animated line below the description */}
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-500 to-emerald-300 mx-auto mt-8 rounded-full"></div>
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
          isVisible={focusedIndex !== null || hoveredIndex !== null}
        />

        <NavigationButton 
          direction="next" 
          onClick={() => {
            const nextIndex = focusedIndex !== null
              ? (focusedIndex + 1) % servicesData.length
              : 0;
            navigateToService(nextIndex);
          }}
          isVisible={focusedIndex !== null || hoveredIndex !== null}
        />

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 xl:gap-12"
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
                // Perbaikan untuk lint error dengan ref callback
                if (el) {
                  serviceRefs.current[index] = el;
                }
              }}
              tabIndex={0}
              transition={{ duration: 0.4 }}
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
        
        {/* Subtle design element at the bottom for professional look */}
        <div className="flex justify-center mt-24">
          <div className="flex space-x-4 items-center opacity-60">
            <div className="w-10 h-[1px] bg-emerald-500/50"></div>
            <div className="w-2 h-2 rounded-full bg-emerald-500/70"></div>
            <div className="w-10 h-[1px] bg-emerald-500/50"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
