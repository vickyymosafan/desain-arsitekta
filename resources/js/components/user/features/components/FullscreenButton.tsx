import React from 'react';
import { motion } from 'framer-motion';

interface FullscreenButtonProps {
    isFullscreen: boolean;
    onClick: () => void;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

const FullscreenButton: React.FC<FullscreenButtonProps> = ({ 
    isFullscreen, 
    onClick,
    position = 'top-right'
}) => {
    // Define positioning classes based on the position prop
    const positionClasses = {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4'
    };

    return (
        <motion.button
            onClick={onClick}
            className={`absolute ${positionClasses[position]} z-50 bg-neutral-900/70 backdrop-blur-md p-2 rounded-full border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/20 transition-all duration-300`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
            {isFullscreen ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                </svg>
            )}
        </motion.button>
    );
};

export default FullscreenButton;
