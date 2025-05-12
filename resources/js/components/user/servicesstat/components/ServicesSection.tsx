import React from 'react';
import { motion, RepeatType } from 'framer-motion';

// Import shared utilities
import { containerVariants, itemVariants, transitions } from '../../../../utils/animations';

// Import component dependencies
import ServiceCard from './ServiceCard';
import { servicesData, ServiceCardData } from '../data/servicesStatData';

/**
 * IntroText Component - Displays the services section introductory text with animation
 * Optimized for mobile viewing with responsive padding and modern typography
 */
const IntroText: React.FC = () => (
  <motion.p 
    className="text-neutral-300 max-w-3xl mx-auto font-nunito text-lg mb-8 sm:mb-16 text-center px-4 sm:px-6 leading-relaxed"
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ ...transitions.spring, delay: 0.2 }}
  >
    Kami menyediakan berbagai layanan profesional untuk mewujudkan ruang impian 
    Anda dengan kualitas terbaik dan hasil yang memuaskan
  </motion.p>
);

/**
 * ServiceGrid Component - Renders a responsive grid of service cards
 * Enhanced for better mobile layout and spacing with improved animations
 * 
 * @param services - Array of service data objects to display
 */
const ServiceGrid: React.FC<{ services: ServiceCardData[] }> = ({ services }) => (
  <motion.div 
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-7 md:gap-9 lg:gap-10 px-4 sm:px-6"
    initial="hidden"
    animate="visible"
    variants={containerVariants}
    aria-label="Daftar layanan kami"
    role="list"
  >
    {services.map((service, index) => (
      <ServiceItem 
        key={index}
        service={service}
        index={index}
      />
    ))}
  </motion.div>
);

/**
 * ServiceItem Component - Wraps individual service cards with animations
 * Optimized for full-width on mobile devices with enhanced accessibility
 * 
 * @param service - Service data object to display
 * @param index - Order index for staggered animations
 */
const ServiceItem: React.FC<{ 
  service: ServiceCardData;
  index: number;
}> = ({ service, index }) => (
  <motion.div 
    variants={itemVariants}
    className="flex justify-center"
    role="listitem"
    aria-label={`Layanan ${service.title}`}
  >
    <div className="w-full transform transition-transform duration-300 hover:scale-[1.01]">
      <ServiceCard
        icon={service.icon}
        title={service.title}
        description={service.description}
        index={index}
      />
    </div>
  </motion.div>
);

/**
 * ServicesFullscreenContent Component
 * 
 * Renders a full section of service offerings with animated introduction
 * and responsive grid of service cards.
 * Enhanced with fluid animations and organic background elements for Gen Z appeal.
 */
const ServicesFullscreenContent: React.FC = () => {
  // Animation properties for floating background elements
  const backgroundAnimation = {
    animate: {
      x: [0, 15, -10, 5, 0],
      y: [0, -10, 5, -15, 0],
      scale: [1, 1.05, 0.98, 1.03, 1],
      opacity: [0.5, 0.6, 0.5, 0.7, 0.5],
      rotate: [0, 1, -1, 2, 0],
      transition: {
        repeat: Infinity,
        repeatType: 'loop' as RepeatType,
        duration: 20,
        ease: 'easeInOut'
      }
    }
  };

  return (
    <motion.section 
      className="w-full max-w-6xl mx-auto py-8 sm:py-12 relative overflow-hidden"
      id="services-content"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      {/* Multiple layered decorative background elements for more organic feel */}
      <motion.div 
        className="absolute -top-32 -right-32 w-[30rem] h-[30rem] rounded-[60%] bg-gradient-radial from-emerald-500/10 via-emerald-400/5 to-transparent blur-3xl opacity-50 transform-gpu will-change-transform"
        animate={backgroundAnimation.animate}
        aria-hidden="true"
      />
      
      <motion.div 
        className="absolute top-1/4 -right-20 w-64 h-64 rounded-[65%] bg-gradient-to-l from-teal-500/5 via-emerald-400/10 to-transparent blur-2xl opacity-40 transform-gpu will-change-transform"
        animate={{
          x: [0, 15, -10, 5, 0],
          y: [0, -10, 5, -15, 0],
          scale: [1, 1.05, 0.98, 1.03, 1],
          opacity: [0.5, 0.6, 0.5, 0.7, 0.5],
          rotate: [0, 1, -1, 2, 0],
          transition: {
            repeat: Infinity,
            repeatType: 'loop' as RepeatType,
            duration: 15,
            delay: 0.5,
            ease: 'easeInOut'
          }
        }}
        aria-hidden="true"
      />
      
      <IntroText />
      <ServiceGrid services={servicesData} />
      
      {/* Left side background elements */}
      <motion.div 
        className="absolute -bottom-32 -left-32 w-[28rem] h-[28rem] rounded-[40%] bg-gradient-radial from-emerald-500/10 via-teal-400/5 to-transparent blur-3xl opacity-50 transform-gpu will-change-transform"
        animate={{
          x: [0, 15, -10, 5, 0],
          y: [0, -10, 5, -15, 0],
          scale: [1, 1.05, 0.98, 1.03, 1],
          opacity: [0.5, 0.6, 0.5, 0.7, 0.5],
          rotate: [0, 1, -1, 2, 0],
          transition: {
            repeat: Infinity,
            repeatType: 'loop' as RepeatType,
            duration: 18,
            delay: 0.3,
            ease: 'easeInOut'
          }
        }}
        aria-hidden="true"
      />
      
      <motion.div 
        className="absolute bottom-1/4 -left-16 w-60 h-60 rounded-[70%] bg-gradient-to-r from-teal-500/8 via-emerald-400/5 to-transparent blur-2xl opacity-30 mix-blend-soft-light transform-gpu will-change-transform"
        animate={{
          x: [0, 15, -10, 5, 0],
          y: [0, -10, 5, -15, 0],
          scale: [1, 1.05, 0.98, 1.03, 1],
          opacity: [0.5, 0.6, 0.5, 0.7, 0.5],
          rotate: [0, 1, -1, 2, 0],
          transition: {
            repeat: Infinity,
            repeatType: 'loop' as RepeatType,
            duration: 22,
            delay: 0.7,
            ease: 'easeInOut'
          }
        }}
        aria-hidden="true"
      />
    </motion.section>
  );
};

export default ServicesFullscreenContent;
