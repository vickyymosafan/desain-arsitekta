import React from 'react';

export default function AboutSection() {
    return (
        <div className="container mx-auto px-4 py-20">
            <div className="mb-12 text-center">
                <h2 className="mb-2 text-emerald-500 text-sm font-bold tracking-widest uppercase">Tentang Kami</h2>
                <h3 className="mb-6 text-4xl md:text-5xl font-playfair font-bold text-white">
                    Kenali <span className="text-emerald-500">Antosa Architect</span>
                </h3>
                <p className="max-w-3xl mx-auto text-gray-300 text-lg">
                    Tim arsitek profesional dengan fokus pada desain yang memadukan estetika, fungsi, dan keberlanjutan untuk menciptakan ruang impian Anda.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 items-center">
                {/* Left Column - Images */}
                <div className="w-full lg:w-1/2 relative">
                    <div className="rounded-xl overflow-hidden shadow-2xl relative z-10">
                        <img 
                            src="/images/about-main.jpg" 
                            alt="Tim Antosa Architect" 
                            className="w-full h-[500px] object-cover"
                        />
                    </div>
                    <div className="absolute -bottom-6 -right-6 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl"></div>
                    <div className="absolute -top-6 -left-6 w-48 h-48 bg-emerald-500/30 rounded-full blur-3xl"></div>
                    
                    {/* Experience badge */}
                    <div className="absolute -right-5 bottom-20 bg-black border border-emerald-500/20 shadow-xl rounded-lg py-4 px-6 z-20">
                        <div className="text-center">
                            <span className="block text-5xl font-bold text-emerald-500">15+</span>
                            <span className="block text-sm uppercase tracking-wider font-medium text-gray-400">Tahun Pengalaman</span>
                        </div>
                    </div>
                </div>
                
                {/* Right Column - Content */}
                <div className="w-full lg:w-1/2">
                    <h4 className="text-2xl font-playfair font-bold text-white mb-6">
                        Mewujudkan Visi Arsitektur <span className="text-emerald-500">Modern & Berkelanjutan</span>
                    </h4>
                    
                    <p className="text-gray-300 mb-6">
                        Didirikan pada tahun 2008, Antosa Architect telah menjadi studio desain terkemuka yang menangani berbagai proyek arsitektur dan interior di seluruh Indonesia. Dengan tim yang terdiri dari arsitek berpengalaman dan desainer berbakat, kami berkomitmen untuk memberikan solusi desain yang tidak hanya indah secara visual tetapi juga fungsional dan berkelanjutan.
                    </p>
                    
                    <p className="text-gray-300 mb-8">
                        Kami percaya bahwa arsitektur yang baik harus mencerminkan kebutuhan dan kepribadian klien, sambil tetap memperhatikan konteks lingkungan dan sosial. Setiap proyek kami, mulai dari rumah hunian hingga bangunan komersial, dirancang dengan perhatian mendalam terhadap detail dan kualitas.
                    </p>
                    
                    {/* Core Values */}
                    <div className="grid grid-cols-2 gap-6 mb-8">
                        <div className="flex items-start">
                            <div className="mr-4 bg-emerald-500/10 p-3 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="font-bold text-white">Inovatif</h5>
                                <p className="text-sm text-gray-400">Solusi desain modern</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="mr-4 bg-emerald-500/10 p-3 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="font-bold text-white">Efisien</h5>
                                <p className="text-sm text-gray-400">Penggunaan ruang optimal</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="mr-4 bg-emerald-500/10 p-3 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="font-bold text-white">Kustom</h5>
                                <p className="text-sm text-gray-400">Desain yang personal</p>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <div className="mr-4 bg-emerald-500/10 p-3 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div>
                                <h5 className="font-bold text-white">Berkelanjutan</h5>
                                <p className="text-sm text-gray-400">Desain ramah lingkungan</p>
                            </div>
                        </div>
                    </div>
                    
                    {/* CTA Button */}
                    <a href="#contact" className="inline-flex items-center py-3 px-6 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                        Konsultasi Sekarang
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}
