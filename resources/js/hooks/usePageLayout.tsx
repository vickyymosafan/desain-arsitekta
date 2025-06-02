import { useMemo } from 'react';
import { animationVariants, transitions } from '../utils/animations';
import { getContentPosition } from '../utils/styles';

// Define our own AnimationVariantProps type based on what the animations.ts module uses
interface AnimationVariantProps {
  initial: any;
  animate: any;
  transition?: any;
  exit?: any;
}

/**
 * Hook for handling page layout logic
 * 
 * Provides consistent animation variants, styling, and layout calculations
 * for pages within the application.
 */
export interface UsePageLayoutProps {
  pageTransition?: boolean;
  fullHeight?: boolean;
  className?: string;
  navbarSpacing?: boolean;
  navbarHeight?: number;
}

export interface UsePageLayoutResult {
  containerClasses: string;
  animationProps: {
    initial: any;
    animate: any;
    exit: any;
    variants: {
      initial: any;
      animate: any;
      exit: any;
    };
    transition: any;
  };
  contentStyle: React.CSSProperties;
}

export const usePageLayout = ({
  pageTransition = true,
  fullHeight = false,
  className = '',
  navbarSpacing = false,
  navbarHeight = 64
}: UsePageLayoutProps = {}): UsePageLayoutResult => {
  // Base container classes
  const containerClasses = useMemo(() => {
    return [
      'w-full mx-auto',
      'px-4 sm:px-6 lg:px-8',
      'py-4 sm:py-8',
      fullHeight ? 'min-h-screen' : '',
      className
    ].filter(Boolean).join(' ');
  }, [fullHeight, className]);

  // Use predefined animation variants instead of creating new ones
  const animationProps = useMemo(() => {
    // If transitions are disabled, return empty props
    if (!pageTransition) {
      return {
        initial: undefined,
        animate: undefined,
        exit: undefined,
        variants: {
          initial: undefined,
          animate: undefined,
          exit: undefined
        },
        transition: undefined
      };
    }

    // Use our existing page transition animation
    return {
      initial: 'initial',
      animate: 'animate',
      exit: 'exit',
      variants: {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -20 }
      },
      transition: { ...transitions.default, duration: 0.4 }
    };
  }, [pageTransition]);

  // Get content positioning based on navbar configuration
  const contentStyle = useMemo(() => {
    return navbarSpacing ? getContentPosition(navbarSpacing, navbarHeight) : {};
  }, [navbarSpacing, navbarHeight]);

  return {
    containerClasses,
    animationProps,
    contentStyle
  };
};
