// Main component
export { default } from './HeroSection';

// Sub-components - export them in case they need to be used individually
export { default as HeroContent } from './HeroContent';
export { default as SlideIndicators } from './SlideIndicators';
export { default as ScrollIndicator } from './ScrollIndicator';
export { default as CTAButton } from './CTAButton';
export { default as SlideBackground } from './SlideBackground';
export { default as SlideNumber } from './SlideNumber';
export { default as SlideDecorations } from './SlideDecorations';
export { default as SlideTag } from './SlideTag';
export { default as SlideInfo } from './SlideInfo';

// Types
export * from './types';

// Animation utilities
export * from './animationUtils';

// Layout utilities
export * from './layoutUtils';
