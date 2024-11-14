<?php

use App\Http\Controllers\Api\BookingController;
use App\Http\Controllers\Api\PaymentController;
use App\Http\Controllers\Api\RoomController;
use App\Http\Controllers\Api\ServiceController;
use App\Http\Controllers\Api\UserController;

use Illuminate\Support\Facades\Route;


Route::apiResource('users', UserController::class);
Route::apiResource('rooms', RoomController::class);
Route::apiResource('services', ServiceController::class);
Route::apiResource('booking', BookingController::class);
Route::apiResource('payments', PaymentController::class);
