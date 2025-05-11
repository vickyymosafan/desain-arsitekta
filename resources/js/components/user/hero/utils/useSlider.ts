// Import hook dari utilitas terpusat
import { useSlider as useSharedSlider } from '../../../../utils/hooks';
import { Slide } from '../../../../utils/shared-types';
import { RefObject } from 'react';

/**
 * Props untuk hook useSlider
 */
interface UseSliderProps {
    slides: Slide[];
    autoplay?: boolean;
    autoplaySpeed?: number;
    pauseOnHover?: boolean;
}

/**
 * Return value dari hook useSlider dengan API yang ringkas
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
 * Custom hook untuk slider functionality yang menggunakan useSharedSlider dari hooks.ts
 * @param props - Konfigurasi slider
 * @returns - Object dengan state dan handler untuk slider
 */
export const useSlider = (props: UseSliderProps): UseSliderReturn => {
    // Menggunakan hook terpusat
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
