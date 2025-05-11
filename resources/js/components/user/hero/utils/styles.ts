/**
 * This file re-exports and extends style utilities from the centralized styles.ts
 * to maintain backward compatibility while reducing code duplication
 */
import { 
  applyGlobalStyles as applySharedGlobalStyles, 
  getContentPosition, 
  getHeightStyle
} from '../../../../utils/styles';

// Re-export centralized functions for backward compatibility
export { getContentPosition, getHeightStyle };

/**
 * @deprecated Use applyGlobalStyles from centralized utilities
 */
export const applyGlobalStyles = (): void => {
  applySharedGlobalStyles();
};

// Hero-specific styling that extends the centralized styles
export const commonStyles = {
  // Gradient styling for text
  gradientText: {
    emerald: {
      background: 'linear-gradient(90deg, #34d399 0%, #10b981 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundSize: '200% 100%',
      animation: 'gradient-shift 4s ease infinite'
    }
  },
  
  // Backdrop blur styling
  backdropBlur: {
    light: 'bg-white/10 backdrop-blur-md',
    medium: 'bg-white/20 backdrop-blur-md',
    dark: 'bg-black/30 backdrop-blur-md'
  },
  
  // Animations
  animation: {
    float: 'animation: float 6s ease-in-out infinite',
    pulse: 'animation: pulse 3s ease-in-out infinite'
  },
  
  // Gradient backgrounds
  gradientBg: {
    emerald: 'bg-gradient-to-r from-emerald-400 to-emerald-600',
    emeraldLight: 'bg-gradient-to-r from-emerald-300 to-emerald-500',
    emeraldDark: 'bg-gradient-to-r from-emerald-600 to-emerald-800',
  }
};
