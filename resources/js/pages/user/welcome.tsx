import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { lazy, Suspense } from 'react';
import Navbar from '@/components/user/navbar/index';

// Lazy load components
const HeroSection = lazy(() => import('@/components/user/hero/index'));
const ServicesSection = lazy(() => import('@/components/user/services/index'));

// Loading spinner component
const LoadingSpinner = ({ minHeight = '50vh' }: { minHeight?: string }) => (
    <div style={{ minHeight }} className="flex items-center justify-center">
        <div className="animate-pulse w-12 h-12 rounded-full bg-emerald-300/40"></div>
    </div>
);

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
            
            <main>
                <Suspense fallback={<LoadingSpinner minHeight="50vh" />}>
                    <HeroSection />
                </Suspense>
                
                <Suspense fallback={<LoadingSpinner minHeight="30vh" />}>
                    <ServicesSection />
                </Suspense>
            </main>
        </>
    );
}
