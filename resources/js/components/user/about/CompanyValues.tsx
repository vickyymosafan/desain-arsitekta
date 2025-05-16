import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CompanyValuesProps {
    title: string;
    description: string;
    detailedDescription?: string;
    icon: string;
    examples?: string[];
}

const CompanyValues: React.FC<CompanyValuesProps> = ({ 
    title, 
    description, 
    detailedDescription, 
    icon, 
    examples = [] 
}) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    
    return (
        <motion.div 
            className={`bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border ${isExpanded ? 'border-emerald-500/70' : 'border-emerald-800/30'} hover:border-emerald-500/50 transition-all duration-500 h-full`}
            whileHover={{ y: -5 }}
            layout
        >
            <div className="flex items-start mb-4">
                <div className="flex justify-center items-center w-12 h-12 rounded-lg mr-4 bg-emerald-600/20 text-emerald-400">
                    {icon === 'lightbulb' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>
                    )}
                    {icon === 'leaf' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                        </svg>
                    )}
                    {icon === 'badge-check' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                        </svg>
                    )}
                    {icon === 'users' && (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                    )}
                </div>
                <h4 className="text-xl font-bold text-white">{title}</h4>
            </div>
            
            <p className="text-gray-300 mb-4">{description}</p>
            
            {(detailedDescription || examples.length > 0) && (
                <button 
                    onClick={toggleExpand}
                    className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors duration-300 text-sm font-medium"
                >
                    {isExpanded ? 'Sembunyikan detail' : 'Lihat lebih lanjut'}
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 ml-1 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            )}
            
            <AnimatePresence>
                {isExpanded && (
                    <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                    >
                        {detailedDescription && (
                            <p className="text-gray-300 mt-4 pt-4 border-t border-gray-800">{detailedDescription}</p>
                        )}
                        
                        {examples.length > 0 && (
                            <div className="mt-4 pt-4 border-t border-gray-800">
                                <h5 className="text-white font-semibold mb-2">Contoh Penerapan:</h5>
                                <ul className="text-gray-300 space-y-2">
                                    {examples.map((example, index) => (
                                        <li key={index} className="flex items-start">
                                            <span className="inline-flex items-center justify-center w-5 h-5 bg-emerald-900/50 text-emerald-400 rounded-full mr-2 flex-shrink-0 text-xs">
                                                {index + 1}
                                            </span>
                                            <span>{example}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Bottom highlight bar */}
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-500/0 group-hover:bg-emerald-500/30 transition-all duration-500"></div>
        </motion.div>
    );
};

export default CompanyValues;
