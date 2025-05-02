import { FC } from 'react';
import { motion } from 'framer-motion';

interface SlideInfoProps {
    headline?: string;
    subtext?: string;
    accent?: string;
}

const SlideInfo: FC<SlideInfoProps> = ({ headline, subtext, accent = '#34d399' }) => (
    <motion.div 
        className="absolute bg-black/40 backdrop-blur-md rounded-xl py-3 px-5 max-w-xs hidden md:block border border-white/10"
        style={{ 
            boxShadow: `0 10px 30px -5px ${accent}20`,
            top: 'clamp(24px, 5vh, 40px)',
            left: 'clamp(24px, 5vw, 40px)',
            maxWidth: 'clamp(240px, 25vw, 320px)',
            transform: 'translateZ(0)'
        }}
        initial={{ opacity: 0, x: -30, y: 20 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        transition={{ delay: 0.4, duration: 0.7, type: 'spring', stiffness: 100, damping: 15 }}
    >
        {headline && 
            <motion.h3 
                className="text-white font-semibold text-xl mb-1"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
            >
                <span 
                    className="pr-2 inline-block"
                    style={{ 
                        borderLeft: `3px solid ${accent}`, 
                        paddingLeft: '8px',
                        marginLeft: '-12px'
                    }}
                >
                    {headline}
                </span>
            </motion.h3>
        }
        
        {subtext && 
            <motion.p 
                className="text-white/80 text-sm"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
            >
                {subtext}
            </motion.p>
        }
    </motion.div>
);

export default SlideInfo;
