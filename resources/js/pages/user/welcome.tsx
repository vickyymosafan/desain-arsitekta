import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/components/user/Navbar';
import HeroSection from '@/components/user/HeroSection';
import StatisticsSection from '@/components/user/StatisticsSection';
import ServicesSection from '@/components/user/ServicesSection';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Arsitekta - Jasa Desain dan Konstruksi Bangunan">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=nunito:400,500,600,700&family=playfair-display:700,800" rel="stylesheet" />
                <meta name="description" content="Arsitekta - Jasa profesional untuk desain, konstruksi, dan renovasi bangunan dengan kualitas terbaik." />
            </Head>
            <div className="min-h-screen bg-white text-gray-900 dark:bg-gray-950 dark:text-gray-100">
                <Navbar user={auth.user} />
                <HeroSection />
                <StatisticsSection />
                <ServicesSection />
            </div>
        </>
    );
}
