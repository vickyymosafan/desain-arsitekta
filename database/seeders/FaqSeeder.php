<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faqs = [
            [
                'question' => "Bagaimana proses konsultasi dan perencanaan proyek?",
                'answer' => "Proses dimulai dengan konsultasi awal untuk memahami kebutuhan dan harapan Anda. Kemudian kami akan membuat konsep desain awal dan estimasi biaya. Setelah persetujuan, kami akan mengembangkan desain lengkap, membuat RAB, dan memulai proses konstruksi yang diawasi oleh tim profesional kami.",
                'is_active' => true,
                'order' => 1
            ],
            [
                'question' => "Berapa lama waktu yang dibutuhkan untuk menyelesaikan proyek?",
                'answer' => "Durasi proyek bervariasi tergantung pada ukuran dan kompleksitas. Proyek renovasi kecil bisa memakan waktu 1-2 bulan, sedangkan pembangunan rumah baru biasanya membutuhkan waktu 6-12 bulan. Kami selalu memberikan timeline yang jelas dan realistis di awal proyek.",
                'is_active' => true,
                'order' => 2
            ],
            [
                'question' => "Apakah Arsitekta menyediakan jasa desain interior?",
                'answer' => "Ya, kami menyediakan layanan desain interior lengkap. Tim desainer interior kami akan bekerja sama dengan arsitek untuk menciptakan ruangan yang tidak hanya fungsional tetapi juga estetis dan mencerminkan gaya hidup Anda.",
                'is_active' => true,
                'order' => 3
            ],
            [
                'question' => "Bagaimana sistem pembayaran untuk proyek?",
                'answer' => "Kami menggunakan sistem pembayaran bertahap yang disesuaikan dengan progress pekerjaan. Biasanya terbagi menjadi 4-5 termin pembayaran, dimulai dengan down payment saat penandatanganan kontrak hingga pembayaran akhir setelah proyek selesai dan serah terima.",
                'is_active' => true,
                'order' => 4
            ],
            [
                'question' => "Apakah Arsitekta mengurus perizinan bangunan?",
                'answer' => "Ya, kami menyediakan layanan pengurusan izin bangunan (IMB) dan dokumen perizinan lainnya yang diperlukan. Tim kami berpengalaman dalam menangani birokrasi dan akan memastikan proyek Anda memenuhi semua persyaratan hukum dan teknis.",
                'is_active' => true,
                'order' => 5
            ],
        ];

        foreach ($faqs as $faq) {
            Faq::create($faq);
        }
    }
}
