<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Consultation extends Model
{
    use HasFactory;
    
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'consultation_date',
        'status',
        'rejection_reason',
        'reviewed_at',
    ];
    
    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'consultation_date' => 'date',
        'reviewed_at' => 'datetime',
    ];
    
    /**
     * Get the user that owns the consultation.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
