import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline';
import DatePickerModal from './DatePickerModal';
import { useConsultation } from '@/contexts/ConsultationContext';

const ConsultationRequest: React.FC = () => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { submitConsultationRequest, isLoading } = useConsultation();

  const handleDateSelect = (date: Date) => {
    submitConsultationRequest(date);
  };

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
        className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-emerald-200/30 dark:border-emerald-900/30"
      >
        <div className="flex items-start sm:items-center flex-col sm:flex-row">
          <div className="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
            <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
              <CalendarIcon className="h-10 w-10 text-emerald-600 dark:text-emerald-400" />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Jadwalkan Konsultasi Gratis</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Pilih tanggal dan waktu yang sesuai untuk konsultasi dengan tim kami. Kami akan menghubungi Anda untuk mengkonfirmasi jadwal konsultasi.
            </p>
            
            <div className="mb-5 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <ClockIcon className="mr-2 h-5 w-5 text-emerald-500 dark:text-emerald-400" />
              <span>Durasi konsultasi: 45-60 menit</span>
            </div>
            
            <button
              type="button"
              onClick={openDatePicker}
              disabled={isLoading}
              className="inline-flex items-center px-5 py-3 rounded-xl bg-emerald-600 text-white font-medium shadow-sm hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
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
