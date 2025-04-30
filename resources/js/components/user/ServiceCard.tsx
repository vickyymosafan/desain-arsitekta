import React, { useState } from 'react';
import { ServiceData } from '../../constants/services';

/**
 * ServiceCard component displays an individual service with icon, title and description
 * Enhanced with modern Gen-Z styling, 3D effects, and animations
 */
const ServiceCard: React.FC<ServiceData> = ({ title, description, icon }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <div 
      className={`relative overflow-hidden backdrop-blur-sm bg-white/90 rounded-xl
        ${isHovered ? 'shadow-2xl shadow-emerald-200/50' : 'shadow-lg'}
        p-8 transition-all duration-500 transform
        ${isHovered ? 'scale-105 -translate-y-2' : ''}
        border border-emerald-100/50 group`}
      style={{
        perspective: '1000px',
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Floating background gradient */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-emerald-50 to-teal-50/50 rounded-xl
          transition-all duration-500 opacity-80 z-0
          ${isHovered ? 'scale-110' : 'scale-100'}`}
      ></div>
      
      {/* Decorative elements */}
      <div className="absolute -top-4 -right-4 w-24 h-24 bg-emerald-400/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-teal-300/10 rounded-full blur-xl"></div>
      
      {/* Icon with enhanced styling */}
      <div 
        className={`relative text-5xl mb-6 transition-all duration-500 transform
          ${isHovered ? 'scale-110 text-emerald-500' : 'text-emerald-600'}`}
      >
        <i className={`fa ${icon}`}></i>
        <div className="absolute inset-0 blur-md opacity-30 text-emerald-400 scale-110">  
          <i className={`fa ${icon}`}></i>
        </div>
      </div>
      
      {/* Content with enhanced typography */}
      <h3 className="relative text-2xl font-bold mb-4 font-playfair bg-clip-text text-transparent bg-gradient-to-r from-emerald-700 to-emerald-900">
        {title}
      </h3>
      <p className="relative text-gray-600 leading-relaxed">{description}</p>
      
      {/* Hover effect button */}
      <div className={`relative mt-6 overflow-hidden transition-all duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="inline-flex items-center text-emerald-600 font-semibold group-hover:underline">
          Pelajari Lebih Lanjut
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;