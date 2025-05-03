import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

type AnimationVariant = 
  | 'fadeIn' 
  | 'slideUp' 
  | 'slideLeft' 
  | 'slideRight' 
  | 'scale' 
  | 'rotate'
  | 'float'
  | '3dFlip'
  | 'glitch'
  | 'blur'
  | 'morphing';

interface ScrollAnimationProps {
  /** Animation variant to apply */
  variant?: AnimationVariant;
  /** Amount of delay before animation starts (in seconds) */
  delay?: number;
  /** Duration of the animation (in seconds) */
  duration?: number;
  /** Threshold for when the animation should start (0-1) */
  threshold?: number;
  /** Whether to animate only once or every time element enters viewport */
  once?: boolean;
  /** Custom animation classes to apply (will override variant) */
  customClasses?: string;
}

/**
 * Custom hook for scroll-triggered animations with modern effects
 */
export const useScrollAnimation = ({
  variant = 'fadeIn',
  delay = 0,
  duration = 0.7,
  threshold = 0.2,
  once = true,
  customClasses,
}: ScrollAnimationProps = {}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (isInView && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isInView, hasAnimated]);

  // Base animation styles
  const baseStyles = {
    opacity: 0,
    transform: 'translateY(0)',
    transition: `all ${duration}s cubic-bezier(0.16, 1, 0.3, 1) ${delay}s`,
  };

  // Determine animation variant styles
  const getVariantStyles = (variant: AnimationVariant) => {
    switch (variant) {
      case 'fadeIn':
        return { opacity: 0 };
      case 'slideUp':
        return { opacity: 0, transform: 'translateY(40px)' };
      case 'slideLeft':
        return { opacity: 0, transform: 'translateX(-40px)' };
      case 'slideRight':
        return { opacity: 0, transform: 'translateX(40px)' };
      case 'scale':
        return { opacity: 0, transform: 'scale(0.9)' };
      case 'rotate':
        return { opacity: 0, transform: 'rotate(-5deg) scale(0.95)' };
      case 'float':
        return { 
          opacity: 0, 
          transform: 'translateY(20px)',
          filter: 'blur(8px)',
        };
      case '3dFlip':
        return { 
          opacity: 0, 
          transform: 'perspective(1000px) rotateY(-15deg)',
          transformStyle: 'preserve-3d',
        };
      case 'glitch':
        return { 
          opacity: 0, 
          clipPath: 'inset(100% 0 0 0)',
          filter: 'hue-rotate(90deg)',
        };
      case 'blur':
        return { 
          opacity: 0, 
          filter: 'blur(15px)',
        };
      case 'morphing':
        return { 
          opacity: 0, 
          borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
          transform: 'scale(0.8)',
        };
      default:
        return { opacity: 0 };
    }
  };

  // Animation styles when in view
  const getActiveStyles = (variant: AnimationVariant) => {
    const baseActiveStyles = { opacity: 1, transform: 'none', filter: 'none' };
    
    if (variant === 'float') {
      return {
        opacity: 1,
        transform: 'translateY(0)',
        filter: 'blur(0px)',
        animation: 'floating 4s ease-in-out infinite',
      };
    }
    
    if (variant === 'morphing') {
      return {
        opacity: 1,
        transform: 'scale(1)',
        borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
        animation: 'morphing 8s ease-in-out infinite',
      };
    }
    
    return baseActiveStyles;
  };

  // Combine styles based on animation state
  const styles = {
    ...baseStyles,
    ...getVariantStyles(variant),
    ...(isInView ? getActiveStyles(variant) : {}),
    willChange: 'opacity, transform, filter',
  };

  // Generate keyframe animations using CSS
  useEffect(() => {
    // Add keyframe animations to document if they don't exist
    if (!document.getElementById('scroll-animations-keyframes')) {
      const style = document.createElement('style');
      style.id = 'scroll-animations-keyframes';
      style.textContent = `
        @keyframes floating {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes morphing {
          0% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
          25% { border-radius: 58% 42% 75% 25% / 76% 46% 54% 24%; }
          50% { border-radius: 50% 50% 33% 67% / 55% 27% 73% 45%; }
          75% { border-radius: 33% 67% 58% 42% / 63% 68% 32% 37%; }
          100% { border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%; }
        }
        
        @keyframes glitchEffect {
          0% { 
            clip-path: inset(80% 0 0 0);
            transform: translate(-10px, 10px); 
          }
          10% { 
            clip-path: inset(10% 0 85% 0);
            transform: translate(10px, -10px);
          }
          20% { 
            clip-path: inset(80% 0 0 0);
            transform: translate(-15px, 10px);
          }
          30% { 
            clip-path: inset(10% 0 85% 0);
            transform: translate(15px, -10px);
          }
          40% { 
            clip-path: inset(40% 0 43% 0);
            transform: translate(-10px, 5px);
          }
          50% { 
            clip-path: inset(59% 0 43% 0);
            transform: translate(10px, -5px);
          }
          60% { 
            clip-path: inset(80% 0 0 0);
            transform: translate(-15px, 10px);
          }
          70% { 
            clip-path: inset(10% 0 85% 0);
            transform: translate(15px, -10px);
          }
          80% { 
            clip-path: inset(40% 0 43% 0);
            transform: translate(-10px, 5px);
          }
          90% { 
            clip-path: inset(59% 0 43% 0);
            transform: translate(10px, -5px);
          }
          100% { 
            clip-path: inset(0 0 0 0);
            transform: translate(0);
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  return {
    ref,
    style: styles,
    isInView,
    hasAnimated,
  };
};

export default useScrollAnimation;
