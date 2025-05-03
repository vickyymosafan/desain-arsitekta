import { FC, ReactNode } from 'react';
import { useScrollAnimation } from '../../hooks/useScrollAnimation';
import { motion } from 'framer-motion';

interface ScrollAnimationWrapperProps {
  children: ReactNode;
  variant?: 
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
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  id?: string;
}

/**
 * A wrapper component that adds scroll-triggered animations to its children
 */
const ScrollAnimationWrapper: FC<ScrollAnimationWrapperProps> = ({
  children,
  variant = 'fadeIn',
  delay = 0,
  duration = 0.7,
  threshold = 0.2,
  once = true,
  className = '',
  id,
}) => {
  const { ref, isInView } = useScrollAnimation({
    variant,
    delay,
    duration,
    threshold,
    once,
  });

  // Using framer-motion for enhanced animations
  const variants = {
    hidden: {
      opacity: 0,
      y: variant === 'slideUp' ? 40 : 0,
      x: variant === 'slideLeft' ? -40 : variant === 'slideRight' ? 40 : 0,
      scale: variant === 'scale' ? 0.9 : 1,
      rotateY: variant === '3dFlip' ? -15 : 0,
      filter: variant === 'blur' ? 'blur(15px)' : 'none',
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotateY: 0,
      filter: 'blur(0px)',
      transition: {
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Special animations that need additional effects
  if (variant === 'float' || variant === 'morphing') {
    return (
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={variants}
        className={`overflow-visible ${className}`}
        id={id}
        style={{
          willChange: 'transform, opacity, filter',
        }}
        whileInView={{
          animation: variant === 'float' 
            ? 'floating 4s ease-in-out infinite'
            : 'morphing 8s ease-in-out infinite',
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={`overflow-visible ${className}`}
      id={id}
      style={{
        willChange: 'transform, opacity, filter',
        perspective: variant === '3dFlip' ? '1000px' : 'none',
        transformStyle: variant === '3dFlip' ? 'preserve-3d' : 'flat',
      }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper;
