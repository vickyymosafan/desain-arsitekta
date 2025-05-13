<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
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
        return Inertia::render('user/dashboard');
    })->name('dashboard');
});

// Admin routes
Route::middleware(['auth', 'verified'])->prefix('admin')->group(function () {
    Route::get('dashboard', function () {
        if (Auth::user()->role !== 'admin') {
            return redirect()->route('dashboard');
        }
        return Inertia::render('admin/dashboard');
    })->name('admin.dashboard');
});

require __DIR__ . '/settings.php';
require __DIR__ . '/auth.php';
