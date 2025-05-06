import React from 'react';
import { motion } from 'framer-motion';
import { FullscreenSectionProps } from '../../types';
import AnimatedBackground from './AnimatedBackground';
import FullscreenButton from '../FullscreenButton';

/**
 * Fullscreen section component
 * Creates an immersive fullscreen overlay for expanded content viewing
 */
const FullscreenSection: React.FC<FullscreenSectionProps> = ({ 
  title, 
  children, 
  scrollY,
  onClose
}) => (
  <motion.div 
    className="fixed inset-0 bg-black/95 backdrop-blur-lg z-50 flex items-center justify-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
  >
    <AnimatedBackground scrollY={scrollY} density={15} />
    <FullscreenButton 
      isFullscreen={true} 
      onClick={onClose} 
      position="top-right"
      label="Tutup"
    />
    
    <motion.div 
      className="container mx-auto px-4 py-8 relative z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <motion.h2 
        className="text-4xl md:text-6xl font-bold text-white mb-12 text-center font-playfair"
        animate={{ y: [10, 0], opacity: [0, 1] }}
        transition={{ duration: 0.6 }}
      >
        <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
          {title}
        </span>
      </motion.h2>
      
      {children}
    </motion.div>
  </motion.div>
);

export default FullscreenSection;
