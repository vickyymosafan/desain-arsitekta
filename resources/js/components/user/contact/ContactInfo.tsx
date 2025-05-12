import React from 'react';
import { motion } from 'framer-motion';
import { itemVariants } from '@/utils';

const ContactInfo: React.FC = () => {
    const contactInfo = [
        {
            id: 'address',
            icon: 'location',
            title: 'Alamat',
            content: 'Jl. Emerald Architect No. 123, Jakarta Selatan, Indonesia',
            link: 'https://maps.google.com',
            linkText: 'Lihat di Maps'
        },
        {
            id: 'email',
            icon: 'mail',
            title: 'Email',
            content: 'info@arsitekta.com',
            link: 'mailto:info@arsitekta.com',
            linkText: 'Kirim Email'
        },
        {
            id: 'phone',
            icon: 'phone',
            title: 'Telepon',
            content: '+62 21 1234 5678',
            link: 'tel:+622112345678',
            linkText: 'Hubungi Kami'
        },
        {
            id: 'hours',
            icon: 'clock',
            title: 'Jam Kerja',
            content: 'Senin - Jumat: 09:00 - 17:00 WIB',
            secondaryContent: 'Sabtu: 09:00 - 13:00 WIB (Hanya dengan Janji)'
        }
    ];

    // Map for icon components
    const icons = {
        'location': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
        ),
        'mail': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
        ),
        'phone': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
        ),
        'clock': (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        )
    };

    return (
        <div className="space-y-6">
            {/* Contact Info Cards */}
            <div className="bg-gray-900/70 backdrop-blur-md rounded-xl overflow-hidden border border-emerald-800/30 p-6 md:p-8">
                <h3 className="text-2xl font-bold text-white mb-6 font-nunito">Informasi Kontak</h3>
                
                <div className="space-y-6">
                    {contactInfo.map((info, index) => (
                        <motion.div 
                            key={info.id}
                            className="flex items-start"
                            variants={itemVariants}
                            custom={index}
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-emerald-600/20 flex items-center justify-center text-emerald-400 mr-4">
                                {info.icon in icons ? icons[info.icon as keyof typeof icons] : null}
                            </div>
                            <div>
                                <h4 className="text-lg font-semibold text-white mb-1">{info.title}</h4>
                                <p className="text-gray-300 mb-1">{info.content}</p>
                                {info.secondaryContent && (
                                    <p className="text-gray-400 text-sm">{info.secondaryContent}</p>
                                )}
                                {info.link && (
                                    <a 
                                        href={info.link} 
                                        target={info.id === 'address' ? '_blank' : undefined}
                                        rel={info.id === 'address' ? 'noopener noreferrer' : undefined}
                                        className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors duration-300 text-sm mt-1 group"
                                    >
                                        <span>{info.linkText}</span>
                                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                                        </svg>
                                    </a>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Social Media Links */}
            <motion.div 
                className="bg-gray-900/70 backdrop-blur-md rounded-xl overflow-hidden border border-emerald-800/30 p-6 md:p-8"
                variants={itemVariants}
                custom={4}
            >
                <h3 className="text-xl font-bold text-white mb-4 font-nunito">Ikuti Kami</h3>
                
                <div className="flex space-x-4">
                    <a 
                        href="#" 
                        className="w-10 h-10 rounded-full bg-gray-800 hover:bg-emerald-900/50 flex items-center justify-center text-gray-300 hover:text-emerald-400 transition-colors duration-300"
                        aria-label="Instagram"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                        </svg>
                    </a>
                    <a 
                        href="#" 
                        className="w-10 h-10 rounded-full bg-gray-800 hover:bg-emerald-900/50 flex items-center justify-center text-gray-300 hover:text-emerald-400 transition-colors duration-300"
                        aria-label="Twitter"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                        </svg>
                    </a>
                    <a 
                        href="#" 
                        className="w-10 h-10 rounded-full bg-gray-800 hover:bg-emerald-900/50 flex items-center justify-center text-gray-300 hover:text-emerald-400 transition-colors duration-300"
                        aria-label="Facebook"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                        </svg>
                    </a>
                    <a 
                        href="#" 
                        className="w-10 h-10 rounded-full bg-gray-800 hover:bg-emerald-900/50 flex items-center justify-center text-gray-300 hover:text-emerald-400 transition-colors duration-300"
                        aria-label="LinkedIn"
                    >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                    </a>
                </div>
            </motion.div>

            {/* Newsletter Subscription */}
            <motion.div 
                className="bg-gray-900/70 backdrop-blur-md rounded-xl overflow-hidden border border-emerald-800/30 p-6 md:p-8"
                variants={itemVariants}
                custom={5}
            >
                <h3 className="text-xl font-bold text-white mb-4 font-nunito">Berlangganan Newsletter</h3>
                <p className="text-gray-300 text-sm mb-4">Dapatkan inspirasi desain dan perkembangan terbaru dari kami.</p>
                
                <form className="flex">
                    <input 
                        type="email" 
                        placeholder="Alamat email Anda" 
                        className="flex-grow px-4 py-2 bg-gray-800/70 border border-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-colors text-white placeholder-gray-500"
                        required
                    />
                    <button 
                        type="submit" 
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-r-md transition-colors duration-300"
                    >
                        Daftar
                    </button>
                </form>
                <p className="text-gray-400 text-xs mt-2">Kami tidak akan pernah membagikan email Anda. Lihat kebijakan privasi kami.</p>
            </motion.div>
        </div>
    );
};

export default ContactInfo;
