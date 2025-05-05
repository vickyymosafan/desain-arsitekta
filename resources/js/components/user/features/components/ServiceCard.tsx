import React, { useState } from 'react';
import { motion } from 'framer-motion';

export interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    index?: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, index = 0 }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    // Calculate animation delay based on index
    const delay = index * 0.1;
    
    return (
        <motion.div 
            className="relative bg-neutral-900 p-8 rounded-xl transition-all duration-300 group border border-neutral-800 hover:border-emerald-500/50 h-full overflow-hidden"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ 
                y: -10, 
                boxShadow: "0 25px 50px -12px rgba(16, 185, 129, 0.15)",
                transition: { duration: 0.3, ease: "easeOut" } 
            }}
        >
            {/* Background gradient blob - moves based on hover state */}
            <motion.div 
                className="absolute -right-20 -top-20 w-64 h-64 rounded-full bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 blur-xl z-0 opacity-60"
                initial={{ scale: 0.8 }}
                animate={{ 
                    scale: isHovered ? 1.1 : 0.9,
                    x: isHovered ? -10 : 0,
                    y: isHovered ? 10 : 0,
                }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
            />
            
            {/* Service Icon */}
            <motion.div 
                className="relative z-10 text-emerald-500 text-4xl mb-6 transition-all duration-300 group-hover:text-emerald-400 bg-emerald-500/10 p-5 rounded-xl w-fit"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay, duration: 0.3 }}
                whileHover={{ 
                    rotate: [0, -5, 5, -5, 0],
                    transition: { duration: 0.5 }
                }}
            >
                <span className="relative z-10">{icon}</span>
                <motion.div 
                    className="absolute inset-0 bg-emerald-500/10 rounded-xl"
                    animate={{ 
                        opacity: isHovered ? 1 : 0.3
                    }}
                />
            </motion.div>
            
            {/* Service Title */}
            <motion.h3 
                className="relative z-10 text-white font-playfair text-xl md:text-2xl font-bold mb-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: delay + 0.1, duration: 0.4 }}
            >
                {title}
                <motion.div 
                    className="h-1 w-12 bg-emerald-500/50 rounded-full mt-2"
                    initial={{ width: 0 }}
                    animate={{ width: isHovered ? 40 : 24 }}
                    transition={{ duration: 0.3 }}
                />
            </motion.h3>
            
            {/* Service Description */}
            <motion.p 
                className="relative z-10 text-neutral-300 font-nunito text-lg leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: delay + 0.2, duration: 0.5 }}
            >
                {description}
            </motion.p>
            
            {/* Learn more button with arrow - appears on hover */}
            <motion.div 
                className="relative z-10 mt-5 text-emerald-400 font-nunito font-medium flex items-center group cursor-pointer">
                <span>Pelajari selengkapnya</span>
                <motion.span 
                    className="ml-2 transform inline-block"
                    animate={{ x: isHovered ? 5 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    →
                </motion.span>
            </motion.div>
        </motion.div>
    );
};

export default ServiceCard;
