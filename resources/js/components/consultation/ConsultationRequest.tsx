import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarIcon, ClockIcon, InformationCircleIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import DatePickerModal from './DatePickerModal';
import { useConsultation } from '@/contexts/ConsultationContext';
import { usePage } from '@inertiajs/react';
import { SharedData } from '@/types';

const ConsultationRequest: React.FC = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { submitConsultationRequest, isLoading } = useConsultation();
  const { auth } = usePage<SharedData>().props;

  const handleDateSelect = (date: Date) => {
    // Show a brief success message before redirecting
    setShowSuccessMessage(true);
    
    // Submit the consultation request which will redirect to dashboard
    submitConsultationRequest(date);
  };
  
  // Reset success message if shown
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => setShowSuccessMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const openDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  const closeDatePicker = () => {
    setIsDatePickerOpen(false);
  };

  return (
    <>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
      >
        <div className="flex items-start sm:items-center flex-col sm:flex-row">
          <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
            <div className="p-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-full">
              <CalendarIcon className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 flex items-center">
              <span>Jadwalkan Konsultasi Gratis</span>
              <span className="ml-2 inline-flex items-center rounded-md bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 text-xs font-medium text-indigo-700 dark:text-indigo-300 ring-1 ring-inset ring-indigo-600/20 dark:ring-indigo-500/30">
                Gratis
              </span>
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Pilih tanggal untuk konsultasi dengan tim kami. Setelah Anda memilih tanggal, permintaan Anda akan dikirim ke admin untuk ditinjau.
            </p>
            
            <div className="mb-5 space-y-2">
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <ClockIcon className="mr-2 h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                <span>Durasi konsultasi: 45-60 menit</span>
              </div>
              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                <InformationCircleIcon className="mr-2 h-5 w-5 text-indigo-500 dark:text-indigo-400" />
                <span>Konsultasi dapat dilakukan secara tatap muka atau online</span>
              </div>
            </div>
            
            {showSuccessMessage && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-4 p-3 bg-green-50 dark:bg-green-900/20 rounded-md border border-green-200 dark:border-green-800 text-sm"
              >
                <div className="flex">
                  <div className="flex-shrink-0">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-green-800 dark:text-green-300">
                      Permintaan konsultasi berhasil dibuat! Mengalihkan ke dashboard Anda...
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
            
            <button
              type="button"
              onClick={openDatePicker}
              disabled={isLoading || !auth?.user}
              className="inline-flex items-center px-5 py-3 rounded-md bg-indigo-600 text-white font-medium shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Memproses...
                </>
              ) : (
                <>
                  <CalendarIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                  Pilih Tanggal Konsultasi
                </>
              )}
            </button>
            
            {!auth?.user && (
              <div className="mt-4 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md border border-yellow-200 dark:border-yellow-800 text-sm">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <InformationCircleIcon className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                      Anda perlu login terlebih dahulu untuk melakukan konsultasi.
                    </p>
                    <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
                      Silakan login atau daftar untuk mengakses layanan konsultasi gratis kami.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <DatePickerModal 
        isOpen={isDatePickerOpen} 
        onClose={closeDatePicker} 
        onSubmit={handleDateSelect} 
      />
    </>
  );
};

export default ConsultationRequest;
