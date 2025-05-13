import React, { useState, useEffect } from 'react';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';
import { 
  CheckIcon, 
  XMarkIcon, 
  ClockIcon, 
  CalendarIcon, 
  UserIcon, 
  ExclamationCircleIcon,
  ArrowPathIcon,
  BellAlertIcon,
  CheckCircleIcon
} from '@heroicons/react/24/outline';
import { Consultation, useConsultation } from '@/contexts/ConsultationContext';

const AdminConsultationList: React.FC = () => {
  const { pendingConsultations, approveConsultation, rejectConsultation, isLoading } = useConsultation();
  const [rejectReason, setRejectReason] = useState<string>('');
  const [activeConsultation, setActiveConsultation] = useState<number | null>(null);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState<boolean>(false);
  const [notificationMessage, setNotificationMessage] = useState<string>('');
  const [notificationType, setNotificationType] = useState<'success' | 'error' | null>(null);
  
  // Auto-hide notification after 5 seconds
  useEffect(() => {
    if (notificationMessage) {
      const timer = setTimeout(() => {
        setNotificationMessage('');
        setNotificationType(null);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [notificationMessage]);

  const formatDate = (dateString: string | Date) => {
    if (typeof dateString === 'string') {
      return format(parseISO(dateString), 'dd MMMM yyyy', { locale: id });
    }
    return format(dateString, 'dd MMMM yyyy', { locale: id });
  };

  const handleApprove = (id: number) => {
    approveConsultation(id);
    setNotificationMessage('Konsultasi berhasil diterima. Pengguna akan menerima notifikasi otomatis.');
    setNotificationType('success');
  };

  const openRejectModal = (id: number) => {
    setActiveConsultation(id);
    setIsRejectModalOpen(true);
  };

  const handleReject = () => {
    if (activeConsultation && rejectReason.trim()) {
      rejectConsultation(activeConsultation, rejectReason);
      setNotificationMessage('Konsultasi berhasil ditolak dengan alasan yang diberikan.');
      setNotificationType('success');
      setRejectReason('');
      setActiveConsultation(null);
      setIsRejectModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Success/Error Notification */}
      {notificationMessage && (
        <div className={`rounded-md p-4 ${notificationType === 'success' ? 'bg-green-50 dark:bg-green-900/20' : 'bg-red-50 dark:bg-red-900/20'}`}>
          <div className="flex">
            <div className="flex-shrink-0">
              {notificationType === 'success' ? (
                <CheckCircleIcon className="h-5 w-5 text-green-400" aria-hidden="true" />
              ) : (
                <ExclamationCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
              )}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${notificationType === 'success' ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}`}>
                {notificationMessage}
              </p>
            </div>
          </div>
        </div>
      )}
      
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
          <BellAlertIcon className="h-5 w-5 mr-2 text-indigo-600 dark:text-indigo-400" />
          Permintaan Konsultasi Menunggu
        </h2>
      </div>

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <ArrowPathIcon className="h-8 w-8 text-emerald-500 animate-spin" />
          <span className="ml-2 text-gray-600 dark:text-gray-300">Memproses...</span>
        </div>
      )}

      {!isLoading && pendingConsultations.length === 0 && (
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-8 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900/30 mb-4">
            <CalendarIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">Tidak ada permintaan konsultasi</h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Saat ini tidak ada permintaan konsultasi yang menunggu persetujuan.
          </p>
        </div>
      )}

      {!isLoading && pendingConsultations.length > 0 && (
        <div className="overflow-hidden bg-white dark:bg-gray-900 shadow rounded-lg">
          <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
            {pendingConsultations.map((consultation) => (
              <li key={consultation.id} className="relative">
                <div className="px-4 py-5 sm:px-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
                  <div className="mb-4 sm:mb-0">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 mr-3">
                        <div className="h-10 w-10 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center">
                          <UserIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                        </div>
                      </div>
                      <div>
                        <h4 className="text-base font-medium text-gray-900 dark:text-white">
                          {consultation.user_id ? `User ID: ${consultation.user_id}` : 'Pengguna'}
                        </h4>
                        <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <CalendarIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                          <span>Tanggal Konsultasi: {formatDate(consultation.consultation_date)}</span>
                        </div>
                        <div className="mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <ClockIcon className="mr-1.5 h-4 w-4 flex-shrink-0 text-gray-400 dark:text-gray-500" />
                          <span>Diajukan pada: {consultation.created_at ? formatDate(consultation.created_at) : 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <button
                      type="button"
                      onClick={() => handleApprove(consultation.id!)}
                      disabled={isLoading}
                      className="inline-flex items-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <CheckIcon className="-ml-0.5 mr-1.5 h-4 w-4" />
                      Terima
                    </button>
                    <button
                      type="button"
                      onClick={() => openRejectModal(consultation.id!)}
                      disabled={isLoading}
                      className="inline-flex items-center rounded-md bg-white dark:bg-gray-800 px-4 py-2 text-sm font-medium text-gray-900 dark:text-gray-200 shadow-sm ring-1 ring-inset ring-gray-300 dark:ring-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <XMarkIcon className="-ml-0.5 mr-1.5 h-4 w-4" />
                      Tolak
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Reject Modal - Step 3 where admin provides rejection reason */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 dark:bg-gray-900 bg-opacity-75 dark:bg-opacity-75 transition-opacity" aria-hidden="true" onClick={() => setIsRejectModalOpen(false)}></div>

            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

            <div className="inline-block align-bottom bg-white dark:bg-gray-900 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900/30 sm:mx-0 sm:h-10 sm:w-10">
                    <ExclamationCircleIcon className="h-6 w-6 text-red-600 dark:text-red-400" aria-hidden="true" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white" id="modal-title">
                      Tolak Permintaan Konsultasi
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Harap berikan alasan penolakan permintaan konsultasi ini. Alasan ini akan ditampilkan kepada pengguna.
                      </p>
                      <div className="mt-4">
                        <textarea
                          rows={4}
                          name="reject-reason"
                          id="reject-reason"
                          className="shadow-sm block w-full focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-800 dark:text-white"
                          placeholder="Alasan penolakan..."
                          value={rejectReason}
                          onChange={(e) => setRejectReason(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  disabled={!rejectReason.trim()}
                  className={`w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200
                    ${rejectReason.trim() ? 'bg-red-600 hover:bg-red-700 focus:ring-red-500' : 'bg-red-400 cursor-not-allowed'}`}
                  onClick={handleReject}
                >
                  Tolak Permintaan
                </button>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-700 shadow-sm px-4 py-2 bg-white dark:bg-gray-900 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm transition-colors duration-200"
                  onClick={() => setIsRejectModalOpen(false)}
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminConsultationList;
