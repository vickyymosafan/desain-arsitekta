import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import StatItem from './StatItem';
import ServiceCard from './ServiceCard';
import { statsData, servicesData } from '../data/featuresData';

const FeaturesSection: React.FC = () => {
    const [scrollY, setScrollY] = useState(0);
    
    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };
        
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };
    
    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { 
                type: "spring", 
                stiffness: 100,
                damping: 10
            }
        }
    };
    
    return (
        <section className="min-h-screen bg-gradient-to-b from-black to-neutral-900 py-16 flex flex-col justify-center relative overflow-hidden">
            {/* Animated background particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(20)].map((_, i) => (
                    <div 
                        key={i}
                        className="absolute bg-emerald-500/10 rounded-full blur-xl"
                        style={{
                            top: `${Math.random() * 100}%`,
                            left: `${Math.random() * 100}%`,
                            width: `${30 + Math.random() * 70}px`,
                            height: `${30 + Math.random() * 70}px`,
                            opacity: 0.1 + Math.random() * 0.15,
                            transform: `translateY(${scrollY * (0.02 + Math.random() * 0.04)}px)`
                        }}
                    />
                ))}
            </div>
            
            <div className="container mx-auto px-4 relative z-10">
                {/* Stats Section */}
                <motion.div 
                    className="mb-24"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                >
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        {statsData.map((stat, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <StatItem 
                                    icon={stat.icon}
                                    count={stat.count}
                                    label={stat.label}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Services Section */}
                <div>
                    <motion.div 
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                        viewport={{ once: true, margin: "-100px" }}
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair text-white mb-4 relative">
                            <span className="relative inline-block">
                                <span className="absolute -top-6 -left-8 text-7xl text-emerald-500/10 font-playfair">"</span>
                                Layanan <span className="text-emerald-500 relative">
                                    Kami
                                    <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 100 15" width="100%" height="15">
                                        <path d="M0,7.5 Q25,15 50,7.5 Q75,0 100,7.5" fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round"/>
                                    </svg>
                                </span>
                                <span className="absolute -bottom-5 -right-8 text-7xl text-emerald-500/10 font-playfair">"</span>
                            </span>
                        </h2>
                        <motion.p 
                            className="text-neutral-300 max-w-2xl mx-auto font-nunito text-lg mb-10"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            Kami menyediakan berbagai layanan profesional untuk mewujudkan ruang impian Anda dengan kualitas terbaik
                        </motion.p>
                    </motion.div>
                    
                    <motion.div 
                        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-50px" }}
                    >
                        {servicesData.map((service, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <ServiceCard
                                    key={index}
                                    icon={service.icon}
                                    title={service.title}
                                    description={service.description}
                                    index={index}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
