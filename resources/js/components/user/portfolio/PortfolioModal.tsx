import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Z_INDICES } from '@/utils';

interface Project {
    id: number;
    title: string;
    category: string;
    image: string;
    description: string;
    client: string;
    year: number;
    location: string;
    tags: string[];
}

interface PortfolioModalProps {
    project: Project;
    onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ project, onClose }) => {
    // Close modal when escape key is pressed
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Map category to readable name
    const categoryMap: Record<string, string> = {
        'residential': 'Residensial',
        'commercial': 'Komersial',
        'landscape': 'Lansekap'
    };

    // Placeholder image for missing project images
    const placeholderImage = '/assets/images/placeholder-project.jpg';

    return (
        <motion.div 
            className="fixed inset-0 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Backdrop */}
            <motion.div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
            />

            {/* Modal Content */}
            <motion.div 
                className="relative bg-gray-900 rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] shadow-2xl border border-emerald-800/30 flex flex-col"
                initial={{ scale: 0.9, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                exit={{ scale: 0.9, y: 20, opacity: 0 }}
                transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            >
                {/* Close Button */}
                <button 
                    className="absolute top-4 right-4 z-10 bg-black/40 text-white rounded-full p-2 hover:bg-emerald-600 transition-colors duration-300"
                    onClick={onClose}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="overflow-y-auto">
                    {/* Project Image */}
                    <div className="relative h-64 sm:h-80 md:h-96 bg-gray-800">
                        <img 
                            src={project.image} 
                            alt={project.title}
                            className="w-full h-full object-cover object-center"
                            onError={(e) => { 
                                const target = e.target as HTMLImageElement;
                                target.src = placeholderImage;
                            }}
                        />
                        <div className="absolute top-4 left-4">
                            <span className="bg-emerald-600/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                                {categoryMap[project.category] || project.category}
                            </span>
                        </div>
                    </div>

                    {/* Project Details */}
                    <div className="p-6 md:p-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 font-nunito">{project.title}</h2>
                        
                        <p className="text-gray-300 mb-6">{project.description}</p>
                        
                        {/* Project Meta */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">Detail Proyek</h3>
                                <ul className="space-y-2">
                                    <li className="flex items-start">
                                        <span className="text-emerald-400 font-medium w-24">Klien:</span>
                                        <span className="text-gray-300">{project.client}</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-emerald-400 font-medium w-24">Tahun:</span>
                                        <span className="text-gray-300">{project.year}</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-emerald-400 font-medium w-24">Lokasi:</span>
                                        <span className="text-gray-300">{project.location}</span>
                                    </li>
                                </ul>
                            </div>
                            
                            <div>
                                <h3 className="text-lg font-semibold text-white mb-3">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tags.map((tag, index) => (
                                        <span 
                                            key={index} 
                                            className="bg-gray-800 text-gray-300 text-xs px-3 py-1 rounded-full border border-gray-700"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                        
                        {/* Call to Action */}
                        <div className="flex flex-wrap gap-4 mt-8 border-t border-gray-800 pt-6">
                            <a 
                                href="#contact" 
                                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-white bg-emerald-600 border border-transparent rounded-md shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300"
                                onClick={(e) => {
                                    e.preventDefault();
                                    onClose();
                                    // Scroll to contact section
                                    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                                }}
                            >
                                Konsultasi Proyek Serupa
                            </a>
                            <button 
                                className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium text-emerald-400 bg-transparent border border-emerald-400 rounded-md hover:bg-emerald-900/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300"
                                onClick={onClose}
                            >
                                Kembali ke Galeri
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default PortfolioModal;
