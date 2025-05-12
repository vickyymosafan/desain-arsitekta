import React from 'react';
import { motion } from 'framer-motion';

interface Category {
    id: string;
    name: string;
}

interface PortfolioFilterProps {
    categories: Category[];
    selectedCategory: string;
    onCategoryChange: (category: string) => void;
}

const PortfolioFilter: React.FC<PortfolioFilterProps> = ({ 
    categories, 
    selectedCategory, 
    onCategoryChange 
}) => {
    return (
        <motion.div className="inline-flex flex-wrap justify-center bg-gray-900/60 backdrop-blur-sm rounded-full p-1.5 border border-emerald-800/30">
            {categories.map((category) => (
                <button
                    key={category.id}
                    onClick={() => onCategoryChange(category.id)}
                    className={`relative px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category.id 
                            ? 'text-white' 
                            : 'text-gray-400 hover:text-white'
                    }`}
                >
                    {selectedCategory === category.id && (
                        <motion.span 
                            className="absolute inset-0 bg-emerald-600 rounded-full z-0"
                            layoutId="categoryHighlight"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        />
                    )}
                    <span className="relative z-10">{category.name}</span>
                </button>
            ))}
        </motion.div>
    );
};

export default PortfolioFilter;
