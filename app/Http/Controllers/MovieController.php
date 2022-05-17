<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    //

    public function create(Request $request){
        //this is a test
        
        $movie = Movie::query()->create([
            'adult' => false,
            'title' => '',
            'tagline' => '',
            'overview' => '',
            'status' => '',
            'poster_path' => '',
            'language' => '',
            'popularity' => 0,
            'vote_average' => 0,
            'vote_count' => 0,
            'revenue' => 0,
            'comment_count' => 0
        ]);

        return response()->json([
            'success' => true,
            'payload' => [
                'movie' => $movie
            ]
        ]);
    }
}
