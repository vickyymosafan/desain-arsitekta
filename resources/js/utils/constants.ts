/**
 * Centralized constants for use across components
 */

// Default hero slider config
export const DEFAULT_HERO_CONFIG = {
  height: 'screen',
  autoplay: true,
  autoplaySpeed: 5000,
  pauseOnHover: true,
  showIndicators: true,
  showNumber: true,
  showScrollIndicator: true,
  slidesAnimation: 'fade',
  indicatorType: 'dots',
  indicatorSize: 'md',
  contentAlignment: 'center',
  contentAnimation: 'slideUpSpring',
  scrollIndicatorVariant: 'bounce',
  scrollIndicatorColor: '#ffffff',
  scrollIndicatorSize: 'md',
  navbarSpacing: true,
  navbarHeight: 70,
};

// Navigation breakpoints
export const NAVIGATION_BREAKPOINTS = {
  TABLET_MIN: 768,
  TABLET_MAX: 1023,
  DESKTOP_MIN: 1024,
};

// Common animation delays
export const ANIMATION_DELAYS = {
  staggered: (index: number) => 0.1 * index,
  headerElements: {
    logo: 0,
    navigation: 0.2,
    buttons: 0.4,
  },
  heroElements: {
    title: 0.3,
    description: 0.5,
    primaryCta: 0.7,
    secondaryCta: 0.8,
  },
};

// Z-index coordination
export const Z_INDICES = {
  background: 0,
  overlay: 5,
  content: 10,
  navigation: 20,
  modal: 50,
  dropdown: 30,
  tooltip: 40,
  topLayer: 100,
};

// Responsive sizing scales
export const SIZES = {
  indicators: {
    sm: 6,
    md: 8,
    lg: 10,
    xl: 12,
  },
  buttons: {
    sm: {
      padding: '0.5rem 1rem',
      fontSize: '0.875rem',
      borderRadius: '0.375rem',
    },
    md: {
      padding: '0.625rem 1.25rem',
      fontSize: '1rem',
      borderRadius: '0.5rem',
    },
    lg: {
      padding: '0.75rem 1.5rem',
      fontSize: '1.125rem',
      borderRadius: '0.5rem',
    },
  },
  scrollIndicators: {
    sm: '1.5rem',
    md: '2rem',
    lg: '2.5rem',
  },
};

// Common spacing values (in tailwind units)
export const SPACING = {
  section: {
    sm: 'py-8 px-4',
    md: 'py-12 px-6',
    lg: 'py-16 px-8',
    xl: 'py-24 px-12',
  },
  container: {
    default: 'container mx-auto px-4 sm:px-6 lg:px-8',
    tight: 'max-w-5xl mx-auto px-4 sm:px-6',
    wide: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  },
};

// Common transition durations
export const TRANSITION_DURATIONS = {
  fast: 150,
  medium: 300,
  slow: 500,
};

// Debounce delays
export const DEBOUNCE_DELAYS = {
  scroll: 100,
  resize: 200,
  search: 300,
  save: 500,
};
