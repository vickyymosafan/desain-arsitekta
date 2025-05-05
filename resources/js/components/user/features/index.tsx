/**
 * Combined Features section with Statistics and Services
 */

import React from 'react';
import { BiRuler, BiPaintRoll, BiHomeAlt } from 'react-icons/bi';
import { FaBuilding, FaCalendarAlt, FaSmile } from 'react-icons/fa';
import { motion } from 'framer-motion';

// StatItem Component
interface StatItemProps {
    icon: React.ReactNode;
    count: string | number;
    label: string;
}

const StatItem: React.FC<StatItemProps> = ({ icon, count, label }) => {
    return (
        <div className="flex flex-col items-center p-6 rounded-xl bg-neutral-800/50 border border-neutral-700 hover:border-emerald-500/30 transition-all duration-300 hover:transform hover:scale-105">
            <div className="text-emerald-400 text-4xl mb-4 bg-emerald-400/10 p-4 rounded-full">
                {icon}
            </div>
            <motion.h3 
                className="text-white font-playfair text-3xl md:text-5xl font-bold mb-2"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
            >
                {count}
            </motion.h3>
            <p className="text-neutral-300 font-nunito text-center">{label}</p>
        </div>
    );
};

// ServiceCard Component
interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
    return (
        <div className="bg-neutral-900 p-6 rounded-xl transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl group border border-neutral-800 hover:border-emerald-500/30 h-full">
            <div className="text-emerald-500 text-4xl mb-5 transition-all duration-300 group-hover:text-emerald-400 bg-emerald-500/10 p-4 rounded-full w-fit">
                {icon}
            </div>
            <h3 className="text-white font-playfair text-xl md:text-2xl font-bold mb-3">{title}</h3>
            <p className="text-neutral-300 font-nunito">{description}</p>
        </div>
    );
};

// Combined Features Section
const FeaturesSection: React.FC = () => {
    // Stats data
    const stats = [
        {
            icon: <FaBuilding />,
            count: '250+',
            label: 'Proyek Selesai'
        },
        {
            icon: <FaCalendarAlt />,
            count: '15',
            label: 'Tahun Beroperasi'
        },
        {
            icon: <FaSmile />,
            count: '420',
            label: 'Testimoni Positif'
        }
    ];

    // Services data
    const services = [
        {
            icon: <BiRuler />,
            title: "Desain",
            description: "Layanan desain arsitektur dan interior yang inovatif dan sesuai kebutuhan klien. Kami memadukan estetika dan fungsionalitas untuk menciptakan ruang yang sempurna."
        },
        {
            icon: <BiHomeAlt />,
            title: "Konstruksi",
            description: "Jasa konstruksi bangunan berkualitas tinggi dengan standar keamanan terbaik. Tim profesional kami memastikan proyek selesai tepat waktu dan sesuai anggaran."
        },
        {
            icon: <BiPaintRoll />,
            title: "Renovasi",
            description: "Ubah ruang lama menjadi baru dengan layanan renovasi kami. Kami menangani segala jenis renovasi dari yang kecil hingga perubahan total struktur bangunan."
        }
    ];

    return (
        <section className="min-h-screen bg-gradient-to-b from-black to-neutral-900 py-16 flex flex-col justify-center">
            <div className="container mx-auto px-4">
                {/* Stats Section */}
                <div className="mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {stats.map((stat, index) => (
                            <StatItem 
                                key={index}
                                icon={stat.icon}
                                count={stat.count}
                                label={stat.label}
                            />
                        ))}
                    </div>
                </div>

                {/* Services Section */}
                <div>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair text-white mb-4">
                            Layanan <span className="text-emerald-500">Kami</span>
                        </h2>
                        <p className="text-neutral-400 max-w-2xl mx-auto font-nunito mb-10">
                            Kami menyediakan berbagai layanan profesional untuk mewujudkan ruang impian Anda dengan kualitas terbaik
                        </p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {services.map((service, index) => (
                            <ServiceCard
                                key={index}
                                icon={service.icon}
                                title={service.title}
                                description={service.description}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FeaturesSection;
