<?php

use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\PingController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});


Route::get('/ping', [PingController::class, 'ping']);

// user
//Route::apiResource('api/users', UserController::class);
