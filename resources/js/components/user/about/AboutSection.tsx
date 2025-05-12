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
import CompanyValues from './CompanyValues';
import TeamMember from './TeamMember';

// Team members data
const teamMembers = [
    {
        id: 1,
        name: 'Anisa Wijaya',
        role: 'Principal Architect',
        photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        description: 'Berpengalaman lebih dari 10 tahun dalam desain arsitektur perkotaan dan hunian mewah.',
        social: {
            instagram: '#',
            linkedin: '#',
            twitter: '#'
        }
    },
    {
        id: 2,
        name: 'Budi Santoso',
        role: 'Senior Interior Designer',
        photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        description: 'Spesialis dalam desain interior minimalis dan kontemporer dengan sentuhan budaya lokal.',
        social: {
            instagram: '#',
            linkedin: '#'
        }
    },
    {
        id: 3,
        name: 'Carla Putri',
        role: 'Project Manager',
        photo: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
        description: 'Mengelola proyek dari konsep hingga penyelesaian dengan fokus pada ketepatan waktu dan anggaran.',
        social: {
            instagram: '#',
            linkedin: '#',
            twitter: '#'
        }
    },
    {
        id: 4,
        name: 'Denny Pratama',
        role: 'Sustainability Expert',
        photo: '/assets/images/team/denny.jpg',
        description: 'Ahli dalam implementasi prinsip arsitektur berkelanjutan dan sertifikasi green building.',
        social: {
            instagram: '#',
            linkedin: '#'
        }
    }
];

// Company values
const companyValues = [
    {
        id: 1,
        title: 'Inovasi',
        description: 'Kami terus berinovasi dan mengadopsi teknologi terbaru untuk menciptakan desain yang progresif dan efisien.',
        icon: 'lightbulb'
    },
    {
        id: 2,
        title: 'Keberlanjutan',
        description: 'Komitmen kami terhadap praktik arsitektur berkelanjutan dan ramah lingkungan untuk masa depan yang lebih baik.',
        icon: 'leaf'
    },
    {
        id: 3,
        title: 'Kualitas',
        description: 'Kami mempertahankan standar kualitas tertinggi dalam setiap aspek desain dan konstruksi yang kami kerjakan.',
        icon: 'badge-check'
    },
    {
        id: 4,
        title: 'Kolaborasi',
        description: 'Kami percaya pada kekuatan kolaborasi dengan klien dan tim untuk mencapai hasil terbaik bagi semua pihak.',
        icon: 'users'
    }
];

const AboutSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState('company');

    return (
        <div className="w-full min-h-screen py-16 px-4 md:px-8 lg:px-16">
            {/* Section Header */}
            <motion.div 
                className="text-center mb-16 max-w-3xl mx-auto"
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
                <div className="mb-12 flex justify-center">
                    <motion.div 
                        className="inline-flex bg-gray-900/60 backdrop-blur-sm rounded-full p-1 border border-emerald-800/30"
                        {...createAnimationProps('fadeIn', 0.4)}
                    >
                        <button
                            onClick={() => setActiveTab('company')}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'company' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-300 hover:text-white'}`}
                        >
                            Perusahaan Kami
                        </button>
                        <button
                            onClick={() => setActiveTab('team')}
                            className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${activeTab === 'team' ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-300 hover:text-white'}`}
                        >
                            Tim Kami
                        </button>
                    </motion.div>
                </div>

                {/* Company Content */}
                {activeTab === 'company' && (
                    <motion.div
                        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        {/* Company Story */}
                        <motion.div variants={itemVariants}>
                            <div className="bg-gray-900/70 backdrop-blur-md rounded-xl p-8 border border-emerald-800/30">
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-nunito">Cerita Kami</h3>
                                <p className="text-gray-300 mb-4">
                                    Didirikan pada tahun 2008, Arsitekta telah berevolusi dari studio kecil menjadi firma arsitektur terkemuka yang dikenal karena pendekatan inovatif dan berorientasi detail.
                                </p>
                                <p className="text-gray-300 mb-4">
                                    Kami membawa visi baru dalam desain arsitektur dengan menggabungkan estetika modern, teknologi canggih, dan prinsip-prinsip keberlanjutan untuk menciptakan ruang yang memperkaya kehidupan penggunanya.
                                </p>
                                <p className="text-gray-300">
                                    Dengan tim profesional berpengalaman, kami telah menyelesaikan berbagai proyek sukses yang mencakup rumah tinggal, gedung komersial, dan ruang publik di seluruh Indonesia.
                                </p>
                            </div>
                        </motion.div>
                        
                        {/* Company Values */}
                        <motion.div variants={itemVariants}>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6 font-nunito">Nilai-Nilai Kami</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {companyValues.map((value) => (
                                    <CompanyValues 
                                        key={value.id}
                                        title={value.title}
                                        description={value.description}
                                        icon={value.icon}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}

                {/* Team Content */}
                {activeTab === 'team' && (
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.div variants={itemVariants}>
                            <p className="text-center text-gray-300 mb-12 max-w-3xl mx-auto">
                                Tim profesional kami terdiri dari arsitek berpengalaman, desainer interior berbakat, dan ahli proyek yang berdedikasi untuk memberikan hasil terbaik bagi setiap klien.
                            </p>
                        </motion.div>
                        
                        <motion.div 
                            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                            variants={containerVariants}
                        >
                            {teamMembers.map((member, index) => (
                                <motion.div 
                                    key={member.id}
                                    variants={itemVariants}
                                    custom={index}
                                >
                                    <TeamMember 
                                        name={member.name}
                                        role={member.role}
                                        photo={member.photo}
                                        description={member.description}
                                        social={member.social}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
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
