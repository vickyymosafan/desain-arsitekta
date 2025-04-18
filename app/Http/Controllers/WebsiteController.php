<?php

namespace App\Http\Controllers;

use App\Models\Faq;
use App\Models\Portfolio;
use App\Models\Service;
use App\Models\Testimonial;
use Illuminate\Http\Request;
use Inertia\Inertia;

class WebsiteController extends Controller
{
    public function index()
    {
        return Inertia::render('welcome', [
            'services' => Service::where('is_featured', true)
                ->orderBy('order')
                ->take(3)
                ->get(),
            'portfolios' => Portfolio::orderBy('order')
                ->get()
                ->groupBy('category'),
            'testimonials' => Testimonial::where('is_active', true)
                ->orderBy('order')
                ->get(),
            'faqs' => Faq::where('is_active', true)
                ->orderBy('order')
                ->get(),
            'beforeAfterProjects' => Portfolio::whereNotNull('before_image')
                ->whereNotNull('after_image')
                ->take(3)
                ->get(),
            'stats' => [
                'projects' => Portfolio::count(),
                'experience' => 15, // Years of experience (hardcoded for now)
                'clients' => Testimonial::count(),
            ]
        ]);
    }
}
