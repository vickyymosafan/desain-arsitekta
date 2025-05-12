import React from 'react';
import { motion } from 'framer-motion';
import { 
    animationVariants, 
    createAnimationProps, 
    containerVariants, 
    itemVariants 
} from '@/utils';
import ContactForm from './ContactForm';
import ContactInfo from './ContactInfo';

const ContactSection: React.FC = () => {
    return (
        <div className="w-full min-h-screen py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-900 to-black">
            {/* Section Header */}
            <motion.div 
                className="text-center mb-16 max-w-3xl mx-auto"
                {...createAnimationProps('fadeIn', 0.2)}
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-white mb-4">
                    Hubungi Kami
                </h2>
                <p className="text-gray-300 text-lg">
                    Diskusikan kebutuhan proyek Anda atau ajukan pertanyaan kepada tim kami.
                </p>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    {/* Contact Info - 5 columns on large screens */}
                    <motion.div 
                        className="lg:col-span-5 order-2 lg:order-1"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <ContactInfo />
                    </motion.div>
                    
                    {/* Contact Form - 7 columns on large screens */}
                    <motion.div 
                        className="lg:col-span-7 order-1 lg:order-2"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl overflow-hidden border border-emerald-800/30 p-6 md:p-8">
                            <h3 className="text-2xl font-bold text-white mb-6 font-nunito">Kirim Pesan</h3>
                            <ContactForm />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Map Section */}
            <motion.div 
                className="mt-16"
                {...createAnimationProps('fadeIn', 0.6)}
            >
                <div className="w-full h-96 rounded-xl overflow-hidden border border-emerald-800/30 relative">
                    {/* Placeholder for map - in a real implementation, this would be integrated with a mapping service */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-emerald-900/30 flex items-center justify-center">
                        <div className="text-center p-8">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mb-4 text-emerald-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <h4 className="text-xl font-bold text-white mb-2">Kantor Arsitekta</h4>
                            <p className="text-gray-300">Jl. Emerald Architect No. 123, Jakarta Selatan, Indonesia</p>
                            <button className="mt-4 px-4 py-2 bg-emerald-600 text-white rounded-md hover:bg-emerald-700 transition-colors duration-300">
                                Lihat di Google Maps
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ContactSection;
