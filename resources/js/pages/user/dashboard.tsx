import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-gradient-to-br from-emerald-500 to-emerald-700 p-6 text-white shadow-lg hover:scale-[1.02] transition-transform duration-300">
                        <div className="flex flex-col h-full justify-between">
                            <h3 className="text-xl font-bold mb-2">My Projects</h3>
                            <div className="flex items-end justify-between">
                                <span className="text-3xl font-bold">3</span>
                                <span className="text-emerald-200 text-sm">View all →</span>
                            </div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-gradient-to-br from-emerald-600 to-emerald-800 p-6 text-white shadow-lg hover:scale-[1.02] transition-transform duration-300">
                        <div className="flex flex-col h-full justify-between">
                            <h3 className="text-xl font-bold mb-2">Messages</h3>
                            <div className="flex items-end justify-between">
                                <span className="text-3xl font-bold">2</span>
                                <span className="text-emerald-200 text-sm">1 unread</span>
                            </div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative aspect-video overflow-hidden rounded-xl border bg-gradient-to-br from-emerald-700 to-emerald-900 p-6 text-white shadow-lg hover:scale-[1.02] transition-transform duration-300">
                        <div className="flex flex-col h-full justify-between">
                            <h3 className="text-xl font-bold mb-2">Payment Status</h3>
                            <div className="flex items-end justify-between">
                                <span className="text-emerald-100 font-medium">Up to date</span>
                                <span className="text-emerald-200 text-sm">View history</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="border-sidebar-border/70 dark:border-sidebar-border relative min-h-[60vh] flex-1 overflow-hidden rounded-xl border md:min-h-min bg-white p-6 shadow-md">
                    <h2 className="text-2xl font-bold mb-6 text-emerald-800">Welcome to Your Dashboard</h2>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                            <h3 className="text-lg font-semibold mb-4 text-emerald-700">Project Timeline</h3>
                            <div className="space-y-4">
                                <div className="flex">
                                    <div className="mr-4 flex flex-col items-center">
                                        <div className="rounded-full h-10 w-10 flex items-center justify-center bg-emerald-100 text-emerald-600 font-bold">1</div>
                                        <div className="h-full w-0.5 bg-emerald-200 my-1"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Project Consultation</h4>
                                        <p className="text-gray-500 text-sm">Completed on May 5, 2025</p>
                                    </div>
                                </div>
                                
                                <div className="flex">
                                    <div className="mr-4 flex flex-col items-center">
                                        <div className="rounded-full h-10 w-10 flex items-center justify-center bg-emerald-100 text-emerald-600 font-bold">2</div>
                                        <div className="h-full w-0.5 bg-emerald-200 my-1"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Design Concept</h4>
                                        <p className="text-gray-500 text-sm">Completed on May 8, 2025</p>
                                    </div>
                                </div>
                                
                                <div className="flex">
                                    <div className="mr-4 flex flex-col items-center">
                                        <div className="rounded-full h-10 w-10 flex items-center justify-center bg-emerald-500 text-white font-bold">3</div>
                                        <div className="h-full w-0.5 bg-emerald-200 my-1 opacity-50"></div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-800">Implementation Planning</h4>
                                        <p className="text-gray-500 text-sm">In Progress</p>
                                    </div>
                                </div>
                                
                                <div className="flex">
                                    <div className="mr-4 flex flex-col items-center">
                                        <div className="rounded-full h-10 w-10 flex items-center justify-center bg-gray-100 text-gray-400 font-bold">4</div>
                                    </div>
                                    <div>
                                        <h4 className="font-medium text-gray-400">Final Delivery</h4>
                                        <p className="text-gray-400 text-sm">Expected: June 15, 2025</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="space-y-6">
                            <div className="bg-gradient-to-r from-emerald-50 to-white p-5 rounded-xl shadow-sm border border-emerald-100">
                                <h3 className="text-lg font-semibold mb-3 text-emerald-700">Upcoming Appointment</h3>
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="text-gray-700">Design Review Meeting</p>
                                        <p className="text-gray-500 text-sm">May 14, 2025 - 10:00 AM</p>
                                    </div>
                                    <button className="bg-emerald-600 hover:bg-emerald-700 text-white py-2 px-4 rounded-lg text-sm transition-colors duration-200">Join Call</button>
                                </div>
                            </div>
                            
                            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
                                <h3 className="text-lg font-semibold mb-3 text-emerald-700">Quick Access</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <button className="bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-700 py-3 px-4 rounded-lg text-sm transition-colors duration-200 flex items-center justify-center">
                                        <span>Project Files</span>
                                    </button>
                                    <button className="bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-700 py-3 px-4 rounded-lg text-sm transition-colors duration-200 flex items-center justify-center">
                                        <span>Payments</span>
                                    </button>
                                    <button className="bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-700 py-3 px-4 rounded-lg text-sm transition-colors duration-200 flex items-center justify-center">
                                        <span>Support</span>
                                    </button>
                                    <button className="bg-white border border-emerald-200 hover:bg-emerald-50 text-emerald-700 py-3 px-4 rounded-lg text-sm transition-colors duration-200 flex items-center justify-center">
                                        <span>Settings</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
