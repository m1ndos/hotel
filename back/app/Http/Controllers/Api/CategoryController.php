<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;


class CategoryController extends Controller
{
    public function index()
    {
        return Category::all(); // Возвращает список всех категорий
    }

    public function show($id)
    {
        return Category::findOrFail($id); // Возвращает конкретную категорию
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'people_quantity' => 'required|integer|min:1',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $category = Category::create($validated);
        return response()->json($category, 201);
    }

    public function update(Request $request, $id)
    {
        $category = Category::findOrFail($id);

        $validated = $request->validate([
            'name' => 'string|max:255',
            'price' => 'numeric|min:0',
            'people_quantity' => 'required|integer|min:1',
            'image' => 'nullable|string',
            'description' => 'nullable|string',
        ]);

        $category->update($validated);
        return response()->json($category, 200);
    }

    public function destroy($id)
    {
        $category = Category::findOrFail($id);
        $category->delete();
        return response()->json(null, 204);
    }
}
