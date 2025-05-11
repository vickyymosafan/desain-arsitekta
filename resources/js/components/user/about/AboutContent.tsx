import React from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';
import { transitions, itemVariants } from '../../../utils/animations';

interface AboutContentProps {
    isVisible: boolean;
}

/**
 * AboutContent Component
 * 
 * Displays the main content of the about section, including 
 * experience badge, description text, and animated elements.
 */
const AboutContent: React.FC<AboutContentProps> = ({ isVisible }) => {
    // Experience badge animation
    const experienceBadge = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { 
            scale: 1, 
            opacity: 1, 
            transition: { 
                delay: 0.5, 
                type: 'spring', 
                stiffness: 100 
            } 
        }
    };
    
    // Floating animation for background elements
    const floatingAnimation = {
        y: [0, -15, 0],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut'
        }
    };
    
    return (
        <div className="relative">
            {/* Experience badge */}
            <motion.div 
                className="absolute -top-4 -right-4 md:top-0 md:right-0 z-10 bg-emerald-500 text-white rounded-full px-4 py-2 shadow-lg flex items-center"
                variants={experienceBadge}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
            >
                <span className="text-xl font-bold mr-1">10+</span>
                <span className="text-sm">Tahun Pengalaman</span>
            </motion.div>
            
            {/* Background decoration */}
            <motion.div 
                className="absolute right-0 bottom-0 w-40 h-40 bg-emerald-100 rounded-full opacity-20 -z-10"
                animate={floatingAnimation}
            />
            
            {/* Content area */}
            <motion.div 
                className="bg-white dark:bg-gray-800 rounded-xl p-6 md:p-8 shadow-lg relative z-0"
                variants={itemVariants}
                initial="hidden"
                animate={isVisible ? "visible" : "hidden"}
            >
                <motion.h3 
                    className="text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4"
                    variants={itemVariants}
                >
                    Cerita Kami
                </motion.h3>
                
                <motion.p 
                    className="text-gray-600 dark:text-gray-300 mb-4"
                    variants={itemVariants}
                >
                    Didirikan pada tahun 2013, Arsitekta telah menangani berbagai proyek mulai dari perumahan 
                    hingga komersial dengan fokus pada desain yang berkelanjutan dan berorientasi pada pengalaman pengguna.
                </motion.p>
                
                <motion.p 
                    className="text-gray-600 dark:text-gray-300 mb-4"
                    variants={itemVariants}
                >
                    Tim kami terdiri dari arsitek, desainer interior, dan ahli konstruksi yang berpengalaman dalam 
                    menciptakan ruang yang tidak hanya indah secara visual, tetapi juga fungsional dan sesuai dengan
                    gaya hidup modern.
                </motion.p>
                
                <motion.div 
                    className="mt-6 flex items-center justify-between"
                    variants={itemVariants}
                >
                    <div className="flex space-x-3">
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900">
                            <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                        </span>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900">
                            <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                            </svg>
                        </span>
                        <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900">
                            <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                            </svg>
                        </span>
                    </div>
                    <a href="#contact" className="text-emerald-600 dark:text-emerald-400 font-semibold hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors">
                        Hubungi Kami &rarr;
                    </a>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default AboutContent;
