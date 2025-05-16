import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    animationVariants, 
    createAnimationProps, 
    SPACING, 
    Z_INDICES, 
    containerVariants, 
    itemVariants 
} from '@/utils';
import CompanyValues from './CompanyValues';
import TeamMember from './TeamMember';
// Import data from the data file
import { 
    teamMembers, 
    companyValues, 
    companyMilestones, 
    teamDepartments,
    TeamMemberData 
} from './data';

const AboutSection: React.FC = () => {
    // State management
    const [activeTab, setActiveTab] = useState<'company' | 'team' | 'milestones'>('company');
    const [activeDepartment, setActiveDepartment] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    
    // Handle search input changes
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };
    
    // Reset filters
    const resetFilters = () => {
        setSearchQuery('');
        setActiveDepartment('all');
        setIsSearchActive(false);
    };
    
    // Filter team members based on search query and department
    const filteredTeamMembers = useMemo(() => {
        return teamMembers.filter(member => {
            const matchesSearch = searchQuery === '' || 
                member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
                member.description.toLowerCase().includes(searchQuery.toLowerCase());
                
            const matchesDepartment = activeDepartment === 'all' || 
                member.expertise?.some(exp => exp.toLowerCase().includes(activeDepartment));
            
            return matchesSearch && matchesDepartment;
        });
    }, [searchQuery, activeDepartment]);
    
    // Focus search input when search is activated
    useEffect(() => {
        if (isSearchActive) {
            const searchInput = document.getElementById('team-search');
            if (searchInput) {
                searchInput.focus();
            }
        }
    }, [isSearchActive]);

    return (
        <div className="w-full min-h-screen py-16 px-4 md:px-8 lg:px-16">
            {/* Section Header */}
            <motion.div 
                className="text-center mb-12 max-w-3xl mx-auto"
                {...createAnimationProps('fadeIn', 0.2)}
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-white mb-4">
                    Tentang Arsitekta
                </h2>
                <p className="text-gray-300 text-lg">
                    Kami adalah studio arsitektur yang berdedikasi untuk menciptakan ruang yang menginspirasi, berkelanjutan, dan fungsional.
                </p>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto">
                {/* Tab Navigation */}
                <div className="mb-8 flex justify-center">
                    <motion.div 
                        className="inline-flex bg-gray-900/60 backdrop-blur-sm rounded-full p-1 border border-emerald-800/30 shadow-lg"
                        {...createAnimationProps('fadeIn', 0.4)}
                    >
                        <button
                            onClick={() => {
                                setActiveTab('company');
                                resetFilters();
                            }}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'company' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-300 hover:text-white'}`}
                        >
                            Perusahaan
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('milestones');
                                resetFilters();
                            }}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'milestones' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-300 hover:text-white'}`}
                        >
                            Perjalanan Kami
                        </button>
                        <button
                            onClick={() => {
                                setActiveTab('team');
                                resetFilters();
                            }}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'team' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-300 hover:text-white'}`}
                        >
                            Tim Kami
                        </button>
                    </motion.div>
                </div>

                {/* Company Content */}
                {activeTab === 'company' && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        {/* Company Story */}
                        <motion.div variants={itemVariants}>
                            <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
                                Arsitekta adalah studio arsitektur terkemuka yang berkomitmen untuk menghadirkan solusi desain inovatif, berkelanjutan, dan berkualitas tinggi. Didirikan pada tahun 2010, kami telah menyelesaikan berbagai proyek dari rumah pribadi hingga gedung komersial.
                            </p>
                        </motion.div>
                        
                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-nunito">Nilai-Nilai Kami</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                {companyValues.map((value) => (
                                    <CompanyValues 
                                        key={value.id}
                                        title={value.title}
                                        description={value.description}
                                        detailedDescription={value.detailedDescription}
                                        icon={value.icon}
                                        examples={value.examples}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Milestones Content */}
                {activeTab === 'milestones' && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.div variants={itemVariants}>
                            <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
                                Perjalanan kami dimulai dari visi untuk menciptakan arsitektur yang memadukan estetika, fungsi, dan keberlanjutan. Berikut adalah tonggak penting dalam perjalanan kami.
                            </p>
                        </motion.div>
                        
                        {/* Timeline Section */}
                        <div className="relative py-8">
                            {/* Vertical Line */}
                            <div className="absolute left-1/2 -ml-px h-full w-0.5 bg-emerald-700/50"></div>
                            
                            {/* Milestone Items */}
                            {companyMilestones.map((milestone, index) => (
                                <motion.div 
                                    key={milestone.id}
                                    className={`relative z-10 mb-12 ${index % 2 === 0 ? 'md:flex md:justify-end' : 'md:flex'}`}
                                    initial={{ opacity: 0, y: 50 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.2, duration: 0.7 }}
                                >
                                    <div className="md:w-5/12">
                                        {/* Timeline Content */}
                                        <motion.div 
                                            className={`relative p-6 ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'} bg-gray-900/70 backdrop-blur-md rounded-xl border ${milestone.highlight ? 'border-emerald-600/50 shadow-emerald-900/40 shadow-lg' : 'border-emerald-800/30'} hover:border-emerald-500/50 transition-all duration-500`}
                                            whileHover={{ y: -5 }}
                                        >
                                            <div className="flex items-center mb-4">
                                                <div className="flex justify-center items-center w-10 h-10 rounded-lg mr-3 bg-emerald-600/20 text-emerald-400">
                                                    {milestone.icon ? (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            {milestone.icon === 'flag' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />}
                                                            {milestone.icon === 'award' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />}
                                                            {milestone.icon === 'users' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />}
                                                            {milestone.icon === 'globe' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />}
                                                            {milestone.icon === 'office-building' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />}
                                                            {milestone.icon === 'device-mobile' && <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />}
                                                        </svg>
                                                    ) : (
                                                        <span className="font-bold">{milestone.year}</span>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="text-sm text-emerald-400">{milestone.year}</span>
                                                    <h4 className="text-lg font-bold text-white font-nunito">{milestone.title}</h4>
                                                </div>
                                            </div>
                                            <p className="text-gray-300 text-sm">{milestone.description}</p>
                                        </motion.div>
                                    </div>
                                    
                                    {/* Timeline Dot */}
                                    <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                                        <div className={`h-4 w-4 rounded-full ${milestone.highlight ? 'bg-emerald-500' : 'bg-emerald-800'} border-2 border-gray-900`}></div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}

                {/* Team Content */}
                {activeTab === 'team' && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                        className="pb-8"
                    >
                        <motion.div variants={itemVariants} className="mb-8">
                            <p className="text-center text-gray-300 mb-8 max-w-3xl mx-auto">
                                Tim profesional kami terdiri dari arsitek berpengalaman, desainer interior berbakat, dan ahli proyek yang berdedikasi untuk memberikan hasil terbaik bagi setiap klien.
                            </p>
                            
                            {/* Search and Filter Controls */}
                            <div className="w-full flex flex-wrap items-center justify-between gap-4 mb-10">
                                {/* Department Filter Pills */}
                                <div className="flex flex-wrap gap-2">
                                    {teamDepartments.map((department) => (
                                        <button
                                            key={department.id}
                                            onClick={() => setActiveDepartment(department.id)}
                                            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-300 ${
                                                activeDepartment === department.id 
                                                    ? 'bg-emerald-600 text-white shadow-md' 
                                                    : 'bg-gray-800/70 text-gray-300 hover:bg-gray-700/80 hover:text-white'
                                            }`}
                                        >
                                            {department.label}
                                        </button>
                                    ))}
                                </div>
                                
                                {/* Search Bar and View Toggle */}
                                <div className="flex items-center gap-3">
                                    {/* View Toggle */}
                                    <div className="flex p-1 bg-gray-800/60 rounded-lg">
                                        <button 
                                            onClick={() => setViewMode('grid')}
                                            className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
                                            aria-label="Grid View"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                            </svg>
                                        </button>
                                        <button 
                                            onClick={() => setViewMode('list')}
                                            className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-emerald-600 text-white' : 'text-gray-400 hover:text-white'}`}
                                            aria-label="List View"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
                                            </svg>
                                        </button>
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
                                                    id="team-search"
                                                    type="text"
                                                    placeholder="Cari tim..."
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
                                </div>
                            </div>
                        </motion.div>
                        
                        <AnimatePresence mode="wait">
                            {filteredTeamMembers.length > 0 ? (
                                <motion.div 
                                    key="team-members-grid"
                                    className={viewMode === 'grid' 
                                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                                        : "flex flex-col space-y-4"
                                    }
                                    variants={containerVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit={{ opacity: 0 }}
                                >
                                    {filteredTeamMembers.map((member, index) => (
                                        <motion.div 
                                            key={member.id}
                                            variants={itemVariants}
                                            custom={index}
                                            layout
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className={viewMode === 'list' ? "w-full" : ""}
                                        >
                                            <TeamMember 
                                                name={member.name}
                                                role={member.role}
                                                photo={member.photo}
                                                description={member.description}
                                                expertise={member.expertise}
                                                education={member.education}
                                                yearsOfExperience={member.yearsOfExperience}
                                                projects={member.projects}
                                                social={member.social}
                                            />
                                        </motion.div>
                                    ))}
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="no-team-results"
                                    className="text-center py-16 px-4"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    <div className="mb-6 text-emerald-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">Tidak Ada Anggota Tim Ditemukan</h3>
                                    <p className="text-gray-300 mb-6">Tidak ada anggota tim yang sesuai dengan kriteria pencarian Anda.</p>
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
                        {(searchQuery || activeDepartment !== 'all') && filteredTeamMembers.length > 0 && (
                            <motion.div 
                                className="mt-6 text-center text-gray-300 text-sm"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                Menampilkan {filteredTeamMembers.length} dari {teamMembers.length} anggota tim
                                {searchQuery && <span> untuk pencarian "{searchQuery}"</span>}
                                {activeDepartment !== 'all' && <span> dalam departemen {teamDepartments.find(dept => dept.id === activeDepartment)?.label}</span>}
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </div>

            {/* CTA Section */}
            <motion.div 
                className="mt-20 text-center"
                {...createAnimationProps('fadeIn', 0.6)}
            >
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-nunito">Siap Bekerja Sama?</h3>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                    Diskusikan kebutuhan arsitektur dan desain Anda dengan tim profesional kami. Kami siap membantu mewujudkan visi Anda.
                </p>
                <a 
                    href="#contact" 
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-emerald-600 border border-transparent rounded-md shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 group"
                >
                    <span>Hubungi Kami</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </motion.div>
        </div>
    );
};

export default AboutSection;
