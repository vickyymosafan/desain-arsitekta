import React from 'react';
import { AnimatedBackgroundProps } from '../../types';

/**
 * Animated background component with improved performance
 * Creates decorative emerald-colored blurred circles that respond to scroll
 */
const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ scrollY, density = 10 }) => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(density)].map((_, i) => (
      <div 
        key={i}
        className="absolute bg-emerald-500/10 rounded-full blur-xl"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${40 + Math.random() * 60}px`,
          height: `${40 + Math.random() * 60}px`,
          opacity: 0.1 + Math.random() * 0.15,
          transform: `translateY(${scrollY * 0.03}px)`
        }}
      />
    ))}
  </div>
);

export default AnimatedBackground;
