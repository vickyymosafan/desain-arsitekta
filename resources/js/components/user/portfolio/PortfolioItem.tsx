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
    viewMode?: 'grid' | 'list';
    isFavorite?: boolean;
    onToggleFavorite?: () => void;
}

const PortfolioItem: React.FC<PortfolioItemProps> = ({ 
    project, 
    onClick, 
    viewMode = 'grid',
    isFavorite = false,
    onToggleFavorite
}) => {
    // Map category to readable name
    const categoryMap: Record<string, string> = {
        'residential': 'Residensial',
        'commercial': 'Komersial',
        'landscape': 'Lansekap'
    };

    // Placeholder image from Unsplash for missing project images
    const placeholderImage = 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80';

    // Handle favorite toggle without propagating to parent click
    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (onToggleFavorite) {
            onToggleFavorite();
        }
    };

    // Define container style based on view mode
    const containerClassName = viewMode === 'grid'
        ? "bg-gray-900/70 backdrop-blur-md rounded-xl overflow-hidden border border-emerald-800/30 hover:border-emerald-500/50 transition-all duration-500 h-full flex flex-col group cursor-pointer hover:shadow-emerald-900/30 hover:shadow-lg"
        : "bg-gray-900/70 backdrop-blur-md rounded-xl overflow-hidden border border-emerald-800/30 hover:border-emerald-500/50 transition-all duration-500 flex flex-col md:flex-row group cursor-pointer hover:shadow-emerald-900/30 hover:shadow-lg";

    return (
        <motion.div 
            className={containerClassName}
            whileHover={{ y: -5 }}
            onClick={onClick}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
        >
            {/* Project Image */}
            <div className={`relative overflow-hidden ${viewMode === 'grid' ? 'aspect-[4/3]' : 'md:w-1/3 aspect-[4/3] md:aspect-auto'}`}>
                <div className="absolute inset-0 bg-emerald-900/30 group-hover:bg-emerald-900/10 transition-all duration-500 z-10"></div>
                <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-full object-cover object-center transform group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => { 
                        const target = e.target as HTMLImageElement;
                        target.src = placeholderImage;
                    }}
                    loading="lazy" // Added lazy loading for better performance
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 right-4 z-20">
                    <span className="bg-emerald-600/90 text-white text-xs px-3 py-1 rounded-full backdrop-blur-sm">
                        {categoryMap[project.category] || project.category}
                    </span>
                </div>
                
                {/* Favorite Button - visible on hover */}
                {onToggleFavorite && (
                    <button 
                        onClick={handleFavoriteClick}
                        className={`absolute top-4 left-4 z-20 p-2 rounded-full transition-colors duration-300 ${isFavorite 
                            ? 'bg-rose-500 text-white hover:bg-rose-600' 
                            : 'bg-white/20 backdrop-blur-md text-white hover:bg-rose-500'}`}
                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                )}
            </div>
            
            {/* Project Info */}
            <div className={`p-6 flex-grow flex flex-col ${viewMode === 'list' ? 'md:w-2/3' : ''}`}>
                <div className="flex items-start justify-between">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors duration-300 font-nunito">{project.title}</h3>
                    {viewMode === 'list' && onToggleFavorite && (
                        <button 
                            onClick={handleFavoriteClick}
                            className={`p-1.5 rounded-full ml-2 transition-colors duration-300 ${isFavorite 
                                ? 'bg-rose-500 text-white hover:bg-rose-600' 
                                : 'bg-gray-800 text-gray-400 hover:bg-rose-500 hover:text-white'}`}
                            aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                            </svg>
                        </button>
                    )}
                </div>
                
                <p className={`text-gray-300 text-sm mb-3 flex-grow ${viewMode === 'grid' ? 'line-clamp-2' : 'line-clamp-3 md:line-clamp-2'}`}>{project.description}</p>
                
                {/* Tags */}
                {viewMode === 'list' && (
                    <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, index) => (
                            <span key={index} className="bg-emerald-900/50 text-emerald-300 text-xs px-2.5 py-1 rounded-full">
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
                
                {/* Project Meta */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-3">
                        <span className="text-emerald-400 text-sm">{project.year}</span>
                        <span className="text-gray-400 text-sm italic">{project.location}</span>
                    </div>
                    
                    {viewMode === 'list' && (
                        <span className="text-gray-400 text-sm">{project.client}</span>
                    )}
                </div>
                
                {/* View Details Button/Link */}
                <div className="mt-4 pt-4 border-t border-gray-800 flex justify-between items-center">
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
                    
                    {/* Status badge - only in list view */}
                    {viewMode === 'list' && (
                        <span className="bg-emerald-600/30 text-emerald-400 text-xs px-2.5 py-1 rounded-full">
                            Selesai
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default PortfolioItem;
