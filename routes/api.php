<?php

use App\Http\Controllers\ActorController;
use App\Http\Controllers\CastController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\MovieGenreController;
use App\Http\Controllers\UserController;
use App\Models\Genre;
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

Route::group(['prefix' => 'actors'], function () {
    Route::get('/', [ActorController::class, 'showAll']);
    Route::get('/{actor}', [ActorController::class, 'show']);
    Route::post('/', [ActorController::class, 'create']);
});


Route::group(['prefix' => 'genres'], function () {
    Route::get('/', [GenreController::class, 'showAll']);
    Route::post('/', [GenreController::class, 'create']);
});

// Route::group(['middleware' => 'auth.jwt'], function () {
//user route
Route::group(['prefix' => 'users'], function () {
    Route::get('/self', [UserController::class, 'getInfo']);
    Route::get('/{user}', [UserController::class, 'getUserInfo']);
});

// Route::group(['prefix' => 'comments'], function () {
//     Route::post('/', [CommentController::class, 'create']);
// });


Route::group(['prefix' => 'movies'], function () {
    Route::post('/', [MovieController::class, 'create']);

    //Movies

    //Genre
    Route::get('/{movie}/genres', [MovieGenreController::class, 'showAll']); /* show genres of movies */

    //Cast
    Route::get('/{movie}/casts', [CastController::class, 'showAll']);


    //Comments
    // Route::get('/{movie}/comments', [CommentController::class, 'showAll']);
    // Route::post('/{movie}', [CommentController::class, 'create']);
});
    //more route...
// });
