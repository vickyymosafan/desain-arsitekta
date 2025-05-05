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

// Konstanta waktu animasi untuk konsistensi
export const ANIMATION_TIMINGS = {
  staggered: {
    title: 0.3,
    highlight: 0.4,
    description: 0.6,
    cta: 0.8
  },
  durations: {
    fast: 0.5,
    medium: 0.7,
    slow: 1.5
  }
};

// Ikon media sosial dengan data yang lebih terstruktur
export const SOCIAL_ICONS = [
    {
        href: "#",
        ariaLabel: "Facebook",
        delay: 0.7,
        svg: `<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" role="img" aria-label="Facebook"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg>`
    },
    {
        href: "#",
        ariaLabel: "Instagram",
        delay: 0.8,
        svg: `<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" role="img" aria-label="Instagram"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" /></svg>`
    },
    {
        href: "#",
        ariaLabel: "Twitter",
        delay: 0.9,
        svg: `<svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" role="img" aria-label="Twitter"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path></svg>`
    }
];
