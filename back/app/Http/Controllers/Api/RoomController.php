<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index()
    {
        return Room::all();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'room_number' => 'required|string|unique:rooms',
            'type' => 'required|string',
            'description' => 'nullable|string',
            'price_per_night' => 'required|numeric',
            'is_available' => 'required|boolean',
            'capacity' => 'required|integer',
        ]);

        $room = Room::create($validated);
        return response()->json($room, 201);
    }

    public function show($id)
    {
        $room = Room::findOrFail($id);
        return $room;
    }

    public function update(Request $request, $id)
    {
        $room = Room::findOrFail($id);

        $validated = $request->validate([
            'room_number' => 'sometimes|string|unique:rooms,room_number,' . $room->id,
            'type' => 'sometimes|string',
            'description' => 'sometimes|string',
            'price_per_night' => 'sometimes|numeric',
            'is_available' => 'sometimes|boolean',
            'capacity' => 'sometimes|integer',
        ]);

        $room->update($validated);
        return $room;
    }

    public function destroy($id)
    {
        $room = Room::findOrFail($id);
        $room->delete();
        return response()->noContent();
    }
}
