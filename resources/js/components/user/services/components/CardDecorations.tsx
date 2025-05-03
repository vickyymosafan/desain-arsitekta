import React from 'react';

interface CardDecorationsProps {
  isHovered: boolean;
}

/**
 * Dekoratif background element untuk kartu
 * dengan animasi hover untuk visual feedback
 */
const CardDecorations: React.FC<CardDecorationsProps> = ({ isHovered }) => (
  <>
    {/* Top right corner accent */}
    <div 
      className="absolute top-0 right-0 w-20 h-20 pointer-events-none overflow-hidden" 
      aria-hidden="true"
    >
      <div 
        className={`absolute top-0 right-0 w-4 border-t-2 border-r-2 border-emerald-500/30 transition-all duration-500 ${isHovered ? 'w-8 border-emerald-400' : ''}`}
        style={{height: isHovered ? '2rem' : '1rem'}}
      ></div>
    </div>
    
    {/* Bottom left corner accent */}
    <div 
      className="absolute bottom-0 left-0 w-20 h-20 pointer-events-none overflow-hidden" 
      aria-hidden="true"
    >
      <div 
        className={`absolute bottom-0 left-0 h-4 border-b-2 border-l-2 border-emerald-500/30 transition-all duration-500 ${isHovered ? 'h-8 border-emerald-400' : ''}`}
        style={{width: isHovered ? '2rem' : '1rem'}}
      ></div>
    </div>
    
    {/* Hover spotlight effect */}
    <div 
      className={`absolute -right-20 -top-20 w-40 h-40 bg-emerald-400/10 rounded-full blur-3xl transition-opacity duration-700 pointer-events-none ${isHovered ? 'opacity-100' : 'opacity-0'}`} 
      aria-hidden="true"
    ></div>
  </>
);

export default CardDecorations;
