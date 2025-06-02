import NavLink from './NavLink';
import Button from './NavButtons';
import { NavItem } from './types';
import { type User } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

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
    /** Fungsi untuk handling nav link clicks dengan smooth scroll */
    onNavLinkClick?: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

/**
 * Komponen menu navigasi untuk tampilan mobile
 * Menampilkan daftar navigasi dan tombol aksi
 */
const MobileMenu = ({ isOpen, activeLink, navItems, user, onClose, onNavLinkClick }: MobileMenuProps) => {
    // Animation variants for the menu container
    const menuVariants = {
        open: { 
            height: 'auto', 
            opacity: 1,
            transition: { 
                duration: 0.3, 
                staggerChildren: 0.07, 
                delayChildren: 0.05 
            } 
        },
        closed: { 
            height: 0, 
            opacity: 0,
            transition: { 
                duration: 0.3, 
                staggerChildren: 0.05, 
                staggerDirection: -1,
                when: "afterChildren" 
            } 
        }
    };

    // Animation variants for each item in the menu
    const itemVariants = {
        open: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 24 } },
        closed: { y: 20, opacity: 0, transition: { duration: 0.2 } }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div 
                    className="md:hidden overflow-hidden mt-4 mb-2"
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={menuVariants}
                >
                    <motion.div 
                        className="flex flex-col space-y-2 py-3 px-3 bg-white/95 dark:bg-gray-800/95 rounded-lg shadow-lg backdrop-blur-md border border-gray-200/20 dark:border-gray-700/20"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Daftar item navigasi */}
                        {navItems.map((item, index) => (
                            <motion.div 
                                key={item.label}
                                variants={itemVariants}
                                custom={index}
                            >
                                <NavLink
                                    href={item.href}
                                    active={activeLink === item.href}
                                    variant="mobile"
                                    onClick={(e) => {
                                        if (onNavLinkClick) {
                                            onNavLinkClick(e, item.href);
                                        } else {
                                            onClose();
                                        }
                                    }}
                                    className="hover:translate-x-1"
                                >
                                    {item.label}
                                </NavLink>
                            </motion.div>
                        ))}
                        
                        <motion.hr variants={itemVariants} className="border-gray-200 dark:border-gray-700 my-2" />
                        
                        {/* Tombol aksi berdasarkan status login */}
                        <motion.div variants={itemVariants} className="px-2">
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
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MobileMenu;
