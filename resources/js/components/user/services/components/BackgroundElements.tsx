import React from 'react';

/**
 * Background elements decoratif untuk section layanan
 * dengan efek gradient dan blueprint style
 */
const BackgroundElements: React.FC = () => (
  <div className="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-radial from-emerald-500/10 to-transparent rounded-full blur-3xl transform translate-x-1/3 -translate-y-1/3"></div>
    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-radial from-emerald-500/10 to-transparent rounded-full blur-3xl transform -translate-x-1/3 translate-y-1/3"></div>
    
    {/* Grid pattern overlay */}
    <div className="absolute inset-0 opacity-5">
      <div className="h-full w-full" style={{ 
        backgroundImage: 'linear-gradient(rgba(80, 230, 180, 0.8) 1px, transparent 1px), linear-gradient(to right, rgba(80, 230, 180, 0.8) 1px, transparent 1px)', 
        backgroundSize: '40px 40px' 
      }}></div>
    </div>
    
    {/* Decorative architectural elements */}
    <div className="absolute top-1/4 left-0 w-20 h-40 border-r-2 border-emerald-500/10 opacity-50"></div>
    <div className="absolute bottom-1/4 right-0 w-20 h-40 border-l-2 border-emerald-500/10 opacity-50"></div>
    
    {/* Blueprint style elements */}
    <div className="absolute top-10 left-10 w-20 h-20 rounded-full border-2 border-dashed border-emerald-500/10 opacity-30"></div>
    <div className="absolute bottom-10 right-10 w-20 h-20 rounded-full border-2 border-dashed border-emerald-500/10 opacity-30"></div>
  </div>
);

export default BackgroundElements;
