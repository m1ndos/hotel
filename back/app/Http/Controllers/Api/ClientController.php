<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index()
    {
        return Client::with('user')->get(); // Возвращает список всех клиентов с пользователями
    }

    public function show($id)
    {
        return Client::with('user')->findOrFail($id); // Возвращает конкретного клиента
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'passport' => 'required|string|unique:clients',
            'user_id' => 'required|exists:users,id',
        ]);

        $client = Client::create($validated);
        return response()->json($client, 201);
    }

    public function update(Request $request, $id)
    {
        $client = Client::findOrFail($id);

        $validated = $request->validate([
            'name' => 'string|max:255',
            'passport' => 'string|unique:clients,passport,' . $id,
        ]);

        $client->update($validated);
        return response()->json($client, 200);
    }

    public function destroy($id)
    {
        $client = Client::findOrFail($id);
        $client->delete();
        return response()->json(null, 204);
    }
}
