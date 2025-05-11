// Import varian animasi dari utilitas terpusat
import { containerVariants, itemVariants, transitions } from '../../../../utils/animations';

// Varian container spesifik untuk layanan dengan timing khusus untuk mobile
export const serviceContainerVariants = {
  ...containerVariants,
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.4 } // Optimized timing for mobile
  }
};

// Varian item spesifik untuk layanan dengan offset yang lebih kecil untuk mobile
export const serviceItemVariants = {
  ...itemVariants,
  hidden: { y: 15, opacity: 0 }, // Smaller y-offset for mobile - lebih optimal untuk performa
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { ...transitions.spring, stiffness: 80, damping: 10 } // Performa yang lebih baik untuk mobile
  }
};

// Re-export varian animasi umum untuk konsistensi API
export { containerVariants, itemVariants };

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
