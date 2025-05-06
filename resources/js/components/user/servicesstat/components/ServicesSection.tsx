import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { serviceContainerVariants, serviceItemVariants } from '../animations/variants';
import { servicesData, ServiceCardData } from '../data/servicesStatData';

/**
 * IntroText Component - Displays the services section introductory text with animation
 */
const IntroText: React.FC = () => (
  <motion.p 
    className="text-neutral-300 max-w-3xl mx-auto font-nunito text-lg mb-16 text-center"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2, duration: 0.6 }}
  >
    Kami menyediakan berbagai layanan profesional untuk mewujudkan ruang impian 
    Anda dengan kualitas terbaik dan hasil yang memuaskan
  </motion.p>
);

/**
 * ServiceGrid Component - Renders a responsive grid of service cards
 * 
 * @param services - Array of service data objects to display
 */
const ServiceGrid: React.FC<{ services: ServiceCardData[] }> = ({ services }) => (
  <motion.div 
    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10 px-4"
    initial="hidden"
    animate="visible"
    variants={serviceContainerVariants}
    aria-label="Daftar layanan kami"
  >
    {services.map((service, index) => (
      <ServiceItem 
        key={index}
        service={service}
        index={index}
      />
    ))}
  </motion.div>
);

/**
 * ServiceItem Component - Wraps individual service cards with animations
 * 
 * @param service - Service data object to display
 * @param index - Order index for staggered animations
 */
const ServiceItem: React.FC<{ 
  service: ServiceCardData;
  index: number;
}> = ({ service, index }) => (
  <motion.div 
    variants={serviceItemVariants}
    className="flex justify-center"
  >
    <div className="w-full max-w-xs">
      <ServiceCard
        icon={service.icon}
        title={service.title}
        description={service.description}
        index={index}
      />
    </div>
  </motion.div>
);

/**
 * ServicesFullscreenContent Component
 * 
 * Renders a full section of service offerings with animated introduction
 * and responsive grid of service cards.
 */
const ServicesFullscreenContent: React.FC = () => (
  <section className="w-full max-w-6xl mx-auto">
    <IntroText />
    <ServiceGrid services={servicesData} />
  </section>
);

export default ServicesFullscreenContent;
