<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function index()
    {
        return Payment::with(['user', 'booking'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'booking_id' => 'required|exists:bookings,id',
            'amount' => 'required|numeric',
            'payment_method' => 'required|string',
            'payment_status' => 'required|string',
        ]);

        $booking = Booking::find($validated['booking_id']);
        if ($booking->user_id !== $validated['user_id']) {
            return response()->json(['error' => 'User ID does not match the booking.'], 403);
        }

        if ($booking->total_price == $validated['amount']) {
            $booking->update(['status' => 'paid']);
        }

        return Payment::create($validated);
    }

    public function show($id)
    {
        $payment = Payment::with(['user', 'booking'])->findOrFail($id);
        return $payment;
    }

    public function update(Request $request, $id)
    {
        $payment = Payment::findOrFail($id);

        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'booking_id' => 'required|exists:bookings,id',
            'amount' => 'required|numeric',
            'payment_method' => 'required|string',
            'payment_status' => 'required|string',
        ]);

        $payment->update(array_filter($validated)); // Фильтруем пустые значения
        return $payment->load(['user', 'booking']);
    }

    public function destroy($id)
    {
        $payment = Payment::findOrFail($id);
        $payment->delete();
        return response()->noContent();
    }
}
