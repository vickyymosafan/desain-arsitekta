import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FullscreenButtonProps {
    isFullscreen: boolean;
    onClick: () => void;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
    label?: string;
}

const FullscreenButton: React.FC<FullscreenButtonProps> = ({ 
    isFullscreen, 
    onClick,
    position = 'top-right',
    label
}) => {
    // Define positioning classes based on the position prop
    const positionClasses = {
        'top-right': 'top-4 right-4',
        'top-left': 'top-4 left-4',
        'bottom-right': 'bottom-4 right-4',
        'bottom-left': 'bottom-4 left-4'
    };

    return (
        <motion.div className={`absolute ${positionClasses[position]} z-50 flex items-center`}>
            <motion.button
                onClick={onClick}
                className={`flex items-center gap-2 bg-neutral-900/80 backdrop-blur-md p-2 ${label ? 'pl-3 pr-4 rounded-full' : 'rounded-full'} border border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/20 hover:border-emerald-500/60 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:ring-offset-2 focus:ring-offset-neutral-900 transition-all duration-300 shadow-lg shadow-emerald-900/30`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: isFullscreen ? -10 : 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
            >
                <AnimatePresence mode="wait">
                    <motion.div
                        key={isFullscreen ? 'exit' : 'enter'}
                        initial={{ rotate: -15, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 15, opacity: 0 }}
                        transition={{ duration: 0.2 }}
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
                    </motion.div>
                </AnimatePresence>
                
                {label && (
                    <motion.span 
                        className="font-nunito text-sm font-medium"
                        initial={{ opacity: 0, x: -5 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {isFullscreen ? "Tutup" : "Perbesar"}
                    </motion.span>
                )}
                
                {/* Pulse effect */}
                {!isFullscreen && (
                    <motion.span 
                        className="absolute inset-0 rounded-full border-2 border-emerald-500/30"
                        animate={{ 
                            scale: [1, 1.1, 1],
                            opacity: [0.7, 0.3, 0.7]
                        }}
                        transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                )}
            </motion.button>
        </motion.div>
    );
};

export default FullscreenButton;
