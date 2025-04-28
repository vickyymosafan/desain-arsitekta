import { Link } from '@inertiajs/react';

export default function HeroSection() {
    return (
        <section className="pt-32 pb-20 px-4 md:pt-40 md:pb-28">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="order-2 lg:order-1">
                        <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                            Wujudkan Rumah <span className="text-emerald-600 dark:text-emerald-500">Impian Anda</span> Bersama Kami
                        </h1>
                        <p className="text-lg text-gray-700 mb-8 dark:text-gray-300">
                            Kami memberikan solusi terbaik untuk kebutuhan desain dan konstruksi bangunan Anda dengan pendekatan modern dan berkelanjutan.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                href="#"
                                className="rounded-md bg-emerald-600 px-6 py-3 text-base font-medium text-white shadow-lg transition hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:bg-emerald-600 dark:hover:bg-emerald-700"
                            >
                                Konsultasi Sekarang
                            </Link>
                            <Link
                                href="#"
                                className="rounded-md border border-emerald-600 px-6 py-3 text-base font-medium text-emerald-600 transition hover:bg-emerald-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:border-emerald-500 dark:text-emerald-500 dark:hover:bg-gray-900"
                            >
                                Lihat Portofolio
                            </Link>
                        </div>
                    </div>
                    <div className="order-1 lg:order-2">
                        <div className="relative">
                            <div className="absolute -top-6 -left-6 w-24 h-24 bg-emerald-200 rounded-full opacity-70 dark:opacity-40"></div>
                            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-emerald-300 rounded-full opacity-70 dark:opacity-40"></div>
                            <img 
                                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80" 
                                alt="Modern House Design" 
                                className="w-full h-auto rounded-xl shadow-xl relative z-10"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
