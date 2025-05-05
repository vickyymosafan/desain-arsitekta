import { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ButtonVariant, CTAButton } from '../utils/types';

// Variasi gaya tombol dengan estetika arsitektur yang lebih terdefinisi
const buttonStyles: Record<ButtonVariant, string> = {
    primary: "relative group overflow-hidden rounded-md bg-gradient-to-r from-emerald-600 to-emerald-700 px-7 py-3.5 font-medium text-white shadow-lg shadow-emerald-600/20 transition-all duration-500 hover:shadow-emerald-500/40 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 flex items-center justify-center gap-3",
    secondary: "relative group overflow-hidden rounded-md border border-white/30 backdrop-blur-lg bg-white/5 px-7 py-3.5 font-medium text-white transition-all duration-500 hover:bg-white/10 hover:scale-[1.03] hover:border-white/50 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 flex items-center justify-center gap-3",
    outline: "relative group overflow-hidden rounded-md border border-emerald-500/70 px-7 py-3.5 font-medium text-white transition-all duration-500 hover:bg-emerald-500/10 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:ring-offset-2 flex items-center justify-center gap-3"
};

// Ikon tombol yang diolah dengan detail dan estetika arsitektur
const buttonIconMap: Record<string, React.ReactNode> = {
    contact: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
    ),
    portfolio: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
    ),
    design: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
        </svg>
    ),
    architecture: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
    ),
    order: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
    ),
    default: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
    )
};

interface CTAButtonComponentProps {
    button: CTAButton;
    index: number;
}

const CTAButtonComponent: FC<CTAButtonComponentProps> = ({ button, index }) => {
    const { text, href, variant = 'primary', icon = true, external = false } = button;
    
    // Deteksi otomatis ikon berdasarkan konten teks - dioptimalkan untuk desain dan arsitektur
    const getButtonIcon = () => {
        const lowerText = text.toLowerCase();
        if (lowerText.includes('kontak') || lowerText.includes('konsultasi')) {
            return buttonIconMap.contact;
        } else if (lowerText.includes('portfolio') || lowerText.includes('projek') || lowerText.includes('galeri')) {
            return buttonIconMap.portfolio;
        } else if (lowerText.includes('mulai') || lowerText.includes('order') || lowerText.includes('pesan')) {
            return buttonIconMap.order;
        } else if (lowerText.includes('desain') || lowerText.includes('design')) {
            return buttonIconMap.design;
        } else if (lowerText.includes('arsitek') || lowerText.includes('architecture')) {
            return buttonIconMap.architecture;
        }
        return buttonIconMap.default;
    };
    
    // Menentukan komponen tombol berdasarkan flag external
    const ButtonComponent = external ? 'a' : Link;
    const buttonProps = external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
    
    return (
        <motion.div 
            key={`btn-${index}`}
            whileHover={{ scale: 1.03, y: -2 }} 
            whileTap={{ scale: 0.97 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + (index * 0.15), type: 'spring', stiffness: 300, damping: 15 }}
            className="relative"
        >
            {/* Subtle architectural dot marker only for primary variant */}
            {variant === 'primary' && (
                <motion.div 
                    className="absolute -left-2 top-1/2 w-1.5 h-1.5 rounded-full bg-emerald-300/70 hidden xl:block"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + (index * 0.15) }}
                />
            )}
            
            <ButtonComponent
                {...buttonProps}
                className={buttonStyles[variant]}
            >
                {/* Subtle hover gradient effect overlay */}
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
                
                {/* Button text with nicer spacing and tracking */}
                <span className="tracking-wide">{text}</span>
                
                {icon && (
                    <motion.span 
                        className="relative group-hover:translate-x-1 transition-transform duration-300"
                        animate={{ x: [0, 2, 0] }}
                        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse', repeatDelay: 5 }}
                    >
                        {getButtonIcon()}
                    </motion.span>
                )}
                
                {/* Subtle animated line for primary variant */}
                {variant === 'primary' && (
                    <motion.span 
                        className="absolute bottom-0 left-0 h-0.5 bg-white/20 w-full transform origin-left"
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: [0, 1, 1] }}
                        transition={{ duration: 1.5, delay: 0.7 + (index * 0.15) }}
                    />
                )}
            </ButtonComponent>
        </motion.div>
    );
};

export default CTAButtonComponent;

// Add custom CSS for any hover effects that need gradients
if (typeof document !== 'undefined') {
    // Add once to avoid duplicates
    if (!document.getElementById('cta-button-styles')) {
        const styleElement = document.createElement('style');
        styleElement.id = 'cta-button-styles';
        styleElement.innerHTML = `
            @keyframes shimmer {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
            
            .primary-button-hover:hover::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(
                    to right,
                    rgba(255, 255, 255, 0) 0%,
                    rgba(255, 255, 255, 0.15) 50%,
                    rgba(255, 255, 255, 0) 100%
                );
                animation: shimmer 1.5s infinite;
            }
        `;
        document.head.appendChild(styleElement);
    }
}
