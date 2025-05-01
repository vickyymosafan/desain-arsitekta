import { FC } from 'react';
import { motion } from 'framer-motion';
import { Link } from '@inertiajs/react';
import { ButtonVariant, CTAButton } from './types';

// Button style variants
const buttonStyles: Record<ButtonVariant, string> = {
    primary: "rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-6 py-3.5 font-medium text-white shadow-lg shadow-emerald-500/20 transition-all duration-300 hover:shadow-emerald-500/40 hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 group flex items-center justify-center gap-2",
    secondary: "rounded-xl border border-white/70 backdrop-blur-md bg-white/10 px-6 py-3.5 font-medium text-white transition-all duration-300 hover:bg-white/20 hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 flex items-center justify-center gap-2",
    outline: "rounded-xl border-2 border-emerald-500 px-6 py-3.5 font-medium text-white transition-all duration-300 hover:bg-emerald-500/20 hover:scale-105 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 flex items-center justify-center gap-2"
};

// Helper type for button icons
const buttonIconMap: Record<string, React.ReactNode> = {
    contact: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
    portfolio: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>,
    order: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>,
    default: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7l5 5m0 0l-5 5m5-5H6" /></svg>
};

interface CTAButtonComponentProps {
    button: CTAButton;
    index: number;
}

const CTAButtonComponent: FC<CTAButtonComponentProps> = ({ button, index }) => {
    const { text, href, variant = 'primary', icon = true, external = false } = button;
    
    // Button icon based on text content - auto-detect for better UX
    const getButtonIcon = () => {
        const lowerText = text.toLowerCase();
        if (lowerText.includes('kontak') || lowerText.includes('konsultasi')) {
            return buttonIconMap.contact;
        } else if (lowerText.includes('portfolio') || lowerText.includes('projek') || lowerText.includes('galeri')) {
            return buttonIconMap.portfolio;
        } else if (lowerText.includes('mulai') || lowerText.includes('order') || lowerText.includes('pesan')) {
            return buttonIconMap.order;
        } 
        return buttonIconMap.default;
    };
    
    // Determine button component based on external flag
    const ButtonComponent = external ? 'a' : Link;
    const buttonProps = external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
    
    return (
        <motion.div 
            key={`btn-${index}`}
            whileHover={{ scale: 1.05, y: -5 }} 
            whileTap={{ scale: 0.95, rotate: -1 }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (index * 0.15), type: 'spring', stiffness: 400, damping: 10 }}
        >
            <ButtonComponent
                {...buttonProps}
                className={buttonStyles[variant]}
            >
                {text}
                {icon && (
                    <span className="relative ml-1 group-hover:translate-x-1 transition-transform">
                        {getButtonIcon()}
                    </span>
                )}
            </ButtonComponent>
        </motion.div>
    );
};

export default CTAButtonComponent;
