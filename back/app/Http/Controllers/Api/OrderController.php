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
            'status' => 'required|string|in:pending,paid,completed,cancelled', // Статус заказа
        ]);

        // Получаем бронирование по ID
        $booking = Booking::with(['room.category'])->findOrFail($validated['booking_id']);

        $roomPrice = $booking->room->category->price;
        $servicesPrice = collect($booking->services)->sum('price');
        $totalPrice = $roomPrice + $servicesPrice;
        $validated['total_price'] = $totalPrice;

        $order = Order::create($validated);
        return response()->json($order, 201);
    }

    public function update(Request $request, $id)
    {
        $order = Order::findOrFail($id);

        // Валидируем входные данные
        $validated = $request->validate([
            'services' => 'nullable|array', // Массив ID услуг (опционально)
            'services.*' => 'exists:services,id',
        ]);

        $servicesJson = json_encode([]);

        // Если переданы услуги, обновляем поле `services`
        if (isset($validated['services'])) {
            $services = Service::whereIn('id', $validated['services'])->get(['id', 'name', 'price']);
            $servicesJson = $services->toJson();
        }

        $order->services = $servicesJson;

        // Сохраняем изменения
        $order->save();

        return response()->json($order, 200); // Возвращаем обновленный заказ
    }

    public function destroy($id)
    {
        $order = Order::findOrFail($id);
        $order->delete();
        return response()->json(null, 204); // Успешное удаление
    }
}
