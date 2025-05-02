import { type User } from '@/types';

export interface NavbarProps {
    user: User | null;
}

export interface NavItem {
    href: string;
    label: string;
    icon?: string;
}

export interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    active?: boolean;
    icon?: string;
}

export interface ButtonProps {
    href: string;
    children: React.ReactNode;
    icon?: string;
    onClick?: () => void;
}
