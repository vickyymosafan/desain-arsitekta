import React from 'react';
import { motion, Variants } from 'framer-motion';
import { ServiceCardProps } from '../types';

const animations = {
  card: {
    hover: { 
      y: -8, 
      boxShadow: "0 20px 40px -12px rgba(16, 185, 129, 0.15)" 
    },
    tap: { 
      scale: 0.98 
    }
  } as Variants,

  background: {
    initial: {},
    hover: { 
      scale: 1.1, 
      x: -10 
    }
  } as Variants,

  icon: {
    initial: { 
      opacity: 0 
    },
    animate: (delay: number) => ({ 
      opacity: 1, 
      transition: { delay } 
    }),
    hover: { 
      rotate: 5 
    }
  } as Variants,

  title: {
    initial: { 
      opacity: 0, 
      y: 10 
    },
    animate: (delay: number) => ({ 
      opacity: 1, 
      y: 0, 
      transition: { delay: delay + 0.1 } 
    })
  } as Variants,

  underline: {
    initial: { 
      width: 0 
    },
    animate: { 
      width: 24 
    },
    hover: { 
      width: 36 
    }
  } as Variants,

  description: {
    initial: { 
      opacity: 0 
    },
    animate: (delay: number) => ({ 
      opacity: 1, 
      transition: { delay: delay + 0.2 } 
    })
  } as Variants,

  link: {
    initial: {},
    hover: { 
      x: 2 
    },
    tap: { 
      scale: 0.95 
    }
  } as Variants,

  arrow: {
    animate: { 
      x: [0, 3, 0] 
    }
  } as Variants
};

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  description, 
  index = 0, 
  onClick 
}) => {
  const animationDelay = index * 0.1; 

  const handleKeyDown = (e: React.KeyboardEvent): void => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick && onClick();
    }
  };

  const classes = {
    card: [
      "bg-neutral-900 p-8 rounded-xl group border border-neutral-800", 
      "hover:border-emerald-500/50 focus-within:border-emerald-500", 
      "h-full relative"
    ].join(' '),
    
    backgroundEffect: [
      "absolute -right-20 -top-20 w-60 h-60 rounded-full", 
      "bg-gradient-to-br from-emerald-500/10 to-emerald-500/5", 
      "blur-xl opacity-60"
    ].join(' '),
    
    icon: [
      "relative z-10 text-emerald-500 text-4xl mb-5", 
      "bg-emerald-500/10 p-4 rounded-xl w-fit", 
      "group-hover:text-emerald-400"
    ].join(' '),
    
    title: [
      "relative z-10 text-white font-playfair", 
      "text-xl font-bold mb-3"
    ].join(' '),
    
    underline: "h-1 bg-emerald-500/50 rounded-full mt-2",
    
    description: "relative z-10 text-neutral-300 font-nunito",
    
    link: [
      "relative z-10 mt-4 text-emerald-400 font-nunito", 
      "flex items-center cursor-pointer group/link"
    ].join(' '),
    
    arrow: "ml-2 transition-transform duration-300 group-hover/link:translate-x-1",
    
    focusRing: [
      "absolute inset-0 rounded-xl ring-0 ring-emerald-500/50", 
      "ring-offset-2 ring-offset-neutral-900 group-focus-visible:ring-2", 
      "transition-all duration-300"
    ].join(' ')
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
      <motion.div 
        className={classes.backgroundEffect}
        variants={animations.background}
        whileHover="hover"
        aria-hidden="true"
      />
            
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
            
      <motion.p 
        className={classes.description}
        variants={animations.description}
        initial="initial"
        animate="animate"
        custom={animationDelay}
      >
        {description}
      </motion.p>
            
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
            
      <div 
        className={classes.focusRing}
        aria-hidden="true"
      ></div>
    </motion.div>
  );
};

export default ServiceCard;
