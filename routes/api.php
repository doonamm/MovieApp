<?php

use App\Http\Controllers\UserController;
use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'auth',
], function(){
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);
    Route::delete('/logout', [UserController::class, 'logout'])->middleware('auth.jwt');
});

Route::group(['middleware' => 'auth.jwt'], function(){
    //user route
    Route::group(['prefix' => 'users'], function(){
        Route::get('/self', [UserController::class, 'getInfo']);
        Route::get('/{user}', [UserController::class, 'getUserInfo']);
    });

    //more route...
});