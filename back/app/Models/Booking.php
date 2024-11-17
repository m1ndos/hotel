<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;


class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',     // ID клиента
        'room_id',       // ID номера
        'day_in',        // Дата заезда
        'day_out',       // Дата выезда
        'services'
    ];

    protected $casts = [
        'services' => 'array', // Делаем поле services массивом
    ];

    public function client()
    {
        return $this->belongsTo(Client::class, 'client_id');
    }

    public function room()
    {
        return $this->belongsTo(Room::class, 'room_id');
    }

}
