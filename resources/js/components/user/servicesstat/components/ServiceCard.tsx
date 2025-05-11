import React from 'react';
import { motion, Variants } from 'framer-motion';

// Import shared utilities
import { transitions, createAnimationProps } from '../../../../utils/animations';
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

  // Background gradient animations
  background: {
    initial: {},
    hover: { 
      scale: 1.1, 
      x: -10,
      transition: transitions.slow
    }
  } as Variants,

  // Icon animations with staggered entrance and spring effect
  icon: {
    initial: { 
      opacity: 0 
    },
    animate: (delay: number) => ({ 
      opacity: 1, 
      transition: { ...transitions.default, delay } 
    }),
    hover: { 
      rotate: 5,
      transition: transitions.spring
    }
  } as Variants,

  // Title text animations with staggered entrance and enhanced transitions
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

  // Title underline animations with improved transitions
  underline: {
    initial: { 
      width: 0 
    },
    animate: { 
      width: 24,
      transition: { ...transitions.default, delay: 0.3 }
    },
    hover: { 
      width: 36,
      transition: transitions.spring
    }
  } as Variants,

  // Description text animations with staggered entrance and smooth fade-in
  description: {
    initial: { 
      opacity: 0 
    },
    animate: (delay: number) => ({ 
      opacity: 1, 
      transition: { ...transitions.slow, delay: delay + 0.2 } 
    })
  } as Variants,

  // Learn more link animations with spring effect for modern feel
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

  // Arrow icon animations with enhanced pulsing effect for Gen Z appeal
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
    "bg-neutral-900 p-8 rounded-xl group border border-neutral-800", 
    "hover:border-emerald-500/50 focus-within:border-emerald-500", 
    "h-full relative transition-all duration-300"
  ].join(' '),
  
  backgroundEffect: [
    "absolute -right-20 -top-20 w-60 h-60 rounded-full", 
    "bg-gradient-to-br from-emerald-500/15 to-emerald-500/5", 
    "blur-xl opacity-70 transition-all duration-500"
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
      {/* Background gradient effect */}
      <motion.div 
        className={classes.backgroundEffect}
        variants={animations.background}
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
