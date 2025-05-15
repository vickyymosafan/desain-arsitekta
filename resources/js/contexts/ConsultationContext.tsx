import React, { createContext, useContext, useState, ReactNode } from 'react';
import { router } from '@inertiajs/react';

export interface Consultation {
  id?: number;
  user_id?: number;
  consultation_date: Date | string;
  status: 'pending' | 'approved' | 'rejected';
  rejection_reason?: string;
  created_at?: string;
  updated_at?: string;
}

interface ConsultationContextType {
  isLoading: boolean;
  userConsultations: Consultation[];
  pendingConsultations: Consultation[];
  submitConsultationRequest: (date: Date) => void;
  approveConsultation: (id: number) => void;
  rejectConsultation: (id: number, reason: string) => void;
  getConsultationById: (id: number) => Consultation | undefined;
}

const ConsultationContext = createContext<ConsultationContextType | undefined>(undefined);

export const useConsultation = () => {
  const context = useContext(ConsultationContext);
  if (!context) {
    throw new Error('useConsultation must be used within a ConsultationProvider');
  }
  return context;
};

interface ConsultationProviderProps {
  children: ReactNode;
  initialConsultations?: Consultation[];
}

export const ConsultationProvider: React.FC<ConsultationProviderProps> = ({ 
  children, 
  initialConsultations = [] 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [consultations, setConsultations] = useState<Consultation[]>(initialConsultations);

  const userConsultations = consultations;
  
  const pendingConsultations = consultations.filter(
    consultation => consultation.status === 'pending'
  );

  const submitConsultationRequest = (date: Date) => {
    setIsLoading(true);
    
    // Format tanggal dalam format YYYY-MM-DD tetapi menggunakan zona waktu lokal
    // untuk memastikan tanggal yang dipilih user tidak berubah
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${year}-${month}-${day}`;
    
    // Submit the request to the server
    router.post('/consultations', {
      consultation_date: formattedDate,
    }, {
      onSuccess: () => {
        // Redirect user to dashboard after submission with "Menunggu respon dari admin" status
        router.visit('/dashboard');
      },
      onError: () => {
        // Handle errors
        alert('Terjadi kesalahan saat mengirim permintaan konsultasi. Silakan coba lagi.');
      },
      onFinish: () => {
        setIsLoading(false);
      }
    });
  };

  const approveConsultation = (id: number) => {
    setIsLoading(true);
    
    // Immediately update the local state to change the consultation status
    // This gives immediate feedback to the admin without waiting for page refresh
    setConsultations(prevConsultations => {
      // Find the consultation to update
      const updatedConsultations = prevConsultations.map(consultation => {
        if (consultation.id === id) {
          // Update the status to approved
          return {
            ...consultation,
            status: 'approved' as 'approved' // Type assertion to match the union type
          };
        }
        return consultation;
      });
      return updatedConsultations;
    });
    
    // Call the API to approve the consultation in the backend
    router.post(`/admin/consultations/${id}/approve`, {}, {
      // Use preserveState and preserveScroll to prevent full page reload
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        // Success is already handled by local state update above
      },
      onError: () => {
        // Revert the local state change since the API call failed
        setConsultations(prevConsultations => {
          return prevConsultations.map(consultation => {
            if (consultation.id === id) {
              return {
                ...consultation,
                status: 'pending' as 'pending'
              };
            }
            return consultation;
          });
        });
        
        alert('Terjadi kesalahan saat menyetujui konsultasi');
      },
      onFinish: () => {
        setIsLoading(false);
      }
    });
  };

  const rejectConsultation = (id: number, reason: string) => {
    setIsLoading(true);
    
    // Immediately update the local state to remove the consultation from the pending list
    // This gives immediate feedback to the admin without waiting for page refresh
    setConsultations(prevConsultations => {
      // Find the consultation to update
      const updatedConsultations = prevConsultations.map(consultation => {
        if (consultation.id === id) {
          // Update the status and add rejection reason
          return {
            ...consultation,
            status: 'rejected' as 'rejected', // Type assertion to match the union type
            rejection_reason: reason
          };
        }
        return consultation;
      });
      return updatedConsultations;
    });
    
    // Call the API to reject the consultation in the backend
    router.post(`/admin/consultations/${id}/reject`, {
      rejection_reason: reason
    }, {
      // Use preserveState and preserveScroll to prevent full page reload
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        // Success is already handled by local state update above
        // We won't refresh the page, so state persists
      },
      onError: (errors) => {
        console.error('Rejection error:', errors);
        let errorMessage = 'Terjadi kesalahan saat menolak konsultasi';
        
        // Check if we have validation errors
        if (errors.rejection_reason) {
          errorMessage = `Error: ${errors.rejection_reason}`;
        }
        
        // Revert the local state change since the API call failed
        setConsultations(prevConsultations => {
          return prevConsultations.map(consultation => {
            if (consultation.id === id) {
              return {
                ...consultation,
                status: 'pending' as 'pending',
                rejection_reason: undefined
              };
            }
            return consultation;
          });
        });
        
        alert(errorMessage);
      },
      onFinish: () => {
        setIsLoading(false);
      }
    });
  };

  const getConsultationById = (id: number) => {
    return consultations.find(consultation => consultation.id === id);
  };

  const value: ConsultationContextType = {
    isLoading,
    userConsultations,
    pendingConsultations,
    submitConsultationRequest,
    approveConsultation,
    rejectConsultation,
    getConsultationById,
  };

  return (
    <ConsultationContext.Provider value={value}>
      {children}
    </ConsultationContext.Provider>
  );
};

export default ConsultationContext;
