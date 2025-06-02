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
  UserIcon, 
  DocumentTextIcon, 
  ClipboardDocumentListIcon,
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

  return (
    <ConsultationProvider initialConsultations={latestConsultation ? [latestConsultation] : []}>
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Dashboard" />
        <div className="py-6 relative">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
            {/* Welcome Header */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-8 bg-gradient-to-r from-gray-900/90 to-gray-800/50 p-6 rounded-xl border border-gray-700/60"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-900/30 rounded-full">
                  <SparklesIcon className="h-6 w-6 text-indigo-400" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold text-white">
                  Selamat datang, {user?.name}
                </h1>
              </div>
              <p className="mt-2 text-sm text-gray-400 ml-11">
                Berikut adalah rangkuman dashboard Anda
              </p>
            </motion.div>
            
            {/* Main Dashboard Content */}
            <div className="grid grid-cols-12 gap-6">
              {/* Left Column - Summary Stats */}
              <div className="col-span-12 md:col-span-4 space-y-6">
                {/* Consultation Count Card */}
                <motion.div 
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 h-full"
                >
                  <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                    <h3 className="font-medium text-gray-700 dark:text-gray-200 flex items-center">
                      <UserIcon className="h-5 w-5 mr-2 text-indigo-500" />
                      Ringkasan
                    </h3>
                  </div>
                  <div className="p-5">
                    <div className="space-y-4">
                      {/* Consultation Count */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Total Konsultasi</span>
                        <span className="text-lg font-semibold text-gray-900 dark:text-white">{userConsultations.length}</span>
                      </div>
                      
                      {/* Consultation Status */}
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-500 dark:text-gray-400">Status Terkini</span>
                        <span className={`text-sm font-medium px-2.5 py-0.5 rounded-full ${latestConsultation?.status === 'approved' ? 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400' : latestConsultation?.status === 'rejected' ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400' : latestConsultation ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400' : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400'}`}>
                          {latestConsultation?.status === 'pending' && 'Menunggu'}
                          {latestConsultation?.status === 'approved' && 'Disetujui'}
                          {latestConsultation?.status === 'rejected' && 'Ditolak'}
                          {!latestConsultation && 'Belum Ada'}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* New Consultation Request */}
                {(!latestConsultation || latestConsultation.status === 'rejected') && (
                  <motion.div 
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700"
                  >
                    <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                      <h3 className="font-medium text-gray-700 dark:text-gray-200 flex items-center">
                        <PlusCircleIcon className="h-5 w-5 mr-2 text-emerald-500" />
                        Permintaan Baru
                      </h3>
                    </div>
                    <div className="p-5">
                      <ConsultationRequest />
                    </div>
                  </motion.div>
                )}
              </div>
              
              {/* Right Column - Consultation Details */}
              <div className="col-span-12 md:col-span-8">
                <motion.div 
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  className="bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700 h-full"
                >
                  <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                    <h3 className="font-medium text-gray-700 dark:text-gray-200 flex items-center">
                      <CalendarIcon className="h-5 w-5 mr-2 text-indigo-500" />
                      Status Konsultasi
                    </h3>
                  </div>
                  <div className="p-5">
                    <AnimatePresence mode="wait">
                      {latestConsultation ? (
                        <motion.div
                          key="consultation-status"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <ConsultationStatus consultation={latestConsultation} />
                        </motion.div>
                      ) : (
                        <motion.div 
                          key="no-consultation"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-center py-6 flex flex-col items-center justify-center"
                        >
                          <div className="p-3 rounded-full bg-indigo-100 dark:bg-indigo-900/30 inline-flex mb-4">
                            <PlusCircleIcon className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <h3 className="text-base font-medium text-gray-900 dark:text-white mb-2">
                            Belum Ada Konsultasi
                          </h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs mx-auto mb-6">
                            Anda belum mengajukan permintaan konsultasi untuk proyek Anda.
                          </p>
                          <button
                            type="button"
                            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 hover:scale-105 active:scale-95"
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                          >
                            <CalendarIcon className="-ml-1 mr-2 h-4 w-4" />
                            Ajukan Konsultasi
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
                
                {latestConsultation && latestConsultation.status === 'approved' && (
                  <motion.div 
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-6 bg-white dark:bg-gray-800 shadow-md rounded-xl overflow-hidden border border-gray-100 dark:border-gray-700"
                  >
                    <div className="p-5 border-b border-gray-100 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50">
                      <h3 className="font-medium text-gray-700 dark:text-gray-200 flex items-center">
                        <PlusCircleIcon className="h-5 w-5 mr-2 text-emerald-500" />
                        Permintaan Baru
                      </h3>
                    </div>
                    <div className="p-5">
                      <ConsultationRequest />
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          </div>
        </div>
      </AppLayout>
    </ConsultationProvider>
  );
}
