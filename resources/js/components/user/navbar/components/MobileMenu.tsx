import NavLink from './NavLink';
import Button from './NavButtons';
import { NavItem } from './types';
import { type User } from '@/types';

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
                    <NavLink
                        key={item.label}
                        href={item.href}
                        active={activeLink === item.href}
                        icon={item.icon}
                        variant="mobile"
                        onClick={onClose}
                    >
                        {item.label}
                    </NavLink>
                ))}
                
                <hr className="border-gray-200 dark:border-gray-700 my-2" />
                
                {/* Tombol aksi berdasarkan status login */}
                <div className="px-2">
                    {user ? (
                        <Button
                            href={route('dashboard')}
                            icon="fa-user-circle"
                            variant="primary"
                            fullWidth
                            onClick={onClose}
                        >
                            Dashboard
                        </Button>
                    ) : (
                        <div className="flex flex-col space-y-2">
                            <Button
                                href={route('login')}
                                icon="fa-sign-in-alt"
                                variant="secondary"
                                fullWidth
                                onClick={onClose}
                            >
                                Masuk
                            </Button>
                            <Button
                                href={route('register')}
                                icon="fa-user-plus"
                                variant="outline"
                                fullWidth
                                onClick={onClose}
                            >
                                Daftar
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MobileMenu;
