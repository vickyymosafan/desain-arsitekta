import { Link } from '@inertiajs/react';
import { ArrowRightIcon, BuildingOfficeIcon, PaintBrushIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline';

interface ServiceCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

function ServiceCard({ title, description, icon }: ServiceCardProps) {
    return (
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 dark:bg-gray-800 dark:border-gray-700 transition hover:shadow-lg hover:border-emerald-200 dark:hover:border-emerald-900">
            <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mb-6 dark:bg-emerald-900/30">
                {icon}
            </div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-gray-700 mb-4 dark:text-gray-300">
                {description}
            </p>
            <Link href="#" className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700 dark:text-emerald-500 dark:hover:text-emerald-400">
                Pelajari lebih lanjut <ArrowRightIcon className="w-4 h-4 ml-2" />
            </Link>
        </div>
    );
}

export default function ServicesSection() {
    const services = [
        {
            title: "Desain Arsitektur",
            description: "Layanan desain profesional untuk menciptakan konsep bangunan yang estetis, fungsional, dan sesuai kebutuhan Anda.",
            icon: <PaintBrushIcon className="w-8 h-8 text-emerald-600 dark:text-emerald-500" />
        },
        {
            title: "Konstruksi",
            description: "Pengerjaan konstruksi berkualitas tinggi dengan tim berpengalaman yang mengutamakan detail dan kualitas.",
            icon: <BuildingOfficeIcon className="w-8 h-8 text-emerald-600 dark:text-emerald-500" />
        },
        {
            title: "Renovasi",
            description: "Solusi renovasi rumah dan bangunan komersial untuk meningkatkan nilai dan fungsionalitas properti Anda.",
            icon: <WrenchScrewdriverIcon className="w-8 h-8 text-emerald-600 dark:text-emerald-500" />
        }
    ];

    return (
        <section id="services" className="py-20 px-4">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Layanan Kami</h2>
                    <p className="text-gray-700 max-w-2xl mx-auto dark:text-gray-300">
                        Kami menawarkan rangkaian layanan lengkap untuk memenuhi kebutuhan desain dan konstruksi Anda
                    </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <ServiceCard 
                            key={index}
                            title={service.title}
                            description={service.description}
                            icon={service.icon}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
