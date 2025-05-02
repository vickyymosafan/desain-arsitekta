import { FC } from 'react';
import { motion } from 'framer-motion';

interface SlideTagProps {
    tag: string;
    accent?: string;
}

const SlideTag: FC<SlideTagProps> = ({ tag, accent = '#34d399' }) => (
    <motion.div 
        className="absolute z-20 sm:top-6 sm:right-6 top-4 right-4"
        initial={{ opacity: 0, y: -20, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 120, damping: 15 }}
    >
        <div 
            className="flex items-center gap-1 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10" 
            style={{ 
                boxShadow: `0 0 20px ${accent}40`,
                transform: 'translateZ(0)'
            }}
        >
            <span 
                className="w-2 h-2 rounded-full animate-pulse" 
                style={{ background: accent }}
                aria-hidden="true"
            />
            <span className="text-white text-xs font-medium tracking-wider">{tag}</span>
        </div>
    </motion.div>
);

export default SlideTag;
