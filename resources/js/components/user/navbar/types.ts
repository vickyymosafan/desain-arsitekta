import { type User } from '@/types';

/**
 * Interface untuk props komponen Navbar
 */
export interface NavbarProps {
    /** Data pengguna yang sedang login atau null jika belum login */
    user: User | null;
}

/**
 * Interface untuk item navigasi
 */
export interface NavItem {
    /** URL tujuan */
    href: string;
    /** Label yang ditampilkan */
    label: string;
    /** Kelas ikon (opsional) */
    icon?: string;
}

/**
 * Props untuk komponen NavLink
 */
export interface NavLinkProps {
    /** URL tujuan */
    href: string;
    /** Konten/isi dari link */
    children: React.ReactNode;
    /** Status aktif dari link */
    active?: boolean;
    /** Kelas ikon (opsional) */
    icon?: string;
}

/**
 * Props untuk komponen tombol
 */
export interface ButtonProps {
    /** URL tujuan */
    href: string;
    /** Konten/isi dari tombol */
    children: React.ReactNode;
    /** Kelas ikon (opsional) */
    icon?: string;
    /** Fungsi yang dijalankan saat tombol diklik */
    onClick?: () => void;
}
