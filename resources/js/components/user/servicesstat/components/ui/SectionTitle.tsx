import React from 'react';
import { motion } from 'framer-motion';
import { SectionTitleProps } from '../../types';
import { titleAnimationProps, subtitleAnimationProps } from '../../animations/variants';

/**
 * Enhanced Section title component with better animation
 * Splits the title into two parts with the second part highlighted
 */
const SectionTitle: React.FC<SectionTitleProps> = ({ title, subtitle, className = '' }) => {
  const [firstWord, secondWord] = title.split(' ');
  
  return (
    <motion.div 
      className={`text-center mb-16 ${className}`}
      {...titleAnimationProps}
    >
      <h2 className="text-3xl md:text-5xl font-bold font-playfair text-white mb-4 relative">
        <span className="relative inline-block px-10">
          <span className="absolute -top-5 -left-2 text-7xl text-emerald-500/10 font-playfair">"</span>
          {firstWord} <span className="text-emerald-500 relative">
            {secondWord}
            <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 15" width="100%" height="15">
              <path d="M0,7.5 Q25,15 50,7.5 Q75,0 100,7.5" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </span>
          <span className="absolute -top-5 -right-2 text-7xl text-emerald-500/10 font-playfair">"</span>
        </span>
      </h2>
      <motion.p 
        className="text-neutral-300 max-w-2xl mx-auto font-nunito text-lg mb-10"
        {...subtitleAnimationProps}
      >
        {subtitle}
      </motion.p>
    </motion.div>
  );
};

export default SectionTitle;
