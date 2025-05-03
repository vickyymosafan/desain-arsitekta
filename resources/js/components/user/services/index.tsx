import React, { useState } from 'react';
import ServiceCard from './ServiceCard';
import { servicesData } from './data';
import SectionHeader from '@/components/user/services/SectionHeader';
import LazyComponent from '@/components/ui/lazy-component';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

// Modern placeholder with shimmer effect
const ServiceCardPlaceholder = () => (
  <div className="flex flex-col h-full backdrop-blur-sm bg-white/70 dark:bg-gray-800/20 rounded-2xl border border-gray-100/50 dark:border-gray-700/50 overflow-hidden relative">
    {/* Shimmer effect overlay */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="shimmer-effect animate-shimmer absolute -inset-10 opacity-40"></div>
    </div>
    
    <div className="p-6 flex-1 flex flex-col relative z-10">
      <div className="relative mb-6">
        <div className="w-16 h-16 bg-emerald-100/30 dark:bg-emerald-900/20 rounded-2xl"></div>
      </div>
      <div className="h-7 bg-gray-200/70 dark:bg-gray-700/30 rounded-lg w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-200/70 dark:bg-gray-700/30 rounded-lg w-full mb-2"></div>
      <div className="h-4 bg-gray-200/70 dark:bg-gray-700/30 rounded-lg w-5/6 mb-6"></div>
      <div className="space-y-3 mb-4">
        <div className="flex items-start">
          <div className="h-4 w-4 bg-emerald-100/40 dark:bg-emerald-900/20 rounded-full mr-2 flex-shrink-0"></div>
          <div className="h-4 bg-gray-200/70 dark:bg-gray-700/30 rounded-lg w-3/4"></div>
        </div>
        <div className="flex items-start">
          <div className="h-4 w-4 bg-emerald-100/40 dark:bg-emerald-900/20 rounded-full mr-2 flex-shrink-0"></div>
          <div className="h-4 bg-gray-200/70 dark:bg-gray-700/30 rounded-lg w-2/3"></div>
        </div>
      </div>
    </div>
    <div className="px-6 pb-6 pt-2 border-t border-gray-100/30 dark:border-gray-700/30">
      <div className="h-5 bg-emerald-100/40 dark:bg-emerald-900/20 rounded-lg w-1/3"></div>
    </div>
  </div>
);

const ServicesSection: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);

  // Container variants for staggered children animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  return (
    <section 
      id="services" 
      className="section-fullscreen relative overflow-hidden bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-100/30 dark:bg-emerald-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-white/80 to-transparent dark:from-gray-800/80 pointer-events-none"></div>
        
        {/* Floating dot pattern */}
        <div className="absolute inset-0 opacity-20">
          <div className="h-full w-full" style={{ backgroundImage: 'radial-gradient(circle, rgba(0,128,128,0.15) 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>
        </div>
      </div>

      <div 
        className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl h-full flex flex-col justify-center py-12"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative">
          {/* Animated sparkle icon */}
          <motion.div 
            className="absolute -top-12 left-1/2 -translate-x-1/2 text-emerald-400 dark:text-emerald-300 opacity-75 hidden sm:block"
            animate={{ 
              y: isHovered ? [0, -10, 0] : 0,
              rotate: isHovered ? [0, 5, -5, 0] : 0,
              scale: isHovered ? [1, 1.1, 1] : 1
            }}
            transition={{ duration: 1.5, repeat: isHovered ? Infinity : 0, repeatType: 'loop' }}
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>
          
          <SectionHeader 
            title="Layanan Kami"
            description="Arsitekta menyediakan layanan lengkap dari desain hingga konstruksi bangunan dengan kualitas premium dan nilai estetika tinggi."
          />
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 xl:gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
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
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesSection;
