import { Link } from '@inertiajs/react';
import { type User } from '@/types';
import { useEffect, useState } from 'react';

interface NavbarProps {
    user: User | null;
}

// Interface for navigation items
interface NavItem {
    href: string;
    label: string;
    icon?: string;
}

// Enhanced NavLink component with active state
interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    active?: boolean;
    icon?: string;
}

const NavLink = ({ href, children, active = false, icon }: NavLinkProps) => (
    <Link 
        href={href} 
        className={`group flex items-center py-2 text-sm font-medium transition-all duration-200 
            ${active
                ? 'text-emerald-600 dark:text-emerald-500'
                : 'text-gray-700 hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-500'
            }`
        }
    >
        {icon && (
            <span className="mr-2 text-gray-400 group-hover:text-emerald-500 transition-colors duration-200">
                <i className={`fas ${icon}`}></i>
            </span>
        )}
        <span className={`relative ${active ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-emerald-500 after:rounded' : ''}`}>
            {children}
            {active && <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-emerald-500 rounded-full transition-all duration-300"></span>}
        </span>
    </Link>
);

// Button components with enhanced styling and icons support
interface ButtonProps {
    href: string;
    children: React.ReactNode;
    icon?: string;
    onClick?: () => void;
}

const PrimaryButton = ({ href, children, icon, onClick }: ButtonProps) => (
    <Link
        href={href}
        className="inline-flex items-center justify-center gap-2 rounded-md bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:bg-emerald-600 dark:hover:bg-emerald-700"
        onClick={onClick}
    >
        {icon && <i className={`fas ${icon} text-xs`}></i>}
        {children}
    </Link>
);

const SecondaryButton = ({ href, children, icon, onClick }: ButtonProps) => (
    <Link
        href={href}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-transparent px-5 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-800/50 dark:hover:text-emerald-500"
        onClick={onClick}
    >
        {icon && <i className={`fas ${icon} text-xs`}></i>}
        {children}
    </Link>
);

const OutlineButton = ({ href, children, icon, onClick }: ButtonProps) => (
    <Link
        href={href}
        className="inline-flex items-center justify-center gap-2 rounded-md border border-emerald-600 px-5 py-2.5 text-sm font-medium text-emerald-600 shadow-sm transition-all duration-200 hover:bg-emerald-600 hover:text-white hover:shadow-md dark:border-emerald-500 dark:text-emerald-500 dark:hover:bg-emerald-600 dark:hover:text-white"
        onClick={onClick}
    >
        {icon && <i className={`fas ${icon} text-xs`}></i>}
        {children}
    </Link>
);

export default function Navbar({ user }: NavbarProps) {
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
                    <div className="flex items-center
                        ${scrolled ? 'scale-95' : 'scale-100'} transition-transform duration-300">
                        <div className="relative flex items-center
                            ${scrolled ? 'text-xl' : 'text-2xl'} transition-all duration-300">
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
                <div className={`md:hidden transition-all duration-300 overflow-hidden ${mobileMenuOpen ? 'max-h-96 opacity-100 mt-4 mb-2' : 'max-h-0 opacity-0'}`}>
                    <div className="flex flex-col space-y-2 py-2 px-2 bg-white/90 dark:bg-gray-800/90 rounded-lg shadow-xl backdrop-blur-sm">
                        {navItems.map((item) => (
                            <Link 
                                key={item.label} 
                                href={item.href} 
                                className={`flex items-center px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 
                                    ${activeLink === item.href 
                                        ? 'text-emerald-600 bg-emerald-50 dark:text-emerald-500 dark:bg-gray-700' 
                                        : 'text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-emerald-500'
                                    }`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item.icon && <i className={`fas ${item.icon} mr-3 text-gray-400 group-hover:text-emerald-500`}></i>}
                                {item.label}
                            </Link>
                        ))}
                        
                        <hr className="border-gray-200 dark:border-gray-700 my-2" />
                        
                        {user ? (
                            <Link 
                                href={route('dashboard')} 
                                className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-emerald-600 bg-emerald-50 dark:text-emerald-500 dark:bg-gray-700 hover:bg-emerald-100 dark:hover:bg-gray-600 transition-all duration-200"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <i className="fas fa-user-circle mr-3 text-emerald-500"></i>
                                Dashboard
                            </Link>
                        ) : (
                            <div className="flex flex-col space-y-2 px-2">
                                <Link 
                                    href={route('login')} 
                                    className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-emerald-500 transition-all duration-200"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <i className="fas fa-sign-in-alt mr-3 text-gray-400"></i>
                                    Masuk
                                </Link>
                                <Link 
                                    href={route('register')} 
                                    className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-emerald-600 bg-emerald-50 dark:text-emerald-500 dark:bg-gray-700 hover:bg-emerald-100 dark:hover:bg-gray-600 transition-all duration-200"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    <i className="fas fa-user-plus mr-3 text-emerald-500"></i>
                                    Daftar
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
