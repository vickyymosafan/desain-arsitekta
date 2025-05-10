import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { IconArrowNarrowRight, IconCertificate, IconMoodHappy, IconStarFilled, IconBuildingSkyscraper, IconRotate360, IconBulb } from '@tabler/icons-react';

interface CounterProps {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
}

// Animated counter component for dynamic number display
const Counter: React.FC<CounterProps> = ({ value, duration = 2, prefix = '', suffix = '' }) => {
  const countRef = useRef<HTMLSpanElement>(null);
  const [isInView, setIsInView] = useState(false);
  const count = useMotionValue(0);
  const smoothCount = useSpring(count, { duration: duration * 1000 });
  
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      });
    }, { threshold: 0.1 });
    
    if (countRef.current) {
      observer.observe(countRef.current);
    }
    
    return () => {
      if (countRef.current) {
        observer.unobserve(countRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (isInView) {
      count.set(value);
    }
  }, [isInView, value, count]);
  
  const [displayValue, setDisplayValue] = useState('0');
  
  useEffect(() => {
    const unsubscribe = smoothCount.onChange((latest) => {
      const formatted = Math.round(latest).toString();
      setDisplayValue(formatted);
    });
    return unsubscribe;
  }, [smoothCount]);
  
  return <span ref={countRef}>{prefix}{displayValue}{suffix}</span>;
};

const WhyChooseAntosaSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  // Hero background parallax effect reference
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  // Company achievement data for animated counters
  const companyStats = [
    { number: 10, label: "Tahun Pengalaman", prefix: "", suffix: "+", icon: <IconRotate360 size={20} className="text-emerald-400" /> },
    { number: 250, label: "Proyek Selesai", prefix: "", suffix: "+", icon: <IconBuildingSkyscraper size={20} className="text-emerald-400" /> },
    { number: 98, label: "Kepuasan Klien", prefix: "", suffix: "%", icon: <IconMoodHappy size={20} className="text-emerald-400" /> },
    { number: 15, label: "Penghargaan", prefix: "", suffix: "+", icon: <IconCertificate size={20} className="text-emerald-400" /> }
  ];
  
  // Content tabs for dynamic content presentation
  const contentTabs = [
    { id: 'why', label: 'Mengapa Kami', icon: <IconBulb size={18} /> },
    { id: 'projects', label: 'Proyek Unggulan', icon: <IconBuildingSkyscraper size={18} /> },
    { id: 'testimonials', label: 'Testimoni', icon: <IconMoodHappy size={18} /> }
  ];
  
  // Trigger scroll reveal animation on initial render
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-reveal');
        }
      });
    }, { threshold: 0.1 });

    const elements = document.querySelectorAll('.reveal-element');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Parallax Effect */}
      <div ref={heroRef} className="relative min-h-screen">
        {/* Parallax Background */}
        <motion.div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0 brightness-50"
          style={{ 
            backgroundImage: `url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1470&auto=format&fit=crop')`,
            y: bgY 
          }}
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-black z-10"></div>
        
        <div className="relative z-20 min-h-screen flex flex-col justify-center py-16 px-4 md:px-8">
          <div className="max-w-7xl mx-auto w-full">
            {/* Section Header - Hero Style */}
            <motion.div 
              className="text-center mb-16 reveal-element"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center bg-emerald-500/20 px-4 py-2 rounded-full mb-4">
                <IconStarFilled size={16} className="text-emerald-400 mr-2" />
                <h2 className="text-emerald-400 text-sm font-medium uppercase tracking-wider">ALASAN TEPAT</h2>
              </div>
              
              <h3 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-6 text-white">
                Mengapa Memilih <span className="text-emerald-400 relative inline-block">
                  Antosa
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-emerald-400"></span>
                </span> Architect?
              </h3>
              
              <p className="max-w-2xl mx-auto text-gray-300 text-lg font-nunito mb-12">
                Mewujudkan impian Anda menjadi kenyataan dengan pendekatan profesional dan inovatif dalam setiap tahap proyek.          
              </p>
              
              {/* Tabs for different content sections */}
              <div className="flex flex-wrap justify-center gap-2 mb-12">
                {contentTabs.map((tab, idx) => (
                  <motion.button
                    key={tab.id}
                    onClick={() => setActiveTab(idx)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 ${activeTab === idx 
                      ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                      : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70'}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center justify-center">{tab.icon}</span>
                    <span>{tab.label}</span>
                  </motion.button>
                ))}
              </div>

              {/* Dynamic Stats with Animated Counters */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8">
                {companyStats.map((stat, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.1 * index }}
                    className="p-4 rounded-xl backdrop-blur-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-500 group"
                  >
                    <div className="flex justify-center items-center mb-2">
                      {stat.icon}
                    </div>
                    <p className="text-3xl md:text-4xl font-bold text-emerald-400 font-playfair text-center">
                      <Counter value={stat.number} prefix={stat.prefix || ''} suffix={stat.suffix || ''} />
                    </p>
                    <p className="text-gray-400 text-sm font-nunito text-center group-hover:text-gray-300 transition-colors">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
              
              {/* Scroll indicator */}
              <motion.div 
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <p className="text-sm text-gray-400 mb-2">Scroll untuk melihat</p>
                <IconArrowNarrowRight size={24} className="text-emerald-400 rotate-90" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseAntosaSection;