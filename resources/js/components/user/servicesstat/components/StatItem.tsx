import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

// Animation variants
const containerVariants = {
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
    scale: 1.02,
    y: -5
  },
  tap: {
    scale: 0.98
  }
};

const backgroundVariants = {
  initial: {
    opacity: 0
  },
  hover: {
    opacity: 0.2,
    transition: {
      duration: 0.7
    }
  }
};

const glowVariants = {
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
};

const iconVariants = {
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
};

const iconRingVariants = {
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
};

const countVariants = {
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
};

const labelVariants = {
  initial: {
    color: "rgba(212, 212, 212, 0.9)"
  },
  hover: {
    color: "rgba(52, 211, 153, 0.9)",
    transition: {
      duration: 0.3
    }
  }
};

const highlightVariants = {
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
};

const pulseVariants = {
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
};

export interface StatItemProps {
  icon: React.ReactNode;
  count: string | number;
  label: string;
  onClick?: () => void;
}

const StatItem: React.FC<StatItemProps> = ({ icon, count, label, onClick }) => {
  const [hovering, setHovering] = useState(false);
  const [countValue, setCountValue] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const controls = useAnimation();
    
  // Parse the count to get a numerical value for animation
  const numericCount = typeof count === 'number' ? count : parseInt(count.toString().replace(/\D/g, ''));
  
  // Triggered when the element comes into view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
      
      // Animate the count value
      const duration = 2000; // 2 seconds
      const startTime = Date.now();
      
      const animateCount = () => {
        const now = Date.now();
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Use easeOutExpo for smoother animation near the end
        const easeOutExpo = 1 - Math.pow(2, -10 * progress);
        
        // Calculate current count value based on progress
        const current = Math.floor(easeOutExpo * numericCount);
        setCountValue(current);
        
        if (progress < 1) {
          requestAnimationFrame(animateCount);
        } else {
          setCountValue(numericCount);
        }
      };
      
      requestAnimationFrame(animateCount);
    }
  }, [isInView, numericCount, controls]);
    
  // Format the displayed count
  const displayCount = () => {
    if (typeof count === 'string' && count.includes('+')) {
      return `${countValue}+`;
    }
    return countValue;
  };
  
  // Handle keyboard accessibility
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (onClick && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick();
    }
  };
    
  return (
    <motion.div 
      ref={ref}
      className="flex flex-col items-center p-8 rounded-xl bg-neutral-800/30 backdrop-blur-sm border border-neutral-700 hover:border-emerald-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/5 relative overflow-hidden group focus-within:border-emerald-500 focus-within:ring-2 focus-within:ring-emerald-500/30 focus-within:ring-offset-2 focus-within:ring-offset-neutral-900"
      onHoverStart={() => setHovering(true)}
      onHoverEnd={() => setHovering(false)}
      variants={containerVariants}
      initial="hidden"
      animate={controls}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={handleKeyDown}
    >
      {/* Background effects */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
        variants={backgroundVariants}
        animate={hovering ? 'hover' : 'initial'}
      />
      
      <motion.div 
        className="absolute -right-10 -bottom-10 w-40 h-40 rounded-full bg-emerald-500/10 blur-xl z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        variants={glowVariants}
        animate={hovering ? 'hover' : 'initial'}
      />
            
      {/* Icon with animation */}
      <motion.div 
        className="text-emerald-400 text-4xl mb-6 bg-emerald-400/10 p-5 rounded-full relative z-10 group-hover:bg-emerald-400/20 transition-all duration-500"
        variants={iconVariants}
        animate={hovering ? 'hover' : 'initial'}
      >
        {icon}
        <motion.div 
          className="absolute inset-0 rounded-full border border-emerald-400/0 z-0"
          variants={iconRingVariants}
          animate={hovering ? 'hover' : 'initial'}
        />
      </motion.div>
            
      {/* Count number with animation */}
      <motion.h3 
        className="text-white font-playfair text-3xl md:text-5xl lg:text-6xl font-bold mb-3 relative z-10"
        variants={countVariants}
        animate={hovering ? 'hover' : 'initial'}
      >
        {displayCount()}
      </motion.h3>
            
      {/* Label with animation */}
      <motion.p 
        className="text-neutral-300 font-nunito text-center text-lg relative z-10 bg-gradient-to-r from-neutral-300 to-neutral-300 bg-clip-text"
        variants={labelVariants}
        animate={hovering ? 'hover' : 'initial'}
      >
        {label}
      </motion.p>
            
      {/* Bottom highlight line */}
      <motion.div 
        className="h-1 bg-gradient-to-r from-emerald-600 via-emerald-500 to-emerald-400 rounded-full mt-4 w-0 absolute bottom-0"
        variants={highlightVariants}
        animate={hovering ? 'hover' : 'initial'}
      />
            
      {/* Subtle pulse effect on hover */}
      {hovering && (
        <motion.div 
          className="absolute inset-0 rounded-xl border-2 border-emerald-500/30 z-0"
          variants={pulseVariants}
          initial="initial"
          animate="animate"
        />
      )}
    </motion.div>
  );
};

export default StatItem;
