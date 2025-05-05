import React from 'react';
import StatItem from './StatItem';
import ServiceCard from './ServiceCard';
import { statsData, servicesData } from '../data/featuresData';

const FeaturesSection: React.FC = () => {
    return (
        <section className="min-h-screen bg-gradient-to-b from-black to-neutral-900 py-16 flex flex-col justify-center">
            <div className="container mx-auto px-4">
                {/* Stats Section */}
                <div className="mb-24">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                        {statsData.map((stat, index) => (
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
                        {servicesData.map((service, index) => (
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
