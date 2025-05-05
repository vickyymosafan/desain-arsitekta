/**
 * Index file for Hero Section Components
 * 
 * Provides a centralized export point for all hero-related components
 * enabling clean imports throughout the application
 */

// Main export
import HeroSection from './content/HeroSection';
export default HeroSection;

// Re-export specific components to avoid naming conflicts
// Content components
export { default as HeroContent } from './content/HeroContent';

// Controls components
export { default as CTAButton } from './controls/CTAButton';
export { default as ScrollIndicator } from './controls/ScrollIndicator';

// Slides components
export { default as SlideBackground } from './slides/SlideBackground';
export { default as SlideDecorations } from './slides/SlideDecorations';
export { default as SlideIndicators } from './slides/SlideIndicators';
export { default as SlideInfo } from './slides/SlideInfo';
export { default as SlideNumber } from './slides/SlideNumber';
export { default as SlideTag } from './slides/SlideTag';

// Utils
export { default as useSlider } from './utils/useSlider';
