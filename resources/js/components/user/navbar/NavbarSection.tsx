import { useEffect, useState } from 'react';
import { Link } from '@inertiajs/react';
import { NavbarProps, NavItem } from './types';
import NavLink from './NavLink';
import { PrimaryButton, SecondaryButton, OutlineButton } from './NavButtons';
import MobileMenu from './MobileMenu';

const NavbarSection = ({ user }: NavbarProps) => {
    // Active link state for highlighting current page
    const [activeLink, setActiveLink] = useState<string>('#');
    
    // Mobile menu state
    const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
    
    // Scroll state for enhanced navbar effects
    const [scrolled, setScrolled] = useState<boolean>(false);

    // Navigation items with icons
    const navItems: NavItem[] = [
        { href: '#', label: 'Beranda', icon: 'fa-home' },
        { href: '#services', label: 'Layanan', icon: 'fa-tools' },
        { href: '#portfolio', label: 'Portofolio', icon: 'fa-image' },
        { href: '#blog', label: 'Blog', icon: 'fa-newspaper' },
        { href: '#contact', label: 'Kontak', icon: 'fa-envelope' }
    ];

    // Handle scroll effects
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }

            // Set active section based on scroll position
            const sections = document.querySelectorAll('section[id]');
            sections.forEach(section => {
                const sectionTop = (section as HTMLElement).offsetTop;
                if (offset >= sectionTop - 100) {
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

                    {/* Desktop Navigation */}
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

                    {/* Desktop Buttons */}
                    <div className="hidden md:flex items-center space-x-4">
                        {user ? (
                            <PrimaryButton href={route('dashboard')} icon="fa-user-circle">
                                Dashboard
                            </PrimaryButton>
                        ) : (
                            <>
                                <SecondaryButton href={route('login')} icon="fa-sign-in-alt">
                                    Masuk
                                </SecondaryButton>
                                <OutlineButton href={route('register')} icon="fa-user-plus">
                                    Daftar
                                </OutlineButton>
                            </>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        type="button" 
                        className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 md:hidden hover:text-emerald-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-emerald-500 dark:hover:bg-gray-800 transition-all duration-200" 
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        <span className="sr-only">Open main menu</span>
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

                {/* Mobile Navigation Menu */}
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
