import { Link } from '@inertiajs/react';
import { ButtonProps } from './types';

/**
 * Komponen Button yang dapat dikonfigurasi
 * Mendukung berbagai varian: primary, secondary, dan outline
 */
const Button = ({ 
    href, 
    children, 
    icon, 
    onClick, 
    variant = 'primary',
    fullWidth = false,
    className = ''
}: ButtonProps) => {
    // Base classes yang digunakan oleh semua varian
    const baseClasses = "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium transition-all duration-200";
    
    // Classes khusus untuk masing-masing varian
    const variantClasses = {
        primary: `bg-emerald-600 text-white shadow-sm hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:bg-emerald-600 dark:hover:bg-emerald-700`,
        secondary: `border border-transparent text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-emerald-500`,
        outline: `border border-emerald-600 text-emerald-600 shadow-sm hover:bg-emerald-600 hover:text-white hover:shadow-md dark:border-emerald-500 dark:text-emerald-500 dark:hover:bg-emerald-600 dark:hover:text-white`
    };
    
    // Width classes untuk tombol full width
    const widthClasses = fullWidth ? 'w-full' : '';
    
    return (
        <Link
            href={href}
            className={`${baseClasses} ${variantClasses[variant]} ${widthClasses} ${className}`}
            onClick={onClick}
        >
            {icon && <i className={`fas ${icon} text-xs`}></i>}
            {children}
        </Link>
    );
};

// Export komponen utama
export default Button;

// Export komponen spesifik varian untuk backward compatibility
export const PrimaryButton = (props: ButtonProps) => <Button {...props} variant="primary" />;
export const SecondaryButton = (props: ButtonProps) => <Button {...props} variant="secondary" />;
export const OutlineButton = (props: ButtonProps) => <Button {...props} variant="outline" />;

