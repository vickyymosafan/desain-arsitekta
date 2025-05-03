import React from 'react';
import ServiceCard from './ServiceCard';
import { servicesData } from './data';
import SectionHeader from '@/components/user/services/SectionHeader';
import LazyComponent from '@/components/ui/lazy-component';

// Placeholder for loading state
const ServiceCardPlaceholder = () => (
  <div className="flex flex-col h-full bg-white/40 rounded-xl shadow-sm overflow-hidden animate-pulse">
    <div className="p-6 flex-1 flex flex-col">
      <div className="w-16 h-16 mb-4 bg-emerald-100/40 rounded-lg"></div>
      <div className="h-7 bg-gray-200/70 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-200/70 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200/70 rounded w-5/6 mb-4"></div>
      <div className="space-y-2 mb-4">
        <div className="flex items-start">
          <div className="h-5 w-5 bg-emerald-100/40 rounded-full mr-2"></div>
          <div className="h-4 bg-gray-200/70 rounded w-3/4"></div>
        </div>
        <div className="flex items-start">
          <div className="h-5 w-5 bg-emerald-100/40 rounded-full mr-2"></div>
          <div className="h-4 bg-gray-200/70 rounded w-2/3"></div>
        </div>
      </div>
    </div>
    <div className="px-6 pb-6 pt-2 border-t border-gray-100/30">
      <div className="h-5 bg-emerald-100/40 rounded w-1/3"></div>
    </div>
  </div>
);

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="section-fullscreen bg-gray-50">
      <div className="container mx-auto px-4 py-12 flex flex-col justify-center flex-1">
        <SectionHeader 
          title="Layanan Kami"
          description="Arsitekta menyediakan layanan lengkap dari desain hingga konstruksi bangunan dengan kualitas premium dan nilai estetika tinggi."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map((service) => (
            <LazyComponent 
              key={service.id}
              threshold={0.1}
              rootMargin="300px"
              className="h-full"
              placeholder={<ServiceCardPlaceholder />}
            >
              <ServiceCard service={service} />
            </LazyComponent>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
