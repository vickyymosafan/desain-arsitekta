import { Link } from '@inertiajs/react';
import { NavItem } from './types';
import { type User } from '@/types';
import { PrimaryButton, SecondaryButton } from './NavButtons';

/**
 * Props untuk komponen menu mobile
 */
interface MobileMenuProps {
    /** Status menu terbuka atau tertutup */
    isOpen: boolean;
    /** Link yang sedang aktif */
    activeLink: string;
    /** Daftar item navigasi */
    navItems: NavItem[];
    /** Data pengguna yang sedang login atau null jika belum login */
    user: User | null;
    /** Fungsi yang dijalankan saat menu ditutup */
    onClose: () => void;
}

/**
 * Komponen menu navigasi untuk tampilan mobile
 * Menampilkan daftar navigasi dan tombol aksi
 */
const MobileMenu = ({ isOpen, activeLink, navItems, user, onClose }: MobileMenuProps) => {
    return (
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100 mt-4 mb-2' : 'max-h-0 opacity-0'}`}>
            <div className="flex flex-col space-y-2 py-2 px-2 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-xl backdrop-blur-sm">
                {/* Daftar item navigasi */}
                {navItems.map((item) => (
                    <Link 
                        key={item.label} 
                        href={item.href} 
                        className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 
                            ${activeLink === item.href 
                                ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-500 dark:bg-gray-700' 
                                : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-emerald-500'
                            }`}
                        onClick={onClose}
                    >
                        {item.icon && <i className={`fas ${item.icon} mr-3 text-gray-400 group-hover:text-emerald-500`}></i>}
                        {item.label}
                    </Link>
                ))}
                
                <hr className="border-gray-200 dark:border-gray-700 my-2" />
                
                {/* Tombol aksi berdasarkan status login */}
                <div className="px-2">
                    {user ? (
                        <div className="w-full" onClick={onClose}>
                            <PrimaryButton 
                                href={route('dashboard')} 
                                icon="fa-user-circle"
                            >
                                Dashboard
                            </PrimaryButton>
                        </div>
                    ) : (
                        <div className="flex flex-col space-y-2">
                            <div onClick={onClose}>
                                <SecondaryButton 
                                    href={route('login')} 
                                    icon="fa-sign-in-alt"
                                >
                                    Masuk
                                </SecondaryButton>
                            </div>
                            <div onClick={onClose}>
                                <PrimaryButton 
                                    href={route('register')} 
                                    icon="fa-user-plus"
                                >
                                    Daftar
                                </PrimaryButton>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
