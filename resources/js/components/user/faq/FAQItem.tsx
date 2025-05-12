import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createAnimationProps } from '@/utils';

interface FAQItemProps {
    question: string;
    answer: string;
    delay?: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ question, answer, delay = 0 }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleOpen = () => {
        setIsOpen(!isOpen);
    };

    return (
        <motion.div 
            className="border-gray-800"
            {...createAnimationProps('fadeIn', delay)}
        >
            {/* Question */}
            <button 
                className={`w-full text-left p-6 flex items-start justify-between transition-colors duration-300 ${isOpen ? 'bg-emerald-900/20' : 'hover:bg-gray-800/30'}`}
                onClick={toggleOpen}
                aria-expanded={isOpen}
            >
                <span className="text-lg font-medium text-white pr-8">{question}</span>
                <span className={`text-emerald-400 transition-transform duration-300 transform ${isOpen ? 'rotate-180' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
            </button>
            
            {/* Answer */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <div className="p-6 pt-0 text-gray-300 bg-gray-800/20">
                            <p>{answer}</p>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

export default FAQItem;
