<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\UserController;
use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::group([
    'prefix' => 'auth',
], function () {
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);
    Route::delete('/logout', [UserController::class, 'logout'])->middleware('auth.jwt');
});

Route::group(['middleware' => 'auth.jwt'], function () {
    //user route
    Route::group(['prefix' => 'users'], function () {
        Route::get('/self', [UserController::class, 'getInfo']);
        Route::get('/{user}', [UserController::class, 'getUserInfo']);
    });

    Route::group(['prefix' => 'comments'], function () {
        Route::post('/', [CommentController::class, 'create']);
    });

    Route::group(['prefix' => 'movies'], function () {
        Route::post('/', [MovieController::class, 'create']);

        //Nhật
        //Movies
        Route::get('/{movie}', [MovieController::class, 'show']);
        Route::put('/{movie}', [MovieController::class, 'update']);
        Route::delete('/{movie}', [MovieController::class, 'destroy']);
        Route::post('/', [MovieController::class, 'create']);

        //Genre
        Route::get('/genres', [GenreController::class, 'showAll']);

        //Cast
        Route::get('/casts', [CastController::class, 'showAll']);
    });
    //more route...
});
