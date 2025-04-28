export default function StatisticsSection() {
    return (
        <section className="py-16 bg-emerald-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="bg-white p-8 rounded-xl shadow-md dark:bg-gray-800 transition hover:shadow-lg">
                        <div className="text-4xl font-bold text-emerald-600 mb-2 dark:text-emerald-500">150+</div>
                        <div className="text-gray-700 font-medium dark:text-gray-300">Proyek Selesai</div>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-md dark:bg-gray-800 transition hover:shadow-lg">
                        <div className="text-4xl font-bold text-emerald-600 mb-2 dark:text-emerald-500">10+</div>
                        <div className="text-gray-700 font-medium dark:text-gray-300">Tahun Beroperasi</div>
                    </div>
                    <div className="bg-white p-8 rounded-xl shadow-md dark:bg-gray-800 transition hover:shadow-lg">
                        <div className="text-4xl font-bold text-emerald-600 mb-2 dark:text-emerald-500">95%</div>
                        <div className="text-gray-700 font-medium dark:text-gray-300">Klien Puas</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
