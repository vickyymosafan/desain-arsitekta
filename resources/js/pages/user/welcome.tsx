import { type SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import Navbar from '@/components/user/navbar/index';
import HeroSection from '@/components/user/hero/index';
import ServicesSection from '@/components/user/services/index';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Arsitekta - Jasa Desain dan Konstruksi Bangunan">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=nunito:400,500,600,700&family=playfair-display:700,800" rel="stylesheet" />
                <meta name="description" content="Arsitekta - Jasa profesional untuk desain, konstruksi, dan renovasi bangunan dengan kualitas terbaik." />
            </Head>
            <div>
                <Navbar user={auth.user} />
                <HeroSection />
                <ServicesSection />
            </div>
        </>
    );
}
