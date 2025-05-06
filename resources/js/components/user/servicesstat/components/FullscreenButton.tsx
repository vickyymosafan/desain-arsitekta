import React from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

/**
 * FullscreenButton Component
 * 
 * A reusable button component for toggling fullscreen mode with animations.
 * Features include customizable position, label, and responsive design.
 */

// Types and Interfaces
// --------------------
type PositionOption = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

interface FullscreenButtonProps {
  isFullscreen: boolean;
  onClick: () => void;
  position?: PositionOption;
  label?: string;
}

// Animation Variants
// -----------------
const animations = {
  button: {
    initial: (isFullscreen: boolean): object => ({ 
      opacity: 0, 
      y: isFullscreen ? -10 : 10 
    }),
    animate: { 
      opacity: 1, 
      y: 0 
    },
    exit: { 
      opacity: 0, 
      scale: 0.9 
    },
    hover: { 
      scale: 1.05 
    },
    tap: { 
      scale: 0.95 
    }
  } as Variants,

  icon: {
    initial: { 
      rotate: -15, 
      opacity: 0 
    },
    animate: { 
      rotate: 0, 
      opacity: 1 
    },
    exit: { 
      rotate: 15, 
      opacity: 0 
    }
  } as Variants,

  label: {
    initial: { 
      opacity: 0, 
      x: -5 
    },
    animate: { 
      opacity: 1, 
      x: 0 
    }
  } as Variants,

  pulse: {
    animate: { 
      scale: [1, 1.1, 1],
      opacity: [0.7, 0.3, 0.7]
    }
  } as Variants
};

// Constants
// ---------
const POSITION_CLASSES: Record<PositionOption, string> = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4'
};

// Icon Components
// --------------
const CloseIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/svg" 
    className="h-5 w-5" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M6 18L18 6M6 6l12 12" 
    />
  </svg>
);

const ExpandIcon: React.FC = () => (
  <svg 
    xmlns="http://www.w3.org/svg" 
    className="h-5 w-5" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
    aria-hidden="true"
  >
    <path 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      strokeWidth={2} 
      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" 
    />
  </svg>
);

/**
 * Generates class names for the fullscreen button
 */
const getButtonClasses = (hasLabel: boolean): string => {
  return [
    'flex items-center gap-2',
    'bg-neutral-900/80 backdrop-blur-md p-2',
    hasLabel ? 'pl-3 pr-4 rounded-full' : 'rounded-full',
    'border border-emerald-500/40 text-emerald-400',
    'hover:bg-emerald-500/20 hover:border-emerald-500/60',
    'focus:outline-none focus:ring-2 focus:ring-emerald-500/50',
    'focus:ring-offset-2 focus:ring-offset-neutral-900',
    'transition-all duration-300',
    'shadow-lg shadow-emerald-900/30'
  ].join(' ');
};

/**
 * FullscreenButton Component
 */
const FullscreenButton: React.FC<FullscreenButtonProps> = ({ 
  isFullscreen, 
  onClick,
  position = 'top-right',
  label
}) => {
  // Accessibility text for screen readers
  const accessibilityText = isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen";
  
  // Generate button classes based on label presence
  const buttonClasses = getButtonClasses(!!label);
  
  return (
    <motion.div 
      className={`absolute ${POSITION_CLASSES[position]} z-50 flex items-center`}
      role="region"
      aria-live="polite"
    >
      <motion.button
        onClick={onClick}
        className={buttonClasses}
        variants={animations.button}
        initial="initial"
        animate="animate"
        exit="exit"
        whileHover="hover"
        whileTap="tap"
        custom={isFullscreen}
        title={accessibilityText}
        aria-label={accessibilityText}
      >
        {/* Icon with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={isFullscreen ? 'exit' : 'enter'}
            variants={animations.icon}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.2 }}
          >
            {isFullscreen ? <CloseIcon /> : <ExpandIcon />}
          </motion.div>
        </AnimatePresence>
        
        {/* Label with animation, conditionally rendered */}
        {label && (
          <motion.span 
            className="font-nunito text-sm font-medium"
            variants={animations.label}
            initial="initial"
            animate="animate"
            transition={{ delay: 0.1 }}
          >
            {isFullscreen ? "Tutup" : label}
          </motion.span>
        )}
        
        {/* Pulse animation effect for non-fullscreen state */}
        {!isFullscreen && (
          <motion.span 
            className="absolute inset-0 rounded-full border-2 border-emerald-500/30"
            variants={animations.pulse}
            animate="animate"
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            aria-hidden="true"
          />
        )}
      </motion.button>
    </motion.div>
  );
};

export default FullscreenButton;
