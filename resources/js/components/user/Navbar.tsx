import { Link } from '@inertiajs/react';
import { type User } from '@/types';

interface NavbarProps {
    user: User | null;
}

// Create a reusable NavLink component
interface NavLinkProps {
    href: string;
    children: React.ReactNode;
}

const NavLink = ({ href, children }: NavLinkProps) => (
    <Link 
        href={href} 
        className="text-gray-700 hover:text-emerald-600 font-medium dark:text-gray-300 dark:hover:text-emerald-500"
    >
        {children}
    </Link>
);

// Create reusable button components
const PrimaryButton = ({ href, children }: NavLinkProps) => (
    <Link
        href={href}
        className="inline-block rounded-md bg-emerald-600 px-5 py-2 text-sm font-medium text-white transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:bg-emerald-600 dark:hover:bg-emerald-700"
    >
        {children}
    </Link>
);

const SecondaryButton = ({ href, children }: NavLinkProps) => (
    <Link
        href={href}
        className="inline-block rounded-md border border-transparent px-5 py-2 text-sm font-medium text-gray-700 transition hover:text-emerald-600 dark:text-gray-300 dark:hover:text-emerald-500"
    >
        {children}
    </Link>
);

const OutlineButton = ({ href, children }: NavLinkProps) => (
    <Link
        href={href}
        className="inline-block rounded-md border border-emerald-600 px-5 py-2 text-sm font-medium text-emerald-600 transition hover:bg-emerald-600 hover:text-white dark:border-emerald-500 dark:text-emerald-500 dark:hover:bg-emerald-600 dark:hover:text-white"
    >
        {children}
    </Link>
);

export default function Navbar({ user }: NavbarProps) {
    const navItems = [
        { href: "#", label: "Beranda" },
        { href: "#services", label: "Layanan" },
        { href: "#", label: "Portofolio" },
        { href: "#", label: "Blog" },
        { href: "#", label: "Kontak" }
    ];

    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm dark:bg-gray-950/80 transition-all duration-300">
            <div className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center">
                        <div className="text-emerald-600 font-bold text-2xl dark:text-emerald-500">
                            Arsitekta
                        </div>
                        <nav className="hidden md:flex ml-10 space-x-8">
                            {navItems.map((item) => (
                                <NavLink key={item.label} href={item.href}>
                                    {item.label}
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center space-x-4">
                        {user ? (
                            <PrimaryButton href={route('dashboard')}>
                                Dashboard
                            </PrimaryButton>
                        ) : (
                            <>
                                <SecondaryButton href={route('login')}>
                                    Masuk
                                </SecondaryButton>
                                <OutlineButton href={route('register')}>
                                    Daftar
                                </OutlineButton>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
