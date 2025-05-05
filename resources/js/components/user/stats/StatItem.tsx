import React from 'react';
import { motion } from 'framer-motion';

interface StatItemProps {
    icon: React.ReactNode;
    count: string | number;
    label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, count, label }) => {
    return (
        <div className="flex flex-col items-center">
            <div className="text-emerald-400 text-4xl mb-3">
                {icon}
            </div>
            <motion.h3 
                className="text-white font-playfair text-4xl md:text-5xl font-bold mb-2"
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
