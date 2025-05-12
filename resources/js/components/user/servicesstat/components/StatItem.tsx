import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { StatItemProps } from '../types';

/**
 * Animation Variants
 * Defines all the animation behavior for the stat card elements
 * Optimized for better mobile performance
 */
const animations = {
  // Main container animations
  container: {
    hidden: { 
      opacity: 0,
      y: 20 // Reduced y offset for faster rendering on mobile
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.5, // Slightly faster for mobile
        ease: "easeOut",
        type: "spring",
        stiffness: 90, // Slightly reduced stiffness for performance
        damping: 15
      }
    },
    hover: {
      scale: 1.02, // Reduced scale for less GPU strain
      y: -3, // Reduced lift effect for mobile
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98
    }
  } as Variants,

  // Background animations removed


  // Icon animations - optimized for mobile
  icon: {
    initial: {
      y: 0,
      scale: 1,
      rotateY: 0
    },
    hover: {
      y: [0, -3, 0], // Reduced movement for mobile
      scale: 1.03, // More subtle scale effect
      rotateY: [0, 5, 0, -5, 0], // Reduced rotation for better performance
      transition: { 
        duration: 1.8, // Slightly faster for better mobile performance
        repeat: Infinity,
        repeatType: "loop" as const,
        ease: "easeInOut"
      }
    }
  } as Variants,

  // Icon ring animations
  iconRing: {
    initial: {
      scale: 1,
      opacity: 1,
      borderColor: "rgba(52, 211, 153, 0)"
    },
    hover: {
      scale: [1, 1.4, 1],
      opacity: [1, 0, 1],
      borderColor: "rgba(52, 211, 153, 0.3)",
      transition: {
        duration: 1.5,
        repeat: Infinity,
        repeatType: "loop" as const
      }
    }
  } as Variants,

  // Count value text animations
  count: {
    initial: {
      scale: 1,
      color: "#ffffff"
    },
    hover: {
      scale: 1.03,
      color: "#10b981",
      transition: {
        duration: 0.3
      }
    }
  } as Variants,

  // Label text animations
  label: {
    initial: {
      color: "rgba(212, 212, 212, 0.9)"
    },
    hover: {
      color: "rgba(52, 211, 153, 0.9)",
      transition: {
        duration: 0.3
      }
    }
  } as Variants,

  // Highlight line animations
  highlight: {
    initial: {
      width: '0%',
      opacity: 0.7
    },
    hover: {
      width: '70%',
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  } as Variants,

  // Pulse animation removed
};

/**
 * CSS classes definitions using Tailwind
 * Enhanced for mobile usability
 */
const getClasses = () => ({
  container: [
    "bg-neutral-900 p-5 sm:p-8 rounded-xl group border border-neutral-800", // Reduced padding on mobile
    "hover:border-emerald-500/50 focus-within:border-emerald-500 active:border-emerald-500", // Added active state for touch
    "relative overflow-hidden cursor-pointer h-full flex flex-col items-center text-center",
    "focus:outline-none focus-visible:ring-2 ring-emerald-500",
    "focus-within:ring-offset-2 focus-within:ring-offset-neutral-900",
    "touch-action-manipulation" // Improved touch handling
  ].join(' '),

  // Background effects removed as requested
  backgroundGradient: "",
  backgroundGlow: "",

  iconContainer: [
    "relative text-emerald-500 mb-4 sm:mb-5", // Reduced margin on mobile
    "bg-emerald-500/10 p-4 rounded-xl w-fit mx-auto", // Centered icon with mx-auto
    "group-hover:text-emerald-400"
  ].join(' '),

  iconRing: [
    "absolute inset-0 rounded-xl border-2 border-emerald-500/0", 
    "transition-all duration-500"
  ].join(' '),

  countValue: [
    "text-4xl sm:text-5xl font-playfair font-bold text-white mb-1 transition-colors duration-300",
    "relative z-10 mx-auto text-center" // Ensure text is above backgrounds and centered
  ].join(' '),

  label: [
    "text-base sm:text-lg font-nunito text-neutral-300 relative text-center",
    "transition-colors duration-300 mx-auto"
  ].join(' '),

  highlightLine: [
    "h-1 bg-emerald-500/50 rounded-full mt-2 w-0 group-hover:w-16",
    "transition-all duration-300 mx-auto" // Center the highlight line
  ].join(' '),

});

/**
 * Utility functions for the StatItem component
 */
