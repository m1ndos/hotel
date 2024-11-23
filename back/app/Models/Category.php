<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'price',
        'description',
        'image',
        'people_quantity',
    ];

    public function rooms()
    {
        return $this->hasMany(Room::class, 'category_id');
    }
    public function features()
    {
        return $this->belongsToMany(Feature::class, 'category_feature')->withTimestamps();
    }
}
