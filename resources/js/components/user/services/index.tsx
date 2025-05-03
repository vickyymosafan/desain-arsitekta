import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import SectionHeader from './SectionHeader';
import { servicesData } from './data';
import LazyComponent from '@/components/ui/lazy-component';

// Import extracted components
import {
  BackgroundElements,
  DynamicSpotlight,
  SparkleIcon,
  NavigationButton,
  ServiceCardPlaceholder
} from './components';

// Import animation constants
import { containerVariants, cardVariants } from './utils/animations';

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
      className="section-fullscreen h-screen min-h-screen relative overflow-hidden bg-navy-900 text-white flex flex-col justify-center"
      aria-labelledby="services-heading"
      ref={sectionRef}
    >
      <BackgroundElements />
      <DynamicSpotlight hoveredIndex={hoveredIndex} />

      <div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex flex-col justify-center h-full py-8 lg:py-12 relative"
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
