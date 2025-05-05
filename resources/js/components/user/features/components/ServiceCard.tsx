import React from 'react';
import { motion } from 'framer-motion';

// Animation variants
const cardVariants = {
  hover: { 
    y: -8, 
    boxShadow: "0 20px 40px -12px rgba(16, 185, 129, 0.15)" 
  },
  tap: { 
    scale: 0.98 
  }
};

const backgroundVariants = {
  initial: {},
  hover: { 
    scale: 1.1, 
    x: -10 
  }
};

const iconVariants = {
  initial: { 
    opacity: 0 
  },
  animate: (d: number) => ({ 
    opacity: 1, 
    transition: { delay: d } 
  }),
  hover: { 
    rotate: 5 
  }
};

const titleVariants = {
  initial: { 
    opacity: 0, 
    y: 10 
  },
  animate: (d: number) => ({ 
    opacity: 1, 
    y: 0, 
    transition: { delay: d + 0.1 } 
  })
};

const underlineVariants = {
  initial: { 
    width: 0 
  },
  animate: { 
    width: 24 
  },
  hover: { 
    width: 36 
  }
};

const descriptionVariants = {
  initial: { 
    opacity: 0 
  },
  animate: (d: number) => ({ 
    opacity: 1, 
    transition: { delay: d + 0.2 } 
  })
};

const linkVariants = {
  initial: {},
  hover: { 
    x: 2 
  },
  tap: { 
    scale: 0.95 
  }
};

const arrowVariants = {
  animate: { 
    x: [0, 3, 0] 
  }
};

interface ServiceCardProps { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  index?: number; 
  onClick?: () => void; 
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  icon, 
  title, 
  description, 
  index = 0, 
  onClick 
}) => {
  const delay = index * 0.1; // Delay based on index
    
  // Accessibility keyboard handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick && onClick();
    }
  };

  return (
    <motion.div 
      className="bg-neutral-900 p-8 rounded-xl group border border-neutral-800 hover:border-emerald-500/50 focus-within:border-emerald-500 h-full relative"            
      variants={cardVariants}
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Background effect */}
      <motion.div 
        className="absolute -right-20 -top-20 w-60 h-60 rounded-full bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 blur-xl opacity-60"
        variants={backgroundVariants}
        whileHover="hover"
      />
            
      {/* Icon */}
      <motion.div 
        className="relative z-10 text-emerald-500 text-4xl mb-5 bg-emerald-500/10 p-4 rounded-xl w-fit group-hover:text-emerald-400"
        variants={iconVariants}
        initial="initial"
        animate="animate"
        whileHover="hover"
        custom={delay}
      >
        {icon}
      </motion.div>
            
      {/* Content */}
      <motion.h3 
        className="relative z-10 text-white font-playfair text-xl font-bold mb-3"
        variants={titleVariants}
        initial="initial"
        animate="animate"
        custom={delay}
      >
        {title}
        <motion.div 
          className="h-1 bg-emerald-500/50 rounded-full mt-2"
          variants={underlineVariants}
          initial="initial"
          animate="animate"
          whileHover="hover"
        />
      </motion.h3>
            
      <motion.p 
        className="relative z-10 text-neutral-300 font-nunito"
        variants={descriptionVariants}
        initial="initial"
        animate="animate"
        custom={delay}
      >
        {description}
      </motion.p>
            
      {/* Link */}
      <motion.div 
        className="relative z-10 mt-4 text-emerald-400 font-nunito flex items-center cursor-pointer group/link"
        variants={linkVariants}
        whileHover="hover"
        whileTap="tap"
      >
        <span>Pelajari selengkapnya</span>
        <motion.span 
          className="ml-2 transition-transform duration-300 group-hover/link:translate-x-1" 
          variants={arrowVariants}
          animate="animate"
          transition={{ 
            repeat: Infinity, 
            repeatType: "reverse", 
            duration: 1.5,
            ease: "easeInOut" 
          }}
        >
          →
        </motion.span>
      </motion.div>
            
      {/* Focus indicator for accessibility */}
      <div className="absolute inset-0 rounded-xl ring-0 ring-emerald-500/50 ring-offset-2 ring-offset-neutral-900 group-focus-visible:ring-2 transition-all duration-300"></div>
    </motion.div>
  );
};

export default ServiceCard;
