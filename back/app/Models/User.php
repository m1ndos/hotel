<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use MongoDB\Laravel\Auth\User as Authenticatable;


class User extends Authenticatable
{
    use HasFactory, Notifiable;

    protected $fillable = [
        'email',          // Электронная почта
        'password',       // Пароль
        'is_admin',       // Указывает, является ли пользователь администратором
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

