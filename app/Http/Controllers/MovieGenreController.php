<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Tymon\JWTAuth\Facades\JWTAuth;
use Illuminate\Support\Facades\Validator;
use App\Models\Movie_Genre;


class MovieGenreController extends Controller
{
    public function create(Request $request)
    {
        Movie_Genre::query()->create([
            'movie_id' => $request->input('movie_id'),
            'genre_id' => $request->input('genre_id'),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Create Movie Genre successfully',
        ]);
    }

    public function update(Request $request)
    {
        // Update
    }

    public function destroy(Request $request, Movie_Genre $movie_Genre)
    {
        $movie_Genre->delete();

        return response()->json([
            'success' => true,
            'message' => 'Delete Movie Genre successfully',
        ]);
    }

    public function show(Request $request)
    {
        return response()->json([
            'data' => Movie_Genre::query()
                ->where('user_id', $request->user)
                ->where('comment_id', $request->comment)
                ->get(),
            'success' => true,
            'message' => 'Show Movie Gerne successfully'
        ]);
    }
}
