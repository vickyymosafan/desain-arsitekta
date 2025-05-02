import { FC } from 'react';

interface SlideNumberProps {
    currentSlide: number;
    totalSlides: number;
}

const SlideNumber: FC<SlideNumberProps> = ({ currentSlide, totalSlides }) => {
    return (
        <div className="text-white font-light text-3xl tracking-tighter shadow-lg bg-black/20 backdrop-blur-sm rounded-md px-3 py-1 border border-white/10">
            <span className="text-emerald-400 font-medium">
                {(currentSlide + 1).toString().padStart(2, '0')}
            </span>
            <span className="text-white/40 mx-2">/</span>
            <span className="text-white/70">
                {totalSlides.toString().padStart(2, '0')}
            </span>
        </div>
    );
};

export default SlideNumber;
