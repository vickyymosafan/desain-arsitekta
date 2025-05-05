import React from 'react';
import { motion } from 'framer-motion';

export interface StatItemProps {
    icon: React.ReactNode;
    count: string | number;
    label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, count, label }) => {
    return (
        <div className="flex flex-col items-center p-6 rounded-xl bg-neutral-800/50 border border-neutral-700 hover:border-emerald-500/30 transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-emerald-400 text-4xl mb-4 bg-emerald-400/10 p-4 rounded-full">
                {icon}
            </div>
            <motion.h3 
                className="text-white font-playfair text-3xl md:text-5xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                {count}
            </motion.h3>
            <p className="text-neutral-300 font-nunito text-center">{label}</p>
        </div>
    );
};

export default StatItem;
