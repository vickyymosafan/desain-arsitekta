import React from 'react';
import { motion } from 'framer-motion';
import StatItem from './StatItem';
import LazyFullscreenButton from './ui/LazyFullscreenButton';
import { containerVariants, itemVariants } from '../animations/variants';
import { ANIMATION_VIEWPORT } from '../types';
import { statsData } from '../data/servicesStatData';

interface StatsSectionProps {
  openFullscreen: () => void;
  isDesktopOnly: boolean;
}

/**
 * Stats Section component
 * Displays company statistics in a responsive grid
 */
const StatsSection: React.FC<StatsSectionProps> = ({ openFullscreen, isDesktopOnly }) => {
  return (
    <motion.div 
      className="relative mb-12 md:mb-20 flex justify-center items-center w-full"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={ANIMATION_VIEWPORT}
    >
      {isDesktopOnly && (
        <div className="absolute top-30 -right-4 z-20">
          <LazyFullscreenButton 
            isFullscreen={false} 
            onClick={openFullscreen} 
            position="top-right"
            label="Perbesar"
          />
        </div>
      )}
      
      <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto px-4 md:px-0 w-full">
        {statsData.map((stat, index) => (
          <motion.div key={index} variants={itemVariants}>
            <StatItem 
              icon={stat.icon}
              count={stat.count}
              label={stat.label}
              onClick={openFullscreen}
            />
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

/**
 * Stats Fullscreen content component
 * Used in fullscreen display mode
 */
export const StatsFullscreenContent: React.FC = () => (
  <motion.div 
    className="grid grid-cols-1 md:grid-cols-3 gap-12"
    variants={containerVariants}
    initial="hidden"
    animate="visible"
  >
    {statsData.map((stat, index) => (
      <motion.div 
        key={index} 
        variants={itemVariants}
        className="transform transition-transform duration-300"
      >
        <StatItem 
          icon={stat.icon}
          count={stat.count}
          label={stat.label}
        />
      </motion.div>
    ))}
  </motion.div>
);

export default StatsSection;
