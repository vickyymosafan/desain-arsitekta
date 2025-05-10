import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { IconCertificate, IconMoodHappy, IconStarFilled, IconBuildingSkyscraper, IconRotate360, IconBulb, IconHeartHandshake, IconPalette, IconClock } from '@tabler/icons-react';

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
  
  // Reasons why to choose Antosa
  const whyChooseReasons = [
    {
      icon: <IconPalette size={32} className="text-emerald-400" />,
      title: "Desain Inovatif",
      description: "Pendekatan desain yang menggabungkan estetika modern dengan fungsionalitas, menciptakan ruang yang tidak hanya indah tetapi juga praktis untuk kehidupan sehari-hari."
    },
    {
      icon: <IconClock size={32} className="text-emerald-400" />,
      title: "Tepat Waktu",
      description: "Komitmen untuk menyelesaikan setiap proyek sesuai jadwal yang telah disepakati, dengan manajemen waktu yang terstruktur dan efisien."
    },
    {
      icon: <IconHeartHandshake size={32} className="text-emerald-400" />,
      title: "Layanan Personal",
      description: "Pendekatan yang mengutamakan kebutuhan dan preferensi klien, dengan komunikasi yang terbuka dan responsif di setiap tahap proyek."
    }
  ];
  
  // Featured projects data
  const featuredProjects = [
    {
      id: 1,
      title: "The Emerald Heights Residence",
      location: "Jakarta Selatan",
      description: "Rumah mewah dengan desain modern minimalis yang menyatu dengan alam, mengoptimalkan pencahayaan alami dan sirkulasi udara.",
      rating: 5,
      imageSrc: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1470&auto=format&fit=crop",
      imageAlt: "The Emerald Heights Residence",
      stats: [
        { label: "Luas Bangunan", value: "450 m²" },
        { label: "Durasi Proyek", value: "8 bulan" },
        { label: "Tahun Selesai", value: "2023" }
      ]
    },
    {
      id: 2,
      title: "Azure Sky Apartments",
      location: "Bandung",
      description: "Kompleks apartemen premium dengan fasilitas lengkap dan desain interior bergaya Skandinavia yang memaksimalkan ruang dan cahaya.",
      rating: 5,
      imageSrc: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1470&auto=format&fit=crop",
      imageAlt: "Azure Sky Apartments",
      stats: [
        { label: "Unit", value: "24 unit" },
        { label: "Durasi Proyek", value: "14 bulan" },
        { label: "Tahun Selesai", value: "2022" }
      ]
    },
    {
      id: 3,
      title: "Tropical Haven Villa",
      location: "Bali",
      description: "Villa mewah dengan sentuhan arsitektur tradisional Bali yang dipadukan dengan kemewahan modern dan pemandangan laut yang spektakuler.",
      rating: 5,
      imageSrc: "https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?q=80&w=1470&auto=format&fit=crop",
      imageAlt: "Tropical Haven Villa",
      stats: [
        { label: "Luas Bangunan", value: "320 m²" },
        { label: "Durasi Proyek", value: "10 bulan" },
        { label: "Tahun Selesai", value: "2024" }
      ]
    }
  ];

  // Testimonials data
  const testimonials = [
    {
      id: 1,
      name: "Budi Santoso",
      role: "Pengusaha",
      content: "Antosa Architect telah memberikan desain rumah impian kami yang melebihi ekspektasi. Proses kerja mereka sangat profesional dan transparan.",
      avatarSrc: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5
    },
    {
      id: 2,
      name: "Dewi Lestari",
      role: "Dokter",
      content: "Sangat puas dengan hasil renovasi klinik kami. Tim Antosa sangat memahami kebutuhan kami dan memberikan solusi desain yang fungsional dan estetis.",
      avatarSrc: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5
    },
    {
      id: 3,
      name: "Fajar Prasetyo",
      role: "Direktur Perusahaan",
      content: "Kolaborasi dengan Antosa dalam proyek kantor baru kami berjalan sangat baik. Mereka profesional, tepat waktu, dan sangat memperhatikan detail.",
      avatarSrc: "https://randomuser.me/api/portraits/men/62.jpg",
      rating: 5
    }
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
        
        <div className="relative z-20 min-h-screen flex flex-col justify-center py-12 px-4 md:px-8">
          <div className="max-w-7xl mx-auto w-full">
            {/* Section Header - Hero Style */}
            <motion.div 
              className="text-center mb-0 reveal-element"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center bg-emerald-500/20 px-4 py-2 rounded-full mb-3">
                <IconStarFilled size={16} className="text-emerald-400 mr-2" />
                <h2 className="text-emerald-400 text-sm font-medium uppercase tracking-wider">ALASAN TEPAT</h2>
              </div>
              
              <h3 className="font-playfair text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white">
                Mengapa Memilih <span className="text-emerald-400 relative inline-block">
                  Antosa
                  <span className="absolute -bottom-2 left-0 w-full h-1 bg-emerald-400"></span>
                </span> Architect?
              </h3>
              
              <p className="max-w-2xl mx-auto text-gray-300 text-lg font-nunito mb-8">
                Mewujudkan impian Anda menjadi kenyataan dengan pendekatan profesional dan inovatif dalam setiap tahap proyek.          
              </p>
              
              {/* Tabs for different content sections */}
              <div className="flex flex-wrap justify-center gap-2 mb-8">
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
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mt-6">
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
              
              {/* Tab Content with Animations */}
              <div className="mt-10 relative min-h-[500px]">
                <AnimatePresence mode="wait">
                  {activeTab === 0 && (
                    <motion.div 
                      key="why-us"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute w-full"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4 max-w-6xl mx-auto">
                        {whyChooseReasons.map((reason, index) => (
                          <motion.div 
                            key={index}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.2 }}
                            className="p-8 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-500 h-full flex flex-col"
                          >
                            <div className="rounded-full w-16 h-16 flex items-center justify-center bg-emerald-900/50 border border-emerald-500/20 mb-4">
                              {reason.icon}
                            </div>
                            <h4 className="text-xl font-playfair text-white font-semibold mb-3">{reason.title}</h4>
                            <p className="text-gray-300 text-sm font-nunito flex-grow">{reason.description}</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 1 && (
                    <motion.div 
                      key="projects"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute w-full"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4 max-w-6xl mx-auto">
                        {featuredProjects.map((project, index) => (
                          <motion.div 
                            key={project.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.2 }}
                            className="rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-emerald-500/30 transition-all duration-500 group h-full"
                          >
                            <div className="relative h-48 overflow-hidden">
                              <img 
                                src={project.imageSrc} 
                                alt={project.imageAlt} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                              <div className="absolute bottom-3 left-3 text-white">
                                <p className="text-sm font-medium">{project.location}</p>
                              </div>
                            </div>
                            <div className="p-4">
                              <h4 className="text-lg font-playfair text-white font-semibold mb-2">{project.title}</h4>
                              <p className="text-gray-300 text-sm font-nunito mb-3 line-clamp-2">{project.description}</p>
                              <div className="grid grid-cols-3 gap-2 mt-4">
                                {project.stats.map((stat, i) => (
                                  <div key={i} className="text-center">
                                    <p className="text-emerald-400 text-xs font-semibold">{stat.label}</p>
                                    <p className="text-white text-sm">{stat.value}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 2 && (
                    <motion.div 
                      key="testimonials"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.5 }}
                      className="absolute w-full"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-4 max-w-6xl mx-auto">
                        {testimonials.map((testimonial, index) => (
                          <motion.div 
                            key={testimonial.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: index * 0.2 }}
                            className="p-8 rounded-xl backdrop-blur-md bg-white/5 border border-white/10 hover:bg-white/10 hover:border-emerald-500/30 transition-all duration-500 flex flex-col h-full"
                          >
                            <div className="flex items-center mb-4">
                              <img 
                                src={testimonial.avatarSrc} 
                                alt={testimonial.name} 
                                className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500/50 mr-3" 
                              />
                              <div>
                                <h4 className="text-white font-semibold font-playfair">{testimonial.name}</h4>
                                <p className="text-gray-400 text-sm">{testimonial.role}</p>
                              </div>
                            </div>
                            <div className="flex mb-3">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <IconStarFilled key={i} size={16} className="text-emerald-400" />
                              ))}
                            </div>
                            <p className="text-gray-300 text-sm font-nunito italic">"{testimonial.content}"</p>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyChooseAntosaSection;
