// Animation variants for components
// Optimized for mobile performance while maintaining visual appeal
export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 } // Slightly faster staggering for mobile
  }
};

export const itemVariants = {
  hidden: { y: 20, opacity: 0 }, // Reduced y-offset for smoother mobile animation
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 80, damping: 10 } // Reduced stiffness for better performance
  }
};

export const serviceContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.4 } // Optimized timing for mobile
  }
};

export const serviceItemVariants = {
  hidden: { y: 15, opacity: 0 }, // Smaller y-offset for mobile
  visible: { y: 0, opacity: 1 }
};

export const titleAnimationProps = {
  initial: { opacity: 0, y: 20 }, // Reduced y-offset for mobile
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }, // Slightly faster for mobile
  viewport: { once: true, margin: "-80px" } // Adjusted viewport margin
};

export const subtitleAnimationProps = {
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  transition: { delay: 0.2, duration: 0.4 }, // Faster for mobile
  viewport: { once: true }
};
