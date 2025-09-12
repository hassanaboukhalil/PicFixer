<?php

use App\Http\Controllers\AuthController;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


// Route::group('auth:api', function () {
//     Route::ge
// });

Route::post('/login', [AuthController::class, 'login']);
Route::post('/signup', [AuthController::class, 'signup']);


Route::group(['prefix' => "v1", "middleware" => 'auth:api'], function () {
    Route::group(['middleware' => 'isAdmin'], function () {
        Route::post('/add-user', [AuthController::class, 'login']);
    });
});
