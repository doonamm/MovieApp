<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Movie_Genre;
use App\Models\Movie;


class MovieGenreController extends Controller
{
    public function destroy(Request $request, Movie_Genre $movie_Genre)
    {
        $movie_Genre->delete();

        return response()->json([
            'success' => true,
        ]);
    }

    public function show(Request $request, Movie_Genre $movie_Genre)
    {
        $movie_Genre = Movie_Genre::findOrFail($movie_Genre);
        return response()->json([
            'data' => $movie_Genre,
            'success' => true,
        ]);
    }

    public function showAll(Request $request, Movie $movie)
    {
        $list = Movie_Genre::join("GENREs", 'MOVIE_GENREs.genre_id', '=', 'GENREs.id')
            ->where('MOVIE_GENREs.movie_id', $movie->id)
            ->get('GENREs.name', 'MOVIE_GENREs.genre_id');

        return response()->json([
            'data' => $list,
            'success' => true,
        ]);
    }
}
