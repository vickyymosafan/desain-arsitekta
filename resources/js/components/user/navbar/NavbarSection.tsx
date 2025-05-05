import { useEffect, useState } from 'react';
import { NavbarProps, NavItem } from './components/types';
import NavLink from './components/NavLink';
import Button from './components/NavButtons';
import MobileMenu from './components/MobileMenu';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * Komponen utama Navbar
 * Menampilkan menu navigasi, logo, dan tombol aksi
 */
const NavbarSection = ({ user, activeLink = '#' }: NavbarProps) => {
    
    // State untuk menu mobile (terbuka/tertutup)
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    
    // State untuk efek scroll pada navbar
    const [scrolled, setScrolled] = useState<boolean>(false);

    // Item navigasi dengan ikon
    const navItems: NavItem[] = [
        { href: '#', label: 'Beranda', icon: 'fa-home' },
        { href: '#services', label: 'Layanan', icon: 'fa-tools' },
        { href: '#portfolio', label: 'Portofolio', icon: 'fa-image' },
        { href: '#blog', label: 'Blog', icon: 'fa-newspaper' },
        { href: '#contact', label: 'Kontak', icon: 'fa-envelope' }
    ];

    // Menangani efek scroll hanya untuk efek visual navbar
    useEffect(() => {
        const handleScroll = () => {
            // Set scrolled status berdasarkan posisi scroll
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
            ${scrolled 
                ? 'bg-white/95 backdrop-blur-md shadow-lg py-2 dark:bg-gray-900/95' 
                : 'bg-white/80 backdrop-blur-sm py-4 dark:bg-gray-950/80'}`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className={`flex items-center
                        ${scrolled ? 'scale-95' : 'scale-100'} transition-transform duration-300`}
                    >
                        <div className="relative flex items-center transition-all duration-300">
                            <div className="flex items-center gap-2">
                                <img 
                                    src="/storage/images/hero/4.webp" 
                                    alt="Antosa Architect" 
                                    className={`${scrolled ? 'h-8' : 'h-10'} transition-all duration-300 object-contain`} 
                                />
                            </div>
                            <div className="absolute -bottom-1.5 w-full h-0.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-transparent rounded-full"></div>
                        </div>
                    </motion.div>

                    {/* Navigasi Desktop */}
                    <motion.nav 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="hidden md:flex items-center space-x-8 ml-10"
                    >
                        {navItems.map((item, index) => (
                            <motion.div 
                                key={item.label}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3, delay: 0.1 * (index + 1) }}
                            >
                                <NavLink 
                                    href={item.href} 
                                    active={activeLink === item.href}
                                    icon={item.icon}
                                >
                                    {item.label}
                                </NavLink>
                            </motion.div>
                        ))}
                    </motion.nav>

                    {/* Tombol Desktop */}
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="hidden md:flex items-center space-x-4"
                    >
                        {user ? (
                            <Button 
                                href={route('dashboard')} 
                                icon="fa-user-circle" 
                                variant="primary"
                                className="hover:scale-105 transition-transform"
                            >
                                Dashboard
                            </Button>
                        ) : (
                            <>
                                <Button 
                                    href={route('login')} 
                                    icon="fa-sign-in-alt" 
                                    variant="secondary"
                                    className="hover:scale-105 transition-transform"
                                >
                                    Masuk
                                </Button>
                                <Button 
                                    href={route('register')} 
                                    icon="fa-user-plus" 
                                    variant="outline"
                                    className="hover:scale-105 transition-transform"
                                >
                                    Daftar
                                </Button>
                            </>
                        )}
                    </motion.div>

                    {/* Tombol Menu Mobile */}
                    <motion.button 
                        whileTap={{ scale: 0.95 }}
                        type="button" 
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 md:hidden hover:text-emerald-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-emerald-500 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2" 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-expanded={mobileMenuOpen}
                        aria-label="Buka menu utama"
                    >
                        <span className="sr-only">Buka menu utama</span>
                        {!mobileMenuOpen ? (
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        ) : (
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        )}
                    </motion.button>
                </div>

                {/* Menu Navigasi Mobile */}
                <AnimatePresence>
                    <MobileMenu 
                        isOpen={mobileMenuOpen}
                        activeLink={activeLink}
                        navItems={navItems}
                        user={user}
                        onClose={() => setMobileMenuOpen(false)}
                    />
                </AnimatePresence>
            </div>
        </header>
    );
};

export default NavbarSection;
