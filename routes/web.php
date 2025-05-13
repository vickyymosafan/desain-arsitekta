<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ConsultationController;
use App\Http\Middleware\CheckRole;
use Illuminate\Support\Facades\Auth;

Route::get('/', function () {
    return Inertia::render('user/welcome');
})->name('home');

// User routes
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        if (Auth::user()->role === 'admin') {
            return redirect()->route('admin.dashboard');
        }
        
        // Get user consultations for the dashboard using direct query
        $consultations = \App\Models\Consultation::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();
            
        return Inertia::render('user/dashboard', [
            'consultations' => $consultations
        ]);
    })->name('dashboard');
    
    // Consultation routes
    Route::post('consultations', [ConsultationController::class, 'store'])->name('consultations.store');
});

// Admin routes
Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('dashboard', function () {
        if (Auth::user()->role !== 'admin') {
            return redirect()->route('dashboard');
        }
        
        // Get pending consultations for admin dashboard
        $pendingConsultations = \App\Models\Consultation::with('user')
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get();
            
        $stats = [
            'users' => \App\Models\User::count(),
            'pendingConsultations' => \App\Models\Consultation::where('status', 'pending')->count(),
            'completedConsultations' => \App\Models\Consultation::whereIn('status', ['approved', 'rejected'])->count(),
            'revenue' => 0, // Placeholder for future revenue calculation
        ];
        
        return Inertia::render('admin/dashboard', [
            'consultations' => $pendingConsultations,
            'stats' => $stats
        ]);
    })->name('admin.dashboard');
    
    // Admin consultation management routes
    Route::post('consultations/{consultation}/approve', [ConsultationController::class, 'approve'])->name('admin.consultations.approve');
    Route::post('consultations/{consultation}/reject', [ConsultationController::class, 'reject'])->name('admin.consultations.reject');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
