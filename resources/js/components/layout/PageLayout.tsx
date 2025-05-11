import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

// Import shared utilities - using proper paths
import { transitions } from '../../utils/animations';
import { colors, shadows } from '../../utils/styles';

// Layout component props
interface PageLayoutProps {
  children: ReactNode;
  className?: string;
  pageTransition?: boolean;
  pageTitle?: string;
  fullHeight?: boolean;
}

/**
 * Main page layout component with consistent styling and animations
 * 
 * Provides standard page container with proper spacing, animations,
 * and emerald-based styling consistent with the brand identity.
 * Designed for Gen Z audience with clean, modern aesthetics.
 */
const PageLayout: React.FC<PageLayoutProps> = ({
  children,
  className = '',
  pageTransition = true,
  pageTitle,
  fullHeight = false
}) => {
  // Page transition animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 }
  };
  
  // Page transition settings
  const pageTransitionSettings = {
    ...transitions.default,
    duration: 0.4
  };
  
  // Base container classes
  const containerClasses = [
    'w-full mx-auto',
    'px-4 sm:px-6 lg:px-8',
    'py-4 sm:py-8',
    fullHeight ? 'min-h-screen' : '',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <motion.div
      className={containerClasses}
      initial={pageTransition ? 'initial' : undefined}
      animate={pageTransition ? 'animate' : undefined}
      exit={pageTransition ? 'exit' : undefined}
      variants={pageVariants}
      transition={pageTransitionSettings}
    >
      {pageTitle && (
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-playfair mb-6 md:mb-8 text-gray-900 dark:text-white tracking-wide">
          {pageTitle}
          <div className="h-1 w-24 bg-emerald-500 mt-4 rounded-full" />
        </h1>
      )}
      
      {children}
    </motion.div>
  );
};

export default PageLayout;
