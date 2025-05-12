import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    animationVariants, 
    createAnimationProps, 
    SPACING, 
    Z_INDICES, 
    containerVariants, 
    itemVariants 
} from '@/utils';
// Use direct imports to avoid circular dependencies
import ServiceCard from './ServiceCard';
import AchievementCounter from './AchievementCounter';

// Service data
const services = [
    {
        id: 1,
        title: 'Desain Arsitektur',
        description: 'Layanan desain arsitektur yang menggabungkan estetika, keberlanjutan, dan fungsionalitas untuk berbagai jenis bangunan.',
        icon: 'pencil-ruler',
        color: 'emerald'
    },
    {
        id: 2,
        title: 'Konstruksi',
        description: 'Layanan konstruksi berkualitas tinggi yang mewujudkan desain menjadi bangunan nyata dengan standar terbaik.',
        icon: 'building',
        color: 'emerald'
    },
    {
        id: 3,
        title: 'Renovasi',
        description: 'Transformasi ruang yang ada menjadi lebih fungsional, modern, dan sesuai dengan kebutuhan Anda.',
        icon: 'paint-roller',
        color: 'emerald'
    }
];

// Achievement data
const achievements = [
    {
        id: 1,
        value: 250,
        label: 'Proyek Selesai',
        symbol: '+',
        duration: 2.5
    },
    {
        id: 2,
        value: 15,
        label: 'Tahun Pengalaman',
        symbol: '+',
        duration: 2.0
    },
    {
        id: 3,
        value: 98,
        label: 'Klien Puas',
        symbol: '%',
        duration: 3.0
    },
    {
        id: 4,
        value: 30,
        label: 'Penghargaan',
        symbol: '+',
        duration: 2.2
    }
];

const ServicesAchievementsSection: React.FC = () => {
    // State for active tab
    const [activeTab, setActiveTab] = useState('services');

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center py-16 px-4 md:px-8 lg:px-16">
            {/* Tab Navigation */}
            <div className="mb-12 flex justify-center">
                <motion.div 
                    className="inline-flex bg-gray-900/60 backdrop-blur-sm rounded-full p-1 border border-emerald-800/30"
                    {...createAnimationProps('fadeIn', 0.2)}
                >
                    <button
                        onClick={() => setActiveTab('services')}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'services' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-300 hover:text-white'}`}
                    >
                        Layanan Kami
                    </button>
                    <button
                        onClick={() => setActiveTab('achievements')}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'achievements' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-300 hover:text-white'}`}
                    >
                        Pencapaian
                    </button>
                </motion.div>
            </div>

            {/* Section Title */}
            <motion.div 
                className="text-center mb-12 max-w-3xl"
                {...createAnimationProps('fadeIn', 0.4)}
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-white mb-4">
                    {activeTab === 'services' ? 'Layanan Profesional Kami' : 'Pencapaian & Prestasi'}
                </h2>
                <p className="text-gray-300 text-lg">
                    {activeTab === 'services' 
                        ? 'Kami menyediakan solusi arsitektur komprehensif untuk mewujudkan visi Anda menjadi kenyataan.'
                        : 'Diakui karena kualitas dan komitmen kami terhadap keunggulan dalam setiap proyek.'}
                </p>
            </motion.div>

            {/* Content Area */}
            <div className="w-full max-w-7xl mx-auto">
                {/* Services Content */}
                {activeTab === 'services' && (
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {services.map((service, index) => (
                            <motion.div 
                                key={service.id}
                                variants={itemVariants}
                                custom={index}
                            >
                                <ServiceCard 
                                    title={service.title}
                                    description={service.description}
                                    icon={service.icon}
                                    color={service.color}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}

                {/* Achievements Content */}
                {activeTab === 'achievements' && (
                    <motion.div 
                        className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {achievements.map((achievement, index) => (
                            <motion.div 
                                key={achievement.id}
                                variants={itemVariants}
                                custom={index}
                            >
                                <AchievementCounter 
                                    value={achievement.value}
                                    label={achievement.label}
                                    symbol={achievement.symbol}
                                    duration={achievement.duration}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* CTA Button */}
            <motion.div 
                className="mt-16"
                {...createAnimationProps('fadeIn', 0.8)}
            >
                <a 
                    href="#about" 
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-emerald-600 border border-transparent rounded-md shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 group"
                >
                    <span>Pelajari Lebih Lanjut</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </motion.div>
        </div>
    );
};

// Make sure the export is clear and direct for proper dynamic loading
export default ServicesAchievementsSection;
