import React from 'react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';
import { Consultation, ConsultationProvider } from '@/contexts/ConsultationContext';
import ConsultationRequest from '@/components/consultation/ConsultationRequest';
import ConsultationStatus from '@/components/consultation/ConsultationStatus';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BuildingOffice2Icon, 
  UserIcon, 
  DocumentTextIcon, 
  ClipboardDocumentListIcon,
  ChartBarIcon,
  CalendarIcon,
  PlusCircleIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

interface BreadcrumbItem {
  title: string;
  href: string;
}

interface DashboardProps {
  consultations?: Consultation[];
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/dashboard',
  },
];

export default function Dashboard({ consultations = [] }: DashboardProps) {
  const { props } = usePage<SharedData>();
  const { auth } = props;
  const user = auth?.user;
  const userConsultations: Consultation[] = (props.consultations as Consultation[] | undefined) || consultations;
  const latestConsultation = userConsultations.length > 0 ? userConsultations[0] : null;
  
  // Animation variants for staggered animation
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

  const stats = [
    { 
      name: 'Total Proyek', 
      value: '0', 
      icon: BuildingOffice2Icon, 
      color: 'text-blue-500 dark:text-blue-400', 
      bgColor: 'bg-blue-100 dark:bg-blue-900/20' 
    },
    { 
      name: 'Konsultasi', 
      value: latestConsultation ? '1' : '0', 
      icon: UserIcon, 
      color: 'text-indigo-500 dark:text-indigo-400', 
      bgColor: 'bg-indigo-100 dark:bg-indigo-900/20' 
    },
    { 
      name: 'Dokumen', 
      value: '0', 
      icon: DocumentTextIcon, 
      color: 'text-purple-500 dark:text-purple-400', 
      bgColor: 'bg-purple-100 dark:bg-purple-900/20' 
    },
    { 
      name: 'Penyelesaian', 
      value: '0%', 
      icon: ChartBarIcon, 
      color: 'text-emerald-500 dark:text-emerald-400', 
      bgColor: 'bg-emerald-100 dark:bg-emerald-900/20' 
    },
  ];

  return (
    <ConsultationProvider initialConsultations={latestConsultation ? [latestConsultation] : []}>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Dashboard" />
        <div className="py-8 sm:py-12 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
            {/* Decorative elements - light beams for Gen Z aesthetic */}
            <div className="absolute -top-10 -right-20 w-72 h-72 bg-gradient-to-br from-indigo-400 to-emerald-400 rounded-full filter blur-3xl opacity-10 animate-pulse"></div>
            <div className="absolute top-40 -left-20 w-72 h-72 bg-gradient-to-br from-fuchsia-300 to-emerald-300 rounded-full filter blur-3xl opacity-10 animate-pulse delay-700"></div>
            {/* Welcome Header with animated sparkle icon */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8 relative"
            >
              <div className="flex items-center">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-emerald-500 to-indigo-600 bg-clip-text text-transparent">
                  Selamat datang, {user?.name}
                </h1>
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="ml-2"
                >
                  <SparklesIcon className="h-6 w-6 text-emerald-500 animate-pulse" />
                </motion.div>
              </div>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                Berikut adalah rangkuman dashboard Anda
              </p>
            </motion.div>
            
            {/* Stats Grid with staggered animation */}
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="mt-6 mb-8"
            >
              <dl className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {stats.map((stat) => (
                  <motion.div 
                    key={stat.name}
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                    className="px-4 py-5 bg-white dark:bg-gray-900 shadow rounded-xl overflow-hidden sm:p-6 transition duration-200 hover:shadow-xl border border-gray-100 dark:border-gray-800 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
                  >
                    <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate flex items-center">
                      <div className={`mr-2 flex items-center justify-center p-1.5 rounded-md ${stat.bgColor}`}>
                        <stat.icon className={`h-5 w-5 ${stat.color}`} aria-hidden="true" />
                      </div>
                      {stat.name}
                    </dt>
                    <dd className="mt-3 text-3xl font-semibold text-gray-900 dark:text-white">{stat.value}</dd>
                  </motion.div>
                ))}
              </dl>
            </motion.div>

            {/* Main Content with animated appearance */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Left Column - Quick Stats */}
              <div className="lg:col-span-1 space-y-6">
                <motion.div variants={itemVariants} className="bg-white dark:bg-gray-900 overflow-hidden shadow-md rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-3">
                        <CalendarIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            Total Konsultasi
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              {userConsultations.length}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div 
                  variants={itemVariants}
                  className="bg-white dark:bg-gray-900 overflow-hidden shadow-md rounded-xl border border-gray-100 dark:border-gray-800 hover:shadow-lg transition-all duration-300 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
                >
                  <div className="p-6">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/30 rounded-full p-3">
                        <ClipboardDocumentListIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                      </div>
                      <div className="ml-5 w-0 flex-1">
                        <dl>
                          <dt className="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">
                            Status Terkini
                          </dt>
                          <dd>
                            <div className="text-lg font-medium text-gray-900 dark:text-white">
                              {latestConsultation?.status === 'pending' && 'Menunggu'}
                              {latestConsultation?.status === 'approved' && 'Disetujui'}
                              {latestConsultation?.status === 'rejected' && 'Ditolak'}
                              {!latestConsultation && 'Belum Ada'}
                            </div>
                          </dd>
                        </dl>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {!latestConsultation && (
                  <motion.div variants={itemVariants}>
                    <ConsultationRequest />
                  </motion.div>
                )}
              </div>

              {/* Right Column - Consultation Status */}
              <motion.div 
                variants={itemVariants}
                className="lg:col-span-2 space-y-6"
              >
                <h3 className="text-lg font-medium leading-6 bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent mb-4 flex items-center">
                  <ClipboardDocumentListIcon className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                  Status Konsultasi
                </h3>

                <AnimatePresence mode="wait">
                  {latestConsultation ? (
                    <motion.div
                      key="consultation-status"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ConsultationStatus consultation={latestConsultation} />
                    </motion.div>
                  ) : (
                    <motion.div 
                      key="no-consultation"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                      className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-center py-10 bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800"
                    >
                      <PlusCircleIcon className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" />
                      <h3 className="mt-4 text-sm font-medium text-gray-900 dark:text-white">
                        Belum Ada Konsultasi
                      </h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        Anda belum mengajukan permintaan konsultasi.
                      </p>
                      <div className="mt-6">
                        <button
                          type="button"
                          className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
                          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        >
                          <CalendarIcon className="-ml-1 mr-2 h-4 w-4" />
                          Ajukan Konsultasi
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {latestConsultation && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="mt-8"
                  >
                    <h3 className="text-lg font-medium leading-6 bg-gradient-to-r from-indigo-600 to-emerald-500 bg-clip-text text-transparent mb-4 flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
                      Jadwalkan Konsultasi Lanjutan
                    </h3>
                    <ConsultationRequest />
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </AppLayout>
    </ConsultationProvider>
  );
}
