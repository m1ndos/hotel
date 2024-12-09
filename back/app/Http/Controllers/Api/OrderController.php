<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Order;
use App\Models\Service;
use Illuminate\Http\Request;


class OrderController extends Controller
{
    public function index()
    {
        return Order::all();
    }

    public function show($id)
    {
        return Order::findOrFail($id);
    }

    public function store(Request $request)
    {
        // Валидация запроса
        $validated = $request->validate([
            'booking_id' => 'required|exists:bookings,id', // ID бронирования должно существовать
        ]);

        // Получаем бронирование по ID
        $booking = Booking::with(['room'])->findOrFail($validated['booking_id']);;

        $roomPrice = $booking->room->price;
        $services = json_decode($booking->services, true);
        $servicesPrice = collect($services)->sum('price');
        $totalPrice = $roomPrice + $servicesPrice;
       
        $validated['total_price'] = $totalPrice;

        $order = Order::create($validated);
        $booking->update(['status' => 'paid']);
        return response()->json($order, 201);
        
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);
        $validated = $request->validate([
            'status' => 'required|string|in:unpaid,paid,cancelled',
        ]);
        $order->update(['status' => $validated['status']]);
        return response()->json($order);
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->update(['status' => 'cancelled']);
        return response()->json(null, 204);
    }
}
