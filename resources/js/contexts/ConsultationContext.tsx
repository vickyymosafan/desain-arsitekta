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
    
    // Format tanggal dalam format YYYY-MM-DD untuk dikirim ke server
    const formattedDate = date.toISOString().split('T')[0];
    
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
    
    // Call the API to approve the consultation
    router.post(`/admin/consultations/${id}/approve`, {}, {
      onSuccess: () => {
        // Update will happen through the page refresh
      },
      onError: () => {
        alert('Terjadi kesalahan saat menyetujui konsultasi');
      },
      onFinish: () => {
        setIsLoading(false);
      }
    });
  };

  const rejectConsultation = (id: number, reason: string) => {
    setIsLoading(true);
    
    // Call the API to reject the consultation
    router.post(`/admin/consultations/${id}/reject`, {
      rejection_reason: reason
    }, {
      onSuccess: () => {
        // Update will happen through the page refresh
      },
      onError: (errors) => {
        console.error('Rejection error:', errors);
        let errorMessage = 'Terjadi kesalahan saat menolak konsultasi';
        
        // Check if we have validation errors
        if (errors.rejection_reason) {
          errorMessage = `Error: ${errors.rejection_reason}`;
        }
        
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
