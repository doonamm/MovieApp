<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return view('app');
// });

// Route::view('/{path?}', 'app');

Route::get('{path?}', function () {
    return view('app');
})->where('path', '^((?!api).)*$'); 

Route::get('demo-pusher','FrontEndController@getPusher');
// Truyển message lên server Pusher
 Route::get('fire-event','FrontEndController@fireEvent');