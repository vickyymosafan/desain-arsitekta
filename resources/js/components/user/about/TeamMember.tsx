import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SocialMediaProps {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
}

interface Project {
    name: string;
    year?: number;
}

interface TeamMemberProps {
    name: string;
    role: string;
    photo: string;
    description: string;
    expertise?: string[];
    education?: string;
    yearsOfExperience?: number;
    projects?: Project[];
    social: SocialMediaProps;
}

const TeamMember: React.FC<TeamMemberProps> = ({ 
    name, 
    role, 
    photo, 
    description, 
    expertise = [], 
    education, 
    yearsOfExperience, 
    projects = [], 
    social 
}) => {
    const [isDetailOpen, setIsDetailOpen] = useState(false);
    
    const toggleDetail = () => {
        setIsDetailOpen(!isDetailOpen);
    };
    
    return (
        <motion.div 
            className={`bg-gray-900/70 backdrop-blur-md rounded-xl overflow-hidden border ${isDetailOpen ? 'border-emerald-500/70' : 'border-emerald-800/30'} transition-all duration-500 h-full`}
            whileHover={{ y: -5 }}
            layout
        >
            <div className="relative overflow-hidden group">
                <img 
                    src={photo} 
                    alt={name} 
                    className="w-full h-60 object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent opacity-90"></div>
                
                {expertise.length > 0 && (
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        {expertise.slice(0, 2).map((item, index) => (
                            <span 
                                key={index}
                                className="bg-emerald-900/80 text-emerald-300 text-xs px-2 py-1 rounded-full"
                            >
                                {item}
                            </span>
                        ))}
                        {expertise.length > 2 && (
                            <span className="bg-emerald-900/80 text-emerald-300 text-xs px-2 py-1 rounded-full">
                                +{expertise.length - 2}
                            </span>
                        )}
                    </div>
                )}
                
                {yearsOfExperience && (
                    <div className="absolute top-3 right-3 bg-emerald-600/90 text-white font-bold text-xs px-2 py-1 rounded-md shadow-lg">
                        {yearsOfExperience} tahun
                    </div>
                )}
                
                <div className="absolute bottom-0 p-4 text-white w-full">
                    <h4 className="text-xl font-bold">{name}</h4>
                    <p className="text-emerald-400">{role}</p>
                </div>
            </div>
            
            <div className="p-5">
                <p className="text-gray-300 mb-4">{description}</p>
                
                <div className="flex justify-between items-center">
                    <div className="flex space-x-3">
                        {social.instagram && (
                            <a
                                href={social.instagram} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                                </svg>
                            </a>
                        )}
                        {social.linkedin && (
                            <a
                                href={social.linkedin} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                    <rect x="2" y="9" width="4" height="12"></rect>
                                    <circle cx="4" cy="4" r="2"></circle>
                                </svg>
                            </a>
                        )}
                        {social.twitter && (
                            <a
                                href={social.twitter} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                                </svg>
                            </a>
                        )}
                        {social.website && (
                            <a
                                href={social.website} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-gray-400 hover:text-emerald-400 transition-colors"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <circle cx="12" cy="12" r="10"></circle>
                                    <line x1="2" y1="12" x2="22" y2="12"></line>
                                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                                </svg>
                            </a>
                        )}
                    </div>
                    
                    {(education || projects.length > 0) && (
                        <button 
                            onClick={toggleDetail}
                            className="flex items-center text-emerald-400 hover:text-emerald-300 transition-colors duration-300 text-sm font-medium"
                        >
                            {isDetailOpen ? 'Sembunyikan' : 'Lihat detail'}
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                className={`h-5 w-5 ml-1 transition-transform duration-300 ${isDetailOpen ? 'rotate-180' : ''}`} 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    )}
                </div>
                
                <AnimatePresence>
                    {isDetailOpen && (
                        <motion.div 
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            {education && (
                                <div className="mt-4 pt-4 border-t border-gray-800">
                                    <div className="flex items-center mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                            <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                        </svg>
                                        <h5 className="text-white font-semibold">Pendidikan</h5>
                                    </div>
                                    <p className="text-gray-300 text-sm">{education}</p>
                                </div>
                            )}
                            
                            {projects.length > 0 && (
                                <div className="mt-4 pt-4 border-t border-gray-800">
                                    <div className="flex items-center mb-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        <h5 className="text-white font-semibold">Proyek Utama</h5>
                                    </div>
                                    <ul className="text-gray-300 text-sm space-y-2">
                                        {projects.map((project, index) => (
                                            <li key={index} className="flex items-start">
                                                <span className="inline-flex items-center justify-center w-5 h-5 bg-emerald-900/50 text-emerald-400 rounded-full mr-2 flex-shrink-0 text-xs">
                                                    {index + 1}
                                                </span>
                                                <span>
                                                    {project.name}
                                                    {project.year && <span className="text-emerald-500 ml-1.5">({project.year})</span>}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default TeamMember;
