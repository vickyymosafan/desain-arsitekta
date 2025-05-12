import React from 'react';
import { motion, Variants } from 'framer-motion';

// Import shared utilities
import { transitions, createAnimationProps, animationVariants } from '../../../../utils/animations';
import { colors, shadows } from '../../../../utils/styles';

// Component-specific imports
import { ServiceCardProps } from '../types';

/**
 * Animation variants for the service card and its elements
 * Each group controls a specific part of the card's animation behavior
 * Using centralized animation transitions for consistency
 */
const animations = {
  // Main card container animations
  card: {
    hover: { 
      y: -8, 
      boxShadow: shadows.xl.replace('rgba(0, 0, 0', `rgba(${colors.primary[500].replace('#', '')}`),
      transition: transitions.spring
    },
    tap: { 
      scale: 0.98,
      transition: transitions.fast
    }
  } as Variants,

  // Glow effect animations - utilizing the transition utilities
  // to avoid redundancy with shared transition patterns
  background: {
    initial: { 
      scale: 1,
      opacity: 0.6,
      rotate: 0,
      x: 0,
      y: 0
    },
    animate: {
      scale: [1, 1.05, 0.98, 1.08, 1.02, 1],
      opacity: [0.5, 0.65, 0.58, 0.7, 0.62, 0.5],
      rotate: [0, 2, -1, 3, -2, 0],
      x: [0, -8, 4, -12, 6, 0],
      y: [0, 6, -8, 3, -4, 0],
      transition: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 12,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: 'easeInOut'
      }
    },
    hover: { 
      scale: 1.25, 
      x: -10,
      y: 5,
      opacity: 0.85,
      rotate: 5,
      transition: {
        ...transitions.slow,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  } as Variants,
  
  // Secondary glow using the same pattern to stay DRY
  backgroundSecondary: {
    initial: {
      scale: 0.8,
      opacity: 0.4,
      x: -15,
      y: 10
    },
    animate: {
      scale: [0.8, 0.85, 0.9, 0.87, 0.83, 0.8],
      opacity: [0.4, 0.55, 0.5, 0.6, 0.45, 0.4],
      x: [-15, -20, -5, -25, -10, -15],
      y: [10, 15, 5, 18, 8, 10],
      transition: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 15,
        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
        ease: 'easeInOut'
      }
    },
    hover: {
      scale: 1.15,
      opacity: 0.7,
      x: -25,
      y: 15,
      transition: transitions.slow
    }
  } as Variants,

  // Utilizing the basic fadeIn pattern from shared utilities and extending it
  // Icon animations with staggered entrance and spring effect
  icon: {
    initial: { opacity: 0 },
    animate: (delay: number) => ({ 
      opacity: 1, 
      transition: { ...transitions.default, delay } 
    }),
    hover: { 
      rotate: 5,
      transition: transitions.spring
    }
  } as Variants,

  // Title text animations - similar to slideUp from shared animations
  title: {
    initial: { 
      opacity: 0, 
      y: 10 
    },
    animate: (delay: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { ...transitions.spring, delay: delay + 0.1 } 
    })
  } as Variants,

  // Clean underline animation effect
  underline: {
    initial: { width: 0 },
    animate: { 
      width: 24,
      transition: { ...transitions.default, delay: 0.3 }
    },
    hover: { 
      width: 36,
      transition: transitions.spring
    }
  } as Variants,

  // Description text fade-in using shared slow transition
  description: {
    ...animationVariants.fadeInSlow,
    animate: (delay: number) => ({ 
      opacity: 1, 
      transition: { ...transitions.slow, delay: delay + 0.2 } 
    })
  } as Variants,

  // Interactive element animations reused across components
  link: {
    initial: {},
    hover: { 
      x: 2,
      transition: transitions.spring
    },
    tap: { 
      scale: 0.95,
      transition: transitions.fast
    }
  } as Variants,

  // Simple looping animation for the arrow
  arrow: {
    animate: { 
      x: [0, 3, 0],
      transition: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 1.5,
        ease: 'easeInOut'
      }
    }
  } as Variants
};

/**
 * CSS classes using Tailwind, organized by component elements
 * Grouped and joined for better readability and maintenance
 * Using color variables from shared styles for consistency
 */
