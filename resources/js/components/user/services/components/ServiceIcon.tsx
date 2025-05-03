import React, { useState } from 'react';
import { LucideIcon } from 'lucide-react';

interface ServiceIconProps {
  IconComponent: LucideIcon;
  title: string;
}

/**
 * Komponen ikon layanan dengan efek hover
 * dan animasi interaktif untuk meningkatkan UX
 */
const ServiceIcon: React.FC<ServiceIconProps> = ({ IconComponent, title }) => {
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

export default ServiceIcon;
