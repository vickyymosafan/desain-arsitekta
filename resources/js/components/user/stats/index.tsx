import React from 'react';
import { motion } from 'framer-motion';
import { FaBuilding, FaCalendarAlt, FaSmile } from 'react-icons/fa';

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

const StatsSection: React.FC = () => {
    const stats = [
        {
            icon: <FaBuilding />,
            count: '250+',
            label: 'Proyek Selesai'
        },
        {
            icon: <FaCalendarAlt />,
            count: '15',
            label: 'Tahun Beroperasi'
        },
        {
            icon: <FaSmile />,
            count: '420',
            label: 'Testimoni Positif'
        }
    ];

    return (
        <section className="py-16 bg-neutral-900">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    {stats.map((stat, index) => (
                        <StatItem 
                            key={index}
                            icon={stat.icon}
                            count={stat.count}
                            label={stat.label}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default StatsSection;
