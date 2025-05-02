import { AnimationVariant, AnimationVariantProps } from './types';

export const getAnimationVariant = (
  variant: AnimationVariant = 'fadeIn', 
  delay: number = 0
): AnimationVariantProps => {
  const variants: Record<AnimationVariant, AnimationVariantProps> = {
    fadeIn: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { 
        duration: 0.8, 
        delay,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    },
    slideUp: {
      initial: { opacity: 0, y: 50 },
      animate: { opacity: 1, y: 0 },
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 20,
        delay,
        duration: 0.8
      }
    },
    slideDown: {
      initial: { opacity: 0, y: -50 },
      animate: { opacity: 1, y: 0 },
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 20,
        delay,
        duration: 0.8
      }
    },
    zoom: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
        delay,
        duration: 0.8
      }
    },
    float: {
      initial: { y: 0 },
      animate: { y: [-10, 0, -10] },
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
        delay
      }
    },
    tilt: {
      initial: { rotateX: 0, rotateY: 0 },
      animate: { rotateX: [0, 5, -5, 0], rotateY: [0, -5, 5, 0] },
      transition: {
        duration: 6,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
        delay
      }
    },
    glow: {
      initial: { 
        boxShadow: '0 0 0px 0px rgba(16, 185, 129, 0)' 
      },
      animate: { 
        boxShadow: [
          '0 0 10px 0px rgba(16, 185, 129, 0.1)',
          '0 0 20px 5px rgba(16, 185, 129, 0.2)',
          '0 0 10px 0px rgba(16, 185, 129, 0.1)'
        ]
      },
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: 'mirror',
        delay
      }
    },
    none: {
      initial: {},
      animate: {},
      transition: {}
    }
  };

  return variants[variant];
};

export const get3DTiltEffect = (
  mousePosition: { x: number, y: number },
  element: HTMLElement | null,
  strength: number = 10
): React.CSSProperties => {
  if (!element) return {};
  
  const rect = element.getBoundingClientRect();
  const x = mousePosition.x - rect.left;
  const y = mousePosition.y - rect.top;
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const tiltX = (y - centerY) / strength;
  const tiltY = (centerX - x) / strength;
  
  return {
    transform: `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`,
    transition: 'all 0.3s ease-out'
  };
};
