/**
 * This file is now a bridge to the global constants
 * It imports and re-exports from the central constants.ts,
 * while preserving any hero-specific constants for backward compatibility.
 */

// Import from centralized utilities
import {
  ANIMATION_DELAYS,
  SIZES,
  TRANSITION_DURATIONS,
  Z_INDICES,
  DEFAULT_HERO_CONFIG
} from '../../../../utils/constants';

import { colors } from '../../../../utils/styles';

// Re-export central utilities
export {
  ANIMATION_DELAYS,
  SIZES,
  TRANSITION_DURATIONS,
  Z_INDICES,
  DEFAULT_HERO_CONFIG
};

// Maintained for backward compatibility
export const DEFAULT_ACCENT_COLOR = colors.primary[400]; // '#34d399'

// Map to central colors but maintain backward compatibility
export const COLOR_CLASSES = {
  white: 'text-white/80',
  emerald: 'text-emerald-400',
  primary: 'text-emerald-500'
};

// Map to central SIZES but maintain structure for backward compatibility
export const SIZE_CLASSES = {
  sm: {
    indicator: `h-1.5 w-1.5`,
    dot: `h-1.5 w-1.5`,
    line: `h-1.5 w-4`,
    icon: `h-6 w-6 text-xs`
  },
  md: {
    indicator: `h-2.5 w-2.5`,
    dot: `h-2.5 w-2.5`,
    line: `h-2.5 w-6`,
    icon: `h-8 w-8 text-sm`
  },
  lg: {
    indicator: `h-3 w-3`,
    dot: `h-3 w-3`,
    line: `h-3 w-8`,
    icon: `h-10 w-10 text-base`
  },
  xl: {
    indicator: `h-4 w-4`,
    dot: `h-4 w-4`,
    line: `h-4 w-10`,
    icon: `h-12 w-12 text-lg`
  }
};

// Maintained for backward compatibility
export const COMMON_STYLES = {
  backdropPanel: 'bg-black/40 backdrop-blur-md border border-white/10',
  accentShadow: (accent: string) => `0 10px 30px -5px ${accent}20`,
};

// Map to central TRANSITION_DURATIONS but maintain for backward compatibility
export const ANIMATION_TIMINGS = {
  staggered: {
    title: ANIMATION_DELAYS.heroElements.title,
    highlight: 0.4, // Specific to hero components
    description: ANIMATION_DELAYS.heroElements.description,
    cta: ANIMATION_DELAYS.heroElements.primaryCta
  },
  durations: {
    fast: TRANSITION_DURATIONS.fast / 1000, // Convert from ms to seconds
    medium: TRANSITION_DURATIONS.medium / 1000,
    slow: TRANSITION_DURATIONS.slow / 1000
  }
};
