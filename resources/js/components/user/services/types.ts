import { ReactNode } from 'react';

export interface ServiceData {
  id?: string;
  title: string;
  description: string;
  icon: string;
  category?: string;
}

export type AnimationVariant = 
  'fadeIn' | 'slideUp' | 'slideDown' | 'zoom' | 
  'float' | 'tilt' | 'glow' | 'none';

export interface ServiceCardProps extends ServiceData {
  index?: number;
  animation?: AnimationVariant;
}

export interface ServicesSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  ctaText?: string;
  ctaLink?: string;
}

export interface AnimationVariantProps {
  initial: Record<string, any>;
  animate: Record<string, any>;
  transition: Record<string, any>;
}
