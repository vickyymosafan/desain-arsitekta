import { type User } from '@/types';

/**
 * Interface untuk props komponen Navbar
 */
export interface NavbarProps {
    user: User | null;
    activeLink?: string; // Section yang sedang aktif
}

/**
 * Interface untuk item navigasi
 */
export interface NavItem {
    href: string;
    label: string;
    icon?: string;
}

/**
 * Props untuk komponen NavLink
 */
export interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    active?: boolean;
    icon?: string;
    variant?: 'desktop' | 'mobile';
    onClick?: () => void;
    className?: string;
}

/**
 * Props untuk komponen tombol
 */
export interface ButtonProps {
    href: string;
    children: React.ReactNode;
    icon?: string;
    onClick?: () => void;
    variant?: 'primary' | 'secondary' | 'outline';
    fullWidth?: boolean;
    className?: string;
}
