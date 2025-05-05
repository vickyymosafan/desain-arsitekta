import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { lazy, Suspense, useEffect, useState, useRef } from 'react';
import Navbar from '@/components/user/navbar/index';

// Lazy load components
const HeroSection = lazy(() => import('@/components/user/hero/index'));
const FeaturesSection = lazy(() => import('@/components/user/features/index'));

// Loading spinner component
const LoadingSpinner = ({ minHeight = '50vh' }: { minHeight?: string }) => (
    <div style={{ minHeight }} className="flex items-center justify-center">
        <div className="animate-pulse w-12 h-12 rounded-full bg-emerald-300/40"></div>
    </div>
);

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [activeSection, setActiveSection] = useState<string>('#');
    
    // Reference untuk semua section
    const sectionsRef = useRef<HTMLElement[]>([]);
    
    // Mendeteksi section yang aktif saat scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100; // Offset untuk header
            
            // Temukan section yang sedang aktif
            for (const section of sectionsRef.current) {
                if (!section) continue;
                
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                
                if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                    setActiveSection(`#${section.id}`);
                    break;
                }
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        // Panggil sekali untuk setup awal
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // Efek untuk merefresh referensi section setelah render
    useEffect(() => {
        sectionsRef.current = Array.from(document.querySelectorAll('section[id]'));
    }, []);

    return (
        <>
            <Head title="Arsitekta - Jasa Desain dan Konstruksi Bangunan">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link 
                    href="https://fonts.bunny.net/css?family=nunito:400,500,600,700&family=playfair-display:700,800" 
                    rel="stylesheet" 
                />
                <meta 
                    name="description" 
                    content="Arsitekta - Jasa profesional untuk desain, konstruksi, dan renovasi bangunan dengan kualitas terbaik." 
                />
            </Head>
            
            <Navbar user={auth.user} activeLink={activeSection} />
            
            <div className="flex flex-col min-h-screen bg-black">
                <main>
                    <section id="" className="section-wrapper">
                        <Suspense fallback={<LoadingSpinner minHeight="100vh" />}>
                            <HeroSection />
                        </Suspense>
                    </section>
                    
                    <section id="services" className="section-wrapper">
                        <Suspense fallback={<LoadingSpinner minHeight="100vh" />}>
                            <FeaturesSection />
                        </Suspense>
                    </section>
                </main>
                
                {/* Simple footer to maintain layout structure */}
                {/* <footer className="mt-auto py-8 bg-black">
                    <div className="container mx-auto"></div>
                </footer> */}
            </div>
        </>
    );
}
