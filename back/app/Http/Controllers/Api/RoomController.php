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
            'features' => 'nullable|array', // Массив ID фич
            'features.*' => 'exists:features,id',
        ]);

        $room = Room::create($validated);

        // Если есть фичи, привязываем их
        if (isset($validated['features'])) {
            $room->features()->sync($validated['features']); // Синхронизируем фичи
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
            'features' => 'nullable|array', // Массив ID фич
            'features.*' => 'exists:features,id', // Проверка существования фичей
        ]);

        // Обновляем комнату
        $room->update($validated);

        // Если фичи переданы, синхронизируем их
        if (isset($validated['features'])) {
            $room->features()->sync($validated['features']); // Синхронизация фичей
        }

        return response()->json($room);
    }

    public function destroy($id)
    {
        $room = Room::findOrFail($id);
        $room->delete();
        return response()->json(null, 204);
    }
}
