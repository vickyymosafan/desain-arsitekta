import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, usePage } from '@inertiajs/react';
import { ButtonVariant, CTAButton } from '../utils/types';
import AuthRequiredModal from '../../../modals/AuthRequiredModal';
import DatePickerModal from '../../../consultation/DatePickerModal';
import { useConsultation } from '../../../../contexts/ConsultationContext';
import { SharedData } from '../../../../types';

// Variasi gaya tombol dengan estetika modern untuk Gen-Z dan profesional arsitektur
const buttonStyles: Record<ButtonVariant, string> = {
    primary: "relative group overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 px-7 py-3.5 font-medium text-white shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:shadow-emerald-400/50 hover:translate-y-[-3px] active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 flex items-center justify-center gap-3",
    secondary: "relative group overflow-hidden rounded-xl border border-white/20 backdrop-blur-xl bg-white/10 px-7 py-3.5 font-medium text-white transition-all duration-300 hover:bg-white/15 hover:translate-y-[-3px] active:translate-y-[1px] hover:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/30 focus:ring-offset-2 flex items-center justify-center gap-3",
    outline: "relative group overflow-hidden rounded-xl border border-emerald-400/70 px-7 py-3.5 font-medium text-white transition-all duration-300 hover:bg-emerald-500/10 hover:translate-y-[-3px] active:translate-y-[1px] focus:outline-none focus:ring-2 focus:ring-emerald-400/50 focus:ring-offset-2 flex items-center justify-center gap-3"
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
    const { text, href = '#', variant = 'primary', icon = true, external = false, onClick, openDatePicker = false } = button;
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
    
    // Get auth state from page props
    const { auth } = usePage<SharedData>().props;
    
    // Get consultation context if available
    let consultationContext;
    try {
        consultationContext = useConsultation();
    } catch (error) {
        // ConsultationProvider not available, which is fine for regular buttons
        consultationContext = null;
    }
    
    // Mendapatkan ikon berdasarkan teks tombol atau menggunakan default
    const getButtonIcon = (buttonText: string) => {
        const lowerText = buttonText.toLowerCase();
        if (lowerText.includes('konsultasi') || lowerText.includes('hubung')) return buttonIconMap.contact;
        if (lowerText.includes('portofolio') || lowerText.includes('karya')) return buttonIconMap.portfolio;
        if (lowerText.includes('desain')) return buttonIconMap.design;
        if (lowerText.includes('arsitektur')) return buttonIconMap.architecture;
        if (lowerText.includes('pesan') || lowerText.includes('order')) return buttonIconMap.order;
        return buttonIconMap.default;
    };

    // We'll use getButtonIcon directly in the render rather than storing in a variable
    
    // Handle date selection from date picker
    const handleDateSelection = (date: Date) => {
        if (consultationContext) {
            consultationContext.submitConsultationRequest(date);
        }
    };

    // Handle button click for consultation
    const handleConsultationClick = (e: React.MouseEvent) => {
        // If custom onClick handler is provided, use it
        if (onClick) {
            e.preventDefault();
            onClick();
            return;
        }
        
        // Handle opening date picker directly
        if (openDatePicker) {
            e.preventDefault();
            
            // Check if user is authenticated
            const isAuthenticated = auth?.user;
            
            if (!isAuthenticated) {
                setIsAuthModalOpen(true);
            } else {
                setIsDatePickerOpen(true);
            }
            return;
        }
        
        // For other consultation buttons without specific handlers
        const isConsultation = text.toLowerCase().includes('konsultasi');
        const isAuthenticated = auth?.user;
        
        if (isConsultation && !isAuthenticated) {
            e.preventDefault();
            setIsAuthModalOpen(true);
        }
    };
    
    // Menentukan komponen tombol berdasarkan flag external
    const ButtonComponent = external ? 'a' : href === '#' ? 'button' : Link;
    
    // Build button props based on component type
    let buttonProps: any = { onClick: handleConsultationClick };
    
    if (external) {
        buttonProps = { 
            ...buttonProps, 
            href, 
            target: "_blank", 
            rel: "noopener noreferrer" 
        };
    } else if (href !== '#') {
        buttonProps = { ...buttonProps, href };
    }
    
    return (
        <>
            <motion.div
                whileHover={{ scale: 1.03, y: -2 }} 
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (index * 0.15), type: 'spring', stiffness: 300, damping: 15 }}
                className="relative"
            >
                {/* Dot marker removed as requested */}
                
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
                            {getButtonIcon(text)}
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
            
            {/* Authentication required modal */}
            <AuthRequiredModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            />
            
            {/* Date picker modal for consultation */}
            {openDatePicker && (
                <DatePickerModal
                    isOpen={isDatePickerOpen}
                    onClose={() => setIsDatePickerOpen(false)}
                    onSubmit={handleDateSelection}
                />
            )}
        </>
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
