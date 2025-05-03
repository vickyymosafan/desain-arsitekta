import { FC, ReactNode, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

interface ParallaxSectionProps {
  children: ReactNode;
  backgroundImage?: string;
  backgroundOverlay?: string;
  className?: string;
  speed?: number;
  direction?: 'up' | 'down';
  fullHeight?: boolean;
  withMask?: boolean;
  maskShape?: 'wave' | 'diagonal' | 'curve';
}

/**
 * A component that creates a parallax scrolling section
 * with modern Gen-Z aesthetics and depth effects
 */
const ParallaxSection: FC<ParallaxSectionProps> = ({
  children,
  backgroundImage,
  backgroundOverlay = 'linear-gradient(to bottom, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.4))',
  className = '',
  speed = 0.3,
  direction = 'up',
  fullHeight = true,
  withMask = false,
  maskShape = 'wave',
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Calculate parallax effect values
  const yValue = direction === 'up' ? [0, -100 * speed] : [0, 100 * speed];
  const parallaxY = useTransform(scrollYProgress, [0, 1], yValue);
  const opacityValue = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);

  // Get the correct SVG mask path based on shape
  const getMaskPath = () => {
    switch (maskShape) {
      case 'wave':
        return (
          <svg 
            className="absolute bottom-0 left-0 w-full h-16 sm:h-24 md:h-32 text-white" 
            preserveAspectRatio="none" 
            viewBox="0 0 1440 74"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,53.3C840,43,960,21,1080,16C1200,11,1320,21,1380,26.7L1440,32L1440,74L1380,74C1320,74,1200,74,1080,74C960,74,840,74,720,74C600,74,480,74,360,74C240,74,120,74,60,74L0,74Z" />
          </svg>
        );
      case 'diagonal':
        return (
          <svg 
            className="absolute bottom-0 left-0 w-full h-16 sm:h-24 md:h-32 text-white" 
            preserveAspectRatio="none" 
            viewBox="0 0 1440 74"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="0,74 1440,0 1440,74" />
          </svg>
        );
      case 'curve':
        return (
          <svg 
            className="absolute bottom-0 left-0 w-full h-16 sm:h-24 md:h-32 text-white" 
            preserveAspectRatio="none" 
            viewBox="0 0 1440 74"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0,74 C480,10 960,10 1440,74 L1440,74 L0,74 Z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      className={`relative overflow-hidden ${fullHeight ? 'min-h-screen' : ''} ${className}`}
    >
      {/* Parallax Background */}
      {backgroundImage && (
        <motion.div
          className="absolute inset-0 z-0 w-full h-full"
          style={{
            y: parallaxY,
            opacity: opacityValue,
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
          }}
        >
          {/* Background Overlay */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{ background: backgroundOverlay }}
          />
        </motion.div>
      )}

      {/* Content */}
      <div className="relative z-10 h-full w-full">
        {children}
      </div>

      {/* Section mask shape */}
      {withMask && getMaskPath()}
    </section>
  );
};

export default ParallaxSection;
