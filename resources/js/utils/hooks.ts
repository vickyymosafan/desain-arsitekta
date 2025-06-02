import { useState, useEffect, useCallback, useRef, RefObject, MutableRefObject } from 'react';
import { AnimationVariant, Slide } from './shared-types';

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

/**
 * Props untuk hook useSlider
 */
interface UseSliderProps {
  slides: Slide[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  pauseOnHover?: boolean;
}

/**
 * Return value dari hook useSlider
 */
interface UseSliderReturn {
  currentSlide: number;
  isPaused: boolean;
  sliderRef: RefObject<HTMLDivElement | null>;
  touchHandlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };
  hoverHandlers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
  clickHandlers: {
    onClick: (e: React.MouseEvent) => void;
  };
  slideControls: {
    goToSlide: (index: number) => void;
    goToPrevSlide: () => void;
    goToNextSlide: () => void;
  };
}

/**
 * Custom hook untuk mengelola slider/carousel dengan dukungan touch, autoplay, dan navigasi
 * Optimal untuk pengalaman Gen Z di mobile dan desktop
 * @param props - Konfigurasi slider
 */
/**
 * Custom hook for device type detection
 * Returns info about the current device type (mobile, tablet, desktop)
 */
export const useResponsive = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkDeviceType = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    // Check on initial load
    checkDeviceType();

    // Add resize listener
    window.addEventListener('resize', checkDeviceType);

    // Cleanup
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  return { isMobile, isTablet, isDesktop };
};

/**
 * Custom hook for intersection observer
 * @param ref - Reference to the element to observe
 * @param callback - Function to call when intersection changes
 * @param options - IntersectionObserver options
 */
export const useIntersectionObserver = (
  ref: RefObject<Element | null>,
  callback: (isIntersecting: boolean, entry?: IntersectionObserverEntry) => void,
  options: IntersectionObserverInit = {}
) => {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      callback(entry.isIntersecting, entry);
    }, options);

    const element = ref.current;
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [ref, callback, options]);
};

export const useSlider = ({
  slides,
  autoplay = true,
  autoplaySpeed = 5000,
  pauseOnHover = true
}: UseSliderProps): UseSliderReturn => {
  // State untuk slide saat ini
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // State untuk pause/play autoplay
  const [isPaused, setIsPaused] = useState(false);
  
  // Referensi untuk container slider
  const sliderRef = useRef<HTMLDivElement>(null);
  
  // State untuk touch handling
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  
  // Menangani klik pada slide (untuk deteksi perangkat sentuh atau mouse)
  const handleClick = (e: React.MouseEvent) => {
    if (!sliderRef.current) return;
    
    const container = sliderRef.current;
    const containerWidth = container.clientWidth;
    const clickX = e.clientX - container.getBoundingClientRect().left;
    
    // Klik pada sisi kiri = prev, kanan = next
    if (clickX < containerWidth / 2) {
      goToPrevSlide();
    } else {
      goToNextSlide();
    }
  };
  
  // Touch handlers untuk dukungan swipe di mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchEndX.current = e.touches[0].clientX;
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.touches[0].clientX;
  };
  
  const handleTouchEnd = () => {
    const difference = touchStartX.current - touchEndX.current;
    
    // Swipe threshold untuk menghindari trigger yang tidak disengaja
    if (Math.abs(difference) > 50) {
      if (difference > 0) {
        // Swipe ke kiri = next slide
        goToNextSlide();
      } else {
        // Swipe ke kanan = prev slide
        goToPrevSlide();
      }
    }
  };
  
  // Handler untuk mouse hover (pause autoplay saat hover)
  const handleMouseEnter = () => {
    if (pauseOnHover && autoplay) {
      setIsPaused(true);
    }
  };
  
  const handleMouseLeave = () => {
    if (pauseOnHover && autoplay) {
      setIsPaused(false);
    }
  };
  
  // Slide navigation controls
  const goToSlide = (index: number) => {
    // Pastikan index dalam rentang valid
    const validIndex = index < 0 ? slides.length - 1 : index >= slides.length ? 0 : index;
    setCurrentSlide(validIndex);
  };
  
  const goToPrevSlide = () => {
    goToSlide(currentSlide - 1);
  };
  
  const goToNextSlide = () => {
    goToSlide(currentSlide + 1);
  };
  
  // Setup autoplay
  useEffect(() => {
    if (!autoplay || isPaused) return;
    
    const interval = setInterval(() => {
      goToNextSlide();
    }, autoplaySpeed);
    
    return () => clearInterval(interval);
  }, [autoplay, autoplaySpeed, currentSlide, isPaused, goToNextSlide]);
  
  return {
    currentSlide,
    isPaused,
    sliderRef,
    touchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd
    },
    hoverHandlers: {
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave
    },
    clickHandlers: {
      onClick: handleClick
    },
    slideControls: {
      goToSlide,
      goToPrevSlide,
      goToNextSlide
    }
  };
};
