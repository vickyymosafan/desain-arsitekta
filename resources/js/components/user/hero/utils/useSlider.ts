/**
 * This file is a bridge to the central useSlider hook
 * It provides a simpler, more convenient API specifically for Hero components
 * while leveraging the shared logic in the core hook.
 */

import { useSlider as useSharedSlider } from '../../../../utils/hooks';
import { Slide } from '../../../../utils/shared-types';
import { RefObject } from 'react';

// Re-export the UseSliderProps from the shared types
export type { UseSliderProps } from '../../../../utils/shared-types';

/**
 * Return value from the hero-specific useSlider hook with a streamlined API
 */
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
 * Hero-specific slider hook that provides a simplified interface
 * to the central useSlider hook functionality.
 * 
 * @param props - Slider configuration (slides, autoplay options, etc.)
 * @returns Object with state and handlers for the slider
 */
export const useSlider = (props: { slides: Slide[], autoplay?: boolean, autoplaySpeed?: number, pauseOnHover?: boolean }): UseSliderReturn => {
    // Use the centralized hook
    const sliderData = useSharedSlider(props);
    
    // Return a simplified interface suitable for Hero components
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
