/**
 * Centralized styles utilities for consistent styling across components
 */

// Color palette based on the emerald theme (from memory)
export const colors = {
  primary: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    300: '#6ee7b7',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    800: '#065f46',
    900: '#064e3b',
    950: '#022c22',
  },
  secondary: {
    light: '#f8fafc',
    main: '#e2e8f0',
    dark: '#64748b',
  },
  text: {
    primary: '#0f172a',
    secondary: '#475569',
    muted: '#94a3b8',
    light: '#f8fafc',
  },
  background: {
    light: '#ffffff',
    dark: '#0f172a',
    paper: '#f8fafc',
  },
  status: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },
};

// Typography scale
export const typography = {
  fontFamily: {
    heading: "'Playfair Display', serif",
    body: "'Nunito', sans-serif",
  },
  fontWeight: {
    light: 300,
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  lineHeight: {
    tight: 1.1,
    normal: 1.5,
    relaxed: 1.8,
  },
};

// Spacing scale (in px)
export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  '2xl': 48,
  '3xl': 64,
  '4xl': 96,
};

// Shadow presets
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  outline: '0 0 0 3px rgba(16, 185, 129, 0.5)',
  none: 'none',
};

// Border radius presets
export const borderRadius = {
  none: '0',
  sm: '0.125rem',
  md: '0.375rem',
  lg: '0.5rem',
  xl: '1rem',
  '2xl': '2rem',
  full: '9999px',
};

// Z-index scale
export const zIndex = {
  hide: -1,
  auto: 'auto',
  base: 0,
  dropdown: 10,
  sticky: 20,
  header: 30,
  drawer: 40,
  modal: 50,
  tooltip: 60,
  snackbar: 70,
  toast: 80,
  overlay: 90,
  top: 100,
};

// Common breakpoints
export const breakpoints = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

// Container max widths
export const containers = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

// Animation durations
export const durations = {
  fastest: 100,
  fast: 200,
  normal: 300,
  slow: 500,
  slowest: 700,
};

// Helper function to get responsive class based on breakpoint
export const getResponsiveClass = (baseClass: string, breakpoint: string | null = null) => {
  if (!breakpoint) return baseClass;
  return `${breakpoint}:${baseClass}`;
};

// Helper function to apply global styles (previously in hero/utils/styles.ts)
export const applyGlobalStyles = () => {
  // This will be moved to a higher-level component in the refactoring
  if (typeof document !== 'undefined') {
    // Apply any global styles if needed
    const documentRoot = document.documentElement;
    documentRoot.style.scrollBehavior = 'smooth';
  }
};

// Helper function to get height style based on various config options
export const getHeightStyle = (
  height: string = 'screen',
  applySpacing: boolean = false,
  spacingValue: number = 0
) => {
  switch (height) {
    case 'screen':
      return { height: applySpacing ? `calc(100vh - ${spacingValue}px)` : '100vh' };
    case 'full':
      return { height: '100%' };
    case 'auto':
      return { height: 'auto' };
    default:
      return { height };
  }
};

/**
 * Menghitung posisi konten berdasarkan konfigurasi jarak navbar
 * Memastikan konten berada pada posisi yang tepat dengan mempertimbangkan navbar
 */
export const getContentPosition = (navbarSpacing: boolean, navbarHeight: number): React.CSSProperties => {
  if (navbarSpacing) {
    return {
      height: `calc(100vh - ${navbarHeight}px)`,
      minHeight: `calc(100vh - ${navbarHeight}px)`
    };
  }
  return {
    height: '100vh',
    minHeight: '100vh'
  };
};
