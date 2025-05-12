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
 */
const ServicesFullscreenContent: React.FC = () => {
  return (
    <section 
      className="w-full max-w-6xl mx-auto py-8 sm:py-12 relative"
      id="services-content"
    >
      <IntroText />
      <ServiceGrid services={servicesData} />
    </section>
  );
};

export default ServicesFullscreenContent;
