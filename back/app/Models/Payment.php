<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use MongoDB\Laravel\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',           // ID пользователя
        'booking_id',        // ID бронирования
        'amount',            // Сумма платежа
        'payment_method',    // Способ оплаты (например, кредитная карта, PayPal)
        'payment_status',    // Статус платежа (например, успешный, неуспешный)
        'transaction_date',  // Дата проведения транзакции
    ];

    // Связь с пользователем
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    // Связь с бронированием
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}
