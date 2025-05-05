import { useEffect, useState } from 'react';
import { NavbarProps, NavItem } from './components/types';
import NavLink from './components/NavLink';
import Button from './components/NavButtons';
import MobileMenu from './components/MobileMenu';

/**
 * Komponen utama Navbar
 * Menampilkan menu navigasi, logo, dan tombol aksi
 */
const NavbarSection = ({ user }: NavbarProps) => {
    // State untuk menyimpan link yang sedang aktif
    const [activeLink, setActiveLink] = useState<string>('#');
    
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

    // Menangani efek scroll
    useEffect(() => {
        const handleScroll = () => {
            // Set scrolled status berdasarkan posisi scroll
            setScrolled(window.scrollY > 50);

            // Mengatur section aktif berdasarkan posisi scroll
            const sections = document.querySelectorAll('section[id]');
            sections.forEach(section => {
                const sectionTop = (section as HTMLElement).offsetTop;
                if (window.scrollY >= sectionTop - 100) {
                    setActiveLink(`#${section.id}`);
                }
            });
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
            ${scrolled 
                ? 'bg-white/90 backdrop-blur-md shadow-md py-2 dark:bg-gray-900/90' 
                : 'bg-white/80 backdrop-blur-sm py-4 dark:bg-gray-950/80'}`}>
            <div className="container mx-auto px-4">
                <div className="flex items-center justify-between">
                    {/* Logo */}
                    <div className={`flex items-center
                        ${scrolled ? 'scale-95' : 'scale-100'} transition-transform duration-300`}>
                        <div className={`relative flex items-center
                            ${scrolled ? 'text-xl' : 'text-2xl'} transition-all duration-300`}>
                            <span className="text-emerald-600 font-bold dark:text-emerald-500">
                                Arsitekta
                            </span>
                            <div className="absolute -bottom-1.5 w-full h-0.5 bg-gradient-to-r from-emerald-500 to-transparent rounded-full"></div>
                        </div>
                    </div>

                    {/* Navigasi Desktop */}
                    <nav className="hidden md:flex items-center space-x-8 ml-10">
                        {navItems.map((item) => (
                            <NavLink 
                                key={item.label} 
                                href={item.href} 
                                active={activeLink === item.href}
                                icon={item.icon}
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </nav>

                    {/* Tombol Desktop */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <Button 
                                href={route('dashboard')} 
                                icon="fa-user-circle" 
                                variant="primary"
                            >
                                Dashboard
                            </Button>
                        ) : (
                            <>
                                <Button 
                                    href={route('login')} 
                                    icon="fa-sign-in-alt" 
                                    variant="secondary"
                                >
                                    Masuk
                                </Button>
                                <Button 
                                    href={route('register')} 
                                    icon="fa-user-plus" 
                                    variant="outline"
                                >
                                    Daftar
                                </Button>
                            </>
                        )}
                    </div>

                    {/* Tombol Menu Mobile */}
                    <button 
                        type="button" 
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 md:hidden hover:text-emerald-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-emerald-500 dark:hover:bg-gray-800 transition-all duration-200" 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
                    </button>
                </div>

                {/* Menu Navigasi Mobile */}
                <MobileMenu 
                    isOpen={mobileMenuOpen}
                    activeLink={activeLink}
                    navItems={navItems}
                    user={user}
                    onClose={() => setMobileMenuOpen(false)}
                />
            </div>
        </header>
    );
};

export default NavbarSection;
