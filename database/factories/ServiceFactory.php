<?php

namespace Database\Factories;

use App\Models\Service;
use Illuminate\Database\Eloquent\Factories\Factory;

class ServiceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Service::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(3),
            'icon' => 'fas fa-' . $this->faker->randomElement(['home', 'pencil-ruler', 'paint-brush']),
            'image' => 'images/services/' . $this->faker->numberBetween(1, 5) . '.jpg',
            'is_featured' => $this->faker->boolean(30),
            'order' => $this->faker->numberBetween(1, 10),
        ];
    }
}
