import React from 'react';
import { ServiceData } from '../../constants/services';

/**
 * ServiceCard component displays an individual service with icon, title and description
 */
const ServiceCard: React.FC<ServiceData> = ({ title, description, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
      <div className="text-emerald-600 text-4xl mb-4">
        <i className={`fa ${icon}`}></i>
      </div>
      <h3 className="text-xl font-bold mb-3 font-playfair">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ServiceCard;
