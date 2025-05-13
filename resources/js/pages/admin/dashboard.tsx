import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Admin Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-emerald-700 p-6 text-white shadow-lg">
                        <div className="flex flex-col h-full justify-between">
                            <h3 className="text-xl font-bold mb-2">Total Users</h3>
                            <div className="flex items-end justify-between">
                                <span className="text-3xl font-bold">120</span>
                                <span className="text-emerald-300 text-sm">+15% this month</span>
                            </div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-emerald-600 p-6 text-white shadow-lg">
                        <div className="flex flex-col h-full justify-between">
                            <h3 className="text-xl font-bold mb-2">Projects</h3>
                            <div className="flex items-end justify-between">
                                <span className="text-3xl font-bold">45</span>
                                <span className="text-emerald-300 text-sm">+5 new projects</span>
                            </div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-emerald-800 p-6 text-white shadow-lg">
                        <div className="flex flex-col h-full justify-between">
                            <h3 className="text-xl font-bold mb-2">Revenue</h3>
                            <div className="flex items-end justify-between">
                                <span className="text-3xl font-bold">$24,500</span>
                                <span className="text-emerald-300 text-sm">+20% this month</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[60vh] flex-1 overflow-hidden rounded-xl border md:min-h-min bg-white p-6 shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-emerald-800">Administrator Panel</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
                            <h3 className="text-lg font-medium mb-3 text-gray-800">Recent Activity</h3>
                            <ul className="space-y-2">
                                <li className="p-2 bg-gray-50 rounded flex justify-between">
                                    <span>New user registered</span>
                                    <span className="text-sm text-gray-500">2 minutes ago</span>
                                </li>
                                <li className="p-2 bg-gray-50 rounded flex justify-between">
                                    <span>Project updated</span>
                                    <span className="text-sm text-gray-500">1 hour ago</span>
                                </li>
                                <li className="p-2 bg-gray-50 rounded flex justify-between">
                                    <span>New testimonial added</span>
                                    <span className="text-sm text-gray-500">3 hours ago</span>
                                </li>
                                <li className="p-2 bg-gray-50 rounded flex justify-between">
                                    <span>Portfolio item updated</span>
                                    <span className="text-sm text-gray-500">Yesterday</span>
                                </li>
                            </ul>
                        </div>
                        <div className="border border-gray-200 rounded-lg p-4 shadow-sm">
                            <h3 className="text-lg font-medium mb-3 text-gray-800">Quick Actions</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded transition-colors duration-200">
                                    Add New Project
                                </button>
                                <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded transition-colors duration-200">
                                    Manage Users
                                </button>
                                <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded transition-colors duration-200">
                                    View Analytics
                                </button>
                                <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded transition-colors duration-200">
                                    System Settings
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
