import { ReactNode } from 'react';

// Shared button variants
export type ButtonVariant = 'primary' | 'secondary' | 'outline';

// Animation variants for consistent use across components
export type AnimationVariant = 
    'fadeIn' | 'fadeInSlow' | 'fadeInFast' |
    'slideUp' | 'slideUpBounce' | 'slideUpSpring' |
    'slideDown' | 'slideLeft' | 'slideRight' | 
    'zoom' | 'fade' | 'none' | 'blur';

// Animation transition types
export type TransitionType = 'tween' | 'spring' | 'inertia';

// Animation easing types
export type EasingType = 
    'linear' | 'easeIn' | 'easeOut' | 'easeInOut' | 
    'circIn' | 'circOut' | 'circInOut' | 
    'backIn' | 'backOut' | 'backInOut' | 'anticipate';

// Common animation variant props structure
export type AnimationVariantProps = {
  initial: Record<string, any>;
  animate: Record<string, any>;
  transition: Record<string, any>;
};

// Base interface for any component with children
export interface BaseComponentProps {
  children?: ReactNode;
  className?: string;
}

// Text size variants
export type TextSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';

// Common size variants
export type SizeVariant = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

// Common position variants
export type PositionVariant = 'top' | 'bottom' | 'left' | 'right' | 'center' | 'custom';

// Theme mode
export type ThemeMode = 'light' | 'dark';

// Generic dropdown item
export interface DropdownItem {
  id: string | number;
  label: string;
  href?: string;
  icon?: string | ReactNode;
}

// Common form field props
export interface FormFieldProps {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  disabled?: boolean;
  className?: string;
}

// Responsive breakpoints
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

// Section config
export interface SectionConfig {
  id?: string;
  className?: string;
  fullscreen?: boolean;
  padding?: string;
  backgroundColor?: string;
  textColor?: string;
  backgroundImage?: string;
  overlay?: boolean;
  overlayColor?: string;
  overlayOpacity?: number;
  verticalAlign?: 'top' | 'center' | 'bottom';
  horizontalAlign?: 'left' | 'center' | 'right';
}
