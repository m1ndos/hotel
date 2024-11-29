<?php

use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ClientController;
use App\Http\Controllers\Api\FeatureController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\UserController;

use Illuminate\Support\Facades\Route;


Route::apiResource('users', UserController::class);
Route::apiResource('clients', ClientController::class);
Route::apiResource('rooms', RoomController::class);
Route::apiResource('bookings', BookingController::class);
Route::apiResource('services', ServiceController::class);
Route::apiResource('categories', CategoryController::class);
Route::apiResource('features', FeatureController::class);
Route::apiResource('orders', OrderController::class);
Route::get('/rooms/category/{name}', [RoomController::class, 'getRoomsByCategoryName']);