const utils = {
  /**
   * Format a count value with appropriate suffix
   * @param rawCount - Original count value from props
   * @param currentValue - Current animated count value
   * @returns Formatted count value with suffix if needed
   */
  formatCountValue: (rawCount: string | number, currentValue: number): string | number => {
    if (typeof rawCount === 'string' && rawCount.includes('+')) {
      return `${currentValue}+`;
    }
    return currentValue;
  },

  /**
   * Easing function for smoother count animation
   * Uses exponential ease-out for a natural feel
   */
  easeOutExpo: (x: number): number => {
    return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
  }
};

// BackgroundEffects component completely removed

/**
 * StatIcon Component - Renders the animated icon
 */
const StatIcon: React.FC<{ 
  icon: React.ReactNode; 
  isHovering: boolean;
}> = ({ icon, isHovering }) => {
  const classes = getClasses();
  
  return (
    <motion.div 
      className={classes.iconContainer}
      variants={animations.icon}
      animate={isHovering ? 'hover' : 'initial'}
      aria-hidden="true"
    >
      {icon}
    </motion.div>
  );
};

/**
 * StatContent Component - Renders the count value and label with animations
 */
const StatContent: React.FC<{
  count: string | number;
  countValue: number;
  label: string;
  isHovering: boolean;
}> = ({ count, countValue, label, isHovering }) => {
  const classes = getClasses();
  
  return (
    <>
      <motion.h3 
        className={classes.countValue}
        variants={animations.count}
        animate={isHovering ? 'hover' : 'initial'}
      >
        {utils.formatCountValue(count, countValue)}
      </motion.h3>
      
      <motion.p 
        className={classes.label}
        variants={animations.label}
        animate={isHovering ? 'hover' : 'initial'}
      >
        {label}
        <motion.div 
          className={classes.highlightLine}
          variants={animations.highlight}
          animate={isHovering ? 'hover' : 'initial'}
          aria-hidden="true"
        />
      </motion.p>
    </>
  );
};

/**
 * StatItem Component
 * 
 * Displays an animated statistic card with icon, count value that animates on scroll into view,
 * and a descriptive label. Features smooth animations and hover effects.
 * Optimized for mobile performance and touch interaction.
 * 
 * @param icon - React element to display as the statistic icon
 * @param count - Numeric value to display (can include suffix like '+')
 * @param label - Description text for the statistic
 * @param onClick - Optional click handler for the card
 */
const StatItem: React.FC<StatItemProps> = ({ icon, count, label, onClick }) => {
  // State for managing animations
  const [countValue, setCountValue] = useState<number>(0);
  const [hovering, setHovering] = useState<boolean>(false);
  
  // Ref & animation hooks for scroll detection
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 }); // Trigger earlier on mobile
  const controls = useAnimation();
    
  // Parse the count to get a numerical value for animation
  const numericCount = typeof count === 'number' 
    ? count 
    : parseInt(count.toString().replace(/\D/g, ''));
  
  // Count-up animation effect when element enters viewport
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      
      // Animate the count value - optimized for better performance
      const duration = 1800; // Slightly faster for mobile (1.8 seconds)
      const startTime = Date.now();
      
      const animateCount = (): void => {
        const now = Date.now();
        const elapsed = now - startTime;
        
        // Calculate current count based on elapsed time
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = utils.easeOutExpo(progress);
        const current = Math.floor(easedProgress * numericCount);
        
        setCountValue(current);
        
        // Continue animation until complete
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      
      animateCount();
    }
  }, [isInView, numericCount, controls]);
  
  // Handlers for touch and keyboard interaction
  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };

  // Special handler for touch devices
  const handleTouchStart = () => {
    setHovering(true);
  };
  
  const handleTouchEnd = () => {
    // Slight delay to ensure hover effects are visible
    setTimeout(() => setHovering(false), 300);
  };
  
  const classes = getClasses();

  return (
    <motion.div 
      ref={ref}
      className={classes.container}
      onHoverStart={() => setHovering(true)}
      onHoverEnd={() => setHovering(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      variants={animations.container}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      role={onClick ? "button" : "region"}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? handleKeyDown : undefined}
      aria-label={`Statistic: ${label} - ${utils.formatCountValue(count, countValue)}`}
    >
      {/* Background and decorative effects removed */}
      
      {/* Stat icon */}
      <StatIcon icon={icon} isHovering={hovering} />
      
      {/* Stat content - count and label */}
      <StatContent 
        count={count}
        countValue={countValue}
        label={label}
        isHovering={hovering}
      />
    </motion.div>
  );
};

export default StatItem;
