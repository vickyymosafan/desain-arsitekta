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
    
    // Create a new consultation request
    const newConsultation: Consultation = {
      consultation_date: date,
      status: 'pending',
      created_at: new Date().toISOString(),
    };
    
    // Add it to our local state immediately for UI feedback
    setConsultations([newConsultation, ...consultations]);
    
    // Using Inertia router to submit the request to the server
    router.post('/consultations', {
      consultation_date: date,
    }, {
      preserveState: true,
      onSuccess: () => {
        setIsLoading(false);
        // Redirect user to dashboard after submission
        router.visit('/dashboard', {
          preserveScroll: true,
          onSuccess: () => {
            // Display a notification that could be shown on the dashboard
            console.log('Consultation request submitted successfully');
          }
        });
      },
      onError: () => {
        // Revert the local state change on error
        setConsultations(consultations.filter(c => c !== newConsultation));
        setIsLoading(false);
      }
    });
  };

  const approveConsultation = (id: number) => {
    setIsLoading(true);
    
    router.put(`/consultations/${id}/approve`, {}, {
      onSuccess: () => {
        setIsLoading(false);
        // Refresh consultations after approval
        router.reload();
      },
      onError: () => {
        setIsLoading(false);
      }
    });
  };

  const rejectConsultation = (id: number, reason: string) => {
    setIsLoading(true);
    
    router.put(`/consultations/${id}/reject`, {
      rejection_reason: reason
    }, {
      onSuccess: () => {
        setIsLoading(false);
        // Refresh consultations after rejection
        router.reload();
      },
      onError: () => {
        setIsLoading(false);
      }
    });
  };

  const getConsultationById = (id: number) => {
    return consultations.find(consultation => consultation.id === id);
  };

  return (
    <ConsultationContext.Provider value={{
      isLoading,
      userConsultations,
      pendingConsultations,
      submitConsultationRequest,
      approveConsultation,
      rejectConsultation,
      getConsultationById
    }}>
      {children}
    </ConsultationContext.Provider>
  );
};

export default ConsultationContext;
