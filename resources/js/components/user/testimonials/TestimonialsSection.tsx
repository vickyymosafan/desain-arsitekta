import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    animationVariants, 
    createAnimationProps, 
    transitions,
    getSlideAnimationStyle
} from '@/utils';
import TestimonialCard from './TestimonialCard';
import TestimonialControls from './TestimonialControls';

// Testimonials data
const testimonials = [
    {
        id: 1,
        name: 'Budi Santoso',
        role: 'CEO, PT Maju Bersama',
        avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
        content: 'Kerjasama dengan Arsitekta dalam membangun kantor kami memberikan hasil yang luar biasa. Tim mereka tidak hanya memahami kebutuhan kami tetapi juga memberikan solusi inovatif yang melampaui ekspektasi.',
        rating: 5,
        project: 'Green Office Tower'
    },
    {
        id: 2,
        name: 'Dewi Anggraini',
        role: 'Pemilik, Harmony Cafe',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
        content: 'Desain kafe yang dihasilkan Arsitekta berhasil menarik banyak pengunjung baru. Perpaduan estetika dan fungsionalitas sangat tepat sasaran dan mencerminkan visi kami sempurna.',
        rating: 5,
        project: 'Harmony Cafe'
    },
    {
        id: 3,
        name: 'Rudi Hartono',
        role: 'Homeowner',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&q=80',
        content: 'Renovasi rumah kami dilakukan dengan sangat profesional. Arsitekta mengubah konsep yang kami inginkan menjadi kenyataan, dengan detail yang sempurna dan dalam anggaran yang telah disepakati.',
        rating: 4,
        project: 'Zen House Renovation'
    },
    {
        id: 4,
        name: 'Maya Wijaya',
        role: 'Direktur, Natura Living',
        avatar: '/assets/images/testimonials/maya.jpg',
        content: 'Kolaborasi dengan Arsitekta menghasilkan villa eksklusif yang menjadi kebanggaan perusahaan kami. Pendekatan berkelanjutan dan perhatian mereka terhadap lingkungan sekitar sangat kami apresiasi.',
        rating: 5,
        project: 'Villa Serenity'
    },
];

const TestimonialsSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [direction, setDirection] = useState(0); // -1 for left, 1 for right, 0 for initial
    const [autoplay, setAutoplay] = useState(true);

    // Handle next testimonial
    const nextTestimonial = () => {
        setDirection(1);
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    };

    // Handle previous testimonial
    const prevTestimonial = () => {
        setDirection(-1);
        setActiveIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length);
    };

    // Go to specific testimonial
    const goToTestimonial = (index: number) => {
        setDirection(index > activeIndex ? 1 : -1);
        setActiveIndex(index);
    };

    // Autoplay functionality
    useEffect(() => {
        if (!autoplay) return;

        const interval = setInterval(() => {
            nextTestimonial();
        }, 6000); // Change testimonial every 6 seconds

        return () => clearInterval(interval);
    }, [autoplay, activeIndex]);

    // Pause autoplay on hover
    const handleMouseEnter = () => setAutoplay(false);
    const handleMouseLeave = () => setAutoplay(true);

    return (
        <div 
            className="w-full min-h-screen py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-b from-gray-950 to-gray-900"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Section Header */}
            <motion.div 
                className="text-center mb-16 max-w-3xl mx-auto"
                {...createAnimationProps('fadeIn', 0.2)}
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-white mb-4">
                    Apa Kata Klien Kami
                </h2>
                <p className="text-gray-300 text-lg">
                    Testimoni dari klien yang telah mempercayakan proyeknya kepada Arsitekta.
                </p>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto">
                <div className="relative">
                    {/* Testimonial Carousel */}
                    <div className="relative h-[30rem] md:h-[25rem] overflow-hidden rounded-xl border border-emerald-800/30">
                        <AnimatePresence initial={false} custom={direction}>
                            <motion.div
                                key={activeIndex}
                                custom={direction}
                                variants={{
                                    enter: (direction) => ({
                                        x: direction > 0 ? '100%' : '-100%',
                                        opacity: 0
                                    }),
                                    center: {
                                        x: 0,
                                        opacity: 1
                                    },
                                    exit: (direction) => ({
                                        x: direction < 0 ? '100%' : '-100%',
                                        opacity: 0
                                    })
                                }}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{
                                    x: { type: 'spring', stiffness: 300, damping: 30 },
                                    opacity: { duration: 0.4 }
                                }}
                                className="absolute inset-0 flex items-center justify-center"
                            >
                                <TestimonialCard testimonial={testimonials[activeIndex]} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Controls */}
                    <div className="mt-8">
                        <TestimonialControls 
                            current={activeIndex} 
                            total={testimonials.length} 
                            onPrev={prevTestimonial} 
                            onNext={nextTestimonial} 
                            onSelect={goToTestimonial}
                            autoplay={autoplay}
                            onToggleAutoplay={() => setAutoplay(!autoplay)}
                        />
                    </div>
                </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/4 w-64 h-64 bg-emerald-700/10 rounded-full blur-3xl pointer-events-none"></div>

            {/* Call to Action */}
            <motion.div 
                className="mt-20 text-center"
                {...createAnimationProps('fadeIn', 0.8)}
            >
                <a 
                    href="#contact" 
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-emerald-600 border border-transparent rounded-md shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 group"
                >
                    <span>Jadilah Klien Kami Berikutnya</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </motion.div>
        </div>
    );
};

export default TestimonialsSection;
