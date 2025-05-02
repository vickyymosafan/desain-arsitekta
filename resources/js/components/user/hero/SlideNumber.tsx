import { FC } from 'react';

/**
 * Interface untuk props komponen SlideNumber
 */
interface SlideNumberProps {
    /** Nomor slide saat ini */
    currentSlide: number;
    /** Jumlah total slide */
    totalSlides: number;
}

/**
 * Komponen untuk menampilkan nomor slide saat ini dan total slide
 */
const SlideNumber: FC<SlideNumberProps> = ({ currentSlide, totalSlides }) => {
    return (
        <div className="text-white font-light text-3xl tracking-tighter shadow-lg bg-black/20 backdrop-blur-sm rounded-md px-3 py-1 border border-white/10">
            {/* Nomor slide saat ini */}
            <span className="text-emerald-400 font-medium">
                {(currentSlide + 1).toString().padStart(2, '0')}
            </span>
            {/* Tanda pemisah */}
            <span className="text-white/40 mx-2">/</span>
            {/* Jumlah total slide */}
            <span className="text-white/70">
                {totalSlides.toString().padStart(2, '0')}
            </span>
        </div>
    );
};

export default SlideNumber;
