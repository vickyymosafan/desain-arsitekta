import React from 'react';
import ServiceCard from './ServiceCard';
import { servicesData } from './data';
import SectionHeader from '@/components/user/common/SectionHeader';

const ServicesSection: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <SectionHeader 
          title="Layanan Kami"
          description="Arsitekta menyediakan layanan lengkap dari desain hingga konstruksi bangunan dengan kualitas premium dan nilai estetika tinggi."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {servicesData.map(service => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
