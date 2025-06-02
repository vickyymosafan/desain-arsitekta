import React from 'react';
import { motion } from 'framer-motion';

interface TestimonialControlsProps {
    current: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
    onSelect: (index: number) => void;
    autoplay: boolean;
    onToggleAutoplay: () => void;
}

const TestimonialControls: React.FC<TestimonialControlsProps> = ({ 
    current, 
    total, 
    onPrev, 
    onNext, 
    onSelect,
    autoplay,
    onToggleAutoplay
}) => {
    return (
        <div className="flex flex-col items-center space-y-4">
            {/* Navigation Controls */}
            <div className="flex items-center justify-center space-x-4">
                {/* Previous Button */}
                <button
                    onClick={onPrev}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-800 hover:bg-emerald-900/50 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    aria-label="Previous testimonial"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                
                {/* Indicators */}
                <div className="flex space-x-2">
                    {Array.from({ length: total }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => onSelect(index)}
                            className={`w-3 h-3 rounded-full focus:outline-none transition-all duration-300 ${index === current ? 'bg-emerald-500 scale-125' : 'bg-gray-700 hover:bg-gray-600'}`}
                            aria-label={`Go to testimonial ${index + 1}`}
                        />
                    ))}
                </div>
                
                {/* Next Button */}
                <button
                    onClick={onNext}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                    aria-label="Next testimonial"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            
            {/* Autoplay Toggle */}
            <button 
                onClick={onToggleAutoplay}
                className="flex items-center text-sm text-gray-400 hover:text-emerald-400 transition-colors duration-300 focus:outline-none"
                aria-label={autoplay ? 'Pause autoplay' : 'Start autoplay'}
            >
                {autoplay ? (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Pause</span>
                    </>
                ) : (
                    <>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>Auto-play</span>
                    </>
                )}
            </button>
        </div>
    );
};

export default TestimonialControls;
