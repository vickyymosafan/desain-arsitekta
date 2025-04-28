import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

export default function HeroSection() {
    const slides = [
        {
            id: 1,
            image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            alt: "Modern House Design"
        },
        {
            id: 2,
            image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80",
            alt: "Contemporary Home"
        },
        {
            id: 3,
            image: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
            alt: "Luxury Residence"
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    // Auto-advance slides
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
        }, 5000); // Change slide every 5 seconds

        return () => clearInterval(interval);
    }, [slides.length]);

    // Manual navigation
    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const goToPrevSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
    };

    const goToNextSlide = () => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    };

    return (
        <section className="pt-32 pb-20 px-4 md:pt-40 md:pb-28">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            Wujudkan Rumah <span className="text-emerald-600 dark:text-emerald-500">Impian Anda</span> Bersama Kami
                        </h1>
                        <p className="text-lg text-gray-700 mb-8 dark:text-gray-300">
                            Kami memberikan solusi terbaik untuk kebutuhan desain dan konstruksi bangunan Anda dengan pendekatan modern dan berkelanjutan.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="#"
                                className="rounded-md bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-lg transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                            >
                                Konsultasi Sekarang
                            </Link>
                            <Link
                                href="#"
                                className="rounded-md border border-emerald-600 px-6 py-3 text-base font-medium text-emerald-600 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:border-emerald-500 dark:text-emerald-500 dark:hover:bg-gray-900"
                            >
                                Lihat Portofolio
                            </Link>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <div className="relative">
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-emerald-200 rounded-full opacity-70 dark:opacity-40"></div>
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-300 rounded-full opacity-70 dark:opacity-40"></div>
                            
                            {/* Image Slider */}
                            <div className="relative overflow-hidden rounded-xl shadow-xl">
                                <div 
                                    className="flex transition-transform duration-500 ease-in-out" 
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                >
                                    {slides.map((slide) => (
                                        <img 
                                            key={slide.id}
                                            src={slide.image} 
                                            alt={slide.alt} 
                                            className="w-full h-auto min-w-full object-cover"
                                        />
                                    ))}
                                </div>
                                
                                {/* Navigation Arrows */}
                                <button 
                                    onClick={goToPrevSlide}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 focus:outline-none"
                                    aria-label="Previous slide"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                <button 
                                    onClick={goToNextSlide}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 p-2 rounded-full shadow-md hover:bg-white dark:hover:bg-gray-800 focus:outline-none"
                                    aria-label="Next slide"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                                
                                {/* Slide Indicators */}
                                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                                    {slides.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => goToSlide(index)}
                                            className={`w-2.5 h-2.5 rounded-full transition-colors ${
                                                index === currentSlide 
                                                    ? "bg-emerald-600 dark:bg-emerald-500" 
                                                    : "bg-gray-300 dark:bg-gray-600"
                                            }`}
                                            aria-label={`Go to slide ${index + 1}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
