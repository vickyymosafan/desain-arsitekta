import { useState } from 'react';
import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { ConsultationProvider, Consultation } from '@/contexts/ConsultationContext';
import ConsultationRequest from '@/components/consultation/ConsultationRequest';
import ConsultationStatus from '@/components/consultation/ConsultationStatus';
import { ChartBarIcon, ClipboardDocumentListIcon } from '@heroicons/react/24/outline';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardProps {
    consultations?: Consultation[];
}

export default function Dashboard({ consultations = [] }: DashboardProps) {
    const { props } = usePage();
    const userConsultations: Consultation[] = (props.consultations as Consultation[] | undefined) || consultations;
    const latestConsultation = userConsultations.length > 0 ? userConsultations[0] : null;

    return (
        <ConsultationProvider initialConsultations={userConsultations}>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Dashboard" />
                
                <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="px-4 py-6 sm:px-0">
                        <div className="flex flex-col space-y-8">
                            {/* Welcome Section */}
                            <div className="bg-gradient-to-r from-emerald-600 to-emerald-700 rounded-2xl shadow-lg overflow-hidden">
                                <div className="px-6 py-8 sm:p-10">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-2xl font-bold text-white">
                                            Selamat Datang di Dashboard Anda
                                        </h2>
                                        <div className="hidden sm:block">
                                            <PlaceholderPattern className="h-20 w-20 text-emerald-500/30" />
                                        </div>
                                    </div>
                                    <p className="mt-2 text-emerald-100">
                                        Pantau status konsultasi dan kelola proyek Anda dari satu tempat yang nyaman.
                                    </p>
                                </div>
                            </div>

                            {/* Main Content */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {/* Left Column - Stats */}
                                <div className="md:col-span-1 space-y-6">
                                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-2xl">
                                        <div className="p-6">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900/30 rounded-md p-3">
                                                    <ChartBarIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
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
                                    </div>

                                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-2xl">
                                        <div className="p-6">
                                            <div className="flex items-center">
                                                <div className="flex-shrink-0 bg-emerald-100 dark:bg-emerald-900/30 rounded-md p-3">
                                                    <ClipboardDocumentListIcon className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
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
                                    </div>

                                    {!latestConsultation && (
                                        <ConsultationRequest />
                                    )}
                                </div>

                                {/* Right Column - Status */}
                                <div className="md:col-span-2 space-y-6">
                                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white mb-4">
                                        Status Konsultasi
                                    </h3>

                                    {latestConsultation ? (
                                        <ConsultationStatus consultation={latestConsultation} />
                                    ) : (
                                        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 text-center py-10">
                                            <svg
                                                className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={1.5}
                                                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                                />
                                            </svg>
                                            <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Belum Ada Konsultasi
                                            </h3>
                                            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                                Anda belum mengajukan permintaan konsultasi.
                                            </p>
                                            <div className="mt-6">
                                                <button
                                                    type="button"
                                                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500"
                                                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                                                >
                                                    Ajukan Konsultasi
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {latestConsultation && (
                                        <div className="mt-8">
                                            <ConsultationRequest />
                                        </div>
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
