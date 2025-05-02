import React from 'react';
import { Service } from './types';

interface FeatureItemProps {
  text: string;
}

const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
  <li className="flex items-start">
    <span className="text-emerald-500 mr-2 mt-1">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
      </svg>
    </span>
    <span className="text-sm text-gray-600">{text}</span>
  </li>
);

interface ServiceIconProps {
  icon: string;
}

const ServiceIcon: React.FC<ServiceIconProps> = ({ icon }) => (
  <div className="w-16 h-16 mb-4 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 transform group-hover:scale-110">
    <i className={`${icon} text-2xl`}></i>
  </div>
);

interface ServiceCardProps {
  service: Service;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  return (
    <div className="flex flex-col h-full bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group transform hover:-translate-y-1">
      <div className="p-6 flex-1 flex flex-col">
        <ServiceIcon icon={service.icon} />
        
        <h3 className="text-xl font-playfair font-bold mb-3 text-gray-800 group-hover:text-emerald-600 transition-colors duration-300">
          {service.title}
        </h3>
        
        <p className="text-gray-600 mb-4 flex-grow">{service.description}</p>
        
        <ul className="space-y-2 mb-4">
          {service.features.map((feature, index) => (
            <FeatureItem key={index} text={feature} />
          ))}
        </ul>
      </div>
      
      <div className="px-6 pb-6 pt-2 border-t border-gray-100">
        <a 
          href="#" 
          className="inline-flex items-center text-emerald-600 hover:text-emerald-700 font-medium group-hover:translate-x-1 transition-transform duration-300"
        >
          Pelajari Lebih Lanjut
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:ml-2 transition-all duration-300" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ServiceCard;
