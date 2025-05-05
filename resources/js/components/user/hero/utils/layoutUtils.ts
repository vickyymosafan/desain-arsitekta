/**
 * Fungsi utilitas untuk perhitungan tata letak dan posisi di bagian hero
 */

/**
 * Menghitung posisi konten berdasarkan konfigurasi jarak navbar
 */
export const getContentPosition = (navbarSpacing: boolean, navbarHeight: number): React.CSSProperties => {
    if (navbarSpacing) {
        return {
            height: `calc(100vh - ${navbarHeight}px)`,
            minHeight: `calc(100vh - ${navbarHeight}px)`
        };
    }
    return {
        height: '100vh',
        minHeight: '100vh'
    };
};

/**
 * Mengkonversi konfigurasi tinggi ke nilai CSS yang tepat
 */
export const getHeightStyle = (
    height?: string, 
    navbarSpacing?: boolean, 
    navbarHeight?: number
): React.CSSProperties => {
    if (!height) return {};
    
    if (height === 'screen') {
        return navbarSpacing 
            ? { 
                height: `calc(100vh - ${navbarHeight}px)`,
                minHeight: `calc(100vh - ${navbarHeight}px)` 
            }
            : { 
                height: '100vh',
                minHeight: '100vh' 
            };
    } else if (height === 'full') {
        return { 
            height: '100%',
            minHeight: '100vh' 
        };
    } else if (height === 'auto') {
        return { height: 'auto' };
    } else if (height.includes('px') || height.includes('%') || height.includes('vh')) {
        return { 
            height,
            minHeight: height.includes('vh') ? height : '100vh'
        };
    }
    
    return { height: '100vh' };
};
