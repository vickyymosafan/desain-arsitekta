<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServiceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $services = [
            [
                'title' => 'Desain Arsitektur',
                'description' => 'Jasa desain arsitektur untuk rumah, ruko, atau gedung dengan konsep modern, minimalis, atau klasik sesuai keinginan Anda.',
                'icon' => 'design',
                'is_featured' => true,
                'order' => 1
            ],
            [
                'title' => 'Konstruksi',
                'description' => 'Layanan pembangunan rumah dan bangunan komersial dari awal hingga selesai dengan kualitas premium dan tepat waktu.',
                'icon' => 'build',
                'is_featured' => true,
                'order' => 2
            ],
            [
                'title' => 'Interior Design',
                'description' => 'Desain interior yang fungsional dan estetis untuk menciptakan ruang yang nyaman dan sesuai dengan gaya hidup Anda.',
                'icon' => 'interior',
                'is_featured' => true,
                'order' => 3
            ],
            [
                'title' => 'Renovasi',
                'description' => 'Renovasi bangunan lama menjadi lebih modern, dengan desain yang segar dan struktur yang lebih kuat.',
                'icon' => null,
                'is_featured' => false,
                'order' => 4
            ],
        ];

        foreach ($services as $service) {
            Service::create($service);
        }
    }
}
