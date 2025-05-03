/**
 * Animation constants for services section components
 * Centralized for better maintainability and consistency
 */

// Variants untuk animasi container yang lebih smooth
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3
    }
  }
};

// Variants untuk animasi card yang lebih natural
export const cardVariants = {
  initial: { 
    scale: 1,
    y: 0
  },
  active: { 
    scale: 1.03, 
    y: -10,
    zIndex: 20,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 20
    }
  }
};

// Transition helpers
export const springTransition = {
  type: "spring",
  stiffness: 300,
  damping: 20
};

export const smoothTransition = {
  duration: 0.5,
  ease: [0.22, 1, 0.36, 1]
};

export const elasticTransition = {
  duration: 0.7,
  ease: [0.34, 1.56, 0.64, 1]
};
