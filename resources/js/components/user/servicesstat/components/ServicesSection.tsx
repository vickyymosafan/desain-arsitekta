import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { serviceContainerVariants, serviceItemVariants } from '../animations/variants';
import { servicesData } from '../data/servicesStatData';

const ServicesFullscreenContent: React.FC = () => (
  <div className="w-full max-w-6xl mx-auto">
    <motion.p 
      className="text-neutral-300 max-w-3xl mx-auto font-nunito text-lg mb-16 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.6 }}
    >
      Kami menyediakan berbagai layanan profesional untuk mewujudkan ruang impian 
      Anda dengan kualitas terbaik dan hasil yang memuaskan
    </motion.p>
    
    <motion.div 
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-4"
      initial="hidden"
      animate="visible"
      variants={serviceContainerVariants}
    >
      {servicesData.map((service, index) => (
        <motion.div 
          key={index} 
          variants={serviceItemVariants}
          className="flex justify-center"
        >
          <div className="w-full max-w-xs">
            <ServiceCard
              icon={service.icon}
              title={service.title}
              description={service.description}
              index={index}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

export default ServicesFullscreenContent;
