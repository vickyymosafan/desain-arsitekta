import React from 'react';
import { motion } from 'framer-motion';

interface SocialLinks {
    instagram?: string;
    linkedin?: string;
    twitter?: string;
}

interface TeamMemberProps {
    name: string;
    role: string;
    photo: string;
    description: string;
    social: SocialLinks;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, photo, description, social }) => {
    // Placeholder image for missing team member photos
    const placeholderImage = '/assets/images/placeholder-profile.jpg';
    
    return (
        <motion.div 
            className="bg-gray-900/70 backdrop-blur-md rounded-xl overflow-hidden border border-emerald-800/30 hover:border-emerald-500/50 transition-all duration-500 h-full flex flex-col group hover:shadow-emerald-900/30 hover:shadow-lg"
            whileHover={{ y: -5 }}
        >
            {/* Photo */}
            <div className="relative overflow-hidden h-64">
                <div className="absolute inset-0 bg-emerald-900/20 group-hover:bg-emerald-900/10 transition-all duration-500 z-10"></div>
                <img 
                    src={photo} 
                    alt={name}
                    className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => { 
                        const target = e.target as HTMLImageElement;
                        target.src = placeholderImage;
                    }}
                />
            </div>
            
            {/* Content */}
            <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-white mb-1 font-nunito">{name}</h3>
                <p className="text-emerald-400 mb-3 text-sm">{role}</p>
                <p className="text-gray-300 text-sm mb-4 flex-grow">{description}</p>
                
                {/* Social Links */}
                <div className="flex space-x-3 mt-auto">
                    {social.instagram && (
                        <a 
                            href={social.instagram}
                            className="text-gray-400 hover:text-emerald-400 transition-colors duration-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                            </svg>
                        </a>
                    )}
                    
                    {social.linkedin && (
                        <a 
                            href={social.linkedin}
                            className="text-gray-400 hover:text-emerald-400 transition-colors duration-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                    )}
                    
                    {social.twitter && (
                        <a 
                            href={social.twitter}
                            className="text-gray-400 hover:text-emerald-400 transition-colors duration-300"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                            </svg>
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default TeamMember;
