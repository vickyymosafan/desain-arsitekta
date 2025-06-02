/**
 * Hero Component Utilities
 * 
 * This module exports a well-organized set of utilities specifically for Hero components,
 * while leveraging global utilities from the central utils directory.
 * 
 * The functions and data exported here are organized into logical groups for easier
 * maintenance and discovery.
 */

// Animation utilities
export * from './animationUtils';

// Styling utilities
export * from './styles';

// Data and constants
export * from './constants';
export * from './data';

// Both layout utility functions are now available through styles.ts
// We don't re-export them here to avoid duplicates

// Types (mostly re-exported from shared-types)
export * from './types';

// Custom hooks
export { default as useSlider } from './useSlider';

/**
 * Usage examples:
 * 
 * Import specific utilities:
 * ```
 * import { transitions, getSlideAnimationStyle } from '../hero/utils';
 * ```
 * 
 * Import only types:
 * ```
 * import type { Slide, HeroConfig } from '../hero/utils';
 * ```
 * 
 * Use the useSlider hook:
 * ```
 * import { useSlider } from '../hero/utils';
 * const { currentSlide, goToNextSlide } = useSlider({ slides });
 * ```
 */
