import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface SparkleIconProps {
  isHovered: boolean;
}

/**
 * Animasi sparkle pada judul section dengan efek hover
 * untuk memberikan sentuhan interaktif
 */
const SparkleIcon: React.FC<SparkleIconProps> = ({ isHovered }) => (
  <motion.div 
    className="absolute -top-14 left-1/2 -translate-x-1/2 text-emerald-400 opacity-75 hidden sm:block"
    animate={{ 
      y: isHovered ? [0, -10, 0] : 0,
      rotate: isHovered ? [0, 5, -5, 0] : 0,
      scale: isHovered ? [1, 1.1, 1] : 1,
      filter: isHovered ? ["drop-shadow(0 0 0.2rem rgba(52, 211, 153, 0.3))", "drop-shadow(0 0 0.5rem rgba(52, 211, 153, 0.5))", "drop-shadow(0 0 0.2rem rgba(52, 211, 153, 0.3))"] : "drop-shadow(0 0 0.2rem rgba(52, 211, 153, 0.3))"
    }}
    transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, repeatType: 'loop' }}
    aria-hidden="true"
  >
    <Sparkles className="w-9 h-9" />
  </motion.div>
);

export default SparkleIcon;
