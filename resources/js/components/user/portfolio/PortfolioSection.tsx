import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    animationVariants, 
    createAnimationProps, 
    containerVariants, 
    itemVariants,
    Z_INDICES
} from '@/utils';
import PortfolioFilter from './PortfolioFilter';
import PortfolioItem from './PortfolioItem';
import PortfolioModal from './PortfolioModal';

// Portfolio projects data
const portfolioProjects = [
    {
        id: 1,
        title: 'Villa Serenity',
        category: 'residential',
        image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        description: 'Desain villa modern dengan pemandangan pegunungan yang menakjubkan. Menggabungkan elemen alam dengan arsitektur kontemporer.',
        client: 'PT. Natura Living',
        year: 2023,
        location: 'Bandung, Indonesia',
        tags: ['Modern', 'Villa', 'Sustainable']
    },
    {
        id: 2,
        title: 'Green Office Tower',
        category: 'commercial',
        image: 'https://images.unsplash.com/photo-1545579133-99bb5ab189bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        description: 'Menara kantor 18 lantai dengan sertifikasi LEED Gold. Mengutamakan efisiensi energi dan ruang kerja yang nyaman.',
        client: 'Green Property Group',
        year: 2022,
        location: 'Jakarta, Indonesia',
        tags: ['Office', 'Green Building', 'Modern']
    },
    {
        id: 3,
        title: 'Harmony Cafe',
        category: 'commercial',
        image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        description: 'Kafe dengan konsep industrial modern yang menekankan pada pengalaman santai dan sosial.',
        client: 'Harmony F&B',
        year: 2023,
        location: 'Surabaya, Indonesia',
        tags: ['Cafe', 'Industrial', 'Interior']
    },
    {
        id: 4,
        title: 'Zen House',
        category: 'residential',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        description: 'Rumah minimalis yang terinspirasi dari filosofi Zen. Mengutamakan keseimbangan, ruang, dan harmoni.',
        client: 'Keluarga Wijaya',
        year: 2022,
        location: 'Yogyakarta, Indonesia',
        tags: ['Minimalist', 'Residential', 'Zen']
    },
    {
        id: 5,
        title: 'Urban Park',
        category: 'landscape',
        image: 'https://images.unsplash.com/photo-1587221703223-181d78a8fc4c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        description: 'Taman kota yang dirancang untuk memberikan ruang hijau di tengah kawasan padat penduduk.',
        client: 'Pemerintah Kota Semarang',
        year: 2021,
        location: 'Semarang, Indonesia',
        tags: ['Urban', 'Landscape', 'Public Space']
    },
    {
        id: 6,
        title: 'Luxury Apartment',
        category: 'residential',
        image: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1200&q=80',
        description: 'Desain interior apartemen mewah dengan sentuhan elegansi modern dan teknologi pintar.',
        client: 'Sky Living Development',
        year: 2023,
        location: 'Jakarta, Indonesia',
        tags: ['Luxury', 'Interior', 'Smart Home']
    },
];

// Available categories
const categories = [
    { id: 'all', name: 'Semua' },
    { id: 'residential', name: 'Residensial' },
    { id: 'commercial', name: 'Komersial' },
    { id: 'landscape', name: 'Lansekap' }
];

const PortfolioSection: React.FC = () => {
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredProjects, setFilteredProjects] = useState(portfolioProjects);
    const [selectedProject, setSelectedProject] = useState<typeof portfolioProjects[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter projects when category changes
    useEffect(() => {
        if (selectedCategory === 'all') {
            setFilteredProjects(portfolioProjects);
        } else {
            setFilteredProjects(portfolioProjects.filter(project => project.category === selectedCategory));
        }
    }, [selectedCategory]);

    // Function to open modal with project details
    const openProjectModal = (project: typeof portfolioProjects[0]) => {
        setSelectedProject(project);
        setIsModalOpen(true);
        // Prevent body scrolling when modal is open
        document.body.style.overflow = 'hidden';
    };

    // Function to close modal
    const closeProjectModal = () => {
        setIsModalOpen(false);
        // Restore body scrolling
        document.body.style.overflow = 'auto';
    };

    return (
        <div className="w-full min-h-screen py-16 px-4 md:px-8 lg:px-16">
            {/* Section Header */}
            <motion.div 
                className="text-center mb-16 max-w-3xl mx-auto"
                {...createAnimationProps('fadeIn', 0.2)}
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-white mb-4">
                    Portfolio Kami
                </h2>
                <p className="text-gray-300 text-lg">
                    Koleksi proyek terbaik yang menunjukkan keahlian dan visi kami dalam menciptakan ruang yang luar biasa.
                </p>
            </motion.div>

            {/* Portfolio Filters */}
            <motion.div 
                className="mb-12 flex justify-center"
                {...createAnimationProps('fadeIn', 0.4)}
            >
                <PortfolioFilter 
                    categories={categories} 
                    selectedCategory={selectedCategory} 
                    onCategoryChange={setSelectedCategory} 
                />
            </motion.div>

            {/* Portfolio Grid */}
            <motion.div 
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <AnimatePresence>
                    {filteredProjects.map((project, index) => (
                        <motion.div 
                            key={project.id}
                            variants={itemVariants}
                            custom={index}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.4 }}
                            layout
                            className="flex flex-col"
                        >
                            <PortfolioItem 
                                project={project} 
                                onClick={() => openProjectModal(project)} 
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* View More Button */}
            <motion.div 
                className="mt-16 text-center"
                {...createAnimationProps('fadeIn', 0.8)}
            >
                <a 
                    href="#portfolio-more" 
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-indigo-800 bg-indigo-100 border border-transparent rounded-md shadow-lg hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 group"
                >
                    <span>Lihat Lebih Banyak</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </motion.div>

            {/* Project Modal */}
            <AnimatePresence>
                {isModalOpen && selectedProject && (
                    <PortfolioModal 
                        project={selectedProject} 
                        onClose={closeProjectModal} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

export default PortfolioSection;
