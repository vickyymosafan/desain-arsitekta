import React from 'react';
import { motion } from 'framer-motion';
import StatItem from './StatItem';
import { containerVariants, itemVariants } from '../animations/variants';
import { statsData } from '../data/servicesStatData';

const StatsFullscreenContent: React.FC = () => (
  <section className="relative w-full overflow-hidden">
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center justify-center py-10">
      <motion.p 
        className="text-neutral-300 max-w-3xl mx-auto font-nunito text-lg mb-10 text-center px-4 sm:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        Angka-angka yang menunjukkan dedikasi dan kualitas kami dalam dunia arsitektur dan konstruksi.
      </motion.p>
      
      <motion.div 
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-16 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {statsData.map((stat, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants}
            className="flex justify-center items-center"
          >
            <div className="w-full max-w-xs">
              <StatItem 
                icon={stat.icon}
                count={stat.count}
                label={stat.label}
              />
            </div>
          </motion.div>
        ))}
      </motion.div>
      
      {/* Background decorative elements completely removed */}
    </div>
  </section>
);

export default StatsFullscreenContent;
