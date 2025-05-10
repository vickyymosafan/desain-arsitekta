import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { lazy, Suspense, useEffect, useState, useRef } from 'react';
import Navbar from '@/components/user/navbar';
import ReactFullpage from '@fullpage/react-fullpage';
// Import the core fullPagejs for TypeScript definition
import 'fullpage.js/dist/fullpage.css';

// Lazy load components
const HeroSection = lazy(() => import('@/components/user/hero/index'));
const FeaturesSection = lazy(() => import('@/components/user/servicesstat/index'));
const AboutSection = lazy(() => import('@/components/user/about/index'));
const WhyChooseAntosaSection = lazy(() => import('@/components/user/whychooseantosa/index'));

// Loading spinner component
const LoadingSpinner = ({ minHeight = '50vh' }: { minHeight?: string }) => (
    <div style={{ minHeight }} className="flex items-center justify-center">
        <div className="animate-pulse w-12 h-12 rounded-full bg-emerald-300/40"></div>
    </div>
);

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;
    const [currentAnchor, setCurrentAnchor] = useState('');
    const [initialLoad, setInitialLoad] = useState(true);
    const [fullpageLoaded, setFullpageLoaded] = useState(false);
    const fpRef = useRef<any>(null);

    // Handle hash navigation on initial load
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash?.substring(1) || 'home';
            if (hash && initialLoad) {
                setCurrentAnchor(hash);
                setInitialLoad(false);
            }
        };

        // Initial check
        handleHashChange();

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, [initialLoad]);
    
    // Ensure fullpage is properly loaded
    useEffect(() => {
        // Allow a small delay for components to load before initializing fullpage
        setTimeout(() => setFullpageLoaded(true), 500);
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
                <style>{`
                    /* Customize fullpage.js navigation dots */
                    #fp-nav ul li a span, 
                    .fp-slidesNav ul li a span {
                        background-color: rgba(16, 185, 129, 0.8) !important;
                    }
                    
                    /* Make sections take full height */
                    .fp-section, .fp-tableCell {
                        height: 100vh !important;
                    }

                    /* Override fullpage.js scrollbar styling */
                    .fp-overflow {
                        overflow: hidden;
                    }
                `}</style>
            </Head>
            
            <Navbar user={auth.user} />
            
            {fullpageLoaded ? (
                <ReactFullpage
                    // Using simplified configuration to avoid conflicts
                    licenseKey={''} // Open source version
                    scrollingSpeed={800}
                    anchors={['home', 'services', 'about', 'whychooseantosa']}
                    navigation={true}
                    navigationPosition={'right'}
                    navigationTooltips={['Home', 'Services', 'About', 'Why Choose Us']}
                    showActiveTooltip={true}
                    scrollOverflow={false} // Changed to false to avoid potential issues
                    credits={{ enabled: false }} // Disable credits to fix potential styling issues
                    normalScrollElements='.navbar'
                    onLeave={(origin, destination) => {
                        // Update URL hash without triggering a new navigation
                        const newHash = destination.anchor;
                        if (newHash && newHash !== currentAnchor) {
                            setCurrentAnchor(typeof newHash === 'string' ? newHash : String(newHash));
                            const newUrl = window.location.pathname + '#' + newHash;
                            window.history.replaceState(null, '', newUrl);
                        }
                    }}
                    render={({ state, fullpageApi }) => {
                        return (
                            <>
                                <div className="section bg-black" data-anchor="home">
                                    <Suspense fallback={<LoadingSpinner minHeight="100vh" />}>
                                        <HeroSection />
                                    </Suspense>
                                </div>
                                
                                <div className="section bg-black" data-anchor="services">
                                    <Suspense fallback={<LoadingSpinner minHeight="100vh" />}>
                                        <FeaturesSection />
                                    </Suspense>
                                </div>
                                
                                <div className="section bg-black" data-anchor="about">
                                    <Suspense fallback={<LoadingSpinner minHeight="100vh" />}>
                                        <AboutSection />
                                    </Suspense>
                                </div>

                                <div className="section bg-black" data-anchor="whychooseantosa">
                                    <Suspense fallback={<LoadingSpinner minHeight="100vh" />}>
                                        <WhyChooseAntosaSection />
                                    </Suspense>
                                </div>
                            </>
                        );
                    }}
                />
            ) : (
                // Show loading indicator while fullpage.js initializes
                <div className="min-h-screen bg-black flex items-center justify-center">
                    <LoadingSpinner minHeight="100vh" />
                </div>
            )}
        </>
    );
}
