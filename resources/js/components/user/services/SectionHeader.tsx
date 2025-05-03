import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeaderProps {
  title: string;
  description: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  description, 
  className = ''
}) => {
  return (
    <div className={`max-w-3xl mx-auto text-center mb-16 ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-playfair font-bold bg-gradient-to-r from-emerald-600 to-emerald-400 bg-clip-text text-transparent mb-4">
          {title}
        </h2>
        
        <div className="flex items-center justify-center space-x-2 mb-6">
          <div className="h-[3px] w-6 rounded-full bg-emerald-300"></div>
          <div className="h-[3px] w-16 rounded-full bg-emerald-500"></div>
          <div className="h-[3px] w-6 rounded-full bg-emerald-300"></div>
        </div>

        <motion.p 
          className="text-gray-600 text-lg"
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
