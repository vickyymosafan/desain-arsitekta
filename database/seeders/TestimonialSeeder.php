<?php

namespace Database\Seeders;

use App\Models\Testimonial;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TestimonialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $testimonials = [
            [
                'client_name' => 'Budi Santoso',
                'client_title' => 'Pemilik Rumah di Jember',
                'content' => 'Sangat puas dengan hasil kerja tim Arsitekta. Desain rumah kami menjadi sangat modern dan fungsional. Proses pengerjaannya juga tepat waktu dan sesuai budget.',
                'image' => null,
                'rating' => 5,
                'is_active' => true,
                'order' => 1
            ],
            [
                'client_name' => 'Dewi Anggraini',
                'client_title' => 'CEO PT. Maju Bersama',
                'content' => 'Arsitekta telah merancang kantor kami dengan sangat baik. Ruang kerja menjadi lebih produktif dan nyaman untuk seluruh karyawan. Semua detail diperhatikan dengan baik.',
                'image' => null,
                'rating' => 5,
                'is_active' => true,
                'order' => 2
            ],
            [
                'client_name' => 'Ahmad Rizky',
                'client_title' => 'Pemilik Villa di Lumajang',
                'content' => 'Desain villa kami sangat sesuai dengan harapan. Tim arsitek sangat kooperatif dan selalu mendengarkan kebutuhan kami. Hasil akhirnya sangat memuaskan.',
                'image' => null,
                'rating' => 4,
                'is_active' => true,
                'order' => 3
            ],
            [
                'client_name' => 'Siti Nurhasanah',
                'client_title' => 'Pemilik Butik',
                'content' => 'Renovasi toko kami berhasil dengan baik berkat Arsitekta. Pengunjung selalu memuji desain interior yang elegan dan fungsional. Penjualan juga meningkat sejak renovasi.',
                'image' => null,
                'rating' => 5,
                'is_active' => true,
                'order' => 4
            ],
        ];

        foreach ($testimonials as $testimonial) {
            Testimonial::create($testimonial);
        }
    }
}
