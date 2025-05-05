import { Link } from '@inertiajs/react';
import { ButtonProps } from './types';
import { motion } from 'framer-motion';

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
    const baseClasses = "inline-flex items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-medium font-nunito transition-all duration-300 shadow-sm hover:shadow-md";
    
    // Classes khusus untuk masing-masing varian
    const variantClasses = {
        primary: `bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:from-emerald-700 hover:to-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:from-emerald-600 dark:to-emerald-500 dark:hover:from-emerald-700 dark:hover:to-emerald-600`,
        secondary: `border border-transparent text-gray-700 hover:bg-gray-50/80 hover:text-emerald-600 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-emerald-500 dark:focus:ring-gray-700`,
        outline: `border-2 border-emerald-600 text-emerald-600 hover:bg-emerald-600/10 hover:border-emerald-700 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:border-emerald-500 dark:text-emerald-500 dark:hover:bg-emerald-600/20 dark:hover:border-emerald-400 dark:hover:text-emerald-400`
    };
    
    // Width classes untuk tombol full width
    const widthClasses = fullWidth ? 'w-full' : '';
    
    return (
        <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
            <Link
                href={href}
                className={`${baseClasses} ${variantClasses[variant]} ${widthClasses} ${className}`}
                onClick={onClick}
            >
                {icon && (
                    <motion.i 
                        className={`fas ${icon} text-xs`}
                        initial={{ opacity: 0.8 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                    ></motion.i>
                )}
                <span>{children}</span>
            </Link>
        </motion.div>
    );
};

// Export komponen utama
export default Button;

// Export komponen spesifik varian untuk backward compatibility
export const PrimaryButton = (props: ButtonProps) => <Button {...props} variant="primary" />;
export const SecondaryButton = (props: ButtonProps) => <Button {...props} variant="secondary" />;
export const OutlineButton = (props: ButtonProps) => <Button {...props} variant="outline" />;

