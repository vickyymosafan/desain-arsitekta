import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, CheckCircle2, ArrowRight } from 'lucide-react';
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
    <span className="text-sm text-gray-300 transition-colors duration-300 group-hover/item:text-white">
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
      className="mb-8 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background glow effect */}
      <div className={`absolute -inset-8 bg-emerald-400/15 blur-2xl rounded-full transition-opacity duration-500 ${
        isHovered ? 'opacity-100' : 'opacity-0'
      }`} aria-hidden="true"></div>
      
      {/* Particle effects */}
      <div className="absolute inset-0 overflow-hidden rounded-xl" aria-hidden="true">
        {isHovered && [...Array(8)].map((_, i) => (
          <div 
            key={i}
            className="absolute w-1 h-1 rounded-full bg-emerald-400/60 animate-particle-float pointer-events-none"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${20 + Math.random() * 60}%`,
              animationDelay: `${Math.random() * 1.5}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div 
          className={`h-full w-full transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
          style={{ 
            backgroundImage: 'linear-gradient(to right, rgba(80, 230, 180, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(80, 230, 180, 0.1) 1px, transparent 1px)', 
            backgroundSize: '8px 8px' 
          }}
        ></div>
      </div>
      
      {/* Icon container with explicit background color */}
      <div
        className={`relative w-16 h-16 flex items-center justify-center rounded-xl border-2 transition-all duration-500 z-10 ${
          isHovered 
            ? 'bg-emerald-500 text-navy-900 border-transparent shadow-lg shadow-emerald-500/20' 
            : 'bg-navy-700/80 text-emerald-400 border-emerald-500/30 backdrop-blur-sm'
        }`}
        aria-label={`Ikon untuk ${title}`}
      >
        {/* Pulse ring */}
        <div className={`absolute inset-0 rounded-xl border-2 border-emerald-400/50 ${isHovered ? 'animate-ping-slow opacity-100' : 'opacity-0'}`} aria-hidden="true"></div>
        
        {/* Radial gradient background */}
        <div className={`absolute inset-0 rounded-xl bg-gradient-radial from-emerald-400/20 to-transparent transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`} aria-hidden="true"></div>
        
        {/* Icon */}
        <IconComponent 
          className={`h-8 w-8 transition-all duration-300 ${isHovered ? 'stroke-[2.5px]' : 'stroke-[1.5px]'}`} 
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
    className="group/link inline-flex items-center text-sm font-medium relative overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-800 rounded-md px-4 py-2 -ml-4 hover:bg-emerald-500/10"
    whileHover={{ x: 5 }}
    whileFocus={{ x: 5 }}
  >
    <div className="flex items-center">
      <span className="relative z-10 mr-2 text-emerald-400 group-hover/link:text-emerald-300">Pelajari Lebih Lanjut</span>
      
      <motion.div 
        className="relative z-10 p-1 rounded-full bg-emerald-500/20 text-emerald-400 group-hover/link:bg-emerald-500 group-hover/link:text-navy-900"
        animate={{ x: [0, 3, 0] }}
        transition={{ 
          repeat: Infinity, 
          repeatType: "loop", 
          duration: 1.5, 
          ease: "easeInOut",
          repeatDelay: 1
        }}
        aria-hidden="true"
      >
        <ArrowRight className="h-3.5 w-3.5" />
      </motion.div>
    </div>
    
    {/* Background slide effect on hover */}
    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-400/30 group-hover/link:w-full group-focus/link:w-full transition-all duration-300 ease-in-out" aria-hidden="true"></span>
  </motion.a>
);

// Definisi animasi untuk kartu
const cardAnimations = {
  initial: { opacity: 0, y: 20 },
  inView: { opacity: 1, y: 0 },
  hover: { y: -8 }
};

// Dekoratif background element untuk kartu
const CardDecorations: React.FC<{isHovered: boolean}> = ({isHovered}) => (
  <>
    {/* Top right corner accent */}
    <div 
      className="absolute top-0 right-0 w-20 h-20 pointer-events-none overflow-hidden" 
      aria-hidden="true"
    >
      <div 
        className={`absolute top-0 right-0 w-4 border-t-2 border-r-2 border-emerald-500/30 transition-all duration-500 ${isHovered ? 'w-8 border-emerald-400' : ''}`}
        style={{height: isHovered ? '2rem' : '1rem'}}
      ></div>
    </div>
    
    {/* Bottom left corner accent */}
    <div 
      className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none overflow-hidden" 
      aria-hidden="true"
    >
      <div 
        className={`absolute bottom-0 left-0 h-4 border-b-2 border-l-2 border-emerald-500/30 transition-all duration-500 ${isHovered ? 'h-8 border-emerald-400' : ''}`}
        style={{width: isHovered ? '2rem' : '1rem'}}
      ></div>
    </div>
    
    {/* Hover spotlight effect */}
    <div 
      className={`absolute -right-20 -top-20 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
      aria-hidden="true"
    ></div>
  </>
);

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
