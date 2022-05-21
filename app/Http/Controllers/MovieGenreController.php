<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;
use App\Models\Movie_Genre;


class MovieGenreController extends Controller
{
    public function destroy(Request $request, Movie_Genre $movie_Genre)
    {
        $movie_Genre->delete();

        return response()->json([
            'success' => true,
            'message' => 'Delete Movie Genre Successfully',
        ]);
    }

    public function show(Request $request, Movie_Genre $movie_Genre)
    {
        $movie_Genre = Movie_Genre::findOrFail($movie_Genre);
        return response()->json([
            'data' => $movie_Genre,
            'success' => true,
            'message' => 'Show Movie Genre Successfully'
        ]);
    }

    public function showAll(Request $request)
    {
        return response()->json([
            'data' => Movie_Genre::all(),
            'success' => true,
            'message' => 'Show All Movie Genre Successfully',
        ]);
    }
}
