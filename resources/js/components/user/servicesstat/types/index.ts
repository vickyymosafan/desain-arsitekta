// Common types used across components
export interface AnimatedBackgroundProps {
  scrollY: number;
  density?: number;
}

// Stat and Service item types
export interface StatItemProps {
  icon: React.ReactNode;
  count: string;
  label: string;
  onClick?: () => void;
}

export interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
  onClick?: () => void;
}

// Constants
export const ANIMATION_VIEWPORT = { once: true, margin: "-100px" };
export const MOBILE_BREAKPOINT = 768;
export const DESKTOP_BREAKPOINT = 1024;
