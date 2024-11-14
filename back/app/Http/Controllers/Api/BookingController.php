<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Room;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        return Booking::with(['user', 'room', 'services'])->get();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
            'room_id' => 'required|exists:rooms,id',
            'check_in_date' => 'required|date',
            'check_out_date' => 'required|date|after:check_in_date',
            'total_price' => 'required|numeric',
            'services' => 'nullable|array',
            'services.*' => 'exists:services,id',
        ]);

        // Проверка, что комната доступна
        $room = Room::findOrFail($validated['room_id']);
        if (!$room->is_available) {
            return response()->json(['error' => 'The selected room is not available.'], 422);
        }

        $validated['status'] = 'pending_payment';
        $booking = Booking::create($validated);

        // Привязываем услуги, если указаны
        if (!empty($validated['services'])) {
            $booking->services()->attach($validated['services']);
        }
        $room->update(['is_available' => false]);

        return response()->json($booking->load(['user', 'room', 'services']), 201);
    }

    public function show($id)
    {
        $booking = Booking::with(['user', 'room', 'services'])->findOrFail($id);
        return $booking;
    }

    public function update(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);

        $validated = $request->validate([
            'user_id' => 'sometimes|exists:users,id',
            'room_id' => 'sometimes|exists:rooms,id',
            'check_in_date' => 'sometimes|date',
            'check_out_date' => 'sometimes|date|after:check_in_date',
            'total_price' => 'sometimes|numeric',
            'status' => 'sometimes|string',
        ]);

        $booking->update(array_filter($validated)); // Фильтруем пустые значения
        return $booking->load(['user', 'room', 'services']);
    }

    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->delete();
        return response()->noContent();
    }
}
