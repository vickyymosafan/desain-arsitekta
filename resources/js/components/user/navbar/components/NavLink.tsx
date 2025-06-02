import { Link } from '@inertiajs/react';
import { NavLinkProps } from './types';
import { motion } from 'framer-motion';

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
    const baseClasses = 'group flex items-center font-medium font-nunito transition-all duration-200';
    
    // Varian styling berdasarkan jenis tampilan
    const variantStyles = {
        // Varian untuk tampilan desktop (navbar horizontal)
        desktop: `py-2 text-sm tracking-wide ${active
            ? 'text-emerald-600 dark:text-emerald-500'
            : 'text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-500'
        }`,
        // Varian untuk tampilan mobile (menu dropdown)
        mobile: `px-4 py-2 text-sm rounded-md ${active
            ? 'text-emerald-600 bg-emerald-50/80 dark:text-emerald-500 dark:bg-gray-700/80'
            : 'text-gray-700 hover:bg-gray-50/80 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-700/80 dark:hover:text-emerald-500'
        }`,
        // Varian untuk tampilan tablet (dropdown optimized)
        tablet: `w-full py-2.5 text-sm rounded-md transition-all duration-300 ${active
            ? 'text-emerald-600 bg-emerald-50/90 dark:text-emerald-400 dark:bg-emerald-900/20 font-medium'
            : 'text-gray-700 hover:bg-gray-50/90 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-700/90 dark:hover:text-emerald-400'
        }`
    };

    // Icon styling berdasarkan varian dan status aktif
    const getIconClasses = () => {
        if (variant === 'desktop') {
            return `mr-2 transition-all duration-300 ${active ? 'text-emerald-500' : 'text-gray-400 group-hover:text-emerald-500 transform group-hover:scale-110'}`;
        } else if (variant === 'tablet') {
            return `mr-3 text-lg transition-all duration-300 ${active 
                ? 'text-emerald-500 transform scale-110' 
                : 'text-gray-400 group-hover:text-emerald-500 transform group-hover:scale-110 group-hover:translate-x-1'}`;
        }
        return `mr-3 text-gray-400 group-hover:text-emerald-500 transition-all duration-300 transform group-hover:scale-110`;
    };

    return (
        <Link 
            href={href} 
            className={`${baseClasses} ${variantStyles[variant]} ${className}`}
            onClick={(e: React.MouseEvent<Element>) => onClick?.(e)}
        >
            {/* Ikon (jika ada) */}
            {icon && (
                <motion.span 
                    className={getIconClasses()}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                    <i className={`fas ${icon}`}></i>
                </motion.span>
            )}
            <span className="relative">
                {children}
                {/* Indikator aktif - garis bawah (untuk desktop) atau latar belakang (untuk tablet) */}
                {active && variant === 'desktop' && (
                    <motion.span 
                        initial={{ width: 0, opacity: 0 }}
                        animate={{ width: '100%', opacity: 1 }}
                        className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-emerald-600 to-emerald-400 rounded-full"
                    ></motion.span>
                )}
                {active && variant === 'tablet' && (
                    <motion.span
                        initial={{ width: 0, right: '100%' }}
                        animate={{ width: '5px', right: 0 }}
                        className="absolute top-0 right-0 h-full w-1 bg-emerald-500 rounded-r-full"
                    ></motion.span>
                )}
            </span>
        </Link>
    );
};

export default NavLink;
