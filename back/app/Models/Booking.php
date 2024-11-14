<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',         // ID пользователя (связь с User)
        'room_id',         // ID номера (связь с Room)
        'check_in_date',   // Дата заезда
        'check_out_date',  // Дата выезда
        'total_price',     // Общая стоимость проживания
        'status',          // Статус бронирования (например, активное или отменено)
    ];

    // Связь с пользователем
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Связь с номером
    public function room()
    {
        return $this->belongsTo(Room::class);
    }

    // Связь с услугами (многие ко многим)
    public function services()
    {
        return $this->belongsToMany(Service::class, 'booking_service')->withTimestamps();
    }
}
