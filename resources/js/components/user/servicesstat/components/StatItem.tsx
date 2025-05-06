import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { StatItemProps } from '../types';

/**
 * Animation Variants
 * Defines all the animation behavior for the stat card elements
 */
const animations = {
  // Main container animations
  container: {
    hidden: { 
      opacity: 0,
      y: 30
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      scale: 1.03,
      y: -5,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98
    }
  } as Variants,

  // Background gradient animations
  background: {
    initial: {
      opacity: 0
    },
    hover: {
      opacity: 0.2,
      transition: {
        duration: 0.7
      }
    }
  } as Variants,

  // Background glow effect animations
  glow: {
    initial: {
      opacity: 0,
      scale: 1
    },
    hover: {
      scale: 1.2,
      opacity: 0.5,
      transition: {
        duration: 0.8
      }
    }
  } as Variants,

  // Icon animations
  icon: {
    initial: {
      y: 0,
      scale: 1,
      rotateY: 0
    },
    hover: {
      y: [0, -5, 0],
      scale: 1.05,
      rotateY: [0, 10, 0, -10, 0],
      transition: { 
        duration: 2, 
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

  // Pulse effect animations
  pulse: {
    initial: {
      opacity: 0,
      scale: 0.8
    },
    animate: {
      opacity: [0, 0.4, 0],
      scale: [0.8, 1.05, 1.1],
      transition: { 
        duration: 1.5, 
        repeat: Infinity,
        ease: "easeInOut" 
      }
    }
  } as Variants
};

/**
 * CSS classes definitions using Tailwind
 * Organized by component elements
 */
const getClasses = () => ({
  container: [
    "bg-neutral-900 p-8 rounded-xl group border border-neutral-800",
    "hover:border-emerald-500/50 focus-within:border-emerald-500",
    "relative overflow-hidden cursor-pointer h-full",
    "focus:outline-none focus-visible:ring-2 ring-emerald-500",
    "focus-within:ring-offset-2 focus-within:ring-offset-neutral-900"
  ].join(' '),

  backgroundGradient: [
    "absolute -right-20 -top-20 w-60 h-60 rounded-full", 
    "bg-gradient-to-br from-emerald-500/10 to-emerald-500/5", 
    "blur-xl opacity-60"
  ].join(' '),

  backgroundGlow: [
    "absolute -right-10 -bottom-10 w-40 h-40 rounded-full", 
    "bg-emerald-500/10 blur-xl z-0 opacity-0 group-hover:opacity-100", 
    "transition-opacity duration-700"
  ].join(' '),

  iconContainer: [
    "relative text-emerald-500 mb-6",
    "bg-emerald-500/10 p-5 rounded-xl w-fit",
    "group-hover:text-emerald-400"
  ].join(' '),

  iconRing: [
    "absolute inset-0 rounded-xl border-2 border-emerald-500/0", 
    "transition-all duration-500"
  ].join(' '),

  countValue: [
    "font-bold text-3xl sm:text-4xl lg:text-5xl mb-3 font-playfair", 
    "bg-gradient-to-r from-white to-white bg-clip-text", 
    "relative z-10"
  ].join(' '),

  label: [
    "text-neutral-300 font-nunito text-lg relative z-10",
    "bg-gradient-to-r from-neutral-300 to-neutral-300 bg-clip-text"
  ].join(' '),

  highlightLine: [
    "h-1 bg-emerald-500/50 rounded-full mt-2 w-0 group-hover:w-24",
    "transition-all duration-300"
  ].join(' '),

  pulseEffect: "absolute inset-0 rounded-xl border-2 border-emerald-500/30 z-0"
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

/**
 * BackgroundEffects Component - Renders the decorative background elements
 */
const BackgroundEffects: React.FC<{ isHovering: boolean }> = ({ isHovering }) => {
  const classes = getClasses();
  
  return (
    <>
      <motion.div 
        className={classes.backgroundGradient}
        variants={animations.background}
        animate={isHovering ? 'hover' : 'initial'}
        aria-hidden="true"
      />
      
      <motion.div 
        className={classes.backgroundGlow}
        variants={animations.glow}
        animate={isHovering ? 'hover' : 'initial'}
        aria-hidden="true"
      />
      
      {isHovering && (
        <motion.div 
          className={classes.pulseEffect}
          variants={animations.pulse}
          initial="initial"
          animate="animate"
          aria-hidden="true"
        />
      )}
    </>
  );
};

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
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
    
  // Parse the count to get a numerical value for animation
  const numericCount = typeof count === 'number' 
    ? count 
    : parseInt(count.toString().replace(/\D/g, ''));
  
  // Count-up animation effect when element enters viewport
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      
      // Animate the count value
      const duration = 2000; // 2 seconds
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
  
  // Keyboard handler for accessibility
  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };
  
  const classes = getClasses();

  return (
    <motion.div 
      ref={ref}
      className={classes.container}
      onHoverStart={() => setHovering(true)}
      onHoverEnd={() => setHovering(false)}
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
      {/* Background and decorative effects */}
      <BackgroundEffects isHovering={hovering} />
      
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
