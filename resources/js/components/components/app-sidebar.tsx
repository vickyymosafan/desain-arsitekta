import { NavMain } from '@/components/components/nav-main';
import { NavUser } from '@/components/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { LayoutGrid, ExternalLink } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
        icon: LayoutGrid,
    },
];

const viewWebsiteItem: NavItem = {
    title: 'Lihat Website',
    href: '/',
    icon: ExternalLink,
};

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <div className="px-3 mb-4">
                    <div className="relative overflow-hidden rounded-xl">
                        <a 
                            href={viewWebsiteItem.href} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="group flex items-center justify-between gap-2 bg-gray-800 hover:bg-gray-700 text-white py-3 px-4 rounded-xl transition-all duration-300 border border-gray-700 hover:border-gray-600 w-full text-sm font-medium overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC01aDR2MWgtNHYtMXptMC01aDR2MWgtNHYtMXpNMTQgMjNoMXY0aC0xdi00em01IDBIMjB2NGgtMXYtNHptNSAwaDJ2NGgtMnYtNHptNSAwaDJ2NGgtMnYtNHptNSAwaDJ2NGgtMnYtNHptNSAwaDJ2NGgtMnYtNHoiLz48L2c+PC9nPjwvc3ZnPg==')]  opacity-20 group-hover:opacity-30 transition-opacity"></div>
                            <span className="flex items-center gap-2 z-10">
                                {viewWebsiteItem.icon && 
                                    <viewWebsiteItem.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />}
                                <span>Kunjungi Website</span>
                            </span>
                            <span className="z-10 bg-gray-700 p-1.5 rounded-full text-xs group-hover:bg-gray-600 transition-all duration-300 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                        </a>
                    </div>
                    <div className="mt-1.5 flex justify-center">
                        <span className="text-xs text-gray-500">Buka di tab baru</span>
                    </div>
                </div>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
