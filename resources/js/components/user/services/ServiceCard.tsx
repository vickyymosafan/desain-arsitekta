import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { Service } from './types';

// Komponen untuk menampilkan item fitur layanan
const FeatureItem: React.FC<{ text: string }> = ({ text }) => (
  <motion.li 
    className="flex items-start group/item"
    initial={{ opacity: 0, x: -5 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
  >
    <span className="text-emerald-400 mr-2 mt-0.5 flex-shrink-0 transition-all duration-300 group-hover/item:scale-110" aria-hidden="true">
      <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
    </span>
    <span className="text-sm text-gray-300 transition-colors duration-300 group-hover/item:text-emerald-300">
      {text}
    </span>
  </motion.li>
);

// Komponen ikon layanan dengan efek hover
const ServiceIcon: React.FC<{ 
  IconComponent: Service['icon'],
  title: string 
}> = ({ IconComponent, title }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className="mb-6 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow effect */}
      <div className={`absolute -inset-6 bg-emerald-400/10 blur-2xl rounded-full transition-opacity duration-300 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} aria-hidden="true"></div>
      
      {/* Particle effects */}
      <div className="absolute inset-0 overflow-hidden rounded-xl" aria-hidden="true">
        {isHovered && [...Array(5)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 rounded-full bg-emerald-400/40 animate-particle-float pointer-events-none"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 1.5}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Icon container with explicit background color */}
      <div
        className={`relative w-14 h-14 flex items-center justify-center rounded-xl border transition-all duration-300 z-10 ${
          isHovered 
            ? 'bg-emerald-400 text-navy-900 border-transparent shadow-lg shadow-emerald-500/20' 
            : 'bg-navy-700/60 text-emerald-400 border-emerald-500/20 backdrop-blur-sm'
        }`}
        aria-label={`Ikon untuk ${title}`}
      >
        {/* Pulse ring */}
        <div className={`absolute inset-0 rounded-xl border border-emerald-400/30 ${isHovered ? 'animate-ping-slow opacity-100' : 'opacity-0'}`} aria-hidden="true"></div>
        
        {/* Icon */}
        <IconComponent 
          className={`h-7 w-7 transition-all duration-300 ${isHovered ? 'stroke-[2px]' : 'stroke-[1.5px]'}`} 
        />
      </div>
    </div>
  );
};

// Komponen link "Pelajari Lebih Lanjut"
const LearnMoreLink: React.FC<{serviceTitle: string}> = ({serviceTitle}) => (
  <motion.a 
    href="#"
    aria-label={`Pelajari lebih lanjut tentang ${serviceTitle}`}
    className="inline-flex items-center text-emerald-400 hover:text-emerald-300 text-sm font-medium relative overflow-hidden group/link focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-navy-800 rounded-md px-2 py-1 -ml-2"
    whileHover={{ x: 5 }}
    whileFocus={{ x: 5 }}
  >
    <span className="relative z-10">Pelajari Lebih Lanjut</span>
    
    {/* Background slide effect on hover */}
    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-400/30 group-hover/link:w-full group-focus/link:w-full transition-all duration-300 ease-in-out" aria-hidden="true"></span>
    
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
      aria-hidden="true"
    >
      <ChevronRight className="h-4 w-4" />
    </motion.div>
  </motion.a>
);

// Definisi animasi untuk kartu
const cardAnimations = {
  initial: { opacity: 0, y: 20 },
  inView: { opacity: 1, y: 0 },
  hover: { y: -8 }
};

interface ServiceCardProps {
  service: Service;
}

/**
 * Komponen kartu layanan untuk menampilkan informasi layanan
 * dengan animasi dan efek interaktif
 */
const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <motion.div 
      className="flex flex-col h-full backdrop-blur-sm bg-navy-800/50 rounded-xl border border-navy-700/50 shadow-lg transition-all duration-500 overflow-hidden group hover:border-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/10 focus-within:border-emerald-500/50 focus-within:shadow-xl focus-within:shadow-emerald-500/20"
      initial="initial"
      whileInView="inView"
      whileHover="hover"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      variants={cardAnimations}
      tabIndex={0}
      role="article"
      aria-labelledby={`service-title-${service.id}`}
    >
      <div className="p-6 flex-1 flex flex-col relative overflow-hidden">
        {/* Hover spotlight effect */}
        <div className="absolute -right-20 -top-20 w-40 h-40 bg-emerald-400/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" aria-hidden="true"></div>
        
        <ServiceIcon IconComponent={service.icon} title={service.title} />
        
        <h3 
          id={`service-title-${service.id}`}
          className="text-xl font-medium mb-3 text-white group-hover:text-emerald-400 transition-colors duration-300 relative"
        >
          {service.title}
          
          {/* Animated underline on hover */}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-300/50 group-hover:w-1/3 transition-all duration-500" aria-hidden="true"></span>
        </h3>
        
        <p className="text-gray-300 text-sm mb-6 flex-grow group-hover:text-gray-200 transition-colors duration-300">
          {service.description}
        </p>
        
        <ul className="space-y-3 mb-4" aria-label={`Fitur ${service.title}`}>
          {service.features.map((feature, index) => (
            <FeatureItem key={index} text={feature} />
          ))}
        </ul>
      </div>
      
      <div className="px-6 pb-6 pt-3 border-t border-navy-700/50 group-hover:border-emerald-500/20 transition-colors duration-300">
        <LearnMoreLink serviceTitle={service.title} />
      </div>
    </motion.div>
  );
};

export default ServiceCard;
