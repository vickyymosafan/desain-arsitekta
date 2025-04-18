<?php

namespace Database\Seeders;

use App\Models\Portfolio;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PortfolioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $portfolios = [
            [
                'title' => 'Villa Modern Minimalis',
                'description' => 'Proyek villa modern dengan konsep minimalis di kawasan Jember.',
                'image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2053&q=80',
                'category' => 'rumah',
                'completion_date' => '2024-12-15',
                'location' => 'Jember, Jawa Timur',
                'before_image' => 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2000&q=80',
                'after_image' => 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2053&q=80',
                'is_featured' => true,
                'order' => 1
            ],
            [
                'title' => 'Rumah Type 54',
                'description' => 'Rumah tinggal type 54 dengan desain modern minimalis.',
                'image' => 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2053&q=80',
                'category' => 'rumah',
                'completion_date' => '2024-10-30',
                'location' => 'Bondowoso, Jawa Timur',
                'before_image' => 'https://images.unsplash.com/photo-1596524430615-b46475ddff6e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                'after_image' => 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2053&q=80',
                'is_featured' => true,
                'order' => 2
            ],
            [
                'title' => 'Interior Living Room Modern',
                'description' => 'Interior ruang tamu dengan konsep modern yang nyaman dan estetis.',
                'image' => 'https://images.unsplash.com/photo-1586023492125-d146006ff4be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=958&q=80',
                'category' => 'interior',
                'completion_date' => '2024-09-05',
                'location' => 'Lumajang, Jawa Timur',
                'before_image' => null,
                'after_image' => null,
                'is_featured' => true,
                'order' => 3
            ],
            [
                'title' => 'Ruko 2 Lantai',
                'description' => 'Ruko 2 lantai untuk kebutuhan komersial dengan desain modern.',
                'image' => 'https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                'category' => 'komersial',
                'completion_date' => '2025-01-20',
                'location' => 'Jember, Jawa Timur',
                'before_image' => null,
                'after_image' => null,
                'is_featured' => false,
                'order' => 4
            ],
            [
                'title' => 'Kitchen Set Minimalis',
                'description' => 'Desain kitchen set minimalis dengan fungsionalitas tinggi.',
                'image' => 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
                'category' => 'interior',
                'completion_date' => '2024-08-15',
                'location' => 'Jember, Jawa Timur',
                'before_image' => null,
                'after_image' => null,
                'is_featured' => false,
                'order' => 5
            ],
            [
                'title' => 'Renovasi Fasad Rumah Lama',
                'description' => 'Renovasi tampak depan rumah lama menjadi lebih modern dan menarik.',
                'image' => 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
                'category' => 'renovasi',
                'completion_date' => '2024-11-10',
                'location' => 'Banyuwangi, Jawa Timur',
                'before_image' => 'https://images.unsplash.com/photo-1598228723793-52759bba239c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1074&q=80',
                'after_image' => 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80',
                'is_featured' => true,
                'order' => 6
            ],
            [
                'title' => 'Villa Resort',
                'description' => 'Villa resort dengan arsitektur modern yang terintegrasi dengan alam.',
                'image' => 'https://images.unsplash.com/photo-1600585154526-990dced4db3d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
                'category' => 'komersial',
                'completion_date' => '2024-07-25',
                'location' => 'Lumajang, Jawa Timur',
                'before_image' => null,
                'after_image' => null,
                'is_featured' => false,
                'order' => 7
            ],
            [
                'title' => 'Kantor Modern Terbuka',
                'description' => 'Desain kantor dengan konsep open space yang mendukung produktivitas.',
                'image' => 'https://images.unsplash.com/photo-1613545325278-f24b0cae1224?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80',
                'category' => 'komersial',
                'completion_date' => '2024-06-18',
                'location' => 'Probolinggo, Jawa Timur',
                'before_image' => null,
                'after_image' => null,
                'is_featured' => false,
                'order' => 8
            ],
        ];

        foreach ($portfolios as $portfolio) {
            Portfolio::create($portfolio);
        }
    }
}
