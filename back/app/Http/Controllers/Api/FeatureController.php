<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Feature;
use Illuminate\Http\Request;

class FeatureController extends Controller
{
    public function index()
    {
        return Feature::all();
    }

    public function show($id)
    {
        return Feature::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $feature = Feature::create($validated);
        return response()->json($feature, 201);
    }

    public function update(Request $request, $id)
    {
        $feature = Feature::findOrFail($id);

        $validated = $request->validate([
            'name' => 'string|max:255',
        ]);

        $feature->update($validated);
        return response()->json($feature, 200);
    }

    public function destroy($id)
    {
        $feature = Feature::findOrFail($id);
        $feature->delete();
        return response()->json(null, 204);
    }
}
