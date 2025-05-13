import React from 'react';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  XCircleIcon, 
  CalendarIcon 
} from '@heroicons/react/24/outline';
import { Consultation } from '@/contexts/ConsultationContext';

interface ConsultationStatusProps {
  consultation: Consultation;
}

const ConsultationStatus: React.FC<ConsultationStatusProps> = ({ consultation }) => {
  const getStatusBadge = () => {
    switch (consultation.status) {
      case 'pending':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300">
            <ClockIcon className="mr-1 h-4 w-4" />
            Menunggu Respon
          </div>
        );
      case 'approved':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300">
            <CheckCircleIcon className="mr-1 h-4 w-4" />
            Diterima
          </div>
        );
      case 'rejected':
        return (
          <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300">
            <XCircleIcon className="mr-1 h-4 w-4" />
            Ditolak
          </div>
        );
      default:
        return null;
    }
  };

  const formatDate = (dateString: string | Date) => {
    if (typeof dateString === 'string') {
      return format(parseISO(dateString), 'dd MMMM yyyy', { locale: id });
    }
    return format(dateString, 'dd MMMM yyyy', { locale: id });
  };

  return (
    <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Permintaan Konsultasi
          </h3>
          {getStatusBadge()}
        </div>
        
        <div className="flex items-center mb-3">
          <CalendarIcon className="h-5 w-5 text-indigo-500 dark:text-indigo-400 mr-2" />
          <span className="text-gray-700 dark:text-gray-300">
            {formatDate(consultation.consultation_date)}
          </span>
        </div>
        
        {consultation.created_at && (
          <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
            Diajukan pada: {formatDate(consultation.created_at)}
          </div>
        )}

        {consultation.status === 'pending' && (
          <div className="mt-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 text-yellow-800 dark:text-yellow-300 text-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <ClockIcon className="h-5 w-5 text-yellow-600 dark:text-yellow-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="font-medium">Menunggu respon dari admin</p>
                <p className="mt-1">Kami akan segera meninjau permintaan konsultasi Anda. Harap bersabar.</p>
              </div>
            </div>
          </div>
        )}

        {consultation.status === 'approved' && (
          <div className="mt-4 bg-green-50 dark:bg-green-900/20 rounded-lg p-4 text-green-800 dark:text-green-300 text-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <CheckCircleIcon className="h-5 w-5 text-green-600 dark:text-green-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="font-medium">Konsultasi Diterima</p>
                <p className="mt-1">Tim kami akan menghubungi Anda segera untuk mengkonfirmasi jadwal konsultasi.</p>
              </div>
            </div>
          </div>
        )}

        {consultation.status === 'rejected' && consultation.rejection_reason && (
          <div className="mt-4 bg-red-50 dark:bg-red-900/20 rounded-lg p-4 text-red-800 dark:text-red-300 text-sm">
            <div className="flex">
              <div className="flex-shrink-0">
                <XCircleIcon className="h-5 w-5 text-red-600 dark:text-red-400" aria-hidden="true" />
              </div>
              <div className="ml-3">
                <p className="font-medium">Konsultasi Ditolak</p>
                <p className="mt-1">Alasan: {consultation.rejection_reason}</p>
                <p className="mt-2">Anda dapat mengajukan permintaan konsultasi baru dengan tanggal yang berbeda.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ConsultationStatus;
