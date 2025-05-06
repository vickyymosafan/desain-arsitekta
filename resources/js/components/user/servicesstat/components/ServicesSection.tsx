import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { serviceContainerVariants, serviceItemVariants } from '../animations/variants';
import { servicesData } from '../data/servicesStatData';

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

export default ServicesFullscreenContent;
