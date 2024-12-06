<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Room;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    public function index()
    {
        return Room::with('category', 'features')->get(); // Возвращаем комнаты с категориями и фичами
    }

    public function show($id)
    {
        return Room::with('category', 'features')->findOrFail($id); // Возвращает конкретную комнату
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'address' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'description' => 'nullable|string',
            'people_quantity' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0', // Валидация для поля цены
            'features' => 'nullable|array',
            'features.*' => 'exists:features,id',
            'images' => 'nullable|array|max:3',
            'images.*' => 'url',
        ]);

        $validated['is_available'] = true;
        $room = Room::create($validated);

        if (isset($validated['features'])) {
            $room->features()->sync($validated['features']);
        }

        return response()->json($room, 201);
    }

    public function update(Request $request, $id)
    {
        $room = Room::findOrFail($id);

        $validated = $request->validate([
            'name' => 'string|max:255',
            'address' => 'string|max:255',
            'category_id' => 'exists:categories,id',
            'description' => 'nullable|string',
            'people_quantity' => 'nullable|integer|min:1',
            'price' => 'nullable|numeric|min:0', // Валидация для поля цены
            'features' => 'nullable|array',
            'features.*' => 'exists:features,id',
            'images' => 'nullable|array|max:3',
            'images.*' => 'url',
        ]);

        $room->update($validated);

        if (isset($validated['features'])) {
            $room->features()->sync($validated['features']);
        }

        return response()->json($room);
    }

    public function destroy($id)
    {
        $room = Room::findOrFail($id);
        $room->delete();
        return response()->json(null, 204);
    }

    public function getRoomsByCategoryName($categoryName)
    {
        $rooms = Room::whereHas('category', function ($query) use ($categoryName) {
            $query->where('name', $categoryName);
        })->with('category', 'features')->get();

        return response()->json($rooms);
    }

}
