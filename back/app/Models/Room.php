<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Room extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'address',
        'category_id',
        'description',
        'people_quantity', // Поле вместимости
        'price', // Поле цены
        'images',
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
