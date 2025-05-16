import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
// Import data from separate file
import { services, achievements, serviceCategories, ServiceItem } from './data';



const ServicesAchievementsSection: React.FC = () => {
    // State for active tab and other interactive elements
    const [activeTab, setActiveTab] = useState('services');
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    
    // Handle search input changes
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };
    
    // Reset search and filters
    const resetFilters = () => {
        setSearchQuery('');
        setActiveCategory('all');
        setIsSearchActive(false);
    };
    
    // Filter services based on search query and active category
    const filteredServices = useMemo(() => {
        return services.filter(service => {
            const matchesSearch = searchQuery === '' || 
                service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                service.description.toLowerCase().includes(searchQuery.toLowerCase());
                
            const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
            
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);
    
    // Auto-focus search input when search is activated
    useEffect(() => {
        if (isSearchActive) {
            const searchInput = document.getElementById('service-search');
            if (searchInput) {
                searchInput.focus();
            }
        }
    }, [isSearchActive]);

    return (
        <div className="w-full min-h-screen flex flex-col justify-center items-center py-16 px-4 md:px-8 lg:px-16">
            {/* Tab Navigation */}
            <div className="mb-8 flex justify-center">
                <motion.div 
                    className="inline-flex bg-gray-900/60 backdrop-blur-sm rounded-full p-1 border border-emerald-800/30 shadow-lg"
                    {...createAnimationProps('fadeIn', 0.2)}
                >
                    <button
                        onClick={() => {
                            setActiveTab('services');
                            resetFilters();
                        }}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'services' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-300 hover:text-white'}`}
                    >
                        Layanan Kami
                    </button>
                    <button
                        onClick={() => {
                            setActiveTab('achievements');
                            resetFilters();
                        }}
                        className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'achievements' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-300 hover:text-white'}`}
                    >
                        Pencapaian
                    </button>
                </motion.div>
            </div>

            {/* Section Title */}
            <motion.div 
                className="text-center mb-8 max-w-3xl"
                {...createAnimationProps('fadeIn', 0.4)}
                key={activeTab}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
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
            
            {/* Search and Filter Controls - Only for Services tab */}
            <AnimatePresence>
                {activeTab === 'services' && (
                    <motion.div 
                        className="w-full max-w-6xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Category Filter Pills */}
                        <div className="flex flex-wrap gap-2">
                            {serviceCategories.map((category) => (
                                <button
                                    key={category.id}
                                    onClick={() => setActiveCategory(category.id)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                        activeCategory === category.id 
                                            ? 'bg-emerald-600 text-white shadow-md' 
                                            : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700/80 hover:text-white'
                                    }`}
                                >
                                    {category.label}
                                </button>
                            ))}
                        </div>
                        
                        {/* Search Bar */}
                        <div className="relative">
                            {isSearchActive ? (
                                <motion.div 
                                    className="flex items-center bg-gray-800/70 rounded-full overflow-hidden shadow-inner"
                                    initial={{ width: 40 }}
                                    animate={{ width: 240 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <input
                                        id="service-search"
                                        type="text"
                                        placeholder="Cari layanan..."
                                        value={searchQuery}
                                        onChange={handleSearchChange}
                                        className="bg-transparent text-white px-4 py-2 w-full focus:outline-none"
                                    />
                                    <button 
                                        onClick={() => {
                                            setIsSearchActive(false);
                                            setSearchQuery('');
                                        }}
                                        className="flex items-center justify-center w-10 h-10 text-gray-300 hover:text-white transition-colors duration-300 focus:outline-none"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </motion.div>
                            ) : (
                                <motion.button 
                                    onClick={() => setIsSearchActive(true)}
                                    className="flex items-center justify-center w-10 h-10 bg-gray-800/70 rounded-full text-gray-300 hover:text-white transition-colors duration-300 focus:outline-none shadow-md hover:shadow-lg"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </motion.button>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content Area */}
            <div className="w-full max-w-7xl mx-auto">
                {/* Services Content */}
                {activeTab === 'services' && (
                    <>
                        <AnimatePresence mode="wait">
                            {filteredServices.length > 0 ? (
                                <motion.div 
                                    key="services-grid"
                                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0 }}
                                >
                                    {filteredServices.map((service, index) => (
                                        <motion.div 
                                            key={service.id}
                                            variants={itemVariants}
                                            custom={index}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                        >
                                            <ServiceCard 
                                                title={service.title}
                                                description={service.description}
                                                icon={service.icon}
                                                color={service.color}
                                                category={service.category}
                                                detailUrl={service.detailUrl}
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="no-results"
                                    className="text-center py-16 px-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="mb-6 text-emerald-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Tidak Ada Layanan Ditemukan</h3>
                                    <p className="text-gray-300 mb-6">Maaf, tidak ada layanan yang sesuai dengan kriteria pencarian Anda.</p>
                                    <button
                                        onClick={resetFilters}
                                        className="inline-flex items-center justify-center px-4 py-2 text-base font-medium text-white bg-emerald-600 border border-transparent rounded-md shadow-sm hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300"
                                    >
                                        Reset Pencarian
                                    </button>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        
                        {/* Results Count */}
                        {searchQuery || activeCategory !== 'all' ? (
                            <motion.div 
                                className="mt-6 text-center text-gray-300 text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                Menampilkan {filteredServices.length} dari {services.length} layanan
                                {searchQuery && <span> untuk pencarian "{searchQuery}"</span>}
                                {activeCategory !== 'all' && <span> dalam kategori {serviceCategories.find(cat => cat.id === activeCategory)?.label}</span>}
                            </motion.div>
                        ) : null}
                    </>
                )}

                {/* Achievements Content */}
                {activeTab === 'achievements' && (
                    <motion.div 
                        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {achievements.map((achievement, index) => (
                            <motion.div 
                                key={achievement.id}
                                variants={itemVariants}
                                custom={index}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <AchievementCounter 
                                    value={achievement.value}
                                    label={achievement.label}
                                    symbol={achievement.symbol}
                                    duration={achievement.duration}
                                    icon={achievement.icon}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>

            {/* CTA Buttons */}
            <motion.div 
                className="mt-16 flex flex-wrap justify-center gap-4"
                {...createAnimationProps('fadeIn', 0.8)}
            >
                {activeTab === 'services' ? (
                    <>
                        <a 
                            href="/contact" 
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-emerald-600 border border-transparent rounded-md shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 group"
                        >
                            <span>Diskusikan Proyek Anda</span>
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                        <a 
                            href="/portfolio" 
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-emerald-400 bg-transparent border border-emerald-600/50 rounded-md hover:bg-emerald-600/10 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 group"
                        >
                            <span>Lihat Portfolio</span>
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </a>
                    </>
                ) : (
                    <>
                        <a 
                            href="/about" 
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-emerald-600 border border-transparent rounded-md shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 group"
                        >
                            <span>Tentang Kami</span>
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                        <a 
                            href="/team" 
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-emerald-400 bg-transparent border border-emerald-600/50 rounded-md hover:bg-emerald-600/10 hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 group"
                        >
                            <span>Tim Kami</span>
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </a>
                    </>
                )}
            </motion.div>
        </div>
    );
};

// Make sure the export is clear and direct for proper dynamic loading
export default ServicesAchievementsSection;
