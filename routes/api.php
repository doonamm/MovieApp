<?php

use App\Events\MessageEvent;
use App\Http\Controllers\ActorController;
use App\Http\Controllers\CastController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\GenreController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\MovieController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\UserController;
use App\Models\Cast;
use App\Models\Movie_Genre;
use Carbon\Carbon;
use GuzzleHttp\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Tymon\JWTAuth\Facades\JWTAuth;

Route::group([
    'prefix' => 'auth',
], function () {
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/register', [UserController::class, 'register']);
    Route::delete('/logout', [UserController::class, 'logout'])->middleware('auth.jwt');
});

Route::group(['middleware' => 'auth.jwt'], function () {
    Route::post('/new-message', function(Request $request){
        $userId = JWTAuth::toUser($request->bearerToken())->id;

        event(new MessageEvent($request->input('message')));
    });
    
    Route::post('/avatar', [ProfileController::class, 'updateAvatar']);

    //user
    Route::group(['prefix' => 'users'], function () {
        Route::get('/', [UserController::class, 'getAllUser']);

        Route::group(['prefix' => '/{user}'], function () {
            Route::get('/', [UserController::class, 'getUserInfo']);
            Route::delete('/', [UserController::class, 'destroy']);
            Route::post('/', [UserController::class, 'resetPassword']);


            Route::get('/profile', [ProfileController::class, 'show']);
            Route::get('/profile/public', [ProfileController::class, 'showPublic']);
            Route::post('/profile', [ProfileController::class, 'create']);
            Route::put('/profile', [ProfileController::class, 'update']);
        });
    });

    //profile
    Route::get('/profiles', [ProfileController::class, 'showAll']);

    //genres
    Route::get('/genres', [GenreController::class, 'showAll']);

    //actors
    Route::group(['prefix' => 'actors'], function () {
        Route::get('/', [ActorController::class, 'showAll']);
        Route::post('/', [ActorController::class, 'create']);
        Route::get('/{actor}', [ActorController::class, 'show']);
        Route::put('/{actor}', [ActorController::class, 'update']);
        Route::delete('/{actor}', [ActorController::class, 'destroy']);
    });

    //movie
    Route::group(['prefix' => 'movies'], function () {
        Route::get('/', [MovieController::class, 'showAll']);
        Route::post('/', [MovieController::class, 'create']);

        Route::group(['prefix' => '/{movie}'], function () {
            Route::get('/', [MovieController::class, 'show']);
            Route::put('/', [MovieController::class, 'update']);
            Route::delete('/', [MovieController::class, 'destroy']);

            Route::get('/casts', [CastController::class, 'showAll']);
            Route::put('/genres', [Movie_GenreController::class, 'showAll']);

            //comments
            Route::group(['prefix' => 'comments'], function () {
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
