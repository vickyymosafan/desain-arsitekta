import React from 'react';

interface TransformationControlsProps {
    current: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
}

const TransformationControls: React.FC<TransformationControlsProps> = ({ 
    current, 
    total, 
    onPrev, 
    onNext 
}) => {
    return (
        <div className="flex flex-col space-y-4">
            {/* Navigation Controls */}
            <div className="flex justify-between items-center bg-gray-900/70 backdrop-blur-md rounded-xl p-4 border border-emerald-800/30">
                {/* Previous Button */}
                <button
                    onClick={onPrev}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-gray-800 hover:bg-emerald-900/50 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </button>
                
                {/* Counter */}
                <div className="text-center">
                    <span className="text-2xl font-bold text-emerald-400">{current}</span>
                    <span className="text-gray-500 mx-2">/</span>
                    <span className="text-gray-400">{total}</span>
                </div>
                
                {/* Next Button */}
                <button
                    onClick={onNext}
                    className="w-12 h-12 rounded-full flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
            
            {/* Indicators */}
            <div className="flex justify-center space-x-2">
                {Array.from({ length: total }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => {
                            // Go to the previous slide until we reach the target
                            if (index < current - 1) {
                                for (let i = 0; i < current - 1 - index; i++) {
                                    onPrev();
                                }
                            }
                            // Go to the next slide until we reach the target
                            else if (index > current - 1) {
                                for (let i = 0; i < index - (current - 1); i++) {
                                    onNext();
                                }
                            }
                        }}
                        className={`w-3 h-3 rounded-full focus:outline-none ${index === current - 1 ? 'bg-emerald-500' : 'bg-gray-700 hover:bg-gray-600'}`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default TransformationControls;
