<?php

namespace App\Http\Controllers;

use App\Models\Consultation;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class ConsultationController extends Controller
{
    use AuthorizesRequests;
    /**
     * Display a listing of user consultations on their dashboard
     */
    public function index()
    {
        $consultations = Consultation::where('user_id', Auth::id())
            ->orderBy('created_at', 'desc')
            ->get();
            
        return Inertia::render('User/Dashboard', [
            'consultations' => $consultations
        ]);
    }
    
    /**
     * Display a listing of all consultations for admin
     */
    public function adminIndex()
    {
        $this->authorize('viewAny', Consultation::class);
        
        $pendingConsultations = Consultation::with('user')
            ->where('status', 'pending')
            ->orderBy('created_at', 'desc')
            ->get();
            
        $stats = [
            'users' => \App\Models\User::count(),
            'pendingConsultations' => Consultation::where('status', 'pending')->count(),
            'completedConsultations' => Consultation::whereIn('status', ['approved', 'rejected'])->count(),
            'revenue' => 0, // Placeholder for future revenue calculation
        ];
        
        return Inertia::render('Admin/Dashboard', [
            'consultations' => $pendingConsultations,
            'stats' => $stats
        ]);
    }

    /**
     * Store a newly created consultation request in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'consultation_date' => 'required|date|after_or_equal:today',
        ]);
        
        $consultation = Consultation::create([
            'user_id' => Auth::id(),
            'consultation_date' => $request->consultation_date,
            'status' => 'pending',
        ]);
        
        return Redirect::route('dashboard');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Not used in our workflow
    }
    
    /**
     * Approve the consultation request
     */
    public function approve(Consultation $consultation)
    {
        $this->authorize('update', $consultation);
        
        $consultation->update([
            'status' => 'approved',
            'reviewed_at' => now(),
        ]);
        
        // Flash message for admin dashboard
        session()->flash('message', 'Konsultasi berhasil disetujui.');
        
        return back();
    }
    
    /**
     * Reject the consultation request with a reason
     */
    public function reject(Request $request, Consultation $consultation)
    {
        $this->authorize('update', $consultation);
        
        $validated = $request->validate([
            'rejection_reason' => 'required|string|min:5|max:255',
        ]);
        
        $consultation->update([
            'status' => 'rejected',
            'rejection_reason' => $validated['rejection_reason'],
            'reviewed_at' => now(),
        ]);
        
        // Flash message for admin dashboard
        session()->flash('message', 'Konsultasi berhasil ditolak dengan alasan.');
        
        return back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Not used in our workflow
    }
}
