import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface NavigationButtonProps {
  direction: 'prev' | 'next';
  onClick: () => void;
  isVisible: boolean;
}

/**
 * Button untuk navigasi keyboard yang elegant dan profesional
 * untuk mengakses kartu layanan
 */
const NavigationButton: React.FC<NavigationButtonProps> = ({ direction, onClick, isVisible }) => (
  <motion.button
    className={`absolute top-1/2 -translate-y-1/2 z-10 backdrop-blur-md bg-navy-800/70 text-emerald-400 w-12 h-12 rounded-full flex items-center justify-center border border-emerald-500/30 ${
      direction === 'prev' ? 'left-4 sm:left-8' : 'right-4 sm:right-8'
    } transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 hover:bg-emerald-500 hover:text-navy-900 hover:border-transparent`}
    onClick={onClick}
    aria-label={direction === 'prev' ? 'Layanan sebelumnya' : 'Layanan berikutnya'}
    initial={{ opacity: 0, x: direction === 'prev' ? -10 : 10 }}
    animate={{ 
      opacity: isVisible ? 1 : 0,
      x: isVisible ? 0 : (direction === 'prev' ? -10 : 10),
      pointerEvents: isVisible ? 'auto' : 'none'
    }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    transition={{ duration: 0.3 }}
  >
    {direction === 'prev' ? <ArrowLeft className="h-5 w-5" /> : <ArrowRight className="h-5 w-5" />}
  </motion.button>
);

export default NavigationButton;
