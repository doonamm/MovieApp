<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MovieController extends Controller
{
    //

    public function create(Request $request)
    {
    }

    public function show(Request $request, Movie $movie)
    {
        return response()->json([
            'success' => true,
            'data' => $movie
        ]);
    }

    public function showAll(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'sort_by' => ['regex:/(id|popularity|title|release_date|vote_average|vote_count)\.(asc|desc)/'],
            'casts' => 'array',
            'casts.*' => 'string',
            'genres' => 'array',
            'genres.*' => 'string',
            'month' => 'integer',
            'year' => 'integer',
            'release-date' => 'date',
            'limit' => 'integer|gte:1|lte:100',
            'next' => 'integer|gte:1',
            'search' => 'string'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => true,
                'error' => $validator->errors()->toArray()
            ]);
        }

        $list = DB::table('movies');

        if ($request->has('release_date')) {
            $date = $request->input('release_date');
            $list = $list->where('release_date', $date);
        }

        if ($request->has('month')) {
            $month = $request->input('month');
            $list->whereMonth('release_date', $month);
        }

        if ($request->has('year')) {
            $year = $request->input('year');
            $list->whereYear('release_date', $year);
        }

        if ($request->has('search')) {
            $search = $request->input('search');
            $list->where('title', 'LIKE', "%$search%");
        }

        if ($request->has('casts')) {
            $casts = $request->input('casts');
            $list->join('casts', 'casts.movie_id', '=', 'movies.id')
                ->join('actors', 'actors.id', '=', 'casts.actor_id')
                ->whereIn('actors.name', $casts);
        }

        if ($request->has('genres')) {
            $genres = $request->input('genres');
            $list->join('movie_genres', 'movie_genres.movie_id', '=', 'movies.id')
                ->join('genres', 'genres.id', '=', 'movie_genres.genre_id')
                ->whereIn('genres.name', $genres);
        }

        if ($request->has('sort_by')) {
            $sortBy = explode('.', $request->input('sort_by'));
            $list->orderBy("movies.$sortBy[0]", $sortBy[1]);
        }

        if ($request->has('next')) {
            $next = $request->input('next');
            $list = $list->skip($next);
        }

        $limit = $request->input('limit', 20);
        $list->limit($limit);

        $list = $list->select('movies.id', 'title', 'poster_path')->get();

        return response()->json([
            'success' => true,
            'data' => $list,
            'length' => sizeof($list)
        ]);
    }

    public function destroy(Request $request, Movie $movie)
    {

        $movie->delete();

        return response()->json([
            'success' => true,
            'message' => 'Deleted movie'
        ]);
    }
}
