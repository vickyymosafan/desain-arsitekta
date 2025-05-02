import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ServiceCardProps } from './types';
import { get3DTiltEffect, getAnimationVariant, sharedAnimations } from './animationUtils';

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
  
  // Using shared animations
  const { card, icon: iconVariants, floatingBlob } = sharedAnimations;
  
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
      variants={card}
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
        variants={floatingBlob}
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
        
        {/* Title with animated underline on hover */}
        <motion.h3 
          className="text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center"
          style={{ translateZ: isHovered ? '15px' : '0px' }}
        >
          <span className="relative inline-block">
            {title}
            <motion.span 
              className="absolute bottom-0 left-0 w-full h-px bg-emerald-500"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isHovered ? 1 : 0 }}
              exit={{ scaleX: 0 }}
              transition={{ duration: 0.3 }}
            />
          </span>
        </motion.h3>
        
        {/* Description with slight depth effect */}
        <motion.p 
          className="text-gray-600 text-center flex-grow mb-6"
          style={{ translateZ: isHovered ? '10px' : '0px' }}
          animate={{ 
            opacity: isHovered ? 1 : 0.8,
            y: isHovered ? 0 : 5  
          }}
          transition={{ duration: 0.3 }}
        >
          {description}
        </motion.p>
        
        {/* Learn More button with animations */}
        <motion.div
          className="mt-auto text-center"
          style={{ translateZ: isHovered ? '25px' : '0px' }}
        >
          <motion.button
            className="px-5 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-md font-medium text-sm 
              shadow-md hover:shadow-lg transform transition-all duration-300 overflow-hidden relative"
            whileHover={{ 
              scale: 1.05, 
              boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.4)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.span 
              className="absolute inset-0 bg-white"
              initial={{ scale: 0, borderRadius: '100%', x: '50%', y: '50%' }}
              whileHover={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
            />
            <span className="relative z-10">Pelajari Lebih Lanjut</span>
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
