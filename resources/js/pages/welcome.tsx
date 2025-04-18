import React, { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import type { SharedData } from '@/types';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('semua');
    const [activeFaq, setActiveFaq] = useState<number | null>(null);
    const [beforeAfterPosition, setBeforeAfterPosition] = useState(50);
    
    return (
        <>
            <Head title="Arsitekta - Jasa Desain dan Bangun Rumah Profesional" />
            
            {/* Navbar */}
            <nav className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 transition-all duration-300">
                <div className="container mx-auto px-6">
                    <div className="flex justify-between items-center py-4">
                        {/* Logo */}
                        <div className="flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mr-2 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            <span className="text-2xl font-serif font-bold text-gray-900">Arsitekta</span>
                        </div>
                        
                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {[
                                { name: 'Beranda', href: '#', active: true },
                                { name: 'Layanan', href: '#services' },
                                { name: 'Portofolio', href: '#portfolio' },
                                { name: 'Blog', href: '#blog' },
                                { name: 'Kontak', href: '#contact' }
                            ].map((item, index) => (
                                <a 
                                    key={index} 
                                    href={item.href} 
                                    className={`text-sm font-medium relative pb-1 transition-colors
                                    ${item.active 
                                        ? 'text-emerald-600 after:absolute after:left-0 after:bottom-0 after:h-0.5 after:w-full after:bg-emerald-600' 
                                        : 'text-gray-700 hover:text-emerald-600'
                                    }`}
                                >
                                    {item.name}
                                </a>
                            ))}
                            
                            {auth?.user ? (
                                <Link href="/dashboard" className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-sm hover:bg-emerald-700 transition-colors">
                                    Dashboard
                                </Link>
                            ) : (
                                <Link href="/login" className="px-4 py-2 text-sm font-medium text-white bg-emerald-600 rounded-sm hover:bg-emerald-700 transition-colors">
                                    Login Admin
                                </Link>
                            )}
                        </div>
                        
                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button 
                                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                                className="text-gray-700 focus:outline-none"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    {isMenuOpen ? (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    ) : (
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    )}
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                
                {/* Mobile Menu */}
                <motion.div 
                    initial={false}
                    animate={isMenuOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
                    className="md:hidden overflow-hidden bg-white border-t border-gray-100"
                >
                    <div className="container mx-auto px-6 py-4 space-y-4">
                        {[
                            { name: 'Beranda', href: '#', active: true },
                            { name: 'Layanan', href: '#services' },
                            { name: 'Portofolio', href: '#portfolio' },
                            { name: 'Blog', href: '#blog' },
                            { name: 'Kontak', href: '#contact' }
                        ].map((item, index) => (
                            <a 
                                key={index} 
                                href={item.href} 
                                className={`block py-2 px-4 text-sm font-medium ${item.active ? 'text-emerald-600 bg-emerald-50' : 'text-gray-700 hover:bg-gray-50'}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item.name}
                            </a>
                        ))}
                        
                        {auth?.user ? (
                            <Link 
                                href="/dashboard" 
                                className="block py-2 px-4 text-sm font-medium text-emerald-600 hover:bg-emerald-50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <Link 
                                href="/login" 
                                className="block py-2 px-4 text-sm font-medium text-emerald-600 hover:bg-emerald-50"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Login Admin
                            </Link>
                        )}
                    </div>
                </motion.div>
            </nav>
            
            {/* Hero Section */}
            <section className="pt-32 pb-20 bg-gradient-to-b from-emerald-50 to-white">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col lg:flex-row items-center">
                        <motion.div 
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="lg:w-1/2 lg:pr-10 mb-10 lg:mb-0"
                        >
                            <div className="inline-block mb-3">
                                <div className="px-3 py-1 bg-emerald-100 border-l-2 border-emerald-500 rounded-r-sm">
                                    <h5 className="text-emerald-800 uppercase tracking-widest text-xs font-semibold">Jasa Arsitektur Profesional</h5>
                                </div>
                            </div>
                            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">
                                Wujudkan Rumah <span className="text-emerald-600">Impian</span> Anda Bersama Kami
                            </h1>
                            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
                                Tim arsitek profesional kami siap memberikan layanan desain dan konstruksi berkualitas tinggi dengan pendekatan personal sesuai kebutuhan Anda.
                            </p>
                            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                                <a 
                                    href="#contact" 
                                    className="px-8 py-4 bg-emerald-600 text-white font-medium rounded-sm hover:bg-emerald-700 transition-colors shadow-md hover:shadow-lg inline-flex items-center justify-center"
                                >
                                    <span>Konsultasi Gratis</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </a>
                                <a 
                                    href="#portfolio" 
                                    className="px-8 py-4 bg-white text-emerald-700 font-medium rounded-sm border border-emerald-200 hover:bg-emerald-50 transition-colors inline-flex items-center justify-center"
                                >
                                    Lihat Portofolio
                                </a>
                            </div>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="lg:w-1/2 relative"
                        >
                            <div className="relative">
                                <div className="absolute -top-4 -left-4 w-24 h-24 bg-emerald-50 rounded-sm z-0"></div>
                                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-emerald-100 rounded-sm z-0"></div>
                                <div className="relative z-10 rounded-sm overflow-hidden shadow-2xl">
                                    <img 
                                        src="/1.webp" 
                                        alt="Modern Architecture Design" 
                                        className="w-full h-auto"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent"></div>
                                </div>
                                <div className="absolute -bottom-6 left-6 bg-white p-4 rounded-sm shadow-xl z-20">
                                    <div className="flex items-center text-emerald-700">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="font-medium">Desain Arsitektur Terbaik</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
            
            {/* Statistics */}
            <section className="py-12 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { number: '150+', label: 'Proyek Selesai', icon: 'M7 12l3-3 3 3 4-4M17 21H7a2 2 0 01-2-2V5a2 2 0 012-2h10a2 2 0 012 2v14a2 2 0 01-2 2z' },
                            { number: '10+', label: 'Tahun Pengalaman', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
                            { number: '99%', label: 'Klien Puas', icon: 'M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5' }
                        ].map((stat, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true, amount: 0.5 }}
                                className="bg-gray-50 rounded-sm p-8 text-center relative overflow-hidden group"
                            >
                                <div className="absolute -right-10 -top-10 w-40 h-40 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-500 ease-out"></div>
                                <div className="relative">
                                    <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors duration-300">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={stat.icon} />
                                        </svg>
                                    </div>
                                    <h3 className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</h3>
                                    <p className="text-gray-600 font-medium">{stat.label}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Fitur Layanan */}
            <section id="services" className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <div className="inline-block mb-3">
                            <div className="px-4 py-1 bg-emerald-50 border-l-2 border-emerald-500 rounded-r-sm">
                                <h5 className="text-emerald-700 uppercase tracking-widest text-sm font-semibold">Layanan Kami</h5>
                            </div>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-6">Solusi Lengkap untuk Kebutuhan Properti Anda</h2>
                        <p className="text-gray-600 leading-relaxed">Kami menawarkan berbagai layanan profesional untuk membantu Anda dalam setiap tahap proyek bangunan, mulai dari desain konsep hingga renovasi.</p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { 
                                icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2', 
                                title: 'Desain Arsitektur', 
                                description: 'Jasa desain arsitektur untuk rumah, ruko, atau gedung dengan konsep modern, minimalis, atau klasik sesuai keinginan Anda.'
                            },
                            { 
                                icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4', 
                                title: 'Konstruksi', 
                                description: 'Layanan pembangunan rumah dan bangunan komersial dari awal hingga selesai dengan kualitas premium dan tepat waktu.'
                            },
                            { 
                                icon: 'M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z', 
                                title: 'Interior Design', 
                                description: 'Desain interior yang fungsional dan estetis untuk menciptakan ruang yang nyaman dan sesuai dengan gaya hidup Anda.'
                            }
                        ].map((service, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true, amount: 0.3 }}
                                className="bg-white p-8 rounded-sm shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group"
                            >
                                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-emerald-200 transition-colors duration-300">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={service.icon} />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                                <p className="text-gray-600 mb-6">{service.description}</p>
                                <a href="#" className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700 transition-colors group-hover:translate-x-2 transform transition-transform duration-300">
                                    <span>Pelajari lebih lanjut</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                    </svg>
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Portfolio Gallery */}
            <section id="portfolio" className="py-24 bg-white">
                <div className="container mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <div className="inline-block mb-3">
                            <div className="px-4 py-1 bg-emerald-50 border-l-2 border-emerald-500 rounded-r-sm">
                                <h5 className="text-emerald-700 uppercase tracking-widest text-sm font-semibold">Portofolio Kami</h5>
                            </div>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-6">Proyek Terbaru Kami</h2>
                        <p className="text-gray-600 leading-relaxed">Lihat koleksi proyek yang telah kami kerjakan. Kami membanggakan hasil karya yang telah memberikan kepuasan kepada klien kami.</p>
                    </motion.div>
                    
                    {/* Filter Tabs */}
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true, amount: 0.8 }}
                        className="flex flex-wrap justify-center mb-12 space-x-2"
                    >
                        {['semua', 'rumah', 'interior', 'komersial', 'renovasi'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`px-6 py-2 rounded-sm text-sm font-medium transition-all mb-2
                                    ${activeTab === tab 
                                        ? 'bg-emerald-600 text-white shadow-md' 
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                    }`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                            </button>
                        ))}
                    </motion.div>
                    
                    {/* Portfolio Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { 
                                image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2053&q=80', 
                                title: 'Villa Modern Minimalis', 
                                category: 'rumah',
                                location: 'Jember, Jawa Timur'
                            },
                            { 
                                image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2053&q=80', 
                                title: 'Rumah Type 54', 
                                category: 'rumah',
                                location: 'Bondowoso, Jawa Timur'
                            },
                            { 
                                image: 'https://images.unsplash.com/photo-1586023492125-d146006ff4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=958&q=80', 
                                title: 'Interior Living Room Modern', 
                                category: 'interior',
                                location: 'Lumajang, Jawa Timur'
                            },
                            { 
                                image: 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', 
                                title: 'Ruko 2 Lantai', 
                                category: 'komersial',
                                location: 'Jember, Jawa Timur'
                            },
                            { 
                                image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', 
                                title: 'Kitchen Set Minimalis', 
                                category: 'interior',
                                location: 'Jember, Jawa Timur'
                            },
                            { 
                                image: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80', 
                                title: 'Renovasi Fasad Rumah Lama', 
                                category: 'renovasi',
                                location: 'Banyuwangi, Jawa Timur'
                            },
                            { 
                                image: 'https://images.unsplash.com/photo-1600585154526-990dced4db3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80', 
                                title: 'Villa Resort', 
                                category: 'komersial',
                                location: 'Lumajang, Jawa Timur'
                            },
                            { 
                                image: 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80', 
                                title: 'Kantor Modern Terbuka', 
                                category: 'komersial',
                                location: 'Probolinggo, Jawa Timur'
                            }
                        ]
                        .filter(item => activeTab === 'semua' || item.category === activeTab)
                        .map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                viewport={{ once: true, amount: 0.2 }}
                                className="group relative overflow-hidden bg-gray-100 rounded-sm cursor-pointer"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img 
                                        src={item.image} 
                                        alt={item.title} 
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">{item.title}</h3>
                                            <div className="flex items-center text-emerald-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                </svg>
                                                <span className="text-sm text-emerald-300/90">{item.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-md">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                        </svg>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                    
                    <div className="text-center mt-12">
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true, amount: 0.8 }}
                        >
                            <a 
                                href="/portfolio" 
                                className="inline-flex items-center px-8 py-3 bg-white border border-emerald-500 text-emerald-600 rounded-sm font-medium hover:bg-emerald-50 transition-colors"
                            >
                                <span>Lihat Semua Proyek</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Before-After Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <div className="inline-block mb-3">
                            <div className="px-4 py-1 bg-emerald-50 border-l-2 border-emerald-500 rounded-r-sm">
                                <h5 className="text-emerald-700 uppercase tracking-widest text-sm font-semibold">Transformasi</h5>
                            </div>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-6">Sebelum & Sesudah</h2>
                        <p className="text-gray-600 leading-relaxed">Lihat bagaimana kami mengubah ruang biasa menjadi karya seni arsitektur yang luar biasa.</p>
                    </motion.div>
                    
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                    >
                        <div className="max-w-4xl mx-auto bg-white p-4 rounded-sm shadow-xl">
                            <div className="relative h-[500px] overflow-hidden">
                                {/* Before Image */}
                                <img 
                                    src="https://images.unsplash.com/photo-1598928636135-d146006ff4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                                    alt="Before renovation" 
                                    className="absolute inset-0 w-full h-full object-cover"
                                />
                                
                                {/* After Image - clipped with CSS */}
                                <div 
                                    className="absolute inset-0 overflow-hidden" 
                                    style={{ width: `${beforeAfterPosition}%` }}
                                >
                                    <img 
                                        src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                                        alt="After renovation" 
                                        className="absolute inset-0 w-full h-full object-cover"
                                        style={{ width: `${100 / (beforeAfterPosition/100)}%` }}
                                    />
                                </div>
                                
                                {/* Slider Control */}
                                <div 
                                    className="absolute inset-y-0" 
                                    style={{ left: `${beforeAfterPosition}%` }}
                                >
                                    <div className="absolute inset-y-0 w-0.5 bg-white"></div>
                                    <div 
                                        className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 h-10 w-10 bg-white rounded-full flex items-center justify-center shadow-lg cursor-pointer border-4 border-emerald-500"
                                        onMouseDown={(e) => {
                                            // Prevent default behavior to avoid text selection
                                            e.preventDefault();
                                            
                                            // Get container dimensions
                                            const container = e.currentTarget.closest('.relative');
                                            if (!container) return;
                                            
                                            const containerRect = container.getBoundingClientRect();
                                            
                                            // Function to handle mouse movement
                                            const handleMouseMove = (e: MouseEvent) => {
                                                const containerWidth = containerRect.width;
                                                const mouseX = e.clientX - containerRect.left;
                                                const newPosition = Math.max(0, Math.min(100, (mouseX / containerWidth) * 100));
                                                setBeforeAfterPosition(newPosition);
                                            };
                                            
                                            // Function to remove event listeners when done
                                            const handleMouseUp = () => {
                                                document.removeEventListener('mousemove', handleMouseMove);
                                                document.removeEventListener('mouseup', handleMouseUp);
                                            };
                                            
                                            // Add event listeners for drag operation
                                            document.addEventListener('mousemove', handleMouseMove);
                                            document.addEventListener('mouseup', handleMouseUp);
                                        }}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                        </svg>
                                    </div>
                                </div>
                                
                                {/* Labels */}
                                <div className="absolute bottom-4 left-4 bg-black/70 text-white px-4 py-2 rounded-sm">
                                    <span className="font-medium">Sebelum</span>
                                </div>
                                <div className="absolute bottom-4 right-4 bg-emerald-600/90 text-white px-4 py-2 rounded-sm">
                                    <span className="font-medium">Sesudah</span>
                                </div>
                            </div>
                            
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">Renovasi Rumah Tipe 45</h3>
                                <p className="text-gray-600">Transformasi rumah tipe 45 menjadi hunian modern minimalis dengan perluasan lantai atas dan penyesuaian fasad untuk tampilan yang lebih segar dan kontemporer.</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
            
            {/* FAQ Section */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <div className="inline-block mb-3">
                            <div className="px-4 py-1 bg-emerald-50 border-l-2 border-emerald-500 rounded-r-sm">
                                <h5 className="text-emerald-700 uppercase tracking-widest text-sm font-semibold">FAQ</h5>
                            </div>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-6">Pertanyaan yang Sering Diajukan</h2>
                        <p className="text-gray-600 leading-relaxed">Temukan jawaban atas pertanyaan umum tentang layanan desain dan konstruksi kami.</p>
                    </motion.div>
                    
                    <div className="max-w-3xl mx-auto">
                        {[
                            {
                                question: "Bagaimana proses konsultasi dan perencanaan proyek?",
                                answer: "Proses dimulai dengan konsultasi awal untuk memahami kebutuhan dan harapan Anda. Kemudian kami akan membuat konsep desain awal dan estimasi biaya. Setelah persetujuan, kami akan mengembangkan desain lengkap, membuat RAB, dan memulai proses konstruksi yang diawasi oleh tim profesional kami."
                            },
                            {
                                question: "Berapa lama waktu yang dibutuhkan untuk menyelesaikan proyek?",
                                answer: "Durasi proyek bervariasi tergantung pada ukuran dan kompleksitas. Proyek renovasi kecil bisa memakan waktu 1-2 bulan, sedangkan pembangunan rumah baru biasanya membutuhkan waktu 6-12 bulan. Kami selalu memberikan timeline yang jelas dan realistis di awal proyek."
                            },
                            {
                                question: "Apakah Arsitekta menyediakan jasa desain interior?",
                                answer: "Ya, kami menyediakan layanan desain interior lengkap. Tim desainer interior kami akan bekerja sama dengan arsitek untuk menciptakan ruangan yang tidak hanya fungsional tetapi juga estetis dan mencerminkan gaya hidup Anda."
                            },
                            {
                                question: "Bagaimana sistem pembayaran untuk proyek?",
                                answer: "Kami menggunakan sistem pembayaran bertahap yang disesuaikan dengan progress pekerjaan. Biasanya terbagi menjadi 4-5 termin pembayaran, dimulai dengan down payment saat penandatanganan kontrak hingga pembayaran akhir setelah proyek selesai dan serah terima."
                            },
                            {
                                question: "Apakah Arsitekta mengurus perizinan bangunan?",
                                answer: "Ya, kami menyediakan layanan pengurusan izin bangunan (IMB) dan dokumen perizinan lainnya yang diperlukan. Tim kami berpengalaman dalam menangani birokrasi dan akan memastikan proyek Anda memenuhi semua persyaratan hukum dan teknis."
                            }
                        ].map((faq, index) => (
                            <motion.div 
                                key={index}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true, amount: 0.8 }}
                                className="mb-4"
                            >
                                <div 
                                    className={`p-6 bg-white rounded-sm shadow-sm cursor-pointer ${activeFaq === index ? 'border-l-4 border-emerald-500' : ''}`}
                                    onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                                >
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-lg font-bold text-gray-900">{faq.question}</h3>
                                        <span className={`transition-transform duration-300 ${activeFaq === index ? 'rotate-180' : ''}`}>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                            </svg>
                                        </span>
                                    </div>
                                    
                                    <motion.div 
                                        initial={false}
                                        animate={{
                                            height: activeFaq === index ? 'auto' : 0,
                                            opacity: activeFaq === index ? 1 : 0,
                                            marginTop: activeFaq === index ? 16 : 0
                                        }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-gray-600">{faq.answer}</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
            
            {/* Secondary CTA */}
            <section className="py-24 bg-emerald-700 bg-[url('https://images.unsplash.com/photo-1635425642158-f0d2a775e55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')] bg-cover bg-center bg-blend-multiply relative">
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-900/90 to-emerald-700/80"></div>
                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <motion.h2 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="text-3xl lg:text-4xl font-serif font-bold mb-8"
                        >
                            Wujudkan Rumah Impian Anda Bersama Arsitekta
                        </motion.h2>
                        
                        <motion.p 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="text-lg text-emerald-50 mb-10"
                        >
                            Konsultasikan kebutuhan proyek Anda dengan tim profesional kami. Dapatkan penawaran spesial untuk proyek yang dimulai bulan ini.
                        </motion.p>
                        
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <a 
                                href="#contact" 
                                className="px-8 py-4 bg-white text-emerald-700 font-medium rounded-sm hover:bg-emerald-50 transition-colors shadow-md hover:shadow-lg inline-flex items-center justify-center w-full sm:w-auto"
                            >
                                <span>Dapatkan Penawaran Gratis</span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </a>
                            <a 
                                href="tel:+6281234567890" 
                                className="px-8 py-4 bg-transparent text-white font-medium rounded-sm border border-white hover:bg-white/10 transition-colors inline-flex items-center justify-center w-full sm:w-auto"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.716 3 6V5z" />
                                </svg>
                                <span>Hubungi Kami</span>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Information */}
            <section className="py-24 bg-white" id="contact">
                <div className="container mx-auto px-6">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className="text-center max-w-3xl mx-auto mb-16"
                    >
                        <div className="inline-block mb-3">
                            <div className="px-4 py-1 bg-emerald-50 border-l-2 border-emerald-500 rounded-r-sm">
                                <h5 className="text-emerald-700 uppercase tracking-widest text-sm font-semibold">Hubungi Kami</h5>
                            </div>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-serif font-bold text-gray-900 mb-6">Kami Siap Membantu Anda</h2>
                        <p className="text-gray-600 leading-relaxed">Kami percaya bahwa komunikasi yang efektif adalah kunci untuk menciptakan proyek yang sukses. Silakan hubungi kami untuk konsultasi atau pertanyaan lebih lanjut.</p>
                    </motion.div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="bg-white p-8 rounded-sm shadow-md"
                        >
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Informasi Kontak</h3>
                            <ul>
                                <li className="text-gray-600 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                    <span>Alamat: Jl. Raya Jember, No. 123, Jember, Jawa Timur</span>
                                </li>
                                <li className="text-gray-600 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.716 3 6V5z" />
                                    </svg>
                                    <span>Telepon: +62 812 3456 7890</span>
                                </li>
                                <li className="text-gray-600 mb-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>Email: [info@arsitekta.com](mailto:info@arsitekta.com)</span>
                                </li>
                            </ul>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="bg-white p-8 rounded-sm shadow-md"
                        >
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Formulir Kontak</h3>
                            <form>
                                <div className="mb-4">
                                    <label className="block text-gray-600 mb-2" htmlFor="name">Nama</label>
                                    <input 
                                        type="text" 
                                        id="name" 
                                        className="w-full p-3 bg-gray-100 rounded-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-600 mb-2" htmlFor="email">Email</label>
                                    <input 
                                        type="email" 
                                        id="email" 
                                        className="w-full p-3 bg-gray-100 rounded-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label className="block text-gray-600 mb-2" htmlFor="message">Pesan</label>
                                    <textarea 
                                        id="message" 
                                        rows={5} 
                                        className="w-full p-3 bg-gray-100 rounded-sm border border-gray-200 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-emerald-600"
                                    />
                                </div>
                                <button 
                                    type="submit" 
                                    className="px-8 py-3 bg-emerald-600 text-white font-medium rounded-sm hover:bg-emerald-700 transition-colors"
                                >
                                    Kirim Pesan
                                </button>
                            </form>
                        </motion.div>
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            viewport={{ once: true, amount: 0.5 }}
                            className="bg-white p-8 rounded-sm shadow-md"
                        >
                            <h3 className="text-lg font-bold text-gray-900 mb-4">Lokasi Kami</h3>
                            <div className="h-64 overflow-hidden rounded-sm">
                                <iframe 
                                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3951.842237340766!2d113.71825341428633!3d-8.174737394532955!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd69528b8a6f5b3%3A0x401a1f3a7b3e490!2sJl.%20Raya%20Jember%2C%20No.%20123%2C%20Jember%2C%20Jawa%20Timur!5e0!3m2!1sid!2sid!4v1641954333426!5m2!1sid!2sid" 
                                    frameBorder="0" 
                                    allowFullScreen 
                                    loading="lazy" 
                                    className="w-full h-full"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </>
    );
}
