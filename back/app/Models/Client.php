<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Client extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',        // Имя клиента
        'passport',    // Паспортные данные клиента
        'user_id',     // Внешний ключ на пользователя
    ];

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'client_id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
}
