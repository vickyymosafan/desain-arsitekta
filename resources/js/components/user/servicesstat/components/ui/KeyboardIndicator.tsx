import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { KeyboardIndicatorProps } from '../../types';

/**
 * Visual indicator for keyboard navigation
 * Shows a tooltip with keyboard shortcuts when in fullscreen mode
 */
const KeyboardIndicator: React.FC<KeyboardIndicatorProps> = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div 
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-neutral-900/80 backdrop-blur-md border border-emerald-500/30 rounded-full py-2 px-4 text-sm font-nunito text-emerald-400 z-50 shadow-lg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="flex items-center gap-2">
          <span>Tekan</span>
          <kbd className="bg-neutral-800 px-2 py-1 rounded border border-neutral-700 text-white">ESC</kbd>
          <span>untuk keluar</span>
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default KeyboardIndicator;
