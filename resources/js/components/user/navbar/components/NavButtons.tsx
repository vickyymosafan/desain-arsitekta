import { Link } from '@inertiajs/react';
import { ButtonProps } from './types';

/**
 * Tombol Primer/Utama
 * Digunakan untuk aksi utama dengan latar belakang warna emerald
 */
export const PrimaryButton = ({ href, children, icon, onClick }: ButtonProps) => (
    <Link
        href={href}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:bg-emerald-600 dark:hover:bg-emerald-700"
        onClick={onClick}
    >
        {icon && <i className={`fas ${icon} text-xs`}></i>}
        {children}
    </Link>
);

/**
 * Tombol Sekunder
 * Digunakan untuk aksi sekunder dengan tampilan yang lebih ringan
 */
export const SecondaryButton = ({ href, children, icon, onClick }: ButtonProps) => (
    <Link
        href={href}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent px-5 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-emerald-500"
        onClick={onClick}
    >
        {icon && <i className={`fas ${icon} text-xs`}></i>}
        {children}
    </Link>
);

/**
 * Tombol Outline
 * Digunakan untuk aksi dengan border berwarna emerald dan efek hover mengubah latar belakang
 */
export const OutlineButton = ({ href, children, icon, onClick }: ButtonProps) => (
    <Link
        href={href}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-600 px-5 py-2.5 text-sm font-medium text-emerald-600 shadow-sm transition-all duration-200 hover:bg-emerald-600 hover:text-white hover:shadow-md dark:border-emerald-500 dark:text-emerald-500 dark:hover:bg-emerald-600 dark:hover:text-white"
        onClick={onClick}
    >
        {icon && <i className={`fas ${icon} text-xs`}></i>}
        {children}
    </Link>
);
