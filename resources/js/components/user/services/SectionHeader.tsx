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
 * Didesain khusus untuk profesional di bidang arsitektur dan desain interior
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  description, 
  className = '',
  titleId
}) => {
  return (
    <div className={`mx-auto text-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <h2 
          id={titleId} 
          className="text-3xl md:text-4xl lg:text-5xl font-medium bg-gradient-to-r from-emerald-400 to-emerald-300 bg-clip-text text-transparent mb-6"
        >
          {title}
        </h2>
        
        <div className="flex items-center justify-center space-x-3 mb-8" aria-hidden="true">
          <div className="h-[1px] w-12 rounded-full bg-emerald-400/30"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/70"></div>
          <div className="h-[3px] w-16 rounded-full bg-emerald-400/80"></div>
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400/70"></div>
          <div className="h-[1px] w-12 rounded-full bg-emerald-400/30"></div>
        </div>

        <motion.p 
          className="text-gray-300 text-base md:text-lg leading-relaxed max-w-3xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          {description}
        </motion.p>
      </motion.div>
    </div>
  );
};

export default SectionHeader;
