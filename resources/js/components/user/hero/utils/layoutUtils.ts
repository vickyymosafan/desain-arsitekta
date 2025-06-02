/**
 * Fungsi utilitas untuk perhitungan tata letak dan posisi di bagian hero
 * @deprecated Semua fungsi sudah dimigrasikan ke utilitas terpusat (../../utils/styles.ts)
 * File ini dipertahankan untuk backward compatibility
 */

import { getHeightStyle as getGlobalHeightStyle, getContentPosition as getGlobalContentPosition } from '../../../../utils/styles';

/**
 * Menghitung posisi konten berdasarkan konfigurasi jarak navbar
 * @deprecated Gunakan getContentPosition dari utilitas terpusat
 */
export const getContentPosition = (navbarSpacing: boolean, navbarHeight: number): React.CSSProperties => {
    // Menggunakan fungsi dari utilitas terpusat untuk konsistensi
    return getGlobalContentPosition(navbarSpacing, navbarHeight);
};

/**
 * Mengkonversi konfigurasi tinggi ke nilai CSS yang tepat
 * @deprecated Gunakan getHeightStyle dari utilitas terpusat
 */
export const getHeightStyle = (
    height?: string, 
    navbarSpacing?: boolean, 
    navbarHeight?: number
): React.CSSProperties => {
    // Menggunakan fungsi terpusat untuk konsistensi
    return getGlobalHeightStyle(
        height || 'screen',
        Boolean(navbarSpacing),
        navbarHeight || 0
    );
};
