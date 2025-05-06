import { NavItem } from './types';

/**
 * Daftar item navigasi utama yang digunakan di seluruh aplikasi
 * Single source of truth untuk struktur navigasi
 */
export const navItems: NavItem[] = [
    { href: '#', label: 'Beranda' },
    { href: '#services', label: 'Layanan' },
    { href: '#portfolio', label: 'Portofolio' },
    { href: '#blog', label: 'Blog' },
    { href: '#contact', label: 'Kontak' }
];
