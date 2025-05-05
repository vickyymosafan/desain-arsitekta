/**
 * File konstanta untuk komponen hero
 * Berisi nilai yang digunakan di banyak komponen untuk konsistensi
 */

// Warna default untuk aksen dan branding
export const DEFAULT_ACCENT_COLOR = '#34d399';

// Preset color classes untuk beberapa warna yang sering digunakan
export const COLOR_CLASSES = {
    white: 'text-white/80',
    emerald: 'text-emerald-400',
    primary: 'text-emerald-500'
};

// Preset ukuran yang konsisten untuk berbagai komponen
export const SIZE_CLASSES = {
    sm: {
        indicator: 'h-1.5 w-1.5',
        dot: 'h-1.5 w-1.5',
        line: 'h-1.5 w-4',
        icon: 'h-6 w-6 text-xs'
    },
    md: {
        indicator: 'h-2.5 w-2.5',
        dot: 'h-2.5 w-2.5',
        line: 'h-2.5 w-6',
        icon: 'h-8 w-8 text-sm'
    },
    lg: {
        indicator: 'h-3 w-3',
        dot: 'h-3 w-3',
        line: 'h-3 w-8',
        icon: 'h-10 w-10 text-base'
    },
    xl: {
        indicator: 'h-4 w-4',
        dot: 'h-4 w-4',
        line: 'h-4 w-10',
        icon: 'h-12 w-12 text-lg'
    }
};

// Preset styling untuk komponen
export const COMMON_STYLES = {
    // Backdrop styling yang konsisten
    backdropPanel: 'bg-black/40 backdrop-blur-md border border-white/10',
    // Shadow dengan warna aksen yang konsisten
    accentShadow: (accent: string) => `0 10px 30px -5px ${accent}20`,
};
