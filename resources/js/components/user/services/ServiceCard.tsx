import React from 'react';
import { Service } from './types';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  // Helper component for feature items with better animation
  const FeatureItem = ({ text }: { text: string }) => (
    <motion.li 
      className="flex items-start"
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-emerald-500 mr-2 mt-0.5 flex-shrink-0">
        <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
      </span>
      <span className="text-sm text-gray-600">{text}</span>
    </motion.li>
  );

  // ServiceIcon uses the Lucide icon component with enhanced animations
  const ServiceIcon = ({ IconComponent }: { IconComponent: Service['icon'] }) => (
    <div className="relative mb-6">
      {/* Background blur effect */}
      <div className="absolute -inset-1 bg-emerald-200/30 blur-xl rounded-full opacity-70"></div>
      
      {/* Icon container */}
      <motion.div 
        className="relative w-16 h-16 bg-gradient-to-br from-emerald-50 to-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-md z-10 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-500"
        whileHover={{ rotate: [0, -5, 5, -5, 0], scale: 1.05 }}
        transition={{ duration: 0.5 }}
      >
        <IconComponent className="h-8 w-8" strokeWidth={1.5} />
      </motion.div>
    </div>
  );

  return (
    <motion.div 
      className="flex flex-col h-full backdrop-blur-sm bg-white/80 dark:bg-gray-800/30 rounded-2xl border border-gray-100 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <div className="p-6 flex-1 flex flex-col">
        <ServiceIcon IconComponent={service.icon} />
        
        <h3 className="text-xl font-playfair font-bold mb-3 text-gray-800 dark:text-gray-100 group-hover:text-emerald-600 transition-colors duration-300">
          {service.title}
        </h3>
        
        <p className="text-gray-600 dark:text-gray-300 mb-6 flex-grow">{service.description}</p>
        
        <div className="space-y-3 mb-4">
          {service.features.map((feature, index) => (
            <FeatureItem key={index} text={feature} />
          ))}
        </div>
      </div>
      
      <div className="px-6 pb-6 pt-2 border-t border-gray-100 dark:border-gray-700">
        <motion.a 
          href="#" 
          className="inline-flex items-center text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 dark:hover:text-emerald-300 font-medium"
          whileHover={{ x: 5 }}
        >
          Pelajari Lebih Lanjut
          <motion.svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5 ml-1"
            viewBox="0 0 20 20" 
            fill="currentColor"
            initial={{ x: 0 }}
            animate={{ x: [0, 5, 0] }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "loop", 
              duration: 1.5, 
              ease: "easeInOut",
              repeatDelay: 1
            }}
          >
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </motion.svg>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
