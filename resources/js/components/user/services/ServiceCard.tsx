import React from 'react';

interface ServiceCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => {
    return (
        <div className="bg-neutral-900 p-6 rounded-xl transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-xl group">
            <div className="text-emerald-500 text-5xl mb-4 transition-all duration-300 group-hover:text-emerald-400">
                {icon}
            </div>
            <h3 className="text-white font-playfair text-xl md:text-2xl font-bold mb-3">{title}</h3>
            <p className="text-neutral-300 font-nunito">{description}</p>
        </div>
    );
};

export default ServiceCard;
