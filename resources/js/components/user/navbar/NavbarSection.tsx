import { useEffect, useState, useRef } from 'react';
import { NavbarProps, NavItem } from './components/types';
import NavLink from './components/NavLink';
import Button from './components/NavButtons';
import MobileMenu from './components/MobileMenu';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/**
 * Komponen utama Navbar
 * Menampilkan menu navigasi, logo, dan tombol aksi
 */
const NavbarSection = ({ user, activeLink = '#' }: NavbarProps) => {
    
    // State untuk menu mobile (terbuka/tertutup)
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    
    // State untuk efek scroll pada navbar
    const [scrolled, setScrolled] = useState<boolean>(false);
    
    // State untuk breakpoint tampilan tablet
    const [isTablet, setIsTablet] = useState<boolean>(false);
    
    // State untuk menampilkan dropdown tablet
    const [tabletDropdownOpen, setTabletDropdownOpen] = useState<boolean>(false);
    
    // Ref untuk dropdown menu pada tampilan tablet
    const tabletDropdownRef = useRef<HTMLDivElement>(null);
    
    // Cek jika user memilih reduced motion preference
    const prefersReducedMotion = useReducedMotion();

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
    
    // Mendeteksi breakpoint untuk tablet dan menyesuaikan tampilan
    useEffect(() => {
        const checkTabletBreakpoint = () => {
            // Sesuaikan breakpoint untuk tablet (768px - 1024px)
            setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
        };
        
        // Cek saat komponen dimuat
        checkTabletBreakpoint();
        
        // Tambahkan event listener untuk resize
        window.addEventListener('resize', checkTabletBreakpoint);
        
        // Cleanup event listener saat komponen unmount
        return () => window.removeEventListener('resize', checkTabletBreakpoint);
    }, []);
    
    // Menangani klik di luar dropdown untuk menutup dropdown tablet
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tabletDropdownRef.current && !tabletDropdownRef.current.contains(event.target as Node)) {
                setTabletDropdownOpen(false);
            }
        };
        
        // Tambahkan event listener saat dropdown terbuka
        if (tabletDropdownOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        
        // Cleanup event listener
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [tabletDropdownOpen]);

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

                    {/* Navigasi Desktop dan Tablet */}
                    {!isTablet ? (
                        /* Navigasi Desktop (lebar 1024px ke atas) */
                        <motion.nav 
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.1 }}
                            className="hidden lg:flex items-center space-x-8 ml-10"
                        >
                            {navItems.map((item, index) => (
                                <motion.div 
                                    key={item.label}
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ 
                                        duration: prefersReducedMotion ? 0 : 0.3, 
                                        delay: prefersReducedMotion ? 0 : 0.1 * (index + 1) 
                                    }}
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
                    ) : (
                        /* Navigasi Tablet (768px - 1024px) */
                        <div className="hidden md:flex lg:hidden items-center ml-4 relative" ref={tabletDropdownRef}>
                            {/* Button untuk menu dropdown tablet */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setTabletDropdownOpen(!tabletDropdownOpen)}
                                className="py-2 px-4 flex items-center space-x-2 bg-emerald-50 hover:bg-emerald-100 dark:bg-gray-800 dark:hover:bg-gray-700 text-emerald-600 dark:text-emerald-500 rounded-lg font-medium transition-all duration-200 shadow-sm border border-emerald-200/30 dark:border-gray-700/50"
                            >
                                <span>Menu</span>
                                <i className={`fas fa-chevron-${tabletDropdownOpen ? 'up' : 'down'} transition-transform duration-200`}></i>
                            </motion.button>
                            
                            {/* Dropdown menu untuk tablet */}
                            <AnimatePresence>
                                {tabletDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 left-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 py-3 max-w-xs w-60"
                                    >
                                        <div className="flex flex-col">
                                            {navItems.map((item) => (
                                                <NavLink
                                                    key={item.label}
                                                    href={item.href}
                                                    active={activeLink === item.href}
                                                    icon={item.icon}
                                                    variant="tablet"
                                                    onClick={() => setTabletDropdownOpen(false)}
                                                    className="hover:translate-x-1 px-4 py-2"
                                                >
                                                    {item.label}
                                                </NavLink>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {/* Tombol Desktop & Tablet */}
                    <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: prefersReducedMotion ? 0 : 0.5, delay: prefersReducedMotion ? 0 : 0.3 }}
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
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 lg:hidden md:hidden hover:text-emerald-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-emerald-500 dark:hover:bg-gray-800 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2" 
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

                {/* Menu Navigasi Mobile - Hanya ditampilkan pada ukuran mobile hingga tablet kecil (< 768px) */}
                <AnimatePresence>
                    {!isTablet && (
                        <MobileMenu 
                            isOpen={mobileMenuOpen}
                            activeLink={activeLink}
                            navItems={navItems}
                            user={user}
                            onClose={() => setMobileMenuOpen(false)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default NavbarSection;
