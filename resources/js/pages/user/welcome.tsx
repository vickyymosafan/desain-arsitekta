import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { lazy, Suspense, useState, useEffect } from 'react';
import Navbar from '@/components/user/navbar';
import { ConsultationProvider } from '@/contexts/ConsultationContext';
import { 
    animationVariants, 
    createAnimationProps,
    SPACING, 
    Z_INDICES, 
    transitions, 
    containerVariants, 
    itemVariants 
} from '@/utils';
import { motion } from 'framer-motion';

// Lazy load components with explicit path resolution to avoid TypeScript module errors
const HeroSection = lazy(() => import('@/components/user/hero/content/HeroSection'));
// Use a more reliable dynamic import approach with explicit chunk naming
const ServicesAchievementsSection = lazy(() => {
    return import(/* webpackChunkName: 'services-achievements' */ '@/components/user/services-achievements/ServicesAchievementsSection');
});
const AboutSection = lazy(() => import('@/components/user/about/AboutSection'));
const PortfolioSection = lazy(() => import('@/components/user/portfolio/PortfolioSection'));
const BeforeAfterSection = lazy(() => import('@/components/user/before-after/BeforeAfterSection'));
const TestimonialsSection = lazy(() => import('@/components/user/testimonials/TestimonialsSection'));
const FAQSection = lazy(() => import('@/components/user/faq/FAQSection'));
const ContactSection = lazy(() => import('@/components/user/contact/ContactSection'));

// Loading spinner component
const LoadingSpinner = ({ minHeight = '50vh' }: { minHeight?: string }) => (
    <div style={{ minHeight }} className="flex items-center justify-center">
        <div className="animate-pulse w-12 h-12 rounded-full bg-emerald-300/40"></div>
    </div>
);

// Section wrapper component with animation support
interface SectionWrapperProps {
    id: string;
    className?: string;
    fullScreen?: boolean;
    children: React.ReactNode;
}

const SectionWrapper = ({ id, className = '', fullScreen = false, children }: SectionWrapperProps) => {
    // Check if this section is targeted by the URL hash
    const [isActive, setIsActive] = useState(false);
    
    useEffect(() => {
        // Initial check
        setIsActive(window.location.hash === `#${id}`);
        
        // Listen for hash changes
        const handleHashChange = () => {
            setIsActive(window.location.hash === `#${id}`);
        };
        
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [id]);
    
    return (
        <motion.section
            id={id}
            className={`section-wrapper ${fullScreen ? 'min-h-screen' : ''} ${className}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-20%" }}
            variants={containerVariants}
        >
            {children}
        </motion.section>
    );
};

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

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
            
            <Navbar user={auth.user} />
            
            <div className="flex flex-col min-h-screen bg-black">
                <main>
                    {/* Hero Section - Wrapped in ConsultationProvider for direct date picker integration */}
                    <SectionWrapper id="home">
                        <Suspense fallback={<LoadingSpinner minHeight="100vh" />}>
                            <ConsultationProvider initialConsultations={[]}>
                                <HeroSection />
                            </ConsultationProvider>
                        </Suspense>
                    </SectionWrapper>
                    
                    {/* Services and Achievements Section (fullscreen) */}
                    <SectionWrapper id="services" fullScreen={true} className="bg-black text-white">
                        <Suspense fallback={<LoadingSpinner />}>
                            <ServicesAchievementsSection />
                        </Suspense>
                    </SectionWrapper>
                    
                    {/* About Section */}
                    <SectionWrapper id="about" className="bg-gradient-to-b from-black to-gray-900 text-white">
                        <Suspense fallback={<LoadingSpinner />}>
                            <AboutSection />
                        </Suspense>
                    </SectionWrapper>
                    
                    {/* Portfolio Section */}
                    <SectionWrapper id="portfolio" className="bg-gray-900 text-white">
                        <Suspense fallback={<LoadingSpinner />}>
                            <PortfolioSection />
                        </Suspense>
                    </SectionWrapper>
                    
                    {/* Before-After Transformation Section */}
                    <SectionWrapper id="transformations" className="bg-gray-950 text-white">
                        <Suspense fallback={<LoadingSpinner />}>
                            <BeforeAfterSection />
                        </Suspense>
                    </SectionWrapper>
                    
                    {/* Testimonials Section */}
                    <SectionWrapper id="testimonials" className="bg-gradient-to-b from-gray-950 to-gray-900 text-white">
                        <Suspense fallback={<LoadingSpinner />}>
                            <TestimonialsSection />
                        </Suspense>
                    </SectionWrapper>
                    
                    {/* FAQ Section */}
                    <SectionWrapper id="faq" className="bg-gray-950 text-white">
                        <Suspense fallback={<LoadingSpinner />}>
                            <FAQSection />
                        </Suspense>
                    </SectionWrapper>
                    
                    {/* Contact Section */}
                    <SectionWrapper id="contact" className="bg-gradient-to-b from-gray-900 to-black text-white">
                        <Suspense fallback={<LoadingSpinner />}>
                            <ContactSection />
                        </Suspense>
                    </SectionWrapper>
                </main>
                
                {/* Footer */}
                <footer className="bg-black text-gray-400 py-8 px-4 md:px-8 border-t border-gray-800">
                    <div className="container mx-auto text-center">
                        <p>&copy; {new Date().getFullYear()} Arsitekta. Hak Cipta Dilindungi.</p>
                        <div className="mt-2 text-sm">
                            <a href="#" className="hover:text-emerald-400 transition-colors mx-2">Syarat & Ketentuan</a>
                            <a href="#" className="hover:text-emerald-400 transition-colors mx-2">Kebijakan Privasi</a>
                            <a href="#" className="hover:text-emerald-400 transition-colors mx-2">Peta Situs</a>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
