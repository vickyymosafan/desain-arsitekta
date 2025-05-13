import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ConsultationProvider, Consultation } from '@/contexts/ConsultationContext';
import AdminConsultationList from '@/components/consultation/AdminConsultationList';
import { UserGroupIcon, ClipboardDocumentCheckIcon, ClipboardDocumentListIcon, BanknotesIcon, CalendarIcon } from '@heroicons/react/24/outline';

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
        <div className="bg-white dark:bg-gray-800 shadow rounded-lg overflow-hidden">
            <div className="p-5">
                <div className="flex items-start">
                    <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg p-3">
                        {icon}
                    </div>
                    <div className="ml-4 flex-1">
                        <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            {title}
                        </dt>
                        <dd className="mt-1">
                            <div className="text-xl font-semibold text-gray-900 dark:text-white">
                                {value}
                            </div>
                        </dd>
                        {change && (
                            <dd className="flex items-center text-xs mt-1">
                                {trend === 'up' && (
                                    <span className="text-emerald-600 font-medium">↑ {change}</span>
                                )}
                                {trend === 'down' && (
                                    <span className="text-red-600 font-medium">↓ {change}</span>
                                )}
                                {trend === 'neutral' && (
                                    <span className="text-gray-600 dark:text-gray-400 font-medium">• {change}</span>
                                )}
                            </dd>
                        )}
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
                
                <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    {/* Admin Header */}
                    <div className="bg-emerald-700 shadow rounded-lg overflow-hidden mb-6">
                        <div className="px-6 py-6">
                            <h1 className="text-xl font-semibold text-white">Admin Dashboard</h1>
                            <p className="mt-1 text-emerald-100">
                                Kelola konsultasi, pengguna, dan layanan Arsitekta
                            </p>
                            <div className="mt-2 flex items-center text-emerald-100 text-sm">
                                <CalendarIcon className="h-4 w-4 mr-1" />
                                <span>{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                        <StatCard
                            title="Total Pengguna"
                            value={dashboardStats.users}
                            icon={<UserGroupIcon className="h-5 w-5 text-emerald-600" />}
                            change="12% dari bulan lalu"
                            trend="up"
                        />
                        <StatCard
                            title="Konsultasi Menunggu"
                            value={dashboardStats.pendingConsultations}
                            icon={<ClipboardDocumentListIcon className="h-5 w-5 text-emerald-600" />}
                        />
                        <StatCard
                            title="Konsultasi Selesai"
                            value={dashboardStats.completedConsultations}
                            icon={<ClipboardDocumentCheckIcon className="h-5 w-5 text-emerald-600" />}
                            change="18% dari bulan lalu"
                            trend="up"
                        />
                        <StatCard
                            title="Pendapatan"
                            value={`Rp ${dashboardStats.revenue.toLocaleString('id-ID')}`}
                            icon={<BanknotesIcon className="h-5 w-5 text-emerald-600" />}
                            change="5% dari bulan lalu"
                            trend="up"
                        />
                    </div>

                    {/* Main Content */}
                    <div className="bg-white shadow rounded-lg mb-6">
                        <div className="px-6 py-5 border-b border-gray-200">
                            <div className="flex items-center">
                                <ClipboardDocumentListIcon className="h-5 w-5 text-emerald-600 mr-2" />
                                <h3 className="text-lg font-medium text-gray-900">
                                    Permintaan Konsultasi Menunggu
                                </h3>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                                Daftar permintaan konsultasi yang perlu ditanggapi
                            </p>
                        </div>
                        <div className="p-6">
                            <AdminConsultationList />
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white shadow rounded-lg overflow-hidden">
                        <div className="px-6 py-5 border-b border-gray-200">
                            <div className="flex items-center">
                                <CalendarIcon className="h-5 w-5 text-emerald-600 mr-2" />
                                <h3 className="text-lg font-medium text-gray-900">
                                    Aktivitas Terbaru
                                </h3>
                            </div>
                            <p className="mt-1 text-sm text-gray-500">
                                Daftar aktivitas terbaru dalam sistem
                            </p>
                        </div>
                        
                        <div className="divide-y divide-gray-200">
                            {adminConsultations.length > 0 ? (
                                adminConsultations.slice(0, 5).map((consultation, index) => (
                                    <div key={index} className="p-4">
                                        <div className="flex items-start space-x-3">
                                            <div className="flex-shrink-0">
                                                <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                                                    <UserGroupIcon className="h-5 w-5 text-emerald-600" />
                                                </div>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {consultation.user_id ? `User ID: ${consultation.user_id}` : 'Pengguna'}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {consultation.status === 'pending' && 'Mengajukan permintaan konsultasi'}
                                                    {consultation.status === 'approved' && 'Konsultasi diterima'}
                                                    {consultation.status === 'rejected' && 'Konsultasi ditolak'}
                                                </p>
                                                <p className="text-xs text-gray-400 mt-1">
                                                    {new Date().toLocaleDateString('id-ID')}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="py-6 px-4 text-center">
                                    <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center mb-3">
                                        <CalendarIcon className="h-6 w-6 text-emerald-600" />
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        Belum ada aktivitas terbaru
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </AppLayout>
        </ConsultationProvider>
    );
}
