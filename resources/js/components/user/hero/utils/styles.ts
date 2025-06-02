/**
 * This file is now a bridge to the global styles utilities
 * It imports and re-exports from the central styles.ts,
 * while preserving any hero-specific styling utilities.
 * 
 * This refactoring improves maintainability by using centralized utilities
 * while maintaining backward compatibility.
 */

import { 
  applyGlobalStyles as applySharedGlobalStyles,
  colors,
  shadows,
  borderRadius,
  typography,
  spacing,
  getHeightStyle,
  getContentPosition
} from '../../../../utils/styles';

// Re-export central utilities
export { 
  colors, 
  shadows, 
  borderRadius, 
  typography, 
  spacing,
  getHeightStyle,
  getContentPosition
};

/**
 * @deprecated Use applyGlobalStyles from central utilities
 * Function retained for backward compatibility
 */
export const applyGlobalStyles = (): void => {
  applySharedGlobalStyles();
};

/**
 * Hero-specific styling utilities that should be migrated to the central styles
 * in a future update. Keeping here for now to maintain backward compatibility.
 */
export const commonStyles = {
  // Gradient styling for text
  gradientText: {
    emerald: {
      background: `linear-gradient(90deg, ${colors.primary[300]} 0%, ${colors.primary[500]} 100%)`,
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
  
  // Gradient backgrounds - uses the centralized color palette
  gradientBg: {
    emerald: `bg-gradient-to-r from-emerald-400 to-emerald-600`,
    emeraldLight: `bg-gradient-to-r from-emerald-300 to-emerald-500`,
    emeraldDark: `bg-gradient-to-r from-emerald-600 to-emerald-800`,
  }
};
