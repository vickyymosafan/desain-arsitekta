import { Link } from '@inertiajs/react';
import { NavLinkProps } from './types';

/**
 * Komponen NavLink
 * Menampilkan tautan navigasi dengan efek hover dan status aktif
 * 
 * @param href - URL tujuan tautan
 * @param children - Konten/isi tautan
 * @param active - Status aktif tautan (default: false)
 * @param icon - Kelas ikon FontAwesome (opsional)
 */
const NavLink = ({ href, children, active = false, icon }: NavLinkProps) => (
    <Link 
        href={href} 
        className={`group flex items-center py-2 text-sm font-medium transition-all duration-200 
            ${active
                ? 'text-emerald-600 dark:text-emerald-500'
                : 'text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-500'
            }`
        }
    >
        {/* Ikon (jika ada) */}
        {icon && (
            <span className="mr-2 text-gray-400 group-hover:text-emerald-500 transition-colors duration-200">
                <i className={`fas ${icon}`}></i>
            </span>
        )}
        <span className="relative">
            {children}
            {/* Indikator aktif - garis bawah */}
            {active && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-500 rounded-full transition-all duration-300"></span>}
        </span>
    </Link>
);

export default NavLink;
