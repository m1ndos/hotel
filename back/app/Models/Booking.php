<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;


class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'client_id',
        'room_id',
        'day_in',
        'day_out',
        'status',
        'services'
    ];

    protected $casts = [
        'services' => 'array',
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
