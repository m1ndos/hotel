<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Feature extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
    ];

    public function rooms()
    {
        return $this->belongsToMany(Room::class, 'room_feature')->withTimestamps();
    }
}

