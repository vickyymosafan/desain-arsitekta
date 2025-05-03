import { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  intensity?: 'light' | 'medium' | 'heavy';
  speed?: 'slow' | 'medium' | 'fast';
  delay?: number;
  rotateOnHover?: boolean;
  glowEffect?: boolean;
  glowColor?: string;
}

/**
 * A component that creates floating 3D elements with modern Gen-Z aesthetics
 */
const FloatingElement: FC<FloatingElementProps> = ({
  children,
  className = '',
  intensity = 'medium',
  speed = 'medium',
  delay = 0,
  rotateOnHover = true,
  glowEffect = true,
  glowColor = 'rgba(16, 185, 129, 0.7)', // Emerald glow
}) => {
  // Determine animation parameters based on intensity and speed
  const amplitudeMap = {
    light: 5,
    medium: 10,
    heavy: 20,
  };
  
  const durationMap = {
    slow: 6,
    medium: 4,
    fast: 2.5,
  };
  
  const amplitude = amplitudeMap[intensity];
  const duration = durationMap[speed];
  
  // Float animation - fixing the duplicate 'y' property
  const floatAnimation = {
    translateY: [amplitude * -1, amplitude, amplitude * -1],
    rotate: [0.5, -0.5, 0.5],
  };
  
  // Hover animations
  const hoverAnimation = rotateOnHover ? {
    scale: 1.05,
    rotate: [0, 2],
    transition: { duration: 0.3 }
  } : {
    scale: 1.05,
    transition: { duration: 0.3 }
  };
  
  // Generate box shadow for glow effect
  const glowStyles = glowEffect ? {
    boxShadow: `0 0 20px ${glowColor}`,
    filter: 'brightness(1.1)',
  } : {};

  return (
    <motion.div
      className={`select-none overflow-visible ${className}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ 
        opacity: 1, 
        y: 0,
        ...floatAnimation,
      }}
      transition={{
        delay,
        translateY: {
          repeat: Infinity,
          duration,
          ease: 'easeInOut',
          repeatType: 'reverse',
        },
        rotate: {
          repeat: Infinity,
          duration: duration * 1.2,
          ease: 'easeInOut',
          repeatType: 'reverse',
        },
      }}
      whileHover={hoverAnimation}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
        willChange: 'transform',
        ...glowStyles,
      }}
    >
      {children}
    </motion.div>
  );
};

export default FloatingElement;
