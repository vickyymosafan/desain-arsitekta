/**
 * This file re-exports animation utilities from the centralized animations.ts
 * to maintain backward compatibility while avoiding code duplication
 */

import { 
  transitions, 
  slideTransitions,
  animationVariants, 
  getAnimationWithDelay as getSharedAnimationWithDelay,
  createAnimationProps as createSharedAnimationProps,
  getSlideAnimationStyle as getSharedSlideAnimationStyle
} from '../../../../utils/animations';
import { AnimationVariant, AnimationVariantProps } from '../../../../utils/shared-types';

// Re-export centralized utilities
export { transitions, slideTransitions, animationVariants };

// Re-implement helper functions with same signatures for backward compatibility
export const getAnimationWithDelay = (type: AnimationVariant, delay: number = 0): AnimationVariantProps => {
  return getSharedAnimationWithDelay(type, delay);
};

export const createAnimationProps = (type: AnimationVariant, delay: number = 0, once: boolean = false) => {
  return createSharedAnimationProps(type, delay, once);
};

export const getSlideAnimationStyle = (animationType: string, isActive: boolean) => {
  return getSharedSlideAnimationStyle(animationType, isActive);
};
