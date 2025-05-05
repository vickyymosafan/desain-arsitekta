import React from 'react';

export interface ServiceCardProps {
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
            <p className="text-neutral-300 font-nunito text-lg leading-relaxed">{description}</p>
        </div>
    );
};

export default ServiceCard;
