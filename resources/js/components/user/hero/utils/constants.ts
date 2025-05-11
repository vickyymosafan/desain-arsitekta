/**
 * Hero-specific constants that supplement the centralized constants
 * This maintains component-specific values while leveraging shared constants
 */

import { 
  DEFAULT_HERO_CONFIG, 
  ANIMATION_DELAYS, 
  Z_INDICES, 
  SIZES, 
  SPACING, 
  TRANSITION_DURATIONS,
  DEBOUNCE_DELAYS
} from '../../../../utils/constants';

// Re-export relevant centralized constants
export { 
  DEFAULT_HERO_CONFIG, 
  ANIMATION_DELAYS, 
  Z_INDICES, 
  SPACING, 
  TRANSITION_DURATIONS,
  DEBOUNCE_DELAYS
};

// Hero-specific color accent and branding
export const DEFAULT_ACCENT_COLOR = '#34d399'; // Emerald accent color

// Hero-specific color classes 
export const COLOR_CLASSES = {
  white: 'text-white/80',
  emerald: 'text-emerald-400',
  primary: 'text-emerald-500'
};

// Hero-specific size classes that extend the centralized sizes
export const SIZE_CLASSES = {
  sm: {
    indicator: 'h-1.5 w-1.5',
    dot: 'h-1.5 w-1.5',
    line: 'h-1.5 w-4',
    icon: 'h-6 w-6 text-xs'
  },
  md: {
    indicator: 'h-2.5 w-2.5',
    dot: 'h-2.5 w-2.5',
    line: 'h-2.5 w-6',
    icon: 'h-8 w-8 text-sm'
  },
  lg: {
    indicator: 'h-3 w-3',
    dot: 'h-3 w-3',
    line: 'h-3 w-8',
    icon: 'h-10 w-10 text-base'
  },
  xl: {
    indicator: 'h-4 w-4',
    dot: 'h-4 w-4',
    line: 'h-4 w-10',
    icon: 'h-12 w-12 text-lg'
  }
};

// Hero-specific styling presets
export const COMMON_STYLES = {
  // Backdrop styling that's consistent
  backdropPanel: 'bg-black/40 backdrop-blur-md border border-white/10',
  // Shadow with consistent accent color
  accentShadow: (accent: string) => `0 10px 30px -5px ${accent}20`,
};

// Hero-specific animation timing constants
export const ANIMATION_TIMINGS = {
  staggered: {
    title: 0.3,
    highlight: 0.4,
    description: 0.6,
    cta: 0.8
  },
  durations: {
    fast: 0.5,
    medium: 0.7,
    slow: 1.5
  }
};
