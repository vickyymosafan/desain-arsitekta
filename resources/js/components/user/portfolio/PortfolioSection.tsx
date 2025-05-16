import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
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

// Custom hook for local storage
function useLocalStorage<T>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    // State to store our value
    const [storedValue, setStoredValue] = useState<T>(() => {
        if (typeof window === "undefined") {
            return initialValue;
        }
        try {
            const item = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    // Return a wrapped version of useState's setter function that
    // persists the new value to localStorage
    const setValue: React.Dispatch<React.SetStateAction<T>> = useCallback((value) => {
        try {
            // Allow value to be a function so we have same API as useState
            const valueToStore =
                value instanceof Function ? value(storedValue) : value;
            // Save state
            setStoredValue(valueToStore);
            // Save to local storage
            if (typeof window !== "undefined") {
                window.localStorage.setItem(key, JSON.stringify(valueToStore));
            }
        } catch (error) {
            console.error(error);
        }
    }, [key, storedValue]);

    return [storedValue, setValue];
}


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

// View modes
const viewModes = [
    { id: 'grid', icon: 'grid' },
    { id: 'list', icon: 'list' }
];

const PortfolioSection: React.FC = () => {
    // Core state management
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [filteredProjects, setFilteredProjects] = useState(portfolioProjects);
    const [selectedProject, setSelectedProject] = useState<typeof portfolioProjects[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Enhanced UI state
    const [viewMode, setViewMode] = useLocalStorage<string>('portfolioViewMode', 'grid');
    const [searchQuery, setSearchQuery] = useState('');
    const [favorites, setFavorites] = useLocalStorage<number[]>('portfolioFavorites', []);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    // Animation and UI references
    const sectionRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

    // Apply all filters (category and search)
    useEffect(() => {
        // Simulate loading state for more dynamic feel
        setIsLoading(true);
        
        const timer = setTimeout(() => {
            let filtered = [...portfolioProjects];
            
            // Apply category filter
            if (selectedCategory !== 'all') {
                filtered = filtered.filter(project => project.category === selectedCategory);
            }
            
            // Apply search filter if query exists
            if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                filtered = filtered.filter(project => 
                    project.title.toLowerCase().includes(query) ||
                    project.description.toLowerCase().includes(query) ||
                    project.tags.some(tag => tag.toLowerCase().includes(query))
                );
            }
            
            setFilteredProjects(filtered);
            setIsLoading(false);
        }, 400); // Short delay for loading animation
        
        return () => clearTimeout(timer);
    }, [selectedCategory, searchQuery]);
    
    // Handle search input
    const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(event.target.value);
    }, []);
    
    // Toggle favorite status
    const toggleFavorite = useCallback((projectId: number) => {
        setFavorites(prev => 
            prev.includes(projectId) 
                ? prev.filter(id => id !== projectId) 
                : [...prev, projectId]
        );
    }, [setFavorites]);

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
        <div ref={sectionRef} className="w-full min-h-screen py-16 px-4 md:px-8 lg:px-16">
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

            {/* Control Bar: Filters, View Toggle, Search */}
            <motion.div 
                className="mb-12 flex flex-col md:flex-row items-center justify-between gap-4"
                {...createAnimationProps('fadeIn', 0.4)}
            >
                {/* Category Filters */}
                <div className="w-full md:w-auto">
                    <PortfolioFilter 
                        categories={categories} 
                        selectedCategory={selectedCategory} 
                        onCategoryChange={setSelectedCategory} 
                    />
                </div>
                
                {/* Right side controls */}
                <div className="flex items-center gap-3 w-full md:w-auto justify-end">
                    {/* Search bar */}
                    <div className={`relative transition-all duration-300 ${isSearchOpen ? 'w-full md:w-64' : 'w-10'}`}>
                        <input 
                            type="text" 
                            placeholder="Cari proyek..."
                            value={searchQuery}
                            onChange={handleSearch}
                            className={`bg-gray-800/60 text-white rounded-full py-2 pl-10 pr-4 w-full focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all duration-300 ${isSearchOpen ? 'opacity-100' : 'opacity-0'}`}
                        />
                        <button 
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="absolute left-0 top-0 h-full px-3 text-gray-300 hover:text-white transition-colors"
                            aria-label={isSearchOpen ? 'Close search' : 'Open search'}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                    
                    {/* View mode toggle */}
                    <div className="flex bg-gray-800/60 rounded-full p-1">
                        {viewModes.map(mode => (
                            <button
                                key={mode.id}
                                onClick={() => setViewMode(mode.id)}
                                className={`p-2 rounded-full transition-all ${viewMode === mode.id ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
                                aria-label={`View as ${mode.id}`}
                            >
                                {mode.icon === 'grid' ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </motion.div>

            {/* Loading indicator */}
            <AnimatePresence>
                {isLoading && (
                    <motion.div 
                        className="flex justify-center my-12"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <div className="inline-flex items-center px-4 py-2 rounded-full bg-emerald-600/20 text-emerald-400">
                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            <span>Memuat proyek...</span>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Empty state */}
            <AnimatePresence>
                {!isLoading && filteredProjects.length === 0 && (
                    <motion.div 
                        className="flex flex-col items-center justify-center py-16 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                    >
                        <svg className="w-16 h-16 text-gray-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <h3 className="text-xl font-semibold text-gray-300 mb-1">Tidak Ada Proyek Ditemukan</h3>
                        <p className="text-gray-400 max-w-md">
                            Tidak ada proyek yang cocok dengan filter saat ini. Coba ubah kategori atau kata kunci pencarian Anda.
                        </p>
                        <button 
                            onClick={() => {
                                setSelectedCategory('all');
                                setSearchQuery('');
                            }}
                            className="mt-4 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full transition-colors"
                        >
                            Reset Filter
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Portfolio Grid/List based on viewMode */}
            {/* Portfolio Grid/List based on viewMode */}
            <motion.div 
                className={`grid ${viewMode === 'grid' 
                    ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8' 
                    : 'grid-cols-1 gap-4'}`}
                variants={containerVariants}
                initial="hidden"
                animate={!isLoading && filteredProjects.length > 0 ? "visible" : "hidden"}
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
                            className="flex flex-col relative group"
                        >
                            <PortfolioItem 
                                project={project} 
                                onClick={() => openProjectModal(project)}
                                viewMode={viewMode as 'grid' | 'list'}
                                isFavorite={favorites.includes(project.id)}
                                onToggleFavorite={() => toggleFavorite(project.id)}
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
            </motion.div>

            {/* Action Buttons */}
            <AnimatePresence>
                {!isLoading && filteredProjects.length > 0 && (
                    <motion.div 
                        className="mt-16 text-center flex flex-col sm:flex-row justify-center gap-4"
                        {...createAnimationProps('fadeIn', 0.8)}
                    >
                        {/* View more button */}
                        <a 
                            href="#portfolio-more" 
                            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-emerald-600 border border-transparent rounded-md shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 group"
                        >
                            <span>Lihat Lebih Banyak</span>
                            <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </a>
                        
                        {/* Favorites filter button */}
                        {favorites.length > 0 && (
                            <button 
                                onClick={() => {
                                    if (selectedCategory === 'favorites') {
                                        setSelectedCategory('all');
                                    } else {
                                        setSelectedCategory('favorites');
                                    }
                                }}
                                className={`inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-md shadow-lg transition-all duration-300 ${selectedCategory === 'favorites' 
                                    ? 'bg-rose-600 text-white hover:bg-rose-700 focus:ring-rose-500' 
                                    : 'text-rose-800 bg-rose-100 hover:bg-rose-200 focus:ring-rose-500'}`}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill={selectedCategory === 'favorites' ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                                <span>{selectedCategory === 'favorites' ? 'Tampilkan Semua' : 'Favorit Saya'}</span>
                            </button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

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
