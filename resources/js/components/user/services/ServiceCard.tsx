import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Service } from './types';
import { 
  FeatureItem, 
  ServiceIcon, 
  LearnMoreLink, 
  CardDecorations 
} from './components';

// Animation constants - move these to utils/animations.ts
import { cardAnimations } from './utils/animations';

interface ServiceCardProps {
  service: Service;
}

/**
 * Komponen kartu layanan untuk menampilkan informasi layanan
 * dengan animasi dan efek interaktif
 */
const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="flex flex-col h-full backdrop-blur-sm bg-navy-800/50 rounded-xl border border-navy-700/50 shadow-xl transition-all duration-500 overflow-hidden group hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 focus-within:border-emerald-500/50 focus-within:shadow-2xl focus-within:shadow-emerald-500/20"
      initial="initial"
      whileInView="inView"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      variants={cardAnimations}
      tabIndex={0}
      role="article"
      aria-labelledby={`service-title-${service.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardDecorations isHovered={isHovered} />
      
      <div className="p-8 flex-1 flex flex-col relative overflow-hidden">
        <ServiceIcon IconComponent={service.icon} title={service.title} />
        
        <h3 
          id={`service-title-${service.id}`}
          className="text-2xl font-medium mb-4 text-white group-hover:text-emerald-400 transition-colors duration-300 relative"
        >
          {service.title}
          
          {/* Animated underline on hover */}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-300/50 group-hover:w-1/3 transition-all duration-500" aria-hidden="true"></span>
        </h3>
        
        <p className="text-gray-300 text-base mb-8 flex-grow group-hover:text-gray-200 transition-colors duration-300 leading-relaxed">
          {service.description}
        </p>
        
        <ul className="space-y-4 mb-4" aria-label={`Fitur ${service.title}`}>
          {service.features.map((feature, index) => (
            <FeatureItem key={index} text={feature} />
          ))}
        </ul>
      </div>
      
      <div className="px-8 pb-6 pt-4 border-t border-navy-700/50 group-hover:border-emerald-500/20 transition-colors duration-300">
        <LearnMoreLink serviceTitle={service.title} />
      </div>
    </motion.div>
  );
};

export default ServiceCard;