const getClasses = () => ({
  card: [
    "bg-neutral-900/90 p-8 rounded-xl group border border-neutral-800", 
    "hover:border-emerald-500/60 focus-within:border-emerald-500/80", 
    "h-full relative backdrop-blur-sm transition-all duration-700 overflow-hidden"
  ].join(' '),
  
  // Primary glow effect with soft edges
  backgroundEffect: [
    "absolute -right-32 -top-28 w-96 h-96 rounded-[65%] transform-gpu will-change-transform", 
    "bg-gradient-radial from-emerald-400/30 via-emerald-500/20 to-transparent", 
    "blur-3xl mix-blend-soft-light transition-all duration-1000"
  ].join(' '),
  
  // Secondary subtle glow for added dimension
  backgroundSecondaryEffect: [
    "absolute -right-20 -top-36 w-80 h-80 rounded-[40%] transform-gpu will-change-transform", 
    "bg-gradient-to-br from-teal-400/20 via-emerald-300/15 to-transparent", 
    "blur-2xl mix-blend-screen transition-all duration-1000"
  ].join(' '),
  
  icon: [
    "relative z-10 text-emerald-500 text-4xl mb-5", 
    "bg-emerald-500/10 p-4 rounded-xl w-fit", 
    "group-hover:text-emerald-400 group-hover:shadow-md group-hover:shadow-emerald-500/20",
    "transition-all duration-300"
  ].join(' '),
  
  title: [
    "relative z-10 text-white font-playfair", 
    "text-xl font-bold mb-3 tracking-wide"
  ].join(' '),
  
  underline: "h-1 bg-emerald-500/60 rounded-full mt-2 transition-all duration-300",
  
  description: "relative z-10 text-neutral-300 font-nunito leading-relaxed",
  
  link: [
    "relative z-10 mt-5 text-emerald-400 font-nunito font-medium", 
    "flex items-center cursor-pointer group/link hover:text-emerald-300",
    "transition-colors duration-300"
  ].join(' '),
  
  arrow: "ml-2 transition-transform duration-300 group-hover/link:translate-x-1",
  
  focusRing: [
    "absolute inset-0 rounded-xl ring-0 ring-emerald-500/50", 
    "ring-offset-2 ring-offset-neutral-900 group-focus-visible:ring-2", 
    "transition-all duration-300"
  ].join(' ')
});

/**
 * TitleSection Component - Renders the card title with animated underline
 */
const TitleSection: React.FC<{
  title: string,
  animationDelay: number
}> = ({ title, animationDelay }) => {
  const classes = getClasses();
  
  return (
    <motion.h3 
      className={classes.title}
      variants={animations.title}
      initial="initial"
      animate="animate"
      custom={animationDelay}
    >
      {title}
      <motion.div 
        className={classes.underline}
        variants={animations.underline}
        initial="initial"
        animate="animate"
        whileHover="hover"
        aria-hidden="true"
      />
    </motion.h3>
  );
};

/**
 * LearnMoreLink Component - Renders the animated "Learn More" link
 */
const LearnMoreLink: React.FC<{
  onClick?: () => void,
  handleKeyDown: (e: React.KeyboardEvent) => void
}> = ({ onClick, handleKeyDown }) => {
  const classes = getClasses();
  
  return (
    <motion.div 
      className={classes.link}
      variants={animations.link}
      whileHover="hover"
      whileTap="tap"
      role="link"
      tabIndex={0}
      onKeyDown={onClick ? handleKeyDown : undefined}
    >
      <span>Pelajari selengkapnya</span>
      <motion.span 
        className={classes.arrow}
        variants={animations.arrow}
        animate="animate"
        transition={{ 
          repeat: Infinity, 
          repeatType: "reverse", 
          duration: 1.5,
          ease: "easeInOut" 
        }}
        aria-hidden="true"
      >
        →
      </motion.span>
    </motion.div>
  );
};

/**
 * ServiceCard Component
 * 
 * Displays an interactive service card with icon, title, description,
 * and a "learn more" link. Features smooth animations and hover effects.
 * 
 * @param icon - React element to display as the service icon
 * @param title - Title of the service
 * @param description - Description text for the service
 * @param index - Order index for staggered animations (optional)
 * @param onClick - Optional click handler for the card
 */
const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  description, 
  index = 0, 
  onClick 
}) => {
  // Calculate delay for staggered animations based on card index
  const animationDelay = index * 0.1; 
  const classes = getClasses();

  // Keyboard event handler for accessibility
  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick && onClick();
    }
  };

  return (
    <motion.div 
      className={classes.card}            
      variants={animations.card}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      aria-label={`Service: ${title}`}
    >
      {/* Multi-layered glow effects with organic fluid animations */}
      <motion.div 
        className={classes.backgroundEffect}
        variants={animations.background}
        initial="initial"
        animate="animate"
        whileHover="hover"
        aria-hidden="true"
      />
      <motion.div 
        className={classes.backgroundSecondaryEffect}
        variants={animations.backgroundSecondary}
        initial="initial"
        animate="animate"
        whileHover="hover"
        aria-hidden="true"
      />
      
      {/* Service icon */}
      <motion.div 
        className={classes.icon}
        variants={animations.icon}
        initial="initial"
        animate="animate"
        whileHover="hover"
        custom={animationDelay}
      >
        {icon}
      </motion.div>
      
      {/* Title with underline */}
      <TitleSection title={title} animationDelay={animationDelay} />
      
      {/* Service description */}
      <motion.p 
        className={classes.description}
        variants={animations.description}
        initial="initial"
        animate="animate"
        custom={animationDelay}
      >
        {description}
      </motion.p>
      
      {/* Learn more link */}
      <LearnMoreLink onClick={onClick} handleKeyDown={handleKeyDown} />
      
      {/* Focus ring for accessibility */}
      <div 
        className={classes.focusRing}
        aria-hidden="true"
      ></div>
    </motion.div>
  );
};

export default ServiceCard;
