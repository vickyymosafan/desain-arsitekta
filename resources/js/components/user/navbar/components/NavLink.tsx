import { Link } from '@inertiajs/react';
import { NavLinkProps } from './types';

/**
 * Komponen NavLink
 * Menampilkan tautan navigasi dengan efek hover dan status aktif
 * Mendukung variasi tampilan untuk desktop dan mobile
 * 
 * @param href - URL tujuan tautan
 * @param children - Konten/isi tautan
 * @param active - Status aktif tautan (default: false)
 * @param icon - Kelas ikon FontAwesome (opsional)
 * @param variant - Variasi tampilan (default: 'desktop')
 * @param onClick - Fungsi callback saat link diklik
 * @param className - Class tambahan untuk styling kustom
 */
const NavLink = ({ 
    href, 
    children, 
    active = false, 
    icon,
    variant = 'desktop',
    onClick,
    className = ''
}: NavLinkProps) => {
    // Base classes untuk semua varian
    const baseClasses = 'group flex items-center font-medium transition-all duration-200';
    
    // Varian styling berdasarkan jenis tampilan
    const variantStyles = {
        // Varian untuk tampilan desktop (navbar horizontal)
        desktop: `py-2 text-sm ${active
            ? 'text-emerald-600 dark:text-emerald-500'
            : 'text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-500'
        }`,
        // Varian untuk tampilan mobile (menu dropdown)
        mobile: `px-4 py-2 text-sm rounded-md ${active
            ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-500 dark:bg-gray-700'
            : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-emerald-500'
        }`
    };

    // Icon styling berdasarkan varian dan status aktif
    const getIconClasses = () => {
        if (variant === 'desktop') {
            return `mr-2 transition-colors duration-200 ${active ? 'text-emerald-500' : 'text-gray-400 group-hover:text-emerald-500'}`;
        }
        return `mr-3 text-gray-400 group-hover:text-emerald-500`;
    };

    return (
        <Link 
            href={href} 
            className={`${baseClasses} ${variantStyles[variant]} ${className}`}
            onClick={onClick}
        >
            {/* Ikon (jika ada) */}
            {icon && (
                <span className={getIconClasses()}>
                    <i className={`fas ${icon}`}></i>
                </span>
            )}
            <span className="relative">
                {children}
                {/* Indikator aktif - garis bawah (hanya untuk desktop) */}
                {active && variant === 'desktop' && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-500 rounded-full transition-all duration-300"></span>
                )}
            </span>
        </Link>
    );
};

export default NavLink;
