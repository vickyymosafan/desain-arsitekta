import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { 
  CalendarIcon, 
  ClockIcon, 
  CheckCircleIcon, 
  XCircleIcon,
  ExclamationCircleIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import { Consultation } from '@/contexts/ConsultationContext';
import DatePickerModal from './DatePickerModal';
import { useConsultation } from '@/contexts/ConsultationContext';

interface ConsultationStatusProps {
  consultation: Consultation;
}

const ConsultationStatus: React.FC<ConsultationStatusProps> = ({ consultation }) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { submitConsultationRequest, isLoading } = useConsultation();
  
  const openDatePicker = () => {
    setIsDatePickerOpen(true);
  };

  const closeDatePicker = () => {
    setIsDatePickerOpen(false);
  };
  
  const handleDateSelect = (date: Date) => {
    // Submit the consultation request which will redirect to dashboard
    submitConsultationRequest(date);
    closeDatePicker();
  };
  const formatDate = (dateString: string | Date) => {
    if (typeof dateString === 'string') {
      return format(parseISO(dateString), 'EEEE, d MMMM yyyy', { locale: id });
    }
    return format(dateString, 'EEEE, d MMMM yyyy', { locale: id });
  };

  const getStatusColor = () => {
    switch (consultation.status) {
      case 'approved':
        return 'bg-green-50 dark:bg-green-900/20 text-green-800 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'rejected':
        return 'bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 border-red-200 dark:border-red-800';
      case 'pending':
      default:
        return 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-800';
    }
  };

  const getStatusIcon = () => {
    switch (consultation.status) {
      case 'approved':
        return <CheckCircleIcon className="h-5 w-5 text-green-500 dark:text-green-400" />;
      case 'rejected':
        return <XCircleIcon className="h-5 w-5 text-red-500 dark:text-red-400" />;
      case 'pending':
      default:
        return <ClockIcon className="h-5 w-5 text-indigo-500 dark:text-indigo-400" />;
    }
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
        <InformationCircleIcon className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
        Status Konsultasi
      </h3>
      
      <div className="flex items-center mb-3">
        <CalendarIcon className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2" />
        <span className="text-gray-700 dark:text-gray-300">{formatDate(consultation.consultation_date)}</span>
      </div>

      {consultation.created_at && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
          Diajukan pada: {formatDate(consultation.created_at)}
        </div>
      )}

      <div className={`mt-4 p-4 rounded-md border ${getStatusColor()}`}>
        <div className="flex">
          <div className="flex-shrink-0">
            {getStatusIcon()}
          </div>
          <div className="ml-3">
            {consultation.status === 'pending' && (
              <>
                <h3 className="text-sm font-medium text-indigo-800 dark:text-indigo-300">Menunggu Konfirmasi</h3>
                <p className="mt-2 text-sm text-indigo-700 dark:text-indigo-400">
                  Permintaan konsultasi Anda sedang ditinjau oleh admin. Kami akan memberitahu Anda jika sudah dikonfirmasi.
                </p>
              </>
            )}
            {consultation.status === 'approved' && (
              <>
                <h3 className="text-sm font-medium text-green-800 dark:text-green-300">Konsultasi Diterima</h3>
                <p className="mt-2 text-sm text-green-700 dark:text-green-400">
                  Tim kami akan menghubungi Anda segera untuk mengkonfirmasi jadwal konsultasi.
                </p>
              </>
            )}
            {consultation.status === 'rejected' && (
              <>
                <h3 className="text-sm font-medium text-red-800 dark:text-red-300">Konsultasi Ditolak</h3>
                <p className="mt-2 text-sm text-red-700 dark:text-red-400">
                  Mohon maaf, permintaan konsultasi Anda telah ditolak.
                  {consultation.rejection_reason && (
                    <>
                      <br />
                      <span className="font-medium">Alasan:</span> {consultation.rejection_reason}
                    </>
                  )}
                </p>
                <div className="mt-3 flex items-center justify-start">
                  <button
                    type="button"
                    onClick={openDatePicker}
                    disabled={isLoading}
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      "Memproses..."
                    ) : (
                      <>
                        <CalendarIcon className="-ml-0.5 mr-1.5 h-3 w-3" />
                        Ajukan Konsultasi Baru
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      {/* Date Picker Modal */}
      <DatePickerModal 
        isOpen={isDatePickerOpen} 
        onClose={closeDatePicker} 
        onSubmit={handleDateSelect} 
      />
    </div>
  );
};

export default ConsultationStatus;
