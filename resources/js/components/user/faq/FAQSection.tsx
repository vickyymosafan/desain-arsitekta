import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
    animationVariants, 
    createAnimationProps, 
    containerVariants, 
    itemVariants 
} from '@/utils';
import FAQAccordion from './FAQAccordion';

// FAQ data
const faqCategories = [
    {
        id: 'general',
        name: 'Umum',
        icon: 'question-mark-circle',
        questions: [
            {
                id: 'general-1',
                question: 'Apa saja layanan utama yang ditawarkan oleh Arsitekta?',
                answer: 'Arsitekta menawarkan layanan komprehensif yang mencakup desain arsitektur, konstruksi, dan renovasi. Kami menangani proyek dari tahap konseptual hingga penyelesaian, termasuk perencanaan, desain interior, manajemen proyek, dan pengawasan konstruksi.'
            },
            {
                id: 'general-2',
                question: 'Bagaimana proses kerja sama dengan Arsitekta?',
                answer: 'Proses kerja sama dimulai dengan konsultasi awal untuk memahami kebutuhan dan visi Anda. Selanjutnya, kami mengembangkan konsep desain, melakukan revisi berdasarkan umpan balik, menyiapkan dokumen teknis, dan akhirnya melaksanakan konstruksi atau renovasi dengan pengawasan ketat.'
            },
            {
                id: 'general-3',
                question: 'Berapa lama waktu yang dibutuhkan untuk menyelesaikan proyek?',
                answer: 'Durasi proyek bervariasi tergantung pada skala dan kompleksitasnya. Proyek rumah tinggal sederhana dapat memakan waktu 6-12 bulan dari desain hingga konstruksi, sementara proyek komersial lebih besar mungkin memerlukan 12-24 bulan. Kami selalu menyediakan timeline yang jelas di awal proyek.'
            }
        ]
    },
    {
        id: 'design',
        name: 'Desain',
        icon: 'pencil',
        questions: [
            {
                id: 'design-1',
                question: 'Apa pendekatan desain yang digunakan oleh Arsitekta?',
                answer: 'Pendekatan desain kami berfokus pada keseimbangan antara estetika, fungsionalitas, dan keberlanjutan. Kami menggabungkan kebutuhan klien, konteks lingkungan, dan inovasi untuk menciptakan ruang yang tidak hanya indah tetapi juga nyaman ditinggali dan ramah lingkungan.'
            },
            {
                id: 'design-2',
                question: 'Apakah Arsitekta dapat menangani gaya desain tertentu?',
                answer: 'Ya, tim kami berpengalaman dalam berbagai gaya desain, mulai dari modern dan kontemporer hingga tradisional, minimalis, industrial, atau bahkan fusion. Kami menyesuaikan gaya dengan preferensi Anda sambil memastikan desain tetap fungsional dan sesuai konteks.'
            },
            {
                id: 'design-3',
                question: 'Bagaimana dengan desain yang ramah lingkungan?',
                answer: 'Keberlanjutan adalah prinsip inti dalam pendekatan desain kami. Kami menawarkan solusi desain ramah lingkungan seperti penggunaan material lokal dan berkelanjutan, efisiensi energi, sistem pengolahan air, ventilasi alami, dan integrasi dengan lingkungan sekitar.'
            }
        ]
    },
    {
        id: 'cost',
        name: 'Biaya',
        icon: 'currency-dollar',
        questions: [
            {
                id: 'cost-1',
                question: 'Bagaimana sistem pembayaran untuk jasa Arsitekta?',
                answer: 'Kami menggunakan sistem pembayaran bertahap yang dikaitkan dengan pencapaian milestone proyek. Biasanya dimulai dengan deposit awal, diikuti pembayaran setelah penyelesaian desain konseptual, desain detail, dokumen konstruksi, dan tahapan konstruksi.'
            },
            {
                id: 'cost-2',
                question: 'Berapa kisaran biaya untuk jasa desain arsitektur?',
                answer: 'Biaya bervariasi berdasarkan kompleksitas dan skala proyek. Untuk desain arsitektur, biaya umumnya berkisar antara 5-15% dari total biaya konstruksi. Kami menyediakan penawaran terperinci setelah konsultasi awal dan pemahaman kebutuhan proyek Anda.'
            },
            {
                id: 'cost-3',
                question: 'Apakah ada biaya tambahan yang perlu diantisipasi?',
                answer: 'Penawaran kami mencakup layanan yang telah disepakati di awal. Biaya tambahan mungkin timbul jika ada perubahan signifikan pada ruang lingkup proyek, persyaratan perizinan khusus, atau kondisi tak terduga selama konstruksi. Kami selalu berdiskusi terlebih dahulu sebelum menimbulkan biaya tambahan.'
            }
        ]
    }
];

