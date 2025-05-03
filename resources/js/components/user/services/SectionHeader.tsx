import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  description: string;
  className?: string;
  titleId?: string;
}

/**
 * Komponen untuk menampilkan header section dengan animasi dan styling yang konsisten
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  description, 
  className = '',
  titleId
}) => {
  return (
    <div className={`max-w-2xl mx-auto text-center mb-16 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 
          id={titleId} 
          className="text-3xl md:text-4xl font-medium bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent mb-4"
        >
          {title}
        </h2>
        
        <div className="flex items-center justify-center space-x-2 mb-6" aria-hidden="true">
          <div className="h-[2px] w-4 rounded-full bg-emerald-400/40"></div>
          <div className="h-[2px] w-16 rounded-full bg-emerald-400/70"></div>
          <div className="h-[2px] w-4 rounded-full bg-emerald-400/40"></div>
        </div>

        <motion.p 
          className="text-gray-300 text-base md:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SectionHeader;
