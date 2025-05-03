import React from 'react';

/**
 * Komponen placeholder untuk loading state
 * dengan animasi shimmer untuk pengalaman user yang lebih baik
 */
const ServiceCardPlaceholder: React.FC = () => (
  <div 
    className="flex flex-col h-full backdrop-blur-sm bg-navy-800/50 rounded-xl border border-navy-700/50 overflow-hidden relative"
    aria-hidden="true"
  >
    {/* Shimmer effect overlay */}
    <div className="absolute inset-0 overflow-hidden">
      <div className="shimmer-effect animate-shimmer absolute -inset-10 opacity-30"></div>
    </div>
    
    <div className="p-8 flex-1 flex flex-col relative z-10">
      <div className="relative mb-8">
        <div className="w-16 h-16 bg-emerald-500/10 rounded-xl"></div>
      </div>
      <div className="h-8 bg-navy-700/50 rounded-lg w-3/4 mb-4"></div>
      <div className="h-4 bg-navy-700/50 rounded-lg w-full mb-2"></div>
      <div className="h-4 bg-navy-700/50 rounded-lg w-5/6 mb-8"></div>
      <div className="space-y-4 mb-4">
        <div className="flex items-start">
          <div className="h-4 w-4 bg-emerald-400/30 rounded-full mr-2 flex-shrink-0"></div>
          <div className="h-4 bg-navy-700/50 rounded-lg w-3/4"></div>
        </div>
        <div className="flex items-start">
          <div className="h-4 w-4 bg-emerald-400/30 rounded-full mr-2 flex-shrink-0"></div>
          <div className="h-4 bg-navy-700/50 rounded-lg w-2/3"></div>
        </div>
      </div>
    </div>
    <div className="px-8 pb-6 pt-4 border-t border-navy-700/30">
      <div className="h-5 bg-emerald-400/30 rounded-lg w-1/3"></div>
    </div>
  </div>
);

export default ServiceCardPlaceholder;
