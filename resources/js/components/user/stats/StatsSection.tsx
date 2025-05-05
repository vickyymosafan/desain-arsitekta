import React from 'react';
import { FaBuilding, FaCalendarAlt, FaSmile } from 'react-icons/fa';
import StatItem from './StatItem';

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
