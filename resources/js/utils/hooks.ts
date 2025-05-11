import { useState, useEffect, useCallback, RefObject } from 'react';
import { AnimationVariant } from './shared-types';

/**
 * Custom hook for handling window resize events with debounce
 * @param delay - Debounce delay in ms
 */
export const useWindowResize = (delay: number = 100) => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  });

  useEffect(() => {
    // Debounce function to limit rapid firing
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, delay);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [delay]);

  return windowSize;
};

/**
 * Custom hook for detecting if user prefers reduced motion
 */
export const useReducedMotionPreference = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check if browser supports matchMedia
    if (typeof window === 'undefined' || !window.matchMedia) return;
    
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    } 
    // Older browsers (Safari < 14)
    else if ('addListener' in mediaQuery) {
      // @ts-ignore - For Safari < 14
      mediaQuery.addListener(handleChange);
      return () => {
        // @ts-ignore - For Safari < 14
        mediaQuery.removeListener(handleChange);
      };
    }
  }, []);

  return prefersReducedMotion;
};

/**
 * Custom hook for scroll position tracking
 */
export const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  const handleScroll = useCallback(() => {
    const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Set scroll position
    setScrollPosition(currentScrollTop);
    
    // Set scrolled state based on threshold
    setIsScrolled(currentScrollTop > 50);
    
    // Determine scroll direction
    if (currentScrollTop > lastScrollTop) {
      setDirection('down');
    } else if (currentScrollTop < lastScrollTop) {
      setDirection('up');
    }
    
    // Save last scroll position
    setLastScrollTop(currentScrollTop);
  }, [lastScrollTop]);

  useEffect(() => {
    // Add scroll event listener
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Initial call
    handleScroll();
    
    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return { scrollPosition, isScrolled, direction };
};

/**
 * Custom hook for click outside detection
 * @param ref - Reference to the element
 * @param callback - Function to call when clicked outside
 */
export const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void) => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [ref, callback]);
};

/**
 * Custom hook for animation with delay
 * @param variant - Animation variant to use
 * @param delay - Delay before animation starts
 */
export const useAnimationWithDelay = (variant: AnimationVariant, delay: number = 0) => {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { delay, duration: 0.5 }
  };
};
