import { ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline';

export type AnimationVariant = 
    'fadeIn' | 'fadeInSlow' | 'fadeInFast' |
    'slideUp' | 'slideUpBounce' | 'slideUpSpring' |
    'slideDown' | 'slideDownBounce' | 'slideDownSpring' |
    'slideLeft' | 'slideLeftBounce' | 'slideLeftSpring' |
    'slideRight' | 'slideRightBounce' | 'slideRightSpring' |
    'zoom' | 'zoomBounce' | 'zoomSpring' |
    'flip' | 'flipX' | 'flipY' |
    'rotate' | 'pulse' | 'shake' | 'bounce' | 'stagger' | 'none' |
    'glitch' | 'blur' | 'wave' | 'float' | 'morph' | '3dFlip' | 'neon' |
    'textReveal' | 'textGradient' | 'textShadow' | 'prismaticText';

export type TransitionType = 'tween' | 'spring' | 'inertia';
export type EasingType = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 'circIn' | 'circOut' | 'circInOut' | 'backIn' | 'backOut' | 'backInOut' | 'anticipate';

export type AnimationVariantProps = {
  initial: Record<string, any>;
  animate: Record<string, any>;
  transition: Record<string, any>;
};

export interface Slide {
    id: number;
    image: string;
    alt: string;
    headline?: string;
    subtext?: string;
    overlay?: string; // Custom overlay gradient
    position?: 'center' | 'top' | 'bottom' | 'left' | 'right'; // Image position
    video?: string; // Optional video background
    effect?: 'none' | 'parallax' | 'blur' | 'zoom' | 'glitch' | 'grain'; // Visual effects
    accent?: string; // Accent color for slide-specific highlights
    tag?: string; // Optional tag (like 'New', 'Featured', etc.)
    animation?: AnimationVariant;
    alignment?: 'left' | 'center' | 'right';
}

export interface SlideIndicatorProps {
    slides: Slide[];
    currentSlide: number;
    goToSlide: (index: number) => void;
    variant?: 'dots' | 'lines' | 'numbers' | 'pills' | 'emoji' | 'minimal';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    position?: 'bottom' | 'top' | 'left' | 'right' | 'custom';
    customClass?: string;
}

export interface CTAButton {
    text: string;
    href: string;
    variant?: ButtonVariant;
    icon?: boolean;
    external?: boolean;
}

export interface HeroContentProps {
    title: string;
    titleHighlight?: string;
    description: string;
    ctaPrimary: CTAButton;
    ctaSecondary?: CTAButton;
    currentSlide: number;
    animation?: AnimationVariant;
    alignment?: 'left' | 'center' | 'right';
}

export type IndicatorMotionProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  whileTap: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  whileHover: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  initial: Record<string, any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  animate: Record<string, any> | ((index: number) => Record<string, any>);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  transition: (index: number) => Record<string, any>;
};

export type IndicatorVariantConfig = {
    containerClass: string;
    itemClass: (index: number) => string;
    motionProps: IndicatorMotionProps;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  style: Record<string, any>;
    content: (index: number) => ReactNode;
};

export interface ScrollIndicatorProps {
    variant?: 'default' | 'pulse' | 'bounce' | 'fade';
    color?: string;
    size?: 'sm' | 'md' | 'lg';
}

export interface HeroConfig {
    height?: 'full' | 'screen' | 'auto' | string;
    autoplay?: boolean;
    autoplaySpeed?: number;
    pauseOnHover?: boolean;
    showIndicators?: boolean;
    showNumber?: boolean;
    showScrollIndicator?: boolean;
    slidesAnimation?: 
        'fade' | 'slide' | 'zoom' | 'none' | 
        'flip' | 'rotate' | 'slideUp' | 'slideDown' | 
        'crossFade' | 'elastic';
    indicatorType?: 'dots' | 'lines' | 'numbers';
    indicatorSize?: 'sm' | 'md' | 'lg';
    contentAlignment?: 'left' | 'center' | 'right';
    contentAnimation?: AnimationVariant;
    overlayStyle?: string;
    scrollIndicatorVariant?: 'default' | 'pulse' | 'bounce' | 'fade';
    scrollIndicatorColor?: string;
    scrollIndicatorSize?: 'sm' | 'md' | 'lg';
    navbarSpacing?: boolean; // Option to control spacing below navbar
    navbarHeight?: number; // Height of the navbar in pixels
}

export interface HeroSectionProps {
    config?: HeroConfig;
}
