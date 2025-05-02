import React from 'react';

interface SectionHeaderProps {
  title: string;
  description: string;
  className?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ 
  title, 
  description, 
  className = ''
}) => {
  return (
    <div className={`max-w-3xl mx-auto text-center mb-16 ${className}`}>
      <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
        {title}
      </h2>
      <div className="w-20 h-1 bg-emerald-500 mx-auto mb-6"></div>
      <p className="text-gray-600 text-lg">
        {description}
      </p>
    </div>
  );
};

export default SectionHeader;
