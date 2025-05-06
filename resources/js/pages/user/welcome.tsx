import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { lazy, Suspense, useEffect, useState } from 'react';
import Navbar from '@/components/user/navbar/index';
import { NavItem } from '@/components/user/navbar';

// Lazy load components
const HeroSection = lazy(() => import('@/components/user/hero/index'));
const FeaturesSection = lazy(() => import('@/components/user/servicesstat/index'));

// Loading spinner component
const LoadingSpinner = ({ minHeight = '50vh' }: { minHeight?: string }) => (
    <div style={{ minHeight }} className="flex items-center justify-center">
        <div className="animate-pulse w-12 h-12 rounded-full bg-emerald-300/40"></div>
    </div>
);

// Navigation items yang sama dengan yang digunakan di NavbarSection
const navItems: NavItem[] = [
    { href: '#', label: 'Beranda', icon: 'fa-home' },
    { href: '#services', label: 'Layanan', icon: 'fa-tools' },
    { href: '#portfolio', label: 'Portofolio', icon: 'fa-image' },
    { href: '#blog', label: 'Blog', icon: 'fa-newspaper' },
    { href: '#contact', label: 'Kontak', icon: 'fa-envelope' }
];

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [activeSection, setActiveSection] = useState<string>('#');
    
    // Mendeteksi section yang aktif saat scroll
    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + 100; // Offset untuk header
            
            // Default section adalah home ketika di bagian paling atas
            if (scrollPosition < 300) {
                setActiveSection('#');
                return;
            }
            
            // Cek setiap section berdasarkan ID yang sesuai dengan navItems href
            for (const item of navItems) {
                if (item.href === '#') continue; // Skip home section
                
                const sectionId = item.href.replace('#', '');
                const section = document.getElementById(sectionId);
                
                if (section) {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.offsetHeight;
                    
                    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                        setActiveSection(item.href);
                        break;
                    }
                }
            }
        };
        
        window.addEventListener('scroll', handleScroll);
        // Panggil sekali untuk setup awal
        handleScroll();
        
        return () => window.removeEventListener('scroll', handleScroll);
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
                    <section id="home" className="section-wrapper">
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
