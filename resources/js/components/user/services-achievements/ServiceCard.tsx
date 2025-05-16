import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createAnimationProps } from '@/utils';

interface ServiceCardProps {
    title: string;
    description: string;
    icon: string;
    color: string;
    detailUrl?: string;
    category?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon, color, detailUrl = '#', category = '' }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    
    // Toggle expanded state for mobile view
    const toggleExpand = () => {
        setIsExpanded(!isExpanded);
    };
    // Map for icon components
    const icons = {
        'couch': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 7v8a2 2 0 002 2h14a2 2 0 002-2V9M3 7V5a2 2 0 012-2h6m0 0h6a2 2 0 012 2v2m0 0h-6m-6 0H5" />
            </svg>
        ),
        'comments': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
        ),
        'tasks': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
        ),

        'pencil-ruler': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
        ),
        'building': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
        ),
        'paint-roller': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
            </svg>
        )
    };

    // Animation variants for card expansion/collapse
    const cardVariants = {
        collapsed: { height: 'auto' },
        expanded: { height: 'auto' }
    };
    
    const contentVariants = {
        collapsed: { opacity: 0, height: 0, marginTop: 0 },
        expanded: { opacity: 1, height: 'auto', marginTop: 12 }
    };
    
    return (
        <motion.div 
            className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-emerald-800/30 hover:border-emerald-500/50 transition-all duration-500 h-full flex flex-col group hover:shadow-emerald-900/30 hover:shadow-lg relative overflow-hidden"
            whileHover={{ y: -5 }}
            variants={cardVariants}
            animate={isExpanded ? 'expanded' : 'collapsed'}
            layout
        >
            {/* Category Tag - Only show if category exists */}
            {category && (
                <span className="absolute top-3 right-3 text-xs font-semibold bg-emerald-500/20 text-emerald-300 px-2 py-1 rounded-full">
                    {category}
                </span>
            )}
            {/* Icon */}
            <div className="flex justify-center items-center w-16 h-16 rounded-lg mb-6 bg-emerald-600/20 text-emerald-400 group-hover:text-emerald-300 group-hover:bg-emerald-600/30 transition-all duration-300 relative overflow-hidden group/icon">
                <div className="absolute inset-0 bg-emerald-600/0 group-hover/icon:bg-emerald-600/10 transition-all duration-500 rounded-lg"></div>
                <motion.div
                    initial={{ scale: 1 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                >
                    {icon in icons ? icons[icon as keyof typeof icons] : icons['building']}
                </motion.div>
            </div>
            
            {/* Content */}
            <div className="flex justify-between items-start">
                <h3 className="text-xl md:text-2xl font-bold text-white mb-3 font-nunito group-hover:text-emerald-100 transition-all duration-300">{title}</h3>
                
                {/* Expand/Collapse button for mobile - Only visible on small screens */}
                <button 
                    className="lg:hidden flex items-center justify-center w-8 h-8 rounded-full bg-emerald-600/20 text-emerald-400 hover:text-emerald-300 hover:bg-emerald-600/30 transition-all duration-300 focus:outline-none"
                    onClick={(e) => {
                        e.preventDefault();
                        toggleExpand();
                    }}
                    aria-label={isExpanded ? "Collapse details" : "Expand details"}
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>
            
            <p className="text-gray-300 mb-6 flex-grow">{description}</p>
            
            {/* Additional content that appears when expanded on mobile */}
            <AnimatePresence>
                {isExpanded && (
                    <motion.div 
                        variants={contentVariants}
                        initial="collapsed"
                        animate="expanded"
                        exit="collapsed"
                        className="text-gray-300 border-t border-emerald-800/30 pt-4 mb-4"
                    >
                        <h4 className="text-emerald-400 font-semibold mb-2">Fitur Layanan:</h4>
                        <ul className="list-disc list-inside space-y-1 text-sm">
                            <li>Konsultasi awal gratis</li>
                            <li>Desain yang disesuaikan dengan kebutuhan</li>
                            <li>Revisi tanpa batas</li>
                            <li>Dukungan pasca penyelesaian</li>
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
            
            {/* Action Buttons */}
            <div className="mt-auto flex flex-wrap gap-3 justify-between items-center">
                <a 
                    href={detailUrl} 
                    className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors duration-300 group/link"
                >
                    <span className="mr-1">Pelajari Selengkapnya</span>
                    <svg 
                        className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                    >
                        <path 
                            fillRule="evenodd" 
                            d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                            clipRule="evenodd" 
                        />
                    </svg>
                </a>
                
                <button
                    className="px-3 py-1 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-md transition-colors duration-300 shadow-sm hover:shadow"
                    onClick={(e) => {
                        e.preventDefault();
                        window.location.href = '/contact?service=' + encodeURIComponent(title);
                    }}
                >
                    Konsultasi
                </button>
            </div>
        </motion.div>
    );
};

export default ServiceCard;
