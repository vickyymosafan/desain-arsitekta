import { useState, useEffect, useRef, MutableRefObject } from 'react';
import { Slide } from './types';

interface UseSliderProps {
    slides: Slide[];
    autoplay: boolean;
    autoplaySpeed: number;
    pauseOnHover: boolean;
}

interface UseSliderReturn {
    currentSlide: number;
    isPaused: boolean;
    sliderRef: MutableRefObject<HTMLDivElement | null>;
    touchHandlers: {
        onTouchStart: (e: React.TouchEvent) => void;
        onTouchMove: (e: React.TouchEvent) => void;
        onTouchEnd: () => void;
    };
    hoverHandlers: {
        onMouseEnter: () => void;
        onMouseLeave: () => void;
    };
    slideControls: {
        goToSlide: (index: number) => void;
        goToPrevSlide: () => void;
        goToNextSlide: () => void;
    };
}

const useSlider = ({
    slides,
    autoplay,
    autoplaySpeed,
    pauseOnHover
}: UseSliderProps): UseSliderReturn => {
    // State for current slide
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    
    // Reference for the slider container
    const sliderRef = useRef<HTMLDivElement | null>(null);
    
    // Auto-advance slides
    useEffect(() => {
        if (!autoplay || isPaused) return;
        
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, autoplaySpeed);

        return () => clearInterval(interval);
    }, [autoplay, autoplaySpeed, slides.length, isPaused]);
    
    // Slide navigation handlers
    const goToSlide = (index: number): void => {
        setCurrentSlide(index);
    };

    const goToPrevSlide = (): void => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    const goToNextSlide = (): void => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };
    
    // Pause autoplay on hover if configured
    const handleMouseEnter = () => {
        if (pauseOnHover) {
            setIsPaused(true);
        }
    };
    
    const handleMouseLeave = () => {
        if (pauseOnHover) {
            setIsPaused(false);
        }
    };
    
    // Touch swipe handling
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    
    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 50;
    
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX);
    };
    
    const onTouchMove = (e: React.TouchEvent) => {
        setTouchEnd(e.targetTouches[0].clientX);
    };
    
    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        
        if (isLeftSwipe) {
            goToNextSlide();
        } else if (isRightSwipe) {
            goToPrevSlide();
        }
    };

    return {
        currentSlide,
        isPaused,
        sliderRef,
        touchHandlers: {
            onTouchStart,
            onTouchMove,
            onTouchEnd
        },
        hoverHandlers: {
            onMouseEnter: handleMouseEnter,
            onMouseLeave: handleMouseLeave
        },
        slideControls: {
            goToSlide,
            goToPrevSlide,
            goToNextSlide
        }
    };
};

export default useSlider;
