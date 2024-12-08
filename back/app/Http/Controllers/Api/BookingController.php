<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Room;
use App\Models\Service;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function index()
    {
        return Booking::with(['client', 'room.category', 'room.features'])->get();
    }

    public function show($id)
    {
        return Booking::with(['client', 'room.features'])->findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'room_id' => 'required|exists:rooms,id',
            'day_in' => 'required|date',
            'day_out' => 'required|date|after:day_in',
            'services' => 'nullable|array', // Массив ID услуг (опционально)
            'services.*' => 'exists:services,id',
        ]);

        $services = $validated['services'] ?? [];
        $validated['services'] = $this->getServicesDump($services);
        $validated['status'] = 'unpaid';
        $booking = Booking::create($validated);

        return response()->json($booking, 201);
    }

    public function update(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);

        $validated = $request->validate([
            'client_id' => 'exists:clients,id',
            'room_id' => 'exists:rooms,id',
            'day_in' => 'date',
            'day_out' => 'date|after:day_in',
            'services' => 'nullable|array', // Массив ID услуг (опционально)
            'services.*' => 'exists:services,id',
        ]);

        $services = $validated['services'] ?? [];
        $validated['services'] = $this->getServicesDump($services);

        $booking->update($validated);
        return response()->json($booking, 200);
    }

    public function destroy($id)
    {
        $booking = Booking::findOrFail($id);
        $booking->delete();
        $booking->room->update(['is_available' => true]);
        return response()->json(null, 204);
    }

    private function getServicesDump(array $serviceIds)
    {
        if (empty($serviceIds)) {
            return null;
        }

        $services = Service::whereIn('id', $serviceIds)->get();
        $servicesData = $services->map(function ($service) {
            return [
                'name' => $service->name,
                'price' => $service->price,
            ];
        });

        return $servicesData->toJson();
    }
}
