import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation, AnimatePresence, useInView } from 'framer-motion';
import { ServicesSectionProps } from './types';
import ServiceCard from './ServiceCard';
import { SERVICES } from '../../../constants/services';
import { getAnimationVariant } from './animationUtils';

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
  // References and animation hooks for scroll-based animations
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const isTitleInView = useInView(titleRef, { once: true, amount: 0.5 });
  const isCtaInView = useInView(ctaRef, { once: true, amount: 0.5 });
  
  const controls = useAnimation();
  const titleControls = useAnimation();
  const ctaControls = useAnimation();
  
  // Mouse position state for 3D hover effects
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  
  // Handle mouse movement for 3D effects
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({
      x: e.clientX,
      y: e.clientY
    });
  };
  
  // Trigger animations when section comes into view
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    } else {
      controls.start('hidden');
    }
  }, [isInView, controls]);
  
  useEffect(() => {
    if (isTitleInView) {
      titleControls.start('visible');
    }
  }, [isTitleInView, titleControls]);
  
  useEffect(() => {
    if (isCtaInView) {
      ctaControls.start('visible');
    }
  }, [isCtaInView, ctaControls]);

  // Using imported animation variants from animationUtils
  const fadeInVariant = getAnimationVariant('fadeIn');
  const slideUpVariant = getAnimationVariant('slideUp');
  
  // Animation variants for framer-motion
  const sectionVariants = {
    hidden: fadeInVariant.initial,
    visible: {
      ...fadeInVariant.animate,
      transition: {
        ...fadeInVariant.transition,
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { ...slideUpVariant.initial, y: 30 },
    visible: {
      ...slideUpVariant.animate,
      transition: {
        ...slideUpVariant.transition,
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: (i: number) => {
      const variant = getAnimationVariant('slideUp', i * 0.1);
      return {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: variant.transition
      };
    }
  };

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      repeatType: 'mirror' as const,
      ease: 'easeInOut'
    }
  };

  const glowAnimation = {
    boxShadow: [
      '0 0 20px 0px rgba(16, 185, 129, 0.1)',
      '0 0 30px 5px rgba(16, 185, 129, 0.2)',
      '0 0 20px 0px rgba(16, 185, 129, 0.1)'
    ],
    transition: {
      duration: 3,
      repeat: Infinity,
      repeatType: 'mirror' as const
    }
  };

  const spinSlow = {
    rotate: 360,
    transition: {
      duration: 50,
      repeat: Infinity,
      ease: 'linear'
    }
  };

  return (
    <motion.section 
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center relative overflow-hidden py-16 sm:py-24" 
      id="services"
      onMouseMove={handleMouseMove}
      initial="hidden"
      animate={controls}
      variants={sectionVariants}
      style={{
        background: 'linear-gradient(180deg, #f0fdf4 0%, #e6f7ec 100%)',
        scrollSnapAlign: 'start',
        scrollMarginTop: '0px'
      }}
    >
      {/* Modern decorative elements with animated effects */}
      <motion.div 
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-emerald-400/20 to-emerald-300/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        animate={{...floatingAnimation, scale: [1, 1.1, 1]}}
      />
      
      <motion.div 
        className="absolute top-1/3 right-0 w-64 h-64 bg-gradient-to-bl from-emerald-200/20 to-blue-300/10 rounded-full blur-3xl translate-x-1/2"
        animate={{...floatingAnimation, scale: [1, 0.9, 1]}}
        transition={{ delay: 1, duration: 7 }}
      />
      
      <motion.div 
        className="absolute bottom-0 right-10 w-80 h-80 bg-gradient-to-tr from-emerald-300/15 to-emerald-100/10 rounded-full blur-3xl translate-y-1/4"
        animate={{...floatingAnimation, scale: [1, 1.05, 1]}}
        transition={{ delay: 2, duration: 5 }}
      />
      
      {/* 3D mesh grid for depth - modern web design trend */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(var(--emerald-800) 1px, transparent 1px), linear-gradient(to right, var(--emerald-800) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        '--emerald-800': '#065f46'
      } as React.CSSProperties} />
      
      {/* Decorative polylines - modern design trend */}
      <motion.svg 
        className="absolute top-10 right-10 w-32 h-32 text-emerald-700/10 -z-10 hidden lg:block" 
        viewBox="0 0 100 100"
        animate={spinSlow}
      >
        <polygon points="50,0 100,25 100,75 50,100 0,75 0,25" fill="none" stroke="currentColor" strokeWidth="1" />
        <polygon points="50,10 90,35 90,65 50,90 10,65 10,35" fill="none" stroke="currentColor" strokeWidth="1" />
      </motion.svg>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center">
        <motion.div 
          ref={titleRef}
          className="text-center mb-16 md:mb-24 w-full max-w-4xl mx-auto"
          initial="hidden"
          animate={titleControls}
          variants={titleVariants}
        >
          <motion.div 
            className="inline-block mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.span 
              className="text-xs md:text-sm uppercase tracking-widest text-emerald-700 font-bold bg-emerald-50/80 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-200/50 shadow-sm"
              animate={glowAnimation}
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
            <span className="relative inline-block" style={{
              background: 'linear-gradient(to right, #064e3b, #059669, #10b981)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundSize: '200% 100%',
              animation: 'gradient-shift 8s ease infinite'
            }}>
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
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 xl:gap-12 w-full"
          variants={sectionVariants}
          initial="hidden"
          animate={controls}
        >
          {SERVICES.map((service, index) => (
            <motion.div
              key={index}
              id={`service-card-${index}`}
              custom={index}
              variants={cardVariants}
              whileHover={{ y: -10, transition: { type: 'spring', stiffness: 300 } }}
              onHoverStart={() => setHoveredService(index)}
              onHoverEnd={() => setHoveredService(null)}
              className="relative flex"
            >
              {/* Subtle highlight glow on hover */}
              <AnimatePresence>
                {hoveredService === index && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl bg-emerald-400/5 -z-10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1.05 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>
              
              <ServiceCard
                title={service.title}
                description={service.description}
                icon={service.icon}
                index={index}
                animation="zoom"
              />
            </motion.div>
          ))}
        </motion.div>
        
        {/* Enhanced CTA section */}
        <motion.div 
          ref={ctaRef}
          className="mt-20 text-center w-full max-w-2xl mx-auto"
          initial="hidden"
          animate={ctaControls}
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
          }}
        >
          <motion.div 
            className="inline-block"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.a 
              href={ctaLink} 
              className="group relative overflow-hidden inline-flex items-center px-8 py-4 bg-gradient-to-r from-emerald-700 via-emerald-600 to-emerald-500 text-white font-medium text-lg rounded-xl shadow-lg hover:shadow-emerald-500/30 transition-all duration-300"
              whileHover={{
                boxShadow: '0 20px 25px -5px rgba(16, 185, 129, 0.25)'
              }}
            >
              {/* Background animation on hover */}
              <motion.span 
                className="absolute inset-0 w-full h-full bg-gradient-to-r from-emerald-600/0 via-emerald-500/30 to-emerald-600/0" 
                initial={{ x: '-100%' }}
                whileHover={{ x: '100%' }}
                transition={{ duration: 1, ease: 'easeInOut' }}
              />
              
              <span className="mr-3 relative z-10">{ctaText}</span>
              <span className="relative z-10 w-6 h-6 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </span>
            </motion.a>
          </motion.div>
          
          {/* Modern badge below CTA */}
          <motion.div 
            className="mt-6 inline-flex items-center justify-center space-x-1 text-xs text-emerald-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>100% kepuasan klien</span>
          </motion.div>
        </motion.div>
      </div>

      {/* CSS animations */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />

    </motion.section>
  );
};

export default ServicesSection;
