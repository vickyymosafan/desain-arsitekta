import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';

// Slider images - using Laravel's storage paths
const sliderImages = [
    {
        url: "/storage/images/hero/house1.jpg",
        alt: "Modern House Design"
    },
    {
        url: "/storage/images/hero/house2.jpg",
        alt: "Luxury Home Exterior"
    },
    {
        url: "/storage/images/hero/house3.jpg",
        alt: "Contemporary Architecture"
    }
];

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Auto-slide functionality
    useEffect(() => {
        const interval = setInterval(() => {
            if (!isAnimating) {
                setIsAnimating(true);
                setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
                setTimeout(() => setIsAnimating(false), 500); // Match this with transition duration
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [isAnimating]);

    const goToSlide = (index: number) => {
        if (!isAnimating) {
            setIsAnimating(true);
            setCurrentSlide(index);
            setTimeout(() => setIsAnimating(false), 500); // Match with transition duration
        }
    };

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Full-width image slider */}
            <div className="absolute inset-0 z-0">
                {sliderImages.map((image, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 h-full w-full transition-opacity duration-500 ${currentSlide === index ? 'opacity-100' : 'opacity-0'}`}
                    >
                        <img
                            src={image.url}
                            alt={image.alt}
                            className="h-full w-full object-cover"
                        />
                    </div>
                ))}
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex h-full items-center">
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="font-playfair text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl mb-6">
                            Wujudkan Rumah <span className="text-emerald-400">Impian Anda</span> Bersama Kami
                        </h1>
                        <p className="mb-8 text-lg text-gray-200">
                            Kami memberikan solusi terbaik untuk kebutuhan desain dan konstruksi bangunan Anda dengan pendekatan modern dan berkelanjutan.
                        </p>
                        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                            <Link
                                href="#"
                                className="rounded-md bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-lg transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                            >
                                Konsultasi Sekarang
                            </Link>
                            <Link
                                href="#"
                                className="rounded-md border border-white px-6 py-3 text-base font-medium text-white transition hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                            >
                                Lihat Portofolio
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Slider navigation dots */}
            <div className="absolute bottom-8 left-0 right-0 z-10">
                <div className="flex justify-center gap-2">
                    {sliderImages.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`h-2.5 w-2.5 rounded-full transition-all ${currentSlide === index ? 'bg-white w-8' : 'bg-white/50'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        ></button>
                    ))}
                </div>
            </div>
        </section>
    );
}
