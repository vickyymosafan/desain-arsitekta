import React from 'react';
import ServiceCard from './ServiceCard';
import { SERVICES } from '../../constants/services';

/**
 * ServicesSection component displays a grid of services offered by Arsitekta
 * It uses the ServiceCard component to render each service
 * and imports service data from constants
 */
const ServicesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50" id="services">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-playfair mb-4">Layanan Kami</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Arsitekta menyediakan layanan komprehensif untuk kebutuhan desain dan konstruksi bangunan Anda.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <ServiceCard
              key={index}
              title={service.title}
              description={service.description}
              icon={service.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
