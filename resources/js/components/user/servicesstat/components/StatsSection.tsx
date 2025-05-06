import React from 'react';
import { motion } from 'framer-motion';
import StatItem from './StatItem';
import { containerVariants, itemVariants } from '../animations/variants';
import { statsData } from '../data/servicesStatData';

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

export default StatsFullscreenContent;
