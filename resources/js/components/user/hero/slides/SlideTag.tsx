import { FC } from 'react';
import { motion } from 'framer-motion';
import { DEFAULT_ACCENT_COLOR, COMMON_STYLES } from '../utils/constants';

/**
 * Interface untuk props komponen SlideTag
 */
interface SlideTagProps {
    /** Teks tag untuk ditampilkan */
    tag: string;
    /** Warna aksen untuk efek visual (opsional) */
    accent?: string;
}

/**
 * Komponen untuk menampilkan tag pada slide
 * Memberikan indikasi visual tentang status atau kategori slide
 */
const SlideTag: FC<SlideTagProps> = ({ tag, accent = DEFAULT_ACCENT_COLOR }) => (
    <motion.div 
        className="absolute z-20 sm:top-6 sm:right-6 top-4 right-4"
        initial={{ opacity: 0, y: -20, rotate: -5 }}
        animate={{ opacity: 1, y: 0, rotate: 0 }}
        transition={{ delay: 0.7, type: 'spring', stiffness: 120, damping: 15 }}
    >
        <div 
            className={`flex items-center gap-1 ${COMMON_STYLES.backdropPanel} px-3 py-1.5 rounded-full`} 
            style={{ 
                boxShadow: COMMON_STYLES.accentShadow(accent),
                transform: 'translateZ(0)'
            }}
        >
            {/* Indikator visual berupa titik berwarna */}
            <span 
                className="w-2 h-2 rounded-full animate-pulse" 
                style={{ background: accent }}
                aria-hidden="true"
            />
            {/* Teks tag */}
            <span className="text-white text-xs font-medium tracking-wider">{tag}</span>
        </div>
    </motion.div>
);

export default SlideTag;
