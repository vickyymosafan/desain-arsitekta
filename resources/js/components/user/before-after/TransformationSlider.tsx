import React, { useState, useRef, useEffect } from 'react';

interface TransformationSliderProps {
    beforeImage: string;
    afterImage: string;
    altText: string;
}

const TransformationSlider: React.FC<TransformationSliderProps> = ({ 
    beforeImage, 
    afterImage, 
    altText 
}) => {
    const [sliderPosition, setSliderPosition] = useState(50);
    const [isDragging, setIsDragging] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    
    // Placeholder images for missing project images
    const placeholderImage = '/assets/images/placeholder-project.jpg';

    // Handle mouse down event
    const handleMouseDown = () => {
        setIsDragging(true);
    };

    // Handle mouse up event
    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Handle mouse move event
    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging || !containerRef.current) return;
        
        const containerRect = containerRef.current.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const relativeX = e.clientX - containerRect.left;
        
        // Calculate position as a percentage
        let newPosition = (relativeX / containerWidth) * 100;
        
        // Clamp position between 0 and 100
        newPosition = Math.max(0, Math.min(100, newPosition));
        
        setSliderPosition(newPosition);
    };

    // Handle touch move event
    const handleTouchMove = (e: TouchEvent) => {
        if (!containerRef.current) return;
        
        const containerRect = containerRef.current.getBoundingClientRect();
        const containerWidth = containerRect.width;
        const touch = e.touches[0];
        const relativeX = touch.clientX - containerRect.left;
        
        // Calculate position as a percentage
        let newPosition = (relativeX / containerWidth) * 100;
        
        // Clamp position between 0 and 100
        newPosition = Math.max(0, Math.min(100, newPosition));
        
        setSliderPosition(newPosition);
    };

    // Set up event listeners
    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // Mouse events
        const handleMouseMoveWrapper = (e: MouseEvent) => handleMouseMove(e);
        const handleMouseUpWrapper = () => handleMouseUp();
        
        // Touch events
        const handleTouchMoveWrapper = (e: TouchEvent) => {
            e.preventDefault(); // Prevent scrolling when dragging
            handleTouchMove(e);
        };
        const handleTouchEndWrapper = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMoveWrapper);
            window.addEventListener('mouseup', handleMouseUpWrapper);
            window.addEventListener('touchmove', handleTouchMoveWrapper, { passive: false });
            window.addEventListener('touchend', handleTouchEndWrapper);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMoveWrapper);
            window.removeEventListener('mouseup', handleMouseUpWrapper);
            window.removeEventListener('touchmove', handleTouchMoveWrapper);
            window.removeEventListener('touchend', handleTouchEndWrapper);
        };
    }, [isDragging]);

    return (
        <div 
            ref={containerRef}
            className="relative w-full aspect-[4/3] bg-gray-900 select-none overflow-hidden"
        >
            {/* After Image (Background) */}
            <div className="absolute inset-0 w-full h-full">
                <img 
                    src={afterImage} 
                    alt={`${altText} - After`}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => { 
                        const target = e.target as HTMLImageElement;
                        target.src = placeholderImage;
                    }}
                />
                <div className="absolute top-4 right-4 bg-emerald-700 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    Sesudah
                </div>
            </div>

            {/* Before Image (Foreground with clip-path) */}
            <div 
                className="absolute inset-0 w-full h-full overflow-hidden"
                style={{ 
                    clipPath: `polygon(0 0, ${sliderPosition}% 0, ${sliderPosition}% 100%, 0 100%)` 
                }}
            >
                <img 
                    src={beforeImage} 
                    alt={`${altText} - Before`}
                    className="w-full h-full object-cover object-center"
                    onError={(e) => { 
                        const target = e.target as HTMLImageElement;
                        target.src = placeholderImage;
                    }}
                />
                <div className="absolute top-4 left-4 bg-gray-800 text-white text-xs font-medium px-3 py-1.5 rounded-full">
                    Sebelum
                </div>
            </div>

            {/* Slider Handle */}
            <div 
                className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize"
                style={{ left: `calc(${sliderPosition}% - 0.5px)` }}
                onMouseDown={handleMouseDown}
                onTouchStart={() => setIsDragging(true)}
            >
                {/* Slider Control */}
                <div 
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white shadow-lg flex items-center justify-center cursor-ew-resize"
                    style={{ left: 0 }}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className="h-4 w-4 text-emerald-700" 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                    </svg>
                </div>
            </div>

            {/* Instructions Overlay (only visible on initial load) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm text-white text-xs px-4 py-2 rounded-full pointer-events-none">
                Geser untuk melihat perubahan
            </div>
        </div>
    );
};

export default TransformationSlider;
