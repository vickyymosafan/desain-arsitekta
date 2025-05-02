import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence, useInView } from 'framer-motion';
import { ServicesSectionProps } from './types';
import ServiceCard from './ServiceCard';
import { SERVICES } from './services';
import { getAnimationVariant, sharedAnimations, commonStyles } from './animationUtils';

// Decorative components for better organization
const DecorationGradients = () => (
  <>
    <motion.div 
      className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-emerald-300/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
      animate={{...sharedAnimations.floating, scale: [1, 1.1, 1]}}
    />
    
    <motion.div 
      className="absolute top-1/3 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-200/20 to-blue-300/10 rounded-full blur-3xl translate-x-1/2"
      animate={{...sharedAnimations.floating, scale: [1, 0.9, 1]}}
      transition={{ delay: 1, duration: 7 }}
    />
    
    <motion.div 
      className="absolute bottom-0 right-10 w-80 h-80 bg-gradient-to-tr from-emerald-300/15 to-emerald-100/10 rounded-full blur-3xl translate-y-1/4"
      animate={{...sharedAnimations.floating, scale: [1, 1.05, 1]}}
      transition={{ delay: 2, duration: 5 }}
    />
  </>
);

const DecorativeSVG = () => (
  <motion.svg 
    className="absolute top-10 right-10 w-32 h-32 text-emerald-700/10 -z-10 hidden lg:block" 
    viewBox="0 0 100 100"
    animate={sharedAnimations.spin}
  >
    <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="none" stroke="currentColor" strokeWidth="1" />
    <polygon points="50,10 90,35 90,65 50,90 10,65 10,35" fill="none" stroke="currentColor" strokeWidth="1" />
  </motion.svg>
);

// SectionTitle component
const SectionTitle: React.FC<{
  title: string;
  subtitle: string;
  description: string;
  controls: any;
}> = ({ title, subtitle, description, controls }) => (
  <motion.div 
    className="text-center mb-16 md:mb-24 w-full max-w-4xl mx-auto"
    initial="hidden"
    animate={controls}
    variants={sharedAnimations.slideUp}
  >
    <motion.div 
      className="inline-block mb-4"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.span 
        className="text-xs md:text-sm uppercase tracking-widest text-emerald-700 font-bold bg-emerald-50/80 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200/50 shadow-sm"
        animate={sharedAnimations.glow}
      >
        {subtitle}
      </motion.span>
    </motion.div>
    
    <motion.h2 
      className="text-4xl md:text-5xl lg:text-6xl font-bold font-playfair mb-8 drop-shadow-sm relative inline-block"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
    >
      <span className="relative inline-block" style={commonStyles.gradientText}>
        {title}
        <motion.span 
          className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-600 to-emerald-400"
          initial={{ scaleX: 0, originX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
        />
      </span>
    </motion.h2>
    
    <motion.p 
      className="text-gray-700 max-w-3xl mx-auto text-lg md:text-xl leading-relaxed"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 1 }}
    >
      {description}
    </motion.p>
  </motion.div>
);

// CTA button component
const CTAButton: React.FC<{
  text: string;
  link: string;
  controls: any;
}> = ({ text, link, controls }) => (
  <motion.div
    className="text-center mt-16 md:mt-24"
    initial="hidden"
    animate={controls}
    variants={sharedAnimations.slideUp}
    transition={{ delay: 0.8 }}
  >
    <motion.a
      href={link}
      className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-emerald-500 text-white font-medium rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 group relative overflow-hidden"
      whileHover={{ scale: 1.05, boxShadow: '0 10px 25px -5px rgba(16, 185, 129, 0.5)' }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Background glow effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-emerald-400 to-emerald-300 opacity-0 blur-lg transition-all duration-300 group-hover:opacity-70"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: 'mirror'
        }}
      />
      
      {/* Button text and content */}
      <span className="relative text-lg mr-2">{text}</span>
      <motion.span
        className="relative"
        animate={{ x: [0, 5, 0] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: 'mirror' }}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
      </motion.span>
    </motion.a>
  </motion.div>
);

/**
 * ServicesSection component displays a grid of services offered by Arsitekta
 * Enhanced with modern UI, animations, and 3D effects
 */
const ServicesSection: React.FC<ServicesSectionProps> = ({
  title = 'Layanan Kami',
  subtitle = 'Layanan Premium',
  description = 'Arsitekta menyediakan layanan komprehensif untuk kebutuhan desain dan konstruksi bangunan Anda dengan pendekatan modern dan inovatif.',
  ctaText = 'Konsultasi Gratis',
  ctaLink = '#contact'
}) => {
  // Animation controls initialization
  const controls = useAnimation();
  
  // Refs for element visibility detection
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });
  
  // Tab selection state for filtering services
  const [selectedTab, setSelectedTab] = useState<string>('all');
  
  // Filtered services based on selected tab
  const filteredServices = selectedTab === 'all' 
    ? SERVICES 
    : SERVICES.filter(service => service.category === selectedTab);
  
  // Start animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [controls, isInView]);
  
  // Filter categories from all services
  const serviceCategories = ['all', ...new Set(SERVICES.map(service => service.category))];
  
  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-20 md:py-32 px-4 overflow-hidden"
      style={commonStyles.sectionBackground}
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={commonStyles.meshGrid} />
      <DecorationGradients />
      <DecorativeSVG />
      
      <div className="container mx-auto relative z-10">
        {/* Section header */}
        <SectionTitle 
          title={title}
          subtitle={subtitle}
          description={description}
          controls={controls}
        />
        
        {/* Service category filter tabs */}
        <motion.div 
          className="flex flex-wrap justify-center gap-3 mb-16"
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { 
                duration: 0.5,
                delay: 0.6
              }
            }
          }}
        >
          {serviceCategories.map((category, index) => (
            <motion.button
              key={category}
              onClick={() => setSelectedTab(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
                ${selectedTab === category 
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/20' 
                  : 'bg-white/80 text-gray-600 hover:bg-emerald-50 hover:text-emerald-700'
                }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: { 
                  delay: 0.7 + (index * 0.1)
                }
              }}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
              
              {selectedTab === category && (
                <motion.span 
                  className="absolute inset-0 rounded-full bg-emerald-600"
                  layoutId="activeCategory"
                  initial={false}
                  transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  style={{ opacity: 0.15 }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>
        
        {/* Services grid with cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10"
          initial="hidden"
          animate={controls}
          variants={sharedAnimations.section}
        >
          <AnimatePresence mode="wait">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                variants={sharedAnimations.card}
                custom={index}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5 }}
              >
                <ServiceCard
                  title={service.title}
                  description={service.description}
                  icon={service.icon}
                  index={index}
                  animation="zoom"
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
        
        {/* CTA button */}
        <CTAButton 
          text={ctaText} 
          link={ctaLink}
          controls={controls}
        />
      </div>
    </section>
  );
};

export default ServicesSection;
