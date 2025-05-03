import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';

interface DynamicSpotlightProps {
  hoveredIndex: number | null;
}

/**
 * Spotlight dinamis untuk mengikuti hover pada kartu layanan
 * dengan efek animasi smooth untuk peralihan posisi
 */
const DynamicSpotlight: React.FC<DynamicSpotlightProps> = ({ hoveredIndex }) => {
  const controls = useAnimation();
  
  useEffect(() => {
    if (hoveredIndex !== null) {
      const x = (hoveredIndex % 3) * 330 + 150;
      const y = Math.floor(hoveredIndex / 3) * 350 + 300;
      
      controls.start({
        opacity: 1,
        x: x,
        y: y,
        scale: 1,
        filter: 'blur(80px)',
        transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
      });
    } else {
      controls.start({
        opacity: 0,
        scale: 0.8,
        filter: 'blur(60px)',
        transition: { duration: 1, ease: [0.34, 1.56, 0.64, 1] }
      });
    }
  }, [hoveredIndex, controls]);
  
  return (
    <motion.div 
      className="absolute w-[600px] h-[600px] rounded-full bg-emerald-500/5 pointer-events-none transform -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={controls}
      aria-hidden="true"
    />
  );
};

export default DynamicSpotlight;
