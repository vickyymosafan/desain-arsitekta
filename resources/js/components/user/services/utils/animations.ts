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

// Definisi animasi untuk kartu layanan
export const cardAnimations = {
  initial: { opacity: 0, y: 20 },
  inView: { opacity: 1, y: 0 },
  hover: { y: -8 }
};
