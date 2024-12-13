<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use MongoDB\Laravel\Auth\User as Authenticatable;


class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'email',          
        'password',       
        'is_admin',       
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function client()
    {
        return $this->hasOne(Client::class, 'user_id');
    }
}

