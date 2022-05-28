<?php

use App\Http\Controllers\CommentController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\Cast;
use App\Models\Movie_Genre;
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

    //user
    Route::group(['prefix' => 'users'], function(){
        Route::get('/', [UserController::class, 'getAllUser']);

        Route::group(['prefix' => '/{user}'], function(){
            Route::get('/', [UserController::class, 'getUserInfo']);
            Route::delete('/', [UserController::class, 'destroy']);

            Route::get('/profile', [ProfileController::class, 'show']);
            Route::get('/profile/public', [ProfileController::class, 'showPublic']);
            Route::post('/profile', [ProfileController::class, 'create']);
            Route::put('/profile', [ProfileController::class, 'update']);
        });
        
    });

    //profile
    Route::get('/profiles', [ProfileController::class, 'showAll']);

    //movie
    Route::group(['prefix' => 'movies'], function(){
        Route::get('/', [MovieController::class, 'showAll']);
        Route::post('/', [MovieController::class, 'create']);

        Route::group(['prefix' => '/{movie}'], function(){
            Route::get('/', [MovieController::class, 'show']);
            Route::put('/', [MovieController::class, 'update']);
            Route::delete('/', [MovieController::class, 'destroy']);

            Route::get('/casts', [Cast::class, 'showAll']);
            Route::put('/genres', [Movie_Genre::class, 'showAll']);

            //comments
            Route::group(['prefix' => 'comments'], function(){
                Route::get('/', [CommentController::class, 'showAll']);
                Route::post('/', [CommentController::class, 'create']);
                Route::delete('/{comment}', [CommentController::class, 'destroy']);
                
                //like
                Route::post('/{comment}/likes', [LikeController::class, 'create']);
                Route::delete('/{comment}/likes', [LikeController::class, 'destroy']);
            });
        });
    });
});