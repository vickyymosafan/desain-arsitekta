import React from 'react';
import { Service } from './types';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2 } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  // Helper component for feature items
  const FeatureItem = ({ text }: { text: string }) => (
    <motion.li 
      className="flex items-start group/item"
      initial={{ opacity: 0, x: -5 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
    >
      <span className="text-emerald-400 mr-2 mt-0.5 flex-shrink-0 transition-all duration-300 group-hover/item:scale-110">
        <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
      </span>
      <span className="text-sm text-gray-300 transition-colors duration-300 group-hover/item:text-emerald-300">{text}</span>
    </motion.li>
  );

  // ServiceIcon with soft glow effect
  const ServiceIcon = ({ IconComponent }: { IconComponent: Service['icon'] }) => (
    <div className="relative mb-6 transition-all duration-500 group-hover:translate-y-1">
      {/* Subtle glow effect */}
      <div className="absolute -inset-1 bg-emerald-500/10 blur-xl rounded-full opacity-70 group-hover:bg-emerald-400/20 group-hover:blur-2xl transition-all duration-500"></div>
      
      {/* Icon container */}
      <motion.div 
        className="relative w-14 h-14 bg-navy-700/60 text-emerald-400 rounded-xl flex items-center justify-center backdrop-blur-sm border border-emerald-500/20 z-10 group-hover:bg-emerald-500 group-hover:text-navy-900 transition-all duration-500 group-hover:shadow-lg group-hover:shadow-emerald-500/20"
        whileHover={{ scale: 1.05, rotate: 3 }}
        transition={{ duration: 0.4 }}
      >
        <IconComponent className="h-7 w-7" strokeWidth={1.5} />
      </motion.div>
    </div>
  );

  return (
    <motion.div 
      className="flex flex-col h-full backdrop-blur-sm bg-navy-800/50 rounded-xl border border-navy-700/50 shadow-lg transition-all duration-500 overflow-hidden group hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
    >
      <div className="p-6 flex-1 flex flex-col relative overflow-hidden">
        {/* Hover spotlight effect */}
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
        
        <ServiceIcon IconComponent={service.icon} />
        
        <h3 className="text-xl font-medium mb-3 text-white group-hover:text-emerald-400 transition-colors duration-300 relative">
          {service.title}
          
          {/* Animated underline on hover */}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-300/50 group-hover:w-1/3 transition-all duration-500"></span>
        </h3>
        
        <p className="text-gray-300 text-sm mb-6 flex-grow group-hover:text-gray-200 transition-colors duration-300">{service.description}</p>
        
        <div className="space-y-3 mb-4">
          {service.features.map((feature, index) => (
            <FeatureItem key={index} text={feature} />
          ))}
        </div>
      </div>
      
      <div className="px-6 pb-6 pt-3 border-t border-navy-700/50 group-hover:border-emerald-500/20 transition-colors duration-300">
        <motion.a 
          href="#" 
          className="inline-flex items-center text-emerald-400 hover:text-emerald-300 text-sm font-medium relative overflow-hidden group/link"
          whileHover={{ x: 5 }}
        >
          <span className="relative z-10">Pelajari Lebih Lanjut</span>
          
          {/* Background slide effect on hover */}
          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-400/30 group-hover/link:w-full transition-all duration-300 ease-in-out"></span>
          
          <motion.div 
            className="ml-1 relative z-10"
            animate={{ x: [0, 5, 0] }}
            transition={{ 
              repeat: Infinity, 
              repeatType: "loop", 
              duration: 1.5, 
              ease: "easeInOut",
              repeatDelay: 1
            }}
          >
            <ChevronRight className="h-4 w-4" />
          </motion.div>
        </motion.a>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
