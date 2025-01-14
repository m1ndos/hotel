<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Service extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',        
        'price',       
    ];

    public function orders()
    {
        return $this->belongsToMany(Order::class, 'order_service')->withTimestamps();
    }
}

