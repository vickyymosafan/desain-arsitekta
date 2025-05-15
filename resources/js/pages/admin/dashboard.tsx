import React from 'react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ConsultationProvider, Consultation } from '@/contexts/ConsultationContext';
import AdminConsultationList from '@/components/consultation/AdminConsultationList';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  UserGroupIcon, 
  ClipboardDocumentCheckIcon, 
  ClipboardDocumentListIcon, 
  BanknotesIcon, 
  CalendarIcon,
  ChartBarIcon,
  ArrowTrendingUpIcon,
  SparklesIcon,
  RectangleGroupIcon
} from '@heroicons/react/24/outline';

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
        <motion.div 
            whileHover={{ y: -5, scale: 1.02 }}
            transition={{ duration: 0.2 }}
            className="h-full bg-white dark:bg-gray-900 shadow-md rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
        >
            <div className="p-5 h-full flex flex-col">
                <div className="flex items-center h-full">
                    <div className="flex-shrink-0 bg-gradient-to-br from-indigo-100 to-emerald-100 dark:from-indigo-900/30 dark:to-emerald-900/30 rounded-lg p-3 shadow-sm">
                        {icon}
                    </div>
                    <div className="ml-4 flex-1">
                        <dt className="text-sm font-medium text-white truncate">
                            {title}
                        </dt>
                        <dd className="mt-1">
                            <div className="text-xl font-bold text-gray-900 dark:text-white">
                                {value}
                            </div>
                        </dd>
                        {change && (
                            <dd className="flex items-center text-xs mt-1">
                                {trend === 'up' && (
                                    <span className="flex items-center text-emerald-600 dark:text-emerald-400 font-medium">
                                        <ArrowTrendingUpIcon className="h-3 w-3 mr-1" />
                                        {change}
                                    </span>
                                )}
                                {trend === 'down' && (
                                    <span className="flex items-center text-red-600 dark:text-red-400 font-medium">
                                        <ArrowTrendingUpIcon className="h-3 w-3 mr-1 rotate-180" />
                                        {change}
                                    </span>
                                )}
                                {trend === 'neutral' && (
                                    <span className="flex items-center text-gray-600 dark:text-gray-400 font-medium">
                                        <span className="h-2 w-2 rounded-full bg-gray-400 mr-1"></span>
                                        {change}
                                    </span>
                                )}
                            </dd>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

interface DashboardProps {
    consultations?: Consultation[];
    stats?: {
        users: number;
        pendingConsultations: number;
        completedConsultations: number;
    };
}

export default function Dashboard({ 
    consultations = [],
    stats = {
        users: 0,
        pendingConsultations: 0,
        completedConsultations: 0
    }
}: DashboardProps) {
    const { props } = usePage();
    const adminConsultations: Consultation[] = (props.consultations as Consultation[] | undefined) || consultations;
    
    // Cast stats props with correct type
    const dashboardStats = (props.stats as typeof stats | undefined) || stats;
    
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 300,
                damping: 24
            }
        }
    };

    return (
        <ConsultationProvider initialConsultations={adminConsultations}>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Admin Dashboard" />
                
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 relative">
                    {/* Admin dashboard content starts here */}
                    
                    {/* Admin Header */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="bg-gradient-to-r from-gray-800 to-gray-900 dark:from-gray-900 dark:to-black shadow-lg rounded-xl overflow-hidden mb-8"
                    >
                        <div className="px-8 py-8">
                            <div className="flex items-center">
                                <RectangleGroupIcon className="h-6 w-6 text-emerald-500 mr-3" />
                                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                                <motion.div 
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    className="ml-2"
                                >
                                    <SparklesIcon className="h-5 w-5 text-emerald-500 animate-pulse" />
                                </motion.div>
                            </div>
                            <p className="mt-2 text-gray-300">
                                Kelola konsultasi, pengguna, dan layanan Arsitekta
                            </p>
                            <div className="mt-3 flex items-center text-gray-300 text-sm">
                                <CalendarIcon className="h-4 w-4 mr-2" />
                                <span>{new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Stats Section with staggered animation */}
                    <motion.div 
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
                    >
                        <motion.div variants={itemVariants}>
                            <StatCard
                                title="Total Pengguna"
                                value={dashboardStats.users}
                                icon={<UserGroupIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
                                trend="up"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <StatCard
                                title="Konsultasi Menunggu"
                                value={dashboardStats.pendingConsultations}
                                icon={<ClipboardDocumentListIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />}
                                trend="neutral"
                            />
                        </motion.div>
                        <motion.div variants={itemVariants}>
                            <StatCard
                                title="Konsultasi Selesai"
                                value={dashboardStats.completedConsultations}
                                icon={<ClipboardDocumentCheckIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />}
                                trend="up"
                            />
                        </motion.div>

                    </motion.div>

                    {/* Main Content - Consultation Requests */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-white dark:bg-gray-900 shadow-lg rounded-xl mb-10 overflow-hidden border border-gray-100 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
                    >
                        <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center">
                                <div className="mr-3 flex items-center justify-center p-2 rounded-md bg-emerald-100 dark:bg-emerald-900/30">
                                    <ClipboardDocumentListIcon className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">
                                    Permintaan Konsultasi Menunggu
                                </h3>
                            </div>
                            <p className="mt-2 text-sm text-white">
                                Daftar permintaan konsultasi yang perlu ditanggapi
                            </p>
                        </div>
                        <div className="p-6 lg:p-8">
                            <AdminConsultationList />
                        </div>
                    </motion.div>

                    {/* Recent Activity */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-white dark:bg-gray-900 shadow-lg rounded-xl overflow-hidden border border-gray-100 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
                    >
                        <div className="px-8 py-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center">
                                <div className="mr-3 flex items-center justify-center p-2 rounded-md bg-indigo-100 dark:bg-indigo-900/30">
                                    <CalendarIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                </div>
                                <h3 className="text-lg font-bold text-white">
                                    Aktivitas Terbaru
                                </h3>
                            </div>
                            <p className="mt-2 text-sm text-white">
                                Daftar aktivitas terbaru dalam sistem
                            </p>
                        </div>
                        
                        <div className="divide-y divide-gray-200 dark:divide-gray-700 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                            <AnimatePresence>
                                {adminConsultations.length > 0 ? (
                                    adminConsultations.slice(0, 5).map((consultation, index) => (
                                        <motion.div 
                                            key={index} 
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.1 }}
                                            className="p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors duration-150 rounded-md mx-2 my-1"
                                        >
                                            <div className="flex items-center space-x-4">
                                                <div className="flex-shrink-0">
                                                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-indigo-100 to-emerald-100 dark:from-indigo-900/30 dark:to-emerald-900/30 flex items-center justify-center shadow-sm">
                                                        <UserGroupIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                                                    </div>
                                                </div>
                                                <div className="flex-1 min-w-0 ml-1">
                                                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {consultation.user_id ? `User ID: ${consultation.user_id}` : 'Pengguna'}
                                                    </p>
                                                    <p className="text-sm">
                                                        <span className={
                                                            consultation.status === 'pending' ? 'text-amber-600 dark:text-amber-400' :
                                                            consultation.status === 'approved' ? 'text-emerald-600 dark:text-emerald-400' :
                                                            'text-red-600 dark:text-red-400'
                                                        }>
                                                            {consultation.status === 'pending' && 'Mengajukan permintaan konsultasi'}
                                                            {consultation.status === 'approved' && 'Konsultasi diterima'}
                                                            {consultation.status === 'rejected' && 'Konsultasi ditolak'}
                                                        </span>
                                                    </p>
                                                    <p className="text-xs text-gray-400 mt-1 flex items-center">
                                                        <CalendarIcon className="h-3 w-3 mr-1" />
                                                        {new Date(consultation.created_at || new Date()).toLocaleDateString('id-ID')}
                                                    </p>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <motion.div 
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="py-8 px-4 text-center"
                                    >
                                        <div className="mx-auto h-16 w-16 rounded-full bg-gradient-to-br from-gray-100 to-indigo-100 dark:from-gray-800 dark:to-indigo-900/30 flex items-center justify-center mb-6 shadow-sm">
                                            <CalendarIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                        </div>
                                        <p className="text-base text-gray-600 dark:text-gray-400 font-medium">
                                            Belum ada aktivitas terbaru
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">
                                            Aktivitas akan muncul setelah ada interaksi pengguna
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </AppLayout>
        </ConsultationProvider>
    );
}
