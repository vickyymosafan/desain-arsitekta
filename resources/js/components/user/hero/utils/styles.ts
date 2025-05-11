import { applyGlobalStyles as applySharedGlobalStyles } from '../../../../utils/styles';

/**
 * @deprecated Gunakan applyGlobalStyles dari utilitas terpusat
 * Fungsi ini tetap disediakan untuk backward compatibility
 */
export const applyGlobalStyles = (): void => {
    // Menggunakan fungsi dari utilitas terpusat
    applySharedGlobalStyles();
};

// Common styling objects yang dapat digunakan ulang di komponen-komponen
export const commonStyles = {
    // Gradient styling untuk text
    gradientText: {
        emerald: {
            background: 'linear-gradient(90deg, #34d399 0%, #10b981 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundSize: '200% 100%',
            animation: 'gradient-shift 4s ease infinite'
        }
    },
    
    // Backdrop blur styling
    backdropBlur: {
        light: 'bg-white/10 backdrop-blur-md',
        medium: 'bg-white/20 backdrop-blur-md',
        dark: 'bg-black/30 backdrop-blur-md'
    },
    
    // Animations
    animation: {
        float: 'animation: float 6s ease-in-out infinite',
        pulse: 'animation: pulse 3s ease-in-out infinite'
    },
    
    // Gradient backgrounds
    gradientBg: {
        emerald: 'bg-gradient-to-r from-emerald-400 to-emerald-600',
        emeraldLight: 'bg-gradient-to-r from-emerald-300 to-emerald-500',
        emeraldDark: 'bg-gradient-to-r from-emerald-600 to-emerald-800',
    }
};
