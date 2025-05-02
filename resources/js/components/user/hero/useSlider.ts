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
    // State untuk slide saat ini
    const [currentSlide, setCurrentSlide] = useState<number>(0);
    const [isPaused, setIsPaused] = useState<boolean>(false);
    
    // Referensi untuk kontainer slider
    const sliderRef = useRef<HTMLDivElement | null>(null);
    
    // Perpindahan slide otomatis
    useEffect(() => {
        if (!autoplay || isPaused) return;
        
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, autoplaySpeed);

        return () => clearInterval(interval);
    }, [autoplay, autoplaySpeed, slides.length, isPaused]);
    
    // Handler navigasi slide
    const goToSlide = (index: number): void => {
        setCurrentSlide(index);
    };

    const goToPrevSlide = (): void => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    const goToNextSlide = (): void => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };
    
    // Jeda pemutaran otomatis saat hover jika dikonfigurasi
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
    
    // Penanganan sentuh geser (swipe)
    const [touchStart, setTouchStart] = useState<number | null>(null);
    const [touchEnd, setTouchEnd] = useState<number | null>(null);
    
    // jarak minimal antara touchStart dan touchEnd untuk dideteksi sebagai swipe
    const minSwipeDistance = 50;
    
    const onTouchStart = (e: React.TouchEvent) => {
        setTouchEnd(null); // mencegah swipe terpicu dengan interaksi sentuh biasa
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
