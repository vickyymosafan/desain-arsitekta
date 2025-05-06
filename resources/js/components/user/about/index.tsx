import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function AboutSection() {
    const [isVisible, setIsVisible] = useState(false);
    const [activeValue, setActiveValue] = useState(0);
    const [isHovering, setIsHovering] = useState(false);

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const valueItem = {
        hidden: { opacity: 0, y: 15 },
        visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
    };

    const experienceBadge = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: { 
            scale: 1, 
            opacity: 1, 
            transition: { 
                delay: 0.5, 
                type: 'spring', 
                stiffness: 100 
            } 
        }
    };

    // Floating animation for background elements
    const floatingAnimation = {
        y: [0, -15, 0],
        transition: {
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut'
        }
    };

    // Values data
    const values = [
        {
            title: 'Inovatif',
            description: 'Solusi desain modern',
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        },
        {
            title: 'Efisien',
            description: 'Penggunaan ruang optimal',
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        },
        {
            title: 'Kustom',
            description: 'Desain yang personal',
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
        },
        {
            title: 'Berkelanjutan',
            description: 'Desain ramah lingkungan',
            icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        }
    ];

    // Intersection Observer to trigger animations when section is in view
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                setIsVisible(true);
            }
        }, { threshold: 0.1 });

        const section = document.querySelector('#about-section');
        if (section) observer.observe(section);

        // Auto-rotate through values
        const interval = setInterval(() => {
            if (!isHovering) {
                setActiveValue((prev) => (prev + 1) % values.length);
            }
        }, 3000);

        return () => {
            if (section) observer.unobserve(section);
            clearInterval(interval);
        };
    }, [isHovering]);

    return (
        <section id="about-section" className="min-h-screen flex items-center relative overflow-hidden py-16 md:py-24">
            {/* Dynamic background elements */}
            <motion.div 
                animate={floatingAnimation}
                className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
            ></motion.div>
            <motion.div 
                animate={{
                    ...floatingAnimation,
                    transition: { ...floatingAnimation.transition, delay: 1 }
                }}
                className="absolute -top-20 -left-20 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"
            ></motion.div>
            
            {/* Decorative elements */}
            <div className="absolute right-0 top-1/3 w-32 h-32 bg-emerald-800/5 backdrop-blur-sm rounded-full"></div>
            <div className="absolute left-10 bottom-10 w-20 h-20 border border-emerald-500/20 rounded-full"></div>
            
            <div className="container mx-auto px-4 py-10">
                <motion.div 
                    initial="hidden" 
                    animate={isVisible ? "visible" : "hidden"}
                    variants={fadeIn}
                    className="mb-12 text-center"
                >
                    <h2 className="mb-2 text-emerald-500 text-sm font-bold tracking-widest uppercase inline-flex items-center">
                        <span className="mr-2 h-px w-6 bg-emerald-500"></span>
                        Tentang Kami
                        <span className="ml-2 h-px w-6 bg-emerald-500"></span>
                    </h2>
                    <h3 className="mb-6 text-4xl md:text-5xl font-playfair font-bold text-white">
                        <span className="text-emerald-500 relative">
                            Antosa Architect
                            <span className="absolute -bottom-2 left-0 w-full h-1 bg-emerald-500/30"></span>
                        </span>
                    </h3>
                    <p className="max-w-3xl mx-auto text-gray-300 text-lg leading-relaxed">
                        Tim arsitek profesional dengan fokus pada desain yang memadukan estetika, fungsi, dan keberlanjutan untuk menciptakan ruang impian Anda.
                    </p>
                </motion.div>

                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
                    {/* Left Column - Image & Experience */}
                    <motion.div 
                        initial="hidden" 
                        animate={isVisible ? "visible" : "hidden"}
                        variants={fadeIn}
                        className="w-full lg:w-1/2 relative"
                    >
                        <div className="rounded-xl overflow-hidden shadow-2xl shadow-emerald-900/30 relative z-10 group">
                            <img 
                                src="/storage/images/hero/2.webp" 
                                alt="Tim Antosa Architect" 
                                className="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            {/* Overlay gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70 transition-opacity duration-300 group-hover:opacity-50"></div>
                        </div>
                        
                        {/* Decorative elements */}
                        <motion.div animate={floatingAnimation} className="absolute -bottom-6 -right-6 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl"></motion.div>
                        <motion.div 
                            animate={{
                                ...floatingAnimation,
                                transition: { ...floatingAnimation.transition, delay: 0.5 }
                            }}
                            className="absolute -top-6 -left-6 w-32 h-32 bg-emerald-500/30 rounded-full blur-3xl"
                        ></motion.div>
                        
                        {/* Experience badge */}
                        <motion.div 
                            variants={experienceBadge}
                            initial="hidden" 
                            animate={isVisible ? "visible" : "hidden"}
                            whileHover={{ scale: 1.05 }}
                            className="absolute -right-5 bottom-20 bg-black border border-emerald-500/20 shadow-xl rounded-lg py-4 px-6 z-20"
                        >
                            <div className="text-center">
                                <span className="block text-5xl font-bold text-emerald-500 tracking-tight">15+</span>
                                <span className="block text-sm uppercase tracking-wider font-medium text-gray-400">Tahun Pengalaman</span>
                            </div>
                        </motion.div>
                    </motion.div>
                    
                    {/* Right Column - Content */}
                    <motion.div 
                        initial="hidden" 
                        animate={isVisible ? "visible" : "hidden"}
                        variants={fadeIn}
                        className="w-full lg:w-1/2"
                    >
                        <h4 className="text-2xl md:text-3xl font-playfair font-bold text-white mb-5">
                            Mewujudkan Visi Arsitektur <span className="text-emerald-500">Modern & Berkelanjutan</span>
                        </h4>
                        
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            className="text-gray-300 mb-4 leading-relaxed"
                        >
                            Didirikan pada tahun 2008, Antosa Architect telah menjadi studio desain terkemuka yang menangani berbagai proyek arsitektur dan interior di seluruh Indonesia. Dengan tim yang terdiri dari arsitek berpengalaman dan desainer berbakat, kami berkomitmen untuk memberikan solusi desain yang tidak hanya indah secara visual tetapi juga fungsional dan berkelanjutan.
                        </motion.p>
                        
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="text-gray-300 mb-8 leading-relaxed"
                        >
                            Kami percaya bahwa arsitektur yang baik harus mencerminkan kebutuhan dan kepribadian klien, sambil tetap memperhatikan konteks lingkungan dan sosial. Setiap proyek kami, mulai dari rumah hunian hingga bangunan komersial, dirancang dengan perhatian mendalam terhadap detail dan kualitas.
                        </motion.p>
                        
                        {/* Core Values - Interactive */}
                        <motion.div 
                            variants={staggerContainer}
                            initial="hidden" 
                            animate={isVisible ? "visible" : "hidden"}
                            className="grid grid-cols-2 gap-5 mb-8"
                            onMouseEnter={() => setIsHovering(true)}
                            onMouseLeave={() => setIsHovering(false)}
                        >
                            {values.map((value, index) => (
                                <motion.div 
                                    key={index}
                                    variants={valueItem}
                                    whileHover={{ scale: 1.05 }}
                                    className={`flex items-start p-4 rounded-lg cursor-pointer transition-all duration-300 ${activeValue === index ? 'bg-emerald-500/20 shadow-lg' : 'hover:bg-emerald-500/10'}`}
                                    onClick={() => setActiveValue(index)}
                                >
                                    <div className={`mr-4 p-3 rounded-lg transition-colors duration-300 ${activeValue === index ? 'bg-emerald-500 text-white' : 'bg-emerald-500/10 text-emerald-500'}`}>
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            {value.icon}
                                        </svg>
                                    </div>
                                    <div>
                                        <h5 className="font-bold text-white">{value.title}</h5>
                                        <p className="text-sm text-gray-400">{value.description}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                        
                        {/* CTA Button - Animated */}
                        <motion.a 
                            href="#contact" 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center py-3 px-7 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 relative overflow-hidden group"
                        >
                            <span className="absolute inset-0 w-0 bg-white transition-all duration-500 ease-out opacity-20 group-hover:w-full"></span>
                            <span className="relative flex items-center">
                                Konsultasi Sekarang
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </span>
                        </motion.a>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
