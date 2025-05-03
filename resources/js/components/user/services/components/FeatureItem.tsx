import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

interface FeatureItemProps {
  text: string;
}

/**
 * Komponen untuk menampilkan item fitur layanan
 * dengan animasi dan styling konsisten
 */
const FeatureItem: React.FC<FeatureItemProps> = ({ text }) => (
  <motion.li 
    className="flex items-start group/item"
    initial={{ opacity: 0, x: -5 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.3 }}
  >
    <span className="text-emerald-400 mr-2 mt-0.5 flex-shrink-0 transition-all duration-300 group-hover/item:scale-110" aria-hidden="true">
      <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
    </span>
    <span className="text-sm text-gray-300 transition-colors duration-300 group-hover/item:text-white">
      {text}
    </span>
  </motion.li>
);

export default FeatureItem;
