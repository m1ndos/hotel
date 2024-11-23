<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;


class CategoryController extends Controller
{
    public function index()
    {
        return Category::with('features')->get(); // Возвращает категории с фичами
    }

    public function show($id)
    {
        return Category::with('features')->findOrFail($id); // Возвращает конкретную категорию с фичами
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'people_quantity' => 'required|integer|min:1',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
            'features' => 'nullable|array', // Массив ID фич
            'features.*' => 'exists:features,id',
        ]);

        $category = Category::create($validated);

        // Если переданы фичи, привязываем их
        if (isset($validated['features'])) {
            $category->features()->sync($validated['features']);
        }

        return response()->json($category, 201);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'price' => 'nullable|numeric|min:0',
            'people_quantity' => 'nullable|integer|min:1',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
            'features' => 'nullable|array', // Массив ID фич
            'features.*' => 'exists:features,id',
        ]);

        $category->update($validated);

        // Если переданы фичи, синхронизируем их
        if (isset($validated['features'])) {
            $category->features()->sync($validated['features']);
        }

        return response()->json($category, 200);
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(null, 204);
    }
}
