import { Link } from '@inertiajs/react';
import { NavItem } from './types';
import { type User } from '@/types';

interface MobileMenuProps {
    isOpen: boolean;
    activeLink: string;
    navItems: NavItem[];
    user: User | null;
    onClose: () => void;
}

const MobileMenu = ({ isOpen, activeLink, navItems, user, onClose }: MobileMenuProps) => {
    return (
        <div className={`md:hidden transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96 opacity-100 mt-4 mb-2' : 'max-h-0 opacity-0'}`}>
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
                        onClick={onClose}
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
                        onClick={onClose}
                    >
                        <i className="fas fa-user-circle mr-3 text-emerald-500"></i>
                        Dashboard
                    </Link>
                ) : (
                    <div className="flex flex-col space-y-2 px-2">
                        <Link 
                            href={route('login')} 
                            className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-emerald-600 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-emerald-500 transition-all duration-200"
                            onClick={onClose}
                        >
                            <i className="fas fa-sign-in-alt mr-3 text-gray-400"></i>
                            Masuk
                        </Link>
                        <Link 
                            href={route('register')} 
                            className="flex items-center px-4 py-2 text-sm font-medium rounded-md text-emerald-600 bg-emerald-50 dark:text-emerald-500 dark:bg-gray-700 hover:bg-emerald-100 dark:hover:bg-gray-600 transition-all duration-200"
                            onClick={onClose}
                        >
                            <i className="fas fa-user-plus mr-3 text-emerald-500"></i>
                            Daftar
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MobileMenu;
