import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import LazyFullscreenButton from './ui/LazyFullscreenButton';
import SectionTitle from './ui/SectionTitle';
import { containerVariants, serviceContainerVariants, serviceItemVariants } from '../animations/variants';
import { ANIMATION_VIEWPORT } from '../types';
import { servicesData } from '../data/servicesStatData';

interface ServicesSectionProps {
  openFullscreen: () => void;
  isDesktopOnly: boolean;
}

/**
 * Services Section component
 * Displays company services in a responsive grid
 */
const ServicesSection: React.FC<ServicesSectionProps> = ({ openFullscreen, isDesktopOnly }) => {
  return (
    <section className="relative pt-12 md:pt-4 md:mt-0 flex flex-col items-center">
      {/* Services section reference for lazy loading */}
      <div className="relative w-full">
        <SectionTitle 
          title="Layanan Kami"
          subtitle="Kami menyediakan berbagai layanan profesional untuk mewujudkan ruang impian Anda dengan kualitas terbaik"
          className="px-2 sm:px-4 md:px-0 mb-4 sm:mb-6 md:mb-8"
        />
      </div>
      
      <motion.div 
        className="relative flex justify-center items-center w-full mt-4 sm:mt-0"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={ANIMATION_VIEWPORT}
      >
        {isDesktopOnly && (
          <div className="absolute top-30 -right-4 z-20">
            <LazyFullscreenButton 
              isFullscreen={false} 
              onClick={openFullscreen} 
              position="top-right"
              label="Perbesar"
            />
          </div>
        )}
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto px-3 sm:px-4 md:px-6 lg:px-4 w-full"
          initial="hidden"
          whileInView="visible"
          variants={serviceContainerVariants}
          viewport={ANIMATION_VIEWPORT}
        >
          {servicesData.map((service, index) => (
            <motion.div 
              key={index} 
              variants={serviceItemVariants}
            >
              <ServiceCard
                icon={service.icon}
                title={service.title}
                description={service.description}
                index={index}
                onClick={openFullscreen}
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

/**
 * Services Fullscreen content
 * Used in fullscreen display mode
 */
export const ServicesFullscreenContent: React.FC = () => (
  <>
    <motion.p 
      className="text-neutral-300 max-w-2xl mx-auto font-nunito text-lg mb-16 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.4, duration: 0.6 }}
    >
      Kami menyediakan berbagai layanan profesional untuk mewujudkan ruang impian 
      Anda dengan kualitas terbaik dan hasil yang memuaskan
    </motion.p>
    
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto"
      initial="hidden"
      animate="visible"
      variants={serviceContainerVariants}
    >
      {servicesData.map((service, index) => (
        <motion.div 
          key={index} 
          variants={serviceItemVariants}
          className="transform transition-transform duration-300"
        >
          <ServiceCard
            icon={service.icon}
            title={service.title}
            description={service.description}
            index={index}
          />
        </motion.div>
      ))}
    </motion.div>
  </>
);

export default ServicesSection;
