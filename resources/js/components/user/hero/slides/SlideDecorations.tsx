import { FC } from 'react';
import { motion } from 'framer-motion';
import { DEFAULT_ACCENT_COLOR } from '../utils/constants';

// Antarmuka untuk komponen SlideDecorations
interface SlideDecorationsProps {
    accent?: string;
}

// Komponen SlideDecorations
const SlideDecorations: FC<SlideDecorationsProps> = ({ accent = DEFAULT_ACCENT_COLOR }) => (
    <>
        {/* Elemen div pertama */}
        <motion.div 
            className="absolute opacity-20 mix-blend-screen hidden md:block" 
            style={{ 
                background: accent,
                left: 'calc(10% + clamp(0px, 2vw, 20px))',
                top: 'calc(20% + clamp(0px, 2vh, 20px))',
                width: 'clamp(64px, 8vw, 128px)',
                height: 'clamp(64px, 8vw, 128px)',
                borderRadius: '50%',
                willChange: 'transform, opacity',
                pointerEvents: 'none'
            }}
            animate={{ 
                y: [-10, 10, -5, 0],
                scale: [1, 1.1, 0.9, 1],
                rotate: [0, 5, -5, 0],
                opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror' }}
            aria-hidden="true"
        />
        
        {/* Elemen div kedua */}
        <motion.div 
            className="absolute opacity-20 mix-blend-screen hidden md:block" 
            style={{ 
                background: accent,
                right: 'calc(15% + clamp(0px, 2vw, 20px))',
                bottom: 'calc(25% + clamp(0px, 2vh, 20px))',
                width: 'clamp(48px, 6vw, 96px)',
                height: 'clamp(48px, 6vw, 96px)',
                borderRadius: '50%',
                willChange: 'transform, opacity',
                pointerEvents: 'none'
            }}
            animate={{ 
                y: [10, -10, 5, 0],
                scale: [0.9, 1.1, 1, 0.9],
                rotate: [0, -5, 5, 0],
                opacity: [0.2, 0.3, 0.2]
            }}
            transition={{ duration: 6, repeat: Infinity, repeatType: 'mirror', delay: 1 }}
            aria-hidden="true"
        />
    </>
);

// Ekspor komponen SlideDecorations sebagai default
export default SlideDecorations;
