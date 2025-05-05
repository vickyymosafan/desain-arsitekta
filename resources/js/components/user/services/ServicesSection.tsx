import React from 'react';
import { BiRuler, BiPaintRoll, BiHomeAlt } from 'react-icons/bi';
// Import the component directly without an extension
import ServiceCard from './ServiceCard';

const ServicesSection: React.FC = () => {
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
        <section className="py-20 bg-black">
            <div className="container mx-auto px-4">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-playfair text-white mb-4">
                        Layanan <span className="text-emerald-500">Kami</span>
                    </h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto font-nunito">
                        Kami menyediakan berbagai layanan profesional untuk mewujudkan ruang impian Anda dengan kualitas terbaik
                    </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
        </section>
    );
};

export default ServicesSection;
