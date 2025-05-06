import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation, Variants } from 'framer-motion';
import { StatItemProps } from '../types';

// Animation Variants
const animations = {
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

// Utility to format a count value with appropriate suffix
function formatCountValue(rawCount: string | number, currentValue: number): string | number {
  if (typeof rawCount === 'string' && rawCount.includes('+')) {
    return `${currentValue}+`;
  }
  return currentValue;
}

/**
 * StatItem Component
 * 
 * Displays an animated statistic card with icon, count value that animates on scroll into view,
 * and a descriptive label. Includes hover animations and optional click interaction.
 */
const StatItem: React.FC<StatItemProps> = ({ icon, count, label, onClick }) => {
  // State for managing animations
  const [countValue, setCountValue] = useState(0);
  const [hovering, setHovering] = useState(false);
  
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
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easeOutQuart easing function for a natural counting effect
        const easing = 1 - Math.pow(1 - progress, 4);
        const current = Math.floor(easing * numericCount);
        
        setCountValue(current);
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [isInView, numericCount, controls]);
  
  // Keyboard handler for accessibility
  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick?.();
    }
  };
  
  // CSS classes using tailwind
  const classes = {
    container: [
      "relative h-full w-full py-8 px-6 rounded-2xl overflow-hidden flex flex-col items-center justify-center", 
      "cursor-pointer transition-all duration-300 group",
      "bg-gradient-to-b from-neutral-800/80 to-neutral-900/90",
      "border border-neutral-700/30 backdrop-blur-sm",
      "shadow-lg shadow-emerald-900/5 hover:shadow-xl hover:shadow-emerald-500/10", 
      "focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/30", 
      "focus-within:ring-offset-2 focus-within:ring-offset-neutral-900"
    ].join(' '),

    backgroundGradient: [
      "absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent", 
      "opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
    ].join(' '),

    backgroundGlow: [
      "absolute -right-10 -bottom-10 w-40 h-40 rounded-full", 
      "bg-emerald-500/10 blur-xl z-0 opacity-0 group-hover:opacity-100", 
      "transition-opacity duration-700"
    ].join(' '),

    iconContainer: [
      "relative text-emerald-500 mb-5 p-4 rounded-full", 
      "bg-emerald-500/10 w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center", 
      "border border-emerald-500/30"
    ].join(' '),

    iconRing: [
      "absolute inset-0 rounded-full border-2 border-emerald-500/0", 
      "transition-all duration-500"
    ].join(' '),

    countValue: [
      "font-bold text-3xl sm:text-4xl lg:text-5xl mb-3 font-playfair", 
      "bg-gradient-to-r from-white to-white bg-clip-text", 
      "relative z-10"
    ].join(' '),

    label: [
      "text-neutral-300 font-nunito text-center text-base sm:text-lg relative z-10", 
      "bg-gradient-to-r from-neutral-300 to-neutral-300 bg-clip-text"
    ].join(' '),

    highlightLine: [
      "h-1 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400", 
      "rounded-full mt-3 mx-auto w-0 absolute bottom-4 left-1/2 transform -translate-x-1/2"
    ].join(' '),

    pulseEffect: "absolute inset-0 rounded-xl border-2 border-emerald-500/30 z-0"
  };

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
      aria-label={`Statistic: ${label} - ${formatCountValue(count, countValue)}`}
    >
      {/* Background gradient effect */}
      <motion.div 
        className={classes.backgroundGradient}
        variants={animations.background}
        animate={hovering ? 'hover' : 'initial'}
        aria-hidden="true"
      />
      
      {/* Background glow effect */}
      <motion.div 
        className={classes.backgroundGlow}
        variants={animations.glow}
        animate={hovering ? 'hover' : 'initial'}
        aria-hidden="true"
      />
            
      {/* Icon with animation */}
      <motion.div 
        className={classes.iconContainer}
        variants={animations.icon}
        animate={hovering ? 'hover' : 'initial'}
        aria-hidden="true"
      >
        {icon}
        <motion.div 
          className={classes.iconRing}
          variants={animations.iconRing}
          animate={hovering ? 'hover' : 'initial'}
          aria-hidden="true"
        />
      </motion.div>
            
      {/* Animated count value */}
      <motion.h3 
        className={classes.countValue}
        variants={animations.count}
        animate={hovering ? 'hover' : 'initial'}
      >
        {formatCountValue(count, countValue)}
      </motion.h3>
            
      {/* Label with animation */}
      <motion.p 
        className={classes.label}
        variants={animations.label}
        animate={hovering ? 'hover' : 'initial'}
      >
        {label}
      </motion.p>
            
      {/* Bottom highlight line */}
      <motion.div 
        className={classes.highlightLine}
        variants={animations.highlight}
        animate={hovering ? 'hover' : 'initial'}
        aria-hidden="true"
      />
            
      {/* Subtle pulse effect on hover */}
      {hovering && (
        <motion.div 
          className={classes.pulseEffect}
          variants={animations.pulse}
          initial="initial"
          animate="animate"
          aria-hidden="true"
        />
      )}
    </motion.div>
  );
};

export default StatItem;
