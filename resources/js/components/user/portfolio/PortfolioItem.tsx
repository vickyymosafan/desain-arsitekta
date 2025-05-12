import React from 'react';
import { motion } from 'framer-motion';

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

interface PortfolioItemProps {
    project: Project;
    onClick: () => void;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ project, onClick }) => {
    // Map category to readable name
    const categoryMap: Record<string, string> = {
        'residential': 'Residensial',
        'commercial': 'Komersial',
        'landscape': 'Lansekap'
    };

    // Placeholder image from Unsplash for missing project images
    const placeholderImage = 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80';

    return (
        <motion.div 
            className="bg-gray-900/70 backdrop-blur-md rounded-xl overflow-hidden border border-emerald-800/30 hover:border-emerald-500/50 transition-all duration-500 h-full flex flex-col group cursor-pointer hover:shadow-emerald-900/30 hover:shadow-lg"
            whileHover={{ y: -10 }}
            onClick={onClick}
        >
            {/* Project Image */}
            <div className="relative overflow-hidden aspect-[4/3]">
                <div className="absolute inset-0 bg-emerald-900/30 group-hover:bg-emerald-900/10 transition-all duration-500 z-10"></div>
                <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { 
                        const target = e.target as HTMLImageElement;
                        target.src = placeholderImage;
                    }}
                />
                <div className="absolute top-4 right-4 z-20">
                    <span className="bg-emerald-600/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                        {categoryMap[project.category] || project.category}
                    </span>
                </div>
            </div>
            
            {/* Project Info */}
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300 font-nunito">{project.title}</h3>
                <p className="text-gray-300 text-sm line-clamp-2 mb-3 flex-grow">{project.description}</p>
                
                {/* Project Meta */}
                <div className="flex items-center justify-between mt-4">
                    <span className="text-emerald-400 text-sm">{project.year}</span>
                    <span className="text-gray-400 text-sm italic">{project.location}</span>
                </div>
                
                {/* View Details Link */}
                <div className="mt-4 pt-4 border-t border-gray-800">
                    <button 
                        className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors duration-300 group/link"
                    >
                        <span className="mr-1">Lihat Detail</span>
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
                    </button>
                </div>
            </div>
        </motion.div>
    );
};

export default PortfolioItem;
