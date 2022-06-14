<?php

use App\Http\Controllers\ActorController;
use App\Http\Controllers\CastController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\Actor;
use App\Models\Cast;
use App\Models\Movie_Genre;
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
    Route::post('/avatar', [ProfileController::class, 'updateAvatar']);

    //actors
    Route::group(['prefix' => 'actors'], function () {
        Route::post('/', [ActorController::class, 'create']);
        Route::put('/{actor}', [ActorController::class, 'update']);
        Route::delete('/{actor}', [ActorController::class, 'destroy']);
    });


    //user
    Route::group(['prefix' => 'users'], function () {
        Route::get('/', [UserController::class, 'getAllUser']);

        Route::group(['prefix' => '/{user}'], function () {
            Route::get('/', [UserController::class, 'getUserInfo']);
            Route::delete('/', [UserController::class, 'destroy']);
            Route::post('/', [UserController::class, 'resetPassword']);


            Route::get('/profile', [ProfileController::class, 'show']);
            Route::post('/profile', [ProfileController::class, 'create']);
            Route::put('/profile', [ProfileController::class, 'update']);
        });
    });

    //profile
    Route::get('/profiles', [ProfileController::class, 'showAll']);

    //genres
    Route::get('/genres', [GenreController::class, 'showAll']);

    //movie
    Route::group(['prefix' => 'movies'], function () {
        Route::get('/', [MovieController::class, 'showAll']);
        Route::post('/', [MovieController::class, 'create']);

        Route::group(['prefix' => '/{movie}'], function () {

            Route::put('/', [MovieController::class, 'update']);
            Route::delete('/', [MovieController::class, 'destroy']);

            Route::put('/genres', [Movie_GenreController::class, 'showAll']);

            Route::group(['prefix' => 'comments'], function () {
                Route::post('/', [CommentController::class, 'create']);
                Route::delete('/{comment}', [CommentController::class, 'destroy']);

                //like
                Route::post('/{comment}/likes', [LikeController::class, 'create']);
                Route::delete('/{comment}/likes', [LikeController::class, 'destroy']);
            });
        });
    });
});

// Khách vãng lai

// actor
Route::get("/actors", [ActorController::class, 'showAll']);
Route::get('/actors/{actor}', [ActorController::class, 'show']);

//cast
Route::get("/movies/{movie}/casts", [CastController::class, 'showAll']);

// comments
Route::get("/movies/{movie}/comments", [CommentController::class, 'showAll']);

Route::get('/users/{user}/profile/public', [ProfileController::class, 'showPublic']);

Route::get('/movies/{movies}/', [MovieController::class, 'show']);
