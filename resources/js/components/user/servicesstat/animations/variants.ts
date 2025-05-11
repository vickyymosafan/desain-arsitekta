/**
 * Service-specific animation variants that extend the centralized animations
 * Optimized for mobile performance and specific to the services component needs
 */

import { 
  containerVariants, 
  itemVariants, 
  transitions, 
  createAnimationProps 
} from '../../../../utils/animations';

// Service-specific container variant with optimized timing for mobile
export const serviceContainerVariants = {
  ...containerVariants,
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.4 } // Optimized timing for mobile
  }
};

// Service-specific item variant with smaller offset for better mobile performance
export const serviceItemVariants = {
  ...itemVariants,
  hidden: { y: 15, opacity: 0 }, // Smaller y-offset for mobile - better for performance
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { ...transitions.spring, stiffness: 80, damping: 10 } // Better mobile performance
  }
};

// Re-export standard animation variants for API consistency
export { containerVariants, itemVariants };

// Predefined animation props using the centralized utilities
export const titleAnimationProps = createAnimationProps('slideUp', 0, true);

export const subtitleAnimationProps = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { delay: 0.2, duration: 0.4 }, // Faster for mobile
  viewport: { once: true }
};
