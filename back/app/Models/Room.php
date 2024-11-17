<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',             // Название комнаты
        'address',          // Адрес комнаты
        'category_id',      // ID категории
        'description',      // Описание комнаты
    ];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function bookings()
    {
        return $this->hasMany(Booking::class, 'room_id');
    }

    public function features()
    {
        return $this->belongsToMany(Feature::class, 'room_feature')->withTimestamps();
    }
}

