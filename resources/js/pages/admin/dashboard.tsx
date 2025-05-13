import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ConsultationProvider, Consultation } from '@/contexts/ConsultationContext';
import AdminConsultationList from '@/components/consultation/AdminConsultationList';
import { UserGroupIcon, ClipboardDocumentCheckIcon, ClipboardDocumentListIcon, BanknotesIcon } from '@heroicons/react/24/outline';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Admin Dashboard',
        href: '/admin/dashboard',
    },
];

interface StatCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, trend }) => {
    return (
        <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-xl">
            <div className="p-6">
                <div className="flex items-center">
                    <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl p-4">
                        {icon}
                    </div>
                    <div className="ml-5 w-0 flex-1">
                        <dl>
                            <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                                {title}
                            </dt>
                            <dd>
                                <div className="text-lg font-medium text-gray-900 dark:text-white">
                                    {value}
                                </div>
                            </dd>
                            {change && (
                                <dd className="flex items-center mt-1">
                                    {trend === 'up' && (
                                        <span className="text-green-600 text-xs font-medium">↑ {change}</span>
                                    )}
                                    {trend === 'down' && (
                                        <span className="text-red-600 text-xs font-medium">↓ {change}</span>
                                    )}
                                    {trend === 'neutral' && (
                                        <span className="text-gray-600 dark:text-gray-400 text-xs font-medium">• {change}</span>
                                    )}
                                </dd>
                            )}
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface DashboardProps {
    consultations?: Consultation[];
    stats?: {
        users: number;
        pendingConsultations: number;
        completedConsultations: number;
        revenue: number;
    };
}

export default function Dashboard({ 
    consultations = [],
    stats = {
        users: 0,
        pendingConsultations: 0,
        completedConsultations: 0,
        revenue: 0
    }
}: DashboardProps) {
    const { props } = usePage();
    const adminConsultations: Consultation[] = (props.consultations as Consultation[] | undefined) || consultations;
    
    // Cast stats props with correct type
    const dashboardStats = (props.stats as typeof stats | undefined) || stats;

    return (
        <ConsultationProvider initialConsultations={adminConsultations}>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Admin Dashboard" />
                
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="flex flex-col space-y-8">
                            {/* Admin Header */}
                            <div className="bg-gradient-to-r from-emerald-700 to-emerald-800 rounded-2xl shadow-lg overflow-hidden">
                                <div className="px-6 py-8 sm:p-10">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h2 className="text-2xl font-bold text-white">
                                                Admin Dashboard
                                            </h2>
                                            <p className="mt-2 text-emerald-100">
                                                Kelola konsultasi, pengguna, dan layanan Arsitekta
                                            </p>
                                        </div>
                                        <div className="hidden sm:block">
                                            <PlaceholderPattern className="h-20 w-20 text-emerald-600/30" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Section */}
                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                                <StatCard
                                    title="Total Pengguna"
                                    value={dashboardStats.users}
                                    icon={<UserGroupIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />}
                                    change="12% dari bulan lalu"
                                    trend="up"
                                />
                                <StatCard
                                    title="Konsultasi Menunggu"
                                    value={dashboardStats.pendingConsultations}
                                    icon={<ClipboardDocumentListIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />}
                                />
                                <StatCard
                                    title="Konsultasi Selesai"
                                    value={dashboardStats.completedConsultations}
                                    icon={<ClipboardDocumentCheckIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />}
                                    change="18% dari bulan lalu"
                                    trend="up"
                                />
                                <StatCard
                                    title="Pendapatan"
                                    value={`Rp ${dashboardStats.revenue.toLocaleString('id-ID')}`}
                                    icon={<BanknotesIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-500" />}
                                    change="5% dari bulan lalu"
                                    trend="up"
                                />
                            </div>

                            {/* Main Content */}
                            <div className="bg-white dark:bg-gray-800 shadow rounded-2xl p-6">
                                <AdminConsultationList />
                            </div>

                            {/* Recent Activity (Optional) */}
                            <div className="bg-white dark:bg-gray-800 shadow rounded-2xl overflow-hidden">
                                <div className="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white">Aktivitas Terbaru</h3>
                                </div>
                                <div className="px-6 py-5 divide-y divide-gray-200 dark:divide-gray-700">
                                    {adminConsultations.length > 0 ? (
                                        adminConsultations.slice(0, 5).map((consultation, index) => (
                                            <div key={index} className="py-3">
                                                <div className="flex space-x-3">
                                                    <div className="flex-shrink-0">
                                                        <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center">
                                                            <UserGroupIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                                        </div>
                                                    </div>
                                                    <div className="min-w-0 flex-1">
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {consultation.user_id ? `User ID: ${consultation.user_id}` : 'Pengguna'}
                                                        </p>
                                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                                            {consultation.status === 'pending' && 'Mengajukan permintaan konsultasi'}
                                                            {consultation.status === 'approved' && 'Konsultasi diterima'}
                                                            {consultation.status === 'rejected' && 'Konsultasi ditolak'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-500 dark:text-gray-400 py-4">
                                            Belum ada aktivitas terbaru
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AppLayout>
        </ConsultationProvider>
    );
}
