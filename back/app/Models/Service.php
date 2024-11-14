<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',            // Название услуги
        'description',     // Описание услуги
        'price',           // Стоимость услуги
    ];

    // Связь с бронированиями (многие ко многим)
    public function bookings()
    {
        return $this->belongsToMany(Booking::class, 'booking_service')->withTimestamps();
    }
}
