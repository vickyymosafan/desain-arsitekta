import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
    id: number;
    name: string;
    role: string;
    avatar: string;
    content: string;
    rating: number;
    project: string;
}

interface TestimonialCardProps {
    testimonial: Testimonial;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
    // Placeholder image for missing avatar
    const placeholderAvatar = '/assets/images/placeholder-avatar.jpg';

    // Render stars based on rating
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }).map((_, index) => (
            <svg 
                key={index} 
                className={`w-5 h-5 ${index < rating ? 'text-yellow-400' : 'text-gray-600'}`} 
                fill="currentColor" 
                viewBox="0 0 20 20" 
                xmlns="http://www.w3.org/2000/svg"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
        ));
    };

    return (
        <div className="flex flex-col md:flex-row w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 p-6 md:p-10">
            {/* Quote Mark */}
            <div className="absolute top-8 left-8 text-emerald-600/20">
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-24 w-24" 
                    fill="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
            </div>
            
            {/* Left Column - Avatar and Info */}
            <div className="md:w-1/3 flex flex-col items-center justify-center mb-6 md:mb-0 relative z-10">
                <motion.div 
                    className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-emerald-500/30 shadow-lg mb-4"
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <img 
                        src={testimonial.avatar} 
                        alt={testimonial.name}
                        className="w-full h-full object-cover"
                        onError={(e) => { 
                            const target = e.target as HTMLImageElement;
                            target.src = placeholderAvatar;
                        }}
                    />
                </motion.div>
                
                <motion.div 
                    className="text-center"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <h3 className="text-xl font-bold text-white mb-1">{testimonial.name}</h3>
                    <p className="text-emerald-400 text-sm mb-2">{testimonial.role}</p>
                    <div className="flex justify-center">
                        {renderStars(testimonial.rating)}
                    </div>
                </motion.div>
            </div>
            
            {/* Right Column - Content */}
            <div className="md:w-2/3 md:pl-8 flex flex-col justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    <p className="text-gray-300 text-lg md:text-xl italic mb-6 relative z-10">
                        "{testimonial.content}"
                    </p>
                    
                    <div className="flex items-center text-sm text-gray-400 border-t border-gray-700 pt-4">
                        <span className="mr-2">Proyek:</span>
                        <span className="text-emerald-400 font-medium">{testimonial.project}</span>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default TestimonialCard;
