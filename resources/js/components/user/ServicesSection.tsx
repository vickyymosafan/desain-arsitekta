import React, { useState, useEffect } from 'react';
import ServiceCard from './ServiceCard';
import { SERVICES } from '../../constants/services';

/**
 * ServicesSection component displays a grid of services offered by Arsitekta
 * Enhanced with modern UI, animations, and responsive design
 */
const ServicesSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  // Animation effect when scrolling to this section
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const section = document.getElementById('services');
    if (section) observer.observe(section);

    return () => {
      if (section) observer.unobserve(section);
    };
  }, []);

  // Staggered animation for services cards
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        setActiveIndex(0);
      }, 100);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  useEffect(() => {
    if (activeIndex >= 0 && activeIndex < SERVICES.length - 1) {
      const timer = setTimeout(() => {
        setActiveIndex(activeIndex + 1);
      }, 200);
      
      return () => clearTimeout(timer);
    }
  }, [activeIndex]);

  return (
    <section 
      className="py-20 relative overflow-hidden" 
      id="services"
      style={{
        background: 'linear-gradient(180deg, #f0fdf4 0%, #e6f7ec 100%)',
      }}
    >
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-300/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-emerald-200/30 rounded-full blur-3xl translate-x-1/4 translate-y-1/4"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          className={`text-center mb-16 transition-all duration-1000 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <div className="inline-block mb-3">
            <span className="text-xs uppercase tracking-wider text-emerald-700 font-bold bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
              Layanan Premium
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-playfair mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-900 to-emerald-600">
            Layanan Kami
          </h2>
          <p className="text-gray-700 max-w-2xl mx-auto text-lg">
            Arsitekta menyediakan layanan komprehensif untuk kebutuhan desain dan konstruksi 
            bangunan Anda dengan pendekatan modern dan inovatif.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {SERVICES.map((service, index) => (
            <div 
              key={index}
              className={`transition-all duration-700 transform ${
                activeIndex >= index 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-16'
              }`}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
              />
            </div>
          ))}
        </div>
        
        {/* Additional CTA section */}
        <div 
          className={`mt-16 text-center transition-all duration-1000 delay-500 transform ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <a 
            href="#contact" 
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-emerald-700 to-emerald-500 text-white font-medium rounded-full hover:shadow-lg hover:shadow-emerald-300/50 transition-all duration-300 transform hover:-translate-y-1"
          >
            Konsultasi Gratis
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;