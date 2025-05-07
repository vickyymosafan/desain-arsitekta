import { useEffect, useState, useRef, useCallback } from 'react';
import { NavbarProps } from './components/types';
import NavLink from './components/NavLink';
import Button from './components/NavButtons';
import MobileMenu from './components/MobileMenu';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { navItems } from './components/navigationItems';

/**
 * Komponen utama Navbar
 * Menampilkan menu navigasi, logo, dan tombol aksi
 */
const NavbarSection = ({ user, activeLink }: NavbarProps) => {
    
    // State untuk menu mobile (terbuka/tertutup)
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    
    // State untuk efek scroll pada navbar
    const [scrolled, setScrolled] = useState<boolean>(false);
    
    // State untuk active section pada scroll
    const [activeSection, setActiveSection] = useState<string>('#');
    
    // State untuk breakpoint tampilan tablet
    const [isTablet, setIsTablet] = useState<boolean>(false);
    
    // State untuk menampilkan dropdown tablet
    const [tabletDropdownOpen, setTabletDropdownOpen] = useState<boolean>(false);
    
    // Ref untuk dropdown menu pada tampilan tablet
    const tabletDropdownRef = useRef<HTMLDivElement>(null);
    
    // State untuk menampilkan hover item pada tablet
    const [activeTabletItem, setActiveTabletItem] = useState<string | null>(null);
    
    // Cek jika user memilih reduced motion preference
    const prefersReducedMotion = useReducedMotion();

    // Menggunakan navItems dari file centralized

    // Fungsi untuk mengecek section mana yang sedang aktif berdasarkan scroll position
    const determineActiveSection = useCallback(() => {
        // Set scrolled status untuk efek visual navbar
        setScrolled(window.scrollY > 50);
        
        // Mendapatkan posisi scroll saat ini (ditambah offset untuk deteksi yang lebih akurat)
        const scrollPosition = window.scrollY + 200; // Offset 200px agar section terdeteksi lebih awal
        
        // Cek section mana yang sedang aktif
        // Tidak termasuk 'Beranda' karena itu adalah section pertama (default active)
        const sections = navItems
            .filter(item => item.href !== '#') // Skip 'Beranda'
            .map(item => ({
                id: item.href,
                element: document.querySelector(item.href)
            }));
            
        // Default ke 'Beranda' jika sedang berada di paling atas halaman
        if (scrollPosition < 100) {
            setActiveSection('#');
            return;
        }
        
        // Loop dari bawah ke atas (section terakhir prioritas lebih tinggi)
        // untuk mencari section mana yang sedang aktif
        for (let i = sections.length - 1; i >= 0; i--) {
            const { id, element } = sections[i];
            if (element) {
                const rect = element.getBoundingClientRect();
                const sectionTop = rect.top + window.scrollY - 100; // Offset 100px
                
                if (scrollPosition >= sectionTop) {
                    setActiveSection(id);
                    return;
                }
            }
        }
        
        // Default ke 'Beranda' jika tidak ada section yang aktif
        setActiveSection('#');
    }, []);
    
    // Debounce function untuk scroll event (mencegah terlalu banyak pembaruan)
    const debounce = (func: Function, delay: number) => {
        let timeoutId: NodeJS.Timeout;
        return function(...args: any[]) {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => func(...args), delay);
        };
    };
    
    // Menangani efek scroll untuk navbar dan active section detection
    useEffect(() => {
        const handleScroll = debounce(determineActiveSection, 100);
        
        // Initial check saat komponen di-mount
        determineActiveSection();
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [determineActiveSection]);
    
    // Smooth scroll handler untuk menangani klik pada nav links
    const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        // Skip jika link adalah 'Beranda' (alias '#'), lakukan default scroll to top
        if (href === '#') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }
        
        const targetElement = document.querySelector(href);
        if (targetElement) {
            // Mendapatkan posisi dari target section
            // Kalkulasi offset untuk centering section di viewport
            const navbarHeight = 70; // Perkiraan tinggi navbar
            const windowHeight = window.innerHeight;
            const elementHeight = targetElement.getBoundingClientRect().height;
            
            // Jika tinggi elemen lebih kecil dari viewport, center it
            // Jika tidak, scroll ke bagian atas dengan offset navbar
            const centerOffset = elementHeight < (windowHeight - navbarHeight) 
                ? (windowHeight - elementHeight) / 2 - navbarHeight
                : -navbarHeight;
            
            const y = targetElement.getBoundingClientRect().top + window.pageYOffset + centerOffset;
            
            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
            
            // Set active section
            setActiveSection(href);
            
            // Close mobile menu if open
            if (mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        }
    };
    
    // Mendeteksi breakpoint untuk tablet dan menyesuaikan tampilan
    useEffect(() => {
        const checkTabletBreakpoint = () => {
            // Sesuaikan breakpoint untuk tablet (768px - 1024px)
            const isTabletView = window.innerWidth >= 768 && window.innerWidth < 1024;
            setIsTablet(isTabletView);
            
            // Auto close dropdown when switching away from tablet view
            if (!isTabletView && tabletDropdownOpen) {
                setTabletDropdownOpen(false);
            }
        };
        
        // Cek saat komponen dimuat
        checkTabletBreakpoint();
        
        // Tambahkan event listener untuk resize
        window.addEventListener('resize', checkTabletBreakpoint);
        
        // Cleanup event listener saat komponen unmount
        return () => window.removeEventListener('resize', checkTabletBreakpoint);
    }, [tabletDropdownOpen]);
    
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
                                    src="/images/4.webp" 
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
                                        active={activeSection === item.href}
                                        onClick={(e) => handleNavLinkClick(e, item.href)}
                                    >
                                        {item.label}
                                    </NavLink>
                                </motion.div>
                            ))}
                        </motion.nav>
                    ) : (
                        /* Navigasi Tablet (768px - 1024px) */
                        <div className="hidden md:flex lg:hidden items-center relative" ref={tabletDropdownRef}>
                            {/* Tampilkan 2 menu item paling penting secara langsung */}
                            <div className="hidden md:flex lg:hidden items-center mr-3 gap-1">
                                {navItems.slice(0, 2).map((item, idx) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ 
                                            duration: prefersReducedMotion ? 0 : 0.3, 
                                            delay: prefersReducedMotion ? 0 : 0.1 * (idx + 1) 
                                        }}
                                    >
                                        <NavLink 
                                            href={item.href} 
                                            active={activeSection === item.href}
                                            variant="desktop"
                                            className="text-sm px-3"
                                            onClick={(e) => handleNavLinkClick(e, item.href)}
                                        >
                                            {item.label}
                                        </NavLink>
                                    </motion.div>
                                ))}
                            </div>
                            
                            {/* Button untuk menu dropdown tablet */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setTabletDropdownOpen(!tabletDropdownOpen)}
                                className={`py-2 px-4 flex items-center space-x-2 rounded-lg font-medium transition-all duration-200 shadow-sm border ${tabletDropdownOpen 
                                    ? 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-800/50' 
                                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border-emerald-200/30 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-emerald-500 dark:border-gray-700/50'}`}
                            >
                                <span>{tabletDropdownOpen ? 'Tutup' : 'Menu Lainnya'}</span>
                                <i className={`fas fa-chevron-${tabletDropdownOpen ? 'up' : 'down'} transition-transform duration-200`}></i>
                            </motion.button>
                            
                            {/* Dropdown menu untuk tablet yang lebih user-friendly */}
                            <AnimatePresence>
                                {tabletDropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.2 }}
                                        className="absolute right-0 top-full mt-2 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-100 dark:border-gray-700 py-2 w-72"
                                    >
                                        {/* Menu header untuk tablet */}
                                        <div className="px-4 py-2 border-b border-gray-100 dark:border-gray-700">
                                            <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Menu Lainnya</h3>
                                        </div>
                                        
                                        <div className="grid grid-cols-1 divide-y divide-gray-100 dark:divide-gray-700/50">
                                            {/* Menampilkan hanya menu item yang tidak muncul di navbar */}
                                            {navItems.slice(2).map((item) => (
                                                <NavLink
                                                    key={item.label}
                                                    href={item.href}
                                                    active={activeSection === item.href}
                                                    variant="tablet"
                                                    onClick={(e) => {
                                                        handleNavLinkClick(e, item.href);
                                                        setTabletDropdownOpen(false);
                                                    }}
                                                    className="hover:translate-x-1 px-4 py-3"
                                                    onMouseEnter={() => setActiveTabletItem(item.label)}
                                                    onMouseLeave={() => setActiveTabletItem(null)}
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="font-medium">{item.label}</span>
                                                        {activeTabletItem === item.label && (
                                                            <motion.span 
                                                                initial={{ opacity: 0 }}
                                                                animate={{ opacity: 1 }}
                                                                className="text-xs text-gray-500 dark:text-gray-400 mt-0.5"
                                                            >
                                                                {`Lihat ${item.label}`}
                                                            </motion.span>
                                                        )}
                                                    </div>
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
                            activeLink={activeSection}
                            navItems={navItems}
                            user={user}
                            onClose={() => setMobileMenuOpen(false)}
                            onNavLinkClick={handleNavLinkClick}
                        />
                    )}
                </AnimatePresence>
            </div>
        </header>
    );
};

export default NavbarSection;
