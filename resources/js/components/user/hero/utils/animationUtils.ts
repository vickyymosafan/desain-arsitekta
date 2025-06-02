/**
 * This file is now a bridge to the global animation utilities
 * It imports and re-exports from the central animations.ts,
 * while preserving any hero-specific animation functions.
 * 
 * This refactoring improves maintainability by using centralized utilities
 * while maintaining backward compatibility.
 */

// Import from centralized utilities
import { 
  AnimationVariant, 
  AnimationVariantProps, 
  EasingType, 
  TransitionType 
} from '../../../../utils/shared-types';

import { 
  transitions, 
  animationVariants, 
  getAnimationWithDelay,
  createAnimationProps,
  getSlideAnimationStyle as globalGetSlideAnimationStyle
} from '../../../../utils/animations';

// Re-export all central animation utilities
export { 
  transitions, 
  animationVariants, 
  getAnimationWithDelay,
  createAnimationProps
};

/**
 * Hero-specific implementation of slide animations
 * This is maintained for backward compatibility but uses the global implementation
 */
export const getSlideAnimationStyle = (
    animationType: string, 
    isActive: boolean
) => {
    return globalGetSlideAnimationStyle(animationType, isActive);
};
