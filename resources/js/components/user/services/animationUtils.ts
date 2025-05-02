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

// Shared animation variants for use across components
export const sharedAnimations = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { duration: 0.6, ease: 'easeOut' } 
    }
  },
  slideUp: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  },
  title: {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1.0] }
    }
  },
  card: {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut',
        delay: i * 0.1
      }
    }),
    hover: { 
      scale: 1.03,
      boxShadow: '0 20px 30px -10px rgba(16, 185, 129, 0.2)',
      borderColor: 'rgba(16, 185, 129, 0.3)',
      y: -8,
      transition: { type: 'spring', stiffness: 300, damping: 15 }
    },
    initial: { 
      scale: 1,
      boxShadow: '0 10px 20px -5px rgba(16, 185, 129, 0.1)', 
      borderColor: 'rgba(16, 185, 129, 0.1)',
      y: 0,
      transition: { type: 'spring', stiffness: 500, damping: 15 }
    }
  },
  floating: {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: 'mirror' as const,
      ease: 'easeInOut'
    }
  },
  glow: {
    boxShadow: [
      '0 0 20px 0px rgba(16, 185, 129, 0.1)',
      '0 0 30px 5px rgba(16, 185, 129, 0.2)',
      '0 0 20px 0px rgba(16, 185, 129, 0.1)'
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'mirror' as const
    }
  },
  spin: {
    rotate: 360,
    transition: {
      duration: 50,
      repeat: Infinity,
      ease: 'linear'
    }
  },
  section: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  },
  icon: {
    hover: { 
      scale: 1.1, 
      rotate: [0, -5, 5, 0],
      transition: { 
        rotate: {
          repeat: Infinity, 
          repeatType: 'mirror', 
          duration: 2,
          ease: 'easeInOut'
        }
      }
    },
    initial: { scale: 1 }
  },
  floatingBlob: {
    hover: {
      scale: 1.2,
      opacity: 0.9,
      transition: { duration: 0.3 }
    },
    initial: {
      scale: 1,
      opacity: 0.7,
      transition: { duration: 0.3 }
    }
  }
};

// Common style objects for reuse
export const commonStyles = {
  sectionBackground: {
    background: 'linear-gradient(180deg, #f0fdf4 0%, #e6f7ec 100%)',
    scrollSnapAlign: 'start',
    scrollMarginTop: '0px'
  },
  meshGrid: {
    backgroundImage: 'linear-gradient(var(--emerald-800) 1px, transparent 1px), linear-gradient(to right, var(--emerald-800) 1px, transparent 1px)',
    backgroundSize: '40px 40px',
    '--emerald-800': '#065f46'
  } as React.CSSProperties,
  gradientText: {
    background: 'linear-gradient(to right, #064e3b, #059669, #10b981)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundSize: '200% 100%',
    animation: 'gradient-shift 8s ease infinite'
  } as React.CSSProperties
};
