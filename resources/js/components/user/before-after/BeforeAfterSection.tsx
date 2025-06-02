import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    animationVariants, 
    createAnimationProps, 
    containerVariants, 
    itemVariants 
} from '@/utils';
import TransformationSlider from './TransformationSlider';
import TransformationControls from './TransformationControls';

// Transformation projects data
const transformationProjects = [
    {
        id: 1,
        title: 'Renovasi Rumah Klasik',
        description: 'Transformasi rumah bergaya klasik menjadi hunian modern yang tetap mempertahankan elemen heritage.',
        beforeImage: 'https://images.unsplash.com/photo-1560185007-5f0bb1866cab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        afterImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        year: 2023,
        location: 'Jakarta Selatan'
    },
    {
        id: 2,
        title: 'Perubahan Ruang Kerja',
        description: 'Mengubah ruang tak terpakai menjadi area kerja produktif dengan pencahayaan dan ergonomi optimal.',
        beforeImage: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        afterImage: 'https://images.unsplash.com/photo-1593476550610-87baa860004a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        year: 2022,
        location: 'Bandung'
    },
    {
        id: 3,
        title: 'Pembaruan Dapur',
        description: 'Modernisasi dapur tradisional menjadi area memasak fungsional dengan teknologi terkini.',
        beforeImage: 'https://images.unsplash.com/photo-1556911220-bff31c812dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        afterImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        year: 2023,
        location: 'Surabaya'
    },
];

const BeforeAfterSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const activeProject = transformationProjects[activeIndex];

    // Handle next project
    const nextProject = () => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % transformationProjects.length);
    };

    // Handle previous project
    const prevProject = () => {
        setActiveIndex((prevIndex) => (prevIndex - 1 + transformationProjects.length) % transformationProjects.length);
    };

    return (
        <div className="w-full min-h-screen py-16 px-4 md:px-8 lg:px-16 bg-gray-950">
            {/* Section Header */}
            <motion.div 
                className="text-center mb-16 max-w-3xl mx-auto"
                {...createAnimationProps('fadeIn', 0.2)}
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-white mb-4">
                    Transformasi Ruang
                </h2>
                <p className="text-gray-300 text-lg">
                    Lihat perubahan dramatis yang kami ciptakan melalui perbandingan sebelum dan sesudah.
                </p>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-center">
                    {/* Slider Component - 7 columns on large screens */}
                    <motion.div 
                        className="lg:col-span-7 rounded-xl overflow-hidden border border-emerald-800/30"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <TransformationSlider 
                            beforeImage={activeProject.beforeImage} 
                            afterImage={activeProject.afterImage} 
                            altText={activeProject.title}
                        />
                    </motion.div>
                    
                    {/* Info & Controls - 3 columns on large screens */}
                    <motion.div 
                        className="lg:col-span-3"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div 
                            className="bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-emerald-800/30 mb-6"
                            variants={itemVariants}
                        >
                            <h3 className="text-2xl font-bold text-white mb-3 font-nunito">{activeProject.title}</h3>
                            <p className="text-gray-300 mb-4">{activeProject.description}</p>
                            
                            <div className="flex justify-between text-sm text-gray-400 mb-2">
                                <span>{activeProject.year}</span>
                                <span>{activeProject.location}</span>
                            </div>
                        </motion.div>
                        
                        <motion.div variants={itemVariants}>
                            <TransformationControls 
                                current={activeIndex + 1} 
                                total={transformationProjects.length} 
                                onPrev={prevProject} 
                                onNext={nextProject} 
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Call to Action */}
            <motion.div 
                className="mt-16 text-center"
                {...createAnimationProps('fadeIn', 0.8)}
            >
                <a 
                    href="#contact" 
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-emerald-600 border border-transparent rounded-md shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 group"
                >
                    <span>Mulai Transformasi Ruang Anda</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </motion.div>
        </div>
    );
};

export default BeforeAfterSection;
