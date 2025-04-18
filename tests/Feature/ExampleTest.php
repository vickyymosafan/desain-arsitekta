<?php

use App\Models\Service;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('returns a successful response', function () {
    // Create mock service data
    Service::factory()->count(3)->create([
        'is_featured' => true,
    ]);
    
    $response = $this->get('/');

    $response->assertStatus(200);
});
