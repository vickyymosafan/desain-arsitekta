import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface LearnMoreLinkProps {
  serviceTitle: string;
}

/**
 * Komponen link "Pelajari Lebih Lanjut" dengan animasi hover
 * untuk meningkatkan visual hierarchy dan feedback interaktif
 */
const LearnMoreLink: React.FC<LearnMoreLinkProps> = ({ serviceTitle }) => (
  <motion.a 
    href="#"
    aria-label={`Pelajari lebih lanjut tentang ${serviceTitle}`}
    className="inline-flex items-center text-emerald-400 font-medium text-sm hover:text-emerald-300 focus:text-emerald-300 transition-colors duration-300 group/link relative"
    whileHover={{ x: 3 }}
    whileTap={{ scale: 0.98 }}
  >
    <span className="mr-2">Pelajari Lebih Lanjut</span>
    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover/link:translate-x-1 group-focus/link:translate-x-1" />
    
    {/* Background slide effect on hover */}
    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-emerald-400/30 group-hover/link:w-full group-focus/link:w-full transition-all duration-300 ease-in-out" aria-hidden="true"></span>
  </motion.a>
);

export default LearnMoreLink;
