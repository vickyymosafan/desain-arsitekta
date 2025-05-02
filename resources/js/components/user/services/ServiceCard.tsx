import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceCardProps } from './types';
import { get3DTiltEffect, getAnimationVariant } from './animationUtils';

/**
 * ServiceCard component displays an individual service with icon, title and description
 * Enhanced with modern UI, 3D effects, and interactive animations
 */
const ServiceCard: React.FC<ServiceCardProps> = ({ 
  title, 
  description, 
  icon,
  index = 0,
  animation = 'zoom'
}) => {
  // Refs and state for interactive effects
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Track mouse position for interactive 3D effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        delay: index * 0.1,
        duration: 0.8
      }
    },
    hover: { 
      scale: 1.03,
      boxShadow: '0 20px 30px -10px rgba(16, 185, 129, 0.2)',
      borderColor: 'rgba(16, 185, 129, 0.3)',
      y: -8,
      transition: { type: 'spring', stiffness: 300, damping: 15 }
    },
    initial: { 
      scale: 1,
      boxShadow: '0 10px 20px -5px rgba(16, 185, 129, 0.1)', 
      borderColor: 'rgba(16, 185, 129, 0.1)',
      y: 0,
      transition: { type: 'spring', stiffness: 500, damping: 15 }
    }
  };
  
  const iconVariants = {
    hover: { 
      scale: 1.1, 
      rotate: [0, -5, 5, 0],
      transition: { 
        rotate: {
          repeat: Infinity, 
          repeatType: 'mirror', 
          duration: 2,
          ease: 'easeInOut'
        }
      }
    },
    initial: { scale: 1 }
  };
  
  const floatingBlobVariants = {
    hover: {
      scale: 1.2,
      opacity: 0.9,
      transition: { duration: 0.3 }
    },
    initial: {
      scale: 1,
      opacity: 0.7,
      transition: { duration: 0.3 }
    }
  };
  
  // Convert FontAwesome icon class to SVG markup
  const renderIconAsSVG = () => {
    // Mapping of FontAwesome classes to SVG paths (simplified)
    const iconMap: {[key: string]: string} = {
      'fa-building': 'M3 16V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v12h1V6h2v10h1a1 1 0 0 1 1 1v4a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1v-4a1 1 0 0 1 1-1h1zm2-1h6V5H5v10zm2-8h2v2H7V7zm0 4h2v2H7v-2z',
      'fa-hammer': 'M15.7 5.3l-1.4 1.4L12 4.4l1.4-1.4c.6-.6 1.5-.6 2.1 0l1.4 1.4c.4.3.6 1 .2 1.3-.1.1-.5.6-.4.6zM11 5.9L5.9 11l-4.2 4.2c-.4.4-.4 1 0 1.4l1.4 1.4c.4.4 1 .4 1.4 0L19.1 7.5c.4-.4.4-1 0-1.4L15.7 2.7c-.4-.4-1-.4-1.4 0L11 5.9z',
      'fa-paint-brush': 'M18 4V3h1V1H5v2h1v1H4a2 2 0 0 0-2 2v3a2 2 0 0 0 2 2h1v9a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-9h1a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2zM8 4v11h1V4h1v11h1V4h1v11h1V4h2v11h1V4h1V3H6v1h2z',
      'fa-home': 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z',
      'fa-wrench': 'M6.64 6.46a8 8 0 0 1 11.89 11.89l-8.3 2.2-2.12 2.12-1.4-1.4 2.1-2.12 2.34-8.33L6.64 6.46zm2.83.7a5.87 5.87 0 0 0-1.41 1.4l2.12 2.13L9 15.36l1.41 1.41 4.66-1.4a6 6 0 0 0 1.4-1.41l-4.24-4.24-2.76-2.76z',
      'fa-pencil': 'M16.84 2.73c-.3 0-.62.1-.84.33l-1.8 1.8 3.58 3.58 1.8-1.8c.2-.2.33-.46.33-.74 0-.3-.13-.56-.33-.77l-2.04-2.04c-.22-.22-.5-.36-.7-.36z M3 17.25V21h3.75L17.8 9.94l-3.75-3.75L3 17.25z',
      'fa-drafting-compass': 'M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-3.5 6.5c1.378 0 2.5 1.122 2.5 2.5s-1.122 2.5-2.5 2.5-2.5-1.122-2.5-2.5 1.122-2.5 2.5-2.5zm7 0c1.378 0 2.5 1.122 2.5 2.5s-1.122 2.5-2.5 2.5-2.5-1.122-2.5-2.5 1.122-2.5 2.5-2.5z',
      'fa-tools': 'M3 3a2 2 0 0 1 1.46.43 2 2 0 0 1 .44 2.73L9.11 10l1.06-1.06-4.3-3.57a4 4 0 0 0-.97-5.24 4 4 0 0 0-5.7 0C-1.97 1.28-2.24 3.17-1.37 4.7a4 4 0 0 0 5.22.96l3.57 4.3 7.14-7.14a2 2 0 0 1 2.73.44 2 2 0 0 1-.44 2.73l-7.14 7.14 4.3 3.57a4 4 0 0 0 .96 5.22 4 4 0 0 0 5.7-5.7 4 4 0 0 0-5.23-.97l-3.57-4.3-1.06 1.06 3.57 4.3a2 2 0 0 1-3.17 2.3L3 13.06a2 2 0 0 1 0-2.83 2 2 0 0 1 1.41-.59h.03a2 2 0 0 1 1.39.59L9.11 12l1.06-1.06-3.37-3.38a4 4 0 0 0-2.91-1.17 4 4 0 0 0-2.66 6.95l2.31 2.32a4 4 0 0 0 2.83 1.17 4 4 0 0 0 2.83-1.17l3.38-3.38a4 4 0 0 0 1.11-3.94l-7.44 7.44a2 2 0 0 1-2.83 0L3 12.06a2 2 0 0 1 0-2.83L9.11 3.17a2 2 0 0 1 2.83 0l7.07-7.07a4 4 0 0 0-5.66 0l-3.87 3.87A4 4 0 0 0 8.6 1.38 4 4 0 0 0 3 3z',
      'fa-hard-hat': 'M15 7c-3.3 0-6 2.7-6 6H3c0-6.61 4.97-12 11-12h2c6.04 0 11 5.4 11 12h-6c0-3.3-2.7-6-6-6z M4 15v1c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-1H4z',
      // Default icon
      'default': 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' 
    };
    
    // Extract icon name from the FontAwesome class (fa-xxxx)
    const iconName = icon.split(' ').find(cls => cls.startsWith('fa-')) || '';
    const pathData = iconMap[iconName] || iconMap['default'];
    
    return (
      <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
        <path d={pathData} />
      </svg>
    );
  };

  return (
    <motion.div 
      ref={cardRef}
      className="relative h-full overflow-hidden backdrop-blur-md bg-white/90 rounded-2xl
        border border-emerald-100/50 group p-8 flex flex-col justify-between"
      initial="initial"
      whileHover="hover"
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={isHovered ? get3DTiltEffect(mousePosition, cardRef.current) : {}}
    >
      {/* Floating light effect that follows mouse movement */}
      <motion.div
        className="absolute w-40 h-40 rounded-full bg-gradient-to-br from-emerald-200/40 to-teal-200/30 blur-xl z-0" 
        animate={{
          x: isHovered ? (mousePosition.x - (cardRef.current?.getBoundingClientRect().left || 0)) / 3 : 0, 
          y: isHovered ? (mousePosition.y - (cardRef.current?.getBoundingClientRect().top || 0)) / 3 : 0,
          opacity: isHovered ? 0.7 : 0.3
        }}
        transition={{ type: 'spring', stiffness: 150, damping: 15 }}
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      
      {/* Background panel with gradient */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50/80 rounded-2xl z-0"
        variants={floatingBlobVariants}
      />
      
      {/* Mesh grid for depth - modern Gen-Z trend */}
      <motion.div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-0" 
        style={{
          backgroundImage: 'linear-gradient(var(--emerald-800) 1px, transparent 1px), linear-gradient(to right, var(--emerald-800) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
          '--emerald-800': '#065f46'
        } as React.CSSProperties}
        animate={{ opacity: isHovered ? 0.05 : 0.02 }}
      />
      
      {/* Decorative elements */}
      <motion.div
        className="absolute top-2 right-2 w-32 h-32 bg-emerald-400/10 rounded-full blur-2xl z-0"
        animate={{ 
          scale: isHovered ? 1.1 : 1,
          opacity: isHovered ? 0.15 : 0.1,
          rotate: isHovered ? 10 : 0
        }}
        transition={{ type: 'spring', stiffness: 200 }}
      />
      
      <motion.div
        className="absolute -bottom-10 -left-10 w-40 h-40 bg-teal-300/10 rounded-full blur-2xl z-0"
        animate={{ 
          scale: isHovered ? 1.2 : 1,
          opacity: isHovered ? 0.15 : 0.1,
          rotate: isHovered ? -10 : 0
        }}
        transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
      />
      
      {/* Content with relative positioning for 3D effect */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Icon container with enhanced styling */}
        <motion.div 
          className="relative w-16 h-16 mb-6 text-emerald-600 mx-auto"
          variants={iconVariants}
          animate={{ y: isHovered ? [-2, 2, -2] : 0 }}
          transition={{ y: { repeat: Infinity, duration: 2, ease: 'easeInOut' } }}
          style={{ translateZ: isHovered ? '20px' : '0px' }}
        >
          {/* Modern icon with glow effect */}
          <div className="relative h-full">
            {renderIconAsSVG()}
            
            {/* Glow effect on hover */}
            <motion.div 
              className="absolute inset-0 blur-md opacity-0 text-emerald-400"
              animate={{ opacity: isHovered ? 0.5 : 0 }}
            >
              {renderIconAsSVG()}
            </motion.div>
          </div>
        </motion.div>
        
        {/* Title with enhanced typography and 3D effect */}
        <motion.h3 
          className="relative text-xl md:text-2xl font-bold mb-4 font-playfair z-20 line-clamp-2 text-center"
          style={{ 
            background: 'linear-gradient(90deg, #065f46, #10b981)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% 100%',
            translateZ: isHovered ? '15px' : '0px'
          }}
          animate={{ 
            backgroundPosition: isHovered ? ['0% 50%', '100% 50%', '0% 50%'] : '0% 50%', 
            y: isHovered ? -3 : 0 
          }}
          transition={{ backgroundPosition: { duration: 6, repeat: Infinity } }}
        >
          {title}
        </motion.h3>
        
        {/* Description with 3D effect */}
        <motion.p 
          className="relative text-gray-600 leading-relaxed z-20 line-clamp-4 min-h-[6rem] text-center"
          style={{ translateZ: isHovered ? '10px' : '0px' }}
          animate={{ y: isHovered ? -2 : 0 }}
        >
          {description}
        </motion.p>
        
        {/* Hidden icon that reveals on hover - Gen-Z trend */}
        <motion.div 
          className="absolute bottom-6 right-6 text-emerald-500/0 w-8 h-8"
          animate={{ 
            opacity: isHovered ? 0.3 : 0,
            rotate: isHovered ? 0 : 45
          }}
          transition={{ duration: 0.3 }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </motion.div>
      </div>
      
      {/* Hover effect button */}
      <div className={`relative mt-6 overflow-hidden transition-all duration-500 flex justify-center ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="inline-flex items-center text-emerald-600 font-semibold group-hover:underline">
          Pelajari Lebih Lanjut
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
