import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

// Import hooks and utilities
import { usePageLayout } from '../../hooks/usePageLayout';
import { colors, typography, borderRadius } from '../../utils/styles';

// Layout component props
interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  pageTransition?: boolean;
  pageTitle?: string;
  fullHeight?: boolean;
  navbarSpacing?: boolean;
  navbarHeight?: number;
}

/**
 * Main page layout component with consistent styling and animations
 * 
 * Provides standard page container with proper spacing, animations,
 * and emerald-based styling consistent with the brand identity.
 * Designed for Gen Z audience with clean, modern aesthetics.
 * 
 * Uses the usePageLayout hook to handle layout logic and animations.
 */
const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className,
  pageTransition,
  pageTitle,
  fullHeight,
  navbarSpacing,
  navbarHeight
}) => {
  // Use the layout hook to get container classes and animation properties
  const { containerClasses, animationProps, contentStyle } = usePageLayout({
    pageTransition,
    fullHeight,
    className,
    navbarSpacing,
    navbarHeight
  });
  
  return (
    <motion.div
      className={containerClasses}
      initial={animationProps.initial}
      animate={animationProps.animate}
      exit={animationProps.exit}
      variants={animationProps.variants}
      transition={animationProps.transition}
      style={contentStyle}
    >
      {pageTitle && (
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-5xl font-bold font-playfair mb-6 md:mb-8 text-gray-900 dark:text-white tracking-wide"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {pageTitle}
          <motion.div 
            className="h-1 w-24 bg-emerald-500 mt-4 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: '6rem' }}
            transition={{ delay: 0.5, duration: 0.7 }}
          />
        </motion.h1>
      )}
      
      {children}
    </motion.div>
  );
};

export default PageLayout;
