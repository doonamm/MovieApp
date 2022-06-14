<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class MovieController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            "adult" => 'required|integer',
            "title" => 'required|string',
            "tagline" => 'required|string',
            "overview" => 'required|string',
            'status' => 'required|string',
            'poster_path' => 'required|string',
            'backdrop_path' => 'string',
            'language' => 'required|string',
            'runtime' => 'required|integer|gte:1',
            'popularity' => 'numeric',
            'vote_average' => 'numeric',
            'vote_count' => 'integer',
            'revenue' => 'integer',
            'comment_count' => 'integer',
            'release_date' => 'date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors()->toArray()
            ]);
        }

        $movie = Movie::create([
            "adult" => $request->input('adult'),
            "title" => $request->input('title'),
            "tagline" => $request->input('tagline'),
            "overview" => $request->input('overview'),
            'status' => $request->input('status'),
            'poster_path' => $request->input('poster_path'),
            'backdrop_path' => $request->input('backdrop_path'),
            'language' => $request->input('language'),
            'runtime' => $request->input('runtime'),
            'popularity' => $request->input('popularity'),
            'vote_average' => $request->input('vote_average'),
            'vote_count' => $request->input('vote_count'),
            'revenue' => $request->input('revenue'),
            'comment_count' => $request->input('comment_count'),
            'release_date' => $request->input('release_date')
        ]);

        return response()->json([
            'success' => true,
            'data' => $movie,
        ]);
    }

    public function update(Request $request, Movie $movie)
    {
        $validator = Validator::make($request->all(), [
            "adult" => 'required|integer',
            "title" => 'required|string',
            "tagline" => 'required|string',
            "overview" => 'required|string',
            'status' => 'required|string',
            'poster_path' => 'required|string',
            'backdrop_path' => 'string',
            'language' => 'required|string',
            'runtime' => 'required|integer|gte:1',
            'popularity' => 'numeric',
            'vote_average' => 'numeric',
            'vote_count' => 'integer',
            'revenue' => 'integer',
            'comment_count' => 'integer',
            'release_date' => 'date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'error' => $validator->errors()->toArray()
            ]);
        }

        $success = Movie::query()->where('id', '=', $movie->id)->update([
            "adult" => $request->input('adult'),
            "title" => $request->input('title'),
            "tagline" => $request->input('tagline'),
            "overview" => $request->input('overview'),
            'status' => $request->input('status'),
            'poster_path' => $request->input('poster_path'),
            'backdrop_path' => $request->input('backdrop_path'),
            'language' => $request->input('language'),
            'runtime' => $request->input('runtime'),
            'popularity' => $request->input('popularity'),
            'vote_average' => $request->input('vote_average'),
            'vote_count' => $request->input('vote_count'),
            'revenue' => $request->input('revenue'),
            'comment_count' => $request->input('comment_count'),
            'release_date' => $request->input('release_date')
        ]);

        if (!$success) {
            return response()->json([
                'success' => false,
                'message' => 'Can not update movie'
            ]);
        }

        return response()->json([
            'success' => true,
            'message' => 'Update movie success',
            'data' => $success
        ]);
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
            'release_date' => 'date',
            'limit' => 'integer|gte:1|lte:100',
            'next' => 'integer|gte:1',
            'search' => 'string',
            'runtime' => 'integer|gte:1',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
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

        $list = $list->select('movies.id', 'title', 'poster_path')->distinct()->get();

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
