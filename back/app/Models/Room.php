<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'room_number',       // Номер комнаты
        'type',              // Тип комнаты (например, люкс, стандарт, одноместный)
        'description',       // Описание номера
        'price_per_night',   // Цена за ночь
        'is_available',      // Доступен ли номер (булевый тип)
        'capacity',          // Вместимость (количество человек)
    ];

    // Связь с бронированиями
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
}