const FAQSection: React.FC = () => {
    const [activeCategory, setActiveCategory] = useState(faqCategories[0].id);

    // Map for icon components
    const icons = {
        'question-mark-circle': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        'pencil': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
        ),
        'currency-dollar': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    };
    
    // Get current category questions
    const currentCategory = faqCategories.find(cat => cat.id === activeCategory) || faqCategories[0];

    return (
        <div className="w-full min-h-screen py-16 px-4 md:px-8 lg:px-16 bg-gray-950">
            {/* Section Header */}
            <motion.div 
                className="text-center mb-16 max-w-3xl mx-auto"
                {...createAnimationProps('fadeIn', 0.2)}
            >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair font-bold text-white mb-4">
                    Pertanyaan Umum
                </h2>
                <p className="text-gray-300 text-lg">
                    Temukan jawaban atas pertanyaan yang sering diajukan tentang layanan kami.
                </p>
            </motion.div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Category Sidebar - 4 columns on large screens */}
                    <motion.div 
                        className="lg:col-span-4"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl overflow-hidden border border-emerald-800/30 sticky top-24">
                            <div className="p-4 border-b border-gray-800">
                                <h3 className="text-xl font-bold text-white">Kategori</h3>
                            </div>
                            <div className="divide-y divide-gray-800">
                                {faqCategories.map((category) => (
                                    <button
                                        key={category.id}
                                        className={`w-full text-left p-4 flex items-center transition-all duration-300 ${activeCategory === category.id ? 'bg-emerald-900/30 text-emerald-300' : 'text-gray-300 hover:bg-gray-800/50 hover:text-white'}`}
                                        onClick={() => setActiveCategory(category.id)}
                                    >
                                        <span className={`mr-3 ${activeCategory === category.id ? 'text-emerald-400' : 'text-gray-500'}`}>
                                            {category.icon in icons ? icons[category.icon as keyof typeof icons] : icons['question-mark-circle']}
                                        </span>
                                        <span className="font-medium">{category.name}</span>
                                        {activeCategory === category.id && (
                                            <span className="ml-auto">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </span>
                                        )}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                    
                    {/* FAQ Accordion - 8 columns on large screens */}
                    <motion.div 
                        className="lg:col-span-8"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="bg-gray-900/70 backdrop-blur-md rounded-xl overflow-hidden border border-emerald-800/30">
                            <div className="p-6 border-b border-gray-800 flex items-center">
                                <span className="text-emerald-400 mr-3">
                                    {currentCategory.icon in icons ? icons[currentCategory.icon as keyof typeof icons] : icons['question-mark-circle']}
                                </span>
                                <h3 className="text-xl font-bold text-white">{currentCategory.name}</h3>
                            </div>
                            <div className="divide-y divide-gray-800">
                                <FAQAccordion questions={currentCategory.questions} />
                            </div>
                        </div>
                        
                        {/* Additional Information */}
                        <motion.div 
                            className="mt-8 bg-gray-900/70 backdrop-blur-md rounded-xl p-6 border border-emerald-800/30"
                            variants={itemVariants}
                            custom={1}
                        >
                            <h4 className="text-lg font-bold text-white mb-4">Masih punya pertanyaan?</h4>
                            <p className="text-gray-300 mb-4">Tim kami siap membantu menjawab segala pertanyaan Anda tentang layanan kami.</p>
                            <a 
                                href="#contact" 
                                className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors duration-300 group/link"
                            >
                                <span className="mr-1">Hubungi Kami</span>
                                <svg 
                                    className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300" 
                                    xmlns="http://www.w3.org/2000/svg" 
                                    viewBox="0 0 20 20" 
                                    fill="currentColor"
                                >
                                    <path 
                                        fillRule="evenodd" 
                                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                                        clipRule="evenodd" 
                                    />
                                </svg>
                            </a>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Call to Action */}
            <motion.div 
                className="mt-20 text-center"
                {...createAnimationProps('fadeIn', 0.8)}
            >
                <a 
                    href="#contact" 
                    className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-emerald-600 border border-transparent rounded-md shadow-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all duration-300 group"
                >
                    <span>Diskusikan Proyek Anda</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                </a>
            </motion.div>
        </div>
    );
};

export default FAQSection;
