/**
 * Re-exports and adapts the shared useSlider hook
 * This file serves as an adapter to maintain API compatibility while using centralized functionality
 */

import { useSlider as useSharedSlider } from '../../../../utils/hooks';
import { Slide } from '../../../../utils/shared-types';
import { RefObject } from 'react';

// Types for component-specific API compatibility
export interface UseSliderProps {
  slides: Slide[];
  autoplay?: boolean;
  autoplaySpeed?: number;
  pauseOnHover?: boolean;
}

export interface UseSliderReturn {
  currentSlide: number;
  goToSlide: (index: number) => void;
  goToPrevSlide: () => void;
  goToNextSlide: () => void;
  sliderRef: RefObject<HTMLDivElement | null>;
  isPaused: boolean;
  touchHandlers: {
    onTouchStart: (e: React.TouchEvent) => void;
    onTouchMove: (e: React.TouchEvent) => void;
    onTouchEnd: () => void;
  };
  hoverHandlers: {
    onMouseEnter: () => void;
    onMouseLeave: () => void;
  };
  clickHandlers: {
    onClick: (e: React.MouseEvent) => void;
  };
}

/**
 * Adapter for the centralized useSlider hook that maintains the component-specific API
 */
export const useSlider = (props: UseSliderProps): UseSliderReturn => {
  const sliderData = useSharedSlider(props);
  
  return {
    currentSlide: sliderData.currentSlide,
    goToSlide: sliderData.slideControls.goToSlide,
    goToPrevSlide: sliderData.slideControls.goToPrevSlide,
    goToNextSlide: sliderData.slideControls.goToNextSlide,
    sliderRef: sliderData.sliderRef,
    isPaused: sliderData.isPaused,
    touchHandlers: sliderData.touchHandlers,
    hoverHandlers: sliderData.hoverHandlers,
    clickHandlers: sliderData.clickHandlers
  };
};

export default useSlider;
