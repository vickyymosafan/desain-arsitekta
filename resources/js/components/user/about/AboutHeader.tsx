import React from 'react';
import { motion } from 'framer-motion';
import { animationVariants, getAnimationWithDelay } from '../../../utils/animations';

interface AboutHeaderProps {
    isVisible: boolean;
}

/**
 * AboutHeader Component
 * 
 * Displays the section header with styled title and animated elements.
 * Maintains consistent emerald-based styling from the brand identity.
 */
const AboutHeader: React.FC<AboutHeaderProps> = ({ isVisible }) => {
    return (
        <motion.div 
            initial="hidden" 
            animate={isVisible ? "visible" : "hidden"}
            variants={animationVariants.fadeIn}
            className="mb-12 text-center"
        >
            <h2 className="mb-3 text-emerald-500 text-xs md:text-sm font-bold tracking-widest uppercase inline-flex items-center">
                <motion.span 
                    initial={{ width: 0 }}
                    animate={{ width: "1.5rem", transition: { delay: 0.3, duration: 0.6 }}}
                    className="mr-2 h-px bg-emerald-500"
                ></motion.span>
                Tentang Kami
                <motion.span 
                    initial={{ width: 0 }}
                    animate={{ width: "1.5rem", transition: { delay: 0.3, duration: 0.6 }}}
                    className="ml-2 h-px bg-emerald-500"
                ></motion.span>
            </h2>
            
            <motion.h2
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white font-playfair"
                variants={getAnimationWithDelay('slideUp', 0.2)}
            >
                Mewujudkan Ruang Impian Anda
            </motion.h2>
            
            <motion.div
                className="h-1 w-20 bg-emerald-500 mx-auto mt-6 rounded-full"
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 80, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
            />
            
            <motion.p
                className="mt-6 md:text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto"
                variants={getAnimationWithDelay('slideUp', 0.4)}
            >
                Arsitekta adalah studio desain yang berdedikasi untuk menciptakan ruang fungsional 
                dengan estetika yang sesuai dengan kepribadian dan kebutuhan Anda.
            </motion.p>
        </motion.div>
    );
};

export default AboutHeader;
